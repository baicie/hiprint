import { computed, toValue, type MaybeRefOrGetter } from "vue";
import {
  layoutTemplate,
  type LayoutDocument,
  type LayoutWarning,
  type LayoutOptions,
} from "@hiprint-re/core";
import { normalizeInputTemplate } from "./normalizeInputTemplate";
import type { VueTemplateInput, VueTemplateKind } from "./types";

export interface UsePrintLayoutInput {
  template: MaybeRefOrGetter<VueTemplateInput>;
  templateKind?: MaybeRefOrGetter<VueTemplateKind | undefined>;
  data?: MaybeRefOrGetter<unknown>;
  layoutOptions?: MaybeRefOrGetter<LayoutOptions | undefined>;
}

export function usePrintLayout(input: UsePrintLayoutInput) {
  const result = computed<{
    layout: LayoutDocument | null;
    warnings: LayoutWarning[];
    error: Error | null;
  }>(() => {
    try {
      const coreTemplate = normalizeInputTemplate(
        toValue(input.template),
        toValue(input.templateKind) ?? "auto",
      );

      const layout = layoutTemplate(
        coreTemplate,
        toValue(input.data) ?? {},
        toValue(input.layoutOptions),
      );

      return {
        layout,
        warnings: layout.warnings,
        error: null,
      };
    } catch (error) {
      return {
        layout: null,
        warnings: [],
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
  });

  const layout = computed(() => result.value.layout);
  const warnings = computed(() => result.value.warnings);
  const error = computed(() => result.value.error);

  return {
    layout,
    warnings,
    error,
  };
}
