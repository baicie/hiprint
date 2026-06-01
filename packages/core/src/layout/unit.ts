import type { Unit } from "../types/common";

export interface UnitContext {
  from: Unit;
  to: Unit;
  dpi: number;
}

export function convertUnit(value: number, ctx: UnitContext): number {
  if (ctx.from === ctx.to) return value;

  if (ctx.from === "mm" && ctx.to === "px") {
    return mmToPx(value, ctx.dpi);
  }

  if (ctx.from === "px" && ctx.to === "mm") {
    return pxToMm(value, ctx.dpi);
  }

  return value;
}

export function mmToPx(mm: number, dpi = 96): number {
  return (mm / 25.4) * dpi;
}

export function pxToMm(px: number, dpi = 96): number {
  return (px / dpi) * 25.4;
}

export function roundLayoutValue(value: number): number {
  return Number(value.toFixed(4));
}
