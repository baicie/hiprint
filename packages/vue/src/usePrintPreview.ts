import {
  nextTick,
  onBeforeUnmount,
  ref,
  toValue,
  watch,
  type MaybeRefOrGetter,
} from "vue";
import {
  mountLayout,
  printLayout,
  type DomRenderOptions,
  type MountLayoutResult,
  type PrintLayoutOptions,
} from "@hiprint-re/dom";
import type { LayoutDocument, LayoutOptions } from "@hiprint-re/core";
import type { VueTemplateInput, VueTemplateKind } from "./types";
import { usePrintLayout } from "./usePrintLayout";

export interface UsePrintPreviewInput {
  template: MaybeRefOrGetter<VueTemplateInput>;
  templateKind?: MaybeRefOrGetter<VueTemplateKind | undefined>;
  data?: MaybeRefOrGetter<unknown>;
  layoutOptions?: MaybeRefOrGetter<LayoutOptions | undefined>;
  domOptions?: MaybeRefOrGetter<DomRenderOptions | undefined>;
  onLayout?: (layout: LayoutDocument) => void;
  onWarnings?: (warnings: LayoutDocument["warnings"]) => void;
  onError?: (error: Error) => void;
}

export function usePrintPreview(input: UsePrintPreviewInput) {
  const containerRef = ref<HTMLElement | null>(null);
  const mountResult = ref<MountLayoutResult | null>(null);
  const refreshVersion = ref(0);

  const { layout, warnings, error } = usePrintLayout(input);

  function dispose() {
    if (mountResult.value) {
      mountResult.value.dispose();
      mountResult.value = null;
    }
  }

  async function render() {
    await nextTick();

    const container = containerRef.value;

    if (!container) return;

    dispose();

    if (error.value) {
      input.onError?.(error.value);
      return;
    }

    if (!layout.value) return;

    try {
      const result = mountLayout(
        layout.value,
        container,
        toValue(input.domOptions),
      );

      mountResult.value = result;

      input.onLayout?.(layout.value);

      if (layout.value.warnings.length > 0) {
        input.onWarnings?.(layout.value.warnings);
      }
    } catch (err) {
      const normalizedError =
        err instanceof Error ? err : new Error(String(err));

      input.onError?.(normalizedError);
    }
  }

  watch(
    [layout, error, refreshVersion, () => toValue(input.domOptions)],
    () => {
      void render();
    },
    {
      immediate: true,
      deep: false,
    },
  );

  onBeforeUnmount(() => {
    dispose();
  });

  function refresh() {
    refreshVersion.value += 1;
  }

  async function print(options?: PrintLayoutOptions) {
    if (!layout.value) {
      throw error.value ?? new Error("[hiprint-re/vue] Layout is not ready.");
    }

    await printLayout(layout.value, {
      ...toValue(input.domOptions),
      ...options,
    });
  }

  return {
    containerRef,
    layout,
    warnings,
    error,
    mountResult,
    refresh,
    print,
  };
}
