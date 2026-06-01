import { printLayout } from "@hiprint-re/dom";
import { useDesignerContext } from "../context/useDesignerContext";
import { useDesignerLayout } from "../hooks/useDesignerLayout";
import { useDesignerCommands } from "../hooks/useDesignerCommands";
import { useDesignerState } from "../hooks/useDesignerState";
import { TemplateActions } from "./TemplateActions";
import { ZoomControls } from "./ZoomControls";
import { ExportActions } from "./ExportActions";
import { useMemo } from "react";

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

  async function handlePrint() {
    if (!layout) return;
    await printLayout(layout, ctx.domOptions);
  }

  return (
    <div className="hiprint-designer-toolbar">
      <button
        onClick={commands.undo}
        disabled={!canUndo}
        title="撤销 (Ctrl+Z)"
      >
        撤销
      </button>

      <button
        onClick={commands.redo}
        disabled={!canRedo}
        title="重做 (Ctrl+Shift+Z)"
      >
        重做
      </button>

      <span className="hiprint-designer-toolbar-separator" />

      <button
        onClick={() => commands.align("left")}
        disabled={!hasSelection}
        title="左对齐"
      >
        左对齐
      </button>

      <button
        onClick={() => commands.align("center")}
        disabled={!hasSelection}
        title="居中对齐"
      >
        居中
      </button>

      <button
        onClick={() => commands.align("top")}
        disabled={!hasSelection}
        title="顶对齐"
      >
        顶对齐
      </button>

      <span className="hiprint-designer-toolbar-separator" />

      <button
        onClick={commands.duplicateSelected}
        disabled={!hasSelection}
        title="复制 (Ctrl+D)"
      >
        复制
      </button>

      <button
        onClick={commands.removeSelected}
        disabled={!hasSelection}
        title="删除 (Delete)"
      >
        删除
      </button>

      <span className="hiprint-designer-toolbar-separator" />

      <ZoomControls />

      <span className="hiprint-designer-toolbar-separator" />

      <TemplateActions />

      <span className="hiprint-designer-toolbar-separator" />

      <ExportActions />

      <span className="hiprint-designer-toolbar-separator" />

      <button
        onClick={handlePrint}
        disabled={!layout}
        title="打印"
      >
        打印
      </button>
    </div>
  );
}
