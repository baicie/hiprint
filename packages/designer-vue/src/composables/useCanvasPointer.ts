import { onBeforeUnmount, ref } from "vue";
import type { ResizeHandle, DesignerStore, DesignerState } from "@hiprint-re/designer-core";
import {
  createSelectElementCommand,
  createMoveElementCommand,
  createResizeElementCommand,
} from "@hiprint-re/designer-core";

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

export function useCanvasPointer(
  storeRef: () => DesignerStore,
  stateRef: () => DesignerState,
  onChange: () => void,
) {
  const sessionRef = ref<PointerSession | null>(null);

  function select(ids: string[], activeId?: string) {
    storeRef().dispatch(
      createSelectElementCommand({ ids, activeId, append: false }),
    );
  }

  function moveSelected(dx: number, dy: number) {
    const ids = stateRef().selection.ids;
    if (ids.length === 0) return;
    storeRef().dispatch(createMoveElementCommand({ ids, dx, dy }));
  }

  function resizeElement(id: string, handle: ResizeHandle, dx: number, dy: number) {
    storeRef().dispatch(createResizeElementCommand({ id, handle, dx, dy }));
  }

  function startDrag(event: PointerEvent, elementId: string) {
    event.stopPropagation();
    select([elementId], elementId);
    sessionRef.value = {
      type: "drag",
      elementId,
      startX: event.clientX,
      startY: event.clientY,
    };
    window.addEventListener("pointerup", onPointerUp);
  }

  function startResize(event: PointerEvent, elementId: string, handle: ResizeHandle) {
    event.stopPropagation();
    select([elementId], elementId);
    sessionRef.value = {
      type: "resize",
      elementId,
      handle,
      startX: event.clientX,
      startY: event.clientY,
    };
    window.addEventListener("pointerup", onPointerUp);
  }

  function onPointerUp(event: PointerEvent) {
    const session = sessionRef.value;
    if (!session) return;

    const zoom = stateRef().viewport.zoom || 1;
    const dx = (event.clientX - session.startX) / zoom;
    const dy = (event.clientY - session.startY) / zoom;

    if (session.type === "drag") {
      moveSelected(dx, dy);
    } else {
      resizeElement(session.elementId, session.handle, dx, dy);
    }

    onChange();
    sessionRef.value = null;
    window.removeEventListener("pointerup", onPointerUp);
  }

  onBeforeUnmount(() => {
    if (sessionRef.value) {
      window.removeEventListener("pointerup", onPointerUp);
    }
  });

  return { startDrag, startResize };
}
