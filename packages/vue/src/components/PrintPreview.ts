import { defineComponent, h, toRef } from "vue";
import type { LayoutOptions } from "@hiprint-re/core";
import type { DomRenderOptions } from "@hiprint-re/dom";
import type { VueTemplateInput, VueTemplateKind } from "../types";
import { usePrintPreview } from "../usePrintPreview";

export const PrintPreview = defineComponent({
  name: "HiprintPrintPreview",

  props: {
    template: {
      type: null,
      required: true,
    },
    templateKind: {
      type: String,
      default: "auto",
    },
    data: {
      type: null,
      default: undefined,
    },
    layoutOptions: {
      type: Object,
      default: undefined,
    },
    domOptions: {
      type: Object,
      default: undefined,
    },
    className: {
      type: String,
      default: undefined,
    },
  },

  emits: ["layout", "warnings", "error"],

  setup(props, { emit, expose }) {
    const preview = usePrintPreview({
      template: toRef(props, "template") as unknown as () => VueTemplateInput,
      templateKind: toRef(
        props,
        "templateKind",
      ) as unknown as () => VueTemplateKind,
      data: toRef(props, "data"),
      layoutOptions: toRef(props, "layoutOptions") as unknown as () =>
        | LayoutOptions
        | undefined,
      domOptions: toRef(props, "domOptions") as unknown as () =>
        | DomRenderOptions
        | undefined,

      onLayout(layout) {
        emit("layout", layout);
      },

      onWarnings(warnings) {
        emit("warnings", warnings);
      },

      onError(error) {
        emit("error", error);
      },
    });

    expose({
      refresh: preview.refresh,
      print: preview.print,
      getLayout: () => preview.layout.value,
    });

    return () => {
      if (preview.error.value) {
        return h(
          "pre",
          {
            style: {
              color: "crimson",
              whiteSpace: "pre-wrap",
            },
          },
          preview.error.value.message,
        );
      }

      return h("div", {
        ref: preview.containerRef,
        class: props.className,
        style: {
          width: "100%",
          height: "100%",
          overflow: "auto",
        },
      });
    };
  },
});
