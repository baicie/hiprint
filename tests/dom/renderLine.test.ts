import { describe, expect, it } from "vitest";
import { createEmptyTemplate, layoutTemplate } from "../../packages/core/src";
import { renderToDom } from "../../packages/dom/src";

describe("render line", () => {
  it("should render horizontal line", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "hline_1",
      type: "line",
      x: 10,
      y: 20,
      width: 100,
      height: 2,
      direction: "horizontal",
    });

    const layout = layoutTemplate(template, {});

    const result = renderToDom(layout);

    const line = result.root.querySelector<HTMLElement>(
      '[data-element-id="hline_1"]',
    );

    expect(line).toBeTruthy();
    expect(line?.className).toContain("hiprint-re-line");
    expect(line?.dataset.elementType).toBe("line");

    result.dispose();
  });

  it("should render vertical line", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "vline_1",
      type: "line",
      x: 10,
      y: 20,
      width: 2,
      height: 50,
      direction: "vertical",
    });

    const layout = layoutTemplate(template, {});

    const result = renderToDom(layout);

    const line = result.root.querySelector<HTMLElement>(
      '[data-element-id="vline_1"]',
    );

    expect(line?.dataset.elementType).toBe("line");

    result.dispose();
  });

  it("should preserve border style on legacy line elements", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "vline_dotted",
      type: "line",
      x: 10,
      y: 20,
      width: 2,
      height: 50,
      style: {
        borderStyle: "dotted",
        borderWidth: 2,
        borderColor: "#f00808",
      },
      options: {
        direction: "vertical",
      },
    });

    const layout = layoutTemplate(template, {});

    const result = renderToDom(layout);

    const line = result.root.querySelector<HTMLElement>(
      '[data-element-id="vline_dotted"]',
    );

    expect(line?.style.borderLeft).toBe("2mm dotted rgb(240, 8, 8)");

    result.dispose();
  });
});
