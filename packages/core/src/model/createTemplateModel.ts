import type { PrintTemplate } from "../types/template";
import { normalizeTemplate } from "../schema/normalizeTemplate";
import { TemplateModel } from "./TemplateModel";

export function createTemplateModel(
  template: Partial<PrintTemplate>,
): TemplateModel {
  return new TemplateModel(normalizeTemplate(template));
}
