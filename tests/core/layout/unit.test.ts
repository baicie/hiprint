import { describe, expect, it } from "vitest";
import { mmToPx, pxToMm } from "../../../packages/core/src";

describe("unit conversion", () => {
  it("should convert mm to px", () => {
    expect(Number(mmToPx(25.4, 96).toFixed(2))).toBe(96);
  });

  it("should convert px to mm", () => {
    expect(Number(pxToMm(96, 96).toFixed(2))).toBe(25.4);
  });

  it("should convert mm to px at 72 dpi", () => {
    expect(Number(mmToPx(25.4, 72).toFixed(2))).toBe(72);
  });

  it("should convert 210mm (A4 width) to px at 96 dpi", () => {
    const result = mmToPx(210, 96);
    expect(Number(result.toFixed(1))).toBe(793.7);
  });
});
