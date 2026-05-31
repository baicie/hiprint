import type { PrintTemplate } from "../types/template";
import type { ValidateIssue } from "../types/validate";
import { createValidateResult } from "../types/validate";
import { globalRegistry } from "../registry/globalRegistry";

export function validateTemplate(template: PrintTemplate) {
  const issues: ValidateIssue[] = [];

  if (!template.id) {
    issues.push({
      level: "error",
      code: "template.id.missing",
      path: "id",
      message: "Template id is required.",
    });
  }

  if (!template.schemaVersion) {
    issues.push({
      level: "error",
      code: "template.schemaVersion.missing",
      path: "schemaVersion",
      message: "Template schemaVersion is required.",
    });
  }

  validatePaper(template, issues);
  validatePanels(template, issues);

  return createValidateResult(issues);
}

function validatePaper(template: PrintTemplate, issues: ValidateIssue[]): void {
  const paper = template.paper;

  if (!paper) {
    issues.push({
      level: "error",
      code: "template.paper.missing",
      path: "paper",
      message: "Template paper is required.",
    });
    return;
  }

  if (paper.width <= 0) {
    issues.push({
      level: "error",
      code: "paper.width.invalid",
      path: "paper.width",
      message: "Paper width must be greater than 0.",
    });
  }

  if (paper.height <= 0) {
    issues.push({
      level: "error",
      code: "paper.height.invalid",
      path: "paper.height",
      message: "Paper height must be greater than 0.",
    });
  }
}

function validatePanels(
  template: PrintTemplate,
  issues: ValidateIssue[],
): void {
  if (!Array.isArray(template.panels) || template.panels.length === 0) {
    issues.push({
      level: "error",
      code: "template.panels.empty",
      path: "panels",
      message: "Template must contain at least one panel.",
    });
    return;
  }

  const elementIds = new Set<string>();

  template.panels.forEach((panel, panelIndex) => {
    if (!panel.id) {
      issues.push({
        level: "error",
        code: "panel.id.missing",
        path: `panels.${panelIndex}.id`,
        message: "Panel id is required.",
      });
    }

    panel.elements.forEach((element, elementIndex) => {
      const path = `panels.${panelIndex}.elements.${elementIndex}`;

      if (!element.id) {
        issues.push({
          level: "error",
          code: "element.id.missing",
          path: `${path}.id`,
          message: "Element id is required.",
        });
      }

      if (element.id && elementIds.has(element.id)) {
        issues.push({
          level: "error",
          code: "element.id.duplicated",
          path: `${path}.id`,
          message: `Duplicated element id: ${element.id}.`,
        });
      }

      if (element.id) {
        elementIds.add(element.id);
      }

      if (element.width < 0 || element.height < 0) {
        issues.push({
          level: "error",
          code: "element.size.invalid",
          path,
          message: "Element width and height must be non-negative.",
        });
      }

      if (!globalRegistry.has(element.type) && element.type !== "unknown") {
        issues.push({
          level: "warning",
          code: "element.type.unregistered",
          path: `${path}.type`,
          message: `Unregistered element type "${element.type}". It will be preserved with raw data.`,
        });
      }
    });
  });
}
