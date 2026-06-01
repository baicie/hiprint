import { describe, expect, it } from "vitest";
import {
  createEmptyTemplate,
  layoutTemplate,
} from "../../../packages/core/src";

describe("layoutTemplate", () => {
  it("should create layout document", () => {
    const template = createEmptyTemplate();

    const layout = layoutTemplate(template, {});

    expect(layout.unit).toBe("mm");
    expect(layout.width).toBe(210);
    expect(layout.height).toBe(297);
    expect(layout.pages.length).toBeGreaterThan(0);
  });

  it("should layout multiple element types", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push(
      {
        id: "el_text",
        type: "text",
        x: 10,
        y: 10,
        width: 80,
        height: 10,
        options: { content: "Hello" },
      },
      {
        id: "el_image",
        type: "image",
        x: 10,
        y: 30,
        width: 40,
        height: 30,
        options: { src: "/logo.png" },
      },
      {
        id: "el_line",
        type: "line",
        x: 0,
        y: 70,
        width: 100,
        height: 1,
      },
      {
        id: "el_rect",
        type: "rect",
        x: 120,
        y: 10,
        width: 30,
        height: 30,
      },
    );

    const layout = layoutTemplate(template, {});

    expect(layout.pages[0]!.elements).toHaveLength(4);
    expect(layout.pages[0]!.elements.map((e) => e.type)).toEqual([
      "text",
      "image",
      "line",
      "rect",
    ]);
  });

  it("should create next page if element y exceeds page height", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "el_page_2",
      type: "text",
      x: 10,
      y: 310,
      width: 50,
      height: 10,
      options: { content: "page 2" },
    });

    const layout = layoutTemplate(template, {});

    expect(layout.pages.length).toBeGreaterThanOrEqual(2);
    expect(layout.pages[1]!.elements[0]?.id).toBe("el_page_2");
    expect(layout.pages[1]!.elements[0]?.y).toBe(13);
  });

  it("should layout element on correct page based on y position", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push(
      {
        id: "el_p1",
        type: "text",
        x: 0,
        y: 50,
        width: 50,
        height: 10,
        options: { content: "page 1" },
      },
      {
        id: "el_p2",
        type: "text",
        x: 0,
        y: 350,
        width: 50,
        height: 10,
        options: { content: "page 2" },
      },
    );

    const layout = layoutTemplate(template, {});

    expect(layout.pages[0]!.elements[0]?.id).toBe("el_p1");
    expect(layout.pages[1]!.elements[0]?.id).toBe("el_p2");
  });

  it("should resolve data binding across elements", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push(
      {
        id: "el_order",
        type: "text",
        x: 0,
        y: 0,
        width: 80,
        height: 10,
        binding: { field: "orderNo" },
      },
      {
        id: "el_name",
        type: "text",
        x: 0,
        y: 15,
        width: 60,
        height: 10,
        binding: { field: "customer.name" },
      },
    );

    const layout = layoutTemplate(template, {
      orderNo: "NO-001",
      customer: { name: "李四" },
    });

    const elements = layout.pages[0]!.elements as { id: string; value: string }[];

    expect(elements.find((e) => e.id === "el_order")?.value).toBe("NO-001");
    expect(elements.find((e) => e.id === "el_name")?.value).toBe("李四");
  });

  it("should warn on unknown element type", () => {
    const template = createEmptyTemplate();

    (template.panels[0]!.elements as { id: string; type: string; x: number; y: number; width: number; height: number; hidden?: boolean }[]).push({
      id: "el_unknown",
      type: "unknown",
      x: 0,
      y: 0,
      width: 50,
      height: 10,
    });

    const layout = layoutTemplate(template, {});

    expect(layout.warnings).toHaveLength(1);
    expect(layout.warnings[0]?.code).toBe("element.unknown");
  });
});
