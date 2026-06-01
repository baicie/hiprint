# Phase 9 - Advanced Table Editor

## Goal

Build advanced table editing and layout support for business print templates.

## Deliverables

- Enhanced table schema
- Table layout pagination
- Repeated header
- Footer rows
- Column editor
- Table commands
- Table property panel
- Table fixtures
- Table snapshot tests

## Non-goals

- Full Excel-like editor
- Complex formula engine
- Advanced merged-cell interaction
- Virtualized table preview
- PDF export

## Table flow

```
TableElementOptions
  ↓
normalizeTableOptions
  ↓
resolveTableData
  ↓
resolveTableColumns
  ↓
createHeaderRows / createBodyRows / createFooterRows
  ↓
paginateTableRows
  ↓
LayoutTableElement[]
  ↓
renderTable
```

## Architecture

### Package: @hiprint-re/core

- `types/table.ts` — Enhanced table types
- `table/defaults.ts` — Default options
- `table/normalizeTableOptions.ts` — Options normalization
- `table/resolveTableData.ts` — Data binding resolution
- `table/resolveColumns.ts` — Column width computation
- `table/createTableRows.ts` — Header/body/footer row construction
- `table/paginateTableRows.ts` — Pagination engine
- `layout/layoutTable.ts` — Enhanced table layout
- `layout/tableTypes.ts` — Layout table types

### Package: @hiprint-re/dom

- `renderers/renderTable.ts` — Header/body/footer rendering
- `style/defaultCss.ts` — Footer cell CSS

### Package: @hiprint-re/designer-core

- `table/tableUtils.ts` — Table helpers
- `table/commands/addTableColumn.ts` — Add column command
- `table/commands/removeTableColumn.ts` — Remove column command
- `table/commands/updateTableColumn.ts` — Update column command
- `table/commands/reorderTableColumn.ts` — Reorder column command
- `table/commands/updateTableOptions.ts` — Update table options command

### Package: @hiprint-re/designer-react

- `components/table/TablePropertyPanel.tsx` — Table property panel
- `components/table/TableGeneralEditor.tsx` — General table settings
- `components/table/TableColumnEditor.tsx` — Column list editor
- `components/table/TableFooterEditor.tsx` — Footer row editor

## Table Schema

See `docs/table-schema.md` for full type definitions.

## Key decisions

1. **Separate table types from element types** — `types/table.ts` holds all table-related types for clarity.
2. **No DOM dependency in layout** — All table layout is computed in `core` without touching `document` or `window`.
3. **Stable IDs for pagination** — Each page slice gets `table_1__page_0`, `table_1__page_1`, etc.
4. **Nested columns flattened** — Phase 9 supports nested column groups by flattening to leaf columns.
5. **Footer cells per column** — Footer rows mirror column structure, configured individually per cell.

## Acceptance

- Table element renders with header, body rows, and footer rows
- Table pagination correctly splits rows across pages
- Header repeats on each page when `repeatOnPageBreak` is enabled
- Footer appears on last page or every page based on `footerMode`
- Column editor allows adding/removing/reordering columns
- Table fixtures render correctly in both DOM and SVG/Canvas targets
- All table-related tests pass
