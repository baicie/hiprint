import type { DesignerInteraction } from "../../types";
import type { DesignerCommand } from "../types";

export function createSetInteractionCommand(
  patch: Partial<DesignerInteraction>,
): DesignerCommand {
  return {
    id: "interaction.set",
    name: "Set Interaction",
    history: false,

    execute(state) {
      return {
        ...state,
        interaction: {
          ...state.interaction,
          ...patch,
        },
      };
    },
  };
}

export function createClearInteractionCommand(): DesignerCommand {
  return {
    id: "interaction.clear",
    name: "Clear Interaction",
    history: false,

    execute(state) {
      return {
        ...state,
        interaction: {
          snapLines: [],
        },
      };
    },
  };
}
