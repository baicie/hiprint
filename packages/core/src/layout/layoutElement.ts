import type { PrintElement } from "../types/element";
import type { PrintPanel } from "../types/panel";
import type { LayoutContext, LayoutElement } from "./types";
import { layoutText } from "./layoutText";
import { layoutImage } from "./layoutImage";
import { layoutLine } from "./layoutLine";
import { layoutRect } from "./layoutRect";
import { layoutTable } from "./layoutTable";
import { layoutPluginElement } from "./layoutPluginElement";
import { warnUnknownElement } from "./warnings";

export interface LayoutElementInput {
  ctx: LayoutContext;
  panel: PrintPanel;
  element: PrintElement;
  pageIndex: number;
  pageWidth: number;
  pageHeight: number;
  elementPath: string;
}

export function layoutElement(input: LayoutElementInput): LayoutElement[] {
  const { element, ctx } = input;

  switch (element.type) {
    case "text":
      return [layoutText(input)];

    case "image":
      return [layoutImage(input)];

    case "line":
      return [layoutLine(input)];

    case "rect":
      return [layoutRect(input)];

    case "table":
      return layoutTable(input);

    default:
      warnUnknownElement({
        ctx,
        elementId: element.id,
        path: input.elementPath,
      });

      return [layoutPluginElement(input)];
  }
}
