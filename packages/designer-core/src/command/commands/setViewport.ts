import type { DesignerCommand } from "../types";
import type { DesignerViewport } from "../../types";

export interface SetViewportCommandInput {
  zoom?: number;
  scrollX?: number;
  scrollY?: number;
}

export function createSetViewportCommand(
  input: SetViewportCommandInput,
): DesignerCommand {
  return {
    id: "viewport.set",
    name: "Set Viewport",
    history: false,

    execute(state) {
      return {
        ...state,
        viewport: {
          ...state.viewport,
          zoom: input.zoom ?? state.viewport.zoom,
          scrollX: input.scrollX ?? state.viewport.scrollX,
          scrollY: input.scrollY ?? state.viewport.scrollY,
        },
      };
    },
  };
}
