下面给你一版 **Phase 0：项目初始化 + 反解析成果冻结 + legacy 可运行封装** 的详细设计。

这一阶段的核心目标不是重写 hiprint，而是先建立一个安全底座：

```txt
现有反解析产物能稳定运行
  ↓
把行为封装进 legacy 包
  ↓
建立 fixtures / demo / 测试
  ↓
后续每次抽 core 都能回归验证
```

---

# Phase 0 总目标

## 阶段目标

Phase 0 只做 4 件事：

```txt
1. 建立 monorepo 工程结构
2. 保留并封装当前反解析产物
3. 跑通 legacy playground
4. 建立最小测试与回归基线
```

也就是说，Phase 0 的交付物应该是：

```txt
@hiprint-re/legacy 可以加载现有反解析 bundle
playground-legacy 可以跑起来
fixtures 里有模板和数据
CI 能跑 typecheck / lint / test / build
后续重构前后可以对比行为
```

---

# Phase 0 不做什么

这一点很重要。

Phase 0 不做：

```txt
不抽完整 core
不重写 table
不做 React/Vue 组件
不做完整 designer
不做插件市场
不做 PDF renderer
不做大规模变量重命名
不直接改反解析核心逻辑
```

原因是现在代码来源是反解析产物，最怕边清理边破坏行为。第一阶段要先“冻结现场”。

---

# 推荐分支

```bash
git checkout -b refactor/phase-0-legacy-foundation
```

或者：

```bash
git checkout -b chore/phase-0-project-foundation
```

我更推荐第一个：

```txt
refactor/phase-0-legacy-foundation
```

语义更明确。

---

# 最终目录设计

Phase 0 完成后，建议目录长这样：

```txt
hiprint/
├─ package.json
├─ pnpm-workspace.yaml
├─ tsconfig.base.json
├─ eslint.config.js
├─ vitest.config.ts
├─ .gitignore
├─ .npmrc
│
├─ packages/
│  ├─ legacy/
│  │  ├─ package.json
│  │  ├─ tsconfig.json
│  │  ├─ src/
│  │  │  ├─ index.ts
│  │  │  ├─ loadLegacy.ts
│  │  │  ├─ facade.ts
│  │  │  ├─ globals.ts
│  │  │  ├─ types.ts
│  │  │  └─ utils.ts
│  │  └─ vendor/
│  │     ├─ hiprint.bundle.js
│  │     ├─ hiprint.config.js
│  │     ├─ polyfill.min.js
│  │     └─ README.md
│  │
│  └─ shared/
│     ├─ package.json
│     ├─ tsconfig.json
│     └─ src/
│        ├─ index.ts
│        ├─ types.ts
│        └─ invariant.ts
│
├─ apps/
│  └─ playground-legacy/
│     ├─ package.json
│     ├─ index.html
│     ├─ tsconfig.json
│     ├─ vite.config.ts
│     └─ src/
│        ├─ main.ts
│        ├─ fixtures.ts
│        └─ style.css
│
├─ fixtures/
│  ├─ templates/
│  │  ├─ basic-text.json
│  │  ├─ image.json
│  │  ├─ table-basic.json
│  │  └─ complex-order.json
│  ├─ data/
│  │  ├─ basic-text.data.json
│  │  ├─ table-basic.data.json
│  │  └─ complex-order.data.json
│  └─ snapshots/
│     └─ legacy/
│
├─ tests/
│  ├─ legacy/
│  │  ├─ loadLegacy.test.ts
│  │  ├─ facade.test.ts
│  │  └─ fixtures.test.ts
│  └─ e2e/
│     └─ legacy-preview.spec.ts
│
├─ tools/
│  ├─ reverse-audit/
│  │  └─ README.md
│  └─ scripts/
│     └─ check-fixtures.ts
│
└─ docs/
   ├─ phase-0.md
   ├─ reverse-audit.md
   └─ legacy-behavior-baseline.md
```

---

# 根目录 package.json

Phase 0 先用 `pnpm workspace`。

