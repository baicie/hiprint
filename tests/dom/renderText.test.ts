import { describe, expect, it } from "vitest";
import {
  createEmptyTemplate,
  layoutTemplate,
  type PrintTemplate,
  type PrintPanel,
} from "../../packages/core/src";
import { renderToDom } from "../../packages/dom/src";

function makeTemplateWithText(panel?: PrintPanel): PrintTemplate {
  const template = createEmptyTemplate();
  template.panels[0]!.elements.push({
    id: "text_1",
    type: "text",
    x: 10,
    y: 20,
    width: 80,
    height: 10,
    binding: {
      field: "orderNo",
    },
  });
  return template;
}

describe("render text", () => {
  it("should render text content", () => {
    const template = makeTemplateWithText();
    const layout = layoutTemplate(template, { orderNo: "NO-001" });

    const result = renderToDom(layout);

    const text = result.root.querySelector<HTMLElement>(
      '[data-element-id="text_1"]',
    );

    expect(text).toBeTruthy();
    expect(text?.textContent).toContain("NO-001");

    result.dispose();
  });

  it("should apply base element styles", () => {
    const template = makeTemplateWithText();
    const layout = layoutTemplate(template, {});

    const result = renderToDom(layout);
    const text = result.root.querySelector<HTMLElement>(
      '[data-element-id="text_1"]',
    );

    expect(text?.style.left).toContain("mm");
    expect(text?.style.top).toContain("mm");
    expect(text?.style.width).toContain("mm");
    expect(text?.style.height).toContain("mm");

    result.dispose();
  });

  it("should mark text element with correct type class", () => {
    const template = makeTemplateWithText();
    const layout = layoutTemplate(template, {});

    const result = renderToDom(layout);
    const text = result.root.querySelector<HTMLElement>(
      '[data-element-id="text_1"]',
    );

    expect(text?.className).toContain("hiprint-re-text");

    result.dispose();
  });

  it("should set data-element-type attribute", () => {
    const template = makeTemplateWithText();
    const layout = layoutTemplate(template, {});

    const result = renderToDom(layout);
    const text = result.root.querySelector<HTMLElement>(
      '[data-element-id="text_1"]',
    );

    expect(text?.dataset.elementType).toBe("text");

    result.dispose();
  });
});
