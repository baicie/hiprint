import type { LayoutLineElement } from "@hiprint-re/core";
import type { SvgRenderContext } from "../types";

export function renderSvgLine(
  element: LayoutLineElement,
  _ctx: SvgRenderContext,
): string {
  const stroke = String(element.style?.["borderColor"] ?? "#111827");
  const strokeWidth = Number(element.style?.["borderWidth"] ?? 1);

  const x1 = element.x;
  const y1 = element.y;
  const x2 = element.direction === "vertical"
    ? element.x
    : element.x + element.width;
  const y2 = element.direction === "vertical"
    ? element.y + element.height
    : element.y;

  return `<line
  x1="${x1}"
  y1="${y1}"
  x2="${x2}"
  y2="${y2}"
  stroke="${stroke}"
  stroke-width="${strokeWidth}"
/>`;
}
