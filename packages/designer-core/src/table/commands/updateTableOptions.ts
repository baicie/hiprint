import type { TableElementOptions } from "@hiprint-re/core";
import type { DesignerCommand } from "../../command/types";
import { updateElementById } from "../../command/commands/utils";
import { isTableElement, updateTableOptions } from "../tableUtils";

export interface UpdateTableOptionsCommandInput {
  tableId: string;
  patch: Partial<TableElementOptions>;
}

export function createUpdateTableOptionsCommand(
  input: UpdateTableOptionsCommandInput,
): DesignerCommand {
  return {
    id: "table.options.update",
    name: "Update Table Options",
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
              ...input.patch,
              header: {
                ...options.header,
                ...input.patch.header,
              },
              body: {
                ...options.body,
                ...input.patch.body,
              },
              footer: {
                ...options.footer,
                ...input.patch.footer,
              },
              pagination: {
                ...options.pagination,
                ...input.patch.pagination,
              },
              border: {
                ...options.border,
                ...input.patch.border,
              },
            }));
          },
        ),
      };
    },
  };
}
