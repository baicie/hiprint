import { describe, expect, it } from "vitest";
import { createEmptyTemplate, layoutTemplate } from "../../packages/core/src";
import { renderToDom } from "../../packages/dom/src";

describe("render image", () => {
  it("should render image wrapper element", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "image_1",
      type: "image",
      x: 10,
      y: 10,
      width: 40,
      height: 40,
      options: {
        src: "https://example.com/logo.png",
      },
    });

    const layout = layoutTemplate(template, {});

    const result = renderToDom(layout);

    const image = result.root.querySelector<HTMLElement>(
      '[data-element-id="image_1"]',
    );

    expect(image).toBeTruthy();
    expect(image?.className).toContain("hiprint-re-image");
    expect(image?.dataset.elementType).toBe("image");

    result.dispose();
  });

  it("should resolve image src via custom resolver", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "image_1",
      type: "image",
      x: 10,
      y: 10,
      width: 40,
      height: 40,
      options: {
        src: "original-src",
      },
    });

    const layout = layoutTemplate(template, {});

    const result = renderToDom(layout, {
      resolveImageSrc: (src) => (src ? `https://cdn.example.com/${src}` : src),
    });

    const img = result.root.querySelector<HTMLImageElement>(
      '[data-element-id="image_1"] img',
    );

    expect(img?.src).toBe("https://cdn.example.com/original-src");

    result.dispose();
  });
});
