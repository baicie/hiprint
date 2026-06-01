import { useEffect, useMemo } from "react";
import { layoutTemplate } from "@hiprint-re/core";
import { useDesignerContext } from "../context/useDesignerContext";
import { useDesignerState } from "./useDesignerState";

export function useDesignerLayout() {
  const ctx = useDesignerContext();
  const state = useDesignerState();

  const result = useMemo(() => {
    try {
      const layout = layoutTemplate(
        state.template,
        ctx.data ?? {},
        ctx.layoutOptions,
      );

      return {
        layout,
        error: null as Error | null,
      };
    } catch (error) {
      return {
        layout: null,
        error: error instanceof Error
          ? error
          : new Error(String(error)),
      };
    }
  }, [state.template, ctx.data, ctx.layoutOptions]);

  useEffect(() => {
    if (result.layout) {
      ctx.onLayout?.(result.layout);
    }

    if (result.error) {
      ctx.onError?.(result.error);
    }
  }, [result.layout, result.error, ctx]);

  return result;
}
