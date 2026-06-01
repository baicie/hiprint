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
import type { TableBorderOptions } from "../types/table";

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
        border: options.border,
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
      border: options.border,
      idSuffix: `page_${sliceIndex}`,
    });
  });
}

function createLayoutTableElement(input: {
  tableElement: TableElement;
  panelId: string;
  pageIndex: number;
  tableY: number;
  columns: ReturnType<typeof resolveTableColumns>;
  headerRows: ReturnType<typeof createHeaderRows>;
  bodyRows: ReturnType<typeof createBodyRows>;
  footerRows: ReturnType<typeof createFooterRows>;
  headerHeight: number;
  rowHeight: number;
  footerHeight: number;
  border?: TableBorderOptions;
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
    border: input.border,
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
