import {
  fromLegacyTemplate,
  normalizeTemplate,
  type LegacyTemplate,
  type PrintTemplate,
} from "@hiprint-re/core";

export type DesignerTemplateKind = "core" | "legacy" | "auto";

export type DesignerTemplateInput = PrintTemplate | LegacyTemplate | unknown;

export function normalizeInputTemplate(
  template: DesignerTemplateInput,
  kind: DesignerTemplateKind = "auto",
): PrintTemplate {
  const resolvedKind = resolveTemplateKind(template, kind);

  if (resolvedKind === "core") {
    return normalizeTemplate(template as Partial<PrintTemplate>);
  }

  if (resolvedKind === "legacy") {
    return fromLegacyTemplate(template as LegacyTemplate);
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
