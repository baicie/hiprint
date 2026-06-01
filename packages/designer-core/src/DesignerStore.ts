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

  constructor(options: DesignerStoreOptions) {
    this.state = createInitialDesignerState(options);
    this.history = new HistoryManager(options.historyLimit ?? 100);
    this.commandManager = new CommandManager(this.history);
  }

  getState(): DesignerState {
    return cloneDeep(this.state);
  }

  getStateRef(): DesignerState {
    return this.state;
  }

  setState(nextState: DesignerState): void {
    this.state = nextState;
    this.notify();
  }

  dispatch(command: DesignerCommand): void {
    this.state = this.commandManager.execute(this.state, command);
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
    this.notify();
  }

  redo(): void {
    this.state = this.history.redo(this.state);
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
    const snapshot = this.getState();

    for (const subscriber of this.subscribers) {
      subscriber(snapshot);
    }
  }
}
