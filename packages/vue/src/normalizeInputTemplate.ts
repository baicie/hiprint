import {
  fromLegacyTemplate,
  normalizeTemplate,
  type LegacyTemplate,
  type PrintTemplate,
} from "@hiprint-re/core";
import type { VueTemplateInput, VueTemplateKind } from "./types";

export function normalizeInputTemplate(
  template: VueTemplateInput,
  kind: VueTemplateKind = "auto",
): PrintTemplate {
  const resolvedKind = resolveTemplateKind(template, kind);

  if (resolvedKind === "core") {
    return normalizeTemplate(template as Partial<PrintTemplate>);
  }

  if (resolvedKind === "legacy") {
    return fromLegacyTemplate(template as LegacyTemplate);
  }

  throw new Error("[hiprint-re/vue] Unable to detect template kind.");
}

function resolveTemplateKind(
  template: VueTemplateInput,
  kind: VueTemplateKind,
): Exclude<VueTemplateKind, "auto"> {
  if (kind !== "auto") return kind;

  if (isRecord(template) && typeof template.schemaVersion === "string") {
    return "core";
  }

  if (isRecord(template) && Array.isArray(template.panels)) {
    return "legacy";
  }

  throw new Error("[hiprint-re/vue] Invalid template input.");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
