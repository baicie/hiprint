import { onBeforeUnmount, ref } from "vue";
import { pxToMm } from "@hiprint-re/core";
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
  options: {
    dpi?: number;
  } = {},
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
      startX: getClientX(event),
      startY: getClientY(event),
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
      startX: getClientX(event),
      startY: getClientY(event),
    };
    window.addEventListener("pointerup", onPointerUp);
  }

  function onPointerUp(event: PointerEvent) {
    const session = sessionRef.value;
    if (!session) return;

    const zoom = stateRef().viewport.zoom || 1;
    const screenDx = getClientX(event) - session.startX;
    const screenDy = getClientY(event) - session.startY;
    const dx = toTemplateUnit(screenDx / zoom);
    const dy = toTemplateUnit(screenDy / zoom);

    if (session.type === "drag") {
      if (Math.abs(screenDx) > 1 || Math.abs(screenDy) > 1) {
        moveSelected(dx, dy);
      }
    } else {
      if (Math.abs(screenDx) > 1 || Math.abs(screenDy) > 1) {
        resizeElement(session.elementId, session.handle, dx, dy);
      }
    }

    if (Math.abs(screenDx) > 1 || Math.abs(screenDy) > 1) {
      onChange();
    }
    sessionRef.value = null;
    window.removeEventListener("pointerup", onPointerUp);
  }

  onBeforeUnmount(() => {
    if (sessionRef.value) {
      window.removeEventListener("pointerup", onPointerUp);
    }
  });

  return { startDrag, startResize };

  function toTemplateUnit(px: number): number {
    const unit = stateRef().template.paper.unit;

    if (unit === "mm") {
      return pxToMm(px, options.dpi ?? 96);
    }

    return px;
  }
}

function getClientX(event: PointerEvent): number {
  return Number.isFinite(event.clientX) ? event.clientX : 0;
}

function getClientY(event: PointerEvent): number {
  return Number.isFinite(event.clientY) ? event.clientY : 0;
}
