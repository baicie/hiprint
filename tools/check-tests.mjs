import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { spawnSync } from "node:child_process";

const root = process.cwd();

const testFilePatterns = [
  ".test.ts",
  ".test.tsx",
  ".spec.ts",
  ".spec.tsx",
];

const ignoredDirs = new Set([
  "node_modules",
  "dist",
  ".git",
  "coverage",
  ".turbo",
]);

function walk(dir, result = []) {
  const entries = fs.readdirSync(dir, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    if (ignoredDirs.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath, result);
      continue;
    }

    if (
      entry.isFile() &&
      testFilePatterns.some((pattern) => entry.name.endsWith(pattern))
    ) {
      result.push(fullPath);
    }
  }

  return result;
}

const testFiles = walk(root);
const relativeFiles = testFiles.map((file) => path.relative(root, file));

console.log(`[check-tests] Found ${relativeFiles.length} test files.`);

for (const file of relativeFiles) {
  console.log(`- ${file}`);
}

if (relativeFiles.length === 0) {
  console.error("[check-tests] No test files found.");
  process.exit(1);
}

const result = spawnSync(
  "pnpm",
  ["vitest", "run", "--passWithNoTests"],
  {
    stdio: "inherit",
    shell: process.platform === "win32",
  },
);

if (result.status !== 0) {
  console.error("[check-tests] Vitest failed.");
  process.exit(result.status ?? 1);
}

console.log("[check-tests] All tests passed.");
