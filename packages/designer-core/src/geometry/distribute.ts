import type { PrintElement } from "@hiprint-re/core";

export type DistributeType = "horizontal" | "vertical";

export function distributeElements(
  elements: PrintElement[],
  type: DistributeType,
): PrintElement[] {
  if (elements.length <= 2) return elements;

  if (type === "horizontal") {
    return distributeHorizontal(elements);
  }

  return distributeVertical(elements);
}

function distributeHorizontal(elements: PrintElement[]): PrintElement[] {
  const sorted = [...elements].sort((a, b) => a.x - b.x);
  const first = sorted[0]!;
  const last = sorted[sorted.length - 1]!;

  const totalWidth = sorted.reduce((sum, item) => sum + item.width, 0);
  const space =
    (last.x + last.width - first.x - totalWidth) / (sorted.length - 1);

  let currentX = first.x;

  return sorted.map((element, index) => {
    if (index === 0 || index === sorted.length - 1) {
      currentX = element.x + element.width + space;
      return element;
    }

    const next = {
      ...element,
      x: currentX,
    };

    currentX += element.width + space;

    return next;
  });
}

function distributeVertical(elements: PrintElement[]): PrintElement[] {
  const sorted = [...elements].sort((a, b) => a.y - b.y);
  const first = sorted[0]!;
  const last = sorted[sorted.length - 1]!;

  const totalHeight = sorted.reduce((sum, item) => sum + item.height, 0);
  const space =
    (last.y + last.height - first.y - totalHeight) / (sorted.length - 1);

  let currentY = first.y;

  return sorted.map((element, index) => {
    if (index === 0 || index === sorted.length - 1) {
      currentY = element.y + element.height + space;
      return element;
    }

    const next = {
      ...element,
      y: currentY,
    };

    currentY += element.height + space;

    return next;
  });
}
