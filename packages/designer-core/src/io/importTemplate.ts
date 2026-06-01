import {
  migrateTemplate,
  validateTemplate,
  type PrintTemplate,
} from "@hiprint-re/core";

export interface ImportTemplateResult {
  template: PrintTemplate;
  warnings: string[];
}

export function importTemplateFromJson(json: string): ImportTemplateResult {
  const raw = JSON.parse(json);
  const template = migrateTemplate(raw);
  const result = validateTemplate(template);

  return {
    template,
    warnings: result.issues
      .filter((issue) => issue.level === "warning")
      .map((issue) => issue.message),
  };
}
