import { h, defineComponent, computed, Fragment } from "vue";
import type { LayoutDocument } from "@hiprint-re/core";
import type { DesignerStore } from "@hiprint-re/designer-core";
import type { DesignerState } from "@hiprint-re/designer-core";
import type { ResizeHandle } from "@hiprint-re/designer-core";
import { getSelectedElements } from "@hiprint-re/designer-core";
import { useCanvasPointer } from "../composables/useCanvasPointer";

const HANDLES: ResizeHandle[] = ["n", "s", "e", "w", "ne", "nw", "se", "sw"];

export const ResizeHandles = defineComponent({
  name: "ResizeHandles",
  props: {
    elementId: { type: String, required: true },
    onResizeStart: { type: Function, required: true },
  },
  setup(props) {
    return () =>
      h(
        Fragment,
        {},
        HANDLES.map((handle) =>
          h("span", {
            class: `hiprint-designer-resize-handle hiprint-designer-resize-${handle}`,
            onPointerdown: (e: PointerEvent) => {
              e.stopPropagation();
              (props as any).onResizeStart(e, props.elementId, handle);
            },
          }),
        ),
      );
  },
});

export const SelectionOverlay = defineComponent({
  name: "SelectionOverlay",
  props: {
    layout: { type: Object as () => LayoutDocument, required: true },
    store: { type: Object as () => DesignerStore, required: true },
    state: { type: Object as () => DesignerState, required: true },
    dpi: { type: Number, default: 96 },
    onChange: { type: Function, required: true },
  },
  setup(props) {
    const pointer = useCanvasPointer(
      () => props.store,
      () => props.state,
      () => (props.onChange as () => void)(),
      { dpi: props.dpi },
    );

    const selected = computed(() => getSelectedElements(props.state));
    const selectedIds = computed(
      () => new Set(selected.value.map((item) => item.id)),
    );

    return () =>
      h(
        "div",
        { class: "hiprint-designer-overlay" },
        props.layout.pages.map((page) =>
          h(
            "div",
            {
              key: `page-${page.index}`,
              class: "hiprint-designer-overlay-page",
              style: {
                width: `${page.width}${props.layout.unit}`,
                height: `${page.height}${props.layout.unit}`,
              },
            },
            [
              ...page.elements.map((layoutElement) =>
                h("div", {
                  key: `hit-${page.index}-${layoutElement.sourceElementId}`,
                  class: "hiprint-designer-hitbox",
                  style: {
                    left: `${layoutElement.x}${props.layout.unit}`,
                    top: `${layoutElement.y}${props.layout.unit}`,
                    width: `${layoutElement.width}${props.layout.unit}`,
                    height: `${layoutElement.height}${props.layout.unit}`,
                  },
                  onPointerdown: (e: PointerEvent) => {
                    pointer.startDrag(e, layoutElement.sourceElementId);
                  },
                }),
              ),

              ...page.elements
                .filter((layoutElement) =>
                  selectedIds.value.has(layoutElement.sourceElementId),
                )
                .map((layoutElement) =>
                  h(
                    "div",
                    {
                      key: layoutElement.sourceElementId,
                      class: "hiprint-designer-selection",
                      style: {
                        left: `${layoutElement.x}${props.layout.unit}`,
                        top: `${layoutElement.y}${props.layout.unit}`,
                        width: `${layoutElement.width}${props.layout.unit}`,
                        height: `${layoutElement.height}${props.layout.unit}`,
                      },
                      onPointerdown: (e: PointerEvent) => {
                        pointer.startDrag(e, layoutElement.sourceElementId);
                      },
                    },
                    [
                      h(ResizeHandles, {
                        elementId: layoutElement.sourceElementId,
                        onResizeStart: pointer.startResize,
                      }),
                    ],
                  ),
                ),
            ],
          ),
        ),
      );
  },
});
