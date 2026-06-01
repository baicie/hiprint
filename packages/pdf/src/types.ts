import {
  PDFDocument,
  PDFPage,
  PDFFont,
} from "pdf-lib";

export interface PdfExportOptions {
  title?: string;
  author?: string;

  /**
   * Use application-provided font bytes for CJK support.
   * Do NOT bundle font files inside the package.
   */
  fontBytes?: ArrayBuffer | Uint8Array;

  renderers?: PdfElementRenderer[];
}

export interface PdfRenderContext {
  layout: import("@hiprint-re/core").LayoutDocument;
  page: PDFPage;
  font: PDFFont;
  pageHeightMm: number;
  pdfDoc: PDFDocument;
  options: PdfExportOptions;
}

export interface PdfElementRenderer {
  type: string;
  render(element: import("@hiprint-re/core").LayoutElement, ctx: PdfRenderContext): void | Promise<void>;
}
