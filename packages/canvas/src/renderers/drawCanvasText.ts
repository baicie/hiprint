import type { LayoutTextElement } from "@hiprint-re/core";
import type { CanvasRenderContext } from "../types";

export function drawCanvasText(
  element: LayoutTextElement,
  renderCtx: CanvasRenderContext,
): void {
  const ctx = renderCtx.ctx;
  const fontSize = Number(element.style?.["fontSize"] ?? element.fontSize ?? 12);
  const color = String(element.style?.["color"] ?? "#111827");
  const lineHeight = element.lineHeight ?? fontSize * 1.2;
  const fontFamily = String(element.style?.["fontFamily"] ?? "Arial");

  ctx.save();
  ctx.fillStyle = color;
  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.textBaseline = "top";

  const lines = element.lines?.length
    ? element.lines
    : [element.value];

  lines.forEach((line, index) => {
    ctx.fillText(line, element.x, element.y + index * lineHeight);
  });

  ctx.restore();
}
