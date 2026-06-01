import type { MaybeRefOrGetter } from "vue";
import { printLayout, type PrintLayoutOptions } from "@hiprint-re/dom";
import type { LayoutOptions } from "@hiprint-re/core";
import type { VueTemplateInput, VueTemplateKind } from "./types";
import { usePrintLayout } from "./usePrintLayout";

export interface UsePrintActionsInput {
  template: MaybeRefOrGetter<VueTemplateInput>;
  templateKind?: MaybeRefOrGetter<VueTemplateKind | undefined>;
  data?: MaybeRefOrGetter<unknown>;
  layoutOptions?: MaybeRefOrGetter<LayoutOptions | undefined>;
}

export function usePrintActions(input: UsePrintActionsInput) {
  const { layout, warnings, error } = usePrintLayout(input);

  async function print(options?: PrintLayoutOptions) {
    if (!layout.value) {
      throw error.value ?? new Error("[hiprint-re/vue] Layout is not ready.");
    }

    await printLayout(layout.value, options);
  }

  return {
    layout,
    warnings,
    error,
    print,
  };
}
