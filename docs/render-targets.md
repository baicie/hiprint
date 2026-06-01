# Render Targets

## Overview

All render targets consume `LayoutDocument` produced by `layoutTemplate()`. Renderers must not recalculate layout.

```
PrintTemplate
  ↓
layoutTemplate(template, data)
  ↓
LayoutDocument
  ├─ DOM Preview (renderToDom)
  ├─ SVG Export (renderToSvgString)
  ├─ Canvas Export (renderToCanvas)
  └─ PDF Export (exportPdfBytes)
```

## DOM

Best for browser preview and browser print.

```ts
import { renderToDom } from "@hiprint-re/dom";

const container = document.getElementById("preview");
renderToDom(layout, container);
```

## SVG

Best for vector export and snapshot testing.

```ts
import { renderToSvgString, renderToSvgElement } from "@hiprint-re/svg";

const svg = renderToSvgString(layout);
const svgs = renderToSvgElement(layout);
```

SVG output is text, making it ideal for:
- Snapshot testing
- Vector graphics editing
- Embedding in HTML

## Canvas

Best for PNG export and thumbnails.

```ts
import { renderToCanvas, exportPngDataUrls, downloadPngPages } from "@hiprint-re/canvas";

const canvases = await renderToCanvas(layout, { scale: 2 });
const urls = await exportPngDataUrls(layout);
await downloadPngPages(layout);
```

Canvas output is rasterized. Note that CORS restrictions apply to image sources.

## PDF

Best for downloadable print files.

```ts
import { exportPdfBytes, downloadPdf } from "@hiprint-re/pdf";

const bytes = await exportPdfBytes(layout, {
  fontBytes: await fetch("/fonts/NotoSansSC.ttf").then(r => r.arrayBuffer()),
});
await downloadPdf(layout, "document.pdf");
```

PDF does not bundle font files. Provide font bytes for CJK support.

## Rule

All render targets are pure consumers of `LayoutDocument`. Layout computation happens exactly once in `layoutTemplate()`.
