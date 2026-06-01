# Legacy Vendor — License and Distribution Policy

## Source

The file `packages/legacy/vendor/hiprint.bundle.js` is a bundled, minified, and obfuscated copy of the **jQuery Hiprint 2.5.4** library. It carries the following license header:

```
/**
 * jQuery Hiprint 2.5.4
 * Copyright (c) 2020 XBI
 * Commercial / LGPL License
 */
```

The original project is available at [CaoXiangMei/hiprint](https://github.com/CaoXiangMei/hiprint). It is dual-licensed under **LGPL 3.0 or later** and a **commercial license**.

## No Distribution in npm

`@hiprint-re/legacy` is marked `"private": true` and is **never published to npm**. Its `files` field currently includes `vendor/`, but the package is consumed exclusively as a local workspace dependency.

If the `vendor/` directory is excluded from the package in the future, add this to `packages/legacy/package.json`:

```json
{
  "files": ["src"]
}
```

## How This Project Uses It

The legacy bundle is used **only** as a compatibility shim inside `apps/playground-legacy/`. It is loaded dynamically at runtime via `packages/legacy/src/loadLegacy.ts`. The `packages/legacy/src/` TypeScript wrapper provides a typed interface to the legacy global, but does not redistribute the vendor bundle as part of the public API.

## LGPL Obligations

Because `@hiprint-re/legacy` is a local-only, private workspace package and the original hiprint source is not being modified or redistributed as source code, LGPL obligations are satisfied by:

1. Not publishing `@hiprint-re/legacy` to a public registry.
2. Providing the source of modifications (the entire repository is open source).
3. The core (`@hiprint-re/core`), DOM renderer (`@hiprint-re/dom`), and designer packages (`@hiprint-re/designer-*`) are **completely independent rewrites** and do not link to or depend on the legacy bundle at runtime.

## Core Packages Are Independent

All packages published under `@hiprint-re/*` (except `@hiprint-re/legacy`) are **clean rewrites** written from scratch:

- `@hiprint-re/core` — framework-agnostic schema, model, and layout engine
- `@hiprint-re/dom` — DOM rendering adapter
- `@hiprint-re/plugin` — plugin system
- `@hiprint-re/designer-core` — framework-agnostic designer state
- `@hiprint-re/designer-react` — React designer UI
- `@hiprint-re/designer-vue` — Vue designer UI
- `@hiprint-re/react` — React preview adapter
- `@hiprint-re/vue` — Vue preview adapter
- `@hiprint-re/svg` / `@hiprint-re/canvas` / `@hiprint-re/pdf` — additional renderers

These packages contain **no code from the original hiprint project** and are not subject to its license.
