import { createDefaultCss } from "./defaultCss";

const STYLE_ATTR = "data-hiprint-re-style";

/**
 * Injects the default CSS into a document's head.
 * Idempotent — returns the existing style element if already injected.
 */
export function injectDefaultStyle(
  doc: Document,
  prefix = "hiprint-re",
): HTMLStyleElement {
  const existing = doc.querySelector<HTMLStyleElement>(
    `style[${STYLE_ATTR}="${prefix}"]`,
  );

  if (existing) return existing;

  const style = doc.createElement("style");
  style.setAttribute(STYLE_ATTR, prefix);
  style.textContent = createDefaultCss(prefix);

  doc.head.appendChild(style);

  return style;
}
