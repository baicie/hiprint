import { describe, expect, it } from "vitest";
import { createEmptyTemplate } from "../../packages/core/src";
import { createDesignerStore } from "../../packages/designer-core/src";

describe("DesignerStore", () => {
  it("should create store", () => {
    const template = createEmptyTemplate();
    const store = createDesignerStore({ template });

    const state = store.getState();

    expect(state.template.id).toBe(template.id);
    expect(state.mode).toBe("select");
    expect(state.activePanelId).toBe(template.panels[0]?.id);
  });

  it("should notify subscribers", () => {
    const template = createEmptyTemplate();
    const store = createDesignerStore({ template });

    let count = 0;

    store.subscribe(() => {
      count += 1;
    });

    store.setState(store.getState());

    expect(count).toBe(1);
  });
});
