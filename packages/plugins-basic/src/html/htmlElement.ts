import { createPropertySchema, type ElementDefinition } from "@hiprint-re/core";

export const htmlElementDefinition: ElementDefinition = {
  type: "html",
  name: "HTML",
  builtin: true,
  defaultWidth: 80,
  defaultHeight: 30,

  propertySchema: createPropertySchema({
    groups: [
      {
        key: "geometry",
        label: "Geometry",
      },
      {
        key: "content",
        label: "Content",
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
        key: "options.html",
        label: "HTML",
        type: "textarea",
        group: "content",
      },
      {
        key: "options.sandbox",
        label: "Sandbox",
        type: "boolean",
        group: "content",
        defaultValue: true,
      },
    ],
  }),

  createElement(input) {
    return {
      id: input.id,
      type: "html",
      x: input.x,
      y: input.y,
      width: 80,
      height: 30,
      options: {
        html: "<strong>HTML</strong>",
        sandbox: true,
      },
    };
  },
};
