import type { PrintElement, PrintPanel } from "@hiprint-re/core";
import type { DesignerState } from "../types";

export function getActivePanel(
  state: DesignerState,
): PrintPanel | undefined {
  return state.template.panels.find(
    (panel) => panel.id === state.activePanelId,
  );
}

export function getAllElements(state: DesignerState): PrintElement[] {
  return state.template.panels.flatMap((panel) => panel.elements);
}

export function getElementById(
  state: DesignerState,
  id: string,
): PrintElement | undefined {
  for (const panel of state.template.panels) {
    const element = panel.elements.find((item) => item.id === id);

    if (element) return element;
  }

  return undefined;
}

export function getSelectedElements(state: DesignerState): PrintElement[] {
  return state.selection.ids
    .map((id) => getElementById(state, id))
    .filter(Boolean) as PrintElement[];
}

export function getPanelByElementId(
  state: DesignerState,
  elementId: string,
): PrintPanel | undefined {
  return state.template.panels.find((panel) =>
    panel.elements.some((element) => element.id === elementId),
  );
}
