import type { LegacyHiprintGlobal } from "./types";

declare global {
  interface Window {
    hiprint?: LegacyHiprintGlobal;
    hiprintTemplate?: new (options?: unknown) => unknown;
    hiprintTemplateDesign?: unknown;
    $?: unknown;
    jQuery?: unknown;
  }
}

export function getLegacyHiprint(): LegacyHiprintGlobal | undefined {
  return window.hiprint;
}

export function hasLegacyHiprint(): boolean {
  return Boolean(window.hiprint);
}
