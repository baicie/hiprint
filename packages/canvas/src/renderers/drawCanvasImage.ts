import type { LayoutImageElement } from "@hiprint-re/core";
import type { CanvasRenderContext } from "../types";

export async function drawCanvasImage(
  element: LayoutImageElement,
  renderCtx: CanvasRenderContext,
): Promise<void> {
  if (!element.src) return;

  const image = await loadImage(element.src);

  renderCtx.ctx.drawImage(
    image,
    element.x,
    element.y,
    element.width,
    element.height,
  );
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () =>
      reject(new Error(`[hiprint-re/canvas] Failed to load image: ${src}`));
    image.src = src;
  });
}
