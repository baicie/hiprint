import type { Unit } from "../types/common";
import type { PrintElementType } from "../types/element";
import type { PrintTemplate } from "../types/template";

export interface LayoutOptions {
  /**
   * Output layout unit. Defaults to mm.
   */
  unit?: Unit;

  /**
   * DPI used for mm <-> px conversion. Defaults to 96.
   */
  dpi?: number;

  /**
   * Whether elements are allowed to overflow page bounds.
   * When false, generates warnings but does not throw.
   */
  allowOverflow?: boolean;

  /**
   * Custom text measurement function.
   * When not provided, core uses an internal estimator.
   */
  measureText?: TextMeasurer;
}

export interface LayoutContext {
  template: PrintTemplate;
  data: unknown;
  unit: Unit;
  dpi: number;
  allowOverflow: boolean;
  measureText: TextMeasurer;
  warnings: LayoutWarning[];
}

export interface TextMeasurer {
  measure(input: MeasureTextInput): MeasureTextResult;
}

export interface MeasureTextInput {
  text: string;
  fontSize: number;
  fontFamily?: string;
  fontWeight?: string | number;
  lineHeight?: number;
  maxWidth?: number;
  unit: Unit;
}

export interface MeasureTextResult {
  width: number;
  height: number;
  lines: string[];
  lineHeight: number;
}

export interface LayoutDocument {
  unit: Unit;
  width: number;
  height: number;
  pages: LayoutPage[];
  warnings: LayoutWarning[];
}

export interface LayoutPage {
  index: number;
  width: number;
  height: number;
  elements: LayoutElement[];
}

export interface LayoutWarning {
  code: string;
  level: "warning" | "error";
  message: string;
  path?: string;
  elementId?: string;
}

export interface LayoutRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface LayoutElementBase extends LayoutRect {
  id: string;
  type: PrintElementType;
  sourcePanelId: string;
  sourceElementId: string;
  pageIndex: number;
  hidden?: boolean;
  style?: Record<string, unknown>;
  raw?: Record<string, unknown>;
}

export interface LayoutTextElement extends LayoutElementBase {
  type: "text";
  value: string;
  lines: string[];
  fontSize: number;
  lineHeight: number;
}

export interface LayoutImageElement extends LayoutElementBase {
  type: "image";
  src?: string;
  objectFit?: "contain" | "cover" | "fill";
}

export interface LayoutLineElement extends LayoutElementBase {
  type: "line";
  direction: "horizontal" | "vertical";
}

export interface LayoutRectElement extends LayoutElementBase {
  type: "rect";
  radius?: number;
}

import type { LayoutTableColumn, LayoutTableRow } from "./tableTypes";
import type { TableBorderOptions } from "../types/table";

export * from "./tableTypes";

export interface LayoutTableElement extends LayoutElementBase {
  type: "table";
  columns: LayoutTableColumn[];
  headerRows: LayoutTableRow[];
  bodyRows: LayoutTableRow[];
  footerRows: LayoutTableRow[];
  rowHeight: number;
  headerHeight: number;
  footerHeight: number;
  border?: TableBorderOptions;
}

export interface LayoutUnknownElement extends LayoutElementBase {
  type: "unknown";
}

export type LayoutElement =
  | LayoutTextElement
  | LayoutImageElement
  | LayoutLineElement
  | LayoutRectElement
  | LayoutTableElement
  | LayoutUnknownElement
  | LayoutElementBase;