```json
{
  "name": "hiprint-re",
  "private": true,
  "type": "module",
  "packageManager": "pnpm@10.0.0",
  "scripts": {
    "dev": "pnpm --filter @hiprint-re/playground-legacy dev",
    "build": "pnpm -r build",
    "typecheck": "pnpm -r typecheck",
    "test": "vitest run",
    "test:watch": "vitest",
    "lint": "eslint .",
    "check": "pnpm typecheck && pnpm lint && pnpm test"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@vitejs/plugin-legacy": "^6.0.0",
    "eslint": "^9.0.0",
    "typescript": "^5.0.0",
    "vite": "^7.0.0",
    "vitest": "^3.0.0"
  }
}
```

---

# pnpm-workspace.yaml

```yaml
packages:
  - "packages/*"
  - "apps/*"
```

---

# .npmrc

建议先固定依赖行为：

```ini
strict-peer-dependencies=false
auto-install-peers=true
shamefully-hoist=false
```

---

# tsconfig.base.json

```json
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "lib": ["ES2018", "DOM", "DOM.Iterable"],
    "strict": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": false
  }
}
```

注意：
Phase 0 的 `legacy` 包可以适当放松类型，因为它要包反解析产物。真正严格的类型后面放在 `core`。

---

# packages/shared 设计

这个包只放非常基础的共享工具，避免 Phase 0 一上来就把东西塞进 core。

## packages/shared/package.json

```json
{
  "name": "@hiprint-re/shared",
  "version": "0.0.0",
  "type": "module",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "typecheck": "tsc -p tsconfig.json --noEmit"
  }
}
```

## packages/shared/src/invariant.ts

```ts
export function invariant(
  condition: unknown,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(`[hiprint-re] ${message}`);
  }
}
```

## packages/shared/src/index.ts

```ts
export * from "./invariant";
export * from "./types";
```

## packages/shared/src/types.ts

```ts
export type MaybePromise<T> = T | Promise<T>;

export type Dict<T = unknown> = Record<string, T>;
```

---

# packages/legacy 设计

`legacy` 是 Phase 0 的核心包。

它的职责是：

```txt
1. 管理反解析 vendor 文件
2. 按正确顺序加载 polyfill / config / bundle
3. 提供类型较弱但稳定的 facade API
4. 屏蔽 window.hiprint 这种全局访问
5. 给后续 core 抽离提供兼容层
```

---

## packages/legacy/package.json

```json
{
  "name": "@hiprint-re/legacy",
  "version": "0.0.0",
  "type": "module",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "files": ["src", "vendor"],
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "typecheck": "tsc -p tsconfig.json --noEmit"
  },
  "dependencies": {
    "@hiprint-re/shared": "workspace:*"
  }
}
```

---

## packages/legacy/tsconfig.json

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "allowJs": false
  },
  "include": ["src"]
}
```

---

# vendor 文件管理

`vendor` 里放当前反解析产物：

```txt
packages/legacy/vendor/
├─ hiprint.bundle.js
├─ hiprint.config.js
├─ polyfill.min.js
└─ README.md
```

## vendor/README.md

```md
# Legacy vendor files

This directory contains the current reverse-parsed legacy runtime artifacts.

These files are treated as frozen inputs in Phase 0.

Do not manually refactor these files in Phase 0.

## Loading order

1. polyfill.min.js
2. hiprint.bundle.js
3. hiprint.config.js

If the actual runtime requires a different order, update `src/loadLegacy.ts`
and document the reason here.

## Purpose

The legacy runtime is wrapped by `@hiprint-re/legacy` to provide a stable
compatibility layer before extracting a framework-agnostic core.
```

加载顺序你需要根据当前 demo 实际确认。一般可能是：

```txt
polyfill -> bundle -> config
```

也可能是：

```txt
polyfill -> config -> bundle
```

Phase 0 必须把这个顺序固定下来。

---

# legacy 类型设计

## packages/legacy/src/types.ts

```ts
export interface LegacyLoadOptions {
  /**
   * Base URL for vendor scripts.
   *
   * Example:
   * /legacy/
   * /node_modules/@hiprint-re/legacy/vendor/
   */
  baseUrl?: string;

