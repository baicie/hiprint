import type { PrintElement, PrintElementType } from "../types/element";

const VALID_TYPES: PrintElementType[] = [
  "text",
  "image",
  "line",
  "rect",
  "table",
  "html",
  "barcode",
  "qrcode",
  "unknown",
];

export function isKnownElementType(type: unknown): type is PrintElementType {
  return typeof type === "string" && VALID_TYPES.includes(type as PrintElementType);
}

export function isPrintElement(value: unknown): value is PrintElement {
  return (
    isObject(value) &&
    typeof value.id === "string" &&
    isKnownElementType((value as { type?: unknown }).type)
  );
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
