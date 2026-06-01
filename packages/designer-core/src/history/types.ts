import type { DesignerState } from "../types";

export interface HistoryEntry {
  commandId: string;
  commandName: string;
  before: DesignerState;
  after: DesignerState;
  timestamp: number;
}

export interface HistoryState {
  undoStack: HistoryEntry[];
  redoStack: HistoryEntry[];
}
