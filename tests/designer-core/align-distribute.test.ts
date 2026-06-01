import { describe, expect, it } from "vitest";
import {
  alignElements,
  distributeElements,
} from "../../packages/designer-core/src";

describe("align", () => {
  it("should align elements to left", () => {
    const elements = [
      { id: "a", type: "rect" as const, x: 50, y: 0, width: 20, height: 20 },
      { id: "b", type: "rect" as const, x: 80, y: 0, width: 10, height: 10 },
    ];

    const aligned = alignElements(elements, "left");

    expect(aligned[0]!.x).toBe(50);
    expect(aligned[1]!.x).toBe(50);
  });

  it("should align elements to right", () => {
    const elements = [
      { id: "a", type: "rect" as const, x: 50, y: 0, width: 20, height: 20 },
      { id: "b", type: "rect" as const, x: 50, y: 0, width: 10, height: 10 },
    ];

    const aligned = alignElements(elements, "right");

    expect(aligned[0]!.x).toBe(50);
    expect(aligned[1]!.x).toBe(60);
  });

  it("should align elements to top", () => {
    const elements = [
      { id: "a", type: "rect" as const, x: 0, y: 50, width: 20, height: 20 },
      { id: "b", type: "rect" as const, x: 0, y: 80, width: 10, height: 10 },
    ];

    const aligned = alignElements(elements, "top");

    expect(aligned[0]!.y).toBe(50);
    expect(aligned[1]!.y).toBe(50);
  });

  it("should align elements to bottom", () => {
    const elements = [
      { id: "a", type: "rect" as const, x: 0, y: 50, width: 20, height: 20 },
      { id: "b", type: "rect" as const, x: 0, y: 50, width: 10, height: 10 },
    ];

    const aligned = alignElements(elements, "bottom");

    expect(aligned[0]!.y).toBe(50);
    expect(aligned[1]!.y).toBe(60);
  });

  it("should not align single element", () => {
    const elements = [
      { id: "a", type: "rect" as const, x: 50, y: 50, width: 20, height: 20 },
    ];

    const aligned = alignElements(elements, "left");

    expect(aligned).toHaveLength(1);
    expect(aligned[0]!.x).toBe(50);
  });

  it("should align to center horizontally", () => {
    const elements = [
      { id: "a", type: "rect" as const, x: 0, y: 0, width: 20, height: 10 },
      { id: "b", type: "rect" as const, x: 80, y: 0, width: 40, height: 10 },
    ];

    const aligned = alignElements(elements, "center");

    const bounds = { left: 0, width: 120, right: 120 };
    // element a: center = 0 + 120/2 - 20/2 = 50
    expect(aligned[0]!.x).toBe(50);
    // element b: center = 0 + 120/2 - 40/2 = 40
    expect(aligned[1]!.x).toBe(40);
  });

  it("should align to middle vertically", () => {
    const elements = [
      { id: "a", type: "rect" as const, x: 0, y: 0, width: 10, height: 20 },
      { id: "b", type: "rect" as const, x: 0, y: 80, width: 10, height: 40 },
    ];

    const aligned = alignElements(elements, "middle");

    // bounds: top=0, height=120, bottom=120
    // element a: middle = 0 + 120/2 - 20/2 = 50
    expect(aligned[0]!.y).toBe(50);
    // element b: middle = 0 + 120/2 - 40/2 = 40
    expect(aligned[1]!.y).toBe(40);
  });

  it("should not mutate original elements", () => {
    const elements = [
      { id: "a", type: "rect" as const, x: 50, y: 0, width: 20, height: 20 },
      { id: "b", type: "rect" as const, x: 80, y: 0, width: 10, height: 10 },
    ];

    alignElements(elements, "left");

    expect(elements[0]!.x).toBe(50);
    expect(elements[1]!.x).toBe(80);
  });
});

describe("distribute", () => {
  it("should distribute elements horizontally with equal spacing", () => {
    const elements = [
      { id: "a", type: "rect" as const, x: 0, y: 0, width: 10, height: 10 },
      { id: "b", type: "rect" as const, x: 50, y: 0, width: 10, height: 10 },
      { id: "c", type: "rect" as const, x: 100, y: 0, width: 10, height: 10 },
    ];

    const distributed = distributeElements(elements, "horizontal");

    // first and last stay fixed; b moves between them
    // space = (100+10 - 0 - 30) / 2 = 40
    // b.x = a.x + a.width + space = 0 + 10 + 40 = 50
    expect(distributed[0]!.x).toBe(0);
    expect(distributed[2]!.x).toBe(100);
    expect(distributed[1]!.x).toBe(50);
    expect(distributed[1]!.id).toBe("b");
  });

  it("should distribute elements vertically with equal spacing", () => {
    const elements = [
      { id: "a", type: "rect" as const, x: 0, y: 0, width: 10, height: 10 },
      { id: "b", type: "rect" as const, x: 0, y: 50, width: 10, height: 10 },
      { id: "c", type: "rect" as const, x: 0, y: 100, width: 10, height: 10 },
    ];

    const distributed = distributeElements(elements, "vertical");

    // space = (100+10 - 0 - 30) / 2 = 40
    expect(distributed[0]!.y).toBe(0);
    expect(distributed[2]!.y).toBe(100);
    expect(distributed[1]!.y).toBe(50);
  });

  it("should not distribute fewer than 3 elements", () => {
    const elements = [
      { id: "a", type: "rect" as const, x: 0, y: 0, width: 10, height: 10 },
      { id: "b", type: "rect" as const, x: 50, y: 0, width: 10, height: 10 },
    ];

    const distributed = distributeElements(elements, "horizontal");

    expect(distributed).toHaveLength(2);
    expect(distributed[0]!.x).toBe(0);
    expect(distributed[1]!.x).toBe(50);
  });

  it("should not mutate original elements", () => {
    const elements = [
      { id: "a", type: "rect" as const, x: 0, y: 0, width: 10, height: 10 },
      { id: "b", type: "rect" as const, x: 50, y: 0, width: 10, height: 10 },
      { id: "c", type: "rect" as const, x: 100, y: 0, width: 10, height: 10 },
    ];

    distributeElements(elements, "horizontal");

    expect(elements[1]!.x).toBe(50);
  });
});
