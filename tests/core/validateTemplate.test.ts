import { describe, expect, it } from "vitest";
import { createEmptyTemplate, validateTemplate } from "../../packages/core/src";

describe("validateTemplate", () => {
  it("should validate an empty template created by createEmptyTemplate", () => {
    const template = createEmptyTemplate();
    const result = validateTemplate(template);

    expect(result.valid).toBe(true);
    expect(result.issues).toEqual([]);
  });

  it("should report missing template id", () => {
    const template = createEmptyTemplate();
    // @ts-expect-error — intentionally invalid for testing
    delete template.id;

    const result = validateTemplate(template);

    expect(result.valid).toBe(false);
    expect(result.issues.some((i) => i.code === "template.id.missing")).toBe(true);
  });

  it("should report invalid paper dimensions", () => {
    const template = createEmptyTemplate();
    template.paper.width = 0;
    template.paper.height = -1;

    const result = validateTemplate(template);

    expect(result.valid).toBe(false);
    expect(result.issues.some((i) => i.code === "paper.width.invalid")).toBe(true);
    expect(result.issues.some((i) => i.code === "paper.height.invalid")).toBe(true);
  });

  it("should report empty panels", () => {
    const template = createEmptyTemplate();
    template.panels = [];

    const result = validateTemplate(template);

    expect(result.valid).toBe(false);
    expect(result.issues.some((i) => i.code === "template.panels.empty")).toBe(true);
  });

  it("should report invalid element size", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "el_1",
      type: "text",
      x: 0,
      y: 0,
      width: -1,
      height: 10,
    });

    const result = validateTemplate(template);

    expect(result.valid).toBe(false);
    expect(result.issues.some((i) => i.code === "element.size.invalid")).toBe(true);
  });

  it("should report duplicated element ids", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push(
      {
        id: "el_dup",
        type: "text",
        x: 0,
        y: 0,
        width: 10,
        height: 10,
      },
      {
        id: "el_dup",
        type: "image",
        x: 10,
        y: 0,
        width: 20,
        height: 20,
      },
    );

    const result = validateTemplate(template);

    expect(result.valid).toBe(false);
    expect(result.issues.some((i) => i.code === "element.id.duplicated")).toBe(true);
  });

  it("should NOT warn on 'unknown' element type (expected fallback)", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "el_unknown",
      type: "unknown",
      x: 0,
      y: 0,
      width: 10,
      height: 10,
    });

    const result = validateTemplate(template);

    expect(result.valid).toBe(true);
    expect(result.issues.some((i) => i.code === "element.type.unregistered")).toBe(false);
  });

  it("should warn on unregistered element type", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "el_typo",
      type: "custom-widget",
      x: 0,
      y: 0,
      width: 10,
      height: 10,
    });

    const result = validateTemplate(template);

    expect(result.valid).toBe(true);
    expect(result.issues.some((i) => i.code === "element.type.unregistered")).toBe(true);
  });
});