  /**
   * Whether to force reload legacy scripts.
   */
  force?: boolean;
}

export interface LegacyRuntime {
  hiprint: LegacyHiprintGlobal;
  rawWindow: Window;
}

export interface LegacyHiprintGlobal {
  [key: string]: unknown;

  init?: (...args: any[]) => any;
  print?: (...args: any[]) => any;
  preview?: (...args: any[]) => any;
}

export interface LegacyTemplateOptions {
  template?: unknown;
  settingContainer?: string | HTMLElement;
  paginationContainer?: string | HTMLElement;
  history?: boolean;
  [key: string]: unknown;
}

export interface LegacyTemplateInstance {
  design?: (...args: any[]) => any;
  preview?: (...args: any[]) => any;
  print?: (...args: any[]) => any;
  getJson?: (...args: any[]) => unknown;
  update?: (...args: any[]) => any;
  [key: string]: unknown;
}

export interface CreateLegacyTemplateOptions {
  template: unknown;
  container?: string | HTMLElement;
  settingContainer?: string | HTMLElement;
  paginationContainer?: string | HTMLElement;
  data?: unknown;
}
```

先不要追求类型完整。Phase 0 目标是包住当前行为。

---

# 全局对象声明

## packages/legacy/src/globals.ts

```ts
import type { LegacyHiprintGlobal } from "./types";

declare global {
  interface Window {
    hiprint?: LegacyHiprintGlobal;
    hiprintTemplate?: any;
    hiprintTemplateDesign?: any;
    $?: any;
    jQuery?: any;
  }
}

export function getLegacyHiprint(): LegacyHiprintGlobal | undefined {
  return window.hiprint;
}

export function hasLegacyHiprint(): boolean {
  return Boolean(window.hiprint);
}
```

---

# 加载器设计

## packages/legacy/src/loadLegacy.ts

```ts
import { invariant } from "@hiprint-re/shared";
import type { LegacyLoadOptions, LegacyRuntime } from "./types";
import { hasLegacyHiprint } from "./globals";

let loadingPromise: Promise<LegacyRuntime> | undefined;

const DEFAULT_VENDOR_BASE = "/legacy/";

const LEGACY_SCRIPTS = [
  "polyfill.min.js",
  "hiprint.bundle.js",
  "hiprint.config.js",
];

export async function loadLegacyRuntime(
  options: LegacyLoadOptions = {},
): Promise<LegacyRuntime> {
  const { baseUrl = DEFAULT_VENDOR_BASE, force = false } = options;

  if (!force && hasLegacyHiprint()) {
    return {
      hiprint: window.hiprint!,
      rawWindow: window,
    };
  }

  if (!force && loadingPromise) {
    return loadingPromise;
  }

  loadingPromise = loadScripts(baseUrl).then(() => {
    invariant(
      window.hiprint,
      "Legacy hiprint global was not found after loading scripts.",
    );

    return {
      hiprint: window.hiprint!,
      rawWindow: window,
    };
  });

  return loadingPromise;
}

async function loadScripts(baseUrl: string): Promise<void> {
  for (const script of LEGACY_SCRIPTS) {
    await loadScript(joinUrl(baseUrl, script));
  }
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-hiprint-legacy-src="${src}"]`,
    );

    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.dataset.hiprintLegacySrc = src;

    script.onload = () => resolve();
    script.onerror = () => {
      reject(new Error(`[hiprint-re] Failed to load legacy script: ${src}`));
    };

    document.head.appendChild(script);
  });
}

function joinUrl(baseUrl: string, path: string): string {
  return `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}
```

这里有几个点：

```txt
1. 防止重复加载
2. 强制保证加载顺序
3. 把 window.hiprint 隐藏在 loadLegacyRuntime 后面
4. 后续替换 runtime 时，只改这个包
```

---

# facade 设计

`facade` 是后续兼容层的关键。业务层不要直接用 `window.hiprint`。

## packages/legacy/src/facade.ts

```ts
import { invariant } from "@hiprint-re/shared";
import { loadLegacyRuntime } from "./loadLegacy";
import type {
  CreateLegacyTemplateOptions,
  LegacyLoadOptions,
  LegacyRuntime,
  LegacyTemplateInstance,
} from "./types";

