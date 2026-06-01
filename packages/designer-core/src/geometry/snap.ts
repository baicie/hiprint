import type { PrintElement } from "@hiprint-re/core";
import type { DesignerGuide } from "../types";

export interface SnapLine {
  id: string;
  type: "vertical" | "horizontal";
  position: number;
  sourceElementId?: string;
  sourceGuideId?: string;
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
  guides?: DesignerGuide[];
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
  let bestDxPosition = 0;
  let bestDyPosition = 0;
  let bestDxSourceId: string | undefined;
  let bestDySourceId: string | undefined;
  let bestDxGuideId: string | undefined;
  let bestDyGuideId: string | undefined;

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

    for (const { delta, position } of xDeltas) {
      if (Math.abs(delta) < Math.abs(bestDx)) {
        bestDx = delta;
        bestDxPosition = position;
        bestDxSourceId = other.id;
      }
    }

    const yDeltas = [
      { delta: otherTop - movingTop, position: otherTop },
      { delta: otherBottom - movingBottom, position: otherBottom },
      { delta: otherCenterY - movingCenterY, position: otherCenterY },
    ];

    for (const { delta, position } of yDeltas) {
      if (Math.abs(delta) < Math.abs(bestDy)) {
        bestDy = delta;
        bestDyPosition = position;
        bestDySourceId = other.id;
      }
    }
  }

  if (input.guides) {
    for (const guide of input.guides) {
      if (guide.type === "vertical") {
        const deltas = [
          { delta: guide.position - movingLeft, position: guide.position },
          { delta: guide.position - movingRight, position: guide.position },
          { delta: guide.position - movingCenterX, position: guide.position },
        ];
        for (const { delta, position } of deltas) {
          if (Math.abs(delta) < Math.abs(bestDx)) {
            bestDx = delta;
            bestDxPosition = position;
            bestDxGuideId = guide.id;
          }
        }
      } else {
        const deltas = [
          { delta: guide.position - movingTop, position: guide.position },
          { delta: guide.position - movingBottom, position: guide.position },
          { delta: guide.position - movingCenterY, position: guide.position },
        ];
        for (const { delta, position } of deltas) {
          if (Math.abs(delta) < Math.abs(bestDy)) {
            bestDy = delta;
            bestDyPosition = position;
            bestDyGuideId = guide.id;
          }
        }
      }
    }
  }

  const dx = Math.abs(bestDx) <= threshold ? bestDx : 0;
  const dy = Math.abs(bestDy) <= threshold ? bestDy : 0;

  if (dx !== 0) {
    lines.push({
      id: `snap_v_${bestDxPosition}`,
      type: "vertical",
      position: input.x + dx,
      sourceElementId: bestDxSourceId,
      sourceGuideId: bestDxGuideId,
    });
  }

  if (dy !== 0) {
    lines.push({
      id: `snap_h_${bestDyPosition}`,
      type: "horizontal",
      position: input.y + dy,
      sourceElementId: bestDySourceId,
      sourceGuideId: bestDyGuideId,
    });
  }

  return {
    x: input.x + dx,
    y: input.y + dy,
    snapped: dx !== 0 || dy !== 0,
    lines,
  };
}
