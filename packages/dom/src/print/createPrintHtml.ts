import type { LayoutDocument } from "@hiprint-re/core";
import type { DomRenderOptions } from "../types";
import { renderToHtmlString } from "../renderToHtmlString";
import { createDefaultCss } from "../style/defaultCss";

export function createPrintHtml(
  layout: LayoutDocument,
  options: DomRenderOptions = {},
): string {
  const prefix = options.classNamePrefix ?? "hiprint-re";

  const body = renderToHtmlString(layout, {
    ...options,
    injectDefaultStyle: false,
    classNamePrefix: prefix,
    pageGap: 0,
  });

  const css = createDefaultCss(prefix);

  // @page size: <width> <height> — CSS spec defines the first value as the inline
  // (horizontal) dimension and the second as the block (vertical) dimension.
  // For landscape (width > height) the browser rotates the page box automatically.
  // Use <width> <height> order regardless of orientation; do NOT swap them.
  const cssWidth = layout.width;
  const cssHeight = layout.height;
  const sizeValue = `${cssWidth}${layout.unit} ${cssHeight}${layout.unit}`;

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Print</title>
  <style>${css}</style>
  <style>
    @page {
      size: ${sizeValue};
      margin: 0;
    }
  </style>
</head>
<body>
${body}
</body>
</html>`;
}
