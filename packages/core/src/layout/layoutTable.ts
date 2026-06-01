import type { TableColumn, TableElement } from "../types/element";
import type {
  LayoutTableCell,
  LayoutTableColumn,
  LayoutTableElement,
  LayoutTableRow,
} from "./types";
import type { LayoutElementInput } from "./layoutElement";
import { getByPath, stringifyValue } from "./resolveBinding";
import { normalizeYInPage, getPageIndexByY, safeNumber } from "./utils";

export function layoutTable(input: LayoutElementInput): LayoutTableElement[] {
  const { ctx, panel, element, pageHeight } = input;
  const tableElement = element as TableElement;

  const columns = normalizeColumns(
    (tableElement.options?.columns as TableColumn[]) ?? [],
    tableElement.width,
  );

  const rowsData = resolveTableData(tableElement, ctx.data);

  const headerHeight = safeNumber(tableElement.options?.headerHeight, 8);
  const rowHeight = safeNumber(tableElement.options?.rowHeight, 8);
  const showHeader = tableElement.options?.showHeader ?? true;

  const startY = tableElement.y;
  const firstPageIndex = getPageIndexByY(startY, pageHeight);

  const result: LayoutTableElement[] = [];

  let currentPageIndex = firstPageIndex;
  let currentY = normalizeYInPage(startY, pageHeight);

  if (showHeader && currentY + headerHeight > pageHeight) {
    currentPageIndex += 1;
    currentY = 0;
  }

  let headerPlaced = false;

  let currentRows: LayoutTableRow[] = [];
  let currentTableY = currentY;

  const startNewPage = () => {
    flush();
    currentPageIndex += 1;
    currentY = 0;
    currentTableY = 0;
    headerPlaced = false;
  };

  const tryPlaceHeader = (): boolean => {
    if (!showHeader) {
      headerPlaced = true;
      return true;
    }
    if (currentY + headerHeight > pageHeight) {
      startNewPage();
      return false;
    }
    headerPlaced = true;
    return true;
  };

  const flush = () => {
    if (currentRows.length === 0) return;

    const tableHeight =
      (showHeader ? headerHeight : 0) +
      currentRows.reduce((sum, row) => sum + row.height, 0);

    result.push({
      id: `${tableElement.id}__page_${currentPageIndex}`,
      sourcePanelId: panel.id,
      sourceElementId: tableElement.id,
      pageIndex: currentPageIndex,
      type: "table",
      x: tableElement.x,
      y: currentTableY,
      width: tableElement.width,
      height: tableHeight,
      columns,
      rows: currentRows,
      headerHeight: showHeader ? headerHeight : 0,
      rowHeight,
      hidden: tableElement.hidden,
      style: tableElement.style,
      raw: tableElement.raw,
    });

    currentRows = [];
  };

  for (let rowIndex = 0; rowIndex < rowsData.length; rowIndex++) {
    if (!headerPlaced) {
      if (!tryPlaceHeader()) continue;
    }

    const rowY =
      currentRows.length === 0
        ? currentY + (showHeader ? headerHeight : 0)
        : currentRows[currentRows.length - 1]!.y + rowHeight;

    if (rowY + rowHeight > pageHeight) {
      startNewPage();
    }

    const row = createLayoutRow({
      rowIndex,
      rowData: rowsData[rowIndex],
      columns,
      rowY,
      rowHeight,
    });

    currentRows.push(row);
  }

  flush();

  if (result.length === 0) {
    result.push({
      id: `${tableElement.id}__page_${firstPageIndex}`,
      sourcePanelId: panel.id,
      sourceElementId: tableElement.id,
      pageIndex: firstPageIndex,
      type: "table",
      x: tableElement.x,
      y: normalizeYInPage(tableElement.y, pageHeight),
      width: tableElement.width,
      height: showHeader ? headerHeight : 0,
      columns,
      rows: [],
      headerHeight: showHeader ? headerHeight : 0,
      rowHeight,
      hidden: tableElement.hidden,
      style: tableElement.style,
      raw: tableElement.raw,
    });
  }

  return result;
}

function normalizeColumns(
  columns: TableColumn[],
  tableWidth: number,
): LayoutTableColumn[] {
  if (!columns.length) return [];

  const explicitWidth = columns.reduce((sum, column) => {
    return sum + (typeof column.width === "number" ? column.width : 0);
  }, 0);

  const missingWidthColumns = columns.filter(
    (column) => typeof column.width !== "number",
  );

  const fallbackWidth =
    missingWidthColumns.length > 0
      ? Math.max(0, tableWidth - explicitWidth) / missingWidthColumns.length
      : 0;

  let x = 0;

  return columns.map((column) => {
    const width =
      typeof column.width === "number" ? column.width : fallbackWidth;

    const result: LayoutTableColumn = {
      id: column.id,
      field: column.field,
      title: column.title,
      x,
      width,
    };

    x += width;

    return result;
  });
}

function resolveTableData(element: TableElement, data: unknown): unknown[] {
  const dataField =
    (element.options?.dataField as string) ?? element.binding?.field;

  if (!dataField) return [];

  const value = getByPath(data, dataField);

  return Array.isArray(value) ? value : [];
}

function createLayoutRow(input: {
  rowIndex: number;
  rowData: unknown;
  columns: LayoutTableColumn[];
  rowY: number;
  rowHeight: number;
}): LayoutTableRow {
  const cells: LayoutTableCell[] = input.columns.map((column) => {
    const value = column.field
      ? stringifyValue(getByPath(input.rowData, column.field))
      : "";

    return {
      columnId: column.id,
      value,
      x: column.x,
      y: input.rowY,
      width: column.width,
      height: input.rowHeight,
    };
  });

  return {
    index: input.rowIndex,
    y: input.rowY,
    height: input.rowHeight,
    cells,
    raw: input.rowData,
  };
}
