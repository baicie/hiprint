# Layout Engine

## Overview

The layout engine converts `PrintTemplate + data` into a `LayoutDocument` — a framework-agnostic intermediate representation.

```
PrintTemplate + data
        ↓
  layoutTemplate()
        ↓
  LayoutDocument
```

The layout engine lives in `packages/core/src/layout/` and has **zero DOM dependencies**.

## `layoutTemplate()`

```ts
function layoutTemplate(
  template: PrintTemplate,
  data?: unknown,
  options?: LayoutOptions,
): LayoutDocument
```

## LayoutOptions

```ts
interface LayoutOptions {
  /** Output layout unit. Defaults to mm. */
  unit?: "mm" | "px";

  /** DPI for mm <-> px conversion. Defaults to 96. */
  dpi?: number;

  /** Allow elements to overflow page bounds. Defaults to false. */
  allowOverflow?: boolean;

  /** Custom text measurer. Defaults to internal estimator. */
  measureText?: TextMeasurer;
}

interface TextMeasurer {
  measure(input: MeasureTextInput): MeasureTextResult;
}

interface MeasureTextInput {
  text: string;
  fontSize: number;
  fontFamily?: string;
  fontWeight?: string | number;
  lineHeight?: number;
  maxWidth?: number;
  unit: "mm" | "px";
}

interface MeasureTextResult {
  width: number;
  height: number;
  lines: string[];
  lineHeight: number;
}
```

## LayoutDocument

```ts
interface LayoutDocument {
  unit: Unit
  width: number      // mm
  height: number     // mm
  pages: LayoutPage[]
  warnings: LayoutWarning[]
}
```

## LayoutPage

```ts
interface LayoutPage {
  index: number
  width: number
  height: number
  elements: LayoutElement[]
}
```

## LayoutElement

All layout elements extend `LayoutElementBase`:

```ts
interface LayoutElementBase {
  id: string
  type: PrintElementType
  x: number
  y: number
  width: number
  height: number
  pageIndex: number
  sourcePanelId: string
  sourceElementId: string
  hidden?: boolean
  style?: Record<string, unknown>
  raw?: Record<string, unknown>
}
```

Typed variants:

- `LayoutTextElement` — includes `value`, `lines`, `fontSize`, `lineHeight`
- `LayoutImageElement` — includes `src`, `objectFit`
- `LayoutLineElement` — includes `direction`
- `LayoutRectElement` — includes `radius`
- `LayoutTableElement` — includes `columns`, `rows`, `headerHeight`, `rowHeight`

## Data Binding

The layout engine resolves data bindings via dot-path notation:

```ts
resolveBindingValue({ field: "order.customer.name" }, data)
// → "张三"
```

Supports: `field`, `title` fallback, and primitive values.

## Text Measurement

Core ships a `DefaultTextMeasurer` that estimates character width as `fontSize * 0.55` and wraps text at `maxWidth`.

For accurate rendering, pass a browser-based measurer via `LayoutOptions.measureText`.

## Table Pagination

Tables split across pages when rows exceed available height. Each page fragment is a separate `LayoutTableElement` with its own ID: `tableId__page_N`.

Phase 3 supports:
- columns with fixed/auto width
- rows from `dataField`
- fixed header height
- fixed row height
- simple page splitting

Deferred: merged cells, dynamic row height, cross-page borders, summary rows, nested sub-tables.

## Unit Conversion

```ts
mmToPx(25.4, 96) // → 96
pxToMm(96, 96)   // → 25.4
```

Default DPI is 96. All internal layout uses mm; renderer converts to CSS px as needed.

## Warnings

Layout warnings are collected (not thrown) and returned in `LayoutDocument.warnings`.

```ts
interface LayoutWarning {
  code: string;
  level: "warning" | "error";
  message: string;
  path?: string;
  elementId?: string;
}
```

Common codes:
- `element.overflow` — element extends beyond page bounds
- `element.unknown` — element type not recognized

## Directory Structure

```
packages/core/src/layout/
├── index.ts              # barrel export
├── types.ts              # LayoutDocument, LayoutElement, LayoutOptions...
├── layoutTemplate.ts     # main entry point
├── layoutPanel.ts        # panel-level layout
├── layoutElement.ts      # element-type dispatcher
├── layoutText.ts         # text layout
├── layoutImage.ts        # image layout
├── layoutLine.ts         # line layout
├── layoutRect.ts         # rect layout
├── layoutTable.ts        # table layout + pagination
├── pageBuilder.ts        # page management
├── unit.ts               # mm/px conversion
├── paper.ts              # paper resolution
├── measureText.ts        # default text measurer
├── resolveBinding.ts     # data binding
├── warnings.ts           # warning helpers
└── utils.ts              # overflow, page index, normalize Y
```
