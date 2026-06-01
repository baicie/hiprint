import type { LayoutElement } from "@hiprint-re/core";
import type { PdfRenderContext } from "../types";
import { renderPdfText } from "./renderPdfText";
import { renderPdfLine } from "./renderPdfLine";
import { renderPdfRect } from "./renderPdfRect";
import { renderPdfTable } from "./renderPdfTable";
import { renderPdfImage } from "./renderPdfImage";

export async function renderPdfElement(
  element: LayoutElement,
  ctx: PdfRenderContext,
): Promise<void> {
  switch (element.type) {
    case "text":
      renderPdfText(element as never, ctx);
      return;

    case "image":
      await renderPdfImage(element as never, ctx);
      return;

    case "line":
      renderPdfLine(element as never, ctx);
      return;

    case "rect":
      renderPdfRect(element as never, ctx);
      return;

    case "table":
      renderPdfTable(element as never, ctx);
      return;
  }

  const custom = ctx.options.renderers?.find(
    (renderer) => renderer.type === element.type,
  );

  if (custom) {
    await custom.render(element, ctx);
  } else {
    renderPdfRect(
      {
        ...element,
        type: "rect",
        style: {
          borderColor: "#9ca3af",
          borderWidth: 0.5,
        },
      } as never,
      ctx,
    );
  }
}
