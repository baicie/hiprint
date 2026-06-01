import type { LayoutElement } from "@hiprint-re/core";
import type { PluginDomRenderer } from "@hiprint-re/plugin";
import type { DomRenderContext } from "@hiprint-re/dom";
import { cssLength } from "@hiprint-re/dom";
import { createBarcodeSvg } from "./barcodeUtils";

export const barcodeDomRenderer: PluginDomRenderer<LayoutElement> = {
  type: "barcode",

  render(element, ctx) {
    const doc = ctx.document;
    const unit = ctx.options.geometryUnit;
    const prefix = ctx.options.classNamePrefix;

    const root = doc.createElement("div");
    root.className = `${prefix}-element ${prefix}-barcode`;
    root.dataset.elementId = element.id;
    root.dataset.elementType = "barcode";

    root.style.position = "absolute";
    root.style.left = cssLength(element.x, unit);
    root.style.top = cssLength(element.y, unit);
    root.style.width = cssLength(element.width, unit);
    root.style.height = cssLength(element.height, unit);
    root.style.overflow = "hidden";

    const value = resolveBarcodeValue(element);
    const svg = createBarcodeSvg(doc, value, element.width, element.height);

    root.appendChild(svg);

    return root;
  },
};

function resolveBarcodeValue(element: LayoutElement): string {
  const rawElement = element.raw?.legacyElement as Record<string, unknown> | undefined;
  const options = rawElement?.options as Record<string, unknown> | undefined
    ?? element.raw?.options as Record<string, unknown> | undefined
    ?? {};

  return String(
    options.value ?? options.text ?? options.title ?? element.id,
  );
}
