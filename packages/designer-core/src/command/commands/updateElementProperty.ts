import type { DesignerCommand } from "../types";
import { updateElementById } from "./utils";
import { getByPath, setByPath } from "../../utils/path";

export interface UpdateElementPropertyCommandInput {
  id: string;
  path: string;
  value: unknown;
}

export function createUpdateElementPropertyCommand(
  input: UpdateElementPropertyCommandInput,
): DesignerCommand {
  return {
    id: "element.property.update",
    name: "Update Element Property",
    history: true,

    execute(state) {
      return {
        ...state,
        template: updateElementById(
          state.template,
          input.id,
          (element) => setByPath(element, input.path, input.value),
        ),
      };
    },
  };
}

export { getByPath };
