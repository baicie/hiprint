import type { LayoutLineElement, LayoutPage } from "@hiprint-re/core";
import type { DomRenderContext } from "../types";
import { applyElementBaseStyle } from "../style/applyElementStyle";

export function renderLine(
  element: LayoutLineElement,
  _page: LayoutPage,
  ctx: DomRenderContext,
): HTMLElement {
  const doc = ctx.document;
  const prefix = ctx.options.classNamePrefix;

  const dom = doc.createElement("div");
  dom.className = `${prefix}-element ${prefix}-line`;
  dom.dataset.elementId = element.id;
  dom.dataset.elementType = element.type;

  applyElementBaseStyle(dom, element, ctx);

  const color = String(element.style?.borderColor ?? "#111827");
  const width = String(element.style?.borderWidth ?? 1);

  if (element.direction === "vertical") {
    dom.style.borderLeft = `${width}px solid ${color}`;
  } else {
    dom.style.borderTop = `${width}px solid ${color}`;
  }

  return dom;
}
