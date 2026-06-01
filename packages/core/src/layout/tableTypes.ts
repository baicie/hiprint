import type { PrintStyle } from "../types/style";
import type { TableRowKind } from "../types/table";

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
