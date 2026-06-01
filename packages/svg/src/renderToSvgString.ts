import type { LayoutDocument } from "@hiprint-re/core";
import type { SvgRenderOptions, SvgRenderContext } from "./types";
import { renderSvgElement } from "./renderers/renderSvgElement";

export function renderToSvgString(
  layout: LayoutDocument,
  options: SvgRenderOptions = {},
): string {
  const resolved: Required<SvgRenderOptions> = {
    scale: options.scale ?? 1,
    background: options.background ?? "#ffffff",
    classNamePrefix: options.classNamePrefix ?? "hiprint-svg",
    renderers: options.renderers ?? [],
  };

  const pageSvgs = layout.pages.map((page) => {
    const ctx: SvgRenderContext = {
      layout,
      pageIndex: page.index,
      options: resolved,
    };

    const elements = page.elements
      .map((element) => renderSvgElement(element, ctx))
      .join("\n");

    return `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="${page.width}${layout.unit}"
  height="${page.height}${layout.unit}"
  viewBox="0 0 ${page.width} ${page.height}"
  data-page-index="${page.index}"
>
  <rect x="0" y="0" width="${page.width}" height="${page.height}" fill="${resolved.background}" />
  ${elements}
</svg>`;
  });

  return pageSvgs.join("\n");
}
