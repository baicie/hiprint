import type { ImageElement } from "../types/element";
import type { LayoutImageElement } from "./types";
import type { LayoutElementInput } from "./layoutElement";
import { resolveBindingValue } from "./resolveBinding";
import { normalizeYInPage } from "./utils";

export function layoutImage(input: LayoutElementInput): LayoutImageElement {
  const { panel, element, pageIndex, pageHeight, ctx } = input;
  const imageElement = element as ImageElement;

  const srcFromBinding = imageElement.binding?.field
    ? resolveBindingValue(imageElement.binding, ctx.data)
    : undefined;

  return {
    id: imageElement.id,
    sourcePanelId: panel.id,
    sourceElementId: imageElement.id,
    pageIndex,
    type: "image",
    x: imageElement.x,
    y: normalizeYInPage(imageElement.y, pageHeight),
    width: imageElement.width,
    height: imageElement.height,
    src: srcFromBinding || (imageElement.options?.src as string | undefined),
    objectFit:
      (imageElement.options?.objectFit as "contain" | "cover" | "fill") ??
      "contain",
    hidden: imageElement.hidden,
    style: imageElement.style,
    raw: imageElement.raw,
  };
}
