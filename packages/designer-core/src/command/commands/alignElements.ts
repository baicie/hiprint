import type { AlignType } from "../../geometry/align";
import { alignElements } from "../../geometry/align";
import { getSelectedElements } from "../../state/selectors";
import type { DesignerCommand } from "../types";
import { updateElementById } from "./utils";

export interface AlignElementsCommandInput {
  type: AlignType;
}

export function createAlignElementsCommand(
  input: AlignElementsCommandInput,
): DesignerCommand {
  return {
    id: "element.align",
    name: "Align Elements",
    history: true,

    execute(state) {
      const selected = getSelectedElements(state);

      if (selected.length <= 1) return state;

      const aligned = alignElements(selected, input.type);
      const alignedMap = new Map(
        aligned.map((element) => [element.id, element]),
      );

      let template = state.template;

      for (const element of aligned) {
        template = updateElementById(
          template,
          element.id,
          () => alignedMap.get(element.id)!,
        );
      }

      return {
        ...state,
        template,
      };
    },
  };
}
