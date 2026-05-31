import { describe, expect, it } from "vitest";
import { applyLegacyPatches } from "../../packages/legacy/src/patches";
import type { LegacyRuntime } from "../../packages/legacy/src/types";

describe("legacy patches", () => {
  it("should apply patches idempotently", () => {
    const runtime: LegacyRuntime = {
      hiprint: {},
      rawWindow: window,
    };

    applyLegacyPatches(runtime);
    applyLegacyPatches(runtime);

    expect((window as unknown as Record<string, unknown>).__HIPRINT_RE_LEGACY_LOADED__).toBe(true);
  });

  it("should set global loaded flag", () => {
    const runtime: LegacyRuntime = {
      hiprint: { init() {} },
      rawWindow: window,
    };

    applyLegacyPatches(runtime);

    expect((window as unknown as Record<string, unknown>).__HIPRINT_RE_LEGACY_LOADED__).toBe(true);
  });
});
