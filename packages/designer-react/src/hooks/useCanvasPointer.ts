import { useRef } from "react";
import type { ResizeHandle } from "@hiprint-re/designer-core";
import { useDesignerState } from "./useDesignerState";
import { useDesignerCommands } from "./useDesignerCommands";

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
  const sessionRef = useRef<PointerSession | null>(null);

  function toDelta(event: PointerEvent | React.PointerEvent) {
    const session = sessionRef.current;
    if (!session) return { dx: 0, dy: 0 };

    const zoom = state.viewport.zoom || 1;
    return {
      dx: (event.clientX - session.startX) / zoom,
      dy: (event.clientY - session.startY) / zoom,
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

    const delta = toDelta(event);

    if (session.type === "drag") {
      commands.moveSelected(delta.dx, delta.dy);
    } else {
      commands.resizeElement(session.elementId, session.handle, delta.dx, delta.dy);
    }

    sessionRef.current = null;
    window.removeEventListener("pointerup", onPointerUp);
  }

  return {
    startDrag,
    startResize,
  };
}
