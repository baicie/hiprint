下面给你一版 **Phase 9：高级 Table Editor / 表格编辑器能力** 的详细设计与代码草案。

Phase 9 的定位是：

```txt
Phase 8：设计器可扩展基础，PropertySchema + Registry + Snapline
Phase 9：专门攻克复杂表格编辑与表格布局能力
```

打印设计器里，表格是最大复杂点。Phase 9 做完后，项目才真正适合发票、订单、物流单、明细清单这类业务模板。

---

# 1. Phase 9 总目标

Phase 9 要完成：

```txt
1. 增强 core table schema
2. 支持 table columns 编辑模型
3. 支持表头 header / 明细 body / 汇总 footer
4. 支持列宽、字段、标题、对齐、样式配置
5. 支持固定行高 / 自动行高基础
6. 支持表格分页策略
7. 支持表头跨页重复
8. 支持 footer 汇总行基础
9. 支持基础单元格合并 schema
10. 增强 layoutTable
11. 新增 designer-core table commands
12. 新增 designer-react TablePropertyPanel / TableColumnEditor
13. 新增 table playground / fixtures / snapshot tests
```

最终用户可以在设计器里做这些：

```txt
新增表格
配置 dataField = items
新增/删除列
修改列标题
修改列字段
修改列宽
设置列对齐
设置表头是否重复
设置行高
设置边框
设置 footer 汇总
预览跨页表格
```

---

# 2. Phase 9 不做什么

Phase 9 不建议一次性做完整 Excel。

暂时不做：

```txt
不做完整 Excel 级单元格编辑
不做复杂公式引擎
不做拖拽调整列宽的完整体验
不做复杂多级表头可视化拖拽
不做复杂合并单元格交互
不做表格内富文本编辑
不做虚拟滚动大数据预览
不做复杂分组小计
```

Phase 9 做的是 **打印表格 MVP+**，不是在线表格软件。

---

# 3. 目标架构

```txt
@hiprint-re/core
  ├─ TableElementOptions
  ├─ TableColumn
  ├─ TableHeader
  ├─ TableFooter
  ├─ TableMergeCell
  └─ layoutTable 增强

@hiprint-re/designer-core
  ├─ table commands
  │  ├─ addTableColumn
  │  ├─ removeTableColumn
  │  ├─ updateTableColumn
  │  ├─ reorderTableColumn
  │  ├─ updateTableOptions
  │  └─ addFooterRow
  └─ table helpers

@hiprint-re/designer-react
  ├─ TablePropertyPanel
  ├─ TableColumnEditor
  ├─ TableFooterEditor
  ├─ TableStyleEditor
  └─ TableDataBindingEditor
```

---

# 4. Core：增强 Table Schema

Phase 2 里的 table schema 比较简单：

```ts
interface TableElementOptions {
  columns: TableColumn[];
  dataField?: string;
  showHeader?: boolean;
}
```

Phase 9 建议升级成：

```txt
表格基础配置
列配置
表头配置
明细行配置
页脚配置
分页配置
样式配置
合并配置
```

---

## `packages/core/src/types/table.ts`

```ts
import type { ID, UnknownRecord } from "./common";
import type { PrintStyle } from "./style";

export type TableRowKind = "header" | "body" | "footer";

export type TableColumnAlign = "left" | "center" | "right";

export interface TableColumn {
  id: ID;
  field?: string;
  title?: string;
  width?: number;
  minWidth?: number;
  align?: TableColumnAlign;
  visible?: boolean;
  formatter?: string;
  style?: PrintStyle;
  headerStyle?: PrintStyle;
  bodyStyle?: PrintStyle;
  footerStyle?: PrintStyle;
  children?: TableColumn[];
  raw?: UnknownRecord;
}

export interface TableHeaderOptions {
  show: boolean;
  repeatOnPageBreak: boolean;
  height: number;
  style?: PrintStyle;
}

export interface TableBodyOptions {
  rowHeight: number;
  autoRowHeight?: boolean;
  minRowHeight?: number;
  maxRowHeight?: number;
  style?: PrintStyle;
}

export interface TableFooterCell {
  id: ID;
  columnId: ID;
  value?: string;
  field?: string;
  expression?: string;
  colSpan?: number;
  style?: PrintStyle;
}

export interface TableFooterRow {
  id: ID;
  height: number;
  cells: TableFooterCell[];
  style?: PrintStyle;
}

export interface TableFooterOptions {
  show: boolean;
  rows: TableFooterRow[];
  repeatOnEveryPage?: boolean;
  style?: PrintStyle;
}

export interface TablePaginationOptions {
  enabled: boolean;

  /**
   * 表头跨页重复。
   */
  repeatHeader: boolean;

  /**
   * footer 是否只在最后一页显示。
   */
  footerMode: "none" | "last-page" | "every-page";

  /**
   * 遇到单行超过页面剩余空间时怎么处理。
   */
  rowBreakMode: "avoid" | "split";

  /**
   * 表格整体是否允许跨页。
   */
  allowPageBreak: boolean;
}

export interface TableMergeCell {
  rowKind: TableRowKind;
  rowIndex: number;
  columnId: ID;
  rowSpan?: number;
  colSpan?: number;
}

export interface TableBorderOptions {
  enabled: boolean;
  color?: string;
  width?: number;
  style?: "solid" | "dashed" | "dotted";
}

export interface TableElementOptions extends UnknownRecord {
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

然后在 `types/element.ts` 里改：

```ts
import type { TableElementOptions, TableColumn } from "./table";

export type { TableColumn, TableElementOptions };
```

---

# 5. Core：默认 Table Options

## `packages/core/src/table/defaults.ts`

```ts
import type {
  TableBodyOptions,
  TableBorderOptions,
  TableFooterOptions,
  TableHeaderOptions,
  TablePaginationOptions,
} from "../types/table";

export const defaultTableHeaderOptions: TableHeaderOptions = {
  show: true,
  repeatOnPageBreak: true,
  height: 8,
};

export const defaultTableBodyOptions: TableBodyOptions = {
  rowHeight: 8,
  autoRowHeight: false,
  minRowHeight: 8,
  maxRowHeight: 40,
};

export const defaultTableFooterOptions: TableFooterOptions = {
  show: false,
  rows: [],
  repeatOnEveryPage: false,
};

export const defaultTablePaginationOptions: TablePaginationOptions = {
  enabled: true,
  repeatHeader: true,
  footerMode: "last-page",
  rowBreakMode: "avoid",
  allowPageBreak: true,
};

