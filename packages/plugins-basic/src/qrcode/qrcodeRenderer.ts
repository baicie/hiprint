import type { LayoutElement } from "@hiprint-re/core";
import type { PluginDomRenderer } from "@hiprint-re/plugin";
import { cssLength } from "@hiprint-re/dom";
import { createPseudoQrSvg } from "./qrcodeUtils";

export const qrcodeDomRenderer: PluginDomRenderer<LayoutElement> = {
  type: "qrcode",

  render(element, ctx) {
    const doc = ctx.document;
    const unit = ctx.options.geometryUnit;
    const prefix = ctx.options.classNamePrefix;

    const root = doc.createElement("div");
    root.className = `${prefix}-element ${prefix}-qrcode`;
    root.dataset.elementId = element.id;
    root.dataset.elementType = "qrcode";

    root.style.position = "absolute";
    root.style.left = cssLength(element.x, unit);
    root.style.top = cssLength(element.y, unit);
    root.style.width = cssLength(element.width, unit);
    root.style.height = cssLength(element.height, unit);

    const value = resolveQRCodeValue(element);
    const svg = createPseudoQrSvg(doc, value);

    root.appendChild(svg);

    return root;
  },
};

function resolveQRCodeValue(element: LayoutElement): string {
  const rawElement = element.raw?.legacyElement as Record<string, unknown> | undefined;
  const options = rawElement?.options as Record<string, unknown> | undefined
    ?? element.raw?.options as Record<string, unknown> | undefined
    ?? {};

  return String(options.value ?? element.id);
}
