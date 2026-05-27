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