export const defaultTableBorderOptions: TableBorderOptions = {
  enabled: true,
  color: "#111827",
  width: 1,
  style: "solid",
};
```

---

## `packages/core/src/table/normalizeTableOptions.ts`

```ts
import type { TableElementOptions } from "../types/table";
import {
  defaultTableBodyOptions,
  defaultTableBorderOptions,
  defaultTableFooterOptions,
  defaultTableHeaderOptions,
  defaultTablePaginationOptions,
} from "./defaults";

export function normalizeTableOptions(
  options: Partial<TableElementOptions> | undefined,
): TableElementOptions {
  return {
    ...options,
    dataField: options?.dataField,
    columns: Array.isArray(options?.columns) ? options.columns : [],

    header: {
      ...defaultTableHeaderOptions,
      ...options?.header,
    },

    body: {
      ...defaultTableBodyOptions,
      ...options?.body,
    },

    footer: {
      ...defaultTableFooterOptions,
      ...options?.footer,
      rows: Array.isArray(options?.footer?.rows) ? options.footer.rows : [],
    },

    pagination: {
      ...defaultTablePaginationOptions,
      ...options?.pagination,
    },

    border: {
      ...defaultTableBorderOptions,
      ...options?.border,
    },

    merges: Array.isArray(options?.merges) ? options.merges : [],
  };
}
```

---

# 6. Core：Table Layout 类型增强

Phase 3 的 `LayoutTableElement` 比较简单。Phase 9 要把 header/body/footer 分开。

## `packages/core/src/layout/tableTypes.ts`

```ts
import type { PrintStyle } from "../types/style";
import type { TableRowKind } from "../types/table";

export interface LayoutTableSection {
  kind: TableRowKind;
  rows: LayoutTableRow[];
}

export interface LayoutTableColumn {
  id: string;
  field?: string;
  title?: string;
  x: number;
  width: number;
  align?: "left" | "center" | "right";
  style?: PrintStyle;
}

export interface LayoutTableRow {
  id: string;
  kind: TableRowKind;
  index: number;
  y: number;
  height: number;
  cells: LayoutTableCell[];
  raw?: unknown;
  style?: PrintStyle;
}

export interface LayoutTableCell {
  id: string;
  rowId: string;
  columnId: string;
  rowKind: TableRowKind;
  value: string;
  x: number;
  y: number;
  width: number;
  height: number;
  colSpan?: number;
  rowSpan?: number;
  hidden?: boolean;
  style?: PrintStyle;
}
```

原 `layout/types.ts` 里的 table 结构可以改成引用：

```ts
import type { LayoutTableColumn, LayoutTableRow } from "./tableTypes";

export interface LayoutTableElement extends LayoutElementBase {
  type: "table";
  columns: LayoutTableColumn[];
  headerRows: LayoutTableRow[];
  bodyRows: LayoutTableRow[];
  footerRows: LayoutTableRow[];
  rowHeight: number;
  headerHeight: number;
  footerHeight: number;
}
```

---

# 7. Core：Table Data Resolve

## `packages/core/src/table/resolveTableData.ts`

```ts
import type { TableElement } from "../types/element";
import { getByPath } from "../layout/resolveBinding";

export function resolveTableData(
  element: TableElement,
  data: unknown,
): unknown[] {
  const dataField = element.options?.dataField ?? element.binding?.field;

  if (!dataField) return [];

  const value = getByPath(data, dataField);

  return Array.isArray(value) ? value : [];
}
```

---

# 8. Core：列宽计算

## `packages/core/src/table/resolveColumns.ts`

```ts
import type { TableColumn } from "../types/table";
import type { LayoutTableColumn } from "../layout/tableTypes";

export function resolveTableColumns(
  columns: TableColumn[],
  tableWidth: number,
): LayoutTableColumn[] {
  const visibleColumns = flattenColumns(columns).filter(
    (column) => column.visible !== false,
  );

  if (visibleColumns.length === 0) return [];

  const explicitWidth = visibleColumns.reduce((sum, column) => {
    return sum + (typeof column.width === "number" ? column.width : 0);
  }, 0);

  const missing = visibleColumns.filter(
    (column) => typeof column.width !== "number",
  );

  const fallbackWidth =
    missing.length > 0
      ? Math.max(0, tableWidth - explicitWidth) / missing.length
      : 0;

  let x = 0;

  return visibleColumns.map((column) => {
    const width =
      typeof column.width === "number" ? column.width : fallbackWidth;

    const result: LayoutTableColumn = {
      id: column.id,
      field: column.field,
      title: column.title,
      x,
      width,
      align: column.align,
      style: column.style,
    };

    x += width;

    return result;
  });
}

export function flattenColumns(columns: TableColumn[]): TableColumn[] {
  const result: TableColumn[] = [];

  for (const column of columns) {
    if (Array.isArray(column.children) && column.children.length > 0) {
      result.push(...flattenColumns(column.children));
    } else {
      result.push(column);
    }
  }

  return result;
}
```

多级表头的可视化可以后面做，Phase 9 先 flatten 到叶子列，保证布局稳定。

---

# 9. Core：构建 Header / Body / Footer Rows

## `packages/core/src/table/createTableRows.ts`

```ts
import type {
  LayoutTableCell,
  LayoutTableColumn,
  LayoutTableRow,
} from "../layout/tableTypes";
import type { TableElementOptions, TableFooterRow } from "../types/table";
import { getByPath, stringifyValue } from "../layout/resolveBinding";

export function createHeaderRows(input: {
  columns: LayoutTableColumn[];
  headerHeight: number;
}): LayoutTableRow[] {
  return [
    {
      id: "header_0",
      kind: "header",
      index: 0,
      y: 0,
      height: input.headerHeight,
      cells: input.columns.map((column) => ({
        id: `header_0_${column.id}`,
        rowId: "header_0",
        rowKind: "header",
        columnId: column.id,
        value: column.title ?? column.field ?? "",
        x: column.x,
        y: 0,
        width: column.width,
        height: input.headerHeight,
        style: column.style,
      })),
    },
  ];
}

export function createBodyRows(input: {
  rowsData: unknown[];
  columns: LayoutTableColumn[];
  rowHeight: number;
  startY: number;
}): LayoutTableRow[] {
  return input.rowsData.map((rowData, rowIndex) => {
    const y = input.startY + rowIndex * input.rowHeight;
    const rowId = `body_${rowIndex}`;

    return {
      id: rowId,
      kind: "body",
      index: rowIndex,
      y,
      height: input.rowHeight,
      raw: rowData,
      cells: input.columns.map((column) => {
        const value = column.field
          ? stringifyValue(getByPath(rowData, column.field))
          : "";

        return {
          id: `${rowId}_${column.id}`,
          rowId,
          rowKind: "body",
          columnId: column.id,
          value,
          x: column.x,
          y,
          width: column.width,
          height: input.rowHeight,
          style: column.style,
        };
      }),
    };
  });
}

