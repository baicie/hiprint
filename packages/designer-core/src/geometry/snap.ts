import type { PrintElement } from "@hiprint-re/core";

export interface SnapLine {
  type: "vertical" | "horizontal";
  position: number;
  sourceElementId?: string;
}

export interface SnapResult {
  x: number;
  y: number;
  snapped: boolean;
  lines: SnapLine[];
}

export interface SnapInput {
  moving: PrintElement;
  others: PrintElement[];
  x: number;
  y: number;
  threshold?: number;
}

export function snapElement(input: SnapInput): SnapResult {
  const threshold = input.threshold ?? 3;
  const lines: SnapLine[] = [];

  const movingLeft = input.x;
  const movingRight = input.x + input.moving.width;
  const movingCenterX = input.x + input.moving.width / 2;
  const movingTop = input.y;
  const movingBottom = input.y + input.moving.height;
  const movingCenterY = input.y + input.moving.height / 2;

  let bestDx = Infinity;
  let bestDy = Infinity;

  for (const other of input.others) {
    if (other.id === input.moving.id) continue;

    const otherLeft = other.x;
    const otherRight = other.x + other.width;
    const otherCenterX = other.x + other.width / 2;
    const otherTop = other.y;
    const otherBottom = other.y + other.height;
    const otherCenterY = other.y + other.height / 2;

    const xDeltas = [
      { delta: otherLeft - movingLeft, position: otherLeft },
      { delta: otherRight - movingRight, position: otherRight },
      { delta: otherCenterX - movingCenterX, position: otherCenterX },
    ];

    for (const { delta } of xDeltas) {
      if (Math.abs(delta) < Math.abs(bestDx)) {
        bestDx = delta;
      }
    }

    const yDeltas = [
      { delta: otherTop - movingTop, position: otherTop },
      { delta: otherBottom - movingBottom, position: otherBottom },
      { delta: otherCenterY - movingCenterY, position: otherCenterY },
    ];

    for (const { delta } of yDeltas) {
      if (Math.abs(delta) < Math.abs(bestDy)) {
        bestDy = delta;
      }
    }
  }

  const dx = Math.abs(bestDx) <= threshold ? bestDx : 0;
  const dy = Math.abs(bestDy) <= threshold ? bestDy : 0;

  if (dx !== 0) {
    lines.push({ type: "vertical", position: input.x + dx });
  }

  if (dy !== 0) {
    lines.push({ type: "horizontal", position: input.y + dy });
  }

  return {
    x: input.x + dx,
    y: input.y + dy,
    snapped: dx !== 0 || dy !== 0,
    lines,
  };
}
