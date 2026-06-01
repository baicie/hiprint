import { describe, expect, it } from "vitest";
import {
  createEmptyTemplate,
  layoutTemplate,
} from "../../packages/core/src";
import { renderToSvgString } from "../../packages/svg/src";

describe("renderToSvgString", () => {
  it("should render svg string with text element", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "text_1",
      type: "text",
      x: 10,
      y: 10,
      width: 80,
      height: 10,
      options: {
        content: "Hello",
      },
    });

    const layout = layoutTemplate(template, {});
    const svg = renderToSvgString(layout);

    expect(svg).toContain("<svg");
    expect(svg).toContain("Hello");
    expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
  });

  it("should render multiple pages", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "page2_text",
      type: "text",
      x: 10,
      y: 320,
      width: 80,
      height: 10,
      options: { content: "Page 2" },
    });

    const layout = layoutTemplate(template, {});
    const svg = renderToSvgString(layout);

    const svgMatches = svg.match(/<svg/g);
    expect(svgMatches).toHaveLength(2);
  });

  it("should render line element", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "line_1",
      type: "line",
      x: 0,
      y: 50,
      width: 100,
      height: 1,
    });

    const layout = layoutTemplate(template, {});
    const svg = renderToSvgString(layout);

    expect(svg).toContain("<line");
    expect(svg).toContain('x1="0"');
    expect(svg).toContain('y1="50"');
  });

  it("should render rect element", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "rect_1",
      type: "rect",
      x: 10,
      y: 10,
      width: 30,
      height: 30,
    });

    const layout = layoutTemplate(template, {});
    const svg = renderToSvgString(layout);

    expect(svg).toContain("<rect");
    expect(svg).toContain('x="10"');
    expect(svg).toContain('y="10"');
  });

  it("should render image element", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "img_1",
      type: "image",
      x: 10,
      y: 10,
      width: 40,
      height: 40,
      options: { src: "data:image/png;base64,abc123" },
    });

    const layout = layoutTemplate(template, {});
    const svg = renderToSvgString(layout);

    expect(svg).toContain("<image");
    expect(svg).toContain('href="data:image/png;base64,abc123"');
  });

  it("should escape XML special characters in text", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "text_special",
      type: "text",
      x: 10,
      y: 10,
      width: 80,
      height: 10,
      options: { content: "A < B & C > D" },
    });

    const layout = layoutTemplate(template, {});
    const svg = renderToSvgString(layout);

    expect(svg).toContain("&lt;");
    expect(svg).toContain("&amp;");
    expect(svg).toContain("&gt;");
    expect(svg).not.toContain("A < B");
  });

  it("should use custom background color", () => {
    const template = createEmptyTemplate();

    const layout = layoutTemplate(template, {});
    const svg = renderToSvgString(layout, { background: "#f0f0f0" });

    expect(svg).toContain('fill="#f0f0f0"');
  });

  it("should render table element", () => {
    const template = createEmptyTemplate();

    (template.panels[0]!.elements as { id: string; type: string; x: number; y: number; width: number; height: number; options: Record<string, unknown> }[]).push({
      id: "table_1",
      type: "table",
      x: 10,
      y: 10,
      width: 100,
      height: 40,
      options: {
        columns: [
          { id: "col1", title: "Name", width: 50, field: "name" },
          { id: "col2", title: "Qty", width: 50, field: "qty" },
        ],
        rows: [
          { cells: [{ columnId: "col1", value: "Apple" }, { columnId: "col2", value: "3" }] },
          { cells: [{ columnId: "col1", value: "Banana" }, { columnId: "col2", value: "2" }] },
        ],
      },
    });

    const layout = layoutTemplate(template, { name: "test" });
    const svg = renderToSvgString(layout);

    expect(svg).toContain('data-table-id="table_1__page_0"');
  });
});
