import type { LayoutElement } from "@hiprint-re/core";
import type { SvgRenderContext } from "../types";
import { renderSvgText } from "./renderSvgText";
import { renderSvgImage } from "./renderSvgImage";
import { renderSvgLine } from "./renderSvgLine";
import { renderSvgRect } from "./renderSvgRect";
import { renderSvgTable } from "./renderSvgTable";

export function renderSvgElement(
  element: LayoutElement,
  ctx: SvgRenderContext,
): string {
  switch (element.type) {
    case "text":
      return renderSvgText(element as never, ctx);

    case "image":
      return renderSvgImage(element as never, ctx);

    case "line":
      return renderSvgLine(element as never, ctx);

    case "rect":
      return renderSvgRect(element as never, ctx);

    case "table":
      return renderSvgTable(element as never, ctx);
  }

  const custom = ctx.options.renderers.find(
    (renderer) => renderer.type === element.type,
  );

  if (custom) {
    return custom.render(element, ctx);
  }

  return `<rect
  x="${element.x}"
  y="${element.y}"
  width="${element.width}"
  height="${element.height}"
  fill="none"
  stroke="#9ca3af"
  stroke-dasharray="2 2"
/>`;
}
