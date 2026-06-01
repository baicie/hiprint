import type { TextElement } from "../types/element";
import type { LayoutTextElement } from "./types";
import type { LayoutElementInput } from "./layoutElement";
import { resolveBindingValue } from "./resolveBinding";
import { normalizeYInPage, isRectOverflow, safeNumber } from "./utils";
import { warnElementOverflow } from "./warnings";

export function layoutText(input: LayoutElementInput): LayoutTextElement {
  const { ctx, panel, element, pageIndex, pageHeight, elementPath } =
    input;
  const textElement = element as TextElement;

  const value = resolveBindingValue(
    textElement.binding,
    ctx.data,
    textElement.options?.content ?? textElement.binding?.title,
  );

  const fontSize = safeNumber(textElement.style?.fontSize, 12);
  const lineHeight = safeNumber(
    textElement.style?.lineHeight,
    fontSize * 1.2,
  );

  const measured = ctx.measureText.measure({
    text: value,
    fontSize,
    fontFamily: textElement.style?.fontFamily,
    fontWeight: textElement.style?.fontWeight,
    lineHeight,
    maxWidth: textElement.width,
    unit: ctx.unit,
  });

  const height = Math.max(textElement.height, measured.height);

  const layout: LayoutTextElement = {
    id: textElement.id,
    sourcePanelId: panel.id,
    sourceElementId: textElement.id,
    pageIndex,
    type: "text",
    x: textElement.x,
    y: normalizeYInPage(textElement.y, pageHeight),
    width: textElement.width,
    height,
    value,
    lines: measured.lines,
    fontSize,
    lineHeight: measured.lineHeight,
    hidden: textElement.hidden,
    style: textElement.style,
    raw: textElement.raw,
  };

  if (
    !ctx.allowOverflow &&
    isRectOverflow(layout, {
      x: 0,
      y: 0,
      width: input.pageWidth,
      height: pageHeight,
    })
  ) {
    warnElementOverflow({
      ctx,
      elementId: textElement.id,
      path: elementPath,
    });
  }

  return layout;
}
