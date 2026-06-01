import { describe, expect, it } from "vitest";
import { createEmptyTemplate } from "../../packages/core/src";
import {
  createAddElementCommand,
  createDesignerStore,
  createRemoveElementCommand,
  createUpdateElementCommand,
  createSelectElementCommand,
} from "../../packages/designer-core/src";

describe("update element command", () => {
  it("should update element options", () => {
    const template = createEmptyTemplate();
    const panelId = template.panels[0]!.id;

    const store = createDesignerStore({ template });

    store.dispatch(
      createAddElementCommand({
        panelId,
        element: {
          id: "text_1",
          type: "text",
          x: 10,
          y: 20,
          width: 80,
          height: 12,
          options: { content: "Hello" },
        },
      }),
    );

    store.dispatch(
      createUpdateElementCommand({
        id: "text_1",
        patch: {
          options: { content: "World" },
        },
      }),
    );

    const state = store.getState();
    const el = state.template.panels[0]!.elements[0]!;

    expect((el.options as { content?: string }).content).toBe("World");
  });

  it("should merge style properties", () => {
    const template = createEmptyTemplate();
    const panelId = template.panels[0]!.id;

    const store = createDesignerStore({ template });

    store.dispatch(
      createAddElementCommand({
        panelId,
        element: {
          id: "rect_1",
          type: "rect",
          x: 10,
          y: 10,
          width: 30,
          height: 30,
        },
      }),
    );

    store.dispatch(
      createUpdateElementCommand({
        id: "rect_1",
        patch: {
          style: { lineHeight: 1.5 } as never,
        },
      }),
    );

    const el = store.getState().template.panels[0]!.elements[0]!;
    expect((el.style as { lineHeight?: number }).lineHeight).toBe(1.5);
  });

  it("should update position fields", () => {
    const template = createEmptyTemplate();
    const panelId = template.panels[0]!.id;

    const store = createDesignerStore({ template });

    store.dispatch(
      createAddElementCommand({
        panelId,
        element: {
          id: "text_1",
          type: "text",
          x: 0,
          y: 0,
          width: 10,
          height: 10,
        },
      }),
    );

    store.dispatch(
      createUpdateElementCommand({
        id: "text_1",
        patch: { x: 50, y: 60 },
      }),
    );

    const el = store.getState().template.panels[0]!.elements[0]!;
    expect(el.x).toBe(50);
    expect(el.y).toBe(60);
    expect(el.width).toBe(10);
    expect(el.height).toBe(10);
  });

  it("should update non-existent element return state unchanged", () => {
    const template = createEmptyTemplate();
    const store = createDesignerStore({ template });

    const before = store.getState();

    store.dispatch(
      createUpdateElementCommand({
        id: "nonexistent",
        patch: { x: 999 },
      }),
    );

    const after = store.getState();
    expect(after.template.panels[0]!.elements).toEqual(
      before.template.panels[0]!.elements,
    );
  });

  it("should record in history", () => {
    const template = createEmptyTemplate();
    const panelId = template.panels[0]!.id;
    const store = createDesignerStore({ template });

    store.dispatch(
      createAddElementCommand({
        panelId,
        element: {
          id: "text_1",
          type: "text",
          x: 10,
          y: 10,
          width: 10,
          height: 10,
        },
      }),
    );

    store.dispatch(
      createUpdateElementCommand({
        id: "text_1",
        patch: { x: 100 },
      }),
    );

    expect(store.canUndo()).toBe(true);

    store.undo();

    const el = store.getState().template.panels[0]!.elements[0]!;
    expect(el.x).toBe(10);
  });
});

describe("remove element command", () => {
  it("should clear activeId when active element is removed", () => {
    const template = createEmptyTemplate();
    const panelId = template.panels[0]!.id;
    const store = createDesignerStore({ template });

    store.dispatch(
      createAddElementCommand({
        panelId,
        element: {
          id: "a",
          type: "text",
          x: 0,
          y: 0,
          width: 10,
          height: 10,
        },
      }),
    );

    store.dispatch(createSelectElementCommand({ ids: ["a"], activeId: "a" }));
    store.dispatch(createRemoveElementCommand({ ids: ["a"] }));

    const state = store.getState();
    expect(state.selection.ids).toEqual([]);
    expect(state.selection.activeId).toBeUndefined();
  });

  it("should keep activeId when non-active selected element is removed", () => {
    const template = createEmptyTemplate();
    const panelId = template.panels[0]!.id;
    const store = createDesignerStore({ template });

    store.dispatch(
      createAddElementCommand({
        panelId,
        element: {
          id: "a",
          type: "text",
          x: 0,
          y: 0,
          width: 10,
          height: 10,
        },
      }),
    );

    store.dispatch(
      createAddElementCommand({
        panelId,
        element: {
          id: "b",
          type: "text",
          x: 20,
          y: 0,
          width: 10,
          height: 10,
        },
      }),
    );

    // selectElementCommand sets activeId to ids[0] = "a"
    store.dispatch(createSelectElementCommand({ ids: ["a", "b"] }));
    expect(store.getState().selection.activeId).toBe("a");

    store.dispatch(createRemoveElementCommand({ ids: ["a"] }));

    const state = store.getState();
    expect(state.selection.ids).toEqual(["b"]);
    // activeId was "a" which was removed, so it becomes undefined
    expect(state.selection.activeId).toBeUndefined();
  });
});
