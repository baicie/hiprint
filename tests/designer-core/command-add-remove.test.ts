import { describe, expect, it } from "vitest";
import { createEmptyTemplate } from "../../packages/core/src";
import {
  createAddElementCommand,
  createDesignerStore,
  createRemoveElementCommand,
} from "../../packages/designer-core/src";

describe("add/remove element command", () => {
  it("should add and remove element", () => {
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
        },
      }),
    );

    expect(store.getState().template.panels[0]!.elements).toHaveLength(1);

    store.dispatch(
      createRemoveElementCommand({
        ids: ["text_1"],
      }),
    );

    expect(store.getState().template.panels[0]!.elements).toHaveLength(0);
  });
});
