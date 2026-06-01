# Phase 10 - Plugin System and Custom Elements

## Goal

Introduce a plugin system for custom print elements, property schemas and DOM renderers.

## Deliverables

- `@hiprint-re/plugin`
- `@hiprint-re/plugins-basic`
- PluginManager
- Plugin element registration
- Plugin DOM renderer registration
- Barcode plugin
- QRCode plugin
- HTML plugin
- Business custom element example
- Designer plugin integration
- Plugin playground

## Non-goals

- Remote plugin marketplace
- Runtime plugin sandbox
- Permission system
- Online install/uninstall
- WASM plugin runtime

## Architecture

```
Plugin
  ↓
PluginManager
  ↓
ElementRegistry
  ↓
Designer Palette
  ↓
PropertySchema
  ↓
DOM Renderer
  ↓
Preview / Print
```

## Package Structure

```
packages/
├─ plugin/           # Plugin protocol and manager
│  └─ src/
│     ├─ types.ts
│     ├─ createPlugin.ts
│     ├─ pluginManager.ts
│     └─ validatePlugin.ts
│
└─ plugins-basic/     # Built-in plugins
   └─ src/
      ├─ barcode/
      ├─ qrcode/
      ├─ html/
      └─ amount/
```

## Usage

```tsx
import { PrintDesigner } from "@hiprint-re/designer-react";
import {
  barcodePlugin,
  qrcodePlugin,
  htmlPlugin,
  amountUppercasePlugin,
} from "@hiprint-re/plugins-basic";

const plugins = [
  barcodePlugin(),
  qrcodePlugin(),
  htmlPlugin(),
  amountUppercasePlugin(),
];

export function App() {
  return (
    <PrintDesigner
      template={template}
      templateKind="core"
      plugins={plugins}
    />
  );
}
```

## Element Type Naming

```txt
builtin:
  text, image, table, line, rect, barcode, qrcode, html

basic plugin:
  barcode, qrcode, html

business plugin:
  business:amount-uppercase
  business:signature
  business:seal
```

## MVP Notes

- **barcode**: Pseudo Code128 encoding (not scanable without full encoder)
- **qrcode**: Pseudo QR pattern (not scanable without full encoder)
- **html**: Trusted templates only (XSS risk with untrusted input)
