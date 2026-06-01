import { defineComponent, h, computed } from "vue";
import { printLayout } from "@hiprint-re/dom";
import type { DesignerStore } from "@hiprint-re/designer-core";
import type { DesignerState } from "@hiprint-re/designer-core";
import type { DomRenderOptions } from "@hiprint-re/dom";
import type { LayoutOptions, LayoutDocument } from "@hiprint-re/core";
import {
  createAlignElementsCommand,
  createDuplicateElementCommand,
  createRemoveElementCommand,
  createSetViewportCommand,
} from "@hiprint-re/designer-core";

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.1;

export const DesignerToolbar = defineComponent({
  name: "DesignerToolbar",

  props: {
    store: { type: Object as () => DesignerStore, required: true },
    state: { type: Object as () => DesignerState, required: true },
    domOptions: { type: Object as () => DomRenderOptions, default: () => ({}) },
    layoutOptions: { type: Object as () => LayoutOptions, default: () => ({}) },
    layout: { type: Object as () => LayoutDocument | null, default: null },
  },

  emits: ["change"],

  setup(props, { emit }) {
    const canUndo = computed(() => props.store.canUndo());
    const canRedo = computed(() => props.store.canRedo());
    const hasSelection = computed(() => props.state.selection.ids.length > 0);
    const zoom = computed(() => props.state.viewport.zoom);

    function setZoom(next: number) {
      props.store.dispatch(createSetViewportCommand({ zoom: next }));
      emit("change");
    }

    function undo() {
      props.store.undo();
      emit("change");
    }

    function redo() {
      props.store.redo();
      emit("change");
    }

    function align(type: "left" | "center" | "right" | "top" | "bottom") {
      props.store.dispatch(createAlignElementsCommand({ type }));
      emit("change");
    }

    function duplicate() {
      props.store.dispatch(createDuplicateElementCommand());
      emit("change");
    }

    function remove() {
      if (!hasSelection.value) return;
      props.store.dispatch(createRemoveElementCommand({ ids: props.state.selection.ids }));
      emit("change");
    }

    async function print() {
      if (!props.layout) return;
      await printLayout(props.layout, props.domOptions);
    }

    return () =>
      h("div", { class: "hiprint-designer-toolbar" }, [
        h("button", {
          onClick: undo,
          disabled: !canUndo.value,
          title: "Undo (Ctrl+Z)",
        }, "Undo"),

        h("button", {
          onClick: redo,
          disabled: !canRedo.value,
          title: "Redo (Ctrl+Shift+Z)",
        }, "Redo"),

        h("span", { class: "hiprint-designer-toolbar-separator" }),

        h("button", {
          onClick: () => align("left"),
          disabled: !hasSelection.value,
          title: "Align Left",
        }, "Align Left"),

        h("button", {
          onClick: () => align("center"),
          disabled: !hasSelection.value,
          title: "Align Center",
        }, "Align Center"),

        h("button", {
          onClick: () => align("top"),
          disabled: !hasSelection.value,
          title: "Align Top",
        }, "Align Top"),

        h("span", { class: "hiprint-designer-toolbar-separator" }),

        h("button", {
          onClick: duplicate,
          disabled: !hasSelection.value,
          title: "Duplicate (Ctrl+D)",
        }, "Duplicate"),

        h("button", {
          onClick: remove,
          disabled: !hasSelection.value,
          title: "Delete (Delete)",
        }, "Delete"),

        h("span", { class: "hiprint-designer-toolbar-separator" }),

        h("button", {
          onClick: () => setZoom(Math.max(zoom.value - ZOOM_STEP, MIN_ZOOM)),
          disabled: zoom.value <= MIN_ZOOM,
          title: "Zoom Out",
        }, "-"),

        h("span", { class: "hiprint-designer-toolbar-zoom" }, `${Math.round(zoom.value * 100)}%`),

        h("button", {
          onClick: () => setZoom(Math.min(zoom.value + ZOOM_STEP, MAX_ZOOM)),
          disabled: zoom.value >= MAX_ZOOM,
          title: "Zoom In",
        }, "+"),

        h("button", {
          onClick: () => setZoom(1),
          title: "Zoom to 100%",
        }, "100%"),

        h("span", { class: "hiprint-designer-toolbar-separator" }),

        h("button", {
          onClick: print,
          disabled: !props.layout,
          title: "Print",
        }, "Print"),
      ]);
  },
});
