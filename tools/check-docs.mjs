import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const docsDir = path.join(root, "docs");

const SKIP_DIRS = ["archive", "review"];
const SKIP_FILES = [
  "_status.md",
  "roadmap.md",
  "phase0.md",
  "phase6.md",
];

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

function shouldSkip(filePath) {
  const rel = path.relative(root, filePath);
  const dir = path.dirname(rel).split(path.sep).pop();
  const basename = path.basename(filePath);
  return SKIP_DIRS.includes(dir) || SKIP_FILES.includes(basename);
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
let skipped = 0;

for (const file of files) {
  const relative = path.relative(root, file);
  const basename = path.basename(file);

  if (shouldSkip(file)) {
    console.log(`- ${relative} [skipped]`);
    skipped++;
    continue;
  }

  console.log(`- ${relative}`);

  const content = fs.readFileSync(file, "utf8");

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

  for (const marker of forbiddenMarkers) {
    if (content.includes(marker)) {
      fail(`${relative} contains forbidden marker: ${marker}`);
      hasFailures = true;
    }
  }

  for (const rule of requiredSectionsByPattern) {
    if (!rule.pattern.test(basename)) continue;

    for (const section of rule.sections) {
      if (!content.includes(section)) {
        fail(`${relative} is missing required section: ${section}`);
        hasFailures = true;
      }
    }
  }
}

console.log(`[check-docs] Skipped ${skipped} non-production docs.`);

if (hasFailures) {
  console.error("[check-docs] Docs check failed.");
  process.exit(process.exitCode ?? 1);
}

console.log("[check-docs] Docs check passed.");
