import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePrintLayout } from "../../packages/react/src";
import basicTemplate from "../../fixtures/templates/basic-text.json";
import basicData from "../../fixtures/data/basic-text.data.json";

describe("usePrintLayout", () => {
  it("should create layout from legacy template", () => {
    const { result } = renderHook(() =>
      usePrintLayout({
        template: basicTemplate,
        templateKind: "legacy",
        data: basicData,
      }),
    );

    expect(result.current.error).toBe(null);
    expect(result.current.layout).toBeTruthy();
    expect(result.current.layout?.pages.length).toBeGreaterThan(0);
  });

  it("should handle layout warnings", () => {
    const { result } = renderHook(() =>
      usePrintLayout({
        template: basicTemplate,
        templateKind: "legacy",
        data: {},
      }),
    );

    expect(result.current.error).toBe(null);
    expect(result.current.layout).toBeTruthy();
    expect(Array.isArray(result.current.warnings)).toBe(true);
  });
});