export class LegacyHiprintFacade {
  private runtime: LegacyRuntime | undefined;

  async load(options?: LegacyLoadOptions): Promise<LegacyRuntime> {
    this.runtime = await loadLegacyRuntime(options);
    return this.runtime;
  }

  getRuntime(): LegacyRuntime {
    invariant(this.runtime, "Legacy runtime has not been loaded.");
    return this.runtime;
  }

  getGlobal() {
    return this.getRuntime().hiprint;
  }

  createTemplate(options: CreateLegacyTemplateOptions): LegacyTemplateInstance {
    this.getRuntime();

    const TemplateCtor = window.hiprintTemplate;

    invariant(
      TemplateCtor,
      "window.hiprintTemplate was not found. Please check legacy runtime loading order.",
    );

    return new TemplateCtor({
      template: options.template,
      settingContainer: options.settingContainer,
      paginationContainer: options.paginationContainer,
    });
  }

  design(
    instance: LegacyTemplateInstance,
    container: string | HTMLElement,
  ): void {
    invariant(
      instance.design,
      "Legacy template instance does not support design().",
    );
    instance.design(container);
  }

  preview(instance: LegacyTemplateInstance, data?: unknown): unknown {
    invariant(
      instance.preview,
      "Legacy template instance does not support preview().",
    );
    return instance.preview(data);
  }

  print(instance: LegacyTemplateInstance, data?: unknown): unknown {
    invariant(
      instance.print,
      "Legacy template instance does not support print().",
    );
    return instance.print(data);
  }

  getJson(instance: LegacyTemplateInstance): unknown {
    invariant(
      instance.getJson,
      "Legacy template instance does not support getJson().",
    );
    return instance.getJson();
  }
}

export function createLegacyHiprint(): LegacyHiprintFacade {
  return new LegacyHiprintFacade();
}
```

---

# packages/legacy/src/index.ts

```ts
export * from "./types";
export * from "./globals";
export * from "./loadLegacy";
export * from "./facade";
```

---

# apps/playground-legacy 设计

这个 playground 的目标是证明：

```txt
legacy runtime 可以加载
legacy template 可以初始化
模板可以设计 / 预览 / 打印
fixtures 可以被加载
```

---

## apps/playground-legacy/package.json

```json
{
  "name": "@hiprint-re/playground-legacy",
  "version": "0.0.0",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "vite --host 0.0.0.0",
    "build": "vite build",
    "typecheck": "tsc -p tsconfig.json --noEmit"
  },
  "dependencies": {
    "@hiprint-re/legacy": "workspace:*"
  },
  "devDependencies": {
    "vite": "^7.0.0",
    "typescript": "^5.0.0"
  }
}
```

---

## apps/playground-legacy/vite.config.ts

这里需要把 `packages/legacy/vendor` 复制到 dev server 可访问路径。

简单方案：直接写一个 Vite 插件。

```ts
import { defineConfig } from "vite";
import fs from "node:fs";
import path from "node:path";

const root = __dirname;
const repoRoot = path.resolve(root, "../..");
const legacyVendorDir = path.resolve(repoRoot, "packages/legacy/vendor");
const publicLegacyDir = path.resolve(root, "public/legacy");

function copyLegacyVendorPlugin() {
  return {
    name: "copy-legacy-vendor",
    buildStart() {
      copyDir(legacyVendorDir, publicLegacyDir);
    },
    configureServer() {
      copyDir(legacyVendorDir, publicLegacyDir);
    },
  };
}

function copyDir(from: string, to: string) {
  fs.mkdirSync(to, { recursive: true });

  for (const file of fs.readdirSync(from)) {
    const src = path.join(from, file);
    const dest = path.join(to, file);

    if (fs.statSync(src).isDirectory()) {
      copyDir(src, dest);
    } else {
      fs.copyFileSync(src, dest);
    }
  }
}

