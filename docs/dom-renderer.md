# DOM Renderer

## Goal

`@hiprint-re/dom` renders `LayoutDocument` from `@hiprint-re/core` into DOM / HTML / browser print output.

## Input

```ts
LayoutDocument;
```

## Output

- HTMLElement
- HTML string
- browser print iframe

## APIs

```ts
renderToDom(layout);
mountLayout(layout, container);
renderToHtmlString(layout);
previewLayout(layout, container);
printLayout(layout);
```

## Rules

DOM renderer may depend on:

- document
- HTMLElement
- iframe
- browser print

DOM renderer must not depend on:

- React
- Vue
- designer state
- legacy runtime
- jQuery

## Rendering flow

```
LayoutDocument
  ↓
renderToDom
  ↓
renderPage
  ↓
renderElement
  ↓
renderText / renderImage / renderLine / renderRect / renderTable
```

## Print flow

```
LayoutDocument
  ↓
createPrintHtml
  ↓
hidden iframe
  ↓
iframe.contentWindow.print()
```

## Architecture

```
packages/dom/
├─ src/
│  ├─ index.ts                  # Barrel export
│  ├─ types.ts                  # DomRenderOptions, DomRenderContext
│  │
│  ├─ renderToDom.ts            # Core render function
│  ├─ mountLayout.ts            # Mount to container
│  ├─ renderToHtmlString.ts     # Serialize to HTML string
│  │
│  ├─ renderers/
│  │  ├─ renderPage.ts          # Page renderer
│  │  ├─ renderElement.ts       # Element dispatcher
│  │  ├─ renderText.ts          # Text element
│  │  ├─ renderImage.ts         # Image element
│  │  ├─ renderLine.ts          # Line element
│  │  ├─ renderRect.ts          # Rect element
│  │  ├─ renderTable.ts         # Table element
│  │  └─ renderUnknown.ts       # Unknown element fallback
│  │
│  ├─ style/
│  │  ├─ cssLength.ts           # CSS length conversion
│  │  ├─ defaultCss.ts          # Default CSS template
│  │  ├─ injectStyle.ts         # Style injection
│  │  └─ applyElementStyle.ts   # Apply styles to element
│  │
│  ├─ preview/
│  │  ├─ createPreviewRoot.ts  # Create preview container
│  │  └─ previewLayout.ts      # Preview layout
│  │
│  ├─ print/
│  │  ├─ createPrintHtml.ts    # Create print HTML
│  │  └─ printLayout.ts        # Trigger browser print
│  │
│  └─ utils/
│     └─ dom.ts                 # DOM utilities
```

## DomRenderOptions

| Option | Default | Description |
|--------|---------|-------------|
| `classNamePrefix` | `"hiprint-re"` | CSS class prefix |
| `injectDefaultStyle` | `true` | Inject default CSS |
| `pageGap` | `16` | Gap between pages |
| `geometryUnit` | `layout.unit` | Unit for positions/sizes |
| `typographyUnit` | `"px"` | Unit for font sizes |
| `resolveImageSrc` | `(src) => src` | Custom image resolver |
| `renderUnknown` | `true` | Render unknown element placeholder |
| `className` | `undefined` | Extra class for root |

## Usage Example

```ts
import { fromLegacyTemplate, layoutTemplate } from "@hiprint-re/core";
import { previewLayout, printLayout } from "@hiprint-re/dom";

// Load legacy template
const coreTemplate = fromLegacyTemplate(legacyTemplate);

// Layout
const layout = layoutTemplate(coreTemplate, data);

// Preview in browser
previewLayout(layout, document.querySelector("#preview")!);

// Print
await printLayout(layout);
```
