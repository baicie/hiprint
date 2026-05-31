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

const scriptPromises = new Map<string, Promise<void>>();

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

async function loadScript(src: string, force = false): Promise<void> {
  if (!force && scriptPromises.has(src)) {
    return scriptPromises.get(src)!;
  }

  const promise = new Promise<void>((resolve, reject) => {
    if (force) {
      document
        .querySelectorAll(`script[data-hiprint-legacy-src="${src}"]`)
        .forEach((node) => node.remove());
      scriptPromises.delete(src);
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-hiprint-legacy-src="${src}"]`,
    );

    if (existing?.dataset.loaded === "true") {
      resolve();
      return;
    }

    const script = existing ?? document.createElement("script");
    script.src = src;
    script.async = false;
    script.dataset["hiprintLegacySrc"] = src;

    script.onload = () => {
      script.dataset["loaded"] = "true";
      resolve();
    };

    script.onerror = () => {
      scriptPromises.delete(src);
      reject(
        new Error(`[hiprint-re] Failed to load legacy script: ${src}`),
      );
    };

    if (!existing) {
      document.head.appendChild(script);
    }
  });

  scriptPromises.set(src, promise);
  return promise;
}

function joinUrl(baseUrl: string, path: string): string {
  return `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}