export function createFooterRows(input: {
  footerRows: TableFooterRow[];
  columns: LayoutTableColumn[];
  data: unknown;
  startY: number;
}): LayoutTableRow[] {
  let currentY = input.startY;

  return input.footerRows.map((footerRow, rowIndex) => {
    const rowId = footerRow.id || `footer_${rowIndex}`;

    const cells: LayoutTableCell[] = input.columns.map((column) => {
      const configured = footerRow.cells.find(
        (cell) => cell.columnId === column.id,
      );

      const value =
        configured?.value ??
        (configured?.field
          ? stringifyValue(getByPath(input.data, configured.field))
          : "");

      return {
        id: `${rowId}_${column.id}`,
        rowId,
        rowKind: "footer",
        columnId: column.id,
        value,
        x: column.x,
        y: currentY,
        width: column.width,
        height: footerRow.height,
        colSpan: configured?.colSpan,
        rowSpan: configured?.rowSpan,
        style: {
          ...footerRow.style,
          ...configured?.style,
        },
      };
    });

    const row: LayoutTableRow = {
      id: rowId,
      kind: "footer",
      index: rowIndex,
      y: currentY,
      height: footerRow.height,
      cells,
      style: footerRow.style,
    };

    currentY += footerRow.height;

    return row;
  });
}
```

---

# 10. Core：Table 分页引擎

Phase 9 的重点是可控分页。

## `packages/core/src/table/paginateTableRows.ts`

```ts
import type { LayoutTableRow } from "../layout/tableTypes";

export interface PaginateTableRowsInput {
  bodyRows: LayoutTableRow[];
  pageHeight: number;
  tableStartY: number;
  headerHeight: number;
  footerHeight: number;
  repeatHeader: boolean;
  footerMode: "none" | "last-page" | "every-page";
}

export interface TablePageSlice {
  pageIndexOffset: number;
  bodyRows: LayoutTableRow[];
  startY: number;
  headerY: number;
  bodyStartY: number;
  footerY?: number;
}

export function paginateTableRows(
  input: PaginateTableRowsInput,
): TablePageSlice[] {
  const slices: TablePageSlice[] = [];

  let currentPageOffset = 0;
  let currentY = input.tableStartY;
  let bodyStartY = input.repeatHeader
    ? currentY + input.headerHeight
    : currentY;

  let currentRows: LayoutTableRow[] = [];

  function availableHeight(isLastCandidate = false): number {
    const footerReserved =
      input.footerMode === "every-page" ||
      (input.footerMode === "last-page" && isLastCandidate)
        ? input.footerHeight
        : 0;

    return input.pageHeight - bodyStartY - footerReserved;
  }

  function flush(isLast = false) {
    if (currentRows.length === 0) return;

    const footerReserved =
      input.footerMode === "every-page" ||
      (input.footerMode === "last-page" && isLast)
        ? input.footerHeight
        : 0;

    const slice: TablePageSlice = {
      pageIndexOffset: currentPageOffset,
      bodyRows: currentRows,
      startY: currentY,
      headerY: currentY,
      bodyStartY,
      footerY:
        footerReserved > 0 ? input.pageHeight - footerReserved : undefined,
    };

    slices.push(slice);

    currentPageOffset += 1;
    currentY = 0;
    bodyStartY = input.repeatHeader ? input.headerHeight : 0;
    currentRows = [];
  }

  for (let i = 0; i < input.bodyRows.length; i++) {
    const row = input.bodyRows[i]!;
    const isLastRow = i === input.bodyRows.length - 1;

    const usedHeight = currentRows.reduce((sum, item) => sum + item.height, 0);

    const canFit = usedHeight + row.height <= availableHeight(isLastRow);

    if (!canFit && currentRows.length > 0) {
      flush(false);
    }

    currentRows.push(row);
  }

  flush(true);

  if (slices.length === 0) {
    slices.push({
      pageIndexOffset: 0,
      bodyRows: [],
      startY: input.tableStartY,
      headerY: input.tableStartY,
      bodyStartY: input.tableStartY + input.headerHeight,
      footerY:
        input.footerHeight > 0
          ? input.pageHeight - input.footerHeight
          : undefined,
    });
  }

  return slices;
}
```

---

# 11. Core：增强 layoutTable

替换 Phase 3 的 `layoutTable.ts`。

## `packages/core/src/layout/layoutTable.ts`

```ts
import type { TableElement } from "../types/element";
import type { LayoutTableElement } from "./types";
import type { LayoutElementInput } from "./layoutElement";
import { normalizeYInPage, getPageIndexByY } from "./utils";
import { normalizeTableOptions } from "../table/normalizeTableOptions";
import { resolveTableData } from "../table/resolveTableData";
import { resolveTableColumns } from "../table/resolveColumns";
import {
  createBodyRows,
  createFooterRows,
  createHeaderRows,
} from "../table/createTableRows";
import { paginateTableRows } from "../table/paginateTableRows";

