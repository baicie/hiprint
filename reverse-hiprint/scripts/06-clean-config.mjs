import fs from "node:fs";
import prettier from "prettier";

const input = "input/hiprint.config.js";
const output = "output/cleaned/hiprint.config.js";

let code = fs.readFileSync(input, "utf-8");

code = code.replace(/(\w+)\s*:\s*any\s*=\s*\{/g, "$1: {");

const formatted = await prettier.format(code, {
  parser: "babel",
  semi: false,
  singleQuote: true,
  printWidth: 100,
});

fs.mkdirSync("output/cleaned", { recursive: true });
fs.writeFileSync(output, formatted);

console.log(`[config] cleaned -> ${output}`);
