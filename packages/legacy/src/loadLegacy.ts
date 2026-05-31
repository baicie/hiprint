import { invariant } from "@hiprint-re/shared";
import type { LegacyLoadOptions, LegacyRuntime } from "./types";
import { hasLegacyHiprint } from "./globals";
import { applyLegacyPatches } from "./patches";

let loadingPromise: Promise<LegacyRuntime> | undefined;

const DEFAULT_VENDOR_BASE = "/legacy/";

const LEGACY_SCRIPTS = [
  "polyfill.min.js",
  "hiprint.bundle.js",
  "hiprint.config.js",
];

export async function loadLegacyRuntime(
  options: LegacyLoadOptions = {},
): Promise<LegacyRuntime> {
  const { baseUrl = DEFAULT_VENDOR_BASE, force = false } = options;

  if (!force && hasLegacyHiprint()) {
    const runtime = {
      hiprint: window.hiprint!,
      rawWindow: window,
    };

    applyLegacyPatches(runtime);

    return runtime;
  }

  if (!force && loadingPromise) {
    return loadingPromise;
  }

  loadingPromise = loadScripts(baseUrl).then(() => {
    invariant(
      window.hiprint,
      "Legacy hiprint global was not found after loading scripts.",
    );

    const runtime = {
      hiprint: window.hiprint!,
      rawWindow: window,
    };

    applyLegacyPatches(runtime);

    return runtime;
  });

  return loadingPromise;
}

async function loadScripts(baseUrl: string): Promise<void> {
  for (const script of LEGACY_SCRIPTS) {
    await loadScript(joinUrl(baseUrl, script));
  }
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-hiprint-legacy-src="${src}"]`,
    );

    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.dataset["hiprintLegacySrc"] = src;

    script.onload = () => resolve();
    script.onerror = () => {
      reject(new Error(`[hiprint-re] Failed to load legacy script: ${src}`));
    };

    document.head.appendChild(script);
  });
}

function joinUrl(baseUrl: string, path: string): string {
  return `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}