export default defineConfig({
  plugins: [copyLegacyVendorPlugin()],
  server: {
    port: 5173,
  },
});
```

---

## apps/playground-legacy/index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>hiprint legacy playground</title>
  </head>
  <body>
    <div id="app">
      <div class="toolbar">
        <button id="load">Load Legacy</button>
        <button id="design">Design</button>
        <button id="preview">Preview</button>
        <button id="print">Print</button>
        <button id="json">Get JSON</button>
      </div>

      <div class="layout">
        <div id="hiprint-container"></div>
        <div id="setting-container"></div>
      </div>

      <pre id="output"></pre>
    </div>

    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

---

## apps/playground-legacy/src/main.ts

```ts
import { createLegacyHiprint } from "@hiprint-re/legacy";
import { basicTemplate, basicData } from "./fixtures";
import "./style.css";

const legacy = createLegacyHiprint();

let templateInstance: any;

const output = document.querySelector<HTMLPreElement>("#output")!;

function log(value: unknown) {
  output.textContent =
    typeof value === "string" ? value : JSON.stringify(value, null, 2);
}

document.querySelector("#load")?.addEventListener("click", async () => {
  await legacy.load({
    baseUrl: "/legacy/",
  });

  log("Legacy runtime loaded.");
});

document.querySelector("#design")?.addEventListener("click", async () => {
  await legacy.load({
    baseUrl: "/legacy/",
  });

  templateInstance = legacy.createTemplate({
    template: basicTemplate,
    settingContainer: "#setting-container",
  });

  legacy.design(templateInstance, "#hiprint-container");

  log("Designer mounted.");
});

document.querySelector("#preview")?.addEventListener("click", () => {
  if (!templateInstance) {
    log("Template instance not created.");
    return;
  }

  const result = legacy.preview(templateInstance, basicData);
  log(result ?? "Preview opened.");
});

document.querySelector("#print")?.addEventListener("click", () => {
  if (!templateInstance) {
    log("Template instance not created.");
    return;
  }

  legacy.print(templateInstance, basicData);
});

document.querySelector("#json")?.addEventListener("click", () => {
  if (!templateInstance) {
    log("Template instance not created.");
    return;
  }

  const json = legacy.getJson(templateInstance);
  log(json);
});
```

---

## apps/playground-legacy/src/fixtures.ts

先直接引用 fixtures。

```ts
import basicTemplateJson from "../../../fixtures/templates/basic-text.json";
import basicDataJson from "../../../fixtures/data/basic-text.data.json";

export const basicTemplate = basicTemplateJson;
export const basicData = basicDataJson;
```

---

## apps/playground-legacy/src/style.css

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
  background: #f6f6f6;
  color: #111;
}

.toolbar {
  height: 48px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  border-bottom: 1px solid #ddd;
  background: white;
}

.toolbar button {
  height: 32px;
  padding: 0 12px;
  border: 1px solid #ccc;
  background: white;
  border-radius: 6px;
  cursor: pointer;
}

.layout {
  display: grid;
  grid-template-columns: 1fr 320px;
  height: calc(100vh - 48px - 180px);
}

#hiprint-container {
  overflow: auto;
  padding: 24px;
  background: #eee;
}

#setting-container {
  overflow: auto;
  border-left: 1px solid #ddd;
  background: white;
}

#output {
  height: 180px;
  margin: 0;
  padding: 12px;
  overflow: auto;
  border-top: 1px solid #ddd;
  background: #111;
  color: #eee;
  font-size: 12px;
}
```

---

# fixtures 设计

Phase 0 的 fixtures 极其重要。它是后续抽 core 的对照样本。

建议至少准备 4 类：

```txt
basic-text.json
image.json
table-basic.json
complex-order.json
```

每个模板配一个 data。

---

## fixtures/templates/basic-text.json

这个要从你当前真实能跑的 hiprint 模板里截取，不要自己凭空造。

示意结构：