export function layoutTable(input: LayoutElementInput): LayoutTableElement[] {
  const { ctx, panel, element, pageIndex, pageHeight } = input;
  const tableElement = element as TableElement;

  const options = normalizeTableOptions(tableElement.options);
  const columns = resolveTableColumns(options.columns, tableElement.width);

  const headerHeight = options.header?.show ? options.header.height : 0;

  const rowHeight = options.body?.rowHeight ?? 8;

  const rowsData = resolveTableData(tableElement, ctx.data);

  const headerRows = options.header?.show
    ? createHeaderRows({
        columns,
        headerHeight,
      })
    : [];

  const bodyRows = createBodyRows({
    rowsData,
    columns,
    rowHeight,
    startY: headerHeight,
  });

  const footerRowsConfig = options.footer?.show ? options.footer.rows : [];

  const footerHeight = footerRowsConfig.reduce(
    (sum, row) => sum + row.height,
    0,
  );

  const footerRows = createFooterRows({
    footerRows: footerRowsConfig,
    columns,
    data: ctx.data,
    startY: 0,
  });

  const firstPageIndex = getPageIndexByY(tableElement.y, pageHeight);

  const tableStartY = normalizeYInPage(tableElement.y, pageHeight);

  const pagination = options.pagination;

  if (!pagination?.allowPageBreak) {
    return [
      createLayoutTableElement({
        tableElement,
        panelId: panel.id,
        pageIndex,
        tableY: tableStartY,
        columns,
        headerRows,
        bodyRows,
        footerRows,
        headerHeight,
        rowHeight,
        footerHeight,
      }),
    ];
  }

  const slices = paginateTableRows({
    bodyRows,
    pageHeight,
    tableStartY,
    headerHeight,
    footerHeight,
    repeatHeader: pagination.repeatHeader,
    footerMode: pagination.footerMode,
  });

  return slices.map((slice, sliceIndex) => {
    const isLastSlice = sliceIndex === slices.length - 1;

    const pageHeaderRows = pagination.repeatHeader
      ? offsetRows(headerRows, slice.headerY)
      : sliceIndex === 0
        ? offsetRows(headerRows, slice.headerY)
        : [];

    const pageBodyRows = offsetRows(slice.bodyRows, slice.bodyStartY);

    const shouldRenderFooter =
      pagination.footerMode === "every-page" ||
      (pagination.footerMode === "last-page" && isLastSlice);

    const pageFooterRows =
      shouldRenderFooter && typeof slice.footerY === "number"
        ? offsetRows(footerRows, slice.footerY)
        : [];

    return createLayoutTableElement({
      tableElement,
      panelId: panel.id,
      pageIndex: firstPageIndex + slice.pageIndexOffset,
      tableY: slice.startY,
      columns,
      headerRows: pageHeaderRows,
      bodyRows: pageBodyRows,
      footerRows: pageFooterRows,
      headerHeight: pageHeaderRows.reduce((sum, row) => sum + row.height, 0),
      rowHeight,
      footerHeight: pageFooterRows.reduce((sum, row) => sum + row.height, 0),
      idSuffix: `page_${sliceIndex}`,
    });
  });
}

function createLayoutTableElement(input: {
  tableElement: TableElement;
  panelId: string;
  pageIndex: number;
  tableY: number;
  columns: any[];
  headerRows: any[];
  bodyRows: any[];
  footerRows: any[];
  headerHeight: number;
  rowHeight: number;
  footerHeight: number;
  idSuffix?: string;
}): LayoutTableElement {
  const allRows = [...input.headerRows, ...input.bodyRows, ...input.footerRows];

  const height =
    allRows.length > 0
      ? Math.max(...allRows.map((row) => row.y + row.height)) - input.tableY
      : input.tableElement.height;

  return {
    id: input.idSuffix
      ? `${input.tableElement.id}__${input.idSuffix}`
      : input.tableElement.id,
    sourcePanelId: input.panelId,
    sourceElementId: input.tableElement.id,
    pageIndex: input.pageIndex,
    type: "table",
    x: input.tableElement.x,
    y: input.tableY,
    width: input.tableElement.width,
    height,
    columns: input.columns,
    headerRows: input.headerRows,
    bodyRows: input.bodyRows,
    footerRows: input.footerRows,
    rowHeight: input.rowHeight,
    headerHeight: input.headerHeight,
    footerHeight: input.footerHeight,
    hidden: input.tableElement.hidden,
    style: input.tableElement.style,
    raw: input.tableElement.raw,
  };
}

function offsetRows<T extends { y: number; cells: Array<{ y: number }> }>(
  rows: T[],
  startY: number,
): T[] {
  if (rows.length === 0) return [];

  const originalStart = rows[0]!.y;

  return rows.map((row) => {
    const dy = startY - originalStart;

    return {
      ...row,
      y: row.y + dy,
      cells: row.cells.map((cell) => ({
        ...cell,
        y: cell.y + dy,
      })),
    };
  });
}
```

---

# 12. DOM：增强 renderTable

Phase 4 的 table renderer 只支持 `rows`。现在要支持 headerRows/bodyRows/footerRows。

## `packages/dom/src/renderers/renderTable.ts`

```ts
import type {
  LayoutPage,
  LayoutTableElement,
  LayoutTableRow,
} from "@hiprint-re/core";
import type { DomRenderContext } from "../types";
import { applyElementBaseStyle } from "../style/applyElementStyle";
import { cssLength } from "../style/cssLength";

export function renderTable(
  element: LayoutTableElement,
  _page: LayoutPage,
  ctx: DomRenderContext,
): HTMLElement {
  const doc = ctx.document;
  const prefix = ctx.options.classNamePrefix;
  const unit = ctx.options.geometryUnit;

  const root = doc.createElement("div");
  root.className = `${prefix}-element ${prefix}-table`;
  root.dataset.elementId = element.id;
  root.dataset.elementType = element.type;

  applyElementBaseStyle(root, element, ctx);

  renderRows(root, element.headerRows, element, ctx, "header");
  renderRows(root, element.bodyRows, element, ctx, "body");
  renderRows(root, element.footerRows, element, ctx, "footer");

  root.style.borderCollapse = "collapse";

  return root;
}

function renderRows(
  root: HTMLElement,
  rows: LayoutTableRow[],
  table: LayoutTableElement,
  ctx: DomRenderContext,
  kind: "header" | "body" | "footer",
): void {
  const doc = ctx.document;
  const prefix = ctx.options.classNamePrefix;
  const unit = ctx.options.geometryUnit;

  for (const row of rows) {
    for (const cell of row.cells) {
      if (cell.hidden) continue;

      const cellDom = doc.createElement("div");

      cellDom.className = [
        `${prefix}-table-cell`,
        `${prefix}-table-${kind}-cell`,
      ].join(" ");

      cellDom.style.left = cssLength(cell.x, unit);
      cellDom.style.top = cssLength(cell.y - table.y, unit);
      cellDom.style.width = cssLength(cell.width, unit);
      cellDom.style.height = cssLength(cell.height, unit);
      cellDom.style.lineHeight = cssLength(cell.height, unit);

      if (cell.style?.textAlign) {
        cellDom.style.textAlign = String(cell.style.textAlign);
      }

      cellDom.textContent = cell.value;

      root.appendChild(cellDom);
    }
  }
}
```

CSS 补充：

```css
.hiprint-re-table-footer-cell {
  font-weight: 600;
  background: #f9fafb;
}

.hiprint-re-table-header-cell {
  font-weight: 600;
  background: #f3f4f6;
}
```

---

# 13. designer-core：Table Commands

新增目录：

```txt
packages/designer-core/src/table/
├─ tableUtils.ts
└─ commands/
   ├─ addTableColumn.ts
   ├─ removeTableColumn.ts
   ├─ updateTableColumn.ts
   ├─ reorderTableColumn.ts
   ├─ updateTableOptions.ts
   └─ addTableFooterRow.ts
