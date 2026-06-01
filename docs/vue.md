# Vue Adapter

`@hiprint-re/vue` provides Vue 3 bindings for previewing and printing templates.

## APIs

```ts
usePrintLayout(options)
usePrintPreview(options)
usePrintActions(options)
<PrintPreview />
```

## Example

```vue
<template>
  <PrintPreview :template="template" template-kind="legacy" :data="data" />
</template>
```

## Rules

Vue adapter must not implement layout or rendering logic.

It only connects:

```
core layout + dom renderer
  ↓
Vue lifecycle
```

## Non-goals

- Designer
- Drag
- Resize
- Property panel
