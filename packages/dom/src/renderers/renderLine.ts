import type { LayoutLineElement, LayoutPage } from "@hiprint-re/core";
import type { DomRenderContext } from "../types";
import { applyElementBaseStyle } from "../style/applyElementStyle";
import { cssLength } from "../style/cssLength";

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
  const width =
    typeof element.style?.borderWidth === "number"
      ? cssLength(element.style.borderWidth, ctx.options.geometryUnit)
      : "1px";
  const style =
    element.style?.borderStyle && element.style.borderStyle !== "none"
      ? element.style.borderStyle
      : "solid";

  if (element.direction === "vertical") {
    dom.style.borderLeft = `${width} ${style} ${color}`;
  } else {
    dom.style.borderTop = `${width} ${style} ${color}`;
  }

  return dom;
}
