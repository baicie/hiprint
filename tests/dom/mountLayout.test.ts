import { describe, expect, it } from "vitest";
import { createEmptyTemplate, layoutTemplate } from "../../packages/core/src";
import { mountLayout } from "../../packages/dom/src";

describe("mountLayout", () => {
  it("should mount layout to container", () => {
    const container = document.createElement("div");

    const template = createEmptyTemplate();
    const layout = layoutTemplate(template, {});

    const result = mountLayout(layout, container);

    expect(container.querySelector(".hiprint-re-document")).toBeTruthy();
    expect(result.root).toBeTruthy();
    expect(result.container).toBe(container);

    result.dispose();
  });

  it("should clear existing content before mounting", () => {
    const container = document.createElement("div");
    container.innerHTML = "<span>old content</span>";

    const template = createEmptyTemplate();
    const layout = layoutTemplate(template, {});

    mountLayout(layout, container);

    expect(container.querySelector("span")).toBeNull();
    expect(container.querySelector(".hiprint-re-document")).toBeTruthy();
  });

  it("should return pages array", () => {
    const container = document.createElement("div");

    const template = createEmptyTemplate();
    const layout = layoutTemplate(template, {});

    const result = mountLayout(layout, container);

    expect(result.pages.length).toBeGreaterThan(0);

    result.dispose();
  });

  it("should dispose properly", () => {
    const container = document.createElement("div");

    const template = createEmptyTemplate();
    const layout = layoutTemplate(template, {});

    const result = mountLayout(layout, container);
    result.dispose();

    expect(container.querySelector(".hiprint-re-document")).toBeNull();
  });
});
