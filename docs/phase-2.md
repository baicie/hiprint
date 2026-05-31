# Phase 2 - Core Schema and Legacy Adapter

## Goal

Extract a framework-agnostic core schema and build a compatibility adapter
between legacy hiprint template JSON and the new core template schema.

## Non-goals

- No layout engine
- No renderer
- No designer
- No React/Vue integration
- No table pagination rewrite

## Deliverables

- `@hiprint-re/core`
- Core template types
- Element types
- Normalize / validate / migrate
- Legacy -> core adapter
- Core -> legacy adapter
- Fixtures conversion tests

## Acceptance

- Legacy fixtures can be converted to core template
- Core template can be validated
- Core template can be converted back to legacy template
- Raw legacy data is preserved
- No DOM / jQuery dependency in core

## Directory Structure

```
packages/core/
├─ src/
│  ├─ index.ts
│  ├─ version.ts
│  ├─ types/
│  │  ├─ common.ts      # ID, Unit, Point, Size, Rect, UnknownRecord
│  │  ├─ paper.ts       # PaperConfig, PaperPreset, PaperOrientation
│  │  ├─ style.ts       # PrintStyle
│  │  ├─ element.ts     # PrintElement, TextElement, TableElement, etc.
│  │  ├─ panel.ts       # PrintPanel
│  │  ├─ template.ts     # PrintTemplate, PrintTemplateMeta
│  │  ├─ validate.ts    # ValidateResult, ValidateIssue
│  │  └─ legacy.ts       # LegacyTemplate, LegacyPanel, LegacyPrintElement
│  ├─ schema/
│  │  ├─ createEmptyTemplate.ts
│  │  ├─ normalizeTemplate.ts
│  │  ├─ validateTemplate.ts
│  │  ├─ migrateTemplate.ts
│  │  └─ elementTypeGuards.ts
│  ├─ model/
│  │  ├─ TemplateModel.ts
│  │  ├─ createTemplateModel.ts
│  │  └─ elementUtils.ts
│  ├─ registry/
│  │  ├─ elementRegistry.ts
│  │  ├─ builtinElements.ts
│  │  └─ globalRegistry.ts
│  └─ adapters/legacy/
│     ├─ fromLegacyTemplate.ts
│     ├─ toLegacyTemplate.ts
│     ├─ mapLegacyElementType.ts
│     └─ index.ts
```

## Design Principles

### 1. core never touches DOM

`@hiprint-re/core` does not import or reference:

- `window`
- `document`
- `HTMLElement`
- jQuery
- React
- Vue

### 2. Legacy information is never lost

Unrecognized fields go into `raw`:

```ts
template.raw.legacy;
panel.raw.legacyPanel;
element.raw.legacyElement;
```

### 3. Table is modeled, not rewritten

Phase 2 only handles table schema extraction:

- Recognizes `type = "table"`
- Preserves `columns`
- Preserves `dataField`
- Preserves raw legacy element

Table pagination, dynamic row heights, and merged cells belong to Phase 3+.

## Key APIs

```ts
// Convert legacy to core
fromLegacyTemplate(legacy: LegacyTemplate, options?: FromLegacyTemplateOptions): PrintTemplate

// Convert core back to legacy
toLegacyTemplate(core: PrintTemplate): LegacyTemplate

// Normalize partial input to full template
normalizeTemplate(partial: Partial<PrintTemplate>): PrintTemplate

// Validate a template
validateTemplate(template: PrintTemplate): ValidateResult

// Migrate from any version
migrateTemplate(input: unknown): PrintTemplate

// Create empty default template
createEmptyTemplate(): PrintTemplate

// Template model with mutation helpers
new TemplateModel(template: PrintTemplate)
```

## Migration Path

```
legacy template JSON
        │
        ▼
  fromLegacyTemplate()
        │
        ▼
  PrintTemplate (core schema)
        │
        ├──► validateTemplate()
        │
        ├──► TemplateModel operations
        │
        └──► toLegacyTemplate()
                   │
                   ▼
            legacy template JSON
```

## Testing

```bash
# Run core tests
pnpm --filter @hiprint-re/core test

# Typecheck
pnpm --filter @hiprint-re/core typecheck

# All checks
pnpm check:core
```
