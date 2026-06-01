import { h, defineComponent, computed, Fragment } from "vue";
import type { LayoutDocument, LayoutElement } from "@hiprint-re/core";
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
            onPointerDown: (e: PointerEvent) => {
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
    onChange: { type: Function, required: true },
  },
  setup(props) {
    const pointer = useCanvasPointer(
      () => props.store,
      () => props.state,
      () => (props.onChange as () => void)(),
    );

    const layoutMap = computed(() => {
      const map = new Map<string, LayoutElement>();
      for (const page of props.layout.pages) {
        for (const element of page.elements) {
          map.set(element.sourceElementId, element);
        }
      }
      return map;
    });

    const selected = computed(() => getSelectedElements(props.state));

    return () =>
      h(
        "div",
        { class: "hiprint-designer-overlay" },
        selected.value.map((element) => {
          const layoutElement = layoutMap.value.get(element.id);
          if (!layoutElement) return null;

          return h(
            "div",
            {
              key: element.id,
              class: "hiprint-designer-selection",
              style: {
                left: `${layoutElement.x}${props.layout.unit}`,
                top: `${layoutElement.y}${props.layout.unit}`,
                width: `${layoutElement.width}${props.layout.unit}`,
                height: `${layoutElement.height}${props.layout.unit}`,
              },
              onPointerDown: (e: PointerEvent) => {
                pointer.startDrag(e, element.id);
              },
            },
            [
              h(ResizeHandles, {
                elementId: element.id,
                onResizeStart: pointer.startResize,
              }),
            ],
          );
        }),
      );
  },
});
