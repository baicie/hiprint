import { createPlugin } from "@hiprint-re/plugin";
import { barcodeElementDefinition } from "./barcodeElement";
import { barcodeDomRenderer } from "./barcodeRenderer";

export function barcodePlugin() {
  return createPlugin({
    name: "@hiprint-re/plugin-barcode",
    version: "0.0.0",
    description: "Builtin barcode element plugin.",
    elements: [barcodeElementDefinition],
    domRenderers: [barcodeDomRenderer],
  });
}
