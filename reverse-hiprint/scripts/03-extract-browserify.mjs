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
// deps: ${rawDeps.replace(/\n/g, "\n// ")}
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
