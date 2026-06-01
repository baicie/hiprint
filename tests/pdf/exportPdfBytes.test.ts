import { describe, expect, it } from "vitest";
import {
  createEmptyTemplate,
  layoutTemplate,
} from "../../packages/core/src";
import { exportPdfBytes } from "../../packages/pdf/src";
import { PDFDocument } from "pdf-lib";

describe("exportPdfBytes", () => {
  it("should export pdf bytes", async () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "text_1",
      type: "text",
      x: 10,
      y: 10,
      width: 80,
      height: 10,
      options: {
        content: "Hello PDF",
      },
    });

    const layout = layoutTemplate(template, {});
    const bytes = await exportPdfBytes(layout);

    expect(bytes.length).toBeGreaterThan(0);

    const header = new TextDecoder().decode(bytes.slice(0, 5));
    expect(header).toBe("%PDF-");
  });

  it("should set title metadata", async () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "text_1",
      type: "text",
      x: 10,
      y: 10,
      width: 80,
      height: 10,
      options: { content: "Test" },
    });

    const layout = layoutTemplate(template, {});
    const bytes = await exportPdfBytes(layout, {
      title: "Test Document",
      author: "Test Author",
    });

    expect(bytes.length).toBeGreaterThan(0);

    const loaded = await PDFDocument.load(bytes);
    expect(loaded.getTitle()).toBe("Test Document");
    expect(loaded.getAuthor()).toBe("Test Author");
  });

  it("should export multiple pages", async () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "text_2",
      type: "text",
      x: 10,
      y: 320,
      width: 80,
      height: 10,
      options: { content: "Page 2" },
    });

    const layout = layoutTemplate(template, {});
    const bytes = await exportPdfBytes(layout);

    expect(bytes.length).toBeGreaterThan(0);

    const loaded = await PDFDocument.load(bytes);
    expect(loaded.getPageCount()).toBeGreaterThanOrEqual(2);
  });

  it("should export line element", async () => {
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
    const bytes = await exportPdfBytes(layout);

    expect(bytes.length).toBeGreaterThan(0);
  });

  it("should export rect element", async () => {
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
    const bytes = await exportPdfBytes(layout);

    expect(bytes.length).toBeGreaterThan(0);
  });
});
