import type { PaperConfig } from "../types/paper";
import type { Unit } from "../types/common";
import { convertUnit, roundLayoutValue } from "./unit";

export interface ResolvedPaper {
  width: number;
  height: number;
  unit: Unit;
}

export function resolvePaper(
  paper: PaperConfig,
  outputUnit: Unit,
  dpi: number,
): ResolvedPaper {
  return {
    width: roundLayoutValue(
      convertUnit(paper.width, {
        from: paper.unit,
        to: outputUnit,
        dpi,
      }),
    ),
    height: roundLayoutValue(
      convertUnit(paper.height, {
        from: paper.unit,
        to: outputUnit,
        dpi,
      }),
    ),
    unit: outputUnit,
  };
}
