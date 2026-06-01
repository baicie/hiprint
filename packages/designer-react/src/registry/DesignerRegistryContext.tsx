import { createContext, useContext, useMemo } from "react";
import {
  builtinElementDefinitions,
  createElementRegistry,
  type ElementDefinition,
  type ElementRegistry,
} from "@hiprint-re/core";

export const DesignerRegistryContext = createContext<ElementRegistry | null>(null);

export interface DesignerRegistryProviderProps {
  elements?: ElementDefinition[];
  children: React.ReactNode;
}

export function DesignerRegistryProvider(
  props: DesignerRegistryProviderProps,
) {
  const registry = useMemo(() => {
    return createElementRegistry([
      ...builtinElementDefinitions,
      ...(props.elements ?? []),
    ]);
  }, [props.elements]);

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
