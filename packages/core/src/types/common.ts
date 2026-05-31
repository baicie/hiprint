export type ID = string;

export type Unit = "mm" | "px";

export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Rect extends Point, Size {}

export interface UnknownRecord {
  [key: string]: unknown;
}
