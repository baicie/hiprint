export interface LegacyTemplate {
  panels?: LegacyPanel[];
  [key: string]: unknown;
}

export interface LegacyPanel {
  index?: number;
  name?: string;
  width?: number;
  height?: number;
  paperType?: string;
  printElements?: LegacyPrintElement[];
  [key: string]: unknown;
}

export interface LegacyPrintElement {
  options?: LegacyPrintElementOptions;
  printElementType?: LegacyPrintElementType;
  [key: string]: unknown;
}

export interface LegacyPrintElementOptions {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  title?: string;
  field?: string;
  text?: string;
  src?: string;
  columns?: unknown[];
  [key: string]: unknown;
}

export interface LegacyPrintElementType {
  type?: string;
  title?: string;
  [key: string]: unknown;
}
