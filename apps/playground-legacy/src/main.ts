import {
  createLegacyHiprint,
  type LegacyTemplateInstance,
} from "@hiprint-re/legacy";
import {
  downloadRuntimeSnapshot,
} from "@hiprint-re/legacy/debug";
import { basicTemplate, basicData } from "./fixtures";
import "./style.css";

const legacy = createLegacyHiprint();

let templateInstance: LegacyTemplateInstance | undefined;

const output = document.querySelector<HTMLPreElement>("#output")!;

function log(value: unknown) {
  output.textContent =
    typeof value === "string" ? value : JSON.stringify(value, null, 2);
}

document.querySelector("#load")?.addEventListener("click", async () => {
  await legacy.load({
    baseUrl: "/legacy/",
  });

  log("Legacy runtime loaded.");
});

document.querySelector("#design")?.addEventListener("click", async () => {
  await legacy.load({
    baseUrl: "/legacy/",
  });

  templateInstance = legacy.createTemplate({
    template: basicTemplate,
    settingContainer: "#setting-container",
  });

  legacy.design(templateInstance, "#hiprint-container");

  log("Designer mounted.");
});

document.querySelector("#preview")?.addEventListener("click", () => {
  if (!templateInstance) {
    log("Template instance not created.");
    return;
  }

  const result = legacy.preview(templateInstance, basicData);
  log(result ?? "Preview opened.");
});

document.querySelector("#print")?.addEventListener("click", () => {
  if (!templateInstance) {
    log("Template instance not created.");
    return;
  }

  legacy.print(templateInstance, basicData);
});

document.querySelector("#json")?.addEventListener("click", () => {
  if (!templateInstance) {
    log("Template instance not created.");
    return;
  }

  const json = legacy.getJson(templateInstance);
  log(json);
});

document.querySelector("#snapshot")?.addEventListener("click", async () => {
  await legacy.load({
    baseUrl: "/legacy/",
  });

  downloadRuntimeSnapshot();
  log("Runtime snapshot downloaded.");
});
