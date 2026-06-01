import type { PrintElement, PrintElementType } from "../types/element";
import type { ElementPropertySchema } from "../property";

export interface CreateElementInput {
  id: string;
  x: number;
  y: number;
}

export interface ElementDefinition {
  type: PrintElementType;
  name: string;
  description?: string;
  builtin?: boolean;

  defaultWidth: number;
  defaultHeight: number;

  createElement: (input: CreateElementInput) => PrintElement;

  propertySchema?: ElementPropertySchema;
}

export class ElementRegistry {
  private definitions = new Map<PrintElementType, ElementDefinition>();

  register(definition: ElementDefinition): void {
    this.definitions.set(definition.type, definition);
  }

  unregister(type: string): void {
    this.definitions.delete(type as PrintElementType);
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

  createElement(
    type: PrintElementType,
    input: CreateElementInput,
  ): PrintElement | undefined {
    return this.get(type)?.createElement(input);
  }
}

export function createElementRegistry(
  definitions: ElementDefinition[] = [],
): ElementRegistry {
  const registry = new ElementRegistry();

  for (const definition of definitions) {
    registry.register(definition);
  }

  return registry;
}
