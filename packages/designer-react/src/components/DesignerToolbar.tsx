import { printLayout } from "@hiprint-re/dom";
import { createSetViewportCommand } from "@hiprint-re/designer-core";
import { useDesignerContext } from "../context/useDesignerContext";
import { useDesignerLayout } from "../hooks/useDesignerLayout";
import { useDesignerCommands } from "../hooks/useDesignerCommands";
import { useDesignerState } from "../hooks/useDesignerState";
import { useMemo } from "react";

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.1;

export function DesignerToolbar() {
  const ctx = useDesignerContext();
  const state = useDesignerState();
  const commands = useDesignerCommands();
  const { layout } = useDesignerLayout();

  const canUndo = useMemo(() => commands.canUndo(), [commands]);
  const canRedo = useMemo(() => commands.canRedo(), [commands]);
  const hasSelection = useMemo(
    () => state.selection.ids.length > 0,
    [state.selection.ids.length],
  );

  const zoom = state.viewport.zoom;
  const zoomPercent = useMemo(() => Math.round(zoom * 100), [zoom]);

  function setZoom(next: number) {
    ctx.store.dispatch(createSetViewportCommand({ zoom: next }));
  }

  async function handlePrint() {
    if (!layout) return;
    await printLayout(layout, ctx.domOptions);
  }

  return (
    <div className="hiprint-designer-toolbar">
      <button
        onClick={commands.undo}
        disabled={!canUndo}
        title="Undo (Ctrl+Z)"
      >
        Undo
      </button>

      <button
        onClick={commands.redo}
        disabled={!canRedo}
        title="Redo (Ctrl+Shift+Z)"
      >
        Redo
      </button>

      <span className="hiprint-designer-toolbar-separator" />

      <button
        onClick={() => commands.align("left")}
        disabled={!hasSelection}
        title="Align Left"
      >
        Align Left
      </button>

      <button
        onClick={() => commands.align("center")}
        disabled={!hasSelection}
        title="Align Center"
      >
        Align Center
      </button>

      <button
        onClick={() => commands.align("top")}
        disabled={!hasSelection}
        title="Align Top"
      >
        Align Top
      </button>

      <span className="hiprint-designer-toolbar-separator" />

      <button
        onClick={commands.duplicateSelected}
        disabled={!hasSelection}
        title="Duplicate (Ctrl+D)"
      >
        Duplicate
      </button>

      <button
        onClick={commands.removeSelected}
        disabled={!hasSelection}
        title="Delete (Delete)"
      >
        Delete
      </button>

      <span className="hiprint-designer-toolbar-separator" />

      <button
        onClick={() => setZoom(Math.max(zoom - ZOOM_STEP, MIN_ZOOM))}
        disabled={zoom <= MIN_ZOOM}
        title="Zoom Out"
      >
        -
      </button>

      <span className="hiprint-designer-toolbar-zoom">{zoomPercent}%</span>

      <button
        onClick={() => setZoom(Math.min(zoom + ZOOM_STEP, MAX_ZOOM))}
        disabled={zoom >= MAX_ZOOM}
        title="Zoom In"
      >
        +
      </button>

      <button
        onClick={() => setZoom(1)}
        title="Zoom to 100%"
      >
        100%
      </button>

      <span className="hiprint-designer-toolbar-separator" />

      <button
        onClick={handlePrint}
        disabled={!layout}
        title="Print"
      >
        Print
      </button>
    </div>
  );
}
