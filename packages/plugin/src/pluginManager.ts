import {
  createElementRegistry,
  builtinElementDefinitions,
  type ElementDefinition,
  type ElementRegistry,
} from "@hiprint-re/core";
import type { HiprintPlugin, PluginDomRenderer } from "./types";
import type {
  SvgElementRenderer,
} from "@hiprint-re/svg";
import type {
  CanvasElementRenderer,
} from "@hiprint-re/canvas";
import type {
  PdfElementRenderer,
} from "@hiprint-re/pdf";
import { validatePlugin } from "./validatePlugin";

export class PluginManager {
  private plugins: HiprintPlugin[] = [];
  private elementDefinitions: ElementDefinition[] = [
    ...builtinElementDefinitions,
  ];
  private domRenderers = new Map<string, PluginDomRenderer>();
  private svgRenderers = new Map<string, SvgElementRenderer>();
  private canvasRenderers = new Map<string, CanvasElementRenderer>();
  private pdfRenderers = new Map<string, PdfElementRenderer>();

  register(plugin: HiprintPlugin): void {
    validatePlugin(plugin);

    if (this.plugins.some((item) => item.name === plugin.name)) {
      throw new Error(
        `[hiprint-re/plugin] Duplicate plugin: ${plugin.name}`,
      );
    }

    this.plugins.push(plugin);

    for (const element of plugin.elements ?? []) {
      this.registerElement(element);
    }

    for (const renderer of plugin.domRenderers ?? []) {
      this.registerDomRenderer(renderer);
    }

    for (const renderer of plugin.svgRenderers ?? []) {
      this.registerSvgRenderer(renderer);
    }

    for (const renderer of plugin.canvasRenderers ?? []) {
      this.registerCanvasRenderer(renderer);
    }

    for (const renderer of plugin.pdfRenderers ?? []) {
      this.registerPdfRenderer(renderer);
    }

    plugin.setup?.({
      registerElement: (definition) => this.registerElement(definition),
      registerDomRenderer: (renderer) => this.registerDomRenderer(renderer),
      registerSvgRenderer: (renderer) => this.registerSvgRenderer(renderer),
      registerCanvasRenderer: (renderer) =>
        this.registerCanvasRenderer(renderer),
      registerPdfRenderer: (renderer) => this.registerPdfRenderer(renderer),
    });
  }

  registerElement(definition: ElementDefinition): void {
    if (this.elementDefinitions.some((item) => item.type === definition.type)) {
      throw new Error(
        `[hiprint-re/plugin] Duplicate element type: ${definition.type}`,
      );
    }

    this.elementDefinitions.push(definition);
  }

  registerDomRenderer(renderer: PluginDomRenderer): void {
    if (this.domRenderers.has(renderer.type)) {
      throw new Error(
        `[hiprint-re/plugin] Duplicate DOM renderer: ${renderer.type}`,
      );
    }

    this.domRenderers.set(renderer.type, renderer);
  }

  registerSvgRenderer(renderer: SvgElementRenderer): void {
    if (this.svgRenderers.has(renderer.type)) {
      throw new Error(
        `[hiprint-re/plugin] Duplicate SVG renderer: ${renderer.type}`,
      );
    }

    this.svgRenderers.set(renderer.type, renderer);
  }

  registerCanvasRenderer(renderer: CanvasElementRenderer): void {
    if (this.canvasRenderers.has(renderer.type)) {
      throw new Error(
        `[hiprint-re/plugin] Duplicate Canvas renderer: ${renderer.type}`,
      );
    }

    this.canvasRenderers.set(renderer.type, renderer);
  }

  registerPdfRenderer(renderer: PdfElementRenderer): void {
    if (this.pdfRenderers.has(renderer.type)) {
      throw new Error(
        `[hiprint-re/plugin] Duplicate PDF renderer: ${renderer.type}`,
      );
    }

    this.pdfRenderers.set(renderer.type, renderer);
  }

  createElementRegistry(): ElementRegistry {
    return createElementRegistry(this.elementDefinitions);
  }

  getDomRenderer(type: string): PluginDomRenderer | undefined {
    return this.domRenderers.get(type);
  }

  getSvgRenderer(type: string): SvgElementRenderer | undefined {
    return this.svgRenderers.get(type);
  }

  getCanvasRenderer(type: string): CanvasElementRenderer | undefined {
    return this.canvasRenderers.get(type);
  }

  getPdfRenderer(type: string): PdfElementRenderer | undefined {
    return this.pdfRenderers.get(type);
  }

  getPlugins(): HiprintPlugin[] {
    return [...this.plugins];
  }

  getElementDefinitions(): ElementDefinition[] {
    return [...this.elementDefinitions];
  }

  getDomRenderers(): PluginDomRenderer[] {
    return [...this.domRenderers.values()];
  }

  getSvgRenderers(): SvgElementRenderer[] {
    return [...this.svgRenderers.values()];
  }

  getCanvasRenderers(): CanvasElementRenderer[] {
    return [...this.canvasRenderers.values()];
  }

  getPdfRenderers(): PdfElementRenderer[] {
    return [...this.pdfRenderers.values()];
  }
}

export function createPluginManager(
  plugins: HiprintPlugin[] = [],
): PluginManager {
  const manager = new PluginManager();

  for (const plugin of plugins) {
    manager.register(plugin);
  }

  return manager;
}
