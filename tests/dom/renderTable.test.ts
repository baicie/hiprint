import { describe, expect, it } from "vitest";
import {
  createEmptyTemplate,
  layoutTemplate,
  type PrintTemplate,
} from "../../packages/core/src";
import { renderToDom } from "../../packages/dom/src";

describe("render table", () => {
  it("should render table element", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "table_1",
      type: "table",
      x: 10,
      y: 10,
      width: 100,
      height: 40,
      options: {
        dataField: "items",
        columns: [
          {
            id: "col_name",
            field: "name",
            title: "名称",
            width: 50,
          },
          {
            id: "col_price",
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

    const result = renderToDom(layout);

    const table = result.root.querySelector<HTMLElement>(
      '.hiprint-re-table[data-element-id="table_1__page_0"]',
    );

    expect(table).toBeTruthy();
    expect(table?.className).toContain("hiprint-re-table");
    expect(table?.dataset.elementType).toBe("table");

    result.dispose();
  });

  it("should render table header cells", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "table_1",
      type: "table",
      x: 10,
      y: 10,
      width: 100,
      height: 40,
      options: {
        dataField: "items",
        columns: [
          {
            id: "col_name",
            field: "name",
            title: "名称",
            width: 50,
          },
          {
            id: "col_price",
            field: "price",
            title: "价格",
            width: 50,
          },
        ],
      },
    });

    const layout = layoutTemplate(template, {
      items: [{ name: "苹果", price: 10 }],
    });

    const result = renderToDom(layout);

    const headerCells = result.root.querySelectorAll(
      '.hiprint-re-table[data-element-id="table_1__page_0"] .hiprint-re-table-header-cell',
    );

    expect(headerCells.length).toBeGreaterThan(0);

    result.dispose();
  });

  it("should render table data cells", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "table_1",
      type: "table",
      x: 10,
      y: 10,
      width: 100,
      height: 40,
      options: {
        dataField: "items",
        columns: [
          {
            id: "col_name",
            field: "name",
            title: "名称",
            width: 50,
          },
        ],
      },
    });

    const layout = layoutTemplate(template, {
      items: [{ name: "苹果" }, { name: "香蕉" }],
    });

    const result = renderToDom(layout);

    const dataCells = result.root.querySelectorAll(
      '.hiprint-re-table[data-element-id="table_1__page_0"] .hiprint-re-table-cell:not(.hiprint-re-table-header-cell)',
    );

    expect(dataCells.length).toBeGreaterThan(0);

    result.dispose();
  });
});
