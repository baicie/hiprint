import type { LayoutRect } from "./types";

export function isRectOverflow(rect: LayoutRect, bounds: LayoutRect): boolean {
  return (
    rect.x < bounds.x ||
    rect.y < bounds.y ||
    rect.x + rect.width > bounds.x + bounds.width ||
    rect.y + rect.height > bounds.y + bounds.height
  );
}

export function getPageIndexByY(y: number, pageHeight: number): number {
  if (y <= 0) return 0;
  return Math.floor(y / pageHeight);
}

export function normalizeYInPage(y: number, pageHeight: number): number {
  const pageIndex = getPageIndexByY(y, pageHeight);
  return y - pageIndex * pageHeight;
}

export function safeNumber(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}
