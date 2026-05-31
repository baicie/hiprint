export interface RuntimeSnapshot {
  timestamp: string;
  globals: {
    hasHiprint: boolean;
    hasHiprintTemplate: boolean;
    hasJquery: boolean;
  };
  hiprintKeys: string[];
  hiprintTemplateKeys: string[];
  hiprintTemplatePrototypeKeys: string[];
}

export function createRuntimeSnapshot(): RuntimeSnapshot {
  const hiprint = window.hiprint;
  const TemplateCtor = window.hiprintTemplate;

  return {
    timestamp: new Date().toISOString(),
    globals: {
      hasHiprint: Boolean(hiprint),
      hasHiprintTemplate: Boolean(TemplateCtor),
      hasJquery: Boolean(window.$ || window.jQuery),
    },
    hiprintKeys: getKeys(hiprint),
    hiprintTemplateKeys: getKeys(TemplateCtor),
    hiprintTemplatePrototypeKeys: getKeys(TemplateCtor?.prototype),
  };
}

function getKeys(value: unknown): string[] {
  if (!value || (typeof value !== "object" && typeof value !== "function")) {
    return [];
  }

  const keys = new Set<string>();

  let current: unknown = value;

  while (current && current !== Object.prototype) {
    for (const key of Object.getOwnPropertyNames(current as object)) {
      keys.add(key);
    }

    current = Object.getPrototypeOf(current as object);
  }

  return [...keys].sort();
}
