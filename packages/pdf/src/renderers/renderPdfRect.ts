import type { LayoutRectElement } from "@hiprint-re/core";
import { rgb } from "pdf-lib";
import { parseHexColor } from "@hiprint-re/render-core";
import type { PdfRenderContext } from "../types";
import { toPdfPt, yToPdf } from "../unit";

export function renderPdfRect(
  element: LayoutRectElement,
  ctx: PdfRenderContext,
): void {
  const borderColor = parseHexColor(element.style?.["borderColor"]) ?? {
    r: 17,
    g: 24,
    b: 39,
  };

  const fillColor = parseHexColor(element.style?.["backgroundColor"]);

  ctx.page.drawRectangle({
    x: toPdfPt(element.x, ctx.layout.unit),
    y: yToPdf(
      element.y + element.height,
      ctx.pageHeightMm,
      ctx.layout.unit,
    ),
    width: toPdfPt(element.width, ctx.layout.unit),
    height: toPdfPt(element.height, ctx.layout.unit),
    borderColor: rgb(borderColor.r / 255, borderColor.g / 255, borderColor.b / 255),
    borderWidth: Number(element.style?.["borderWidth"] ?? 1),
    color: fillColor
      ? rgb(fillColor.r / 255, fillColor.g / 255, fillColor.b / 255)
      : undefined,
  });
}
