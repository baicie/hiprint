import {
  createPlugin,
} from "../../packages/plugin/src";
import {
  createPropertySchema,
  type ElementDefinition,
} from "../../packages/core/src";

export const testCustomElementDefinition: ElementDefinition = {
  type: "test:custom-box",
  name: "Custom Box",
  defaultWidth: 50,
  defaultHeight: 20,

  propertySchema: createPropertySchema({
    groups: [
      {
        key: "custom",
        label: "Custom",
      },
    ],
    fields: [
      {
        key: "options.label",
        label: "Label",
        type: "text",
        group: "custom",
        defaultValue: "Custom Label",
      },
      {
        key: "options.enabled",
        label: "Enabled",
        type: "boolean",
        group: "custom",
        defaultValue: true,
      },
    ],
  }),

  createElement(input) {
    return {
      id: input.id,
      type: "test:custom-box",
      x: input.x,
      y: input.y,
      width: 50,
      height: 20,
      options: {
        label: "Custom Label",
        enabled: true,
      },
      style: {
        borderColor: "#111827",
      },
    };
  },
};

export function testCustomPlugin() {
  return createPlugin({
    name: "test-custom-plugin",
    version: "0.0.0",
    elements: [testCustomElementDefinition],
    domRenderers: [
      {
        type: "test:custom-box",
        render(element, ctx) {
          const root = ctx.document.createElement("div");
          root.dataset.elementType = "test:custom-box";
          root.dataset.elementId = element.id;
          root.textContent = "Custom Box";
          root.style.position = "absolute";
          root.style.left = `${element.x}${ctx.options.geometryUnit}`;
          root.style.top = `${element.y}${ctx.options.geometryUnit}`;
          root.style.width = `${element.width}${ctx.options.geometryUnit}`;
          root.style.height = `${element.height}${ctx.options.geometryUnit}`;
          return root;
        },
      },
    ],
  });
}
