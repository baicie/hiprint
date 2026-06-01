import type { LayoutPage, LayoutRectElement } from "@hiprint-re/core";
import type { DomRenderContext } from "../types";
import { applyElementBaseStyle } from "../style/applyElementStyle";
import { cssLength } from "../style/cssLength";

export function renderRect(
  element: LayoutRectElement,
  _page: LayoutPage,
  ctx: DomRenderContext,
): HTMLElement {
  const doc = ctx.document;
  const prefix = ctx.options.classNamePrefix;

  const dom = doc.createElement("div");
  dom.className = `${prefix}-element ${prefix}-rect`;
  dom.dataset.elementId = element.id;
  dom.dataset.elementType = element.type;

  applyElementBaseStyle(dom, element, ctx);

  if (!dom.style.borderStyle) {
    dom.style.borderStyle = "solid";
  }

  if (!dom.style.borderWidth) {
    dom.style.borderWidth = "1px";
  }

  if (!dom.style.borderColor) {
    dom.style.borderColor = "#111827";
  }

  if (typeof element.radius === "number") {
    dom.style.borderRadius = cssLength(
      element.radius,
      ctx.options.geometryUnit,
    );
  }

  return dom;
}
