import type { DesignerCommand } from "../types";

export function createClearSelectionCommand(): DesignerCommand {
  return {
    id: "selection.clear",
    name: "Clear Selection",
    history: false,

    execute(state) {
      return {
        ...state,
        selection: {
          ids: [],
          activeId: undefined,
        },
      };
    },
  };
}
