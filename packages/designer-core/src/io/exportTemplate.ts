import type { PrintTemplate } from "@hiprint-re/core";

export interface ExportTemplateOptions {
  pretty?: boolean;
}

export function exportTemplateToJson(
  template: PrintTemplate,
  options: ExportTemplateOptions = {},
): string {
  return JSON.stringify(template, null, options.pretty === false ? 0 : 2);
}
