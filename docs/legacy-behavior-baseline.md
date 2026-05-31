# Legacy Behavior Baseline

## Runtime

- Loads polyfill
- Loads hiprint bundle
- Loads hiprint config
- Exposes `window.hiprint`
- Exposes `window.hiprintTemplate`

## Supported baseline features

### Template

- Load template JSON
- Get template JSON

### Designer

- Mount designer into container
- Render setting panel
- Edit text element
- Move element
- Resize element

### Preview

- Preview with data

### Print

- Trigger browser print

## Fixtures

- basic-text
- image
- table-basic
- complex-order

## Known limitations

- Runtime depends on global variables
- Legacy bundle is not tree-shakeable
- Some APIs are weakly typed
- Table behavior is not yet extracted
