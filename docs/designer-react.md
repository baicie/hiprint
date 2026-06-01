# React Designer

## Usage

```tsx
import { PrintDesigner } from "@hiprint-re/designer-react";

export function App() {
  return (
    <PrintDesigner
      template={template}
      templateKind="legacy"
      data={data}
      domOptions={{ resolveImageSrc: (src) => src }}
      onChange={setTemplate}
      onError={console.error}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|-------|------|---------|-------------|
| `template` | `PrintTemplate \| LegacyTemplate \| unknown` | required | Print template to render |
| `templateKind` | `"core" \| "legacy" \| "auto"` | `"auto"` | Template format |
| `data` | `unknown` | `{}` | Print data |
| `layoutOptions` | `LayoutOptions` | `{}` | Layout configuration |
| `domOptions` | `DomRenderOptions` | `{}` | DOM renderer options |
| `className` | `string` | - | CSS class for root element |
| `style` | `CSSProperties` | - | CSS styles for root element |
| `readonly` | `boolean` | `false` | Disable editing |
| `onChange` | `(template: PrintTemplate) => void` | - | Called when template changes |
| `onLayout` | `(layout: LayoutDocument) => void` | - | Called with layout result |
| `onError` | `(error: Error) => void` | - | Called on error |

## Components

- `PrintDesigner` — Root component, provides context
- `DesignerShell` — Layout shell (toolbar + main + statusbar)
- `DesignerToolbar` — Action buttons
- `ElementPalette` — Element type buttons
- `DesignerCanvas` — Layout rendering area
- `SelectionOverlay` — Element selection box
- `ResizeHandles` — 8-point resize handles
- `PropertyPanel` — Selected element properties
- `LayerPanel` — Element list
- `StatusBar` — Zoom, mode, selection count

## Hooks

- `useDesignerContext` — Access designer context
- `useDesignerState` — Reactive state via `useSyncExternalStore`
- `useDesignerLayout` — Current layout document
- `useDesignerCommands` — Command dispatchers (add, select, move, resize, etc.)
- `useDesignerKeyboard` — Keyboard shortcut bindings
- `useCanvasPointer` — Drag and resize session management
- `useElementFactory` — Built-in element creators

## Rules

React Designer owns DOM events and UI only.

It must not duplicate:
- layout algorithm
- template schema
- command logic
- DOM renderer internals
