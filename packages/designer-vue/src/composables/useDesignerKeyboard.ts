import { onBeforeUnmount } from "vue";
import type { DesignerStore, DesignerState } from "@hiprint-re/designer-core";
import {
  defaultKeymap,
  resolveShortcutAction,
  createRemoveElementCommand,
  createDuplicateElementCommand,
  createPasteElementsCommand,
  createMoveElementCommand,
} from "@hiprint-re/designer-core";

export function useDesignerKeyboard(
  storeRef: () => DesignerStore,
  stateRef: () => DesignerState,
  onChange: () => void,
) {
  function onKeyDown(event: KeyboardEvent) {
    const state = stateRef();

    const action = resolveShortcutAction(event, defaultKeymap);
    if (!action) return;

    event.preventDefault();

    switch (action) {
      case "delete": {
        const ids = state.selection.ids;
        if (ids.length === 0) break;
        storeRef().dispatch(createRemoveElementCommand({ ids }));
        onChange();
        break;
      }

      case "duplicate": {
        storeRef().dispatch(createDuplicateElementCommand());
        onChange();
        break;
      }

      case "paste": {
        storeRef().dispatch(createPasteElementsCommand());
        onChange();
        break;
      }

      case "undo": {
        storeRef().undo();
        onChange();
        break;
      }

      case "redo": {
        storeRef().redo();
        onChange();
        break;
      }

      case "moveLeft": {
        const ids = state.selection.ids;
        if (ids.length === 0) break;
        storeRef().dispatch(createMoveElementCommand({
          ids,
          dx: event.shiftKey ? -10 : -1,
          dy: 0,
        }));
        onChange();
        break;
      }

      case "moveRight": {
        const ids = state.selection.ids;
        if (ids.length === 0) break;
        storeRef().dispatch(createMoveElementCommand({
          ids,
          dx: event.shiftKey ? 10 : 1,
          dy: 0,
        }));
        onChange();
        break;
      }

      case "moveUp": {
        const ids = state.selection.ids;
        if (ids.length === 0) break;
        storeRef().dispatch(createMoveElementCommand({
          ids,
          dx: 0,
          dy: event.shiftKey ? -10 : -1,
        }));
        onChange();
        break;
      }

      case "moveDown": {
        const ids = state.selection.ids;
        if (ids.length === 0) break;
        storeRef().dispatch(createMoveElementCommand({
          ids,
          dx: 0,
          dy: event.shiftKey ? 10 : 1,
        }));
        onChange();
        break;
      }
    }
  }

  window.addEventListener("keydown", onKeyDown);

  onBeforeUnmount(() => {
    window.removeEventListener("keydown", onKeyDown);
  });
}
