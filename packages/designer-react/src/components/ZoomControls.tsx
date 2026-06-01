import { useDesignerContext } from "../context/useDesignerContext";
import { useDesignerState } from "../hooks/useDesignerState";
import { createSetViewportCommand } from "@hiprint-re/designer-core";
import { useMemo } from "react";

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.1;

export function ZoomControls() {
  const { store } = useDesignerContext();
  const state = useDesignerState();

  const zoomPercent = useMemo(
    () => Math.round(state.viewport.zoom * 100),
    [state.viewport.zoom],
  );

  function setZoom(next: number) {
    store.dispatch(
      createSetViewportCommand({
        zoom: Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, next)),
      }),
    );
  }

  return (
    <div className="hiprint-designer-zoom">
      <button
        onClick={() => setZoom(state.viewport.zoom - ZOOM_STEP)}
        disabled={state.viewport.zoom <= MIN_ZOOM}
        title="缩小"
      >
        -
      </button>

      <span className="hiprint-designer-toolbar-zoom">{zoomPercent}%</span>

      <button
        onClick={() => setZoom(state.viewport.zoom + ZOOM_STEP)}
        disabled={state.viewport.zoom >= MAX_ZOOM}
        title="放大"
      >
        +
      </button>

      <button onClick={() => setZoom(1)} title="重置为 100%">
        100%
      </button>
    </div>
  );
}
