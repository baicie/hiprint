import { describe, expect, it } from "vitest";
import { snapElement } from "../../packages/designer-core/src";

describe("snapElement", () => {
  it("should snap moving element left edge to other element left edge", () => {
    const result = snapElement({
      moving: { id: "a", type: "rect" as const, x: 7, y: 0, width: 20, height: 10 },
      others: [{ id: "b", type: "rect" as const, x: 10, y: 0, width: 20, height: 10 }],
      x: 7,
      y: 0,
      threshold: 5,
    });

    // moving left at 7, target left at 10, delta=3, snaps to 10
    expect(result.snapped).toBe(true);
    expect(result.x).toBe(10);
    expect(result.lines).toHaveLength(1);
    expect(result.lines[0]!.type).toBe("vertical");
    expect(result.lines[0]!.position).toBe(10);
  });

  it("should not snap when distance exceeds threshold", () => {
    const result = snapElement({
      moving: { id: "a", type: "rect" as const, x: 20, y: 0, width: 20, height: 10 },
      others: [{ id: "b", type: "rect" as const, x: 10, y: 0, width: 20, height: 10 }],
      x: 20,
      y: 0,
      threshold: 5,
    });

    expect(result.snapped).toBe(false);
    expect(result.x).toBe(20);
    expect(result.lines).toHaveLength(0);
  });

  it("should snap to center when within threshold", () => {
    // a at x=0, width=20 → center=10
    // b at x=10, width=20 → center=20
    // left-left: |0-10|=10 < 15 ✓
    // center-center: |10-20|=10 < 15 ✓
    // best delta = 10 (left-left first), x = 0 + 10 = 10
    const result = snapElement({
      moving: { id: "a", type: "rect" as const, x: 0, y: 0, width: 20, height: 10 },
      others: [{ id: "b", type: "rect" as const, x: 10, y: 0, width: 20, height: 10 }],
      x: 0,
      y: 0,
      threshold: 15,
    });

    expect(result.snapped).toBe(true);
    expect(result.x).toBe(10);
    expect(result.lines[0]!.type).toBe("vertical");
  });

  it("should snap top edge to other element top edge", () => {
    const result = snapElement({
      moving: { id: "a", type: "rect" as const, x: 0, y: 7, width: 10, height: 20 },
      others: [{ id: "b", type: "rect" as const, x: 0, y: 10, width: 10, height: 20 }],
      x: 0,
      y: 7,
      threshold: 5,
    });

    expect(result.snapped).toBe(true);
    expect(result.y).toBe(10);
    expect(result.lines[0]!.type).toBe("horizontal");
  });

  it("should ignore self in others list", () => {
    const result = snapElement({
      moving: { id: "a", type: "rect" as const, x: 0, y: 0, width: 20, height: 10 },
      others: [{ id: "a", type: "rect" as const, x: 10, y: 0, width: 20, height: 10 }],
      x: 0,
      y: 0,
      threshold: 10,
    });

    expect(result.snapped).toBe(false);
    expect(result.x).toBe(0);
  });

  it("should not mutate moving element", () => {
    const moving = { id: "a", type: "rect" as const, x: 7, y: 0, width: 20, height: 10 };
    snapElement({
      moving,
      others: [{ id: "b", type: "rect" as const, x: 10, y: 0, width: 20, height: 10 }],
      x: 7,
      y: 0,
      threshold: 5,
    });

    expect(moving.x).toBe(7);
  });

  it("should use default threshold of 3", () => {
    const result = snapElement({
      moving: { id: "a", type: "rect" as const, x: 7, y: 0, width: 20, height: 10 },
      others: [{ id: "b", type: "rect" as const, x: 10, y: 0, width: 20, height: 10 }],
      x: 7,
      y: 0,
    });

    // diff = |7 - 10| = 3, default threshold = 3, snaps
    expect(result.snapped).toBe(true);
    expect(result.x).toBe(10);
  });

  it("should snap both x and y independently", () => {
    const result = snapElement({
      moving: { id: "a", type: "rect" as const, x: 7, y: 7, width: 20, height: 10 },
      others: [{ id: "b", type: "rect" as const, x: 10, y: 10, width: 20, height: 10 }],
      x: 7,
      y: 7,
      threshold: 5,
    });

    expect(result.snapped).toBe(true);
    expect(result.x).toBe(10);
    expect(result.y).toBe(10);
    expect(result.lines).toHaveLength(2);
    expect(result.lines.some((l) => l.type === "vertical")).toBe(true);
    expect(result.lines.some((l) => l.type === "horizontal")).toBe(true);
  });

  it("should snap moving right edge to other element right edge", () => {
    // a at x=0, width=20, right edge at 20
    // b at x=30, width=20, right edge at 50
    // a right - b right = 20 - 50 = -30, diff = 30 > 5, no snap
    const result = snapElement({
      moving: { id: "a", type: "rect" as const, x: 0, y: 0, width: 20, height: 10 },
      others: [{ id: "b", type: "rect" as const, x: 30, y: 0, width: 20, height: 10 }],
      x: 0,
      y: 0,
      threshold: 5,
    });

    expect(result.snapped).toBe(false);
    expect(result.x).toBe(0);
  });
});
