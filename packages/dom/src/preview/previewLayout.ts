import type { LayoutDocument } from "@hiprint-re/core";
import type { DomRenderOptions, MountLayoutResult } from "../types";
import { createPreviewRoot } from "./createPreviewRoot";
import { mountLayout } from "../mountLayout";

export function previewLayout(
  layout: LayoutDocument,
  container: HTMLElement,
  options: DomRenderOptions = {},
): MountLayoutResult {
  const root = createPreviewRoot(container);

  return mountLayout(layout, root, {
    pageGap: 24,
    ...options,
  });
}
