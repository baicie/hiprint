import type { LegacyRuntime } from "../types";
import { patchGlobalGuard } from "./patchGlobalGuard";
import { patchRuntimeProbe } from "./patchRuntimeProbe";

export interface LegacyPatchContext {
  runtime: LegacyRuntime;
  appliedPatches: Set<string>;
}

export interface LegacyPatch {
  name: string;
  /** If false, the patch re-applies on every loadLegacyRuntime call. Defaults to true. */
  once?: boolean;
  apply(ctx: LegacyPatchContext): void;
}

const patches: LegacyPatch[] = [patchGlobalGuard, patchRuntimeProbe];

const PATCH_STATE_KEY = "__HIPRINT_RE_APPLIED_PATCHES__" as const;

export function applyLegacyPatches(runtime: LegacyRuntime): void {
  const win = runtime.rawWindow;
  const applied = win[PATCH_STATE_KEY] ?? new Set<string>();
  win[PATCH_STATE_KEY] = applied;

  const ctx: LegacyPatchContext = {
    runtime,
    appliedPatches: applied,
  };

  for (const patch of patches) {
    const isOnce = patch.once !== false;

    if (isOnce && applied.has(patch.name)) continue;

    patch.apply(ctx);
    applied.add(patch.name);
  }
}
