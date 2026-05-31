import type { LegacyHiprintGlobal } from "./types";

declare global {
  interface Window {
    hiprint?: LegacyHiprintGlobal;
    hiprintTemplate?: new (options?: unknown) => unknown;
    hiprintTemplateDesign?: unknown;
    $?: unknown;
    jQuery?: unknown;
    __HIPRINT_RE_LEGACY_LOADED__?: boolean;
    __HIPRINT_RE_RUNTIME_SNAPSHOT__?: unknown;
  }
}

export function getLegacyHiprint(): LegacyHiprintGlobal | undefined {
  return window.hiprint;
}

export function hasLegacyHiprint(): boolean {
  return Boolean(window.hiprint);
}
