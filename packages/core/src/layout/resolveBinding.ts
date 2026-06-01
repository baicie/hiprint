import type { DataBinding } from "../types/element";

export function resolveBindingValue(
  binding: DataBinding | undefined,
  data: unknown,
  fallback?: unknown,
): string {
  if (!binding?.field) {
    return stringifyValue(fallback ?? binding?.title ?? "");
  }

  const value = getByPath(data, binding.field);

  return stringifyValue(value ?? fallback ?? "");
}

export function getByPath(data: unknown, path: string): unknown {
  if (!path) return undefined;

  const parts = path.split(".");
  let current: unknown = data;

  for (const part of parts) {
    if (current == null) return undefined;
    if (typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }

  return current;
}

export function stringifyValue(value: unknown): string {
  if (value == null) return "";

  if (typeof value === "string") return value;

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  return JSON.stringify(value);
}
