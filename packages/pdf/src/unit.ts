import type { Unit } from "@hiprint-re/core";

export function toPdfPt(value: number, unit: Unit): number {
  if (unit === "px") return value * 0.75;
  return (value / 25.4) * 72;
}

export function yToPdf(
  y: number,
  pageHeightMm: number,
  unit: Unit,
): number {
  return toPdfPt(pageHeightMm - y, unit);
}
