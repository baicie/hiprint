import { useMemo } from "react";
import { layoutTemplate, type LayoutWarning } from "@hiprint-re/core";
import type { ReactPrintLayoutOptions, UsePrintLayoutResult } from "./types";
import { normalizeInputTemplate } from "./normalizeInputTemplate";

export function usePrintLayout(
  options: ReactPrintLayoutOptions,
): UsePrintLayoutResult {
  return useMemo(() => {
    try {
      const coreTemplate = normalizeInputTemplate(
        options.template,
        options.templateKind ?? "auto",
      );

      const layout = layoutTemplate(
        coreTemplate,
        options.data ?? {},
        options.layoutOptions,
      );

      return {
        layout,
        warnings: layout.warnings as LayoutWarning[],
        error: null,
      };
    } catch (error) {
      return {
        layout: null,
        warnings: [],
        error: normalizeError(error),
      };
    }
  }, [
    options.template,
    options.templateKind,
    options.data,
    options.layoutOptions,
  ]);
}

function normalizeError(error: unknown): Error {
  return error instanceof Error ? error : new Error(String(error));
}
