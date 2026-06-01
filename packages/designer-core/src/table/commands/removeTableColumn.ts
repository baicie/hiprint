import type { DesignerCommand } from "../../command/types";
import { updateElementById } from "../../command/commands/utils";
import { isTableElement, updateTableOptions } from "../tableUtils";

export interface RemoveTableColumnCommandInput {
  tableId: string;
  columnId: string;
}

export function createRemoveTableColumnCommand(
  input: RemoveTableColumnCommandInput,
): DesignerCommand {
  return {
    id: "table.column.remove",
    name: "Remove Table Column",
    history: true,

    execute(state) {
      return {
        ...state,
        template: updateElementById(
          state.template,
          input.tableId,
          (element) => {
            if (!isTableElement(element)) return element;

            return updateTableOptions(element, (options) => ({
              ...options,
              columns: options.columns.filter(
                (column) => column.id !== input.columnId,
              ),
            }));
          },
        ),
      };
    },
  };
}
