import type { LayoutElement, LayoutPage } from "@hiprint-re/core";
import type { DomRenderContext } from "../types";
import { createDomRendererRegistry } from "../plugin/domRendererRegistry";
import { renderText } from "./renderText";
import { renderImage } from "./renderImage";
import { renderLine } from "./renderLine";
import { renderRect } from "./renderRect";
import { renderTable } from "./renderTable";
import { renderUnknown } from "./renderUnknown";

export function renderElement(
  element: LayoutElement,
  page: LayoutPage,
  ctx: DomRenderContext,
): HTMLElement | null {
  switch (element.type) {
    case "text":
      return renderText(element as Parameters<typeof renderText>[0], page, ctx);

    case "image":
      return renderImage(
        element as Parameters<typeof renderImage>[0],
        page,
        ctx,
      );

    case "line":
      return renderLine(
        element as Parameters<typeof renderLine>[0],
        page,
        ctx,
      );

    case "rect":
      return renderRect(
        element as Parameters<typeof renderRect>[0],
        page,
        ctx,
      );

    case "table":
      return renderTable(
        element as Parameters<typeof renderTable>[0],
        page,
        ctx,
      );
  }

  const registry = createDomRendererRegistry(ctx.options.renderers);
  const pluginRenderer = registry.get(element.type);

  if (pluginRenderer) {
    return pluginRenderer.render(element, ctx);
  }

  return ctx.options.renderUnknown ? renderUnknown(
      element as Parameters<typeof renderUnknown>[0],
      page,
      ctx,
    ) : null;
}
