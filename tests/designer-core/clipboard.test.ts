import { describe, expect, it } from "vitest";
import {
  copyElements,
  offsetPastedElements,
} from "../../packages/designer-core/src";

describe("clipboard", () => {
  it("should copy elements deeply", () => {
    const elements = [
      {
        id: "text_1",
        type: "text" as const,
        x: 10,
        y: 20,
        width: 80,
        height: 12,
        options: { content: "Hello" },
      },
    ];

    const copied = copyElements(elements);

    expect(copied).toEqual(elements);
    expect(copied).not.toBe(elements);
    expect(copied[0]).not.toBe(elements[0]);
  });

  it("should offset pasted elements", () => {
    const elements = [
      {
        id: "text_1",
        type: "text" as const,
        x: 10,
        y: 20,
        width: 80,
        height: 12,
      },
    ];

    const pasted = offsetPastedElements(elements, 6);

    expect(pasted[0]!.x).toBe(16);
    expect(pasted[0]!.y).toBe(26);
    expect(pasted[0]!.id).not.toBe("text_1");
  });

  it("should use default offset of 6", () => {
    const elements = [
      {
        id: "text_1",
        type: "text" as const,
        x: 10,
        y: 20,
        width: 80,
        height: 12,
      },
    ];

    const pasted = offsetPastedElements(elements);

    expect(pasted[0]!.x).toBe(16);
    expect(pasted[0]!.y).toBe(26);
  });
});
