import { useDesignerState } from "../hooks/useDesignerState";

export function StatusBar() {
  const state = useDesignerState();

  return (
    <div className="hiprint-designer-statusbar">
      <span>Mode: {state.mode}</span>
      <span>Zoom: {Math.round(state.viewport.zoom * 100)}%</span>
      <span>Selected: {state.selection.ids.length}</span>
    </div>
  );
}
