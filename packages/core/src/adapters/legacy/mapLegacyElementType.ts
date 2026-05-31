import type { PrintElementType } from "../../types/element";

const legacyTypeMap: Record<string, PrintElementType> = {
  text: "text",
  image: "image",
  table: "table",
  tableCustom: "table",
  line: "line",
  hline: "line",
  vline: "line",
  rect: "rect",
  rectangle: "rect",
  barcode: "barcode",
  qrcode: "qrcode",
  html: "html",
  customHtml: "html",
};

export function mapLegacyElementType(type: unknown): PrintElementType {
  if (typeof type !== "string") return "unknown";

  const trimmed = type.trim();

  if (legacyTypeMap[trimmed] !== undefined) {
    return legacyTypeMap[trimmed]!;
  }

  const normalized = trimmed.toLowerCase();

  return legacyTypeMap[normalized] ?? "unknown";
}

export function toLegacyElementType(type: PrintElementType): string {
  if (type === "unknown") return "unknown";
  return type;
}
