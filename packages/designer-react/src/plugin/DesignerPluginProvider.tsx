import { createContext, useContext, useMemo } from "react";
import {
  createPluginManager,
  type HiprintPlugin,
  type PluginManager,
} from "@hiprint-re/plugin";

const DesignerPluginContext = createContext<PluginManager | null>(null);

export interface DesignerPluginProviderProps {
  plugins?: HiprintPlugin[];
  children: React.ReactNode;
}

export function DesignerPluginProvider(props: DesignerPluginProviderProps) {
  const manager = useMemo(
    () => createPluginManager(props.plugins ?? []),
    [props.plugins],
  );

  return (
    <DesignerPluginContext.Provider value={manager}>
      {props.children}
    </DesignerPluginContext.Provider>
  );
}

export function useDesignerPluginManager(): PluginManager {
  const manager = useContext(DesignerPluginContext);

  if (!manager) {
    throw new Error(
      "[hiprint-re/designer-react] DesignerPluginProvider is missing.",
    );
  }

  return manager;
}
