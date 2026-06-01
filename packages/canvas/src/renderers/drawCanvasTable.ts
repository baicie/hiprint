import type { LayoutTableElement } from "@hiprint-re/core";
import { getAllTableRows } from "@hiprint-re/render-core";
import type { CanvasRenderContext } from "../types";

export function drawCanvasTable(
  table: LayoutTableElement,
  renderCtx: CanvasRenderContext,
): void {
  const ctx = renderCtx.ctx;
  const rows = getAllTableRows(table);

  ctx.save();
  ctx.strokeStyle = "#111827";
  ctx.lineWidth = 0.5;
  ctx.font = "12px Arial";
  ctx.textBaseline = "middle";

  for (const row of rows) {
    drawRow(ctx, table, row);
  }

  ctx.restore();
}

function drawRow(
  ctx: CanvasRenderingContext2D,
  table: LayoutTableElement,
  row: { cells: { x: number; y: number; width: number; height: number; value: string }[] },
): void {
  for (const cell of row.cells) {
    const x = table.x + cell.x;
    const y = table.y + cell.y;

    ctx.strokeRect(x, y, cell.width, cell.height);
    ctx.fillText(String(cell.value ?? ""), x + 2, y + cell.height / 2);
  }
}
