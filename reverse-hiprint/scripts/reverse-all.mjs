import { execSync } from "node:child_process";

const steps = [
  "node scripts/01-beautify.mjs",
  "node scripts/02-extract-webpack-array.mjs",
  "node scripts/03-extract-browserify.mjs",
  "node scripts/04-clean-identifiers.mjs",
  "node scripts/05-scan-api.mjs",
  "node scripts/06-clean-config.mjs",
  "node scripts/07-scan-webpack-deps.mjs",
];

for (const step of steps) {
  console.log(`\n> ${step}`);
  execSync(step, {
    stdio: "inherit",
  });
}

console.log("\nreverse done.");
