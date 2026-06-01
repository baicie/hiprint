import type { LayoutTableElement } from "@hiprint-re/core";
import { getAllTableRows } from "@hiprint-re/render-core";
import type { PdfRenderContext } from "../types";
import { renderPdfRect } from "./renderPdfRect";
import { renderPdfText } from "./renderPdfText";

export function renderPdfTable(
  table: LayoutTableElement,
  ctx: PdfRenderContext,
): void {
  const rows = getAllTableRows(table);

  for (const row of rows) {
    drawRow(table, row, ctx);
  }
}

function drawRow(
  table: LayoutTableElement,
  row: { cells: { x: number; y: number; width: number; height: number; value: string }[] },
  ctx: PdfRenderContext,
): void {
  for (const cell of row.cells) {
    const cellX = table.x + cell.x;
    const cellY = table.y + cell.y;

    renderPdfRect(
      {
        id: `cell_${table.id}`,
        type: "rect",
        sourcePanelId: table.sourcePanelId,
        sourceElementId: table.sourceElementId,
        pageIndex: table.pageIndex,
        x: cellX,
        y: cellY,
        width: cell.width,
        height: cell.height,
        style: {
          borderColor: "#111827",
          borderWidth: 0.5,
        },
      } as never,
      ctx,
    );

    renderPdfText(
      {
        id: `cell_text_${table.id}`,
        type: "text",
        sourcePanelId: table.sourcePanelId,
        sourceElementId: table.sourceElementId,
        pageIndex: table.pageIndex,
        x: cellX + 1,
        y: cellY + 1,
        width: cell.width - 2,
        height: cell.height - 2,
        value: cell.value,
        lines: [cell.value],
        fontSize: 10,
        lineHeight: 12,
        style: {
          fontSize: 10,
          color: "#111827",
        },
      } as never,
      ctx,
    );
  }
}