```json
{
  "panels": [
    {
      "index": 0,
      "name": "default",
      "width": 210,
      "height": 297,
      "paperType": "A4",
      "printElements": [
        {
          "options": {
            "left": 20,
            "top": 20,
            "width": 120,
            "height": 20,
            "title": "订单号",
            "field": "orderNo"
          },
          "printElementType": {
            "type": "text"
          }
        }
      ]
    }
  ]
}
```

但最终一定要用真实 legacy 可识别的结构。

---

## fixtures/data/basic-text.data.json

```json
{
  "orderNo": "NO-20260531-0001",
  "customerName": "张三",
  "amount": 199.99
}
```

---

# fixtures 检查脚本

## tools/scripts/check-fixtures.ts

```ts
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(__dirname, "../..");
const templatesDir = path.resolve(root, "fixtures/templates");
const dataDir = path.resolve(root, "fixtures/data");

const templateFiles = fs
  .readdirSync(templatesDir)
  .filter((file) => file.endsWith(".json"));

for (const templateFile of templateFiles) {
  const templatePath = path.join(templatesDir, templateFile);
  const dataPath = path.join(
    dataDir,
    templateFile.replace(/\.json$/, ".data.json"),
  );

  if (!fs.existsSync(dataPath)) {
    throw new Error(`Missing data fixture for ${templateFile}`);
  }

  JSON.parse(fs.readFileSync(templatePath, "utf8"));
  JSON.parse(fs.readFileSync(dataPath, "utf8"));
}

console.log(`[fixtures] ${templateFiles.length} template fixtures checked.`);
```

根 package.json 加：

```json
{
  "scripts": {
    "check:fixtures": "tsx tools/scripts/check-fixtures.ts"
  }
}
```

需要依赖：

```bash
pnpm add -D tsx
```

---

# 测试设计

Phase 0 的测试不追求覆盖所有逻辑，重点是防止基础工程坏掉。

---

## vitest.config.ts

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["tests/**/*.test.ts"],
  },
});
```

---

## tests/legacy/loadLegacy.test.ts

因为真实 script 依赖浏览器和 vendor，单测里不一定真的加载 bundle。可以先测 loader 基础行为。

```ts
import { describe, expect, it } from "vitest";

describe("legacy loader", () => {
  it("should run in jsdom environment", () => {
    expect(typeof window).toBe("object");
    expect(typeof document).toBe("object");
  });
});
```

---

## tests/legacy/fixtures.test.ts

```ts
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "../..");
const templatesDir = path.resolve(root, "fixtures/templates");
const dataDir = path.resolve(root, "fixtures/data");

describe("fixtures", () => {
  it("all templates should have matching data fixtures", () => {
    const templates = fs
      .readdirSync(templatesDir)
      .filter((file) => file.endsWith(".json"));

    expect(templates.length).toBeGreaterThan(0);

    for (const template of templates) {
      const dataFile = template.replace(/\.json$/, ".data.json");
      const dataPath = path.join(dataDir, dataFile);

      expect(fs.existsSync(dataPath)).toBe(true);
    }
  });

  it("all fixtures should be valid json", () => {
    for (const dir of [templatesDir, dataDir]) {
      for (const file of fs.readdirSync(dir)) {
        if (!file.endsWith(".json")) continue;

        const content = fs.readFileSync(path.join(dir, file), "utf8");

        expect(() => JSON.parse(content)).not.toThrow();
      }
    }
  });
});
```

---

# E2E 测试设计

Phase 0 可以加 Playwright，但不是必须。
如果要做，就只做一个最小测试：legacy playground 能打开，点击 Load 不报错。

```bash
pnpm add -D @playwright/test
pnpm exec playwright install chromium
```

## tests/e2e/legacy-preview.spec.ts

```ts
import { test, expect } from "@playwright/test";

test("legacy playground should load", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await expect(page.locator("#load")).toBeVisible();
  await expect(page.locator("#design")).toBeVisible();
  await expect(page.locator("#preview")).toBeVisible();
});
```

`playwright.config.ts`：

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  webServer: {
    command: "pnpm --filter @hiprint-re/playground-legacy dev",
    url: "http://localhost:5173",
    reuseExistingServer: true,
  },
});
```

根 package.json：

