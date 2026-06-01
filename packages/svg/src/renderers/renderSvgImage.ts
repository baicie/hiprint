import type { LayoutImageElement } from "@hiprint-re/core";
import type { SvgRenderContext } from "../types";
import { escapeXml } from "../utils/escapeXml";

export function renderSvgImage(
  element: LayoutImageElement,
  _ctx: SvgRenderContext,
): string {
  if (!element.src) return "";

  return `<image
  x="${element.x}"
  y="${element.y}"
  width="${element.width}"
  height="${element.height}"
  href="${escapeXml(element.src)}"
  preserveAspectRatio="xMidYMid meet"
/>`;
}
