import { defineComponent, h } from "vue";
import type { DesignerStore } from "@hiprint-re/designer-core";
import type { DesignerState } from "@hiprint-re/designer-core";
import { getActivePanel } from "@hiprint-re/designer-core";
import { createSelectElementCommand } from "@hiprint-re/designer-core";

export const LayerPanel = defineComponent({
  name: "LayerPanel",

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

  setup(props) {
    function select(id: string) {
      props.store.dispatch(
        createSelectElementCommand({ ids: [id], activeId: id }),
      );
    }

    return () => {
      const { state } = props;
      const panel = getActivePanel(state);

      return h(
        "div",
        { class: "hiprint-designer-panel" },
        [
          h("div", { class: "hiprint-designer-panel-title" }, "Layers"),

          h(
            "div",
            { class: "hiprint-designer-layers" },
            (panel?.elements ?? []).map((element) => {
              const selected = state.selection.ids.includes(element.id);
              return h(
                "button",
                {
                  class: [
                    "hiprint-designer-layer-item",
                    selected ? "is-selected" : "",
                  ]
                    .filter(Boolean)
                    .join(" "),
                  onClick: () => select(element.id),
                },
                [
                  h("span", element.type),
                  h("small", element.id),
                ],
              );
            }),
          ),
        ],
      );
    };
  },
});
