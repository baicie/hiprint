import { defineComponent, h } from "vue";
import type { DesignerStore } from "@hiprint-re/designer-core";
import type { DesignerState } from "@hiprint-re/designer-core";
import { getElementById } from "@hiprint-re/designer-core";
import {
  createUpdateElementCommand,
} from "@hiprint-re/designer-core";
import type { PrintElement } from "@hiprint-re/core";

export const PropertyPanel = defineComponent({
  name: "PropertyPanel",

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

    function update(id: string, patch: Partial<PrintElement>) {
      props.store.dispatch(createUpdateElementCommand({ id, patch }));
      emitChange();
    }

    function Field(label: string, value: string | number, extra: any = {}) {
      const { type = "text", readonly = false, onChange } = extra;

      return h(
        "label",
        { class: "hiprint-designer-field" },
        [
          h("span", label),
          h("input", {
            type,
            value,
            readonly,
            onChange: (e: Event) =>
              onChange?.((e.target as HTMLInputElement).value),
          }),
        ],
      );
    }

    return () => {
      const { state } = props;
      const activeId = state.selection.activeId;
      const element = activeId ? getElementById(state, activeId) : undefined;

      if (!element) {
        return h(
          "div",
          { class: "hiprint-designer-panel" },
          [
            h("div", { class: "hiprint-designer-panel-title" }, "Properties"),
            h("div", { class: "hiprint-designer-empty" }, "No element selected"),
          ],
        );
      }

      return h(
        "div",
        { class: "hiprint-designer-panel" },
        [
          h("div", { class: "hiprint-designer-panel-title" }, "Properties"),

          Field("ID", element.id, { readonly: true }),

          Field("X", element.x, {
            type: "number",
            onChange: (v: string) => update(element.id, { x: Number(v) }),
          }),

          Field("Y", element.y, {
            type: "number",
            onChange: (v: string) => update(element.id, { y: Number(v) }),
          }),

          Field("Width", element.width, {
            type: "number",
            onChange: (v: string) => update(element.id, { width: Number(v) }),
          }),

          Field("Height", element.height, {
            type: "number",
            onChange: (v: string) => update(element.id, { height: Number(v) }),
          }),

          Field("Field", element.binding?.field ?? "", {
            onChange: (v: string) =>
              update(element.id, { binding: { ...(element.binding ?? {}), field: v } }),
          }),

          Field("Title", element.binding?.title ?? "", {
            onChange: (v: string) =>
              update(element.id, { binding: { ...(element.binding ?? {}), title: v } }),
          }),

          element.type === "text"
            ? Field("Content", String(element.options?.content ?? ""), {
                onChange: (v: string) =>
                  update(element.id, {
                    options: { ...element.options, content: v },
                  }),
              })
            : null,

          element.type === "text"
            ? Field("Font Size", Number(element.style?.fontSize ?? 12), {
                type: "number",
                onChange: (v: string) =>
                  update(element.id, {
                    style: { ...element.style, fontSize: Number(v) },
                  }),
              })
            : null,

          element.type === "image"
            ? Field("Src", String(element.options?.src ?? ""), {
                onChange: (v: string) =>
                  update(element.id, {
                    options: { ...element.options, src: v },
                  }),
              })
            : null,
        ].filter(Boolean),
      );
    };
  },
});
