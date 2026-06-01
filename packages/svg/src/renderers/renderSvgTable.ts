import type { LayoutTableElement } from "@hiprint-re/core";
import type { SvgRenderContext } from "../types";
import { getAllTableRows } from "@hiprint-re/render-core";
import { escapeXml } from "../utils/escapeXml";

export function renderSvgTable(
  table: LayoutTableElement,
  _ctx: SvgRenderContext,
): string {
  const rows = getAllTableRows(table);

  const cells = rows.flatMap((row) =>
    row.cells.map((cell) => {
      const cx = table.x + cell.x;
      const cy = table.y + cell.y;
      return `<g>
  <rect
    x="${cx}"
    y="${cy}"
    width="${cell.width}"
    height="${cell.height}"
    fill="none"
    stroke="#111827"
    stroke-width="0.2"
  />
  <text
    x="${cx + 1}"
    y="${cy + cell.height * 0.7}"
    font-size="3.5"
    fill="#111827"
  >${escapeXml(cell.value)}</text>
</g>`;
    }),
  );

  return `<g data-table-id="${table.id}">
${cells.join("\n")}
</g>`;
}
