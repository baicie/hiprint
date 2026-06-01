import type { LayoutPage } from "@hiprint-re/core";
import type { DomRenderContext } from "../types";
import { cssLength } from "../style/cssLength";
import { renderElement } from "./renderElement";

export function renderPage(
  page: LayoutPage,
  ctx: DomRenderContext,
): HTMLElement {
  const doc = ctx.document;
  const prefix = ctx.options.classNamePrefix;
  const unit = ctx.options.geometryUnit;

  const pageDom = doc.createElement("div");
  pageDom.className = `${prefix}-page ${prefix}-page-print`;
  pageDom.dataset.pageIndex = String(page.index);

  pageDom.style.width = cssLength(page.width, unit);
  pageDom.style.height = cssLength(page.height, unit);
  pageDom.style.margin = `0 auto ${ctx.options.pageGap}px`;

  if (ctx.onPageClick) {
    pageDom.addEventListener("click", (e) => {
      if (e.target === pageDom) {
        ctx.onPageClick!(page.index, e);
      }
    });
  }

  for (const element of page.elements) {
    const elementDom = renderElement(element, page, ctx);

    if (elementDom) {
      pageDom.appendChild(elementDom);
    }
  }

  return pageDom;
}
