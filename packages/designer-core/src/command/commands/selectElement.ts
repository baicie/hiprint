import type { DesignerCommand } from "../types";

export interface SelectElementCommandInput {
  ids: string[];
  activeId?: string;
  append?: boolean;
}

export function createSelectElementCommand(
  input: SelectElementCommandInput,
): DesignerCommand {
  return {
    id: "selection.select",
    name: "Select Element",
    history: false,

    execute(state) {
      if (input.append) {
        const ids = Array.from(
          new Set([...state.selection.ids, ...input.ids]),
        );

        return {
          ...state,
          selection: {
            ids,
            activeId: input.activeId ?? ids[ids.length - 1],
          },
        };
      }

      return {
        ...state,
        selection: {
          ids: input.ids,
          activeId: input.activeId ?? input.ids[0],
        },
      };
    },
  };
}
