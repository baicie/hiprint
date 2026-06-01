import type { LayoutElement } from "@hiprint-re/core";
import type { CanvasRenderContext } from "../types";
import { drawCanvasText } from "./drawCanvasText";
import { drawCanvasImage } from "./drawCanvasImage";
import { drawCanvasLine } from "./drawCanvasLine";
import { drawCanvasRect } from "./drawCanvasRect";
import { drawCanvasTable } from "./drawCanvasTable";

export async function drawCanvasElement(
  element: LayoutElement,
  ctx: CanvasRenderContext,
): Promise<void> {
  switch (element.type) {
    case "text":
      drawCanvasText(element as never, ctx);
      return;

    case "image":
      await drawCanvasImage(element as never, ctx);
      return;

    case "line":
      drawCanvasLine(element as never, ctx);
      return;

    case "rect":
      drawCanvasRect(element as never, ctx);
      return;

    case "table":
      drawCanvasTable(element as never, ctx);
      return;
  }

  const custom = ctx.options.renderers.find(
    (renderer) => renderer.type === element.type,
  );

  if (custom) {
    await custom.draw(element, ctx);
  } else {
    ctx.ctx.save();
    ctx.ctx.strokeStyle = "#9ca3af";
    ctx.ctx.setLineDash([4, 4]);
    ctx.ctx.strokeRect(element.x, element.y, element.width, element.height);
    ctx.ctx.restore();
  }
}
