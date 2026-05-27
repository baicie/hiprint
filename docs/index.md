可以，给你一套 **针对你这几个文件的反编译 / 反混淆方案**。

先说结论：你这个不是那种极端控制流混淆，主要是 **webpack / browserify 打包 + 压缩 + Babel 转译**。所以目标不是“还原成原仓库源码”，而是：

```txt
1. 格式化
2. 拆模块
3. 给模块编号命名
4. 生成伪源码目录
5. 做基础变量名清洗
6. 抽取关键类 / 方法 / API
7. 逐步人工重构
```

你上传的 `hiprint.bundle.js` 里能看到 `jQuery Hiprint 2.5.4`，并且写了 `Licensed under the LGPL or commercial licenses`，后面是典型 webpack bootstrap：`var hiprint = function (t) { ... }([function (...) { ... }])`。
`hiprint.config.js` 是 `window.HIPRINT_CONFIG` 配置层，适合直接整理成配置源码。
`polyfill.min.js` 是大量 polyfill / core-js 风格 browserify 包，通常不值得反编译，建议直接替换成标准依赖。

---

# 推荐目录结构

```txt
reverse-hiprint/
  input/
    hiprint.bundle.js
    hiprint.config.js
    polyfill.min.js

  scripts/
    01-beautify.mjs
    02-extract-webpack-array.mjs
    03-extract-browserify.mjs
    04-clean-identifiers.mjs
    05-scan-api.mjs

  output/
    pretty/
    modules/
    cleaned/
    report/
```

---

# 第一步：安装依赖

```bash
mkdir reverse-hiprint
cd reverse-hiprint

pnpm init

pnpm add -D prettier \
  @babel/parser \
  @babel/traverse \
  @babel/generator \
  @babel/types \
  magic-string
```

---

# 第二步：先格式化

`scripts/01-beautify.mjs`

```js
import fs from "node:fs";
import path from "node:path";
import prettier from "prettier";

const inputs = [
  "input/hiprint.bundle.js",
  "input/hiprint.config.js",
  "input/polyfill.min.js",
];

const outDir = "output/pretty";
fs.mkdirSync(outDir, { recursive: true });

for (const file of inputs) {
  const code = fs.readFileSync(file, "utf-8");

  const formatted = await prettier.format(code, {
    parser: "babel",
    semi: false,
    singleQuote: true,
    printWidth: 100,
  });

  const out = path.join(outDir, path.basename(file));
  fs.writeFileSync(out, formatted);

  console.log(`[beautify] ${file} -> ${out}`);
}
```

执行：

```bash
node scripts/01-beautify.mjs
```

---

# 第三步：拆 `hiprint.bundle.js` 的 webpack 模块

你的 `hiprint.bundle.js` 结构大概是：

```js
var hiprint = (function (t) {
  var e = {};

  function n(i) {
    // webpack require
  }

  return n((n.s = 21));
})([
  function (t, e, n) {
    // module 0
  },
  function (t, e, n) {
    // module 1
  },
]);
```

所以可以按 AST 找到最后那个 `ArrayExpression`，把每个模块函数拆出来。

`scripts/02-extract-webpack-array.mjs`

```js
import fs from "node:fs";
import path from "node:path";
import parser from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import prettier from "prettier";

const input = "input/hiprint.bundle.js";
const outDir = "output/modules/hiprint";
fs.mkdirSync(outDir, { recursive: true });

const code = fs.readFileSync(input, "utf-8");

const ast = parser.parse(code, {
  sourceType: "script",
  errorRecovery: true,
});

let modulesArray = null;

traverse.default(ast, {
  CallExpression(path) {
    const args = path.node.arguments;

    if (
      args.length === 1 &&
      args[0].type === "ArrayExpression" &&
      args[0].elements.length > 5
    ) {
      const callee = path.node.callee;

      // 匹配 function(t){...}([...])
      if (callee.type === "FunctionExpression") {
        modulesArray = args[0];
      }
    }
  },
});

if (!modulesArray) {
  throw new Error("Cannot find webpack modules array");
}

const manifest = [];

for (let i = 0; i < modulesArray.elements.length; i++) {
  const mod = modulesArray.elements[i];

  if (!mod) continue;

  const raw = generate.default(mod, {
    comments: true,
    compact: false,
  }).code;

  const wrapped = `
