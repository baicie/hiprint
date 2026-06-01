import type { LayoutDocument } from "@hiprint-re/core";
import type { SvgRenderOptions } from "./types";
import { renderToSvgString } from "./renderToSvgString";

export function renderToSvgElement(
  layout: LayoutDocument,
  options: SvgRenderOptions = {},
): SVGSVGElement[] {
  if (typeof document === "undefined") {
    throw new Error("[hiprint-re/svg] document is not available.");
  }

  const wrapper = document.createElement("div");
  wrapper.innerHTML = renderToSvgString(layout, options);

  return Array.from(wrapper.querySelectorAll("svg")) as SVGSVGElement[];
}
