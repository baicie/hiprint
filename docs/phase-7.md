# Phase 7 - React / Vue Designer MVP

## Goal

Build visible designer UI on top of `@hiprint-re/designer-core`.

## Packages

- `@hiprint-re/designer-react`
- `@hiprint-re/designer-vue`

## Deliverables

- Designer shell
- Toolbar
- Element palette
- Canvas with layout rendering
- Selection overlay
- Resize handles
- Property panel
- Layer panel
- Keyboard shortcuts (delete, undo/redo, duplicate, paste, arrow keys)
- React playground (`apps/playground-designer-react`)
- Vue playground (`apps/playground-designer-vue`)

## Architecture

```
UI event
  ↓
designer-react / designer-vue
  ↓
designer-core command
  ↓
DesignerState updated
  ↓
layoutTemplate
  ↓
mountLayout
  ↓
visual designer preview
```

## React Usage

```tsx
import { PrintDesigner } from "@hiprint-re/designer-react";

export function App() {
  return (
    <PrintDesigner
      template={template}
      templateKind="legacy"
      data={data}
      domOptions={{
        resolveImageSrc: (src) => { ... }
      }}
      onChange={(nextTemplate) => {
        console.log(nextTemplate);
      }}
      onError={(error) => {
        console.error(error);
      }}
    />
  );
}
```

## Vue Usage

```vue
<template>
  <PrintDesigner
    :template="template"
    template-kind="legacy"
    :data="data"
    @change="handleChange"
    @error="handleError"
  />
</template>

<script setup>
import { PrintDesigner } from "@hiprint-re/designer-vue";
</script>
```

## Scripts

```bash
pnpm dev:designer-react   # React playground
pnpm dev:designer-vue       # Vue playground
pnpm test:designer-react    # React tests
pnpm check:designer-react   # Typecheck + tests
pnpm check:designer-vue     # Typecheck + tests
```

## Non-goals

- Plugin market UI
- Complex table editor
- Ruler
- Advanced snapline rendering
- PDF export

## Implementation Notes

### State stability

`DesignerStore.getState()` returns a live reference. Subscribers receive deep clones. This prevents infinite re-renders in React's `useSyncExternalStore`.

### Command pattern

All element mutations go through designer-core commands. This ensures undo/redo works correctly.

### Canvas rendering

1. `layoutTemplate()` produces a `LayoutDocument`
2. `mountLayout()` renders it into a container DOM node
3. Selection overlay renders on top with absolute positioning
4. Pointer events are handled in the overlay layer

### Template normalization

`normalizeInputTemplate()` auto-detects legacy vs core templates from the input shape. Legacy templates with `panels` array are converted via `fromLegacyTemplate()`. Core templates with `schemaVersion` are passed through `normalizeTemplate()`.

## Files Created

### designer-react (17 files)

```
packages/designer-react/
├─ package.json
├─ tsconfig.json
└─ src/
   ├─ index.ts
   ├─ types.ts
   ├─ normalizeInputTemplate.ts
   ├─ declarations.d.ts
   ├─ context/
   │  ├─ DesignerContext.tsx
   │  ├─ DesignerProvider.tsx
   │  └─ useDesignerContext.ts
   ├─ hooks/
   │  ├─ useDesignerState.ts
   │  ├─ useDesignerLayout.ts
   │  ├─ useDesignerCommands.ts
   │  ├─ useDesignerKeyboard.ts
   │  ├─ useCanvasPointer.ts
   │  └─ useElementFactory.ts
   ├─ components/
   │  ├─ PrintDesigner.tsx
   │  ├─ DesignerShell.tsx
   │  ├─ DesignerToolbar.tsx
   │  ├─ ElementPalette.tsx
   │  ├─ DesignerCanvas.tsx
   │  ├─ SelectionOverlay.tsx
   │  ├─ ResizeHandles.tsx
   │  ├─ PropertyPanel.tsx
   │  ├─ LayerPanel.tsx
   │  └─ StatusBar.tsx
   └─ style/
      └─ designer.css
```

### designer-vue (10 files)

```
packages/designer-vue/
├─ package.json
├─ tsconfig.json
└─ src/
   ├─ index.ts
   ├─ normalizeInputTemplate.ts
   ├─ declarations.d.ts
   ├─ composables/
   │  └─ useDesignerStore.ts
   └─ components/
      ├─ PrintDesigner.ts
      ├─ DesignerToolbar.ts
      ├─ ElementPalette.ts
      ├─ DesignerCanvas.ts
      ├─ PropertyPanel.ts
      └─ LayerPanel.ts
```

### playgrounds (2 apps)

```
apps/playground-designer-react/
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
├─ index.html
└─ src/
   ├─ App.tsx
   ├─ main.tsx
   ├─ style.css
   └─ declarations.d.ts

apps/playground-designer-vue/
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
├─ index.html
└─ src/
   ├─ main.ts
   ├─ style.css
   └─ declarations.d.ts
```

### tests (4 files)

```
tests/designer-react/
├─ PrintDesigner.test.tsx
├─ ElementPalette.test.tsx
├─ PropertyPanel.test.tsx
└─ DesignerToolbar.test.tsx
```

### Bug fixes

- Fixed `noUncheckedIndexedAccess` errors in `core` legacy adapter (`toNumber` function overload)
- Fixed `DesignerStore.getState()` returning new object every call (infinite re-render bug)
- Fixed `createUndoRedoCommand` import (did not exist in designer-core)

## Acceptance

- React designer (`apps/playground-designer-react`) renders and accepts element drag-and-drop
- Vue designer (`apps/playground-designer-vue`) renders and accepts element drag-and-drop
- Designer change events emit correct template JSON
- Undo/redo works for add/remove/move/resize operations
- Keyboard shortcuts (delete, Ctrl+Z, Ctrl+Y, Ctrl+D, Ctrl+V) all functional
- All 272+ tests pass in `pnpm check:tests`
- Typecheck passes in `pnpm typecheck`
