import type { LayoutElement } from "@hiprint-re/core";
import type { DomRenderContext } from "../types";
import { cssLength } from "./cssLength";

/**
 * Applies base geometry styles (position, size, visibility) to a DOM element.
 */
export function applyElementBaseStyle(
  dom: HTMLElement,
  element: LayoutElement,
  ctx: DomRenderContext,
): void {
  const unit = ctx.options.geometryUnit;

  dom.style.left = cssLength(element.x, unit);
  dom.style.top = cssLength(element.y, unit);
  dom.style.width = cssLength(element.width, unit);
  dom.style.height = cssLength(element.height, unit);

  if (element.hidden) {
    dom.style.display = "none";
  }

  applyPrintStyle(dom, element.style, ctx);
}

/**
 * Applies print-related styles (typography, color, border, padding) to a DOM element.
 */
export function applyPrintStyle(
  dom: HTMLElement,
  style: Record<string, unknown> | undefined,
  ctx: DomRenderContext,
): void {
  if (!style) return;

  const typographyUnit = ctx.options.typographyUnit;

  setCss(dom, "color", style.color);
  setCss(dom, "backgroundColor", style.backgroundColor);
  setCss(dom, "fontFamily", style.fontFamily);
  setCss(dom, "fontWeight", style.fontWeight);
  setCss(dom, "textAlign", style.textAlign);

  if (typeof style.fontSize === "number") {
    dom.style.fontSize = cssLength(style.fontSize, typographyUnit);
  }

  if (typeof style.lineHeight === "number") {
    dom.style.lineHeight = cssLength(style.lineHeight, typographyUnit);
  }

  if (typeof style.borderWidth === "number") {
    dom.style.borderWidth = cssLength(
      style.borderWidth,
      ctx.options.geometryUnit,
    );
  }

  setCss(dom, "borderColor", style.borderColor);
  setCss(dom, "borderStyle", style.borderStyle);

  if (typeof style.paddingTop === "number") {
    dom.style.paddingTop = cssLength(
      style.paddingTop as number,
      ctx.options.geometryUnit,
    );
  }

  if (typeof style.paddingRight === "number") {
    dom.style.paddingRight = cssLength(
      style.paddingRight as number,
      ctx.options.geometryUnit,
    );
  }

  if (typeof style.paddingBottom === "number") {
    dom.style.paddingBottom = cssLength(
      style.paddingBottom as number,
      ctx.options.geometryUnit,
    );
  }

  if (typeof style.paddingLeft === "number") {
    dom.style.paddingLeft = cssLength(
      style.paddingLeft as number,
      ctx.options.geometryUnit,
    );
  }
}

function setCss(
  dom: HTMLElement,
  key: keyof CSSStyleDeclaration,
  value: unknown,
): void {
  if (typeof value === "string" || typeof value === "number") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (dom.style as any)[key] = String(value);
  }
}
