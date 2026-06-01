import type { DesignerCommand } from "../types";
import { removeElementsByIds } from "./utils";

export interface RemoveElementCommandInput {
  ids: string[];
}

export function createRemoveElementCommand(
  input: RemoveElementCommandInput,
): DesignerCommand {
  return {
    id: "element.remove",
    name: "Remove Element",
    history: true,

    execute(state) {
      const template = removeElementsByIds(state.template, input.ids);

      return {
        ...state,
        template,
        selection: {
          ids: state.selection.ids.filter((id) => !input.ids.includes(id)),
          activeId:
            state.selection.activeId &&
            input.ids.includes(state.selection.activeId)
              ? undefined
              : state.selection.activeId,
        },
      };
    },
  };
}
