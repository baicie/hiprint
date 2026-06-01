import type {
  LayoutDocument,
  LayoutElement,
} from "@hiprint-re/core";

export interface SvgRenderOptions {
  scale?: number;
  background?: string;
  classNamePrefix?: string;
  renderers?: SvgElementRenderer[];
}

export interface SvgRenderContext {
  layout: LayoutDocument;
  pageIndex: number;
  options: Required<SvgRenderOptions>;
}

export interface SvgElementRenderer {
  type: string;
  render(element: LayoutElement, ctx: SvgRenderContext): string;
}
