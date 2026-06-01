import { useRef } from "react";
import { pxToMm } from "@hiprint-re/core";
import type { ResizeHandle } from "@hiprint-re/designer-core";
import { useDesignerState } from "./useDesignerState";
import { useDesignerCommands } from "./useDesignerCommands";
import { useDesignerContext } from "../context/useDesignerContext";

interface DragSession {
  type: "drag";
  elementId: string;
  startX: number;
  startY: number;
}

interface ResizeSession {
  type: "resize";
  elementId: string;
  handle: ResizeHandle;
  startX: number;
  startY: number;
}

type PointerSession = DragSession | ResizeSession;

export function useCanvasPointer() {
  const state = useDesignerState();
  const commands = useDesignerCommands();
  const { layoutOptions } = useDesignerContext();
  const sessionRef = useRef<PointerSession | null>(null);

  function toDelta(event: PointerEvent | React.PointerEvent) {
    const session = sessionRef.current;
    if (!session) return { dx: 0, dy: 0 };

    const zoom = state.viewport.zoom || 1;
    return {
      dx: toTemplateUnit(
        (event.clientX - session.startX) / zoom,
        state.template.paper.unit,
        layoutOptions?.dpi,
      ),
      dy: toTemplateUnit(
        (event.clientY - session.startY) / zoom,
        state.template.paper.unit,
        layoutOptions?.dpi,
      ),
    };
  }

  function startDrag(event: React.PointerEvent, elementId: string) {
    event.stopPropagation();

    commands.select([elementId], elementId);

    sessionRef.current = {
      type: "drag",
      elementId,
      startX: event.clientX,
      startY: event.clientY,
    };

    window.addEventListener("pointerup", onPointerUp);
  }

  function startResize(
    event: React.PointerEvent,
    elementId: string,
    handle: ResizeHandle,
  ) {
    event.stopPropagation();

    commands.select([elementId], elementId);

    sessionRef.current = {
      type: "resize",
      elementId,
      handle,
      startX: event.clientX,
      startY: event.clientY,
    };

    window.addEventListener("pointerup", onPointerUp);
  }

  function onPointerUp(event: PointerEvent) {
    const session = sessionRef.current;
    if (!session) return;

    const screenDx = event.clientX - session.startX;
    const screenDy = event.clientY - session.startY;
    const delta = toDelta(event);

    if (Math.abs(screenDx) > 1 || Math.abs(screenDy) > 1) {
      if (session.type === "drag") {
        commands.moveSelected(delta.dx, delta.dy);
      } else {
        commands.resizeElement(session.elementId, session.handle, delta.dx, delta.dy);
      }
    }

    sessionRef.current = null;
    window.removeEventListener("pointerup", onPointerUp);
  }

  return {
    startDrag,
    startResize,
  };
}

function toTemplateUnit(
  px: number,
  unit: string | undefined,
  dpi = 96,
): number {
  if (unit === "mm") {
    return pxToMm(px, dpi);
  }

  return px;
}
