import {
  fromLegacyTemplate,
  normalizeTemplate,
  type LegacyTemplate,
  type PrintTemplate,
} from "@hiprint-re/core";
import type { ReactTemplateKind, ReactTemplateInput } from "./types";

export function normalizeInputTemplate(
  template: ReactTemplateInput,
  kind: ReactTemplateKind = "auto",
): PrintTemplate {
  const resolvedKind = resolveTemplateKind(template, kind);

  if (resolvedKind === "core") {
    return normalizeTemplate(template as Partial<PrintTemplate>);
  }

  if (resolvedKind === "legacy") {
    return fromLegacyTemplate(template as LegacyTemplate);
  }

  throw new Error("[hiprint-re/react] Unable to detect template kind.");
}

function resolveTemplateKind(
  template: ReactTemplateInput,
  kind: ReactTemplateKind,
): Exclude<ReactTemplateKind, "auto"> {
  if (kind !== "auto") return kind;

  if (isRecord(template) && typeof template.schemaVersion === "string") {
    return "core";
  }

  if (isRecord(template) && Array.isArray(template.panels)) {
    return "legacy";
  }

  throw new Error("[hiprint-re/react] Invalid template input.");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
