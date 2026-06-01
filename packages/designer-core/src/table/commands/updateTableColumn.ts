import type { TableColumn } from "@hiprint-re/core";
import type { DesignerCommand } from "../../command/types";
import { updateElementById } from "../../command/commands/utils";
import { isTableElement, updateTableOptions } from "../tableUtils";

export interface UpdateTableColumnCommandInput {
  tableId: string;
  columnId: string;
  patch: Partial<TableColumn>;
}

export function createUpdateTableColumnCommand(
  input: UpdateTableColumnCommandInput,
): DesignerCommand {
  return {
    id: "table.column.update",
    name: "Update Table Column",
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
              columns: options.columns.map((column) =>
                column.id === input.columnId
                  ? {
                      ...column,
                      ...input.patch,
                    }
                  : column,
              ),
            }));
          },
        ),
      };
    },
  };
}
