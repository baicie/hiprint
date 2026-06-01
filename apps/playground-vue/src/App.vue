<script setup lang="ts">
import { ref, shallowRef } from "vue";
import { PrintPreview } from "@hiprint-re/vue";
import { PrintDesigner } from "@hiprint-re/designer-vue";

import basicTemplate from "../../../fixtures/templates/basic-text.json";
import basicData from "../../../fixtures/data/basic-text.data.json";

type Mode = "preview" | "designer";

const LEGACY_IMAGE_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20160%2088%22%3E%3Crect%20width%3D%22160%22%20height%3D%2288%22%20rx%3D%228%22%20fill%3D%22%23f8fafc%22/%3E%3Crect%20x%3D%2212%22%20y%3D%2212%22%20width%3D%22136%22%20height%3D%2264%22%20rx%3D%226%22%20fill%3D%22%23e0f2fe%22%20stroke%3D%22%230ea5e9%22%20stroke-width%3D%222%22/%3E%3Ccircle%20cx%3D%2248%22%20cy%3D%2236%22%20r%3D%2210%22%20fill%3D%22%230284c7%22/%3E%3Cpath%20d%3D%22M24%2068%2058%2048%2080%2062%20102%2042%20138%2068Z%22%20fill%3D%22%230369a1%22/%3E%3C/svg%3E";

const mode = ref<Mode>("designer");
const template = shallowRef<any>(basicTemplate);
const data = shallowRef<Record<string, unknown>>(basicData);
const domOptions = {
  resolveImageSrc(src: string | undefined): string | undefined {
    if (!src) return src;
    if (src === "/Content/assets/hi.png") return LEGACY_IMAGE_PLACEHOLDER;
    return src;
  },
};

const designerRef = ref<{
  print?: () => Promise<void>;
} | null>(null);

const previewRef = ref<{
  refresh?: () => void;
  print?: () => Promise<void>;
} | null>(null);

function setMode(nextMode: Mode) {
  mode.value = nextMode;
}

function handleDesignerChange(nextTemplate: unknown) {
  template.value = nextTemplate;
  console.log("[vue designer change]", nextTemplate);
}

function handleWarnings(warnings: unknown[]) {
  console.warn("[vue playground warnings]", warnings);
}

function handleError(error: Error) {
  console.error("[vue playground error]", error);
}

async function print() {
  if (mode.value === "designer") {
    await designerRef.value?.print?.();
    return;
  }
  await previewRef.value?.print?.();
}
</script>

<template>
  <div class="app">
    <div class="toolbar">
      <button
        :class="{ active: mode === 'designer' }"
        @click="setMode('designer')"
      >
        Designer
      </button>

      <button
        :class="{ active: mode === 'preview' }"
        @click="setMode('preview')"
      >
        Preview
      </button>

      <span class="separator" />

      <button @click="print">Print</button>
    </div>

    <div class="workspace">
      <PrintDesigner
        v-if="mode === 'designer'"
        ref="designerRef"
        :template="template"
        template-kind="auto"
        :data="data"
        :dom-options="domOptions"
        @change="handleDesignerChange"
        @error="handleError"
      />

      <PrintPreview
        v-else
        ref="previewRef"
        :template="template"
        template-kind="auto"
        :data="data"
        :dom-options="domOptions"
        @warnings="handleWarnings"
        @error="handleError"
      />
    </div>
  </div>
</template>
