import type { LayoutRectElement } from "@hiprint-re/core";
import type { CanvasRenderContext } from "../types";

export function drawCanvasRect(
  element: LayoutRectElement,
  renderCtx: CanvasRenderContext,
): void {
  const ctx = renderCtx.ctx;

  ctx.save();

  const fill = element.style?.["backgroundColor"];

  if (typeof fill === "string") {
    ctx.fillStyle = fill;
    ctx.fillRect(element.x, element.y, element.width, element.height);
  }

  ctx.strokeStyle = String(element.style?.["borderColor"] ?? "#111827");
  ctx.lineWidth = Number(element.style?.["borderWidth"] ?? 1);
  ctx.strokeRect(element.x, element.y, element.width, element.height);

  ctx.restore();
}
