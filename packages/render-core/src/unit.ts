import type { Unit } from "@hiprint-re/core";

export function toPx(value: number, unit: Unit, dpi = 96): number {
  if (unit === "px") return value;
  return (value / 25.4) * dpi;
}

export function toPt(value: number, unit: Unit): number {
  if (unit === "px") {
    return value * 0.75;
  }

  return (value / 25.4) * 72;
}

export function round(value: number): number {
  return Number(value.toFixed(4));
}
