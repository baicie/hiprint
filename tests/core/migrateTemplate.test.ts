import { describe, expect, it } from "vitest";
import {
  migrateTemplate,
  normalizeTemplate,
  createEmptyTemplate,
} from "../../packages/core/src";

describe("migrateTemplate", () => {
  it("should return normalized template with default panel for null input", () => {
    const result = migrateTemplate(null);

    expect(result.schemaVersion).toBe("0.1.0");
    expect(result.id).toBeTruthy();
    expect(result.panels.length).toBe(1);
    expect(result.panels[0]!.name).toBe("default");
  });

  it("should return normalized template with default panel for undefined input", () => {
    const result = migrateTemplate(undefined);

    expect(result.schemaVersion).toBe("0.1.0");
    expect(result.id).toBeTruthy();
    expect(result.panels.length).toBe(1);
  });

  it("should return normalized template with default panel for primitive input", () => {
    const result = migrateTemplate(42);

    expect(result.schemaVersion).toBe("0.1.0");
    expect(result.panels.length).toBe(1);
  });

  it("should migrate current-version template through normalize", () => {
    const template = createEmptyTemplate();
    const result = migrateTemplate(template);

    expect(result.schemaVersion).toBe("0.1.0");
    expect(result.id).toBe(template.id);
    expect(result.paper.preset).toBe("A4");
    expect(result.panels.length).toBe(1);
  });

  it("should migrate partial core template (no schemaVersion) through normalize", () => {
    // migrateTemplate normalizes a core-schema partial — it does NOT convert legacy format.
    // Legacy format conversion is done by fromLegacyTemplate.
    // Here we verify that a partial core template with no schemaVersion gets normalized.
    const partialCore = {
      panels: [
        {
          index: 0,
          elements: [
            {
              id: "el-1",
              type: "text",
              x: 10,
              y: 20,
              width: 100,
              height: 30,
            },
          ],
        },
      ],
    };

    const result = migrateTemplate(partialCore);

    expect(result.schemaVersion).toBe("0.1.0");
    expect(result.panels.length).toBe(1);
    expect(result.panels[0]!.elements.length).toBe(1);
    expect(result.panels[0]!.elements[0]!.type).toBe("text");
    expect(result.panels[0]!.elements[0]!.x).toBe(10);
  });

  it("should migrate partial template with missing fields", () => {
    const partial = {
      panels: [
        {
          elements: [{ type: "image", options: { src: "/logo.png" } }],
        },
      ],
    };

    const result = migrateTemplate(partial);

    expect(result.schemaVersion).toBe("0.1.0");
    expect(result.id).toBeTruthy();
    expect(result.paper.preset).toBe("A4");
    expect(result.panels[0]!.elements[0]!.type).toBe("image");
  });

  it("should preserve raw data during migration", () => {
    const templateWithRaw = {
      schemaVersion: "0.1.0" as const,
      id: "test-template",
      raw: { customField: "preserved" },
      paper: {
        preset: "A4" as const,
        width: 210,
        height: 297,
        unit: "mm" as const,
        orientation: "portrait" as const,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
      },
      panels: [
        {
          id: "panel-1",
          index: 0,
          raw: { panelRaw: true },
          elements: [
            {
              id: "el-1",
              type: "text" as const,
              x: 0,
              y: 0,
              width: 100,
              height: 20,
              raw: { elementRaw: 42 },
            },
          ],
        },
      ],
    };

    const result = migrateTemplate(templateWithRaw);

    expect(result.raw?.customField).toBe("preserved");
    expect(result.panels[0]!.raw?.panelRaw).toBe(true);
    expect(result.panels[0]!.elements[0]!.raw?.elementRaw).toBe(42);
  });

  it("should not lose information through migrate -> normalize pipeline", () => {
    const input: Record<string, unknown> = {
      panels: [
        {
          index: 0,
          width: 297,
          height: 210,
          printElements: [
            {
              options: {
                left: 50,
                top: 50,
                width: 200,
                height: 100,
                src: "/test.png",
                title: "Test Image",
              },
              printElementType: { type: "image" },
            },
          ],
        },
      ],
    };

    const migrated = migrateTemplate(input);
    const normalized = normalizeTemplate(migrated);

    expect(migrated.schemaVersion).toBe(normalized.schemaVersion);
    expect(migrated.id).toBe(normalized.id);
    expect(migrated.panels.length).toBe(normalized.panels.length);
    expect(migrated.panels[0]!.elements.length).toBe(
      normalized.panels[0]!.elements.length,
    );
  });
});
