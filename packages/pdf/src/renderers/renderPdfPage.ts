import type { LayoutPage } from "@hiprint-re/core";
import type { PdfRenderContext } from "../types";
import { renderPdfElement } from "./renderPdfElement";

export async function renderPdfPage(
  layoutPage: LayoutPage,
  ctx: PdfRenderContext,
): Promise<void> {
  for (const element of layoutPage.elements) {
    await renderPdfElement(element, ctx);
  }
}
