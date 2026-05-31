# Legacy vendor files

This directory contains the current reverse-parsed legacy runtime artifacts.

These files are treated as frozen inputs in Phase 0.

Do not manually refactor these files in Phase 0.

## Loading order

1. polyfill.min.js
2. hiprint.bundle.js
3. hiprint.config.js

If the actual runtime requires a different order, update `src/loadLegacy.ts`
and document the reason here.

## Purpose

The legacy runtime is wrapped by `@hiprint-re/legacy` to provide a stable
compatibility layer before extracting a framework-agnostic core.