```

---

## `packages/designer-core/src/table/tableUtils.ts`

```ts
import type {
  PrintElement,
  TableElement,
  TableElementOptions,
  TableColumn,
} from "@hiprint-re/core";
import { normalizeTableOptions } from "@hiprint-re/core";

export function isTableElement(
  element: PrintElement | undefined,
): element is TableElement {
  return Boolean(element && element.type === "table");
}

export function getTableOptions(element: TableElement): TableElementOptions {
  return normalizeTableOptions(element.options);
}

export function updateTableOptions(
  element: TableElement,
  updater: (options: TableElementOptions) => TableElementOptions,
): TableElement {
  const options = getTableOptions(element);

  return {
    ...element,
    options: updater(options),
  };
}

export function createTableColumn(
  input: Partial<TableColumn> = {},
): TableColumn {
  return {
    id: input.id ?? `col_${Math.random().toString(36).slice(2, 8)}`,
    title: input.title ?? "Column",
    field: input.field ?? "",
    width: input.width ?? 40,
    align: input.align ?? "left",
    visible: input.visible ?? true,
    ...input,
  };
}
```

---

## `addTableColumn.ts`

```ts
import type { TableColumn } from "@hiprint-re/core";
import type { DesignerCommand } from "../../command/types";
import { updateElementById } from "../../command/commands/utils";
import {
  createTableColumn,
  isTableElement,
  updateTableOptions,
} from "../tableUtils";

export interface AddTableColumnCommandInput {
  tableId: string;
  column?: Partial<TableColumn>;
  index?: number;
}

export function createAddTableColumnCommand(
  input: AddTableColumnCommandInput,
): DesignerCommand {
  return {
    id: "table.column.add",
    name: "Add Table Column",
    history: true,

    execute(state) {
      return {
        ...state,
        template: updateElementById(
          state.template,
          input.tableId,
          (element) => {
            if (!isTableElement(element)) return element;

            return updateTableOptions(element, (options) => {
              const nextColumn = createTableColumn(input.column);
              const columns = [...options.columns];
              const index = input.index ?? columns.length;

              columns.splice(index, 0, nextColumn);

              return {
                ...options,
                columns,
              };
            });
          },
        ),
      };
    },
  };
}
```

---

## `removeTableColumn.ts`

```ts
import type { DesignerCommand } from "../../command/types";
import { updateElementById } from "../../command/commands/utils";
import { isTableElement, updateTableOptions } from "../tableUtils";

export interface RemoveTableColumnCommandInput {
  tableId: string;
  columnId: string;
}

export function createRemoveTableColumnCommand(
  input: RemoveTableColumnCommandInput,
): DesignerCommand {
  return {
    id: "table.column.remove",
    name: "Remove Table Column",
    history: true,

    execute(state) {
      return {
        ...state,
        template: updateElementById(
          state.template,
          input.tableId,
          (element) => {
            if (!isTableElement(element)) return element;

            return updateTableOptions(element, (options) => ({
              ...options,
              columns: options.columns.filter(
                (column) => column.id !== input.columnId,
              ),
            }));
          },
        ),
      };
    },
  };
}
```

---

## `updateTableColumn.ts`

```ts
import type { TableColumn } from "@hiprint-re/core";
import type { DesignerCommand } from "../../command/types";
import { updateElementById } from "../../command/commands/utils";
import { isTableElement, updateTableOptions } from "../tableUtils";

export interface UpdateTableColumnCommandInput {
  tableId: string;
  columnId: string;
  patch: Partial<TableColumn>;
}

export function createUpdateTableColumnCommand(
  input: UpdateTableColumnCommandInput,
): DesignerCommand {
  return {
    id: "table.column.update",
    name: "Update Table Column",
    history: true,

    execute(state) {
      return {
        ...state,
        template: updateElementById(
          state.template,
          input.tableId,
          (element) => {
            if (!isTableElement(element)) return element;

            return updateTableOptions(element, (options) => ({
              ...options,
              columns: options.columns.map((column) =>
                column.id === input.columnId
                  ? {
                      ...column,
                      ...input.patch,
                    }
                  : column,
              ),
            }));
          },
        ),
      };
    },
  };
}
```

---

## `reorderTableColumn.ts`

```ts
import type { DesignerCommand } from "../../command/types";
import { updateElementById } from "../../command/commands/utils";
import { isTableElement, updateTableOptions } from "../tableUtils";

export interface ReorderTableColumnCommandInput {
  tableId: string;
  fromIndex: number;
  toIndex: number;
}

export function createReorderTableColumnCommand(
  input: ReorderTableColumnCommandInput,
): DesignerCommand {
  return {
    id: "table.column.reorder",
    name: "Reorder Table Column",
    history: true,

    execute(state) {
      return {
        ...state,
        template: updateElementById(
          state.template,
          input.tableId,
          (element) => {
            if (!isTableElement(element)) return element;

            return updateTableOptions(element, (options) => {
              const columns = [...options.columns];
              const [column] = columns.splice(input.fromIndex, 1);

              if (!column) return options;

              columns.splice(input.toIndex, 0, column);

              return {
                ...options,
                columns,
              };
            });
          },
        ),
      };
    },
  };
}
```

---

## `updateTableOptions.ts`

```ts
import type { TableElementOptions } from "@hiprint-re/core";
import type { DesignerCommand } from "../../command/types";
import { updateElementById } from "../../command/commands/utils";
import { isTableElement, updateTableOptions } from "../tableUtils";

export interface UpdateTableOptionsCommandInput {
  tableId: string;
  patch: Partial<TableElementOptions>;
}

export function createUpdateTableOptionsCommand(
  input: UpdateTableOptionsCommandInput,
): DesignerCommand {
  return {
    id: "table.options.update",
    name: "Update Table Options",
    history: true,

    execute(state) {
      return {
        ...state,
        template: updateElementById(
          state.template,
          input.tableId,
          (element) => {
            if (!isTableElement(element)) return element;

            return updateTableOptions(element, (options) => ({
              ...options,
              ...input.patch,
              header: {
                ...options.header,
                ...input.patch.header,
              },
              body: {
                ...options.body,
                ...input.patch.body,
              },
              footer: {
                ...options.footer,
                ...input.patch.footer,
              },
              pagination: {
                ...options.pagination,
                ...input.patch.pagination,
              },
              border: {
                ...options.border,
                ...input.patch.border,
              },
            }));
          },
        ),
      };
    },
  };
}
```

---

# 14. designer-react：TablePropertyPanel

Phase 8 的 DynamicPropertyPanel 对普通字段很好，但 table 需要专门 UI。
做法：如果选中元素是 table，就渲染 `TablePropertyPanel`，否则渲染 DynamicPropertyPanel。

## `packages/designer-react/src/components/PropertyPanel.tsx`

```tsx
import { getElementById } from "@hiprint-re/designer-core";
import { useDesignerState } from "../hooks/useDesignerState";
import { DynamicPropertyPanel } from "./DynamicPropertyPanel";
import { TablePropertyPanel } from "./table/TablePropertyPanel";

