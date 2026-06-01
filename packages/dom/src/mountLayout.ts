import type { LayoutDocument } from "@hiprint-re/core";
import type { DomRenderOptions, MountLayoutResult } from "./types";
import { clearElement } from "./utils/dom";
import { renderToDom } from "./renderToDom";

export function mountLayout(
  layout: LayoutDocument,
  container: HTMLElement,
  options: DomRenderOptions = {},
): MountLayoutResult {
  clearElement(container);

  const result = renderToDom(layout, {
    ...options,
    document: options.document ?? container.ownerDocument,
  });

  container.appendChild(result.root);

  return {
    ...result,
    container,
    dispose() {
      result.root.remove();
    },
  };
}
