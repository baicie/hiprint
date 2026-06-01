import type { LayoutDocument, LayoutElement } from "@hiprint-re/core";
import { getSelectedElements } from "@hiprint-re/designer-core";
import { useDesignerState } from "../hooks/useDesignerState";
import { useSnapDrag } from "../hooks/useSnapDrag";
import { ResizeHandles } from "./ResizeHandles";

export interface SelectionOverlayProps {
  layout: LayoutDocument;
}

export function SelectionOverlay(props: SelectionOverlayProps) {
  const state = useDesignerState();
  const { startDrag } = useSnapDrag();

  const selected = getSelectedElements(state);
  const ghost = state.interaction.dragGhost;

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

        const isGhosted = ghost?.ids.includes(element.id);

        const transform = isGhosted && ghost
          ? `translate(${ghost.dx}${props.layout.unit}, ${ghost.dy}${props.layout.unit})`
          : undefined;

        return (
          <div
            key={element.id}
            className="hiprint-designer-selection"
            style={{
              left: `${layoutElement.x}${props.layout.unit}`,
              top: `${layoutElement.y}${props.layout.unit}`,
              width: `${layoutElement.width}${props.layout.unit}`,
              height: `${layoutElement.height}${props.layout.unit}`,
              transform,
            }}
            onPointerDown={(event) => {
              startDrag(event, element.id);
            }}
          >
            <ResizeHandles
              elementId={element.id}
              onResizeStart={(_event, _id, _handle) => {
                // resize is handled by canvas pointer events
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
