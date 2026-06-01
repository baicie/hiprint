import { createPlugin } from "@hiprint-re/plugin";
import { htmlElementDefinition } from "./htmlElement";
import { htmlDomRenderer } from "./htmlRenderer";

export function htmlPlugin() {
  return createPlugin({
    name: "@hiprint-re/plugin-html",
    version: "0.0.0",
    description: "Trusted HTML element plugin.",
    elements: [htmlElementDefinition],
    domRenderers: [htmlDomRenderer],
  });
}
