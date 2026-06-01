import { describe, expect, it } from "vitest";
import { createEmptyTemplate } from "../../packages/core/src";
import { createDesignerStore } from "../../packages/designer-core/src";
import { createAddElementCommand } from "../../packages/designer-core/src";

describe("history", () => {
  it("should undo and redo", () => {
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

    expect(store.canUndo()).toBe(true);

    store.undo();

    expect(store.getState().template.panels[0]!.elements).toHaveLength(0);

    store.redo();

    expect(store.getState().template.panels[0]!.elements).toHaveLength(1);
  });
});
