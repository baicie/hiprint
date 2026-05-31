import type { LegacyPatch } from "./index";

export const patchGlobalGuard: LegacyPatch = {
  name: "global-guard",

  apply(ctx) {
    const { runtime } = ctx;

    if (!runtime.hiprint) {
      throw new Error(
        "[hiprint-re] Cannot apply global guard: hiprint is missing.",
      );
    }

    Object.defineProperty(window, "__HIPRINT_RE_LEGACY_LOADED__", {
      value: true,
      configurable: true,
      enumerable: false,
      writable: false,
    });
  },
};
