import { computed, type ComputedRef } from "vue";
import {
  createPluginManager,
  type HiprintPlugin,
  type PluginManager,
} from "@hiprint-re/plugin";

export interface UseDesignerPluginManagerInput {
  plugins?: HiprintPlugin[];
}

export function useDesignerPluginManager(
  input: UseDesignerPluginManagerInput,
): ComputedRef<PluginManager> {
  return computed(() => createPluginManager(input.plugins ?? []));
}
