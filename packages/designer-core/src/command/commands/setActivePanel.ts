import type { DesignerCommand } from "../types";

export interface SetActivePanelCommandInput {
  panelId: string;
}

export function createSetActivePanelCommand(
  input: SetActivePanelCommandInput,
): DesignerCommand {
  return {
    id: "panel.setActive",
    name: "Set Active Panel",
    history: false,

    execute(state) {
      return {
        ...state,
        activePanelId: input.panelId,
      };
    },
  };
}
