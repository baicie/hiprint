import type { LineElement } from "../types/element";
import type { LayoutLineElement } from "./types";
import type { LayoutElementInput } from "./layoutElement";
import { normalizeYInPage } from "./utils";

export function layoutLine(input: LayoutElementInput): LayoutLineElement {
  const { panel, element, pageIndex, pageHeight } = input;
  const lineElement = element as LineElement;

  return {
    id: lineElement.id,
    sourcePanelId: panel.id,
    sourceElementId: lineElement.id,
    pageIndex,
    type: "line",
    x: lineElement.x,
    y: normalizeYInPage(lineElement.y, pageHeight),
    width: lineElement.width,
    height: lineElement.height,
    direction:
      (lineElement.options?.direction as "horizontal" | "vertical") ??
      inferLineDirection(lineElement.width, lineElement.height),
    hidden: lineElement.hidden,
    style: lineElement.style,
    raw: lineElement.raw,
  };
}

function inferLineDirection(
  width: number,
  height: number,
): "horizontal" | "vertical" {
  return height > width ? "vertical" : "horizontal";
}
