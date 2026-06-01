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
   * Repeats table header on each page when the table spans multiple pages.
   */
  repeatHeader: boolean;

  /**
   * Controls when the footer row is displayed.
   * - "none": footer is never shown
   * - "last-page": footer is shown only on the last page
   * - "every-page": footer is shown on every page
   */
  footerMode: "none" | "last-page" | "every-page";

  /**
   * How to handle a single row that exceeds the remaining page space.
   * - "avoid": prefer moving the row to the next page (default)
   * - "split": allow the row to be split across pages (future)
   */
  rowBreakMode: "avoid" | "split";

  /**
   * Whether the table is allowed to span across multiple pages.
   * When false, the entire table is placed on one page.
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
