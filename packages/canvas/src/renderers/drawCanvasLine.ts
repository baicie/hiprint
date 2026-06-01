import type { LayoutLineElement } from "@hiprint-re/core";
import type { CanvasRenderContext } from "../types";

export function drawCanvasLine(
  element: LayoutLineElement,
  renderCtx: CanvasRenderContext,
): void {
  const ctx = renderCtx.ctx;

  ctx.save();
  ctx.strokeStyle = String(element.style?.["borderColor"] ?? "#111827");
  ctx.lineWidth = Number(element.style?.["borderWidth"] ?? 1);

  ctx.beginPath();
  ctx.moveTo(element.x, element.y);

  if (element.direction === "vertical") {
    ctx.lineTo(element.x, element.y + element.height);
  } else {
    ctx.lineTo(element.x + element.width, element.y);
  }

  ctx.stroke();
  ctx.restore();
}
