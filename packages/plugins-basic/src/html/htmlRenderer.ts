import type { LayoutElement } from "@hiprint-re/core";
import type { PluginDomRenderer } from "@hiprint-re/plugin";
import { cssLength } from "@hiprint-re/dom";

export const htmlDomRenderer: PluginDomRenderer<LayoutElement> = {
  type: "html",

  render(element, ctx) {
    const doc = ctx.document;
    const unit = ctx.options.geometryUnit;
    const prefix = ctx.options.classNamePrefix;

    const root = doc.createElement("div");
    root.className = `${prefix}-element ${prefix}-html`;
    root.dataset.elementId = element.id;
    root.dataset.elementType = "html";

    root.style.position = "absolute";
    root.style.left = cssLength(element.x, unit);
    root.style.top = cssLength(element.y, unit);
    root.style.width = cssLength(element.width, unit);
    root.style.height = cssLength(element.height, unit);
    root.style.overflow = "hidden";

    const html = resolveHtml(element);

    /**
     * Security note: HTML element is only suitable for trusted templates.
     * Additional sanitization is needed for untrusted input.
     */
    root.innerHTML = html;

    return root;
  },
};

function resolveHtml(element: LayoutElement): string {
  const rawElement = element.raw?.legacyElement as Record<string, unknown> | undefined;
  const options = rawElement?.options as Record<string, unknown> | undefined
    ?? element.raw?.options as Record<string, unknown> | undefined
    ?? {};

  return String(options.html ?? "");
}
