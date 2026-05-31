# Core Template Schema

## Goal

`@hiprint-re/core` defines a framework-agnostic template schema.

It must not depend on:

- DOM
- React
- Vue
- jQuery
- legacy runtime

## Template

```ts
interface PrintTemplate {
  schemaVersion: "0.1.0";
  id: string;
  meta?: PrintTemplateMeta;
  paper: PaperConfig;
  panels: PrintPanel[];
  raw?: Record<string, unknown>;
}
```

## Panel

```ts
interface PrintPanel {
  id: string;
  index: number;
  name?: string;
  paper?: Partial<PaperConfig>;
  elements: PrintElement[];
  raw?: Record<string, unknown>;
}
```

## Element

```ts
interface PrintElementBase {
  id: string;
  type: PrintElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotate?: number;
  hidden?: boolean;
  locked?: boolean;
  binding?: DataBinding;
  style?: PrintStyle;
  options?: Record<string, unknown>;
  raw?: Record<string, unknown>;
}

type PrintElementType =
  | "text"
  | "image"
  | "table"
  | "line"
  | "rect"
  | "barcode"
  | "qrcode"
  | "html"
  | "unknown";
```

## Data Binding

```ts
interface DataBinding {
  field?: string;
  title?: string;
  formatter?: string;
  expression?: string;
}
```

## Print Style

```ts
interface PrintStyle {
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string | number;
  color?: string;
  backgroundColor?: string;
  textAlign?: "left" | "center" | "right";
  verticalAlign?: "top" | "middle" | "bottom";
  borderColor?: string;
  borderWidth?: number;
  borderStyle?: "solid" | "dashed" | "dotted" | "none";
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  lineHeight?: number;
}
```

## Paper

```ts
interface PaperConfig {
  preset: PaperPreset;
  width: number;
  height: number;
  unit: Unit;
  orientation: PaperOrientation;
  margin?: PaperMargin;
}

type PaperPreset = "A3" | "A4" | "A5" | "B5" | "custom";
type PaperOrientation = "portrait" | "landscape";
```

## Legacy Compatibility

Legacy data is preserved under `raw` to avoid losing information during conversion.

```ts
template.raw.legacy;          // original legacy template
panel.raw.legacyPanel;        // original legacy panel
element.raw.legacyElement;    // original legacy element
```

This ensures round-trip conversion between legacy and core formats is always safe.

## API

```ts
import {
  fromLegacyTemplate,
  toLegacyTemplate,
  normalizeTemplate,
  validateTemplate,
  migrateTemplate,
  createEmptyTemplate,
  createTemplateModel,
  TemplateModel,
} from "@hiprint-re/core";
```

## Usage

```ts
import { fromLegacyTemplate, validateTemplate } from "@hiprint-re/core";

const legacyTemplate = { panels: [...] };
const coreTemplate = fromLegacyTemplate(legacyTemplate);
const result = validateTemplate(coreTemplate);

if (!result.valid) {
  console.error(result.issues);
}
```

## ID Generation

`createId` uses `Math.random()` for Phase 2 simplicity. In production, replace with `crypto.randomUUID()` for collision-free IDs:

```ts
// Current (Phase 2)
function createId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

// Recommended for future
function createId(prefix: string): string {
  return `${prefix}_${crypto.randomUUID()}`;
}
```
