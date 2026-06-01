import {
  onBeforeUnmount,
  ref,
  shallowRef,
  watch,
  toValue,
  type MaybeRefOrGetter,
} from "vue";
import {
  createDesignerStore,
  type DesignerState,
  type DesignerStore,
} from "@hiprint-re/designer-core";
import type { PrintTemplate } from "@hiprint-re/core";

export interface UseDesignerStoreInput {
  template: MaybeRefOrGetter<PrintTemplate>;
}

export function useDesignerStore(input: UseDesignerStoreInput) {
  const store = shallowRef<DesignerStore>();
  const state = ref<DesignerState>();

  let unsubscribe: (() => void) | undefined;

  function create() {
    unsubscribe?.();

    const nextStore = createDesignerStore({
      template: toValue(input.template),
    });

    store.value = nextStore;
    state.value = nextStore.getState();

    unsubscribe = nextStore.subscribe((nextState) => {
      state.value = nextState;
    });
  }

  watch(
    () => toValue(input.template),
    () => create(),
    { immediate: true },
  );

  onBeforeUnmount(() => {
    unsubscribe?.();
  });

  return {
    store,
    state,
  };
}
