import { describe, expect, it } from "vitest";
import {
  getElementRect,
  getElementsBounds,
} from "../../packages/designer-core/src";

describe("getElementRect", () => {
  it("should return element rect", () => {
    const element = {
      id: "a",
      type: "rect" as const,
      x: 10,
      y: 20,
      width: 80,
      height: 30,
    };

    const rect = getElementRect(element);

    expect(rect.x).toBe(10);
    expect(rect.y).toBe(20);
    expect(rect.width).toBe(80);
    expect(rect.height).toBe(30);
  });
});

describe("getElementsBounds", () => {
  it("should return union bounds of all elements", () => {
    const elements = [
      { id: "a", type: "rect" as const, x: 10, y: 10, width: 30, height: 20 },
      { id: "b", type: "rect" as const, x: 50, y: 30, width: 20, height: 10 },
    ];

    const bounds = getElementsBounds(elements);

    expect(bounds!.x).toBe(10);
    expect(bounds!.y).toBe(10);
    expect(bounds!.width).toBe(60);
    expect(bounds!.height).toBe(30);
  });

  it("should return bounds for single element", () => {
    const elements = [
      { id: "a", type: "rect" as const, x: 10, y: 10, width: 30, height: 20 },
    ];

    const bounds = getElementsBounds(elements);

    expect(bounds!.x).toBe(10);
    expect(bounds!.y).toBe(10);
    expect(bounds!.width).toBe(30);
    expect(bounds!.height).toBe(20);
  });

  it("should return undefined for empty array", () => {
    const bounds = getElementsBounds([]);

    expect(bounds).toBeUndefined();
  });

  it("should handle overlapping elements", () => {
    const elements = [
      { id: "a", type: "rect" as const, x: 0, y: 0, width: 50, height: 50 },
      { id: "b", type: "rect" as const, x: 25, y: 25, width: 50, height: 50 },
    ];

    const bounds = getElementsBounds(elements);

    expect(bounds!.x).toBe(0);
    expect(bounds!.y).toBe(0);
    expect(bounds!.width).toBe(75);
    expect(bounds!.height).toBe(75);
  });
});
