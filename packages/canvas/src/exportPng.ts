import type { LayoutDocument } from "@hiprint-re/core";
import type { CanvasRenderOptions } from "./types";
import { renderToCanvas } from "./renderToCanvas";

export async function exportPngDataUrls(
  layout: LayoutDocument,
  options: CanvasRenderOptions = {},
): Promise<string[]> {
  const canvases = await renderToCanvas(layout, options);
  return canvases.map((canvas) => canvas.toDataURL("image/png"));
}

export async function downloadPngPages(
  layout: LayoutDocument,
  options: CanvasRenderOptions = {},
): Promise<void> {
  const dataUrls = await exportPngDataUrls(layout, options);

  dataUrls.forEach((url, index) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `page-${index + 1}.png`;
    a.click();
  });
}
