import type { PrintTemplate } from "../types/template";
import type { LayoutContext, LayoutDocument, LayoutOptions } from "./types";
import { resolvePaper } from "./paper";
import { createDefaultTextMeasurer } from "./measureText";
import { layoutPanel } from "./layoutPanel";
import { PageBuilder } from "./pageBuilder";

export function layoutTemplate(
  template: PrintTemplate,
  data: unknown = {},
  options: LayoutOptions = {},
): LayoutDocument {
  const unit = options.unit ?? template.paper.unit ?? "mm";
  const dpi = options.dpi ?? 96;

  const paper = resolvePaper(template.paper, unit, dpi);

  const ctx: LayoutContext = {
    template,
    data,
    unit,
    dpi,
    allowOverflow: options.allowOverflow ?? false,
    measureText: options.measureText ?? createDefaultTextMeasurer(),
    warnings: [],
  };

  const pageBuilder = new PageBuilder({
    width: paper.width,
    height: paper.height,
  });

  for (const panel of template.panels) {
    layoutPanel({
      ctx,
      panel,
      pageBuilder,
      pageWidth: paper.width,
      pageHeight: paper.height,
    });
  }

  return {
    unit,
    width: paper.width,
    height: paper.height,
    pages: pageBuilder.getPages(),
    warnings: ctx.warnings,
  };
}
