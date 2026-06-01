import { describe, expect, it } from "vitest";
import { createEmptyTemplate, layoutTemplate } from "../../packages/core/src";
import { renderToDom } from "../../packages/dom/src";

describe("render rect", () => {
  it("should render rect element", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "rect_1",
      type: "rect",
      x: 10,
      y: 10,
      width: 50,
      height: 30,
    });

    const layout = layoutTemplate(template, {});

    const result = renderToDom(layout);

    const rect = result.root.querySelector<HTMLElement>(
      '[data-element-id="rect_1"]',
    );

    expect(rect).toBeTruthy();
    expect(rect?.className).toContain("hiprint-re-rect");
    expect(rect?.dataset.elementType).toBe("rect");

    result.dispose();
  });

  it("should apply default border styles when none set", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "rect_1",
      type: "rect",
      x: 10,
      y: 10,
      width: 50,
      height: 30,
    });

    const layout = layoutTemplate(template, {});

    const result = renderToDom(layout);

    const rect = result.root.querySelector<HTMLElement>(
      '[data-element-id="rect_1"]',
    );

    expect(rect?.style.borderStyle).toBe("solid");
    expect(rect?.style.borderWidth).toBe("1px");
    expect(rect?.style.borderColor).toBeTruthy();

    result.dispose();
  });
});
