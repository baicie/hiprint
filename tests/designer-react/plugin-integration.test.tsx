import {
  describe,
  expect,
  it,
} from "vitest";
import {
  createEmptyTemplate,
} from "../../packages/core/src";
import {
  createDesignerStore,
} from "@hiprint-re/designer-core";
import {
  createPlugin,
} from "../../packages/plugin/src";
import {
  createPropertySchema,
} from "../../packages/core/src";

describe("plugin integration via designer-core API", () => {
  it("should add plugin element via command and read propertySchema", () => {
    const pluginElementDef = {
      type: "test:custom-box" as const,
      name: "Custom Box",
      defaultWidth: 50,
      defaultHeight: 20,
      propertySchema: createPropertySchema({
        fields: [
          {
            key: "options.label",
            label: "Label",
            type: "text" as const,
            defaultValue: "Custom Label",
          },
        ],
      }),
      createElement: (input: { id: string; x: number; y: number }) => ({
        id: input.id,
        type: "test:custom-box",
        x: input.x,
        y: input.y,
        width: 50,
        height: 20,
        options: { label: "Custom Label" },
      }),
    };

    const plugin = createPlugin({
      name: "test-plugin",
      version: "0.0.0",
      elements: [pluginElementDef],
    });

    const template = createEmptyTemplate();
    const panelId = template.panels[0]!.id;
    const store = createDesignerStore({ template });

    plugin.elements!.forEach((el) => {
      store.dispatch({
        id: "test-add",
        name: "Test Add",
        history: true,
        execute: (state) => ({
          ...state,
          template: {
            ...state.template,
            panels: state.template.panels.map((p) =>
              p.id === panelId
                ? { ...p, elements: [...p.elements, el.createElement({ id: "el1", x: 10, y: 10 })] }
                : p,
            ),
          },
        }),
      });
    });

    const state = store.getState();
    const element = state.template.panels[0]!.elements.find(
      (e) => e.type === "test:custom-box",
    );

    expect(element).toBeTruthy();
    expect((element as { options: { label: string } }).options.label).toBe("Custom Label");
  });
});
