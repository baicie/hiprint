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

    const usedHeight = currentRows.reduce((sum, item) => sum + item.height, 0);
    const canFit = usedHeight + row.height <= availableHeight(false);

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
