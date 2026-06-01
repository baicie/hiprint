import { createPropertySchema, type ElementDefinition } from "@hiprint-re/core";

export const qrcodeElementDefinition: ElementDefinition = {
  type: "qrcode",
  name: "QRCode",
  builtin: true,
  defaultWidth: 30,
  defaultHeight: 30,

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
        key: "qrcode",
        label: "QRCode",
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
        key: "options.errorCorrectionLevel",
        label: "Error Correction",
        type: "select",
        group: "qrcode",
        options: [
          {
            label: "L",
            value: "L",
          },
          {
            label: "M",
            value: "M",
          },
          {
            label: "Q",
            value: "Q",
          },
          {
            label: "H",
            value: "H",
          },
        ],
      },
    ],
  }),

  createElement(input) {
    return {
      id: input.id,
      type: "qrcode",
      x: input.x,
      y: input.y,
      width: 30,
      height: 30,
      options: {
        value: "https://example.com",
        errorCorrectionLevel: "M",
      },
    };
  },
};
