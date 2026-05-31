import type { CoreSchemaVersion } from "../version";
import type { PaperConfig } from "./paper";
import type { PrintPanel } from "./panel";

export interface PrintTemplateMeta {
  name?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  source?: "core" | "legacy" | "unknown";
}

export interface PrintTemplate {
  schemaVersion: CoreSchemaVersion;
  id: string;
  meta?: PrintTemplateMeta;
  paper: PaperConfig;
  panels: PrintPanel[];
  raw?: Record<string, unknown>;
}
