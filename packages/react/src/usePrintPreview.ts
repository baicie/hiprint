import { useCallback, useRef, useState } from "react";
import {
  mountLayout,
  printLayout,
  type MountLayoutResult,
} from "@hiprint-re/dom";
import type {
  PrintLayoutOptions,
} from "@hiprint-re/dom";
import type { UsePrintPreviewOptions, UsePrintPreviewResult } from "./types";
import { usePrintLayout } from "./usePrintLayout";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export function usePrintPreview(
  options: UsePrintPreviewOptions,
): UsePrintPreviewResult {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mountResultRef = useRef<MountLayoutResult | null>(null);
  const [version, setVersion] = useState(0);

  const { layout, warnings, error } = usePrintLayout(options);

  const refresh = useCallback(() => {
    setVersion((value) => value + 1);
  }, []);

  const print = useCallback(
    async (printOptions?: PrintLayoutOptions) => {
      if (!layout) {
        throw new Error(
          "[hiprint-re/react] Cannot print before layout is ready.",
        );
      }

      await printLayout(layout, {
        ...options.domOptions,
        ...printOptions,
      });
    },
    [layout, options.domOptions],
  );

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    if (mountResultRef.current) {
      mountResultRef.current.dispose();
      mountResultRef.current = null;
    }

    if (error) {
      options.onError?.(error);
      return;
    }

    if (!layout) return;

    try {
      const result = mountLayout(layout, container, options.domOptions);

      mountResultRef.current = result;

      options.onLayout?.(layout);

      if (layout.warnings.length > 0) {
        options.onWarnings?.(layout.warnings);
      }
    } catch (err) {
      const normalizedError =
        err instanceof Error ? err : new Error(String(err));

      options.onError?.(normalizedError);
    }

    return () => {
      if (mountResultRef.current) {
        mountResultRef.current.dispose();
        mountResultRef.current = null;
      }
    };
  }, [
    layout,
    error,
    version,
    options.domOptions,
    options.onLayout,
    options.onWarnings,
    options.onError,
  ]);

  return {
    containerRef,
    layout,
    warnings,
    error,
    mountResult: mountResultRef.current,
    refresh,
    print,
  };
}
