import type { LayoutLineElement } from "@hiprint-re/core";
import { rgb } from "pdf-lib";
import { parseHexColor } from "@hiprint-re/render-core";
import type { PdfRenderContext } from "../types";
import { toPdfPt, yToPdf } from "../unit";

export function renderPdfLine(
  element: LayoutLineElement,
  ctx: PdfRenderContext,
): void {
  const lineColor = parseHexColor(element.style?.["borderColor"]) ?? {
    r: 17,
    g: 24,
    b: 39,
  };

  const unit = ctx.layout.unit;

  const start = {
    x: toPdfPt(element.x, unit),
    y: yToPdf(element.y, ctx.pageHeightMm, unit),
  };

  const end =
    element.direction === "vertical"
      ? {
          x: toPdfPt(element.x, unit),
          y: yToPdf(element.y + element.height, ctx.pageHeightMm, unit),
        }
      : {
          x: toPdfPt(element.x + element.width, unit),
          y: yToPdf(element.y, ctx.pageHeightMm, unit),
        };

  ctx.page.drawLine({
    start,
    end,
    thickness: Number(element.style?.["borderWidth"] ?? 1),
    color: rgb(lineColor.r / 255, lineColor.g / 255, lineColor.b / 255),
  });
}
