import type { DesignerCommand } from "../../command/types";
import { updateElementById } from "../../command/commands/utils";
import { isTableElement, updateTableOptions } from "../tableUtils";

export interface ReorderTableColumnCommandInput {
  tableId: string;
  fromIndex: number;
  toIndex: number;
}

export function createReorderTableColumnCommand(
  input: ReorderTableColumnCommandInput,
): DesignerCommand {
  return {
    id: "table.column.reorder",
    name: "Reorder Table Column",
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
              const columns = [...options.columns];
              const [column] = columns.splice(input.fromIndex, 1);

              if (!column) return options;

              columns.splice(input.toIndex, 0, column);

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
