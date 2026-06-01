# Table Schema

## Overview

The table element is the most complex element in hiprint-re. It supports header rows, body rows, footer rows, column configuration, pagination with repeat headers, and footer modes.

## TableElementOptions

```ts
import type { TableElementOptions } from "@hiprint-re/core";

interface TableElementOptions {
  dataField?: string;
  columns: TableColumn[];

  header?: TableHeaderOptions;
  body?: TableBodyOptions;
  footer?: TableFooterOptions;
  pagination?: TablePaginationOptions;
  merges?: TableMergeCell[];
  border?: TableBorderOptions;
}
```

### dataField

Points to the array field in data to iterate over for body rows.

```ts
// data: { items: [{ name: "苹果" }, { name: "香蕉" }] }
options: { dataField: "items" }
```

### columns

Array of `TableColumn` definitions. See below.

---

## TableColumn

```ts
interface TableColumn {
  id: string;
  field?: string;
  title?: string;
  width?: number;
  minWidth?: number;
  align?: "left" | "center" | "right";
  visible?: boolean;
  formatter?: string;
  style?: PrintStyle;
  headerStyle?: PrintStyle;
  bodyStyle?: PrintStyle;
  footerStyle?: PrintStyle;
  children?: TableColumn[];
  raw?: UnknownRecord;
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique column identifier |
| `field` | `string` | Data field path (e.g. `"name"`, `"price"`) |
| `title` | `string` | Header cell display text |
| `width` | `number` | Column width in mm. If omitted, width is distributed equally |
| `minWidth` | `number` | Minimum column width |
| `align` | `string` | Text alignment: `"left"`, `"center"`, `"right"` |
| `visible` | `boolean` | Whether column is visible (default: `true`) |
| `formatter` | `string` | Value formatter expression |
| `children` | `TableColumn[]` | Nested columns for multi-level headers (flattened at layout time) |
| `style` | `PrintStyle` | Default cell style |
| `headerStyle` | `PrintStyle` | Header cell style override |
| `bodyStyle` | `PrintStyle` | Body cell style override |
| `footerStyle` | `PrintStyle` | Footer cell style override |

### Column Width Resolution

Columns without explicit `width` share the remaining space equally:

```ts
// table width = 100mm
columns: [
  { id: "name", width: 40 },     // 40mm
  { id: "price" },               // 30mm (100 - 40) / 1
  { id: "qty" },                 // 30mm (100 - 40) / 1
]
```

### Nested Columns

Multi-level headers are supported via `children`. The layout engine flattens them to leaf columns:

```ts
columns: [
  {
    id: "product",
    title: "商品",
    children: [
      { id: "name", title: "名称", width: 50 },
      { id: "spec", title: "规格", width: 50 },
    ],
  },
  { id: "amount", title: "金额", width: 40 },
]
// Flattened: [name, spec, amount]
```

---

## TableHeaderOptions

```ts
interface TableHeaderOptions {
  show: boolean;           // default: true
  repeatOnPageBreak: boolean; // default: true
  height: number;          // default: 8 (mm)
  style?: PrintStyle;
}
```

| Field | Description |
|-------|-------------|
| `show` | Whether to render the header row |
| `repeatOnPageBreak` | Whether to repeat the header on each page when the table spans multiple pages |
| `height` | Header row height in mm |

---

## TableBodyOptions

```ts
interface TableBodyOptions {
  rowHeight: number;       // default: 8 (mm)
  autoRowHeight?: boolean; // default: false (future)
  minRowHeight?: number;   // default: 8 (mm)
  maxRowHeight?: number;   // default: 40 (mm)
  style?: PrintStyle;
}
```

| Field | Description |
|-------|-------------|
| `rowHeight` | Fixed row height for all body rows in mm |
| `autoRowHeight` | Whether to auto-calculate row height based on content (future feature) |
| `minRowHeight` | Minimum row height when auto height is enabled |
| `maxRowHeight` | Maximum row height when auto height is enabled |

---

## TableFooterOptions

```ts
interface TableFooterOptions {
  show: boolean;              // default: false
  rows: TableFooterRow[];
  repeatOnEveryPage?: boolean; // default: false
  style?: PrintStyle;
}
```

### TableFooterRow

```ts
interface TableFooterRow {
  id: string;
  height: number;
  cells: TableFooterCell[];
  style?: PrintStyle;
}
```

### TableFooterCell

```ts
interface TableFooterCell {
  id: string;
  columnId: string;
  value?: string;
  field?: string;
  expression?: string;
  colSpan?: number;
  style?: PrintStyle;
}
```

Footer cells can use static `value` or bind to a `field` for dynamic data.

---

## TablePaginationOptions

```ts
interface TablePaginationOptions {
  enabled: boolean;           // default: true
  repeatHeader: boolean;     // default: true
  footerMode: "none" | "last-page" | "every-page"; // default: "last-page"
  rowBreakMode: "avoid" | "split"; // default: "avoid"
  allowPageBreak: boolean;   // default: true
}
```

| Field | Description |
|-------|-------------|
| `enabled` | Whether pagination is active |
| `repeatHeader` | Repeat header on each page |
| `footerMode` | When to show footer: never, only on last page, or every page |
| `rowBreakMode` | How to handle rows that don't fit: `"avoid"` (move to next page) or `"split"` (future: split across pages) |
| `allowPageBreak` | Whether the table can span multiple pages. When `false`, entire table stays on one page |

---

## TableMergeCell

```ts
interface TableMergeCell {
  rowKind: TableRowKind;  // "header" | "body" | "footer"
  rowIndex: number;
  columnId: string;
  rowSpan?: number;
  colSpan?: number;
}
```

Defines merged cells. Note: merged cell rendering is planned for a future phase.

---

## TableBorderOptions

```ts
interface TableBorderOptions {
  enabled: boolean;       // default: true
  color?: string;         // default: "#111827"
  width?: number;        // default: 1 (mm)
  style?: "solid" | "dashed" | "dotted"; // default: "solid"
}
```

Controls table cell borders. When `enabled` is `false`, all borders are hidden.

---

## Layout Flow

```
TableElementOptions
        │
        ▼
