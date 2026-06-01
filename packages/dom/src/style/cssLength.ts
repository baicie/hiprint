/**
 * Convert a numeric value to a CSS length string.
 */
export function cssLength(
  value: number,
  unit: "mm" | "px" | "pt" = "mm",
): string {
  if (!Number.isFinite(value)) return `0${unit}`;
  return `${round(value)}${unit}`;
}

/**
 * Convert a numeric value to a CSS number string (no unit).
 */
export function cssNumber(value: number): string {
  if (!Number.isFinite(value)) return "0";
  return String(round(value));
}

function round(value: number): number {
  return Number(value.toFixed(4));
}
