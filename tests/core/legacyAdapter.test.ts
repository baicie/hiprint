import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  fromLegacyTemplate,
  toLegacyTemplate,
  validateTemplate,
  normalizeTemplate,
} from "../../packages/core/src";

const fixturesRoot = path.resolve(process.cwd(), "fixtures/templates");

describe("legacy adapter", () => {
  function readFixture(name: string) {
    return JSON.parse(fs.readFileSync(path.join(fixturesRoot, name), "utf8"));
  }

  describe("basic-text fixture", () => {
    const legacyTemplate = readFixture("basic-text.json");

    it("should convert legacy template to core template", () => {
      const coreTemplate = fromLegacyTemplate(legacyTemplate);

      expect(coreTemplate.schemaVersion).toBe("0.1.0");
      expect(coreTemplate.meta?.source).toBe("legacy");
      expect(coreTemplate.panels.length).toBe(1);

      const panel = coreTemplate.panels[0]!;
      expect(panel.elements.length).toBe(7);

      const textEl = panel.elements.find((e) => e.type === "text");
      expect(textEl).toBeDefined();
      expect(textEl?.binding?.title).toBe("打印设计器示例");
      expect(textEl?.style?.fontSize).toBe(19);
    });

    it("should preserve raw legacy data", () => {
      const coreTemplate = fromLegacyTemplate(legacyTemplate);

      expect(coreTemplate.raw?.legacy).toBeTruthy();
      expect(coreTemplate.panels[0]?.raw?.legacyPanel).toBeTruthy();
      expect(
        coreTemplate.panels[0]?.elements[0]?.raw?.legacyElement,
      ).toBeTruthy();
    });

    it("should convert core template back to legacy template", () => {
      const coreTemplate = fromLegacyTemplate(legacyTemplate);
      const legacyAgain = toLegacyTemplate(coreTemplate);

      expect(Array.isArray(legacyAgain.panels)).toBe(true);
      expect(legacyAgain.panels?.[0]?.printElements?.length).toBe(7);
    });

    it("should validate after conversion", () => {
      const coreTemplate = fromLegacyTemplate(legacyTemplate);
      const result = validateTemplate(coreTemplate);

      expect(result.valid).toBe(true);
    });

    it("should map all element types correctly", () => {
      const coreTemplate = fromLegacyTemplate(legacyTemplate);
      const panel = coreTemplate.panels[0]!;

      const types = panel.elements.map((e) => e.type);
      expect(types).toContain("text");
      expect(types).toContain("image");
      expect(types).toContain("line");
      expect(types).toContain("rect");
    });
  });

  describe("image fixture", () => {
    const legacyTemplate = readFixture("image.json");

    it("should convert image element", () => {
      const coreTemplate = fromLegacyTemplate(legacyTemplate);
      const panel = coreTemplate.panels[0]!;

      const imageEl = panel.elements.find((e) => e.type === "image");
      expect(imageEl).toBeDefined();
      expect(imageEl?.options?.src).toBe("/Content/assets/hi.png");
      expect(imageEl?.binding?.title).toBe("示例图片");
    });
  });

  describe("table-basic fixture", () => {
    const legacyTemplate = readFixture("table-basic.json");

    it("should convert table element with columns", () => {
      const coreTemplate = fromLegacyTemplate(legacyTemplate);
      const panel = coreTemplate.panels[0]!;
      const tableEl = panel.elements.find((e) => e.type === "table");

      expect(tableEl).toBeDefined();
      expect(tableEl?.type).toBe("table");

      const options = (tableEl as { options?: Record<string, unknown> }).options;
      expect(options).toBeDefined();
      expect(Array.isArray(options?.columns)).toBe(true);
      expect((options?.columns as unknown[])?.length).toBe(5);
    });
  });

  describe("complex-order fixture", () => {
    const legacyTemplate = readFixture("complex-order.json");

    it("should handle complex template with many elements", () => {
      const coreTemplate = fromLegacyTemplate(legacyTemplate);

      expect(coreTemplate.schemaVersion).toBe("0.1.0");
      expect(coreTemplate.panels.length).toBe(1);

      const panel = coreTemplate.panels[0]!;
      expect(panel.elements.length).toBe(13);

      const result = validateTemplate(coreTemplate);
      expect(result.valid).toBe(true);
    });

    it("should preserve dynamic field bindings", () => {
      const coreTemplate = fromLegacyTemplate(legacyTemplate);
      const panel = coreTemplate.panels[0]!;

      const fieldBindings = panel.elements
        .filter((e) => e.binding?.field)
        .map((e) => e.binding?.field);

      expect(fieldBindings).toContain("email");
      expect(fieldBindings).toContain("address");
      expect(fieldBindings).toContain("phone");
      expect(fieldBindings).toContain("target");
    });

    it("should handle hideTitle flag from legacy", () => {
      const coreTemplate = fromLegacyTemplate(legacyTemplate);
      const panel = coreTemplate.panels[0]!;

      const elementsWithRaw = panel.elements.filter(
        (e) => e.raw?.legacyElement,
      );
      expect(elementsWithRaw.length).toBeGreaterThan(0);
    });
  });

  describe("round-trip fidelity", () => {
    it("should preserve element count through round-trip for all fixtures", () => {
      const fixtureNames = fs
        .readdirSync(fixturesRoot)
        .filter((f) => f.endsWith(".json"));

      for (const name of fixtureNames) {
        const legacy = readFixture(name);
        const core = fromLegacyTemplate(legacy);
        const restored = toLegacyTemplate(core);

        const originalCount =
          legacy.panels?.[0]?.printElements?.length ?? 0;
        const restoredCount =
          restored.panels?.[0]?.printElements?.length ?? 0;

        expect(restoredCount).toBe(originalCount);
      }
    });
  });

  describe("style and binding field mapping", () => {
    it("should map border and padding fields to style", () => {
      const legacy = {
        panels: [
          {
            printElements: [
              {
                options: {
                  left: 0,
                  top: 0,
                  width: 100,
                  height: 20,
                  borderColor: "#000",
                  borderWidth: 1,
                  borderStyle: "solid",
                  paddingTop: 4,
                  paddingRight: 8,
                  paddingBottom: 4,
                  paddingLeft: 8,
                },
                printElementType: { type: "rect" },
              },
            ],
          },
        ],
      };

      const core = fromLegacyTemplate(legacy);
      const el = core.panels[0]!.elements[0]!;

      expect(el.style?.borderColor).toBe("#000");
      expect(el.style?.borderWidth).toBe(1);
      expect(el.style?.borderStyle).toBe("solid");
      expect(el.style?.paddingTop).toBe(4);
      expect(el.style?.paddingRight).toBe(8);
      expect(el.style?.paddingBottom).toBe(4);
      expect(el.style?.paddingLeft).toBe(8);
    });

    it("should map verticalAlign to style", () => {
      const legacy = {
        panels: [
          {
            printElements: [
              {
                options: {
                  left: 0,
                  top: 0,
                  width: 100,
                  height: 20,
                  verticalAlign: "middle",
                },
                printElementType: { type: "text" },
              },
            ],
          },
        ],
      };

      const core = fromLegacyTemplate(legacy);
      const el = core.panels[0]!.elements[0]!;

      expect(el.style?.verticalAlign).toBe("middle");
    });

    it("should map formatter and expression to binding", () => {
      const legacy = {
        panels: [
          {
            printElements: [
              {
                options: {
                  left: 0,
                  top: 0,
                  width: 100,
                  height: 20,
                  field: "price",
                  formatter: "{value} 元",
                  expression: "price > 0",
                },
                printElementType: { type: "text" },
              },
            ],
          },
        ],
      };

      const core = fromLegacyTemplate(legacy);
      const el = core.panels[0]!.elements[0]!;

      expect(el.binding?.field).toBe("price");
      expect(el.binding?.formatter).toBe("{value} 元");
      expect(el.binding?.expression).toBe("price > 0");
    });

    it("should preserve border/padding and formatter/expression through round-trip", () => {
      const legacy = {
        panels: [
          {
            printElements: [
              {
                options: {
                  left: 10,
                  top: 20,
                  width: 100,
                  height: 40,
                  borderColor: "#333",
                  borderWidth: 2,
                  borderStyle: "dashed",
                  paddingTop: 5,
                  paddingRight: 10,
                  paddingBottom: 5,
                  paddingLeft: 10,
                  field: "total",
                  formatter: "${value}",
                  expression: "total > 0",
                },
                printElementType: { type: "rect" },
              },
            ],
          },
        ],
      };

      const core = fromLegacyTemplate(legacy);
      const restored = toLegacyTemplate(core);
      const opts = restored.panels?.[0]?.printElements?.[0]?.options;

      expect(opts?.borderColor).toBe("#333");
      expect(opts?.borderWidth).toBe(2);
      expect(opts?.borderStyle).toBe("dashed");
      expect(opts?.paddingTop).toBe(5);
      expect(opts?.paddingRight).toBe(10);
      expect(opts?.paddingBottom).toBe(5);
      expect(opts?.paddingLeft).toBe(10);
      expect(opts?.field).toBe("total");
      expect(opts?.formatter).toBe("${value}");
      expect(opts?.expression).toBe("total > 0");
    });
  });

  describe("rotate / hidden / locked round-trip", () => {
    it("should extract and round-trip rotate", () => {
      const legacy = {
        panels: [
          {
            printElements: [
              {
                options: {
                  left: 10,
                  top: 20,
                  width: 80,
                  height: 30,
                  rotate: 90,
                },
                printElementType: { type: "text" },
              },
            ],
          },
        ],
      };

      const core = fromLegacyTemplate(legacy);
      const restored = toLegacyTemplate(core);
      const opts = restored.panels?.[0]?.printElements?.[0]?.options;

      expect(core.panels[0]!.elements[0]!.rotate).toBe(90);
      expect(opts?.rotate).toBe(90);
    });

    it("should extract and round-trip hidden", () => {
      const legacy = {
        panels: [
          {
            printElements: [
              {
                options: {
                  left: 10,
                  top: 20,
                  width: 80,
                  height: 30,
                  hidden: true,
                },
                printElementType: { type: "text" },
              },
            ],
          },
        ],
      };

      const core = fromLegacyTemplate(legacy);
      const restored = toLegacyTemplate(core);
      const opts = restored.panels?.[0]?.printElements?.[0]?.options;

      expect(core.panels[0]!.elements[0]!.hidden).toBe(true);
      expect(opts?.hidden).toBe(true);
    });

    it("should map fixed to locked and round-trip", () => {
      const legacy = {
        panels: [
          {
            printElements: [
              {
                options: {
                  left: 10,
                  top: 20,
                  width: 80,
                  height: 30,
                  fixed: true,
                },
                printElementType: { type: "rect" },
              },
            ],
          },
        ],
      };

      const core = fromLegacyTemplate(legacy);
      const restored = toLegacyTemplate(core);
      const opts = restored.panels?.[0]?.printElements?.[0]?.options;

      expect(core.panels[0]!.elements[0]!.locked).toBe(true);
      expect(opts?.fixed).toBe(true);
    });
  });

  describe("line/html/barcode/qrcode style round-trip", () => {
    it("should preserve style.borderWidth for line element through round-trip", () => {
      const legacy = {
        panels: [
          {
            printElements: [
              {
                options: {
                  left: 0,
                  top: 10,
                  width: 100,
                  height: 1,
                  borderWidth: 2,
                  borderColor: "#000",
                },
                printElementType: { type: "line" },
              },
            ],
          },
        ],
      };

      const core = fromLegacyTemplate(legacy);
      const restored = toLegacyTemplate(core);
      const opts = restored.panels?.[0]?.printElements?.[0]?.options;

      expect(opts?.borderWidth).toBe(2);
      expect(opts?.borderColor).toBe("#000");
    });

    it("should preserve style.paddingTop for html element through round-trip", () => {
      const legacy = {
        panels: [
          {
            printElements: [
              {
                options: {
                  left: 0,
                  top: 10,
                  width: 100,
                  height: 40,
                  paddingTop: 6,
                  paddingLeft: 10,
                },
                printElementType: { type: "customHtml" },
              },
            ],
          },
        ],
      };

      const core = fromLegacyTemplate(legacy);
      const restored = toLegacyTemplate(core);
      const opts = restored.panels?.[0]?.printElements?.[0]?.options;

      expect(opts?.paddingTop).toBe(6);
      expect(opts?.paddingLeft).toBe(10);
    });

    it("should preserve style fields AND type-specific options for barcode element", () => {
      const legacy = {
        panels: [
          {
            printElements: [
              {
                options: {
                  left: 0,
                  top: 10,
                  width: 80,
                  height: 30,
                  borderColor: "#333",
                  borderWidth: 1,
                  paddingRight: 4,
                  value: "12345678",
                  format: "CODE128",
                },
                printElementType: { type: "barcode" },
              },
            ],
          },
        ],
      };

      const core = fromLegacyTemplate(legacy);
      const restored = toLegacyTemplate(core);
      const opts = restored.panels?.[0]?.printElements?.[0]?.options;

      expect(opts?.borderColor).toBe("#333");
      expect(opts?.borderWidth).toBe(1);
      expect(opts?.paddingRight).toBe(4);
      expect(opts?.value).toBe("12345678");
      expect(opts?.format).toBe("CODE128");
    });
  });

  describe("fontColor alias mapping", () => {
    it("should map fontColor field to style.color", () => {
      const legacy = {
        panels: [
          {
            printElements: [
              {
                options: {
                  left: 0,
                  top: 0,
                  width: 100,
                  height: 20,
                  fontColor: "#ff0000",
                },
                printElementType: { type: "text" },
              },
            ],
          },
        ],
      };

      const core = fromLegacyTemplate(legacy);
      const el = core.panels[0]!.elements[0]!;

      expect(el.style?.color).toBe("#ff0000");
    });

    it("should round-trip fontColor through legacy conversion", () => {
      const legacy = {
        panels: [
          {
            printElements: [
              {
                options: {
                  left: 0,
                  top: 0,
                  width: 100,
                  height: 20,
                  fontColor: "#ff0000",
                },
                printElementType: { type: "text" },
              },
            ],
          },
        ],
      };

      const core = fromLegacyTemplate(legacy);
      const restored = toLegacyTemplate(core);
      const opts = restored.panels?.[0]?.printElements?.[0]?.options;

      expect(opts?.fontColor).toBe("#ff0000");
    });
  });
});
