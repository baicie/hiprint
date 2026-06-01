import type { DesignerState } from "../types";

export interface DesignerCommand {
  id: string;
  name: string;

  /**
   * Whether this command should be recorded in history.
   * select / clearSelection typically should not be recorded.
   */
  history?: boolean;

  execute(state: DesignerState): DesignerState;

  /**
   * Optional custom undo handler.
   * If not provided, commandManager uses the before snapshot to roll back.
   */
  undo?: (state: DesignerState) => DesignerState;
}

export interface CommandExecuteResult {
  state: DesignerState;
  previousState?: DesignerState;
  command: DesignerCommand;
}
