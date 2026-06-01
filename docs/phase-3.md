# Phase 3 - Core Layout Engine

## Goal

Convert core template schema and data into a framework-agnostic layout result.

## Input

- `PrintTemplate`
- `data`
- `LayoutOptions`

## Output

- `LayoutDocument`
- `LayoutPage[]`
- `LayoutElement[]`
- `LayoutWarning[]`

## Non-goals

- No DOM rendering
- No React/Vue
- No designer
- No browser print
- No PDF
- No precise font measurement
- No advanced table pagination

## Flow

```
PrintTemplate + data
  ↓
layoutTemplate
  ↓
layoutPanel
  ↓
layoutElement
  ↓
layoutText / layoutImage / layoutTable / ...
  ↓
LayoutDocument
```

## Rules

`@hiprint-re/core` layout must not depend on:

- `window`
- `document`
- `HTMLElement`
- `jQuery`
- `React`
- `Vue`

## Usage

```ts
import { fromLegacyTemplate, layoutTemplate } from "@hiprint-re/core";

const template = fromLegacyTemplate(legacyTemplate);
const layout = layoutTemplate(template, data);

console.log(layout.pages);
```

## API Reference

### `layoutTemplate(template, data, options)`

Main entry point. Returns a `LayoutDocument`.

### `LayoutDocument`

```ts
interface LayoutDocument {
  unit: "mm" | "px"
  width: number
  height: number
  pages: LayoutPage[]
  warnings: LayoutWarning[]
}
```

### `LayoutPage`

```ts
interface LayoutPage {
  index: number
  width: number
  height: number
  elements: LayoutElement[]
}
```

### `LayoutElement`

Every layout element contains:

```ts
interface LayoutElementBase {
  id: string
  type: PrintElementType
  x: number
  y: number
  width: number
  height: number
  pageIndex: number
}
```

## Text Layout

Text is measured using `TextMeasurer`.

By default, core uses an approximate text measurer.

DOM renderer may provide a more accurate measurer later.

## Table Layout

Phase 3 table layout supports:

- columns
- rows
- header height
- fixed row height
- simple page splitting

Advanced features are deferred.

## Acceptance Criteria

- [x] `@hiprint-re/core` exports `layoutTemplate`
- [x] `layoutTemplate` does not depend on DOM
- [x] `text` / `image` / `line` / `rect` / `table` all generate `LayoutElement`
- [x] Basic data binding works
- [x] Elements exceeding page height create new pages
- [x] Table supports basic rows layout
- [x] Table supports simple pagination
- [x] Warnings are collected
- [x] Fixtures generate layout results
- [x] `pnpm check:layout` passes
- [x] `docs/phase-3.md` complete
- [x] `docs/layout.md` complete

## Deliverables

- `packages/core/src/layout/` — layout engine (unit, paper, position, bounds, pagination, table-pagination)
- `packages/core/src/model/` — TemplateModel and element utilities
- `fixtures/templates/` — Real print template JSONs for regression testing
- `docs/layout.md` — Layout API documentation
