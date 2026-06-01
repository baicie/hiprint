# Phase 4 - DOM Renderer

## Goal

Render `LayoutDocument` into browser DOM and support preview / browser print.

## Non-goals

- No React/Vue
- No designer
- No drag/resize
- No PDF renderer
- No Canvas renderer
- No advanced table pagination

## Deliverables

- `@hiprint-re/dom`
- `renderToDom`
- `mountLayout`
- `renderToHtmlString`
- `previewLayout`
- `printLayout`
- basic renderer tests
- `playground-dom`

## Acceptance Criteria

- [ ] `@hiprint-re/dom` package exists
- [ ] `renderToDom(layout)` works
- [ ] `mountLayout(layout, container)` works
- [ ] `renderToHtmlString(layout)` works
- [ ] `previewLayout(layout, container)` works
- [ ] `printLayout(layout)` works
- [ ] text/image/line/rect/table DOM renderers exist
- [ ] Does not depend on React/Vue/jQuery/legacy runtime
- [ ] `tests/dom/` passes
- [ ] `playground-dom` runs with basic fixture
- [ ] `docs/dom-renderer.md` exists
- [ ] This document exists

## Implementation Notes

### Unit separation

`geometryUnit` controls positions and sizes (mm/px).
`typographyUnit` controls font sizes (px/pt/mm).

### Key invariant

DOM renderer must NOT recalculate layout.
It only consumes `LayoutDocument` from Phase 3.

### Text content

Always use `textContent` instead of `innerHTML` to avoid XSS.

### Print strategy

Uses a hidden iframe with `contentWindow.print()`.
No PDF generation in this phase.
