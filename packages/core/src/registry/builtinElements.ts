import type { ElementDefinition } from "./elementRegistry";
import {
  imagePropertySchema,
  linePropertySchema,
  rectPropertySchema,
  tablePropertySchema,
  textPropertySchema,
} from "./builtinPropertySchemas";

export const builtinElementDefinitions: ElementDefinition[] = [
  {
    type: "text",
    name: "Text",
    builtin: true,
    defaultWidth: 60,
    defaultHeight: 12,
    propertySchema: textPropertySchema,
    createElement(input) {
      return {
        id: input.id,
        type: "text",
        x: input.x,
        y: input.y,
        width: 60,
        height: 12,
        binding: {
          title: "文本",
        },
        options: {
          content: "文本",
        },
        style: {
          fontSize: 12,
          color: "#111827",
        },
      };
    },
  },
  {
    type: "image",
    name: "Image",
    builtin: true,
    defaultWidth: 40,
    defaultHeight: 40,
    propertySchema: imagePropertySchema,
    createElement(input) {
      return {
        id: input.id,
        type: "image",
        x: input.x,
        y: input.y,
        width: 40,
        height: 40,
        options: {
          src: "",
          objectFit: "contain",
        },
      };
    },
  },
  {
    type: "rect",
    name: "Rectangle",
    builtin: true,
    defaultWidth: 40,
    defaultHeight: 24,
    propertySchema: rectPropertySchema,
    createElement(input) {
      return {
        id: input.id,
        type: "rect",
        x: input.x,
        y: input.y,
        width: 40,
        height: 24,
        style: {
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "#111827",
        },
      };
    },
  },
  {
    type: "line",
    name: "Line",
    builtin: true,
    defaultWidth: 50,
    defaultHeight: 1,
    propertySchema: linePropertySchema,
    createElement(input) {
      return {
        id: input.id,
        type: "line",
        x: input.x,
        y: input.y,
        width: 50,
        height: 1,
        options: {
          direction: "horizontal",
        },
        style: {
          borderWidth: 1,
          borderColor: "#111827",
        },
      };
    },
  },
  {
    type: "table",
    name: "Table",
    builtin: true,
    defaultWidth: 120,
    defaultHeight: 50,
    propertySchema: tablePropertySchema,
    createElement(input) {
      return {
        id: input.id,
        type: "table",
        x: input.x,
        y: input.y,
        width: 120,
        height: 50,
        options: {
          dataField: "items",
          showHeader: true,
          columns: [
            {
              id: "name",
              field: "name",
              title: "名称",
              width: 60,
            },
            {
              id: "value",
              field: "value",
              title: "值",
              width: 60,
            },
          ],
        },
      };
    },
  },
];
