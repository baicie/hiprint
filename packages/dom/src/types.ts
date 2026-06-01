import type {
  LayoutDocument,
  LayoutElement,
  LayoutPage,
} from "@hiprint-re/core";

export interface DomRenderOptions {
  /**
   * Target document. Defaults to the global document.
   */
  document?: Document;

  /**
   * CSS class prefix to avoid conflicts.
   */
  classNamePrefix?: string;

  /**
   * Whether to inject the default CSS.
   */
  injectDefaultStyle?: boolean;

  /**
   * Gap between pages in preview mode.
   */
  pageGap?: number;

  /**
   * Geometry unit for positions/sizes. Defaults to layout.unit.
   */
  geometryUnit?: "mm" | "px";

  /**
   * Typography unit for font sizes. Defaults to px.
   */
  typographyUnit?: "px" | "pt" | "mm";

  /**
   * Custom image src resolver.
   */
  resolveImageSrc?: (src: string | undefined) => string | undefined;

  /**
   * Whether to render unknown element placeholders.
   */
  renderUnknown?: boolean;

  /**
   * Additional class name for the root element.
   */
  className?: string;
}

export interface RequiredDomRenderOptions {
  classNamePrefix: string;
  injectDefaultStyle: boolean;
  pageGap: number;
  geometryUnit: "mm" | "px";
  typographyUnit: "px" | "pt" | "mm";
  resolveImageSrc: (src: string | undefined) => string | undefined;
  renderUnknown: boolean;
  className?: string;
}

export interface DomRenderContext {
  document: Document;
  layout: LayoutDocument;
  options: RequiredDomRenderOptions;
}

export interface DomRenderResult {
  root: HTMLElement;
  pages: HTMLElement[];
  dispose(): void;
}

export interface MountLayoutResult extends DomRenderResult {
  container: HTMLElement;
}
