import type { ResizeHandle } from "@hiprint-re/designer-core";

const handles: ResizeHandle[] = ["n", "s", "e", "w", "ne", "nw", "se", "sw"];

export interface ResizeHandlesProps {
  elementId: string;
  onResizeStart: (
    event: React.PointerEvent,
    elementId: string,
    handle: ResizeHandle,
  ) => void;
}

export function ResizeHandles(props: ResizeHandlesProps) {
  return (
    <>
      {handles.map((handle) => (
        <span
          key={handle}
          className={`hiprint-designer-resize-handle hiprint-designer-resize-${handle}`}
          onPointerDown={(event) => {
            event.stopPropagation();
            props.onResizeStart(event, props.elementId, handle);
          }}
        />
      ))}
    </>
  );
}
