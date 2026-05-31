# Phase 1 - Legacy Runtime Audit

## Goal

Turn reverse-parsed legacy runtime from a black box into a documented,
observable and patchable compatibility layer.

## Non-goals

- Do not rewrite core
- Do not rewrite table
- Do not change template schema
- Do not refactor vendor files directly
- Do not build React/Vue adapters

## Deliverables

- Reverse audit scanner
- Reverse audit report
- Runtime snapshot
- Legacy patch mechanism
- Legacy API map
- Module candidate classification

## Commands

```bash
pnpm reverse   # run scanner and generate reports
pnpm dev
```

## Reports

Generated under:

```txt
reports/reverse-audit/
```

The directory contains `manifest.md` (human-readable summary) and machine-readable
JSON files (`manifest.json`, `globals.json`, etc.). JSON files are gitignored — they are
regenerated on every `pnpm reverse` run and should not be committed.

## Rules

Vendor files are treated as frozen input.
All compatibility fixes must be implemented as patches under:

```txt
packages/legacy/src/patches
```
