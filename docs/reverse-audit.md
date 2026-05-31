# Reverse Audit

## Goal

Document the current reverse-parsed hiprint runtime before extracting the core.

## Known globals

- `window.hiprint`
- `window.hiprintTemplate`
- `window.$`
- `window.jQuery`
- `window.hinnn`
- `provider`
- `printElementTypeManager`

## Runtime loading order

1. polyfill (polyfill.min.js)
2. bundle (hiprint.bundle.js)
3. config (hiprint.config.js)

## Main flows

### Initialize

TODO

### Create template

TODO

### Mount designer

TODO

### Preview

TODO

### Print

TODO

## Candidate modules

### Should become core

- template model
- paper model
- element model
- data binding
- layout
- serialization

### Should become dom

- DOM rendering
- browser print
- preview iframe/window

### Should become designer

- selection
- drag
- resize
- keyboard shortcuts
- history
