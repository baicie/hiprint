import type { PrintTemplate } from "../types/template";
import { normalizeTemplate } from "../schema/normalizeTemplate";
import { validateTemplate } from "../schema/validateTemplate";
import {
  findElementById,
  removeElementById,
  updateElementById,
} from "./elementUtils";
import type { PrintElement } from "../types/element";

export class TemplateModel {
  private template: PrintTemplate;

  constructor(template: PrintTemplate) {
    this.template = normalizeTemplate(template);
  }

  getSnapshot(): PrintTemplate {
    return structuredCloneSafe(this.template);
  }

  validate() {
    return validateTemplate(this.template);
  }

  getElement(id: string): PrintElement | undefined {
    for (const panel of this.template.panels) {
      const element = findElementById(panel.elements, id);
      if (element) return element;
    }

    return undefined;
  }

  addElement(panelId: string, element: PrintElement): void {
    this.template = this.touchUpdatedAt({
      ...this.template,
      panels: this.template.panels.map((panel) => {
        if (panel.id !== panelId) return panel;

        return {
          ...panel,
          elements: [...panel.elements, element],
        };
      }),
    });
  }

  updateElement(
    id: string,
    updater: (element: PrintElement) => PrintElement,
  ): void {
    this.template = this.touchUpdatedAt({
      ...this.template,
      panels: this.template.panels.map((panel) => ({
        ...panel,
        elements: updateElementById(panel.elements, id, updater),
      })),
    });
  }

  removeElement(id: string): void {
    this.template = this.touchUpdatedAt({
      ...this.template,
      panels: this.template.panels.map((panel) => ({
        ...panel,
        elements: removeElementById(panel.elements, id),
      })),
    });
  }

  private touchUpdatedAt(template: PrintTemplate): PrintTemplate {
    return {
      ...template,
      meta: {
        ...template.meta,
        updatedAt: new Date().toISOString(),
      },
    };
  }
}

function structuredCloneSafe<T>(value: T): T {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }

  return JSON.parse(JSON.stringify(value)) as T;
}
