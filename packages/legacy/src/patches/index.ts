import type { LegacyRuntime } from "../types";
import { patchGlobalGuard } from "./patchGlobalGuard";
import { patchRuntimeProbe } from "./patchRuntimeProbe";

export interface LegacyPatchContext {
  runtime: LegacyRuntime;
  appliedPatches: Set<string>;
}

export interface LegacyPatch {
  name: string;
  apply(ctx: LegacyPatchContext): void;
}

const patches: LegacyPatch[] = [patchGlobalGuard, patchRuntimeProbe];

const appliedPatches = new Set<string>();

export function applyLegacyPatches(runtime: LegacyRuntime): void {
  const ctx: LegacyPatchContext = {
    runtime,
    appliedPatches,
  };

  for (const patch of patches) {
    if (appliedPatches.has(patch.name)) continue;

    patch.apply(ctx);
    appliedPatches.add(patch.name);
  }
}
