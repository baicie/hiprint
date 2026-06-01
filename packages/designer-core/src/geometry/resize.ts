import type { PrintElement } from "@hiprint-re/core";
import type { ResizeHandle } from "../types";

export interface ResizeInput {
  element: PrintElement;
  handle: ResizeHandle;
  dx: number;
  dy: number;
  minWidth?: number;
  minHeight?: number;
}

export function resizeElement(input: ResizeInput): PrintElement {
  const minWidth = input.minWidth ?? 1;
  const minHeight = input.minHeight ?? 1;

  let { x, y, width, height } = input.element;

  if (input.handle.includes("e")) {
    width += input.dx;
  }

  if (input.handle.includes("s")) {
    height += input.dy;
  }

  if (input.handle.includes("w")) {
    x += input.dx;
    width -= input.dx;
  }

  if (input.handle.includes("n")) {
    y += input.dy;
    height -= input.dy;
  }

  if (width < minWidth) {
    if (input.handle.includes("w")) {
      x -= minWidth - width;
    }

    width = minWidth;
  }

  if (height < minHeight) {
    if (input.handle.includes("n")) {
      y -= minHeight - height;
    }

    height = minHeight;
  }

  return {
    ...input.element,
    x,
    y,
    width,
    height,
  };
}
