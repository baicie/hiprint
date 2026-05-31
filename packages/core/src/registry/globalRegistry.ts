import type { PrintElementType } from "../types/element";
import { builtinElementDefinitions } from "./builtinElements";
import { ElementRegistry } from "./elementRegistry";

const globalRegistry = new ElementRegistry();

for (const def of builtinElementDefinitions) {
  globalRegistry.register(def);
}

export { globalRegistry };
