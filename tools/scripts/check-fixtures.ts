import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const root = path.resolve(path.dirname(__filename), "../..");
const templatesDir = path.resolve(root, "fixtures/templates");
const dataDir = path.resolve(root, "fixtures/data");

const templateFiles = fs
  .readdirSync(templatesDir)
  .filter((file) => file.endsWith(".json"));

for (const templateFile of templateFiles) {
  const templatePath = path.join(templatesDir, templateFile);
  const dataPath = path.join(
    dataDir,
    templateFile.replace(/\.json$/, ".data.json"),
  );

  if (!fs.existsSync(dataPath)) {
    throw new Error(`Missing data fixture for ${templateFile}`);
  }

  JSON.parse(fs.readFileSync(templatePath, "utf8"));
  JSON.parse(fs.readFileSync(dataPath, "utf8"));
}

console.log(`[fixtures] ${templateFiles.length} template fixtures checked.`);
