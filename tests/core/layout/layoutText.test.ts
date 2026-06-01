import { describe, expect, it } from "vitest";
import {
  createEmptyTemplate,
  layoutTemplate,
} from "../../../packages/core/src";

describe("layout text", () => {
  it("should layout text element with binding data", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "el_order_no",
      type: "text",
      x: 20,
      y: 30,
      width: 80,
      height: 10,
      binding: {
        field: "orderNo",
      },
      style: {
        fontSize: 12,
      },
    });

    const layout = layoutTemplate(template, {
      orderNo: "NO-001",
    });

    expect(layout.pages).toHaveLength(1);

    const element = layout.pages[0]!.elements[0];

    expect(element?.type).toBe("text");
    expect((element as { value?: string }).value).toBe("NO-001");
    expect(element?.x).toBe(20);
    expect(element?.y).toBe(30);
  });

  it("should layout text element with static content", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "el_static",
      type: "text",
      x: 10,
      y: 20,
      width: 100,
      height: 10,
      options: {
        content: "静态文本",
      },
      style: {
        fontSize: 14,
      },
    });

    const layout = layoutTemplate(template, {});

    const element = layout.pages[0]!.elements[0];
    expect((element as { value?: string }).value).toBe("静态文本");
  });

  it("should use title as fallback content", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "el_title",
      type: "text",
      x: 0,
      y: 0,
      width: 50,
      height: 10,
      binding: {
        title: "姓名",
      },
    });

    const layout = layoutTemplate(template, {});

    const element = layout.pages[0]!.elements[0];
    expect((element as { value?: string }).value).toBe("姓名");
  });

  it("should skip hidden elements", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push(
      {
        id: "el_visible",
        type: "text",
        x: 0,
        y: 0,
        width: 50,
        height: 10,
        options: { content: "可见" },
      },
      {
        id: "el_hidden",
        type: "text",
        x: 0,
        y: 10,
        width: 50,
        height: 10,
        hidden: true,
        options: { content: "隐藏" },
      },
    );

    const layout = layoutTemplate(template, {});

    expect(layout.pages[0]!.elements).toHaveLength(1);
    expect(layout.pages[0]!.elements[0]?.id).toBe("el_visible");
  });

  it("should warn on overflow by default", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "el_overflow",
      type: "text",
      x: 0,
      y: 0,
      width: 300,
      height: 10,
      options: { content: "overflow" },
    });

    const layout = layoutTemplate(template, {});

    expect(layout.warnings).toHaveLength(1);
    expect(layout.warnings[0]?.code).toBe("element.overflow");
    expect(layout.warnings[0]?.elementId).toBe("el_overflow");
  });

  it("should not warn on overflow when allowOverflow is true", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "el_overflow",
      type: "text",
      x: 0,
      y: 0,
      width: 300,
      height: 10,
      options: { content: "overflow" },
    });

    const layout = layoutTemplate(template, {}, { allowOverflow: true });

    expect(layout.warnings).toHaveLength(0);
  });

  it("should detect overflow using resolved pageWidth even when paper.unit differs", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "el_px_overflow",
      type: "text",
      x: 0,
      y: 0,
      width: 300,
      height: 10,
      options: { content: "overflow" },
    });

    const layout = layoutTemplate(template, {});

    expect(layout.warnings.some((w) => w.code === "element.overflow")).toBe(true);
  });
});
