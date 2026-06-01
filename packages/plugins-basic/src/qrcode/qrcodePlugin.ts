import { createPlugin } from "@hiprint-re/plugin";
import { qrcodeElementDefinition } from "./qrcodeElement";
import { qrcodeDomRenderer } from "./qrcodeRenderer";

export function qrcodePlugin() {
  return createPlugin({
    name: "@hiprint-re/plugin-qrcode",
    version: "0.0.0",
    description: "Builtin QRCode element plugin.",
    elements: [qrcodeElementDefinition],
    domRenderers: [qrcodeDomRenderer],
  });
}
