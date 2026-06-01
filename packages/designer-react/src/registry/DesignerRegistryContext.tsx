import { createContext, useContext, useMemo } from "react";
import type { ElementRegistry } from "@hiprint-re/core";
import { useDesignerPluginManager } from "../plugin/DesignerPluginProvider";

export const DesignerRegistryContext = createContext<ElementRegistry | null>(
  null,
);

export interface DesignerRegistryProviderProps {
  children: React.ReactNode;
}

export function DesignerRegistryProvider(
  props: DesignerRegistryProviderProps,
) {
  const pluginManager = useDesignerPluginManager();

  const registry = useMemo(() => {
    return pluginManager.createElementRegistry();
  }, [pluginManager]);

  return (
    <DesignerRegistryContext.Provider value={registry}>
      {props.children}
    </DesignerRegistryContext.Provider>
  );
}

export function useDesignerRegistry(): ElementRegistry {
  const registry = useContext(DesignerRegistryContext);

  if (!registry) {
    throw new Error(
      "[hiprint-re/designer-react] DesignerRegistryProvider is missing.",
    );
  }

  return registry;
}