```json
{
  "scripts": {
    "test:e2e": "playwright test"
  }
}
```

---

# legacy 行为基线文档

## docs/legacy-behavior-baseline.md

这个文档很重要，后面抽 core 时每次都对照它。

```md
# Legacy Behavior Baseline

## Runtime

- Loads polyfill
- Loads hiprint bundle
- Loads hiprint config
- Exposes `window.hiprint`
- Exposes `window.hiprintTemplate`

## Supported baseline features

### Template

- Load template JSON
- Get template JSON

### Designer

- Mount designer into container
- Render setting panel
- Edit text element
- Move element
- Resize element

### Preview

- Preview with data

### Print

- Trigger browser print

## Fixtures

- basic-text
- image
- table-basic
- complex-order

## Known limitations

- Runtime depends on global variables
- Legacy bundle is not tree-shakeable
- Some APIs are weakly typed
- Table behavior is not yet extracted
```

---

# reverse audit 文档

## docs/reverse-audit.md

Phase 0 需要开始记录，但不需要完全完成。

```md
# Reverse Audit

## Goal

Document the current reverse-parsed hiprint runtime before extracting the core.

## Known globals

- `window.hiprint`
- `window.hiprintTemplate`
- `window.$`
- `window.jQuery`

## Runtime loading order

1. polyfill
2. bundle
3. config

## Main flows

### Initialize

TODO

### Create template

TODO

### Mount designer

TODO

### Preview

TODO

### Print

TODO

## Candidate modules

### Should become core

- template model
- paper model
- element model
- data binding
- layout
- serialization

### Should become dom

- DOM rendering
- browser print
- preview iframe/window

### Should become designer

- selection
- drag
- resize
- keyboard shortcuts
- history
```

---

# Phase 0 的关键实现策略

## 1. 反解析产物只读化

建议你把 vendor 视为只读：

```txt
packages/legacy/vendor/*.js 不直接改
```

需要修 bug 时，不要直接改 vendor，而是在 facade 层加 patch：

```txt
packages/legacy/src/patches/
```

例如：

```txt
packages/legacy/src/patches/fixGlobal.ts
packages/legacy/src/patches/fixPrint.ts
```

Phase 0 可以先不建，后续需要再加。

---

## 2. 所有全局访问集中管理

错误做法：

```ts
window.hiprint.xxx();
window.hiprintTemplate.xxx();
```

正确做法：

```ts
const legacy = createLegacyHiprint()
await legacy.load()
const instance = legacy.createTemplate(...)
legacy.preview(instance, data)
```

这样后续把 legacy 替换成 core 时，调用层不会大面积炸。

---

## 3. fixtures 必须来自真实场景

不要只放 toy case。至少准备：

```txt
1. 简单文本
2. 图片
3. 基础表格
4. 真实订单/物流/标签模板
```

其中 `complex-order.json` 最重要，它是后续重构的核心回归样本。

---

## 4. 先不做漂亮 UI

Phase 0 的 playground 只要能验证即可，不需要 shadcn，不需要设计感。
UI 美化可以放后面的 designer-react。

---

# CI 设计

## .github/workflows/ci.yml

```yaml
name: CI

on:
  push:
    branches:
      - main
      - "refactor/**"
      - "feat/**"
      - "fix/**"
  pull_request:
    branches:
      - main

jobs:
  check:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 10

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm

      - name: Install
        run: pnpm install --frozen-lockfile

      - name: Typecheck
        run: pnpm typecheck

      - name: Lint
        run: pnpm lint

      - name: Test
        run: pnpm test

      - name: Build
        run: pnpm build
```

Phase 0 不建议一开始把 e2e 放进 CI，因为反解析 bundle 可能依赖浏览器环境、字体、样式、窗口等，容易导致 CI 不稳定。可以先本地跑。

后续稳定后再加：

```yaml
- name: Install Playwright
  run: pnpm exec playwright install --with-deps chromium

- name: E2E
  run: pnpm test:e2e
```

---

# PR 拆分建议

Phase 0 不建议一个 PR 塞太多。可以拆成 4 个小 PR。

