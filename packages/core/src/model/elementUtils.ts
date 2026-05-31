import type { PrintElement } from "../types/element";

export function findElementById(
  elements: PrintElement[],
  id: string,
): PrintElement | undefined {
  return elements.find((element) => element.id === id);
}

export function updateElementById(
  elements: PrintElement[],
  id: string,
  updater: (element: PrintElement) => PrintElement,
): PrintElement[] {
  return elements.map((element) => {
    if (element.id !== id) return element;
    return updater(element);
  });
}

export function removeElementById(
  elements: PrintElement[],
  id: string,
): PrintElement[] {
  return elements.filter((element) => element.id !== id);
}
