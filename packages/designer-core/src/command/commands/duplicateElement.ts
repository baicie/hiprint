import type { DesignerCommand } from "../types";
import {
  getSelectedElements,
  getPanelByElementId,
} from "../../state/selectors";
import { offsetPastedElements } from "../../clipboard/clipboard";
import { updatePanelById } from "./utils";

export function createDuplicateElementCommand(): DesignerCommand {
  return {
    id: "element.duplicate",
    name: "Duplicate Element",
    history: true,

    execute(state) {
      const selected = getSelectedElements(state);

      if (selected.length === 0) return state;

      const firstPanel = getPanelByElementId(state, selected[0]!.id);

      if (!firstPanel) return state;

      const duplicated = offsetPastedElements(selected, 6);

      return {
        ...state,
        template: updatePanelById(state.template, firstPanel.id, (panel) => ({
          ...panel,
          elements: [...panel.elements, ...duplicated],
        })),
        selection: {
          ids: duplicated.map((element) => element.id),
          activeId: duplicated[duplicated.length - 1]?.id,
        },
      };
    },
  };
}
