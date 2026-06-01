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

interface SnapPoint {
  position: number;
  sourceElementId?: string;
  sourceGuideId?: string;
}

export function snapElement(input: SnapInput): SnapResult {
  const threshold = input.threshold ?? 3;

  let x = input.x;
  let y = input.y;

  const lines: SnapLine[] = [];

  const verticalTargets = collectVerticalTargets(input.others, input.guides);
  const horizontalTargets = collectHorizontalTargets(input.others, input.guides);

  const movingVerticalPoints = getVerticalPoints(input.moving, x);
  const movingHorizontalPoints = getHorizontalPoints(input.moving, y);

  for (const point of movingVerticalPoints) {
    const target = findNearestTarget(point.position, verticalTargets, threshold);

    if (target) {
      x += target.position - point.position;
      lines.push({
        id: `snap_v_${target.position}`,
        type: "vertical",
        position: target.position,
        sourceElementId: target.sourceElementId,
        sourceGuideId: target.sourceGuideId,
      });
      break;
    }
  }

  for (const point of movingHorizontalPoints) {
    const target = findNearestTarget(point.position, horizontalTargets, threshold);

    if (target) {
      y += target.position - point.position;
      lines.push({
        id: `snap_h_${target.position}`,
        type: "horizontal",
        position: target.position,
        sourceElementId: target.sourceElementId,
        sourceGuideId: target.sourceGuideId,
      });
      break;
    }
  }

  return {
    x,
    y,
    snapped: lines.length > 0,
    lines,
  };
}

function collectVerticalTargets(
  elements: PrintElement[],
  guides: DesignerGuide[] = [],
): SnapPoint[] {
  const targets: SnapPoint[] = [];

  for (const element of elements) {
    targets.push(
      { position: element.x, sourceElementId: element.id },
      { position: element.x + element.width / 2, sourceElementId: element.id },
      { position: element.x + element.width, sourceElementId: element.id },
    );
  }

  for (const guide of guides) {
    if (guide.type === "vertical") {
      targets.push({ position: guide.position, sourceGuideId: guide.id });
    }
  }

  return targets;
}

function collectHorizontalTargets(
  elements: PrintElement[],
  guides: DesignerGuide[] = [],
): SnapPoint[] {
  const targets: SnapPoint[] = [];

  for (const element of elements) {
    targets.push(
      { position: element.y, sourceElementId: element.id },
      { position: element.y + element.height / 2, sourceElementId: element.id },
      { position: element.y + element.height, sourceElementId: element.id },
    );
  }

  for (const guide of guides) {
    if (guide.type === "horizontal") {
      targets.push({ position: guide.position, sourceGuideId: guide.id });
    }
  }

  return targets;
}

function getVerticalPoints(element: PrintElement, x: number): SnapPoint[] {
  return [
    { position: x },
    { position: x + element.width / 2 },
    { position: x + element.width },
  ];
}

function getHorizontalPoints(element: PrintElement, y: number): SnapPoint[] {
  return [
    { position: y },
    { position: y + element.height / 2 },
    { position: y + element.height },
  ];
}

function findNearestTarget(
  position: number,
  targets: SnapPoint[],
  threshold: number,
): SnapPoint | undefined {
  let nearest: SnapPoint | undefined;
  let nearestDistance = Infinity;

  for (const target of targets) {
    const distance = Math.abs(position - target.position);

    if (distance <= threshold && distance < nearestDistance) {
      nearest = target;
      nearestDistance = distance;
    }
  }

  return nearest;
}
