import { describe, expect, it } from "vitest";
import { hitTestElement } from "../../packages/designer-core/src";

describe("hitTestElement", () => {
  it("should hit top element", () => {
    const hit = hitTestElement({
      x: 15,
      y: 15,
      elements: [
        {
          id: "a",
          type: "rect",
          x: 0,
          y: 0,
          width: 20,
          height: 20,
        },
        {
          id: "b",
          type: "rect",
          x: 10,
          y: 10,
          width: 20,
          height: 20,
        },
      ],
    });

    expect(hit?.id).toBe("b");
  });

  it("should return undefined for point outside elements", () => {
    const hit = hitTestElement({
      x: 100,
      y: 100,
      elements: [
        {
          id: "a",
          type: "rect",
          x: 0,
          y: 0,
          width: 20,
          height: 20,
        },
      ],
    });

    expect(hit).toBeUndefined();
  });
});
