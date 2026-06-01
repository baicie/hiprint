import { describe, expect, it } from "vitest";
import { createEmptyTemplate, layoutTemplate } from "../../packages/core/src";
import { renderToDom } from "../../packages/dom/src";

describe("renderToDom", () => {
  it("should render layout document", () => {
    const template = createEmptyTemplate();

    const layout = layoutTemplate(template, {});

    const result = renderToDom(layout);

    expect(result.root.className).toContain("hiprint-re-document");
    expect(result.pages.length).toBeGreaterThan(0);
    expect(result.pages[0]?.className).toContain("hiprint-re-page");

    result.dispose();
  });

  it("should apply classNamePrefix option", () => {
    const template = createEmptyTemplate();
    const layout = layoutTemplate(template, {});

    const result = renderToDom(layout, {
      classNamePrefix: "my-prefix",
    });

    expect(result.root.className).toContain("my-prefix-document");
    expect(result.pages[0]?.className).toContain("my-prefix-page");

    result.dispose();
  });

  it("should set page dimensions", () => {
    const template = createEmptyTemplate();
    const layout = layoutTemplate(template, {});

    const result = renderToDom(layout);
    const page = result.pages[0]!;

    expect(page.style.width).toBeTruthy();
    expect(page.style.height).toBeTruthy();

    result.dispose();
  });

  it("should inject default style when requested", () => {
    const template = createEmptyTemplate();
    const layout = layoutTemplate(template, {});

    renderToDom(layout, { injectDefaultStyle: true });

    const style = document.querySelector<HTMLStyleElement>(
      'style[data-hiprint-re-style="hiprint-re"]',
    );
    expect(style).toBeTruthy();
    expect(style?.textContent).toContain(".hiprint-re-document");
  });

  it("should not inject default style when disabled", () => {
    const template = createEmptyTemplate();
    const layout = layoutTemplate(template, {});

    renderToDom(layout, {
      injectDefaultStyle: false,
      classNamePrefix: "no-style-test",
    });

    const style = document.querySelector<HTMLStyleElement>(
      'style[data-hiprint-re-style="no-style-test"]',
    );
    expect(style).toBeNull();
  });

  it("should dispose without error", () => {
    const template = createEmptyTemplate();
    const layout = layoutTemplate(template, {});

    const result = renderToDom(layout);
    expect(() => result.dispose()).not.toThrow();
  });
});
