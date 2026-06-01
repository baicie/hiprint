import type {
  LayoutPage,
  LayoutTableElement,
  LayoutTableRow,
} from "@hiprint-re/core";
import type { DomRenderContext } from "../types";
import { cssLength } from "../style/cssLength";
import { applyElementBaseStyle } from "../style/applyElementStyle";

function resolveBorderStyle(
  element: LayoutTableElement,
): { borderColor: string; borderWidth: number; borderStyle: string } {
  const defaults = {
    borderColor: "#111827",
    borderWidth: 1,
    borderStyle: "solid",
  };

  if (element.border?.enabled === false) {
    return { borderColor: "transparent", borderWidth: 0, borderStyle: "solid" };
  }

  return {
    borderColor: element.border?.color ?? defaults.borderColor,
    borderWidth: element.border?.width ?? defaults.borderWidth,
    borderStyle: element.border?.style ?? defaults.borderStyle,
  };
}

export function renderTable(
  element: LayoutTableElement,
  _page: LayoutPage,
  ctx: DomRenderContext,
): HTMLElement {
  const doc = ctx.document;
  const prefix = ctx.options.classNamePrefix;

  const root = doc.createElement("div");
  root.className = `${prefix}-element ${prefix}-table`;
  root.dataset.elementId = element.id;
  root.dataset.elementType = element.type;

  applyElementBaseStyle(root, element, ctx);

  const border = resolveBorderStyle(element);

  renderRows(root, element.headerRows, element, ctx, "header", border);
  renderRows(root, element.bodyRows, element, ctx, "body", border);
  renderRows(root, element.footerRows, element, ctx, "footer", border);

  return root;
}

function renderRows(
  root: HTMLElement,
  rows: LayoutTableRow[],
  table: LayoutTableElement,
  ctx: DomRenderContext,
  kind: "header" | "body" | "footer",
  border: { borderColor: string; borderWidth: number; borderStyle: string },
): void {
  const doc = ctx.document;
  const prefix = ctx.options.classNamePrefix;

  for (const row of rows) {
    const localY = row.y - table.y;

    for (const cell of row.cells) {
      if (cell.hidden) continue;

      const cellDom = doc.createElement("div");

      cellDom.className = [
        `${prefix}-table-cell`,
        `${prefix}-table-${kind}-cell`,
      ].join(" ");

      cellDom.style.left = cssLength(cell.x, ctx.options.geometryUnit);
      cellDom.style.top = cssLength(localY, ctx.options.geometryUnit);
      cellDom.style.width = cssLength(cell.width, ctx.options.geometryUnit);
      cellDom.style.height = cssLength(cell.height, ctx.options.geometryUnit);
      cellDom.style.lineHeight = cssLength(cell.height, ctx.options.geometryUnit);

      if (cell.style?.textAlign) {
        cellDom.style.textAlign = String(cell.style.textAlign);
      }

      if (border.borderWidth > 0) {
        cellDom.style.border = [
          cssLength(border.borderWidth, ctx.options.geometryUnit),
          border.borderStyle,
          border.borderColor,
        ].join(" ");
      }

      cellDom.textContent = cell.value;

      root.appendChild(cellDom);
    }
  }
}
