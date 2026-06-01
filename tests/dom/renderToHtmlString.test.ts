import { describe, expect, it } from "vitest";
import { createEmptyTemplate, layoutTemplate } from "../../packages/core/src";
import { renderToHtmlString } from "../../packages/dom/src";

describe("renderToHtmlString", () => {
  it("should serialize layout to html string", () => {
    const template = createEmptyTemplate();
    const layout = layoutTemplate(template, {});

    const html = renderToHtmlString(layout);

    expect(html).toContain("hiprint-re-document");
    expect(html).toContain("hiprint-re-page");
  });

  it("should include page count in output", () => {
    const template = createEmptyTemplate();
    const layout = layoutTemplate(template, {});

    const html = renderToHtmlString(layout);

    expect(html).toContain("data-page-index");
  });

  it("should include custom classNamePrefix", () => {
    const template = createEmptyTemplate();
    const layout = layoutTemplate(template, {});

    const html = renderToHtmlString(layout, {
      classNamePrefix: "my-prefix",
    });

    expect(html).toContain("my-prefix-document");
    expect(html).toContain("my-prefix-page");
  });
});
