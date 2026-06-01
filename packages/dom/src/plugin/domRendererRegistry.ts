import type { LayoutElement } from "@hiprint-re/core";
import type { DomRenderContext } from "../types";

export interface DomElementRenderer<
  T extends LayoutElement = LayoutElement,
> {
  type: string;
  render: (element: T, ctx: DomRenderContext) => HTMLElement;
}

export class DomRendererRegistry {
  private renderers = new Map<string, DomElementRenderer>();

  register(renderer: DomElementRenderer): void {
    this.renderers.set(renderer.type, renderer);
  }

  get(type: string): DomElementRenderer | undefined {
    return this.renderers.get(type);
  }

  has(type: string): boolean {
    return this.renderers.has(type);
  }

  list(): DomElementRenderer[] {
    return [...this.renderers.values()];
  }
}

export function createDomRendererRegistry(
  renderers: DomElementRenderer[] = [],
): DomRendererRegistry {
  const registry = new DomRendererRegistry();

  for (const renderer of renderers) {
    registry.register(renderer);
  }

  return registry;
}
