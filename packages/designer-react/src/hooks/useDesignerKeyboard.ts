import { useEffect } from "react";
import {
  defaultKeymap,
  resolveShortcutAction,
} from "@hiprint-re/designer-core";
import { useDesignerCommands } from "./useDesignerCommands";
import { useDesignerContext } from "../context/useDesignerContext";

export function useDesignerKeyboard() {
  const { readonly } = useDesignerContext();
  const commands = useDesignerCommands();

  useEffect(() => {
    if (readonly) return;

    function onKeyDown(event: KeyboardEvent) {
      const action = resolveShortcutAction(event, defaultKeymap);
      if (!action) return;

      event.preventDefault();

      switch (action) {
        case "delete":
          commands.removeSelected();
          break;
        case "duplicate":
          commands.duplicateSelected();
          break;
        case "paste":
          commands.paste();
          break;
        case "undo":
          commands.undo();
          break;
        case "redo":
          commands.redo();
          break;
        case "moveLeft":
          commands.moveSelected(event.shiftKey ? -10 : -1, 0);
          break;
        case "moveRight":
          commands.moveSelected(event.shiftKey ? 10 : 1, 0);
          break;
        case "moveUp":
          commands.moveSelected(0, event.shiftKey ? -10 : -1);
          break;
        case "moveDown":
          commands.moveSelected(0, event.shiftKey ? 10 : 1);
          break;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [readonly, commands]);
}
