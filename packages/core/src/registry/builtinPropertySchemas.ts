import { createPropertySchema } from "../property";

export const commonGeometryFields = [
  {
    key: "x",
    label: "X",
    type: "number" as const,
    group: "geometry",
    step: 1,
  },
  {
    key: "y",
    label: "Y",
    type: "number" as const,
    group: "geometry",
    step: 1,
  },
  {
    key: "width",
    label: "Width",
    type: "number" as const,
    group: "geometry",
    min: 0,
    step: 1,
  },
  {
    key: "height",
    label: "Height",
    type: "number" as const,
    group: "geometry",
    min: 0,
    step: 1,
  },
] as const;

export const commonBindingFields = [
  {
    key: "binding.field",
    label: "Field",
    type: "field" as const,
    group: "binding",
  },
  {
    key: "binding.title",
    label: "Title",
    type: "text" as const,
    group: "binding",
  },
] as const;

export const textPropertySchema = createPropertySchema({
  groups: [
    { key: "geometry", label: "Geometry", order: 1 },
    { key: "binding", label: "Binding", order: 2 },
    { key: "content", label: "Content", order: 3 },
    { key: "style", label: "Style", order: 4 },
  ],
  fields: [
    ...commonGeometryFields,
    ...commonBindingFields,
    {
      key: "options.content",
      label: "Content",
      type: "textarea" as const,
      group: "content",
    },
    {
      key: "style.fontSize",
      label: "Font Size",
      type: "number" as const,
      group: "style",
      min: 1,
      step: 1,
      defaultValue: 12,
    },
    {
      key: "style.color",
      label: "Color",
      type: "color" as const,
      group: "style",
    },
    {
      key: "style.textAlign",
      label: "Text Align",
      type: "select" as const,
      group: "style",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
  ],
});

export const imagePropertySchema = createPropertySchema({
  groups: [
    { key: "geometry", label: "Geometry" },
    { key: "binding", label: "Binding" },
    { key: "image", label: "Image" },
  ],
  fields: [
    ...commonGeometryFields,
    ...commonBindingFields,
    {
      key: "options.src",
      label: "Image URL",
      type: "image" as const,
      group: "image",
    },
    {
      key: "options.objectFit",
      label: "Object Fit",
      type: "select" as const,
      group: "image",
      options: [
        { label: "Contain", value: "contain" },
        { label: "Cover", value: "cover" },
        { label: "Fill", value: "fill" },
      ],
    },
  ],
});

export const rectPropertySchema = createPropertySchema({
  groups: [
    { key: "geometry", label: "Geometry" },
    { key: "style", label: "Style" },
  ],
  fields: [
    ...commonGeometryFields,
    {
      key: "style.borderWidth",
      label: "Border Width",
      type: "number" as const,
      group: "style",
      min: 0,
    },
    {
      key: "style.borderColor",
      label: "Border Color",
      type: "color" as const,
      group: "style",
    },
    {
      key: "style.backgroundColor",
      label: "Background",
      type: "color" as const,
      group: "style",
    },
  ],
});

export const linePropertySchema = createPropertySchema({
  groups: [
    { key: "geometry", label: "Geometry" },
    { key: "line", label: "Line" },
    { key: "style", label: "Style" },
  ],
  fields: [
    ...commonGeometryFields,
    {
      key: "options.direction",
      label: "Direction",
      type: "select" as const,
      group: "line",
      options: [
        { label: "Horizontal", value: "horizontal" },
        { label: "Vertical", value: "vertical" },
      ],
    },
    {
      key: "style.borderWidth",
      label: "Line Width",
      type: "number" as const,
      group: "style",
      min: 1,
    },
    {
      key: "style.borderColor",
      label: "Color",
      type: "color" as const,
      group: "style",
    },
  ],
});

export const tablePropertySchema = createPropertySchema({
  groups: [
    { key: "geometry", label: "Geometry" },
    { key: "data", label: "Data" },
    { key: "table", label: "Table" },
  ],
  fields: [
    ...commonGeometryFields,
    {
      key: "options.dataField",
      label: "Data Field",
      type: "field" as const,
      group: "data",
    },
    {
      key: "options.showHeader",
      label: "Show Header",
      type: "boolean" as const,
      group: "table",
      defaultValue: true,
    },
    {
      key: "options.columns",
      label: "Columns JSON",
      type: "json" as const,
      group: "table",
    },
  ],
});
