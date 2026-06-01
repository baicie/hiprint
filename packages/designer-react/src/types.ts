import type {
  LayoutDocument,
  LayoutOptions,
  LegacyTemplate,
  PrintTemplate,
} from "@hiprint-re/core";
import type { DomRenderOptions } from "@hiprint-re/dom";
import type { DesignerStore } from "@hiprint-re/designer-core";

export type DesignerTemplateKind = "core" | "legacy" | "auto";

export type DesignerTemplateInput = PrintTemplate | LegacyTemplate | unknown;

export interface PrintDesignerProps {
  template: DesignerTemplateInput;
  templateKind?: DesignerTemplateKind;
  data?: unknown;

  layoutOptions?: LayoutOptions;
  domOptions?: DomRenderOptions;

  className?: string;
  style?: React.CSSProperties;

  readonly?: boolean;

  onChange?: (template: PrintTemplate) => void;
  onLayout?: (layout: LayoutDocument) => void;
  onError?: (error: Error) => void;
}

export interface DesignerContextValue {
  store: DesignerStore;
  data: unknown;
  layoutOptions?: LayoutOptions;
  domOptions?: DomRenderOptions;
  readonly: boolean;
  onChange?: (template: PrintTemplate) => void;
  onLayout?: (layout: LayoutDocument) => void;
  onError?: (error: Error) => void;
}

export interface DesignerProviderProps extends PrintDesignerProps {
  children: React.ReactNode;
}