export function PropertyPanel() {
  const state = useDesignerState();
  const activeId = state.selection.activeId;
  const element = activeId ? getElementById(state, activeId) : undefined;

  if (element?.type === "table") {
    return <TablePropertyPanel elementId={element.id} />;
  }

  return <DynamicPropertyPanel />;
}
```

---

## `packages/designer-react/src/components/table/TablePropertyPanel.tsx`

```tsx
import { getElementById } from "@hiprint-re/designer-core";
import { normalizeTableOptions } from "@hiprint-re/core";
import { useDesignerState } from "../../hooks/useDesignerState";
import { TableColumnEditor } from "./TableColumnEditor";
import { TableGeneralEditor } from "./TableGeneralEditor";
import { TableFooterEditor } from "./TableFooterEditor";

export interface TablePropertyPanelProps {
  elementId: string;
}

export function TablePropertyPanel(props: TablePropertyPanelProps) {
  const state = useDesignerState();
  const element = getElementById(state, props.elementId);

  if (!element || element.type !== "table") {
    return null;
  }

  const options = normalizeTableOptions(element.options);

  return (
    <div className="hiprint-designer-panel">
      <div className="hiprint-designer-panel-title">Table Properties</div>

      <TableGeneralEditor tableId={element.id} options={options} />

      <TableColumnEditor tableId={element.id} columns={options.columns} />

      <TableFooterEditor tableId={element.id} options={options} />
    </div>
  );
}
```

---

# 15. TableGeneralEditor

## `packages/designer-react/src/components/table/TableGeneralEditor.tsx`

```tsx
import type { TableElementOptions } from "@hiprint-re/core";
import { createUpdateTableOptionsCommand } from "@hiprint-re/designer-core";
import { useDesignerContext } from "../../context/useDesignerContext";

export interface TableGeneralEditorProps {
  tableId: string;
  options: TableElementOptions;
}

export function TableGeneralEditor(props: TableGeneralEditorProps) {
  const { store, onChange } = useDesignerContext();

  function update(patch: Partial<TableElementOptions>) {
    store.dispatch(
      createUpdateTableOptionsCommand({
        tableId: props.tableId,
        patch,
      }),
    );

    onChange?.(store.getStateRef().template);
  }

  return (
    <div className="hiprint-designer-property-group">
      <div className="hiprint-designer-property-group-title">General</div>

      <label className="hiprint-designer-field">
        <span>Data Field</span>
        <input
          value={props.options.dataField ?? ""}
          onChange={(event) =>
            update({
              dataField: event.target.value,
            })
          }
        />
      </label>

      <label className="hiprint-designer-field is-checkbox">
        <span>Show Header</span>
        <input
          type="checkbox"
          checked={props.options.header?.show ?? true}
          onChange={(event) =>
            update({
              header: {
                ...props.options.header,
                show: event.target.checked,
              },
            })
          }
        />
      </label>

      <label className="hiprint-designer-field is-checkbox">
        <span>Repeat Header</span>
        <input
          type="checkbox"
          checked={props.options.pagination?.repeatHeader ?? true}
          onChange={(event) =>
            update({
              pagination: {
                ...props.options.pagination,
                repeatHeader: event.target.checked,
              },
            })
          }
        />
      </label>

      <label className="hiprint-designer-field">
        <span>Row Height</span>
        <input
          type="number"
          value={props.options.body?.rowHeight ?? 8}
          onChange={(event) =>
            update({
              body: {
                ...props.options.body,
                rowHeight: Number(event.target.value),
              },
            })
          }
        />
      </label>

      <label className="hiprint-designer-field">
        <span>Footer Mode</span>
        <select
          value={props.options.pagination?.footerMode ?? "last-page"}
          onChange={(event) =>
            update({
              pagination: {
                ...props.options.pagination,
                footerMode: event.target.value as any,
              },
            })
          }
        >
          <option value="none">None</option>
          <option value="last-page">Last Page</option>
          <option value="every-page">Every Page</option>
        </select>
      </label>
    </div>
  );
}
```

---

# 16. TableColumnEditor

## `packages/designer-react/src/components/table/TableColumnEditor.tsx`

```tsx
import type { TableColumn } from "@hiprint-re/core";
import {
  createAddTableColumnCommand,
  createRemoveTableColumnCommand,
  createUpdateTableColumnCommand,
} from "@hiprint-re/designer-core";
import { useDesignerContext } from "../../context/useDesignerContext";

export interface TableColumnEditorProps {
  tableId: string;
  columns: TableColumn[];
}

export function TableColumnEditor(props: TableColumnEditorProps) {
  const { store, onChange } = useDesignerContext();

  function emitChange() {
    onChange?.(store.getStateRef().template);
  }

  function addColumn() {
    store.dispatch(
      createAddTableColumnCommand({
        tableId: props.tableId,
        column: {
          title: "Column",
          field: "",
          width: 40,
        },
      }),
    );
    emitChange();
  }

  function removeColumn(columnId: string) {
    store.dispatch(
      createRemoveTableColumnCommand({
        tableId: props.tableId,
        columnId,
      }),
    );
    emitChange();
  }

  function updateColumn(columnId: string, patch: Partial<TableColumn>) {
    store.dispatch(
      createUpdateTableColumnCommand({
        tableId: props.tableId,
        columnId,
        patch,
      }),
    );
    emitChange();
  }

  return (
    <div className="hiprint-designer-property-group">
      <div className="hiprint-designer-property-group-title">Columns</div>

      <div className="hiprint-table-column-editor">
        {props.columns.map((column) => (
          <div key={column.id} className="hiprint-table-column-item">
            <label>
              <span>Title</span>
              <input
                value={column.title ?? ""}
                onChange={(event) =>
                  updateColumn(column.id, {
                    title: event.target.value,
                  })
                }
              />
            </label>

            <label>
              <span>Field</span>
              <input
                value={column.field ?? ""}
                onChange={(event) =>
                  updateColumn(column.id, {
                    field: event.target.value,
                  })
                }
              />
            </label>

            <label>
              <span>Width</span>
              <input
                type="number"
                value={column.width ?? 40}
                onChange={(event) =>
                  updateColumn(column.id, {
                    width: Number(event.target.value),
                  })
                }
              />
            </label>

            <label>
              <span>Align</span>
              <select
                value={column.align ?? "left"}
                onChange={(event) =>
                  updateColumn(column.id, {
                    align: event.target.value as any,
                  })
                }
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </label>

            <button onClick={() => removeColumn(column.id)}>Remove</button>
          </div>
        ))}

        <button className="hiprint-table-add-column" onClick={addColumn}>
          Add Column
        </button>
      </div>
    </div>
  );
}
```

---

# 17. TableFooterEditor

## `packages/designer-react/src/components/table/TableFooterEditor.tsx`

```tsx
import type { TableElementOptions, TableFooterRow } from "@hiprint-re/core";
import { createUpdateTableOptionsCommand } from "@hiprint-re/designer-core";
import { useDesignerContext } from "../../context/useDesignerContext";

