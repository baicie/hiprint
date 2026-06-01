import { describe, expect, it } from "vitest";
import {
  createDesignerStore,
  createAddElementCommand,
  createSelectElementCommand,
  createDuplicateElementCommand,
} from "../../packages/designer-core/src";

const makeTemplate = () => ({
  schemaVersion: "1.0.0" as const,
  id: "t1",
  paper: {
    preset: "A4" as const,
    width: 210,
    height: 297,
    unit: "mm" as const,
    orientation: "portrait" as const,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  },
  panels: [{ id: "p1", index: 0, elements: [] as never[] }],
});

describe("duplicate element command", () => {
  it("should duplicate single selected element", () => {
    const template = makeTemplate();
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

    store.dispatch(createSelectElementCommand({ ids: ["text_1"] }));
    store.dispatch(createDuplicateElementCommand());

    const elements = store.getState().template.panels[0]!.elements;

    expect(elements).toHaveLength(2);

    const original = elements.find((e) => e.id === "text_1")!;
    const copy = elements.find((e) => e.id !== "text_1")!;

    expect(original.x).toBe(10);
    expect(original.y).toBe(20);
    expect(copy.x).toBe(16);
    expect(copy.y).toBe(26);
    expect(copy.type).toBe("text");
    expect(copy.width).toBe(80);
    expect(copy.height).toBe(12);
  });

  it("should select duplicated elements", () => {
    const template = makeTemplate();
    const store = createDesignerStore({ template });

    store.dispatch(
      createAddElementCommand({
        panelId: "p1",
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

    store.dispatch(createSelectElementCommand({ ids: ["text_1"] }));
    store.dispatch(createDuplicateElementCommand());

    const { ids } = store.getState().selection;
    expect(ids).toHaveLength(1);
    expect(ids[0]).not.toBe("text_1");
  });

  it("should do nothing when no element selected", () => {
    const template = makeTemplate();
    const store = createDesignerStore({ template });
    const before = store.getState();

    store.dispatch(createDuplicateElementCommand());

    const after = store.getState();
    expect(after.template.panels[0]!.elements).toEqual(
      before.template.panels[0]!.elements,
    );
  });

  it("should duplicate multiple selected elements", () => {
    const template = makeTemplate();
    const store = createDesignerStore({ template });

    store.dispatch(
      createAddElementCommand({
        panelId: "p1",
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
        panelId: "p1",
        element: {
          id: "b",
          type: "rect",
          x: 20,
          y: 0,
          width: 10,
          height: 10,
        },
      }),
    );

    store.dispatch(createSelectElementCommand({ ids: ["a", "b"] }));
    store.dispatch(createDuplicateElementCommand());

    const elements = store.getState().template.panels[0]!.elements;
    expect(elements).toHaveLength(4);
    expect(store.getState().selection.ids).toHaveLength(2);
  });
});
