import type { LayoutDocument } from "@hiprint-re/core";
import type {
  DomRenderContext,
  DomRenderOptions,
  DomRenderResult,
  RequiredDomRenderOptions,
} from "./types";
import { getDefaultDocument } from "./utils/dom";
import { injectDefaultStyle } from "./style/injectStyle";
import { renderPage } from "./renderers/renderPage";

export function renderToDom(
  layout: LayoutDocument,
  options: DomRenderOptions = {},
): DomRenderResult {
  const doc = options.document ?? getDefaultDocument();

  const resolvedOptions = resolveOptions(layout, options);

  if (resolvedOptions.injectDefaultStyle) {
    injectDefaultStyle(doc, resolvedOptions.classNamePrefix);
  }

  const ctx: DomRenderContext = {
    document: doc,
    layout,
    options: resolvedOptions,
  };

  const root = doc.createElement("div");
  const prefix = resolvedOptions.classNamePrefix;

  root.className = [prefix + "-document", resolvedOptions.className]
    .filter(Boolean)
    .join(" ");

  const pages = layout.pages.map((page) => {
    const pageDom = renderPage(page, ctx);
    root.appendChild(pageDom);
    return pageDom;
  });

  return {
    root,
    pages,
    dispose() {
      root.remove();
    },
  };
}

function resolveOptions(
  layout: LayoutDocument,
  options: DomRenderOptions,
): RequiredDomRenderOptions {
  return {
    classNamePrefix: options.classNamePrefix ?? "hiprint-re",
    injectDefaultStyle: options.injectDefaultStyle ?? true,
    pageGap: options.pageGap ?? 16,
    geometryUnit: options.geometryUnit ?? layout.unit,
    typographyUnit: options.typographyUnit ?? "px",
    resolveImageSrc: options.resolveImageSrc ?? ((src) => src),
    renderUnknown: options.renderUnknown ?? true,
    className: options.className,
  };
}
