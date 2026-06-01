import { createPlugin } from "@hiprint-re/plugin";
import type { LayoutElement } from "@hiprint-re/core";
import type { DomRenderContext } from "@hiprint-re/dom";
import { cssLength } from "@hiprint-re/dom";
import { amountUppercaseElementDefinition } from "./amountUppercaseElement";

export function amountUppercasePlugin() {
  return createPlugin({
    name: "@hiprint-re/plugin-amount-uppercase",
    version: "0.0.0",
    description: "Amount uppercase business element.",
    elements: [amountUppercaseElementDefinition],
    domRenderers: [amountUppercaseRenderer],
  });
}

const amountUppercaseRenderer = {
  type: "business:amount-uppercase",
  render(element: LayoutElement, ctx: DomRenderContext) {
    const doc = ctx.document;
    const unit = ctx.options.geometryUnit;
    const prefix = ctx.options.classNamePrefix;

    const root = doc.createElement("div");
    root.className = `${prefix}-element ${prefix}-amount-uppercase`;
    root.dataset.elementId = element.id;
    root.dataset.elementType = element.type;

    root.style.position = "absolute";
    root.style.left = cssLength(element.x, unit);
    root.style.top = cssLength(element.y, unit);
    root.style.width = cssLength(element.width, unit);
    root.style.height = cssLength(element.height, unit);
    root.style.fontSize = "12px";
    root.style.whiteSpace = "nowrap";

    const value = resolveAmountValue(element);
    root.textContent = toChineseAmount(value);

    return root;
  },
};

function resolveAmountValue(element: LayoutElement): number {
  const raw = element.raw as Record<string, unknown> | undefined;
  const value = raw?.value ?? raw?.amount ?? 0;

  if (typeof value === "number") return value;

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function toChineseAmount(value: number): string {
  return `人民币 ${value.toFixed(2)} 元`;
}
