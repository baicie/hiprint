import { describe, expect, it } from "vitest";
import { createEmptyTemplate, layoutTemplate } from "../../packages/core/src";
import { createPrintHtml } from "../../packages/dom/src";

describe("createPrintHtml", () => {
  it("should create printable html with doctype", () => {
    const template = createEmptyTemplate();
    const layout = layoutTemplate(template, {});

    const html = createPrintHtml(layout);

    expect(html).toContain("<!doctype html>");
    expect(html).toContain("<html>");
    expect(html).toContain("<head>");
    expect(html).toContain("<body>");
  });

  it("should include @page rule", () => {
    const template = createEmptyTemplate();
    const layout = layoutTemplate(template, {});

    const html = createPrintHtml(layout);

    expect(html).toContain("@page");
    expect(html).toContain("margin: 0");
  });

  it("should include hiprint-re classes", () => {
    const template = createEmptyTemplate();
    const layout = layoutTemplate(template, {});

    const html = createPrintHtml(layout);

    expect(html).toContain("hiprint-re-document");
    expect(html).toContain("hiprint-re-page");
  });

  it("should set page size from layout dimensions", () => {
    const template = createEmptyTemplate();
    const layout = layoutTemplate(template, {});

    const html = createPrintHtml(layout);

    expect(html).toContain(`${layout.width}${layout.unit}`);
    expect(html).toContain(`${layout.height}${layout.unit}`);
  });

  it("should use custom classNamePrefix", () => {
    const template = createEmptyTemplate();
    const layout = layoutTemplate(template, {});

    const html = createPrintHtml(layout, {
      classNamePrefix: "custom-prefix",
    });

    expect(html).toContain("custom-prefix-document");
    expect(html).not.toContain("hiprint-re-document");
  });
});
