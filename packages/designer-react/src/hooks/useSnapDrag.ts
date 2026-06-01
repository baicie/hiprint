import { useRef } from "react";
import {
  createClearInteractionCommand,
  createMoveElementCommand,
  createSetInteractionCommand,
  getAllElements,
  getElementById,
  snapElement,
} from "@hiprint-re/designer-core";
import { useDesignerContext } from "../context/useDesignerContext";
import { useDesignerCommands } from "./useDesignerCommands";

interface DragSession {
  elementId: string;
  startX: number;
  startY: number;
  lastDx: number;
  lastDy: number;
}

export function useSnapDrag() {
  const { store, onChange } = useDesignerContext();
  const commands = useDesignerCommands();

  const sessionRef = useRef<DragSession | null>(null);

  function startDrag(event: React.PointerEvent, elementId: string) {
    event.stopPropagation();

    commands.select([elementId], elementId);

    sessionRef.current = {
      elementId,
      startX: event.clientX,
      startY: event.clientY,
      lastDx: 0,
      lastDy: 0,
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  }

  function onPointerMove(event: PointerEvent) {
    const session = sessionRef.current;
    if (!session) return;

    const currentState = store.getStateRef();
    const moving = getElementById(currentState, session.elementId);

    if (!moving) return;

    const zoom = currentState.viewport.zoom || 1;

    const dx = (event.clientX - session.startX) / zoom;
    const dy = (event.clientY - session.startY) / zoom;

    const others = getAllElements(currentState).filter(
      (element) => element.id !== moving.id,
    );

    const snapped = snapElement({
      moving,
      others,
      guides: currentState.guides,
      x: moving.x + dx,
      y: moving.y + dy,
      threshold: 3,
    });

    const snappedDx = snapped.x - moving.x;
    const snappedDy = snapped.y - moving.y;

    session.lastDx = snappedDx;
    session.lastDy = snappedDy;

    store.dispatch(
      createSetInteractionCommand({
        dragGhost: {
          ids: [moving.id],
          dx: snappedDx,
          dy: snappedDy,
        },
        snapLines: snapped.lines,
      }),
    );
  }

  function onPointerUp() {
    const session = sessionRef.current;

    if (!session) return;

    if (session.lastDx !== 0 || session.lastDy !== 0) {
      store.dispatch(
        createMoveElementCommand({
          ids: [session.elementId],
          dx: session.lastDx,
          dy: session.lastDy,
        }),
      );

      onChange?.(store.getStateRef().template);
    }

    store.dispatch(createClearInteractionCommand());

    sessionRef.current = null;

    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  }

  return {
    startDrag,
  };
}
