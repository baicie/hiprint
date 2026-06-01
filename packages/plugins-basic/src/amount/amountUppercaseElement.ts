import { createPropertySchema, type ElementDefinition } from "@hiprint-re/core";

export const amountUppercaseElementDefinition: ElementDefinition = {
  type: "business:amount-uppercase",
  name: "Amount Uppercase",
  description: "Render number amount as Chinese uppercase amount.",
  defaultWidth: 100,
  defaultHeight: 12,

  propertySchema: createPropertySchema({
    groups: [
      {
        key: "geometry",
        label: "Geometry",
      },
      {
        key: "data",
        label: "Data",
      },
      {
        key: "style",
        label: "Style",
      },
    ],
    fields: [
      {
        key: "x",
        label: "X",
        type: "number",
        group: "geometry",
      },
      {
        key: "y",
        label: "Y",
        type: "number",
        group: "geometry",
      },
      {
        key: "width",
        label: "Width",
        type: "number",
        group: "geometry",
      },
      {
        key: "height",
        label: "Height",
        type: "number",
        group: "geometry",
      },
      {
        key: "binding.field",
        label: "Amount Field",
        type: "field",
        group: "data",
      },
      {
        key: "style.fontSize",
        label: "Font Size",
        type: "number",
        group: "style",
        defaultValue: 12,
      },
    ],
  }),

  createElement(input) {
    return {
      id: input.id,
      type: "business:amount-uppercase",
      x: input.x,
      y: input.y,
      width: 100,
      height: 12,
      binding: {
        field: "totalAmount",
        title: "金额大写",
      },
      style: {
        fontSize: 12,
      },
    };
  },
};
