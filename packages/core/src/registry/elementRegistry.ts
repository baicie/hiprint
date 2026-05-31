import type { PrintElementType } from "../types/element";

export interface ElementDefinition {
  type: PrintElementType;
  name: string;
  defaultWidth: number;
  defaultHeight: number;
}

export class ElementRegistry {
  private definitions = new Map<PrintElementType, ElementDefinition>();

  register(definition: ElementDefinition): void {
    this.definitions.set(definition.type, definition);
  }

  get(type: PrintElementType): ElementDefinition | undefined {
    return this.definitions.get(type);
  }

  has(type: PrintElementType): boolean {
    return this.definitions.has(type);
  }

  list(): ElementDefinition[] {
    return [...this.definitions.values()];
  }
}

export function createElementRegistry(): ElementRegistry {
  return new ElementRegistry();
}
