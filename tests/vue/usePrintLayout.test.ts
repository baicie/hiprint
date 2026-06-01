import { describe, expect, it } from "vitest";
import { usePrintLayout } from "../../packages/vue/src";
import basicTemplate from "../../fixtures/templates/basic-text.json";
import basicData from "../../fixtures/data/basic-text.data.json";

describe("vue usePrintLayout", () => {
  it("should create layout from legacy template", () => {
    const { layout, error } = usePrintLayout({
      template: basicTemplate,
      templateKind: "legacy",
      data: basicData,
    });

    expect(error.value).toBe(null);
    expect(layout.value).toBeTruthy();
    expect(layout.value?.pages.length).toBeGreaterThan(0);
  });

  it("should handle layout warnings", () => {
    const { layout, warnings, error } = usePrintLayout({
      template: basicTemplate,
      templateKind: "legacy",
      data: {},
    });

    expect(error.value).toBe(null);
    expect(layout.value).toBeTruthy();
    expect(Array.isArray(warnings.value)).toBe(true);
  });
});
