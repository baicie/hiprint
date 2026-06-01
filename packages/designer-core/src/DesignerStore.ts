import type {
  DesignerState,
  DesignerStoreOptions,
  DesignerStoreSubscriber,
} from "./types";
import type { DesignerCommand } from "./command/types";
import { createInitialDesignerState } from "./state/createInitialDesignerState";
import { cloneDeep } from "./utils/clone";
import { HistoryManager } from "./history/historyManager";
import { CommandManager } from "./command/commandManager";

export class DesignerStore {
  private state: DesignerState;
  private subscribers = new Set<DesignerStoreSubscriber>();
  private history: HistoryManager;
  private commandManager: CommandManager;
  private currentVersion = 0;

  constructor(options: DesignerStoreOptions) {
    this.state = createInitialDesignerState(options);
    this.history = new HistoryManager(options.historyLimit ?? 100);
    this.commandManager = new CommandManager(this.history);
  }

  getState(): DesignerState {
    return this.state;
  }

  getStateRef(): DesignerState {
    return this.state;
  }

  setState(nextState: DesignerState): void {
    this.state = nextState;
    this.currentVersion++;
    this.notify();
  }

  dispatch(command: DesignerCommand): void {
    this.state = this.commandManager.execute(this.state, command);
    this.currentVersion++;
    this.notify();
  }

  subscribe(subscriber: DesignerStoreSubscriber): () => void {
    this.subscribers.add(subscriber);

    return () => {
      this.subscribers.delete(subscriber);
    };
  }

  undo(): void {
    this.state = this.history.undo(this.state);
    this.currentVersion++;
    this.notify();
  }

  redo(): void {
    this.state = this.history.redo(this.state);
    this.currentVersion++;
    this.notify();
  }

  canUndo(): boolean {
    return this.history.canUndo();
  }

  canRedo(): boolean {
    return this.history.canRedo();
  }

  clearHistory(): void {
    this.history.clear();
  }

  private notify(): void {
    const snapshot = cloneDeep(this.state);

    for (const subscriber of this.subscribers) {
      subscriber(snapshot);
    }
  }
}
