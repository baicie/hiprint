import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const docsDir = path.join(root, "docs");

const requiredSectionsByPattern = [
  {
    pattern: /^phase-\d+\.md$/,
    sections: ["# ", "Goal", "Deliverables", "Acceptance"],
  },
];

const forbiddenMarkers = [
  "TODO",
  "TBD",
  "待补充",
  "未完成",
];

function warn(message) {
  console.warn(`[check-docs] WARN: ${message}`);
}

function fail(message) {
  console.error(`[check-docs] FAIL: ${message}`);
  process.exitCode = 1;
}

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

    if (entry.isFile() && entry.name.endsWith(".md")) {
      result.push(fullPath);
    }
  }

  return result;
}

const files = walkMarkdown(docsDir);
const relativeFiles = files.map((file) => path.relative(root, file));

console.log(`[check-docs] Found ${relativeFiles.length} docs files.`);

if (files.length === 0) {
  fail("No markdown docs found.");
}

let hasFailures = false;

for (const file of files) {
  const relative = path.relative(root, file);
  const content = fs.readFileSync(file, "utf8");
  const basename = path.basename(file);

  console.log(`- ${relative}`);

  if (content.trim().length === 0) {
    fail(`${relative} is empty.`);
    hasFailures = true;
    continue;
  }

  if (!/^#\s+/m.test(content)) {
    fail(`${relative} is missing top-level heading.`);
    hasFailures = true;
    continue;
  }

  let fileHasMarkers = false;

  for (const marker of forbiddenMarkers) {
    if (content.includes(marker)) {
      warn(`${relative} contains forbidden marker: ${marker}`);
      fileHasMarkers = true;
    }
  }

  for (const rule of requiredSectionsByPattern) {
    if (!rule.pattern.test(basename)) continue;

    for (const section of rule.sections) {
      if (!content.includes(section)) {
        warn(`${relative} is missing recommended section: ${section}`);
        fileHasMarkers = true;
      }
    }
  }
}

if (hasFailures) {
  console.error("[check-docs] Docs check failed.");
  process.exit(process.exitCode ?? 1);
}

console.log("[check-docs] Docs check passed.");
