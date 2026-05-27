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
