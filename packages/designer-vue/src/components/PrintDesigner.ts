import { defineComponent, h, computed, ref } from "vue";
import type { HiprintPlugin } from "@hiprint-re/plugin";
import { fromLegacyTemplate, normalizeTemplate } from "@hiprint-re/core";
import { DesignerToolbar } from "./DesignerToolbar";
import { ElementPalette } from "./ElementPalette";
import { DesignerCanvas } from "./DesignerCanvas";
import { PropertyPanel } from "./PropertyPanel";
import { LayerPanel } from "./LayerPanel";
import { useDesignerStore } from "../composables/useDesignerStore";
import { useDesignerPluginManager } from "../composables/useDesignerPluginManager";
import { useDesignerKeyboard } from "../composables/useDesignerKeyboard";

export const PrintDesigner = defineComponent({
  name: "HiprintVueDesigner",

  props: {
    template: {
      type: null,
      required: true,
    },
    templateKind: {
      type: String,
      default: "auto",
    },
    data: {
      type: null,
      default: undefined,
    },
    domOptions: {
      type: null,
      default: () => ({}),
    },
    layoutOptions: {
      type: null,
      default: () => ({}),
    },
    plugins: {
      type: Array as () => HiprintPlugin[],
      default: () => [],
    },
  },

  emits: ["change", "layout", "error"],

  setup(props, { emit }) {
    const coreTemplate = computed(() => {
      if (
        props.templateKind === "core" ||
        (props.templateKind === "auto" &&
          props.template &&
          typeof props.template === "object" &&
          "schemaVersion" in props.template)
      ) {
        return normalizeTemplate(props.template as any);
      }

      return fromLegacyTemplate(props.template as any);
    });

    const { store, state } = useDesignerStore({
      template: coreTemplate,
    });

    const pluginManager = useDesignerPluginManager({ plugins: props.plugins });
    const registry = computed(() => pluginManager.value.createElementRegistry());

    const layoutRef = ref<any>(null);

    function handleChange() {
      if (store.value) {
        emit("change", store.value.getStateRef().template);
      }
    }

    function handleLayout(layout: any) {
      layoutRef.value = layout;
      emit("layout", layout);
    }

    function handleError(err: Error) {
      emit("error", err);
    }

    useDesignerKeyboard(
      () => store.value!,
      () => state.value!,
      handleChange,
    );

    return () => {
      if (!store.value || !state.value) {
        return h("div", "Loading...");
      }

      return h(
        "div",
        { class: "hiprint-designer" },
        [
          h(DesignerToolbar, {
            store: store.value,
            state: state.value,
            domOptions: props.domOptions,
            layoutOptions: props.layoutOptions,
            layout: layoutRef.value,
            onChange: handleChange,
          }),

          h(
            "div",
            { class: "hiprint-designer-main" },
            [
              h(
                "aside",
                { class: "hiprint-designer-left" },
                [
                  h(ElementPalette, {
                    store: store.value,
                    state: state.value,
                    registry: registry.value,
                    onChange: handleChange,
                  }),
                  h(LayerPanel, {
                    store: store.value,
                    state: state.value,
                  }),
                ],
              ),

              h(
                "main",
                { class: "hiprint-designer-center" },
                [
                  h(DesignerCanvas, {
                    store: store.value,
                    state: state.value,
                    data: props.data,
                    domOptions: props.domOptions,
                    layoutOptions: props.layoutOptions,
                    onChange: handleChange,
                    onLayout: handleLayout,
                    onError: handleError,
                  }),
                ],
              ),

              h(
                "aside",
                { class: "hiprint-designer-right" },
                [
                  h(PropertyPanel, {
                    store: store.value,
                    state: state.value,
                    onChange: handleChange,
                  }),
                ],
              ),
            ],
          ),

          h(
            "div",
            { class: "hiprint-designer-statusbar" },
            [
              h("span", `Mode: ${state.value.mode}`),
              h("span", `Zoom: ${Math.round(state.value.viewport.zoom * 100)}%`),
              h("span", `Selected: ${state.value.selection.ids.length}`),
            ],
          ),
        ],
      );
    };
  },
});
