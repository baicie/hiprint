import type { PrintElement } from "@hiprint-re/core";

export interface HitTestInput {
  elements: PrintElement[];
  x: number;
  y: number;
}

export function hitTestElement(input: HitTestInput): PrintElement | undefined {
  /**
   * Search from back to front; later elements are considered to be on top.
   */
  for (let i = input.elements.length - 1; i >= 0; i--) {
    const element = input.elements[i]!;

    if (isPointInElement(input.x, input.y, element)) {
      return element;
    }
  }

  return undefined;
}

export function isPointInElement(
  x: number,
  y: number,
  element: PrintElement,
): boolean {
  return (
    x >= element.x &&
    y >= element.y &&
    x <= element.x + element.width &&
    y <= element.y + element.height
  );
}
