import { defineComponent, h, computed, ref } from "vue";
import type { HiprintPlugin } from "@hiprint-re/plugin";
import { printLayout } from "@hiprint-re/dom";
import { normalizeInputTemplate } from "../normalizeInputTemplate";
import { DesignerToolbar } from "./DesignerToolbar";
import { ElementPalette } from "./ElementPalette";
import { DesignerCanvas } from "./DesignerCanvas";
import { PropertyPanel } from "./PropertyPanel";
import { LayerPanel } from "./LayerPanel";
import { useDesignerStore } from "../composables/useDesignerStore";
import { useDesignerPluginManager } from "../composables/useDesignerPluginManager";
import { useDesignerKeyboard } from "../composables/useDesignerKeyboard";
import "../style/designer.css";

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

  setup(props, { emit, expose }) {
    const coreTemplate = computed(() =>
      normalizeInputTemplate(props.template as any, props.templateKind as any),
    );

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

    async function print() {
      if (!layoutRef.value) {
        throw new Error("[hiprint-re/designer-vue] Layout is not ready.");
      }

      await printLayout(layoutRef.value, props.domOptions);
    }

    expose({
      print,
      getLayout: () => layoutRef.value,
      getTemplate: () => store.value?.getStateRef().template,
    });

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
