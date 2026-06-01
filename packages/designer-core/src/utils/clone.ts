export function cloneDeep<T>(value: T): T {
  if (typeof structuredClone === "function") {
    try {
      return structuredClone(value);
    } catch {
      // Some adapter/runtime inputs may carry non-structured-cloneable values
      // in opaque `raw` fields (for example framework proxies or functions).
      // History snapshots only need serializable designer state, so fall back
      // to JSON cloning instead of breaking every command dispatch.
    }
  }

  return JSON.parse(JSON.stringify(value)) as T;
}
