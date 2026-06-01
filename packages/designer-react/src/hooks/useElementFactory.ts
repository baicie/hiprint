import { createId } from "@hiprint-re/core";
import type { PrintElement } from "@hiprint-re/core";

export type BuiltinInsertElementType =
  | "text"
  | "image"
  | "rect"
  | "line"
  | "table";

export function createBuiltinElement(
  type: BuiltinInsertElementType,
  input: {
    x: number;
    y: number;
  },
): PrintElement {
  const id = createId(type);

  switch (type) {
    case "text":
      return {
        id,
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
        },
      };

    case "image":
      return {
        id,
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

    case "rect":
      return {
        id,
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

    case "line":
      return {
        id,
        type: "line",
        x: input.x,
        y: input.y,
        width: 50,
        height: 1,
        options: {
          direction: "horizontal",
        },
      };

    case "table":
      return {
        id,
        type: "table",
        x: input.x,
        y: input.y,
        width: 120,
        height: 50,
        options: {
          dataField: "items",
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
  }
}
