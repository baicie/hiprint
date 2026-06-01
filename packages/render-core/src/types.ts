import type { LayoutDocument, LayoutElement } from "@hiprint-re/core";

export type RenderTarget = "dom" | "svg" | "canvas" | "pdf";

export interface RenderWarning {
  code: string;
  message: string;
  elementId?: string;
}

export interface BaseRenderOptions {
  scale?: number;
  background?: string;
  warnings?: RenderWarning[];
}

export interface ElementRenderContext {
  document: LayoutDocument;
  target: RenderTarget;
  scale: number;
  warnings: RenderWarning[];
}

export interface ElementExportRenderer<T = unknown> {
  type: string;
  target: RenderTarget;
  render(element: LayoutElement, ctx: T): void | Promise<void>;
}
