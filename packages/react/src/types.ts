import type {
  LayoutDocument,
  LayoutOptions,
  LayoutWarning,
  LegacyTemplate,
  PrintTemplate,
} from "@hiprint-re/core";
import type {
  DomRenderOptions,
  MountLayoutResult,
} from "@hiprint-re/dom";

export type ReactTemplateKind = "core" | "legacy" | "auto";

export type ReactTemplateInput = PrintTemplate | LegacyTemplate | unknown;

export interface ReactPrintLayoutOptions {
  template: ReactTemplateInput;
  templateKind?: ReactTemplateKind;
  data?: unknown;
  layoutOptions?: LayoutOptions;
}

export interface UsePrintLayoutResult {
  layout: LayoutDocument | null;
  warnings: LayoutWarning[];
  error: Error | null;
}

export interface UsePrintPreviewOptions extends ReactPrintLayoutOptions {
  domOptions?: DomRenderOptions;
  onLayout?: (layout: LayoutDocument) => void;
  onWarnings?: (warnings: LayoutWarning[]) => void;
  onError?: (error: Error) => void;
}

export interface UsePrintPreviewResult {
  containerRef: React.RefObject<HTMLDivElement | null>;
  layout: LayoutDocument | null;
  warnings: LayoutWarning[];
  error: Error | null;
  mountResult: MountLayoutResult | null;
  refresh: () => void;
  print: (options?: import("@hiprint-re/dom").PrintLayoutOptions) => Promise<void>;
}

export interface PrintPreviewProps extends UsePrintPreviewOptions {
  className?: string;
  style?: React.CSSProperties;
  loadingFallback?: React.ReactNode;
  errorFallback?: React.ReactNode | ((error: Error) => React.ReactNode);
}

export interface PrintPreviewRef {
  refresh: () => void;
  print: UsePrintPreviewResult["print"];
  getLayout: () => UsePrintPreviewResult["layout"];
}