export interface TableFooterEditorProps {
  tableId: string;
  options: TableElementOptions;
}

export function TableFooterEditor(props: TableFooterEditorProps) {
  const { store, onChange } = useDesignerContext();

  function updateFooter(rows: TableFooterRow[]) {
    store.dispatch(
      createUpdateTableOptionsCommand({
        tableId: props.tableId,
        patch: {
          footer: {
            ...props.options.footer,
            show: rows.length > 0,
            rows,
          },
        },
      }),
    );

    onChange?.(store.getStateRef().template);
  }

  function addFooterRow() {
    const columns = props.options.columns;
    const row: TableFooterRow = {
      id: `footer_${Math.random().toString(36).slice(2, 8)}`,
      height: 8,
      cells: columns.map((column, index) => ({
        id: `footer_cell_${column.id}`,
        columnId: column.id,
        value: index === 0 ? "Total" : "",
      })),
    };

    updateFooter([...(props.options.footer?.rows ?? []), row]);
  }

  function updateCell(rowId: string, columnId: string, value: string) {
    const rows = (props.options.footer?.rows ?? []).map((row) => {
      if (row.id !== rowId) return row;

      return {
        ...row,
        cells: row.cells.map((cell) =>
          cell.columnId === columnId
            ? {
                ...cell,
                value,
              }
            : cell,
        ),
      };
    });

    updateFooter(rows);
  }

  return (
    <div className="hiprint-designer-property-group">
      <div className="hiprint-designer-property-group-title">Footer</div>

      {(props.options.footer?.rows ?? []).map((row) => (
        <div key={row.id} className="hiprint-table-footer-row">
          {row.cells.map((cell) => (
            <label key={cell.columnId}>
              <span>{cell.columnId}</span>
              <input
                value={cell.value ?? ""}
                onChange={(event) =>
                  updateCell(row.id, cell.columnId, event.target.value)
                }
              />
            </label>
          ))}
        </div>
      ))}

      <button onClick={addFooterRow}>Add Footer Row</button>
    </div>
  );
}
```

---

# 18. 样式补充

```css
.hiprint-table-column-editor {
  display: grid;
  gap: 10px;
  padding: 8px 12px 12px;
}

.hiprint-table-column-item {
  display: grid;
  gap: 6px;
  padding: 8px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
}

.hiprint-table-column-item label {
  display: grid;
  gap: 4px;
  font-size: 12px;
}

.hiprint-table-column-item input,
.hiprint-table-column-item select {
  height: 28px;
  padding: 0 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
}

.hiprint-table-add-column {
  height: 32px;
  border: 1px dashed #9ca3af;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
}

.hiprint-table-footer-row {
  display: grid;
  gap: 6px;
  padding: 8px 12px;
}
```

---

# 19. Fixture：复杂表格模板

新增：

```txt
fixtures/templates/table-advanced.json
fixtures/data/table-advanced.data.json
```

## `fixtures/data/table-advanced.data.json`

```json
{
  "orderNo": "NO-20260601-001",
  "customer": {
    "name": "张三"
  },
  "items": [
    {
      "name": "苹果",
      "quantity": 2,
      "price": 10,
      "amount": 20
    },
    {
      "name": "香蕉",
      "quantity": 3,
      "price": 8,
      "amount": 24
    },
    {
      "name": "橙子",
      "quantity": 5,
      "price": 6,
      "amount": 30
    }
  ],
  "totalAmount": 74
}
```

---

# 20. 测试设计

新增：

```txt
tests/core/table/
├─ normalizeTableOptions.test.ts
├─ resolveColumns.test.ts
├─ paginateTableRows.test.ts
├─ layoutTableAdvanced.test.ts

tests/designer-core/table/
├─ addTableColumn.test.ts
├─ updateTableColumn.test.ts
├─ removeTableColumn.test.ts

tests/designer-react/table/
├─ TableColumnEditor.test.tsx
├─ TablePropertyPanel.test.tsx
```

---

## `tests/core/table/resolveColumns.test.ts`

```ts
import { describe, expect, it } from "vitest";
import { resolveTableColumns } from "../../../packages/core/src/table/resolveColumns";

describe("resolveTableColumns", () => {
  it("should resolve explicit and fallback widths", () => {
    const columns = resolveTableColumns(
      [
        {
          id: "name",
          title: "Name",
          width: 50,
        },
        {
          id: "amount",
          title: "Amount",
        },
      ],
      100,
    );

    expect(columns[0]?.width).toBe(50);
    expect(columns[1]?.width).toBe(50);
    expect(columns[1]?.x).toBe(50);
  });
});
```

---

## `tests/core/table/paginateTableRows.test.ts`

```ts
import { describe, expect, it } from "vitest";
import { paginateTableRows } from "../../../packages/core/src/table/paginateTableRows";

describe("paginateTableRows", () => {
  it("should split rows into pages", () => {
    const rows = Array.from({ length: 20 }).map((_, index) => ({
      id: `row_${index}`,
      kind: "body" as const,
      index,
      y: index * 10,
      height: 10,
      cells: [],
    }));

    const slices = paginateTableRows({
      bodyRows: rows,
      pageHeight: 100,
      tableStartY: 0,
      headerHeight: 10,
      footerHeight: 0,
      repeatHeader: true,
      footerMode: "none",
    });

    expect(slices.length).toBeGreaterThan(1);
    expect(slices[0]?.bodyRows.length).toBe(9);
  });
});
```

---

## `tests/designer-core/table/addTableColumn.test.ts`

```ts
import { describe, expect, it } from "vitest";
import {
  createAddElementCommand,
  createDesignerStore,
  createAddTableColumnCommand,
  getElementById,
} from "../../../packages/designer-core/src";
import { createEmptyTemplate } from "../../../packages/core/src";

