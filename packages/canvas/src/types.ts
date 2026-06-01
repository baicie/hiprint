import type {
  LayoutDocument,
  LayoutElement,
} from "@hiprint-re/core";

export interface CanvasRenderOptions {
  scale?: number;
  dpi?: number;
  background?: string;
  renderers?: CanvasElementRenderer[];
}

export interface CanvasRenderContext {
  layout: LayoutDocument;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  options: Required<CanvasRenderOptions>;
}

export interface CanvasElementRenderer {
  type: string;
  draw(element: LayoutElement, ctx: CanvasRenderContext): void | Promise<void>;
}
