import { CORE_SCHEMA_VERSION } from "../version";
import type { PrintTemplate } from "../types/template";
import { normalizeTemplate } from "./normalizeTemplate";

type Migrator = (input: Record<string, unknown>) => Record<string, unknown>;

const migrators: Array<{ from: string; to: string; migrate: Migrator }> = [];

/**
 * Register a migration path between schema versions.
 * Phase 2 only has version 0.1.0, so no migrations are registered yet.
 * In later phases, call `registerMigration("0.0.x", "0.1.0", migrateFn)` here.
 * @internal — do not call from application code
 */
function registerMigration(from: string, to: string, migrate: Migrator): void {
  migrators.push({ from, to, migrate });
}

function getMigrationPath(from: string, to: string): Array<Migrator> | null {
  if (from === to) return [];

  const path = migrators.find((m) => m.from === from && m.to === to);
  if (path) return [path.migrate];

  return null;
}

export function migrateTemplate(input: unknown): PrintTemplate {
  if (!isObject(input)) {
    return normalizeTemplate({});
  }

  const record = input as Record<string, unknown>;
  const schemaVersion = typeof record.schemaVersion === "string"
    ? record.schemaVersion
    : CORE_SCHEMA_VERSION;

  if (schemaVersion === CORE_SCHEMA_VERSION) {
    return normalizeTemplate(input as Partial<PrintTemplate>);
  }

  const path = getMigrationPath(schemaVersion, CORE_SCHEMA_VERSION);

  if (!path) {
    return normalizeTemplate({
      ...(input as Partial<PrintTemplate>),
      schemaVersion: CORE_SCHEMA_VERSION,
    });
  }

  let current = record;
  for (const migrate of path) {
    current = migrate(current);
  }

  return normalizeTemplate({
    ...(current as Partial<PrintTemplate>),
    schemaVersion: CORE_SCHEMA_VERSION,
  });
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export { registerMigration };
