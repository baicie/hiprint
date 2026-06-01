import { useSyncExternalStore } from "react";
import type { DesignerState } from "@hiprint-re/designer-core";
import { useDesignerContext } from "../context/useDesignerContext";

export function useDesignerState(): DesignerState {
  const { store } = useDesignerContext();

  return useSyncExternalStore(
    (listener) => store.subscribe(listener),
    () => store.getState(),
    () => store.getState(),
  );
}
