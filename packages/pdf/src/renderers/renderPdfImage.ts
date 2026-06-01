import type { LayoutImageElement } from "@hiprint-re/core";
import type { PdfRenderContext } from "../types";
import { toPdfPt, yToPdf } from "../unit";

export async function renderPdfImage(
  element: LayoutImageElement,
  ctx: PdfRenderContext,
): Promise<void> {
  if (!element.src) return;

  let imageBytes: Uint8Array;

  if (element.src.startsWith("data:image/png;base64,")) {
    const b64 = element.src.replace("data:image/png;base64,", "");
    const binary = atob(b64);
    imageBytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      imageBytes[i] = binary.charCodeAt(i);
    }
  } else if (
    element.src.startsWith("data:image/jpeg;base64,") ||
    element.src.startsWith("data:image/jpg;base64,")
  ) {
    const b64 = element.src.replace(/^data:image\/jpe?g;base64,/, "");
    const binary = atob(b64);
    imageBytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      imageBytes[i] = binary.charCodeAt(i);
    }
  } else {
    return;
  }

  let embedded;
  try {
    embedded = await ctx.pdfDoc.embedPng(imageBytes);
  } catch {
    try {
      embedded = await ctx.pdfDoc.embedJpg(imageBytes);
    } catch {
      return;
    }
  }

  ctx.page.drawImage(embedded, {
    x: toPdfPt(element.x, ctx.layout.unit),
    y: yToPdf(
      element.y + element.height,
      ctx.pageHeightMm,
      ctx.layout.unit,
    ),
    width: toPdfPt(element.width, ctx.layout.unit),
    height: toPdfPt(element.height, ctx.layout.unit),
  });
}
