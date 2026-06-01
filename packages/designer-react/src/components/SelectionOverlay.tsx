import type { LayoutDocument } from "@hiprint-re/core";
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
  const selectedIds = new Set(selected.map((element) => element.id));
  const ghost = state.interaction.dragGhost;

  return (
    <div className="hiprint-designer-overlay">
      {props.layout.pages.map((page) => (
        <div
          key={page.index}
          className="hiprint-designer-overlay-page"
          style={{
            width: `${page.width}${props.layout.unit}`,
            height: `${page.height}${props.layout.unit}`,
          }}
        >
          {page.elements.map((layoutElement) => (
            <div
              key={`hit-${page.index}-${layoutElement.sourceElementId}`}
              className="hiprint-designer-hitbox"
              style={{
                left: `${layoutElement.x}${props.layout.unit}`,
                top: `${layoutElement.y}${props.layout.unit}`,
                width: `${layoutElement.width}${props.layout.unit}`,
                height: `${layoutElement.height}${props.layout.unit}`,
              }}
              onPointerDown={(event) => {
                startDrag(event, layoutElement.sourceElementId);
              }}
            />
          ))}

          {page.elements
            .filter((layoutElement) =>
              selectedIds.has(layoutElement.sourceElementId),
            )
            .map((layoutElement) => {
              const isGhosted = ghost?.ids.includes(
                layoutElement.sourceElementId,
              );

              const transform = isGhosted && ghost
                ? `translate(${ghost.dx}${props.layout.unit}, ${ghost.dy}${props.layout.unit})`
                : undefined;

              return (
                <div
                  key={layoutElement.sourceElementId}
                  className="hiprint-designer-selection"
                  style={{
                    left: `${layoutElement.x}${props.layout.unit}`,
                    top: `${layoutElement.y}${props.layout.unit}`,
                    width: `${layoutElement.width}${props.layout.unit}`,
                    height: `${layoutElement.height}${props.layout.unit}`,
                    transform,
                  }}
                  onPointerDown={(event) => {
                    startDrag(event, layoutElement.sourceElementId);
                  }}
                >
                  <ResizeHandles
                    elementId={layoutElement.sourceElementId}
                    onResizeStart={(_event, _id, _handle) => {
                      // resize is handled by canvas pointer events
                    }}
                  />
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
}
