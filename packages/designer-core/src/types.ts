import type { PrintElement, PrintTemplate } from "@hiprint-re/core";

export type DesignerMode = "select" | "insert" | "pan" | "preview";

export interface DesignerViewport {
  zoom: number;
  scrollX: number;
  scrollY: number;
}

export interface DesignerSelection {
  ids: string[];
  activeId?: string;
}

export interface DesignerClipboard {
  elements: PrintElement[];
}

export interface DesignerInteraction {
  dragging?: DragState;
  resizing?: ResizeState;
}

export interface DragState {
  ids: string[];
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

export interface ResizeState {
  id: string;
  handle: ResizeHandle;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

export type ResizeHandle = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

export interface DesignerState {
  template: PrintTemplate;
  mode: DesignerMode;
  activePanelId?: string;
  selection: DesignerSelection;
  viewport: DesignerViewport;
  clipboard: DesignerClipboard;
  interaction: DesignerInteraction;
}

export interface DesignerStoreOptions {
  template: PrintTemplate;
  activePanelId?: string;
  historyLimit?: number;
}

export interface DesignerStoreSubscriber {
  (state: DesignerState): void;
}
