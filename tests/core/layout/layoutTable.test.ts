import { describe, expect, it } from "vitest";
import {
  createEmptyTemplate,
  layoutTemplate,
} from "../../../packages/core/src";

describe("layout table", () => {
  it("should layout table rows", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "table_1",
      type: "table",
      x: 10,
      y: 20,
      width: 100,
      height: 30,
      options: {
        dataField: "items",
        columns: [
          {
            id: "name",
            field: "name",
            title: "名称",
            width: 50,
          },
          {
            id: "price",
            field: "price",
            title: "价格",
            width: 50,
          },
        ],
      },
    });

    const layout = layoutTemplate(template, {
      items: [
        { name: "苹果", price: 10 },
        { name: "香蕉", price: 20 },
      ],
    });

    const table = layout.pages[0]!.elements[0] as {
      type?: string;
      headerRows?: unknown[];
      bodyRows?: { cells: { value: string }[] }[];
    };

    expect(table.type).toBe("table");
    expect(table.headerRows).toHaveLength(1);
    expect(table.bodyRows).toHaveLength(2);
    expect(table.bodyRows?.[0]?.cells[0]?.value).toBe("苹果");
    expect(table.bodyRows?.[0]?.cells[1]?.value).toBe("10");
  });

  it("should create empty table when no data", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "table_empty",
      type: "table",
      x: 10,
      y: 20,
      width: 100,
      height: 10,
      options: {
        columns: [
          { id: "col1", title: "列1", width: 100 },
        ],
      },
    });

    const layout = layoutTemplate(template, {});

    const table = layout.pages[0]!.elements[0] as {
      type?: string;
      bodyRows?: unknown[];
    };

    expect(table.type).toBe("table");
    expect(table.bodyRows).toHaveLength(0);
  });

  it("should paginate table across pages", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "table_paginate",
      type: "table",
      x: 0,
      y: 280,
      width: 100,
      height: 40,
      options: {
        rowHeight: 20,
        headerHeight: 10,
        dataField: "items",
        columns: [
          { id: "col1", field: "v", title: "列1", width: 100 },
        ],
      },
    });

    const layout = layoutTemplate(template, {
      items: Array.from({ length: 5 }, (_, i) => ({ v: `item-${i}` })),
    });

    expect(layout.pages.length).toBeGreaterThanOrEqual(2);
  });

  it("should distribute column widths when not all specified", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "table_auto_width",
      type: "table",
      x: 0,
      y: 0,
      width: 100,
      height: 10,
      options: {
        columns: [
          { id: "col1", field: "a", width: 30 },
          { id: "col2", field: "b" },
          { id: "col3", field: "c" },
        ],
      },
    });

    const layout = layoutTemplate(template, {
      items: [{ a: "1", b: "2", c: "3" }],
    });

    const table = layout.pages[0]!.elements[0] as {
      columns?: { width: number }[];
    };

    expect(table.columns?.[0]?.width).toBe(30);
    expect(table.columns?.[1]?.width).toBe(35);
    expect(table.columns?.[2]?.width).toBe(35);
  });

  it("should skip hidden table elements", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push(
      {
        id: "el_visible",
        type: "text",
        x: 0,
        y: 0,
        width: 50,
        height: 10,
        options: { content: "visible" },
      },
      {
        id: "table_hidden",
        type: "table",
        x: 0,
        y: 20,
        width: 100,
        height: 10,
        hidden: true,
        options: {
          columns: [{ id: "col1", title: "列1", width: 100 }],
          dataField: "items",
        },
      },
    );

    const layout = layoutTemplate(template, { items: [{ col1: "value" }] });

    expect(layout.pages[0]!.elements).toHaveLength(1);
    expect(layout.pages[0]!.elements[0]?.id).toBe("el_visible");
  });
});
