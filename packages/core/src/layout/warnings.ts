import type { LayoutContext, LayoutWarning } from "./types";

export function pushLayoutWarning(
  ctx: LayoutContext,
  warning: LayoutWarning,
): void {
  ctx.warnings.push(warning);
}

export function warnElementOverflow(input: {
  ctx: LayoutContext;
  elementId: string;
  path: string;
}): void {
  pushLayoutWarning(input.ctx, {
    level: "warning",
    code: "element.overflow",
    elementId: input.elementId,
    path: input.path,
    message: `Element "${input.elementId}" overflows page bounds.`,
  });
}

export function warnUnknownElement(input: {
  ctx: LayoutContext;
  elementId: string;
  path: string;
}): void {
  pushLayoutWarning(input.ctx, {
    level: "warning",
    code: "element.unknown",
    elementId: input.elementId,
    path: input.path,
    message: `Element "${input.elementId}" has unknown type.`,
  });
}
