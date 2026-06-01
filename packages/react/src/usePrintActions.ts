import { useCallback } from "react";
import { printLayout, type PrintLayoutOptions } from "@hiprint-re/dom";
import { usePrintLayout } from "./usePrintLayout";
import type { ReactPrintLayoutOptions } from "./types";

export function usePrintActions(options: ReactPrintLayoutOptions) {
  const { layout, warnings, error } = usePrintLayout(options);

  const print = useCallback(
    async (printOptions?: PrintLayoutOptions) => {
      if (!layout) {
        throw error ?? new Error("[hiprint-re/react] Layout is not ready.");
      }

      await printLayout(layout, printOptions);
    },
    [layout, error],
  );

  return {
    layout,
    warnings,
    error,
    print,
  };
}
