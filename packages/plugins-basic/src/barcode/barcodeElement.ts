import { createPropertySchema, type ElementDefinition } from "@hiprint-re/core";

export const barcodeElementDefinition: ElementDefinition = {
  type: "barcode",
  name: "Barcode",
  builtin: true,
  defaultWidth: 60,
  defaultHeight: 20,

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
        key: "barcode",
        label: "Barcode",
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
        label: "Field",
        type: "field",
        group: "data",
      },
      {
        key: "options.value",
        label: "Value",
        type: "text",
        group: "data",
      },
      {
        key: "options.format",
        label: "Format",
        type: "select",
        group: "barcode",
        options: [
          {
            label: "Code128",
            value: "code128",
          },
        ],
      },
      {
        key: "options.showText",
        label: "Show Text",
        type: "boolean",
        group: "barcode",
        defaultValue: true,
      },
    ],
  }),

  createElement(input) {
    return {
      id: input.id,
      type: "barcode",
      x: input.x,
      y: input.y,
      width: 60,
      height: 20,
      binding: {
        title: "Barcode",
      },
      options: {
        value: "1234567890",
        format: "code128",
        showText: true,
      },
    };
  },
};
