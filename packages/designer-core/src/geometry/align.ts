import type { PrintElement } from "@hiprint-re/core";

export type AlignType =
  | "left"
  | "center"
  | "right"
  | "top"
  | "middle"
  | "bottom";

function getBounds(elements: PrintElement[]) {
  const left = Math.min(...elements.map((element) => element.x));
  const top = Math.min(...elements.map((element) => element.y));
  const right = Math.max(
    ...elements.map((element) => element.x + element.width),
  );
  const bottom = Math.max(
    ...elements.map((element) => element.y + element.height),
  );

  return {
    left,
    top,
    right,
    bottom,
    width: right - left,
    height: bottom - top,
  };
}

export function alignElements(
  elements: PrintElement[],
  type: AlignType,
): PrintElement[] {
  if (elements.length <= 1) return elements;

  const bounds = getBounds(elements);

  return elements.map((element) => {
    switch (type) {
      case "left":
        return { ...element, x: bounds.left };

      case "center":
        return {
          ...element,
          x: bounds.left + bounds.width / 2 - element.width / 2,
        };

      case "right":
        return {
          ...element,
          x: bounds.right - element.width,
        };

      case "top":
        return { ...element, y: bounds.top };

      case "middle":
        return {
          ...element,
          y: bounds.top + bounds.height / 2 - element.height / 2,
        };

      case "bottom":
        return {
          ...element,
          y: bounds.bottom - element.height,
        };

      default:
        return element;
    }
  });
}
