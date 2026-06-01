import type { DesignerState } from "../types";
import type { DesignerCommand } from "./types";
import { cloneDeep } from "../utils/clone";
import { HistoryManager } from "../history/historyManager";

export class CommandManager {
  constructor(private history: HistoryManager) {}

  execute(state: DesignerState, command: DesignerCommand): DesignerState {
    const before = cloneDeep(state);
    const after = command.execute(state);

    if (command.history !== false) {
      this.history.push({
        command,
        before,
        after,
      });
    }

    return after;
  }
}
