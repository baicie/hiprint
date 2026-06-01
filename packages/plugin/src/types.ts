import type {
  ElementDefinition,
  LayoutElement,
} from "@hiprint-re/core";
import type { DomRenderContext } from "@hiprint-re/dom";

export interface HiprintPlugin {
  name: string;
  version: string;
  description?: string;

  elements?: ElementDefinition[];
  domRenderers?: PluginDomRenderer[];

  designer?: PluginDesignerExtension;

  setup?: (ctx: PluginSetupContext) => void;
}

export interface PluginSetupContext {
  registerElement: (definition: ElementDefinition) => void;
  registerDomRenderer: (renderer: PluginDomRenderer) => void;
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
