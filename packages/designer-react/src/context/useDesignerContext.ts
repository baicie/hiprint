import { useContext } from "react";
import { DesignerContext } from "./DesignerContext";

export function useDesignerContext() {
  const ctx = useContext(DesignerContext);

  if (!ctx) {
    throw new Error(
      "[hiprint-re/designer-react] useDesignerContext must be used within DesignerProvider.",
    );
  }

  return ctx;
}
