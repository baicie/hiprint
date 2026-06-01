import type { ID, UnknownRecord } from "./common";
import type { PrintStyle } from "./style";

export type PrintElementType =
  | "text"
  | "image"
  | "table"
  | "line"
  | "rect"
  | "barcode"
  | "qrcode"
  | "html"
  | "unknown";

export interface DataBinding {
  field?: string;
  title?: string;
  formatter?: string;
  expression?: string;
}

export interface PrintElementBase<
  TOptions extends UnknownRecord = UnknownRecord,
> {
  id: ID;
  type: PrintElementType;

  x: number;
  y: number;
  width: number;
  height: number;

  rotate?: number;
  hidden?: boolean;
  locked?: boolean;

  binding?: DataBinding;
  style?: PrintStyle;
  options?: TOptions;

  /**
   * Retains legacy information that cannot be parsed yet.
   * Phase 2 must not lose information.
   */
  raw?: UnknownRecord;
}

export interface TextElementOptions extends UnknownRecord {
  content?: string;
  placeholder?: string;
}

export interface ImageElementOptions extends UnknownRecord {
  src?: string;
  objectFit?: "contain" | "cover" | "fill";
}

export interface LineElementOptions extends UnknownRecord {
  direction?: "horizontal" | "vertical";
}

export interface RectElementOptions extends UnknownRecord {
  radius?: number;
}

export interface TableColumn {
  id: ID;
  field?: string;
  title?: string;
  width?: number;
  align?: "left" | "center" | "right";
  children?: TableColumn[];
  raw?: UnknownRecord;
}

export interface TableElementOptions extends UnknownRecord {
  columns?: TableColumn[];
  dataField?: string;
  showHeader?: boolean;
  rowHeight?: number;
  headerHeight?: number;
}

export interface HtmlElementOptions extends UnknownRecord {
  content?: string;
}

export interface BarcodeElementOptions extends UnknownRecord {
  value?: string;
  format?: string;
}

export interface QrCodeElementOptions extends UnknownRecord {
  value?: string;
  errorCorrectionLevel?: string;
}

export type TextElement = PrintElementBase<TextElementOptions> & {
  type: "text";
};

export type ImageElement = PrintElementBase<ImageElementOptions> & {
  type: "image";
};

export type LineElement = PrintElementBase<LineElementOptions> & {
  type: "line";
};

export type RectElement = PrintElementBase<RectElementOptions> & {
  type: "rect";
};

export type HtmlElement = PrintElementBase<HtmlElementOptions> & {
  type: "html";
};

export type BarcodeElement = PrintElementBase<BarcodeElementOptions> & {
  type: "barcode";
};

export type QrCodeElement = PrintElementBase<QrCodeElementOptions> & {
  type: "qrcode";
};

export type TableElement = PrintElementBase<TableElementOptions> & {
  type: "table";
};

export type UnknownElement = PrintElementBase & {
  type: "unknown";
};

export type PrintElement =
  | TextElement
  | ImageElement
  | LineElement
  | RectElement
  | HtmlElement
  | BarcodeElement
  | QrCodeElement
  | TableElement
  | UnknownElement;
