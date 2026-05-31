import type { ID } from "./common";
import type { PaperConfig } from "./paper";
import type { PrintElement } from "./element";

export interface PrintPanel {
  id: ID;
  name?: string;
  index: number;
  paper?: Partial<PaperConfig>;
  elements: PrintElement[];
  raw?: Record<string, unknown>;
}
