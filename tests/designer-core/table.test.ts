import { describe, expect, it } from "vitest";
import {
  createAddElementCommand,
  createDesignerStore,
  createAddTableColumnCommand,
  createRemoveTableColumnCommand,
  createUpdateTableColumnCommand,
  createReorderTableColumnCommand,
  createUpdateTableOptionsCommand,
  getElementById,
} from "../../packages/designer-core/src";
import { createEmptyTemplate } from "../../packages/core/src";

describe("table commands", () => {
  function makeTableStore() {
    const template = createEmptyTemplate();
    const panelId = template.panels[0]!.id;
    template.panels[0]!.elements.push({
      id: "table_1",
      type: "table",
      x: 0,
      y: 0,
      width: 200,
      height: 40,
      options: {
        dataField: "items",
        columns: [
          { id: "col1", title: "Col 1", field: "f1", width: 100 },
        ],
      },
    });
    return { template, panelId, store: createDesignerStore({ template }) };
  }

  describe("createAddTableColumnCommand", () => {
    it("should add table column", () => {
      const { store } = makeTableStore();

      store.dispatch(
        createAddTableColumnCommand({
          tableId: "table_1",
          column: {
            title: "Name",
            field: "name",
            width: 50,
          },
        }),
      );

      const table = getElementById(store.getState(), "table_1") as any;
      expect(table.options.columns).toHaveLength(2);
      expect(table.options.columns[1].title).toBe("Name");
      expect(table.options.columns[1].field).toBe("name");
      expect(table.options.columns[1].width).toBe(50);
    });

    it("should insert column at specific index", () => {
      const { store } = makeTableStore();

      store.dispatch(
        createAddTableColumnCommand({
          tableId: "table_1",
          column: { id: "col_new", title: "Inserted", width: 50 },
          index: 0,
        }),
      );

      const table = getElementById(store.getState(), "table_1") as any;
      expect(table.options.columns[0].id).toBe("col_new");
      expect(table.options.columns[1].id).toBe("col1");
    });
  });

  describe("createRemoveTableColumnCommand", () => {
    it("should remove table column", () => {
      const { store } = makeTableStore();

      store.dispatch(
        createRemoveTableColumnCommand({
          tableId: "table_1",
          columnId: "col1",
        }),
      );

      const table = getElementById(store.getState(), "table_1") as any;
      expect(table.options.columns).toHaveLength(0);
    });
  });

  describe("createUpdateTableColumnCommand", () => {
    it("should update column properties", () => {
      const { store } = makeTableStore();

      store.dispatch(
        createUpdateTableColumnCommand({
          tableId: "table_1",
          columnId: "col1",
          patch: {
            title: "Updated Title",
            width: 150,
            align: "right",
          },
        }),
      );

      const table = getElementById(store.getState(), "table_1") as any;
      expect(table.options.columns[0].title).toBe("Updated Title");
      expect(table.options.columns[0].width).toBe(150);
      expect(table.options.columns[0].align).toBe("right");
    });
  });

  describe("createReorderTableColumnCommand", () => {
    it("should reorder columns", () => {
      const template = createEmptyTemplate();
      const panelId = template.panels[0]!.id;
      template.panels[0]!.elements.push({
        id: "table_reorder",
        type: "table",
        x: 0,
        y: 0,
        width: 300,
        height: 40,
        options: {
          columns: [
            { id: "a", title: "A", width: 100 },
            { id: "b", title: "B", width: 100 },
            { id: "c", title: "C", width: 100 },
          ],
        },
      });
      const store = createDesignerStore({ template });

      store.dispatch(
        createReorderTableColumnCommand({
          tableId: "table_reorder",
          fromIndex: 0,
          toIndex: 2,
        }),
      );

      const table = getElementById(store.getState(), "table_reorder") as any;
      expect(table.options.columns[0].id).toBe("b");
      expect(table.options.columns[1].id).toBe("c");
      expect(table.options.columns[2].id).toBe("a");
    });
  });

  describe("createUpdateTableOptionsCommand", () => {
    it("should update table options", () => {
      const { store } = makeTableStore();

      store.dispatch(
        createUpdateTableOptionsCommand({
          tableId: "table_1",
          patch: {
            dataField: "products",
            body: {
              rowHeight: 12,
            },
          },
        }),
      );

      const table = getElementById(store.getState(), "table_1") as any;
      expect(table.options.dataField).toBe("products");
      expect(table.options.body.rowHeight).toBe(12);
    });

    it("should update pagination options", () => {
      const { store } = makeTableStore();

      store.dispatch(
        createUpdateTableOptionsCommand({
          tableId: "table_1",
          patch: {
            pagination: {
              repeatHeader: false,
              footerMode: "every-page",
            },
          },
        }),
      );

      const table = getElementById(store.getState(), "table_1") as any;
      expect(table.options.pagination.repeatHeader).toBe(false);
      expect(table.options.pagination.footerMode).toBe("every-page");
    });
  });
});
