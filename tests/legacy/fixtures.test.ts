import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "../..");
const templatesDir = path.resolve(root, "fixtures/templates");
const dataDir = path.resolve(root, "fixtures/data");

describe("fixtures", () => {
  it("all templates should have matching data fixtures", () => {
    const templates = fs
      .readdirSync(templatesDir)
      .filter((file) => file.endsWith(".json"));

    expect(templates.length).toBeGreaterThan(0);

    for (const template of templates) {
      const dataFile = template.replace(/\.json$/, ".data.json");
      const dataPath = path.join(dataDir, dataFile);

      expect(fs.existsSync(dataPath)).toBe(true);
    }
  });

  it("all fixtures should be valid json", () => {
    for (const dir of [templatesDir, dataDir]) {
      for (const file of fs.readdirSync(dir)) {
        if (!file.endsWith(".json")) continue;

        const content = fs.readFileSync(path.join(dir, file), "utf8");

        expect(() => JSON.parse(content)).not.toThrow();
      }
    }
  });
});
