<script setup lang="ts">
import { ref, shallowRef } from "vue";
import { PrintPreview } from "@hiprint-re/vue";
import { PrintDesigner } from "@hiprint-re/designer-vue";

import basicTemplate from "../../../fixtures/templates/basic-text.json";
import basicData from "../../../fixtures/data/basic-text.data.json";

type Mode = "preview" | "designer";

const mode = ref<Mode>("designer");
const template = shallowRef<any>(basicTemplate);
const data = shallowRef<Record<string, unknown>>(basicData);

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
        @change="handleDesignerChange"
        @error="handleError"
      />

      <PrintPreview
        v-else
        ref="previewRef"
        :template="template"
        template-kind="auto"
        :data="data"
        @warnings="handleWarnings"
        @error="handleError"
      />
    </div>
  </div>
</template>
