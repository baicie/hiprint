import type { DesignerStoreOptions } from "./types";
import { DesignerStore } from "./DesignerStore";

export function createDesignerStore(
  options: DesignerStoreOptions,
): DesignerStore {
  return new DesignerStore(options);
}
