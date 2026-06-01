import { defineComponent, h } from "vue";
import type { DesignerStore } from "@hiprint-re/designer-core";
import type { DesignerState } from "@hiprint-re/designer-core";
import type { ElementRegistry } from "@hiprint-re/core";
import {
  createAddElementCommand,
} from "@hiprint-re/designer-core";

function createElementId(type: string): string {
  return `${type}_${Math.random().toString(36).slice(2, 9)}`;
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
    registry: {
      type: Object as () => ElementRegistry,
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

      const element = props.registry.createElement(type as any, {
        id: createElementId(type),
        x: 20,
        y: 20,
      });

      if (!element) return;

      props.store.dispatch(
        createAddElementCommand({
          panelId,
          element,
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
            props.registry.list().map((item) =>
              h(
                "button",
                {
                  class: "hiprint-designer-palette-item",
                  onClick: () => add(item.type),
                },
                item.name,
              ),
            ),
          ),
        ],
      );
  },
});
