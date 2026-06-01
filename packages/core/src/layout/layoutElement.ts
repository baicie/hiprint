import type { PrintElement } from "../types/element";
import type { PrintPanel } from "../types/panel";
import type { LayoutContext, LayoutElement } from "./types";
import { layoutText } from "./layoutText";
import { layoutImage } from "./layoutImage";
import { layoutLine } from "./layoutLine";
import { layoutRect } from "./layoutRect";
import { layoutTable } from "./layoutTable";
import { warnUnknownElement } from "./warnings";
import { normalizeYInPage } from "./utils";

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

      return [
        {
          id: element.id,
          sourcePanelId: input.panel.id,
          sourceElementId: element.id,
          pageIndex: input.pageIndex,
          type: "unknown",
          x: element.x,
          y: normalizeYInPage(element.y, input.pageHeight),
          width: element.width,
          height: element.height,
          hidden: element.hidden,
          style: element.style,
          raw: element.raw,
        },
      ];
  }
}
