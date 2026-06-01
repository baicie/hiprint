import type { LayoutImageElement, LayoutPage } from "@hiprint-re/core";
import type { DomRenderContext } from "../types";
import { applyElementBaseStyle } from "../style/applyElementStyle";

export function renderImage(
  element: LayoutImageElement,
  _page: LayoutPage,
  ctx: DomRenderContext,
): HTMLElement {
  const doc = ctx.document;
  const prefix = ctx.options.classNamePrefix;

  const wrapper = doc.createElement("div");
  wrapper.className = `${prefix}-element ${prefix}-image`;
  wrapper.dataset.elementId = element.id;
  wrapper.dataset.elementType = element.type;

  applyElementBaseStyle(wrapper, element, ctx);

  const src = ctx.options.resolveImageSrc(element.src);

  if (src) {
    const img = doc.createElement("img");
    img.src = src;
    img.alt = "";
    img.style.objectFit = element.objectFit ?? "contain";

    wrapper.appendChild(img);
  }

  return wrapper;
}
