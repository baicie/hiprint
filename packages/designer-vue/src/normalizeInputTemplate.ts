import {
  fromLegacyTemplate,
  normalizeTemplate,
  type LegacyTemplate,
  type PrintTemplate,
} from "@hiprint-re/core";
import { isProxy, toRaw } from "vue";

export type DesignerTemplateKind = "core" | "legacy" | "auto";

export type DesignerTemplateInput = PrintTemplate | LegacyTemplate | unknown;

export function normalizeInputTemplate(
  template: DesignerTemplateInput,
  kind: DesignerTemplateKind = "auto",
): PrintTemplate {
  const rawTemplate = deepToRaw(template);
  const resolvedKind = resolveTemplateKind(rawTemplate, kind);

  if (resolvedKind === "core") {
    return normalizeTemplate(rawTemplate as Partial<PrintTemplate>);
  }

  if (resolvedKind === "legacy") {
    return fromLegacyTemplate(rawTemplate as LegacyTemplate);
  }

  throw new Error(
    "[hiprint-re/designer-vue] Invalid template or cannot detect template kind.",
  );
}

function resolveTemplateKind(
  template: DesignerTemplateInput,
  kind: DesignerTemplateKind,
): Exclude<DesignerTemplateKind, "auto"> {
  if (kind !== "auto") return kind;

  if (isRecord(template) && typeof template.schemaVersion === "string") {
    return "core";
  }

  if (isRecord(template) && Array.isArray(template.panels)) {
    return "legacy";
  }

  throw new Error(
    "[hiprint-re/designer-vue] Cannot detect template kind. Please set templateKind explicitly.",
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function deepToRaw<T>(value: T): T {
  const raw = isProxy(value) ? toRaw(value) : value;

  if (Array.isArray(raw)) {
    return raw.map((item) => deepToRaw(item)) as T;
  }

  if (!isPlainRecord(raw)) {
    return raw;
  }

  const result: Record<string, unknown> = {};

  for (const [key, item] of Object.entries(raw)) {
    result[key] = deepToRaw(item);
  }

  return result as T;
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  if (!isRecord(value)) return false;

  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}
