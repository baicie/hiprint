import type { DistributeType } from "../../geometry/distribute";
import { distributeElements } from "../../geometry/distribute";
import { getSelectedElements } from "../../state/selectors";
import type { DesignerCommand } from "../types";
import { updateElementById } from "./utils";

export interface DistributeElementsCommandInput {
  type: DistributeType;
}

export function createDistributeElementsCommand(
  input: DistributeElementsCommandInput,
): DesignerCommand {
  return {
    id: "element.distribute",
    name: "Distribute Elements",
    history: true,

    execute(state) {
      const selected = getSelectedElements(state);

      if (selected.length <= 2) return state;

      const distributed = distributeElements(selected, input.type);
      let template = state.template;

      for (const element of distributed) {
        template = updateElementById(template, element.id, () => element);
      }

      return {
        ...state,
        template,
      };
    },
  };
}
