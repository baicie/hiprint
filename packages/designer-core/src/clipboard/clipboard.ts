import type { PrintElement } from "@hiprint-re/core";
import { cloneDeep } from "../utils/clone";

export function copyElements(elements: PrintElement[]): PrintElement[] {
  return cloneDeep(elements);
}

export function offsetPastedElements(
  elements: PrintElement[],
  offset = 6,
): PrintElement[] {
  return elements.map((element) => ({
    ...cloneDeep(element),
    id: createPastedId(element.id),
    x: element.x + offset,
    y: element.y + offset,
  }));
}

function createPastedId(id: string): string {
  return `${id}_copy_${Math.random().toString(36).slice(2, 8)}`;
}
