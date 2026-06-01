import { useEffect, useRef } from "react";
import { mountLayout } from "@hiprint-re/dom";
import type { MountLayoutResult } from "@hiprint-re/dom";
import { createSetActivePanelCommand } from "@hiprint-re/designer-core";
import { createClearSelectionCommand } from "@hiprint-re/designer-core";
import { useDesignerContext } from "../context/useDesignerContext";
import { useDesignerLayout } from "../hooks/useDesignerLayout";
import { useDesignerState } from "../hooks/useDesignerState";
import { useDesignerPluginManager } from "../plugin/DesignerPluginProvider";
import { SelectionOverlay } from "./SelectionOverlay";
import { SnaplineOverlay } from "./SnaplineOverlay";
import { Ruler } from "./Ruler";

export function DesignerCanvas() {
  const ctx = useDesignerContext();
  const state = useDesignerState();
  const { layout, error } = useDesignerLayout();
  const pluginManager = useDesignerPluginManager();

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
      renderers: [
        ...(ctx.domOptions?.renderers ?? []),
        ...pluginManager.getDomRenderers(),
      ],
    });

    return () => {
      mountRef.current?.dispose();
      mountRef.current = null;
    };
  }, [layout, ctx.domOptions, ctx.store, state.activePanelId, pluginManager]);

  function clearSelection(event: React.MouseEvent) {
    if (event.target === event.currentTarget) {
      ctx.store.dispatch(createClearSelectionCommand());
    }
  }

  if (error) {
    return (
      <pre className="hiprint-designer-error">{error.message}</pre>
    );
  }

  const paperWidth = state.template.paper.width;
  const paperHeight = state.template.paper.height;

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
          <div className="hiprint-designer-paper-container">
            <Ruler
              direction="horizontal"
              length={paperWidth}
              zoom={state.viewport.zoom}
            />
            <Ruler
              direction="vertical"
              length={paperHeight}
              zoom={state.viewport.zoom}
            />
            <div
              ref={previewRef}
              className="hiprint-designer-preview-layer"
            />
            {layout ? <SelectionOverlay layout={layout} /> : null}
            <SnaplineOverlay />
          </div>
        </div>
      </div>
    </div>
  );
}
