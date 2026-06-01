import { describe, expect, it } from "vitest";
import {
  createDesignerStore,
  createSelectElementCommand,
  createClearSelectionCommand,
  createAddElementCommand,
} from "../../packages/designer-core/src";

describe("selection", () => {
  it("should select element", () => {
    const template = {
      schemaVersion: "1.0.0" as const,
      id: "t1",
      paper: { preset: "A4" as const, width: 210, height: 297, unit: "mm" as const, orientation: "portrait" as const, margin: { top: 0, right: 0, bottom: 0, left: 0 } },
      panels: [{ id: "p1", index: 0, elements: [] }],
    };
    const store = createDesignerStore({ template });

    store.dispatch(createSelectElementCommand({ ids: ["el1"] }));

    const state = store.getState();
    expect(state.selection.ids).toEqual(["el1"]);
    expect(state.selection.activeId).toBe("el1");
  });

  it("should append to selection", () => {
    const template = {
      schemaVersion: "1.0.0" as const,
      id: "t1",
      paper: { preset: "A4" as const, width: 210, height: 297, unit: "mm" as const, orientation: "portrait" as const, margin: { top: 0, right: 0, bottom: 0, left: 0 } },
      panels: [{ id: "p1", index: 0, elements: [] }],
    };
    const store = createDesignerStore({ template });

    store.dispatch(createSelectElementCommand({ ids: ["el1"] }));
    store.dispatch(createSelectElementCommand({ ids: ["el2"], append: true }));

    const state = store.getState();
    expect(state.selection.ids).toEqual(["el1", "el2"]);
    expect(state.selection.activeId).toBe("el2");
  });

  it("should clear selection", () => {
    const template = {
      schemaVersion: "1.0.0" as const,
      id: "t1",
      paper: { preset: "A4" as const, width: 210, height: 297, unit: "mm" as const, orientation: "portrait" as const, margin: { top: 0, right: 0, bottom: 0, left: 0 } },
      panels: [{ id: "p1", index: 0, elements: [] }],
    };
    const store = createDesignerStore({ template });

    store.dispatch(createSelectElementCommand({ ids: ["el1"] }));
    store.dispatch(createClearSelectionCommand());

    const state = store.getState();
    expect(state.selection.ids).toEqual([]);
    expect(state.selection.activeId).toBeUndefined();
  });

  it("add element should select it by default", () => {
    const template = {
      schemaVersion: "1.0.0" as const,
      id: "t1",
      paper: { preset: "A4" as const, width: 210, height: 297, unit: "mm" as const, orientation: "portrait" as const, margin: { top: 0, right: 0, bottom: 0, left: 0 } },
      panels: [{ id: "p1", index: 0, elements: [] }],
    };
    const store = createDesignerStore({ template });

    store.dispatch(
      createAddElementCommand({
        panelId: "p1",
        element: {
          id: "text_1",
          type: "text",
          x: 10,
          y: 20,
          width: 80,
          height: 12,
        },
      }),
    );

    const state = store.getState();
    expect(state.selection.ids).toEqual(["text_1"]);
  });
});
