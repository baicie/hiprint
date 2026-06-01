import type { RectElement } from "../types/element";
import type { LayoutRectElement } from "./types";
import type { LayoutElementInput } from "./layoutElement";
import { normalizeYInPage } from "./utils";

export function layoutRect(input: LayoutElementInput): LayoutRectElement {
  const { panel, element, pageIndex, pageHeight } = input;
  const rectElement = element as RectElement;

  return {
    id: rectElement.id,
    sourcePanelId: panel.id,
    sourceElementId: rectElement.id,
    pageIndex,
    type: "rect",
    x: rectElement.x,
    y: normalizeYInPage(rectElement.y, pageHeight),
    width: rectElement.width,
    height: rectElement.height,
    radius: rectElement.options?.radius as number | undefined,
    hidden: rectElement.hidden,
    style: rectElement.style,
    raw: rectElement.raw,
  };
}