// webpack module ${i}
export default ${raw}
`;

  const formatted = await prettier.format(wrapped, {
    parser: "babel",
    semi: false,
    singleQuote: true,
    printWidth: 100,
  });

  const filename = `module-${String(i).padStart(3, "0")}.js`;
  fs.writeFileSync(path.join(outDir, filename), formatted);

  manifest.push({
    id: i,
    file: filename,
    size: formatted.length,
  });
}

fs.writeFileSync(
  path.join(outDir, "manifest.json"),
  JSON.stringify(manifest, null, 2),
);

console.log(`[extract] ${manifest.length} modules extracted to ${outDir}`);
```

执行：

```bash
node scripts/02-extract-webpack-array.mjs
```

输出类似：

```txt
output/modules/hiprint/
  module-000.js
  module-001.js
  module-002.js
  ...
  manifest.json
```

---

# 第四步：拆 `polyfill.min.js`

`polyfill.min.js` 是 browserify 风格：

```js
!function e(u,c,a){
  ...
}({
  1: [function(t,n,r){...}, {15:15,2:2}],
  2: [function(t,n,r){...}, {...}]
})
```

这个文件一般不用重构，建议只拆出来确认，然后直接换成 `core-js`。
但如果你想拆，可以这样：

`scripts/03-extract-browserify.mjs`

```js
import fs from "node:fs";
import path from "node:path";
import parser from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import prettier from "prettier";

const input = "input/polyfill.min.js";
const outDir = "output/modules/polyfill";
fs.mkdirSync(outDir, { recursive: true });

const code = fs.readFileSync(input, "utf-8");

const ast = parser.parse(code, {
  sourceType: "script",
  errorRecovery: true,
});

let modulesObject = null;

traverse.default(ast, {
  CallExpression(path) {
    const args = path.node.arguments;

    if (
      args.length >= 1 &&
      args[0].type === "ObjectExpression" &&
      args[0].properties.length > 20
    ) {
      modulesObject = args[0];
      path.stop();
    }
  },
});

if (!modulesObject) {
  throw new Error("Cannot find browserify modules object");
}

const manifest = [];

for (const prop of modulesObject.properties) {
  if (prop.type !== "ObjectProperty") continue;

  const id =
    prop.key.type === "NumericLiteral"
      ? String(prop.key.value)
      : prop.key.type === "StringLiteral"
        ? prop.key.value
        : null;

  if (!id) continue;

  if (prop.value.type !== "ArrayExpression") continue;

  const fn = prop.value.elements[0];
  const deps = prop.value.elements[1];

  const rawFn = generate.default(fn, {
    comments: false,
    compact: false,
  }).code;

  const rawDeps = deps
    ? generate.default(deps, {
        comments: false,
        compact: false,
      }).code
    : "{}";

  const wrapped = `
// browserify module ${id}
// deps: ${rawDeps}
export default ${rawFn}
`;

  const formatted = await prettier.format(wrapped, {
    parser: "babel",
    semi: false,
    singleQuote: true,
    printWidth: 100,
  });

  const filename = `module-${id}.js`;
  fs.writeFileSync(path.join(outDir, filename), formatted);

  manifest.push({
    id,
    file: filename,
  });
}

fs.writeFileSync(
  path.join(outDir, "manifest.json"),
  JSON.stringify(manifest, null, 2),
);

console.log(`[extract] ${manifest.length} browserify modules extracted`);
```

---

# 第五步：基础变量名清洗

混淆或压缩后的代码常见变量：

```js
(t, e, n, i, o, r);
```

这类不能自动恢复真实语义，但可以做两类清洗：

1. `_0x123abc` 改成 `v1`
2. `obj['name']` 改成 `obj.name`
3. 字符串字面量属性还原

`scripts/04-clean-identifiers.mjs`

```js
import fs from "node:fs";
import path from "node:path";
import parser from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import * as t from "@babel/types";
import prettier from "prettier";

const inputDir = "output/modules/hiprint";
const outDir = "output/cleaned/hiprint";
fs.mkdirSync(outDir, { recursive: true });

const files = fs.readdirSync(inputDir).filter((file) => file.endsWith(".js"));

for (const file of files) {
  const full = path.join(inputDir, file);
  const code = fs.readFileSync(full, "utf-8");

  const ast = parser.parse(code, {
    sourceType: "module",
    errorRecovery: true,
  });

  let id = 0;
  const nameMap = new Map();

  traverse.default(ast, {
    Identifier(path) {
      const name = path.node.name;

      if (/^_0x[a-fA-F0-9]+$/.test(name)) {
        if (!nameMap.has(name)) {
          nameMap.set(name, `v${++id}`);
        }

        path.node.name = nameMap.get(name);
      }
    },

    MemberExpression(path) {
      const { node } = path;

      // obj['foo'] -> obj.foo
      if (
        node.computed &&
        t.isStringLiteral(node.property) &&
        /^[A-Za-z_$][\w$]*$/.test(node.property.value)
      ) {
        node.computed = false;
        node.property = t.identifier(node.property.value);
      }
    },
  });

  const output = generate.default(ast, {
    comments: true,
    compact: false,
  }).code;

  const formatted = await prettier.format(output, {
    parser: "babel",
    semi: false,
    singleQuote: true,
    printWidth: 100,
  });

  fs.writeFileSync(path.join(outDir, file), formatted);
  console.log(`[clean] ${file}`);
}
```

