import { describe, expect, it } from "vitest";
import {
  parseHexColor,
} from "../../packages/render-core/src/color";
import {
  toPx,
  toPt,
  round,
} from "../../packages/render-core/src/unit";

describe("render-core color", () => {
  it("should parse 6-digit hex color", () => {
    const result = parseHexColor("#ff5500");
    expect(result).toEqual({ r: 255, g: 85, b: 0 });
  });

  it("should parse 3-digit hex color", () => {
    const result = parseHexColor("#f50");
    expect(result).toEqual({ r: 255, g: 85, b: 0 });
  });

  it("should return undefined for non-string", () => {
    expect(parseHexColor(null)).toBeUndefined();
    expect(parseHexColor(undefined)).toBeUndefined();
    expect(parseHexColor(123)).toBeUndefined();
  });

  it("should return undefined for non-hex string", () => {
    expect(parseHexColor("red")).toBeUndefined();
    expect(parseHexColor("#gg0000")).toBeUndefined();
  });

  it("should parse black", () => {
    const result = parseHexColor("#000000");
    expect(result).toEqual({ r: 0, g: 0, b: 0 });
  });
});

describe("render-core unit", () => {
  it("should convert mm to px at 96dpi", () => {
    expect(toPx(25.4, "mm", 96)).toBeCloseTo(96, 4);
  });

  it("should pass through px", () => {
    expect(toPx(100, "px", 96)).toBe(100);
  });

  it("should convert mm to pt", () => {
    expect(toPt(25.4, "mm")).toBeCloseTo(72, 4);
  });

  it("should convert px to pt", () => {
    expect(toPt(100, "px")).toBe(75);
  });

  it("should round to 4 decimal places", () => {
    expect(round(1.23456789)).toBe(1.2346);
    expect(round(1.2345)).toBe(1.2345);
  });
});
