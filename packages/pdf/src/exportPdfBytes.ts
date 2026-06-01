import type { LayoutDocument } from "@hiprint-re/core";
import {
  PDFDocument,
  StandardFonts,
} from "pdf-lib";
import type { PdfExportOptions, PdfRenderContext } from "./types";
import { toPdfPt } from "./unit";
import { renderPdfPage } from "./renderers/renderPdfPage";

export async function exportPdfBytes(
  layout: LayoutDocument,
  options: PdfExportOptions = {},
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();

  if (options.title) {
    pdfDoc.setTitle(options.title);
  }

  if (options.author) {
    pdfDoc.setAuthor(options.author);
  }

  const font = options.fontBytes
    ? await pdfDoc.embedFont(options.fontBytes)
    : await pdfDoc.embedFont(StandardFonts.Helvetica);

  for (const layoutPage of layout.pages) {
    const pageWidthPt = toPdfPt(layoutPage.width, layout.unit);
    const pageHeightPt = toPdfPt(layoutPage.height, layout.unit);

    const page = pdfDoc.addPage([pageWidthPt, pageHeightPt]);

    const ctx: PdfRenderContext = {
      layout,
      page,
      font,
      pdfDoc: pdfDoc,
      pageHeightMm: layoutPage.height,
      options,
    };

    await renderPdfPage(layoutPage, ctx);
  }

  return pdfDoc.save();
}
