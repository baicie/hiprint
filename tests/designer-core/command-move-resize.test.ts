import { describe, expect, it } from "vitest";
import { createEmptyTemplate } from "../../packages/core/src";
import {
  createAddElementCommand,
  createDesignerStore,
  createMoveElementCommand,
  createResizeElementCommand,
  getElementById,
} from "../../packages/designer-core/src";

describe("move/resize command", () => {
  it("should move element", () => {
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

    store.dispatch(
      createMoveElementCommand({
        ids: ["text_1"],
        dx: 5,
        dy: 6,
      }),
    );

    const element = getElementById(store.getState(), "text_1");

    expect(element?.x).toBe(15);
    expect(element?.y).toBe(26);
  });

  it("should resize element", () => {
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
          height: 20,
        },
      }),
    );

    store.dispatch(
      createResizeElementCommand({
        id: "rect_1",
        handle: "se",
        dx: 10,
        dy: 5,
      }),
    );

    const element = getElementById(store.getState(), "rect_1");

    expect(element?.width).toBe(40);
    expect(element?.height).toBe(25);
  });
});
