# Reverse Audit

## Goal

Document the current reverse-parsed hiprint runtime before extracting the core.

## Known globals

| Global | Kind | Count | Notes |
| --- | --- | ---: | --- |
| `$` | read | 236 | jQuery primary entry |
| `$` | call | 216 | jQuery constructor calls |
| `document` | read | 29 | DOM access |
| `window` | read | 19 | Global window ref |
| `$` | member.extend | 14 | jQuery plugins |
| `document` | member.createElement | 7 | DOM creation |
| `jQuery` | read | 6 | Alternative jQuery ref |
| `URL` | read | 5 | Blob URL handling |
| `navigator` | read | 3 | Browser info |
| `window` | write.hinnn | 1 | hinnn global object |
| `window` | write.hiwebSocket | 1 | WebSocket wrapper |
| `window` | write.hiLocalStorage | 1 | Storage wrapper |
| `window` | write.HIPRINT_CONFIG | 1 | Config global |

## Runtime loading order

```
1. polyfill (polyfill.min.js)      — 99KB, 1 line (minified)
2. bundle   (hiprint.bundle.js)    — 430KB, 7566 lines (main codebase)
3. config   (hiprint.config.js)   — 19KB,  755 lines (plugins/providers)
```

## Identified constructors

| Constructor | Kind | Likely role |
| --- | --- | --- |
| `BasePrintElement` | function | Core element class |
| `TablePrintElement` | function | Table-specific element |
| `TableExcelHelper` | function | Excel import/export |
| `Context` | function | Unknown context object |
| `T` | function / variable-function | Multiple overloads — needs investigation |

Single-letter constructors (B, C, D, F, G, H, J, L, M, N, Q, R, S, T, U, W, X, Y, Z, Bt, D, Gt, Lt, Mt, Nt, Rt, Tt, Ut, Wt, X, Y, Z, At) are obfuscated utility functions.

## Identified prototype methods

**BasePrintElement.prototype** (~70 methods discovered):

| Category | Methods |
| --- | --- |
| Data | `getData`, `getField`, `getFields`, `setCurrenttemplateData` |
| Config | `getConfigOptionsByName`, `getPrintElementOptionItems`, `getPrintElementOptionItemsByName`, `getFormatter` |
| Events | `bingCopyEvent`, `bingKeyboardMoveEvent`, `onResize`, `onRendered` |
| DOM | `getHtml`, `getHtml2`, `initSizeByHtml`, `createTempContainer`, `removeTempContainer`, `getTempContainer` |
| Layout | `getBeginPrintTopInPaperByReferenceElement`, `inRect`, `isFixed`, `isHeaderOrFooter` |
| Design | `design`, `getDesignTarget`, `multipleSelect`, `delete` |
| Style | `css`, `getStyler` |

## Identified risks

### HIGH — Global state

```
Detected 4 global write patterns. These should be wrapped or patched before core extraction.
```

| Pattern | Location |
| --- | --- |
| `window.hinnn` write | hiprint.bundle.js:72 |
| `window.hiwebSocket` write | hiprint.bundle.js:72 |
| `window.hiLocalStorage` write | hiprint.bundle.js:72 |
| `window.HIPRINT_CONFIG` write | hiprint.bundle.js:72 |

These are all set at the same location — a single initialization block. They must not leak into core.

### MEDIUM — DOM coupling

```
Detected 7 DOM API usage groups.
```

| API | Count |
| --- | ---: |
| `createElement` | 7 |
| `body` | 5 |
| `createTextNode` | 3 |
| `all` | 1 |
| `querySelector` | 1 |

DOM operations must stay in `packages/dom/`, never in `packages/core/`.

### MEDIUM — jQuery coupling

```
Detected 16 jQuery API usage groups.
```

jQuery is the primary DOM manipulation layer (452 total usages). This confirms jQuery must remain a legacy-only concern.

## Main flows

### Initialize

```
loadLegacyRuntime() → loads polyfill + bundle + config
  → hiprint.init() or auto-init via bundle
  → registerElementTypes (from hiprint.config.js)
  → window.hinnn / window.hiwebSocket / window.hiLocalStorage set
```

### Create template

```
new hiprintTemplate({ template: json })
  → parse JSON into internal structure
  → create PrintPanel instances
  → register element options via printElementTypeManager
```

### Mount designer

```
template.design(container)
  → create designer DOM in container
  → attach event listeners
  → init drag/resize/select interactions
```

### Preview

```
template.preview(data)
  → layout elements with data
  → render HTML (possibly via getHtml / getHtml2)
  → open in iframe or inline
```

### Print

```
template.print(data)
  → layout elements with data
  → trigger window.print() or iframe print
```

## Candidate modules

### Should become core (`packages/core/`)

- Template model (PrintTemplate constructor)
- Paper model (dimensions, orientation, margins)
- Panel model (PrintPanel)
- Element model (BasePrintElement, TablePrintElement)
- Field binding (getData, getField, getFields)
- Style options (PrintElementOptionItems)
- Serialization (getJson / template JSON)

### Should become dom (`packages/dom/`)

- HTML rendering (getHtml, getHtml2)
- Browser print (window.print)
- Preview iframe/window
- DOM mounting (createElement, querySelector)

### Should become designer (`packages/designer/`)

- Drag interactions (multipleSelect)
- Resize (onResize, getReizeableShowPoints)
- Keyboard navigation (bingKeyboardMoveEvent)
- Copy/paste (bingCopyEvent)
- Design-time rendering (design, getDesignTarget)

### Should stay legacy (`packages/legacy/`)

- jQuery compatibility layer
- Global patches (hinnn, hiwebSocket, hiLocalStorage)
- Old plugin registration (hiprint.config.js behavior)
- Runtime shims
- polyfill.min.js

## Source files

| File | Size | Lines |
| --- | ---: | ---: |
| `hiprint.bundle.js` | 430 KB | 7566 |
| `hiprint.config.js` | 19 KB | 755 |
| `polyfill.min.js` | 99 KB | 1 |

Total: ~548 KB of legacy code.
