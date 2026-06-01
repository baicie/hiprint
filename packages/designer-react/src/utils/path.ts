export function getByPath(target: unknown, path: string): unknown {
  const parts = path.split(".");
  let current: any = target;

  for (const part of parts) {
    if (current == null) return undefined;
    current = current[part];
  }

  return current;
}

export function setByPath<T extends object>(
  target: T,
  path: string,
  value: unknown,
): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const clone = structuredClone(target) as any;
  const parts = path.split(".");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let current: any = clone;

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i]!;

    if (!current[part] || typeof current[part] !== "object") {
      current[part] = {};
    }

    current = current[part];
  }

  current[parts[parts.length - 1]!] = value;

  return clone;
}
