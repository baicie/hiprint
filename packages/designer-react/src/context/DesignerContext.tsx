import { createContext } from "react";
import type { DesignerContextValue } from "../types";

export const DesignerContext = createContext<DesignerContextValue | null>(null);
