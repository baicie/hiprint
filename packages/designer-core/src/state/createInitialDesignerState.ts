import type { DesignerState, DesignerStoreOptions } from "../types";

export function createInitialDesignerState(
  options: DesignerStoreOptions,
): DesignerState {
  const firstPanel = options.template.panels[0];

  return {
    template: options.template,
    mode: "select",
    activePanelId: options.activePanelId ?? firstPanel?.id,
    selection: {
      ids: [],
      activeId: undefined,
    },
    viewport: {
      zoom: 1,
      scrollX: 0,
      scrollY: 0,
    },
    clipboard: {
      elements: [],
    },
    interaction: {},
  };
}
