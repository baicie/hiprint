export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export function parseHexColor(value: unknown): RgbColor | undefined {
  if (typeof value !== "string") return undefined;

  const input = value.trim();

  if (!input.startsWith("#")) return undefined;

  const hex = input.slice(1);

  if (hex.length === 3) {
    if (!/^[0-9a-fA-F]{3}$/.test(hex)) return undefined;
    return {
      r: parseInt(hex[0]! + hex[0]!, 16),
      g: parseInt(hex[1]! + hex[1]!, 16),
      b: parseInt(hex[2]! + hex[2]!, 16),
    };
  }

  if (hex.length === 6) {
    if (!/^[0-9a-fA-F]{6}$/.test(hex)) return undefined;
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
  }

  return undefined;
}
