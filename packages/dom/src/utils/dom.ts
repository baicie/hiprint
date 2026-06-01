/**
 * Returns the global document or throws if unavailable.
 */
export function getDefaultDocument(): Document {
  if (typeof document === "undefined") {
    throw new Error("[hiprint-re/dom] document is not available.");
  }
  return document;
}

/**
 * Removes all child nodes from an element.
 */
export function clearElement(element: HTMLElement): void {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