---

# 第六步：扫描 API / 类 / 原型方法

你要重构 hiprint，最重要的是先知道它有哪些类、原型方法、导出 API。

`scripts/05-scan-api.mjs`

```js
import fs from "node:fs";
import path from "node:path";
import parser from "@babel/parser";
import traverse from "@babel/traverse";

const inputDir = "output/cleaned/hiprint";
const files = fs.readdirSync(inputDir).filter((file) => file.endsWith(".js"));

const report = [];

for (const file of files) {
  const full = path.join(inputDir, file);
  const code = fs.readFileSync(full, "utf-8");

  const ast = parser.parse(code, {
    sourceType: "module",
    errorRecovery: true,
  });

  const item = {
    file,
    classes: [],
    prototypeMethods: [],
    assignments: [],
    exports: [],
  };

  traverse.default(ast, {
    ClassDeclaration(path) {
      if (path.node.id) {
        item.classes.push(path.node.id.name);
      }
    },

    AssignmentExpression(path) {
      const left = path.node.left;

      // Foo.prototype.bar = function(){}
      if (
        left.type === "MemberExpression" &&
        left.object.type === "MemberExpression" &&
        left.object.property.type === "Identifier" &&
        left.object.property.name === "prototype" &&
        left.object.object.type === "Identifier"
      ) {
        const className = left.object.object.name;
        const methodName =
          left.property.type === "Identifier"
            ? left.property.name
            : left.property.type === "StringLiteral"
              ? left.property.value
              : "[computed]";

        item.prototypeMethods.push(`${className}.${methodName}`);
      }

      // window.xxx = ...
      if (
        left.type === "MemberExpression" &&
        left.object.type === "Identifier" &&
        left.object.name === "window"
      ) {
        const name =
          left.property.type === "Identifier"
            ? left.property.name
            : left.property.type === "StringLiteral"
              ? left.property.value
              : "[computed]";

        item.assignments.push(`window.${name}`);
      }
    },

    ExportNamedDeclaration(path) {
      for (const spec of path.node.specifiers) {
        if (spec.exported.type === "Identifier") {
          item.exports.push(spec.exported.name);
        }
      }
    },
  });

  if (
    item.classes.length ||
    item.prototypeMethods.length ||
    item.assignments.length ||
    item.exports.length
  ) {
    report.push(item);
  }
}

fs.mkdirSync("output/report", { recursive: true });
fs.writeFileSync(
  "output/report/api-report.json",
  JSON.stringify(report, null, 2),
);

console.log(`[scan] report generated: output/report/api-report.json`);
```

---

# 第七步：修复 `hiprint.config.js`

你上传的 `hiprint.config.js` 里有这种写法：

```js
text: any = {
```

这不是合法 JS。正常应该是：

```js
text: {
```

所以可以写一个清洗脚本：

`scripts/06-clean-config.mjs`

```js
import fs from "node:fs";
import prettier from "prettier";

const input = "input/hiprint.config.js";
const output = "output/cleaned/hiprint.config.js";

let code = fs.readFileSync(input, "utf-8");

// 修复这种 TS/伪代码写法：text: any = {  -> text: {
code = code.replace(/(\w+)\s*:\s*any\s*=\s*\{/g, "$1: {");

// 如果有 `xxx: undefined` 可以保留，不影响 JS

const formatted = await prettier.format(code, {
  parser: "babel",
  semi: false,
  singleQuote: true,
  printWidth: 100,
});

fs.mkdirSync("output/cleaned", { recursive: true });
fs.writeFileSync(output, formatted);

console.log(`[config] cleaned -> ${output}`);
```

执行：

```bash
node scripts/06-clean-config.mjs
```

