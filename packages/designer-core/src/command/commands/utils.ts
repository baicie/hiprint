import type { PrintElement, PrintPanel, PrintTemplate } from "@hiprint-re/core";

export function updatePanelById(
  template: PrintTemplate,
  panelId: string,
  updater: (panel: PrintPanel) => PrintPanel,
): PrintTemplate {
  return {
    ...template,
    panels: template.panels.map((panel) =>
      panel.id === panelId ? updater(panel) : panel,
    ),
  };
}

export function updateElementById(
  template: PrintTemplate,
  elementId: string,
  updater: (element: PrintElement) => PrintElement,
): PrintTemplate {
  return {
    ...template,
    panels: template.panels.map((panel) => ({
      ...panel,
      elements: panel.elements.map((element) =>
        element.id === elementId ? updater(element) : element,
      ),
    })),
  };
}

export function removeElementsByIds(
  template: PrintTemplate,
  ids: string[],
): PrintTemplate {
  const idSet = new Set(ids);

  return {
    ...template,
    panels: template.panels.map((panel) => ({
      ...panel,
      elements: panel.elements.filter((element) => !idSet.has(element.id)),
    })),
  };
}
