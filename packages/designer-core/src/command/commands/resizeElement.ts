import type { ResizeHandle } from "../../types";
import type { DesignerCommand } from "../types";
import { updateElementById } from "./utils";
import { resizeElement } from "../../geometry/resize";

export interface ResizeElementCommandInput {
  id: string;
  handle: ResizeHandle;
  dx: number;
  dy: number;
  minWidth?: number;
  minHeight?: number;
}

export function createResizeElementCommand(
  input: ResizeElementCommandInput,
): DesignerCommand {
  return {
    id: "element.resize",
    name: "Resize Element",
    history: true,

    execute(state) {
      return {
        ...state,
        template: updateElementById(state.template, input.id, (element) =>
          resizeElement({
            element,
            handle: input.handle,
            dx: input.dx,
            dy: input.dy,
            minWidth: input.minWidth,
            minHeight: input.minHeight,
          }),
        ),
      };
    },
  };
}
