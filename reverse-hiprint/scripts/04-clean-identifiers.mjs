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
