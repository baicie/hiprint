import { describe, expect, it } from "vitest";
import {
  normalizeTemplate,
  getPresetDimensions,
} from "../../packages/core/src";

describe("normalizeTemplate", () => {
  it("should fill missing fields with defaults", () => {
    const template = normalizeTemplate({});

    expect(template.schemaVersion).toBe("0.1.0");
    expect(template.id).toBeTruthy();
    expect(template.paper.preset).toBe("A4");
    expect(template.paper.width).toBe(210);
    expect(template.paper.height).toBe(297);
    expect(template.paper.unit).toBe("mm");
    expect(template.paper.orientation).toBe("portrait");
    expect(template.panels.length).toBe(1);
    expect(template.panels[0]!.id).toBeTruthy();
    expect(template.panels[0]!.index).toBe(0);
    expect(template.panels[0]!.name).toBe("default");
    expect(template.panels[0]!.elements).toEqual([]);
  });

  it("should preserve provided values", () => {
    const template = normalizeTemplate({
      id: "my-template",
      paper: {
        preset: "A3",
        width: 297,
        height: 420,
        unit: "mm",
        orientation: "landscape",
      },
      panels: [],
    });

    expect(template.id).toBe("my-template");
    expect(template.paper.preset).toBe("A3");
    expect(template.paper.width).toBe(297);
    expect(template.paper.height).toBe(420);
    expect(template.paper.orientation).toBe("landscape");
  });

  it("should normalize panels", () => {
    const template = normalizeTemplate({
      panels: [
        {
          elements: [
            { type: "text", x: 10, y: 20, width: 100, height: 30 },
          ],
        },
      ],
    });

    expect(template.panels.length).toBe(1);
    expect(template.panels[0]?.id).toBeTruthy();
    expect(template.panels[0]?.index).toBe(0);
    expect(template.panels[0]?.elements.length).toBe(1);
    expect(template.panels[0]?.elements[0]?.id).toBeTruthy();
  });

  it("should default panel name to index-based fallback", () => {
    const template = normalizeTemplate({
      panels: [{}],
    });

    expect(template.panels[0]?.name).toBe("panel-0");
  });

  it("should default element type to unknown", () => {
    const template = normalizeTemplate({
      panels: [
        {
          elements: [
            { x: 0, y: 0, width: 10, height: 10 },
          ],
        },
      ],
    });

    expect(template.panels[0]?.elements[0]?.type).toBe("unknown");
  });

  it("should preserve raw data", () => {
    const template = normalizeTemplate({
      raw: { custom: "data" },
      panels: [
        {
          raw: { panelCustom: true },
          elements: [
            {
              raw: { elementCustom: 123 },
              x: 0,
              y: 0,
              width: 0,
              height: 0,
            },
          ],
        },
      ],
    });

    expect(template.raw).toEqual({ custom: "data" });
    expect(template.panels[0]?.raw).toEqual({ panelCustom: true });
    expect(template.panels[0]?.elements[0]?.raw).toEqual({ elementCustom: 123 });
  });

  it("should use preset dimensions when preset is provided", () => {
    const template = normalizeTemplate({
      paper: { preset: "A3" },
    });

    expect(template.paper.preset).toBe("A3");
    expect(template.paper.width).toBe(297);
    expect(template.paper.height).toBe(420);
  });

  it("should use explicit dimensions over preset when both are provided", () => {
    const template = normalizeTemplate({
      paper: {
        preset: "A4",
        width: 100,
        height: 200,
      },
    });

    expect(template.paper.preset).toBe("A4");
    expect(template.paper.width).toBe(100);
    expect(template.paper.height).toBe(200);
  });

  it("should fall back to A4 dimensions for custom preset", () => {
    const template = normalizeTemplate({
      paper: { preset: "custom" },
    });

    expect(template.paper.preset).toBe("custom");
    expect(template.paper.width).toBe(210);
    expect(template.paper.height).toBe(297);
  });
});
