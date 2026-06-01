import {
  defineComponent,
  h,
  ref,
  watch,
  onBeforeUnmount,
  nextTick,
  computed,
} from "vue";
import { mountLayout } from "@hiprint-re/dom";
import type { MountLayoutResult } from "@hiprint-re/dom";
import type { DesignerStore } from "@hiprint-re/designer-core";
import type { DesignerState } from "@hiprint-re/designer-core";
import type { DomRenderOptions } from "@hiprint-re/dom";
import type { LayoutOptions, LayoutDocument, PrintTemplate } from "@hiprint-re/core";
import { layoutTemplate } from "@hiprint-re/core";
import {
  createClearSelectionCommand,
  createSetActivePanelCommand,
} from "@hiprint-re/designer-core";
import { SelectionOverlay } from "./SelectionOverlay";

export const DesignerCanvas = defineComponent({
  name: "DesignerCanvas",

  props: {
    store: { type: Object as () => DesignerStore, required: true },
    state: { type: Object as () => DesignerState, required: true },
    data: { type: null, default: () => ({}) },
    domOptions: { type: Object as () => DomRenderOptions, default: () => ({}) },
    layoutOptions: { type: Object as () => LayoutOptions, default: () => ({}) },
  },

  emits: ["change", "layout", "error"],

  setup(props, { emit }) {
    const containerRef = ref<HTMLElement | null>(null);
    const mountResult = ref<MountLayoutResult | null>(null);
    const errorRef = ref<Error | null>(null);

    const layoutResult = ref<LayoutDocument | null>(null);

    const zoom = computed(() => props.state.viewport.zoom);

    function computeLayout(): LayoutDocument | null {
      try {
        const layout = layoutTemplate(
          props.state.template as PrintTemplate,
          props.data ?? {},
          props.layoutOptions,
        );
        errorRef.value = null;
        emit("layout", layout);
        return layout;
      } catch (err) {
        const e = err instanceof Error ? err : new Error(String(err));
        errorRef.value = e;
        emit("error", e);
        return null;
      }
    }

    function mountToContainer(container: HTMLElement) {
      const layout = computeLayout();
      layoutResult.value = layout;
      if (!layout) return;

      mountResult.value?.dispose();
      mountResult.value = mountLayout(layout, container, {
        ...props.domOptions,
        pageGap: 24,
        onPageClick: (pageIndex) => {
          const firstEl = layout.pages[pageIndex]?.elements[0];
          const panelId = firstEl?.sourcePanelId ?? props.state.activePanelId;
          if (panelId) {
            props.store.dispatch(createSetActivePanelCommand({ panelId }));
          }
        },
      });
    }

    watch(
      containerRef,
      async (el) => {
        if (el) {
          await nextTick();
          mountToContainer(el);
        }
      },
      { immediate: true },
    );

    watch(
      () => props.state.template,
      () => {
        if (containerRef.value) {
          mountToContainer(containerRef.value);
        }
      },
    );

    onBeforeUnmount(() => {
      mountResult.value?.dispose();
    });

    function clearSelection(event: MouseEvent) {
      if (event.target === event.currentTarget) {
        props.store.dispatch(createClearSelectionCommand());
      }
    }

    return () => {
      if (errorRef.value) {
        return h("pre", { class: "hiprint-designer-error" }, errorRef.value.message);
      }

      return h(
        "div",
        { class: "hiprint-designer-canvas", onMousedown: clearSelection as any },
        [
          h("div", { class: "hiprint-designer-canvas-scroll" }, [
            h(
              "div",
              {
                class: "hiprint-designer-canvas-content",
                style: {
                  transform: `scale(${zoom.value})`,
                  transformOrigin: "top center",
                },
              },
              [
                h("div", {
                  class: "hiprint-designer-preview-layer",
                  ref: containerRef,
                }),
                layoutResult.value
                  ? h(SelectionOverlay, {
                      layout: layoutResult.value,
                      store: props.store,
                      state: props.state,
                      dpi: props.layoutOptions.dpi ?? 96,
                      onChange: () => emit("change"),
                    })
                  : null,
              ],
            ),
          ]),
        ],
      );
    };
  },
});
