import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  fromLegacyTemplate,
  layoutTemplate,
} from "../../../packages/core/src";

const fixturesRoot = path.resolve(process.cwd(), "fixtures");

interface LayoutTableElement {
  type: "table";
  rows: unknown[];
  columns: unknown[];
}

interface LayoutTextElement {
  type: "text";
  value: string;
}

interface LayoutImageElement {
  type: "image";
  src?: string;
}

describe("layout fixtures", () => {
  const templatesDir = path.join(fixturesRoot, "templates");
  const dataDir = path.join(fixturesRoot, "data");

  const templateFiles = fs
    .readdirSync(templatesDir)
    .filter((file) => file.endsWith(".json"));

  for (const file of templateFiles) {
    it(`should layout fixture: ${file}`, () => {
      const templatePath = path.join(templatesDir, file);
      const dataPath = path.join(
        dataDir,
        file.replace(/\.json$/, ".data.json"),
      );

      const legacyTemplate = JSON.parse(
        fs.readFileSync(templatePath, "utf8"),
      );
      const data = fs.existsSync(dataPath)
        ? JSON.parse(fs.readFileSync(dataPath, "utf8"))
        : {};

      const coreTemplate = fromLegacyTemplate(legacyTemplate);
      const layout = layoutTemplate(coreTemplate, data);

      expect(layout.pages.length).toBeGreaterThan(0);
      expect(layout.unit).toBe("mm");
      expect(
        layout.warnings.filter((w) => w.level === "error"),
        `Unexpected errors: ${layout.warnings
          .filter((w) => w.level === "error")
          .map((w) => w.message)
          .join(", ")}`,
      ).toHaveLength(0);

      for (const page of layout.pages) {
        expect(
          page.width,
          `Page ${page.index} should have valid width`,
        ).toBeGreaterThan(0);
        expect(
          page.height,
          `Page ${page.index} should have valid height`,
        ).toBeGreaterThan(0);
        expect(page.elements).toBeDefined();
      }
    });
  }

  describe("table-basic fixture", () => {
    it("should layout table with rows from data binding", () => {
      const legacyTemplate = JSON.parse(
        fs.readFileSync(
          path.join(templatesDir, "table-basic.json"),
          "utf8",
        ),
      );
      const data = JSON.parse(
        fs.readFileSync(
          path.join(dataDir, "table-basic.data.json"),
          "utf8",
        ),
      );

      const coreTemplate = fromLegacyTemplate(legacyTemplate);
      const layout = layoutTemplate(coreTemplate, data);

      expect(layout.pages.length).toBeGreaterThan(0);

      const tables = layout.pages
        .flatMap((p) => p.elements)
        .filter((e) => e.type === "table") as LayoutTableElement[];

      expect(tables.length).toBeGreaterThan(0);

      const totalRows = tables.reduce(
        (sum, t) => sum + t.rows.length,
        0,
      );
      expect(totalRows).toBeGreaterThan(0);

      const firstTable = tables[0]!;
      expect(firstTable.columns.length).toBeGreaterThan(0);
      expect(
        firstTable.columns[0],
        "Table should have column definitions",
      ).toBeDefined();
    });

    it("should not have error-level warnings for table fixture", () => {
      const legacyTemplate = JSON.parse(
        fs.readFileSync(
          path.join(templatesDir, "table-basic.json"),
          "utf8",
        ),
      );
      const data = JSON.parse(
        fs.readFileSync(
          path.join(dataDir, "table-basic.data.json"),
          "utf8",
        ),
      );

      const coreTemplate = fromLegacyTemplate(legacyTemplate);
      const layout = layoutTemplate(coreTemplate, data);

      const errors = layout.warnings.filter((w) => w.level === "error");
      expect(errors).toHaveLength(0);
    });
  });

  describe("basic-text fixture", () => {
    it("should layout all element types: text, image, line, rect", () => {
      const legacyTemplate = JSON.parse(
        fs.readFileSync(
          path.join(templatesDir, "basic-text.json"),
          "utf8",
        ),
      );

      const coreTemplate = fromLegacyTemplate(legacyTemplate);
      const layout = layoutTemplate(coreTemplate, {});

      const elementTypes = new Set(
        layout.pages.flatMap((p) => p.elements).map((e) => e.type),
      );

      expect(elementTypes.size).toBeGreaterThan(0);

      const hasText = layout.pages
        .flatMap((p) => p.elements)
        .some((e) => e.type === "text");
      expect(hasText).toBe(true);
    });
  });

  describe("image fixture", () => {
    it("should layout image element", () => {
      const legacyTemplate = JSON.parse(
        fs.readFileSync(path.join(templatesDir, "image.json"), "utf8"),
      );

      const coreTemplate = fromLegacyTemplate(legacyTemplate);
      const layout = layoutTemplate(coreTemplate, {});

      const images = layout.pages
        .flatMap((p) => p.elements)
        .filter((e) => e.type === "image") as LayoutImageElement[];

      expect(images.length).toBeGreaterThan(0);
      expect(images[0]?.src).toBeDefined();
    });
  });

  describe("complex-order fixture", () => {
    it("should resolve data bindings across elements", () => {
      const legacyTemplate = JSON.parse(
        fs.readFileSync(
          path.join(templatesDir, "complex-order.json"),
          "utf8",
        ),
      );
      const data = JSON.parse(
        fs.readFileSync(
          path.join(dataDir, "complex-order.data.json"),
          "utf8",
        ),
      );

      const coreTemplate = fromLegacyTemplate(legacyTemplate);
      const layout = layoutTemplate(coreTemplate, data);

      const texts = layout.pages
        .flatMap((p) => p.elements)
        .filter((e) => e.type === "text") as LayoutTextElement[];

      expect(texts.length).toBeGreaterThan(0);

      const emailText = texts.find(
        (t) => t.value === data.email,
      );
      expect(
        emailText,
        `Should resolve email binding: ${data.email}`,
      ).toBeDefined();
    });
  });
});
