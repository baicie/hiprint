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
                show: false,
                repeatOnPageBreak: false,
                height: 30,
                ...options.header,
                ...input.patch.header,
              },
              body: {
                rowHeight: 30,
                ...options.body,
                ...input.patch.body,
              },
              footer: {
                show: false,
                rows: [],
                ...options.footer,
                ...input.patch.footer,
              },
              pagination: {
                enabled: false,
                repeatHeader: true,
                footerMode: "none",
                rowBreakMode: "avoid",
                allowPageBreak: true,
                ...options.pagination,
                ...input.patch.pagination,
              },
              border: {
                enabled: true,
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
