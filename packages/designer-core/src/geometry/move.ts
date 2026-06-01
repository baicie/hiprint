import type { PrintElement } from "@hiprint-re/core";

export interface MoveDelta {
  dx: number;
  dy: number;
}

export function moveElement(
  element: PrintElement,
  delta: MoveDelta,
): PrintElement {
  return {
    ...element,
    x: element.x + delta.dx,
    y: element.y + delta.dy,
  };
}
