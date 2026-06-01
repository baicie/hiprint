# Phase 11 - Multi Target Renderers

## Goal

Add SVG, Canvas and PDF export support based on `LayoutDocument`.

## Packages

- `@hiprint-re/render-core`
- `@hiprint-re/svg`
- `@hiprint-re/canvas`
- `@hiprint-re/pdf`

## Flow

```
PrintTemplate
  ↓
layoutTemplate
  ↓
LayoutDocument
  ├─ renderToDom
  ├─ renderToSvgString
  ├─ renderToCanvas
  └─ exportPdfBytes
```

## Non-goals

- No built-in font files
- No full server-side rendering
- No Excel/Word export
- No complete print color management

## Font policy

PDF renderer must not bundle font files.

Applications should provide font bytes explicitly:

```ts
await exportPdfBytes(layout, {
  fontBytes,
})
```

## API Reference

### SVG

```ts
import { renderToSvgString, renderToSvgElement } from "@hiprint-re/svg";

const svg = renderToSvgString(layout, {
  background: "#ffffff",
  scale: 1,
  classNamePrefix: "hiprint-svg",
  renderers: [], // custom element renderers
});

const elements = renderToSvgElement(layout);
```

### Canvas

```ts
import { renderToCanvas, exportPngDataUrls, downloadPngPages } from "@hiprint-re/canvas";

const canvases = await renderToCanvas(layout, {
  scale: 2,
  dpi: 96,
  background: "#ffffff",
  renderers: [],
});

const dataUrls = await exportPngDataUrls(layout);
await downloadPngPages(layout);
```

### PDF

```ts
import { exportPdfBytes, downloadPdf } from "@hiprint-re/pdf";

const bytes = await exportPdfBytes(layout, {
  title: "Document",
  author: "Author",
  fontBytes, // provide font for CJK support
  renderers: [],
});

await downloadPdf(layout, "print.pdf", { title: "Document" });
```

## Plugin System

Plugins can provide custom renderers for each target:

```ts
const plugin: HiprintPlugin = {
  name: "my-plugin",
  svgRenderers: [{ type: "custom", render: (el, ctx) => "<g>...</g>" }],
  canvasRenderers: [{ type: "custom", draw: (el, ctx) => { /* ... */ } }],
  pdfRenderers: [{ type: "custom", render: (el, ctx) => { /* ... */ } }],
};
```

## Known Limitations

1. **CORS**: Image export via Canvas requires images to allow cross-origin access. If images are blocked by CORS, `canvas.toDataURL()` will fail.
2. **Font subsetting**: PDF uses standard fonts by default. For CJK support, provide custom font bytes.
3. **Complex text**: Basic line-wrapping is supported. Advanced typography may need custom renderers.
