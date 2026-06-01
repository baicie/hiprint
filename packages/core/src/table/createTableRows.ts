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
        rowKind: "header" as const,
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
      kind: "body" as const,
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
          rowKind: "body" as const,
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
        rowKind: "footer" as const,
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
      kind: "footer" as const,
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
