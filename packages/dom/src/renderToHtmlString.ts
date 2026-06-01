import type { LayoutDocument } from "@hiprint-re/core";
import type { DomRenderOptions } from "./types";
import { renderToDom } from "./renderToDom";

export function renderToHtmlString(
  layout: LayoutDocument,
  options: DomRenderOptions = {},
): string {
  const result = renderToDom(layout, options);

  try {
    return result.root.outerHTML;
  } finally {
    result.dispose();
  }
}
