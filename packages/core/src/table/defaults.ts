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
