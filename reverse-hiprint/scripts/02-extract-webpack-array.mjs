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
