import { defineComponent, h } from "vue";
import type { DesignerStore } from "@hiprint-re/designer-core";
import type { DesignerState } from "@hiprint-re/designer-core";
import {
  createAddElementCommand,
} from "@hiprint-re/designer-core";
import { createId } from "@hiprint-re/core";
import type { PrintElement } from "@hiprint-re/core";

const items = [
  { type: "text" as const, label: "Text" },
  { type: "image" as const, label: "Image" },
  { type: "rect" as const, label: "Rect" },
  { type: "line" as const, label: "Line" },
  { type: "table" as const, label: "Table" },
];

function createElement(type: string): PrintElement {
  const id = createId(type);

  switch (type) {
    case "text":
      return {
        id,
        type: "text",
        x: 20,
        y: 20,
        width: 60,
        height: 12,
        binding: { title: "文本" },
        options: { content: "文本" },
        style: { fontSize: 12 },
      };
    case "image":
      return {
        id,
        type: "image",
        x: 20,
        y: 20,
        width: 40,
        height: 40,
        options: { src: "", objectFit: "contain" },
      };
    case "rect":
      return {
        id,
        type: "rect",
        x: 20,
        y: 20,
        width: 40,
        height: 24,
        style: { borderWidth: 1, borderStyle: "solid", borderColor: "#111827" },
      };
    case "line":
      return {
        id,
        type: "line",
        x: 20,
        y: 20,
        width: 50,
        height: 1,
        options: { direction: "horizontal" },
      };
    case "table":
      return {
        id,
        type: "table",
        x: 20,
        y: 20,
        width: 120,
        height: 50,
        options: {
          dataField: "items",
          columns: [
            { id: "name", field: "name", title: "名称", width: 60 },
            { id: "value", field: "value", title: "值", width: 60 },
          ],
        },
      };
    default:
      return { id, type: "unknown", x: 20, y: 20, width: 40, height: 20 };
  }
}

export const ElementPalette = defineComponent({
  name: "ElementPalette",

  props: {
    store: {
      type: Object as () => DesignerStore,
      required: true,
    },
    state: {
      type: Object as () => DesignerState,
      required: true,
    },
  },

  emits: ["change"],

  setup(props, { emit }) {
    function emitChange() {
      emit("change");
    }

    function add(type: string) {
      const panelId = props.state.activePanelId;
      if (!panelId) return;

      props.store.dispatch(
        createAddElementCommand({
          panelId,
          element: createElement(type),
          select: true,
        }),
      );
      emitChange();
    }

    return () =>
      h(
        "div",
        { class: "hiprint-designer-panel" },
        [
          h("div", { class: "hiprint-designer-panel-title" }, "Elements"),

          h(
            "div",
            { class: "hiprint-designer-palette" },
            items.map((item) =>
              h(
                "button",
                {
                  class: "hiprint-designer-palette-item",
                  onClick: () => add(item.type),
                },
                item.label,
              ),
            ),
          ),
        ],
      );
  },
});
