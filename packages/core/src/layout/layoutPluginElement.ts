import type { PrintElement } from "../types/element";
import type { LayoutElement } from "./types";
import type { LayoutElementInput } from "./layoutElement";
import { normalizeYInPage } from "./utils";

export function layoutPluginElement(input: LayoutElementInput): LayoutElement {
  const { panel, element, pageIndex, pageHeight } = input;

  return {
    id: element.id,
    sourcePanelId: panel.id,
    sourceElementId: element.id,
    pageIndex,
    type: element.type,
    x: element.x,
    y: normalizeYInPage(element.y, pageHeight),
    width: element.width,
    height: element.height,
    hidden: element.hidden,
    style: element.style,
    raw: element.raw,
  };
}
