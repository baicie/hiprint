import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { loadLegacyRuntime } from "../../packages/legacy/src/loadLegacy";

describe("loadLegacyRuntime", () => {
  beforeEach(() => {
    // Simulate already-loaded state for fast-path tests
    (window as unknown as Record<string, unknown>).hiprint = {
      init() {},
      print() {},
    };
  });

  afterEach(() => {
    delete (window as unknown as Record<string, unknown>).hiprint;
  });

  it("returns runtime when hiprint is already present", async () => {
    const runtime = await loadLegacyRuntime({ force: false });

    expect(runtime.hiprint).toBeTruthy();
    expect(typeof runtime.hiprint.init).toBe("function");
  });

  it("sets __HIPRINT_RE_LEGACY_LOADED__ flag after loading", async () => {
    await loadLegacyRuntime({ force: false });

    expect((window as unknown as Record<string, unknown>).__HIPRINT_RE_LEGACY_LOADED__).toBe(true);
  });

  it("applies patches on already-loaded fast path", async () => {
    await loadLegacyRuntime({ force: false });

    expect((window as unknown as Record<string, unknown>).__HIPRINT_RE_RUNTIME_SNAPSHOT__).toBeDefined();
  });

  it("returns hiprint from window when present", async () => {
    const runtime = await loadLegacyRuntime({ force: false });

    expect(runtime.hiprint).toBe(window.hiprint);
  });
});
