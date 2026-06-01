import type { LayoutPage, LayoutTextElement } from "@hiprint-re/core";
import type { DomRenderContext } from "../types";
import { applyElementBaseStyle } from "../style/applyElementStyle";

export function renderText(
  element: LayoutTextElement,
  _page: LayoutPage,
  ctx: DomRenderContext,
): HTMLElement {
  const doc = ctx.document;
  const prefix = ctx.options.classNamePrefix;

  const dom = doc.createElement("div");
  dom.className = `${prefix}-element ${prefix}-text`;
  dom.dataset.elementId = element.id;
  dom.dataset.elementType = element.type;

  applyElementBaseStyle(dom, element, ctx);

  const content =
    element.lines && element.lines.length > 0
      ? element.lines.join("\n")
      : element.value;

  dom.textContent = content;

  return dom;
}
