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

export type VueTemplateKind = "core" | "legacy" | "auto";

export type VueTemplateInput = PrintTemplate | LegacyTemplate | unknown;

export interface VuePrintLayoutOptions {
  template: VueTemplateInput;
  templateKind?: VueTemplateKind;
  data?: unknown;
  layoutOptions?: LayoutOptions;
}

export interface VueUsePrintLayoutResult {
  layout: Readonly<import("vue").Ref<LayoutDocument | null>>;
  warnings: Readonly<import("vue").Ref<LayoutWarning[]>>;
  error: Readonly<import("vue").Ref<Error | null>>;
}

export interface VueUsePrintPreviewOptions extends VuePrintLayoutOptions {
  domOptions?: DomRenderOptions;
  onLayout?: (layout: LayoutDocument) => void;
  onWarnings?: (warnings: LayoutWarning[]) => void;
  onError?: (error: Error) => void;
}

export interface VueUsePrintPreviewResult {
  containerRef: import("vue").Ref<HTMLElement | null>;
  layout: import("vue").Ref<LayoutDocument | null>;
  warnings: import("vue").Ref<LayoutWarning[]>;
  error: import("vue").Ref<Error | null>;
  mountResult: import("vue").Ref<MountLayoutResult | null>;
  refresh: () => void;
  print: (options?: import("@hiprint-re/dom").PrintLayoutOptions) => Promise<void>;
}