describe("createAddTableColumnCommand", () => {
  it("should add table column", () => {
    const template = createEmptyTemplate();
    const panelId = template.panels[0]!.id;
    const store = createDesignerStore({ template });

    store.dispatch(
      createAddElementCommand({
        panelId,
        element: {
          id: "table_1",
          type: "table",
          x: 0,
          y: 0,
          width: 100,
          height: 40,
          options: {
            dataField: "items",
            columns: [],
          },
        },
      }),
    );

    store.dispatch(
      createAddTableColumnCommand({
        tableId: "table_1",
        column: {
          title: "Name",
          field: "name",
          width: 50,
        },
      }),
    );

    const table = getElementById(store.getState(), "table_1") as any;

    expect(table.options.columns).toHaveLength(1);
    expect(table.options.columns[0].field).toBe("name");
  });
});
```

---

# 21. 文档

## `docs/phase-9.md`

````md
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

```txt
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
````

````

---

## `docs/table-schema.md`

```md
# Table Schema

## TableElementOptions

```ts
interface TableElementOptions {
  dataField?: string
  columns: TableColumn[]
  header?: TableHeaderOptions
  body?: TableBodyOptions
  footer?: TableFooterOptions
  pagination?: TablePaginationOptions
  merges?: TableMergeCell[]
  border?: TableBorderOptions
}
````

## Column

```ts
interface TableColumn {
  id: string;
  field?: string;
  title?: string;
  width?: number;
  align?: "left" | "center" | "right";
}
```

## Pagination

```ts
interface TablePaginationOptions {
  repeatHeader: boolean;
  footerMode: "none" | "last-page" | "every-page";
  rowBreakMode: "avoid" | "split";
  allowPageBreak: boolean;
}
```

````

---

# 22. Phase 9 验收标准

Phase 9 完成后，应满足：

```txt
1. core 有增强版 TableElementOptions
2. 支持 normalizeTableOptions
3. 支持 resolveTableColumns
4. 支持 header/body/footer rows
5. 支持 table pagination
6. 支持 repeatHeader
7. 支持 footerMode
8. layoutTable 可以输出多个 LayoutTableElement
9. dom renderTable 支持 header/body/footer
10. designer-core 支持 add/remove/update/reorder column
11. designer-core 支持 update table options
12. designer-react 有 TablePropertyPanel
13. designer-react 有 TableColumnEditor
14. designer-react 有 TableFooterEditor
15. 复杂表格 fixture 可预览
16. table snapshot tests 通过
17. docs/phase-9.md 完成
18. docs/table-schema.md 完成
````

---

# 23. 推荐 PR 拆分

## PR 1：Table schema

```txt
feat(core): enhance table schema
```

内容：

```txt
types/table
table/defaults
table/normalizeTableOptions
table/resolveColumns
```

---

## PR 2：Table layout

```txt
feat(core): add advanced table layout pagination
```

内容：

```txt
createTableRows
paginateTableRows
layoutTable
layout table snapshot tests
```

---

## PR 3：DOM table renderer

```txt
feat(dom): render table header body and footer sections
```

---

## PR 4：Designer table commands

```txt
feat(designer-core): add table editing commands
```

---

## PR 5：React table editor

```txt
feat(designer-react): add table property and column editor
```

---

## PR 6：fixtures + docs

```txt
test(table): add advanced table fixtures
docs(table): document table schema and editor
```

---

# 24. Phase 9 最小 TODO

```txt
[ ] 新增 core/types/table.ts
[ ] 更新 core/types/element.ts 的 TableElementOptions
[ ] 新增 table/defaults.ts
[ ] 新增 normalizeTableOptions
[ ] 新增 resolveTableData
[ ] 新增 resolveTableColumns
[ ] 新增 createTableRows
[ ] 新增 paginateTableRows
[ ] 重写 layoutTable
[ ] 更新 LayoutTableElement 类型
[ ] 更新 dom renderTable
[ ] 新增 designer-core tableUtils
[ ] 新增 addTableColumn command
[ ] 新增 removeTableColumn command
[ ] 新增 updateTableColumn command
[ ] 新增 reorderTableColumn command
[ ] 新增 updateTableOptions command
[ ] designer-react 新增 TablePropertyPanel
[ ] designer-react 新增 TableGeneralEditor
[ ] designer-react 新增 TableColumnEditor
[ ] designer-react 新增 TableFooterEditor
[ ] 新增 table-advanced fixtures
[ ] 新增 table tests
[ ] 新增 docs/phase-9.md
[ ] 新增 docs/table-schema.md
```

---

# 25. 关键风险点

## 1. 不要把表格编辑做成 Excel

Phase 9 是打印表格，不是在线 spreadsheet。

优先保证：

```txt
列配置
数据绑定
分页
表头重复
footer
打印稳定
```

复杂交互后面再加。

---

## 2. layoutTable 不要依赖 DOM

表格布局仍然必须在 core 里完成，而且不能依赖：

```txt
document
window
canvas
React
Vue
```

自动行高可以先用估算，精确测量后面通过注入 `TextMeasurer`。

---

## 3. 跨页表格要保证输出稳定

一份数据生成多个 `LayoutTableElement` 时，ID 要稳定：

```txt
table_1__page_0
table_1__page_1
table_1__page_2
```

这样 DOM diff、测试 snapshot、设计器 overlay 都更容易处理。

---

## 4. footerMode 要先简单

Phase 9 只做：

```txt
none
last-page
every-page
```

不要一开始做复杂分组 footer。

---

# 26. 最终判断

Phase 9 的本质是：

```txt
让设计器真正支持业务打印模板中最核心的表格场景
```

做到 Phase 9 后，你的项目会从：

```txt
能设计普通元素
```

升级到：

```txt
能设计订单/明细/清单类模板
```

这是打印设计器从 demo 走向可用产品的关键阶段。

后续建议路线：

```txt
Phase 10：Plugin System / Custom Elements / barcode / qrcode
Phase 11：PDF / Canvas / SVG Renderer
Phase 12：模板市场 / 本地模板管理 / 云同步
```
