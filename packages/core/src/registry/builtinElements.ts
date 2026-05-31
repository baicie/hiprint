import type { ElementDefinition } from "./elementRegistry";

export const builtinElementDefinitions: ElementDefinition[] = [
  {
    type: "text",
    name: "Text",
    defaultWidth: 40,
    defaultHeight: 10,
  },
  {
    type: "image",
    name: "Image",
    defaultWidth: 40,
    defaultHeight: 40,
  },
  {
    type: "table",
    name: "Table",
    defaultWidth: 180,
    defaultHeight: 60,
  },
  {
    type: "line",
    name: "Line",
    defaultWidth: 40,
    defaultHeight: 1,
  },
  {
    type: "rect",
    name: "Rectangle",
    defaultWidth: 40,
    defaultHeight: 20,
  },
  {
    type: "barcode",
    name: "Barcode",
    defaultWidth: 60,
    defaultHeight: 20,
  },
  {
    type: "qrcode",
    name: "QRCode",
    defaultWidth: 30,
    defaultHeight: 30,
  },
];
