# Phase 6 - Designer Core

## Goal

Build a framework-agnostic designer state layer.

## Deliverables

- `@hiprint-re/designer-core`
- `DesignerState`
- `DesignerStore`
- command system
- history undo/redo
- selection
- clipboard
- geometry utilities
- keyboard keymap

## Non-goals

- No React/Vue Designer
- No DOM event binding
- No property panel UI
- No drag handle UI
- No resize handle UI

## Acceptance

- [x] Can add/remove/update element
- [x] Can move/resize element
- [x] Can select/clear selection
- [x] Can copy/paste/duplicate element
- [x] Can align/distribute elements
- [x] Can undo/redo
- [x] Can hit-test element
- [x] Can resolve shortcut action
- [x] All logic is framework-agnostic
- [x] `packages/designer-core/` created
- [x] `tests/designer-core/` created
- [x] `docs/designer-core.md` created
- [x] Root scripts added
