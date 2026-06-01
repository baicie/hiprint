import type { DesignerCommand } from "../types";
import { getActivePanel } from "../../state/selectors";
import { offsetPastedElements } from "../../clipboard/clipboard";
import { updatePanelById } from "./utils";

export interface PasteElementsCommandInput {
  offset?: number;
}

export function createPasteElementsCommand(
  input: PasteElementsCommandInput = {},
): DesignerCommand {
  return {
    id: "clipboard.paste",
    name: "Paste Elements",
    history: true,

    execute(state) {
      const panel = getActivePanel(state);

      if (!panel || state.clipboard.elements.length === 0) {
        return state;
      }

      const pasted = offsetPastedElements(
        state.clipboard.elements,
        input.offset ?? 6,
      );

      return {
        ...state,
        template: updatePanelById(
          state.template,
          panel.id,
          (targetPanel) => ({
            ...targetPanel,
            elements: [...targetPanel.elements, ...pasted],
          }),
        ),
        selection: {
          ids: pasted.map((element) => element.id),
          activeId: pasted[pasted.length - 1]?.id,
        },
      };
    },
  };
}
