import type { TableColumn } from "@hiprint-re/core";
import type { DesignerCommand } from "../../command/types";
import { updateElementById } from "../../command/commands/utils";
import {
  createTableColumn,
  isTableElement,
  updateTableOptions,
} from "../tableUtils";

export interface AddTableColumnCommandInput {
  tableId: string;
  column?: Partial<TableColumn>;
  index?: number;
}

export function createAddTableColumnCommand(
  input: AddTableColumnCommandInput,
): DesignerCommand {
  return {
    id: "table.column.add",
    name: "Add Table Column",
    history: true,

    execute(state) {
      return {
        ...state,
        template: updateElementById(
          state.template,
          input.tableId,
          (element) => {
            if (!isTableElement(element)) return element;

            return updateTableOptions(element, (options) => {
              const nextColumn = createTableColumn(input.column);
              const columns = [...options.columns];
              const index = input.index ?? columns.length;

              columns.splice(index, 0, nextColumn);

              return {
                ...options,
                columns,
              };
            });
          },
        ),
      };
    },
  };
}
