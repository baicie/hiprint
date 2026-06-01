import type { LayoutRectElement } from "@hiprint-re/core";
import type { SvgRenderContext } from "../types";

export function renderSvgRect(
  element: LayoutRectElement,
  _ctx: SvgRenderContext,
): string {
  const stroke = String(element.style?.["borderColor"] ?? "#111827");
  const strokeWidth = Number(element.style?.["borderWidth"] ?? 1);
  const fill = String(element.style?.["backgroundColor"] ?? "none");

  return `<rect
  x="${element.x}"
  y="${element.y}"
  width="${element.width}"
  height="${element.height}"
  rx="${element.radius ?? 0}"
  fill="${fill}"
  stroke="${stroke}"
  stroke-width="${strokeWidth}"
/>`;
}
