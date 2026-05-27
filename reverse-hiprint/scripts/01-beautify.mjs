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
