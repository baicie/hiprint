export function getByPath(target: unknown, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = target;

  for (const part of parts) {
    if (current == null) return undefined;
    current = (current as Record<string, unknown>)[part];
  }

  return current;
}

export function setByPath<T extends object>(
  target: T,
  path: string,
  value: unknown,
): T {
  const clone = structuredClone(target);
  const parts = path.split(".");

  let current: Record<string, unknown> = clone as Record<string, unknown>;

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i]!;

    if (
      current[part] == null ||
      typeof current[part] !== "object" ||
      Array.isArray(current[part])
    ) {
      current[part] = {};
    }

    current = current[part] as Record<string, unknown>;
  }

  current[parts[parts.length - 1]!] = value;

  return clone as T;
}
