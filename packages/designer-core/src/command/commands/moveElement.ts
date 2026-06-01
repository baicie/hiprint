import type { DesignerCommand } from "../types";
import { updateElementById } from "./utils";
import { moveElement } from "../../geometry/move";

export interface MoveElementCommandInput {
  ids: string[];
  dx: number;
  dy: number;
}

export function createMoveElementCommand(
  input: MoveElementCommandInput,
): DesignerCommand {
  return {
    id: "element.move",
    name: "Move Element",
    history: true,

    execute(state) {
      let template = state.template;

      for (const id of input.ids) {
        template = updateElementById(template, id, (element) =>
          moveElement(element, {
            dx: input.dx,
            dy: input.dy,
          }),
        );
      }

      return {
        ...state,
        template,
      };
    },
  };
}
