# React Adapter

`@hiprint-re/react` provides React bindings for previewing and printing templates.

## APIs

```ts
usePrintLayout(options)
usePrintPreview(options)
usePrintActions(options)
<PrintPreview />
```

## Example

```tsx
import { PrintPreview } from "@hiprint-re/react";

export function App() {
  return <PrintPreview template={template} templateKind="legacy" data={data} />;
}
```

## Rules

React adapter must not implement layout or rendering logic.

It only connects:

```
core layout + dom renderer
  ↓
React lifecycle
```

## Non-goals

- Designer
- Drag
- Resize
- Property panel
