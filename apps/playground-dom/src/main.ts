import { fromLegacyTemplate, layoutTemplate } from "@hiprint-re/core";
import { previewLayout, printLayout, renderToHtmlString } from "@hiprint-re/dom";

import basicTemplate from "../../../fixtures/templates/basic-text.json";
import basicData from "../../../fixtures/data/basic-text.data.json";
import imageTemplate from "../../../fixtures/templates/image.json";
import imageData from "../../../fixtures/data/image.data.json";
import tableTemplate from "../../../fixtures/templates/table-basic.json";
import tableData from "../../../fixtures/data/table-basic.data.json";

import "./style.css";

interface FixtureEntry {
  template: unknown;
  data: unknown;
}

const fixtures: Record<string, FixtureEntry> = {
  "basic-text": { template: basicTemplate, data: basicData },
  image: { template: imageTemplate, data: imageData },
  "table-basic": { template: tableTemplate, data: tableData },
};

const previewRoot = document.querySelector<HTMLElement>("#preview-root")!;
const fixtureSelect = document.querySelector<HTMLSelectElement>("#fixture-select")!;

let currentLayout: ReturnType<typeof layoutTemplate> | null = null;

function createLayout() {
  const key = fixtureSelect.value;
  const entry = fixtures[key];
  if (!entry) return null;

  const coreTemplate = fromLegacyTemplate(entry.template as Parameters<typeof fromLegacyTemplate>[0], {
    id: `playground_${key}`,
    name: `Fixture: ${key}`,
  });

  return layoutTemplate(coreTemplate, entry.data);
}

document.querySelector("#preview")?.addEventListener("click", () => {
  currentLayout = createLayout();
  if (!currentLayout) return;
  previewLayout(currentLayout, previewRoot);
});

document.querySelector("#print")?.addEventListener("click", async () => {
  if (!currentLayout) {
    currentLayout = createLayout();
  }
  if (!currentLayout) return;
  await printLayout(currentLayout);
});

document.querySelector("#html")?.addEventListener("click", () => {
  if (!currentLayout) {
    currentLayout = createLayout();
  }
  if (!currentLayout) return;
  const html = renderToHtmlString(currentLayout);
  const win = window.open("", "_blank");
  if (win) {
    win.document.write(html);
    win.document.close();
  }
});

currentLayout = createLayout();
if (currentLayout) {
  previewLayout(currentLayout, previewRoot);
}