## PR 1：初始化 workspace

```txt
chore: initialize pnpm workspace
```

内容：

```txt
package.json
pnpm-workspace.yaml
tsconfig.base.json
eslint
vitest
basic scripts
```

---

## PR 2：添加 legacy 包

```txt
feat(legacy): add legacy runtime wrapper
```

内容：

```txt
packages/legacy
vendor
loadLegacy
facade
types
```

---

## PR 3：添加 legacy playground

```txt
feat(playground): add legacy playground
```

内容：

```txt
apps/playground-legacy
vite config
basic page
load/design/preview/print buttons
```

---

## PR 4：添加 fixtures 和测试

```txt
test: add legacy fixtures and baseline tests
```

内容：

```txt
fixtures
tests
docs/legacy-behavior-baseline.md
docs/reverse-audit.md
```

---

# Phase 0 验收标准

Phase 0 完成的标准不是“代码看起来清爽”，而是下面这些：

```txt
1. pnpm install 成功
2. pnpm dev 能启动 legacy playground
3. 点击 Load Legacy 成功
4. 点击 Design 可以挂载设计器
5. 点击 Preview 可以预览
6. 点击 Print 可以触发打印
7. 点击 Get JSON 可以拿到模板 JSON
8. fixtures 至少有 3 个模板
9. pnpm typecheck 通过
10. pnpm test 通过
11. pnpm build 通过
12. docs 记录当前 legacy 行为基线
```

---

# Phase 0 完成后的状态

完成后，你的项目应该具备这个能力：

```ts
import { createLegacyHiprint } from "@hiprint-re/legacy";

const legacy = createLegacyHiprint();

await legacy.load({
  baseUrl: "/legacy/",
});

const instance = legacy.createTemplate({
  template,
  settingContainer: "#setting-container",
});

legacy.design(instance, "#container");
legacy.preview(instance, data);
legacy.print(instance, data);
const json = legacy.getJson(instance);
```

这个 API 虽然还是 legacy，但它已经把混乱的全局调用包住了。

后面 Phase 1 / Phase 2 就可以逐步做：

```txt
legacy template
  ↓
normalize
  ↓
core schema
  ↓
core layout
  ↓
dom renderer
  ↓
react/vue adapter
```

---

# Phase 0 最小任务清单

可以直接按这个 TODO 执行：

```txt
[ ] 创建 refactor/phase-0-legacy-foundation 分支
[ ] 初始化 package.json
[ ] 初始化 pnpm-workspace.yaml
[ ] 初始化 tsconfig.base.json
[ ] 初始化 vitest.config.ts
[ ] 创建 packages/shared
[ ] 创建 packages/legacy
[ ] 移动当前反解析产物到 packages/legacy/vendor
[ ] 实现 loadLegacyRuntime
[ ] 实现 LegacyHiprintFacade
[ ] 创建 apps/playground-legacy
[ ] 实现 Vite vendor copy 插件
[ ] 实现 Load / Design / Preview / Print / Get JSON 按钮
[ ] 添加 fixtures/templates
[ ] 添加 fixtures/data
[ ] 添加 fixtures 测试
[ ] 添加 legacy 行为基线文档
[ ] 添加 reverse-audit 文档
[ ] 跑通 pnpm dev
[ ] 跑通 pnpm check
```

---

# 我建议 Phase 0 的最终提交信息

如果一个提交完成：

```txt
refactor: establish legacy foundation for hiprint reverse project
```

如果拆多个提交：

```txt
chore: initialize pnpm workspace
feat(legacy): add legacy runtime wrapper
feat(playground): add legacy playground
test: add legacy fixtures and baseline tests
docs: document legacy behavior baseline
```

---

# 最终判断

Phase 0 的本质是：

```txt
不要急着“变干净”
先保证“可运行、可验证、可回退”
```

你现在这个项目最怕的是直接在反编译产物上继续加工。
所以 Phase 0 最重要的产出是 `@hiprint-re/legacy`，它是旧世界和新架构之间的隔离层。后续抽 `core`、做 React/Vue 适配，全部应该基于这个隔离层推进。
