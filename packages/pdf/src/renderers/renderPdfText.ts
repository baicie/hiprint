import type { LayoutTextElement } from "@hiprint-re/core";
import { rgb } from "pdf-lib";
import { parseHexColor } from "@hiprint-re/render-core";
import type { PdfRenderContext } from "../types";
import { toPdfPt, yToPdf } from "../unit";

export function renderPdfText(
  element: LayoutTextElement,
  ctx: PdfRenderContext,
): void {
  const fontSize = Number(element.style?.["fontSize"] ?? element.fontSize ?? 12);
  const textColor = parseHexColor(element.style?.["color"]) ?? {
    r: 17,
    g: 24,
    b: 39,
  };

  const lineHeight = element.lineHeight ?? fontSize * 1.2;
  const lines = element.lines?.length
    ? element.lines
    : [element.value];
  const unit = ctx.layout.unit;

  lines.forEach((line, index) => {
    ctx.page.drawText(line, {
      x: toPdfPt(element.x, unit),
      y: yToPdf(
        element.y + index * lineHeight,
        ctx.pageHeightMm,
        unit,
      ),
      size: fontSize,
      font: ctx.font,
      color: rgb(textColor.r / 255, textColor.g / 255, textColor.b / 255),
    });
  });
}
