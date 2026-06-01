import type { PrintElement } from "@hiprint-re/core";

export interface DesignerRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function getElementRect(element: PrintElement): DesignerRect {
  return {
    x: element.x,
    y: element.y,
    width: element.width,
    height: element.height,
  };
}

export function getElementsBounds(
  elements: PrintElement[],
): DesignerRect | undefined {
  if (elements.length === 0) return undefined;

  const left = Math.min(...elements.map((element) => element.x));
  const top = Math.min(...elements.map((element) => element.y));
  const right = Math.max(
    ...elements.map((element) => element.x + element.width),
  );
  const bottom = Math.max(
    ...elements.map((element) => element.y + element.height),
  );

  return {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
  };
}