normalizeTableOptions()
        │
        ▼
resolveTableData() → extract array from data by dataField
        │
        ▼
resolveTableColumns() → flatten + compute widths
        │
        ▼
createHeaderRows() → LayoutTableRow[]
createBodyRows()   → LayoutTableRow[]
createFooterRows()  → LayoutTableRow[]
        │
        ▼
paginateTableRows() → TablePageSlice[]
        │
        ▼
layoutTable() → LayoutTableElement[] (one per page slice)
        │
        ▼
renderTable() (DOM) → HTML elements
```

---

## Designer Commands

| Command | File | Description |
|---------|------|-------------|
| `createAddTableColumnCommand` | `commands/addTableColumn.ts` | Add a new column at end or specific index |
| `createRemoveTableColumnCommand` | `commands/removeTableColumn.ts` | Remove column by ID |
| `createUpdateTableColumnCommand` | `commands/updateTableColumn.ts` | Patch column properties |
| `createReorderTableColumnCommand` | `commands/reorderTableColumn.ts` | Move column from one index to another |
| `createUpdateTableOptionsCommand` | `commands/updateTableOptions.ts` | Update table-level options (header/body/footer/pagination/border) |

---

## React Editors

| Component | Description |
|-----------|-------------|
| `TablePropertyPanel` | Root container for all table editors |
| `TableGeneralEditor` | Data field, show header, repeat header, row height, header height, footer mode |
| `TableColumnEditor` | Add/remove/reorder columns, edit title/field/width/align/visibility |
| `TableFooterEditor` | Add/remove footer rows, edit row height, edit cell values |
