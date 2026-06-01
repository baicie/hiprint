import { useEffect, useRef } from "react";
import { mountLayout } from "@hiprint-re/dom";
import type { MountLayoutResult } from "@hiprint-re/dom";
import { createSetActivePanelCommand } from "@hiprint-re/designer-core";
import { useDesignerContext } from "../context/useDesignerContext";
import { useDesignerLayout } from "../hooks/useDesignerLayout";
import { useDesignerCommands } from "../hooks/useDesignerCommands";
import { useDesignerState } from "../hooks/useDesignerState";
import { SelectionOverlay } from "./SelectionOverlay";

export function DesignerCanvas() {
  const ctx = useDesignerContext();
  const state = useDesignerState();
  const commands = useDesignerCommands();
  const { layout, error } = useDesignerLayout();

  const previewRef = useRef<HTMLDivElement | null>(null);
  const mountRef = useRef<MountLayoutResult | null>(null);

  useEffect(() => {
    const container = previewRef.current;
    if (!container || !layout) return;

    const layoutDoc = layout;
    function handlePageClick(pageIndex: number) {
      const firstEl = layoutDoc.pages[pageIndex]?.elements[0];
      const panelId = firstEl?.sourcePanelId ?? state.activePanelId;
      if (panelId) {
        ctx.store.dispatch(createSetActivePanelCommand({ panelId }));
      }
    }

    mountRef.current?.dispose();
    mountRef.current = mountLayout(layout, container, {
      ...ctx.domOptions,
      pageGap: 24,
      onPageClick: handlePageClick,
    });

    return () => {
      mountRef.current?.dispose();
      mountRef.current = null;
    };
  }, [layout, ctx.domOptions, ctx.store, state.activePanelId]);

  function clearSelection(event: React.MouseEvent) {
    if (event.target === event.currentTarget) {
      commands.clearSelection();
    }
  }

  if (error) {
    return (
      <pre className="hiprint-designer-error">{error.message}</pre>
    );
  }

  return (
    <div className="hiprint-designer-canvas" onMouseDown={clearSelection}>
      <div className="hiprint-designer-canvas-scroll">
        <div
          className="hiprint-designer-canvas-content"
          style={{
            transform: `scale(${state.viewport.zoom})`,
            transformOrigin: "top center",
          }}
        >
          <div
            ref={previewRef}
            className="hiprint-designer-preview-layer"
          />

          {layout ? <SelectionOverlay layout={layout} /> : null}
        </div>
      </div>
    </div>
  );
}
