export type PropertyFieldType =
  | "text"
  | "number"
  | "boolean"
  | "select"
  | "color"
  | "textarea"
  | "image"
  | "field"
  | "json";

export interface PropertyOption {
  label: string;
  value: string | number | boolean;
}

export interface PropertyFieldSchema {
  key: string;
  label: string;
  type: PropertyFieldType;
  group?: string;
  placeholder?: string;
  defaultValue?: unknown;
  options?: PropertyOption[];
  min?: number;
  max?: number;
  step?: number;
  readonly?: boolean;
  hidden?: boolean;
}

export interface PropertyGroupSchema {
  key: string;
  label: string;
  order?: number;
}

export interface ElementPropertySchema {
  groups: PropertyGroupSchema[];
  fields: PropertyFieldSchema[];
}
