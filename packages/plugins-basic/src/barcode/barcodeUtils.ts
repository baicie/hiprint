import type { LayoutElement } from "@hiprint-re/core";
import { cssLength } from "@hiprint-re/dom";
import { encodePseudoCode128, type BarcodeBar } from "./encodeCode128";

export function createBarcodeSvg(
  doc: Document,
  value: string,
  width: number,
  height: number,
): SVGSVGElement {
  const svg = doc.createElementNS("http://www.w3.org/2000/svg", "svg");

  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

  const bars = encodePseudoCode128(value);
  const totalWidth = Math.max(...bars.map((bar) => bar.x + bar.width), 1);
  const scale = width / totalWidth;

  for (const bar of bars) {
    const rect = doc.createElementNS("http://www.w3.org/2000/svg", "rect");

    rect.setAttribute("x", String(bar.x * scale));
    rect.setAttribute("y", "0");
    rect.setAttribute("width", String(Math.max(bar.width * scale, 0.1)));
    rect.setAttribute("height", String(height * 0.78));
    rect.setAttribute("fill", "#000");

    svg.appendChild(rect);
  }

  const text = doc.createElementNS("http://www.w3.org/2000/svg", "text");

  text.textContent = value;
  text.setAttribute("x", String(width / 2));
  text.setAttribute("y", String(height - 1));
  text.setAttribute("font-size", "3");
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("fill", "#000");

  svg.appendChild(text);

  return svg;
}
