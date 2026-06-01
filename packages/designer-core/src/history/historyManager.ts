import type { DesignerState } from "../types";
import type { DesignerCommand } from "../command/types";
import type { HistoryEntry, HistoryState } from "./types";
import { cloneDeep } from "../utils/clone";

export class HistoryManager {
  private state: HistoryState = {
    undoStack: [],
    redoStack: [],
  };

  constructor(private limit = 100) {}

  push(input: {
    command: DesignerCommand;
    before: DesignerState;
    after: DesignerState;
  }): void {
    const entry: HistoryEntry = {
      commandId: input.command.id,
      commandName: input.command.name,
      before: cloneDeep(input.before),
      after: cloneDeep(input.after),
      timestamp: Date.now(),
    };

    this.state.undoStack.push(entry);

    if (this.state.undoStack.length > this.limit) {
      this.state.undoStack.shift();
    }

    this.state.redoStack = [];
  }

  canUndo(): boolean {
    return this.state.undoStack.length > 0;
  }

  canRedo(): boolean {
    return this.state.redoStack.length > 0;
  }

  undo(current: DesignerState): DesignerState {
    const entry = this.state.undoStack.pop();

    if (!entry) return current;

    this.state.redoStack.push(entry);

    return cloneDeep(entry.before);
  }

  redo(current: DesignerState): DesignerState {
    const entry = this.state.redoStack.pop();

    if (!entry) return current;

    this.state.undoStack.push(entry);

    return cloneDeep(entry.after);
  }

  clear(): void {
    this.state.undoStack = [];
    this.state.redoStack = [];
  }

  getSnapshot(): HistoryState {
    return cloneDeep(this.state);
  }
}
