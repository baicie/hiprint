import type { LayoutElement, LayoutPage } from "@hiprint-re/core";
import type { DomRenderContext } from "../types";
import { applyElementBaseStyle } from "../style/applyElementStyle";

export function renderUnknown(
  element: LayoutElement,
  _page: LayoutPage,
  ctx: DomRenderContext,
): HTMLElement {
  const doc = ctx.document;
  const prefix = ctx.options.classNamePrefix;

  const dom = doc.createElement("div");
  dom.className = `${prefix}-element ${prefix}-unknown`;
  dom.dataset.elementId = element.id;
  dom.dataset.elementType = element.type;

  applyElementBaseStyle(dom, element, ctx);

  dom.textContent = `Unknown: ${element.type}`;

  return dom;
}
