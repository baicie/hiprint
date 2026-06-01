import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const docsDir = path.join(root, "docs");
const outputPath = path.join(docsDir, "_status.md");

function walkMarkdown(dir, result = []) {
  if (!fs.existsSync(dir)) return result;

  const entries = fs.readdirSync(dir, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walkMarkdown(fullPath, result);
      continue;
    }

    if (
      entry.isFile() &&
      entry.name.endsWith(".md") &&
      entry.name !== "_status.md"
    ) {
      result.push(fullPath);
    }
  }

  return result;
}

const files = walkMarkdown(docsDir);

const rows = files.map((file) => {
  const relative = path.relative(root, file);
  const content = fs.readFileSync(file, "utf8");
  const hasTitle = /^#\s+/m.test(content);
  const hasTodo = /TODO|TBD|待补充|未完成/.test(content);

  return {
    file: relative,
    size: content.length,
    hasTitle,
    hasTodo,
  };
});

const markdown = [
  "# Docs Status",
  "",
  `Total docs: ${rows.length}`,
  "",
  "File | Size | Title | TODO Marker",
  "--- | ---: | --- | --- |",
  ...rows.map(
    (row) =>
      `${row.file} | ${row.size} | ${row.hasTitle ? "yes" : "no"} | ${row.hasTodo ? "yes" : "no"}`,
  ),
  "",
].join("\n");

fs.writeFileSync(outputPath, markdown);

console.log(`[docs-report] Generated ${path.relative(root, outputPath)}`);
