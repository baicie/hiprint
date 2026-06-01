import type {
  LayoutTableElement,
  LayoutTableRow,
} from "@hiprint-re/core";

export function getAllTableRows(
  table: LayoutTableElement,
): LayoutTableRow[] {
  return [
    ...table.headerRows,
    ...table.bodyRows,
    ...table.footerRows,
  ];
}
