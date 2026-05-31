import { describe, expect, it } from "vitest";

describe("legacy loader", () => {
  it("should run in jsdom environment", () => {
    expect(typeof window).toBe("object");
    expect(typeof document).toBe("object");
  });
});
