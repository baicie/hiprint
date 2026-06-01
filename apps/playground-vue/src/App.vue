<script setup lang="ts">
import { ref } from "vue";
import { PrintPreview } from "@hiprint-re/vue";

import basicTemplate from "../../../fixtures/templates/basic-text.json";
import basicData from "../../../fixtures/data/basic-text.data.json";

const previewRef = ref<{
  refresh: () => void;
  print: () => Promise<void>;
  getLayout: () => unknown;
} | null>(null);

function refresh() {
  previewRef.value?.refresh();
}

async function print() {
  await previewRef.value?.print();
}

function handleWarnings(warnings: unknown[]) {
  console.warn("[warnings]", warnings);
}

function handleError(error: Error) {
  console.error("[error]", error);
}
</script>

<template>
  <div class="app">
    <div class="toolbar">
      <button @click="refresh">Refresh</button>
      <button @click="print">Print</button>
    </div>

    <div class="preview">
      <PrintPreview
        ref="previewRef"
        :template="basicTemplate"
        template-kind="legacy"
        :data="basicData"
        @warnings="handleWarnings"
        @error="handleError"
      />
    </div>
  </div>
</template>
