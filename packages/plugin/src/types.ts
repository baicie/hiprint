import type {
  ElementDefinition,
  LayoutElement,
} from "@hiprint-re/core";
import type { DomRenderContext } from "@hiprint-re/dom";
import type {
  SvgElementRenderer,
} from "@hiprint-re/svg";
import type {
  CanvasElementRenderer,
} from "@hiprint-re/canvas";
import type {
  PdfElementRenderer,
} from "@hiprint-re/pdf";

export interface HiprintPlugin {
  name: string;
  version: string;
  description?: string;

  elements?: ElementDefinition[];
  domRenderers?: PluginDomRenderer[];

  svgRenderers?: SvgElementRenderer[];
  canvasRenderers?: CanvasElementRenderer[];
  pdfRenderers?: PdfElementRenderer[];

  designer?: PluginDesignerExtension;

  setup?: (ctx: PluginSetupContext) => void;
}

export interface PluginSetupContext {
  registerElement: (definition: ElementDefinition) => void;
  registerDomRenderer: (renderer: PluginDomRenderer) => void;
  registerSvgRenderer: (renderer: SvgElementRenderer) => void;
  registerCanvasRenderer: (renderer: CanvasElementRenderer) => void;
  registerPdfRenderer: (renderer: PdfElementRenderer) => void;
}

export interface PluginDomRenderer<
  TElement extends LayoutElement = LayoutElement,
> {
  type: string;
  render: (element: TElement, ctx: DomRenderContext) => HTMLElement;
}

export interface PluginDesignerExtension {
  toolbarItems?: PluginToolbarItem[];
}

export interface PluginToolbarItem {
  id: string;
  label: string;
  action: string;
}
