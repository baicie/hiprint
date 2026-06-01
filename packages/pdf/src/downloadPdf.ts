import type { LayoutDocument } from "@hiprint-re/core";
import type { PdfExportOptions } from "./types";
import { exportPdfBytes } from "./exportPdfBytes";

export async function downloadPdf(
  layout: LayoutDocument,
  filename = "print.pdf",
  options: PdfExportOptions = {},
): Promise<void> {
  const bytes = await exportPdfBytes(layout, options);

  const blob = new Blob([new Uint8Array(bytes)] as BlobPart[], {
    type: "application/pdf",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}
