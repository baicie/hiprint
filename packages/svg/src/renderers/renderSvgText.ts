import type { LayoutTextElement } from "@hiprint-re/core";
import type { SvgRenderContext } from "../types";
import { escapeXml } from "../utils/escapeXml";

export function renderSvgText(
  element: LayoutTextElement,
  _ctx: SvgRenderContext,
): string {
  const fontSize = Number(element.style?.["fontSize"] ?? element.fontSize ?? 12);
  const fill = String(element.style?.["color"] ?? "#111827");
  const lineHeight = element.lineHeight ?? fontSize * 1.2;

  const lines = element.lines?.length
    ? element.lines
    : [element.value];

  const tspans = lines
    .map((line, index) => {
      const dy = index === 0 ? 0 : lineHeight;
      return `<tspan x="${element.x}" dy="${dy}">${escapeXml(line)}</tspan>`;
    })
    .join("");

  return `<text
  x="${element.x}"
  y="${element.y + fontSize}"
  font-size="${fontSize}"
  fill="${fill}"
>${tspans}</text>`;
}
