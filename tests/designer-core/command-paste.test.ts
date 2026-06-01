import { describe, expect, it } from "vitest";
import {
  createDesignerStore,
  createAddElementCommand,
  createSelectElementCommand,
  createPasteElementsCommand,
} from "../../packages/designer-core/src";
import { copyElements } from "../../packages/designer-core/src";

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

describe("paste elements command", () => {
  it("should paste elements from clipboard to active panel", () => {
    const template = makeTemplate();
    const store = createDesignerStore({ template });

    const copied = copyElements([
      {
        id: "text_1",
        type: "text" as const,
        x: 10,
        y: 20,
        width: 80,
        height: 12,
      },
    ]);

    // Simulate external clipboard set
    store.setState({
      ...store.getState(),
      clipboard: { elements: copied },
    });

    store.dispatch(createPasteElementsCommand());

    const elements = store.getState().template.panels[0]!.elements;
    expect(elements).toHaveLength(1);
    expect(elements[0]!.x).toBe(16);
    expect(elements[0]!.y).toBe(26);
    expect(elements[0]!.id).not.toBe("text_1");
  });

  it("should select pasted elements", () => {
    const template = makeTemplate();
    const store = createDesignerStore({ template });

    const copied = copyElements([
      {
        id: "text_1",
        type: "text" as const,
        x: 0,
        y: 0,
        width: 10,
        height: 10,
      },
    ]);

    store.setState({
      ...store.getState(),
      clipboard: { elements: copied },
    });

    store.dispatch(createPasteElementsCommand());

    expect(store.getState().selection.ids).toHaveLength(1);
  });

  it("should apply custom offset", () => {
    const template = makeTemplate();
    const store = createDesignerStore({ template });

    store.setState({
      ...store.getState(),
      clipboard: {
        elements: [
          {
            id: "text_1",
            type: "text" as const,
            x: 10,
            y: 10,
            width: 10,
            height: 10,
          },
        ],
      },
    });

    store.dispatch(createPasteElementsCommand({ offset: 20 }));

    const el = store.getState().template.panels[0]!.elements[0]!;
    expect(el.x).toBe(30);
    expect(el.y).toBe(30);
  });

  it("should do nothing when clipboard is empty", () => {
    const template = makeTemplate();
    const store = createDesignerStore({ template });
    const before = store.getState();

    store.setState({
      ...store.getState(),
      clipboard: { elements: [] },
    });

    store.dispatch(createPasteElementsCommand());

    expect(store.getState().template.panels[0]!.elements).toEqual(
      before.template.panels[0]!.elements,
    );
  });

  it("should paste multiple elements", () => {
    const template = makeTemplate();
    const store = createDesignerStore({ template });

    store.setState({
      ...store.getState(),
      clipboard: {
        elements: [
          { id: "a", type: "text" as const, x: 0, y: 0, width: 10, height: 10 },
          { id: "b", type: "rect" as const, x: 20, y: 0, width: 10, height: 10 },
        ],
      },
    });

    store.dispatch(createPasteElementsCommand());

    expect(store.getState().template.panels[0]!.elements).toHaveLength(2);
    expect(store.getState().selection.ids).toHaveLength(2);
  });
});
