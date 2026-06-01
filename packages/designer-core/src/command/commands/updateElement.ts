import type { PrintElement } from "@hiprint-re/core";
import type { DesignerCommand } from "../types";
import { updateElementById } from "./utils";

export interface UpdateElementCommandInput {
  id: string;
  patch: Partial<PrintElement>;
}

export function createUpdateElementCommand(
  input: UpdateElementCommandInput,
): DesignerCommand {
  return {
    id: "element.update",
    name: "Update Element",
    history: true,

    execute(state) {
      return {
        ...state,
        template: updateElementById(
          state.template,
          input.id,
          (element) =>
            ({
              ...element,
              ...input.patch,
              options: {
                ...element.options,
                ...input.patch.options,
              },
              style: {
                ...element.style,
                ...input.patch.style,
              },
              binding: {
                ...element.binding,
                ...input.patch.binding,
              },
            }) as PrintElement,
        ),
      };
    },
  };
}
