import type { PrintPanel } from "../types/panel";
import type { LayoutContext } from "./types";
import type { PageBuilder } from "./pageBuilder";
import { layoutElement } from "./layoutElement";
import { getPageIndexByY } from "./utils";

export interface LayoutPanelInput {
  ctx: LayoutContext;
  panel: PrintPanel;
  pageBuilder: PageBuilder;
  pageWidth: number;
  pageHeight: number;
}

export function layoutPanel(input: LayoutPanelInput): void {
  const { ctx, panel, pageBuilder, pageWidth, pageHeight } = input;

  for (const [elementIndex, element] of panel.elements.entries()) {
    if (element.hidden) continue;

    const pageIndex = getPageIndexByY(element.y, pageHeight);

    const result = layoutElement({
      ctx,
      panel,
      element,
      pageIndex,
      pageWidth,
      pageHeight,
      elementPath: `panels.${panel.index}.elements.${elementIndex}`,
    });

    for (const le of result) {
      pageBuilder.addElement(le.pageIndex, le);
    }
  }
}
