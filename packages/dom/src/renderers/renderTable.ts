import type {
  LayoutPage,
  LayoutTableElement,
} from "@hiprint-re/core";
import type { DomRenderContext } from "../types";
import { applyElementBaseStyle } from "../style/applyElementStyle";
import { cssLength } from "../style/cssLength";

export function renderTable(
  element: LayoutTableElement,
  _page: LayoutPage,
  ctx: DomRenderContext,
): HTMLElement {
  const doc = ctx.document;
  const prefix = ctx.options.classNamePrefix;
  const unit = ctx.options.geometryUnit;

  const root = doc.createElement("div");
  root.className = `${prefix}-element ${prefix}-table`;
  root.dataset.elementId = element.id;
  root.dataset.elementType = element.type;

  applyElementBaseStyle(root, element, ctx);

  if (element.headerHeight > 0) {
    for (const column of element.columns) {
      const cell = doc.createElement("div");
      cell.className = `${prefix}-table-cell ${prefix}-table-header-cell`;

      cell.style.left = cssLength(column.x, unit);
      cell.style.top = cssLength(0, unit);
      cell.style.width = cssLength(column.width, unit);
      cell.style.height = cssLength(element.headerHeight, unit);
      cell.style.lineHeight = cssLength(element.headerHeight, unit);

      cell.textContent = column.title ?? column.field ?? "";

      root.appendChild(cell);
    }
  }

  for (const row of element.rows ?? []) {
    const localY = row.y - element.y;

    for (const cell of row.cells) {
      const cellDom = doc.createElement("div");
      cellDom.className = `${prefix}-table-cell`;

      cellDom.style.left = cssLength(cell.x, unit);
      cellDom.style.top = cssLength(localY, unit);
      cellDom.style.width = cssLength(cell.width, unit);
      cellDom.style.height = cssLength(cell.height, unit);
      cellDom.style.lineHeight = cssLength(cell.height, unit);

      cellDom.textContent = cell.value;

      root.appendChild(cellDom);
    }
  }

  return root;
}
