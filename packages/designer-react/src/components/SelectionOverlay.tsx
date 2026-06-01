import type { LayoutDocument, LayoutElement } from "@hiprint-re/core";
import { getSelectedElements } from "@hiprint-re/designer-core";
import { useDesignerState } from "../hooks/useDesignerState";
import { useCanvasPointer } from "../hooks/useCanvasPointer";
import { ResizeHandles } from "./ResizeHandles";

export interface SelectionOverlayProps {
  layout: LayoutDocument;
}

export function SelectionOverlay(props: SelectionOverlayProps) {
  const state = useDesignerState();
  const pointer = useCanvasPointer();

  const selected = getSelectedElements(state);

  const layoutMap = new Map<string, LayoutElement>();

  for (const page of props.layout.pages) {
    for (const element of page.elements) {
      layoutMap.set(element.sourceElementId, element);
    }
  }

  return (
    <div className="hiprint-designer-overlay">
      {selected.map((element) => {
        const layoutElement = layoutMap.get(element.id);
        if (!layoutElement) return null;

        return (
          <div
            key={element.id}
            className="hiprint-designer-selection"
            style={{
              left: `${layoutElement.x}${props.layout.unit}`,
              top: `${layoutElement.y}${props.layout.unit}`,
              width: `${layoutElement.width}${props.layout.unit}`,
              height: `${layoutElement.height}${props.layout.unit}`,
            }}
            onPointerDown={(event) => {
              pointer.startDrag(event, element.id);
            }}
          >
            <ResizeHandles
              elementId={element.id}
              onResizeStart={pointer.startResize}
            />
          </div>
        );
      })}
    </div>
  );
}
