import {
  createElementRegistry,
  builtinElementDefinitions,
  type ElementDefinition,
  type ElementRegistry,
} from "@hiprint-re/core";
import type { HiprintPlugin, PluginDomRenderer } from "./types";
import { validatePlugin } from "./validatePlugin";

export class PluginManager {
  private plugins: HiprintPlugin[] = [];
  private elementDefinitions: ElementDefinition[] = [
    ...builtinElementDefinitions,
  ];
  private domRenderers = new Map<string, PluginDomRenderer>();

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

    plugin.setup?.({
      registerElement: (definition) => this.registerElement(definition),
      registerDomRenderer: (renderer) => this.registerDomRenderer(renderer),
    });
  }

  registerElement(definition: ElementDefinition): void {
    if (this.elementDefinitions.some((item) => item.type === definition.type)) {
      return;
    }

    this.elementDefinitions.push(definition);
  }

  registerDomRenderer(renderer: PluginDomRenderer): void {
    if (this.domRenderers.has(renderer.type)) {
      return;
    }

    this.domRenderers.set(renderer.type, renderer);
  }

  createElementRegistry(): ElementRegistry {
    return createElementRegistry(this.elementDefinitions);
  }

  getDomRenderer(type: string): PluginDomRenderer | undefined {
    return this.domRenderers.get(type);
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