---

# 第八步：生成模块依赖图

webpack 模块里会有：

```js
var i = n(9);
var o = n(1);
```

可以扫出模块依赖关系。

`scripts/07-scan-webpack-deps.mjs`

```js
import fs from "node:fs";
import path from "node:path";
import parser from "@babel/parser";
import traverse from "@babel/traverse";

const inputDir = "output/modules/hiprint";
const files = fs
  .readdirSync(inputDir)
  .filter((file) => /^module-\d+\.js$/.test(file));

const graph = {};

for (const file of files) {
  const id = Number(file.match(/module-(\d+)\.js/)?.[1]);
  const code = fs.readFileSync(path.join(inputDir, file), "utf-8");

  const ast = parser.parse(code, {
    sourceType: "module",
    errorRecovery: true,
  });

  const deps = new Set();

  traverse.default(ast, {
    CallExpression(path) {
      const callee = path.node.callee;

      // webpack module wrapper: function(t, e, n) { n(9) }
      if (
        callee.type === "Identifier" &&
        path.node.arguments.length === 1 &&
        path.node.arguments[0].type === "NumericLiteral"
      ) {
        deps.add(path.node.arguments[0].value);
      }
    },
  });

  graph[id] = [...deps].sort((a, b) => a - b);
}

fs.mkdirSync("output/report", { recursive: true });
fs.writeFileSync(
  "output/report/webpack-deps.json",
  JSON.stringify(graph, null, 2),
);

console.log(`[deps] output/report/webpack-deps.json`);
```

---

# 第九步：重构策略

拆出来后不要一上来全量重写。建议按模块域重构：

```txt
1. hinnn 工具模块
   - event
   - form
   - pt / px / mm 单位转换
   - throttle / debounce
   - dateFormat

2. 配置模块
   - HiPrintConfig
   - optionItems
   - text/image/table 默认配置

3. 模板核心
   - PrintTemplate
   - PrintPanel
   - PaperHtmlResult

4. 元素核心
   - BasePrintElement
   - TextPrintElement
   - ImagePrintElement
   - TablePrintElement
   - HLine / VLine / Rect / Oval / Html

5. 设计器交互
   - drag
   - resize
   - ruler
   - paper
   - selection

6. 打印输出
   - getHtml
   - print
   - print2
   - pagination
```

你上传的 `hiprint.bundle.js` 里已经能看到类似 `BasePrintElement`、`HiPrintConfig`、`PrintTemplate`、`print`、`print2`、`getHtml` 这些名字，所以后续可以围绕这些模块人工命名。

---

# 一键脚本

最后加一个总入口：

`scripts/reverse-all.mjs`

```js
import { execSync } from "node:child_process";

const steps = [
  "node scripts/01-beautify.mjs",
  "node scripts/02-extract-webpack-array.mjs",
  "node scripts/03-extract-browserify.mjs",
  "node scripts/04-clean-identifiers.mjs",
  "node scripts/05-scan-api.mjs",
  "node scripts/06-clean-config.mjs",
  "node scripts/07-scan-webpack-deps.mjs",
];

for (const step of steps) {
  console.log(`\n> ${step}`);
  execSync(step, {
    stdio: "inherit",
  });
}

console.log("\nreverse done.");
```

执行：

```bash
node scripts/reverse-all.mjs
```

---

# 最终产物

跑完后你会得到：

```txt
output/
  pretty/
    hiprint.bundle.js
    hiprint.config.js
    polyfill.min.js

  modules/
    hiprint/
      module-000.js
      module-001.js
      ...
      manifest.json

    polyfill/
      module-1.js
      module-2.js
      ...

  cleaned/
    hiprint/
      module-000.js
      module-001.js
      ...

    hiprint.config.js

  report/
    api-report.json
    webpack-deps.json
```

---

# 我建议你实际操作顺序

```bash
node scripts/01-beautify.mjs
node scripts/02-extract-webpack-array.mjs
node scripts/05-scan-api.mjs
node scripts/07-scan-webpack-deps.mjs
```

先别管 `polyfill.min.js`。这个文件大概率可以直接丢掉，改成：

```bash
pnpm add core-js
```

或者现代项目里干脆不带全量 polyfill。

---

# 关键提醒

这个文件头里写的是：

```txt
Licensed under the LGPL or commercial licenses
```

所以你可以做学习、兼容、调试、迁移分析；如果要商用改造或闭源二次分发，要仔细看 LGPL 条款或走商业授权。
