import type { LayoutDocument } from "@hiprint-re/core";
import { toPx } from "@hiprint-re/render-core";
import type { CanvasRenderOptions, CanvasRenderContext } from "./types";
import { drawCanvasElement } from "./renderers/drawCanvasElement";

export async function renderToCanvas(
  layout: LayoutDocument,
  options: CanvasRenderOptions = {},
): Promise<HTMLCanvasElement[]> {
  if (typeof document === "undefined") {
    throw new Error("[hiprint-re/canvas] document is not available.");
  }

  const resolved: Required<CanvasRenderOptions> = {
    scale: options.scale ?? 2,
    dpi: options.dpi ?? 96,
    background: options.background ?? "#ffffff",
    renderers: options.renderers ?? [],
  };

  const canvases: HTMLCanvasElement[] = [];

  for (const page of layout.pages) {
    const canvas = document.createElement("canvas");
    const canvasCtx = canvas.getContext("2d");

    if (!canvasCtx) {
      throw new Error("[hiprint-re/canvas] Failed to create canvas context.");
    }

    const widthPx = toPx(page.width, layout.unit, resolved.dpi);
    const heightPx = toPx(page.height, layout.unit, resolved.dpi);

    canvas.width = Math.ceil(widthPx * resolved.scale);
    canvas.height = Math.ceil(heightPx * resolved.scale);
    canvas.style.width = `${widthPx}px`;
    canvas.style.height = `${heightPx}px`;

    canvasCtx.scale(resolved.scale, resolved.scale);
    canvasCtx.fillStyle = resolved.background;
    canvasCtx.fillRect(0, 0, widthPx, heightPx);

    const renderCtx: CanvasRenderContext = {
      layout,
      canvas,
      ctx: canvasCtx,
      options: resolved,
    };

    for (const element of page.elements) {
      await drawCanvasElement(element, renderCtx);
    }

    canvases.push(canvas);
  }

  return canvases;
}
