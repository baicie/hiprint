import type { PrintElement } from "@hiprint-re/core";
import type { DesignerCommand } from "../types";
import { updatePanelById } from "./utils";

export interface AddElementCommandInput {
  panelId: string;
  element: PrintElement;
  select?: boolean;
}

export function createAddElementCommand(
  input: AddElementCommandInput,
): DesignerCommand {
  return {
    id: "element.add",
    name: "Add Element",
    history: true,

    execute(state) {
      const template = updatePanelById(
        state.template,
        input.panelId,
        (panel) => ({
          ...panel,
          elements: [...panel.elements, input.element],
        }),
      );

      return {
        ...state,
        template,
        activePanelId: input.panelId,
        selection:
          input.select === false
            ? state.selection
            : {
                ids: [input.element.id],
                activeId: input.element.id,
              },
      };
    },
  };
}
