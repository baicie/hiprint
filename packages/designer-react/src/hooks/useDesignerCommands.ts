import { useMemo } from "react";
import {
  createAddElementCommand,
  createAlignElementsCommand,
  createClearSelectionCommand,
  createDuplicateElementCommand,
  createMoveElementCommand,
  createPasteElementsCommand,
  createRemoveElementCommand,
  createResizeElementCommand,
  createSelectElementCommand,
  createUpdateElementCommand,
  createUpdateElementPropertyCommand,
} from "@hiprint-re/designer-core";
import type { PrintElement } from "@hiprint-re/core";
import type { ResizeHandle } from "@hiprint-re/designer-core";
import { useDesignerContext } from "../context/useDesignerContext";

export function useDesignerCommands() {
  const { store, onChange } = useDesignerContext();

  return useMemo(() => {
    function emitChange() {
      onChange?.(store.getStateRef().template);
    }

    return {
      addElement(panelId: string, element: PrintElement) {
        store.dispatch(
          createAddElementCommand({
            panelId,
            element,
            select: true,
          }),
        );
        emitChange();
      },

      select(ids: string[], activeId?: string, append?: boolean) {
        store.dispatch(
          createSelectElementCommand({
            ids,
            activeId,
            append,
          }),
        );
      },

      clearSelection() {
        store.dispatch(createClearSelectionCommand());
      },

      removeSelected() {
        const ids = store.getStateRef().selection.ids;
        if (ids.length === 0) return;

        store.dispatch(createRemoveElementCommand({ ids }));
        emitChange();
      },

      moveSelected(dx: number, dy: number) {
        const ids = store.getStateRef().selection.ids;
        if (ids.length === 0) return;

        store.dispatch(createMoveElementCommand({ ids, dx, dy }));
        emitChange();
      },

      resizeElement(
        id: string,
        handle: ResizeHandle,
        dx: number,
        dy: number,
      ) {
        store.dispatch(
          createResizeElementCommand({ id, handle, dx, dy }),
        );
        emitChange();
      },

      updateElement(id: string, patch: Partial<PrintElement>) {
        store.dispatch(createUpdateElementCommand({ id, patch }));
        emitChange();
      },

      updateElementProperty(id: string, path: string, value: unknown) {
        store.dispatch(
          createUpdateElementPropertyCommand({ id, path, value }),
        );
        emitChange();
      },

      duplicateSelected() {
        store.dispatch(createDuplicateElementCommand());
        emitChange();
      },

      paste() {
        store.dispatch(createPasteElementsCommand());
        emitChange();
      },

      align(
        type: Parameters<typeof createAlignElementsCommand>[0]["type"],
      ) {
        store.dispatch(createAlignElementsCommand({ type }));
        emitChange();
      },

      undo() {
        store.undo();
        emitChange();
      },

      redo() {
        store.redo();
        emitChange();
      },

      canUndo() {
        return store.canUndo();
      },

      canRedo() {
        return store.canRedo();
      },
    };
  }, [store, onChange]);
}
