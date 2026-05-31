import { CORE_SCHEMA_VERSION } from "../version";
import type { PrintTemplate } from "../types/template";
import type { PrintPanel } from "../types/panel";
import type { PrintElement } from "../types/element";
import { createId, getPresetDimensions } from "./createEmptyTemplate";
import { isPrintElement } from "./elementTypeGuards";

export function normalizeTemplate(
  input: Partial<PrintTemplate>,
): PrintTemplate {
  const rawPanels = Array.isArray(input.panels) ? input.panels : null;
  const preset = input.paper?.preset ?? "A4";
  const presetDimensions = getPresetDimensions(preset);

  const panels: PrintPanel[] = rawPanels === null
    ? [{ id: createId("panel"), index: 0, name: "default", elements: [] }]
    : rawPanels.map(normalizePanel);

  return {
    schemaVersion: CORE_SCHEMA_VERSION,
    id: input.id || createId("template"),
    meta: {
      source: input.meta?.source ?? "core",
      ...input.meta,
    },
    paper: {
      preset,
      width: input.paper?.width ?? presetDimensions.width,
      height: input.paper?.height ?? presetDimensions.height,
      unit: input.paper?.unit ?? "mm",
      orientation: input.paper?.orientation ?? "portrait",
      margin: {
        top: input.paper?.margin?.top ?? 0,
        right: input.paper?.margin?.right ?? 0,
        bottom: input.paper?.margin?.bottom ?? 0,
        left: input.paper?.margin?.left ?? 0,
      },
    },
    panels,
    raw: input.raw,
  };
}

function normalizePanel(panel: Partial<PrintPanel>, index: number): PrintPanel {
  return {
    id: panel.id || createId(`panel_${index}`),
    index: panel.index ?? index,
    name: panel.name ?? `panel-${index}`,
    paper: panel.paper,
    elements: Array.isArray(panel.elements)
      ? panel.elements.map((element, elementIndex) =>
          normalizeElement(element, index, elementIndex),
        )
      : [],
    raw: panel.raw,
  };
}

function normalizeElement(
  element: Partial<PrintElement> | PrintElement,
  panelIndex: number,
  elementIndex: number,
): PrintElement {
  if (isPrintElement(element)) {
    return element;
  }

  return {
    id: element.id || createId(`p${panelIndex}_el${elementIndex}`),
    type: element.type ?? "unknown",

    x: toNumber(element.x, 0),
    y: toNumber(element.y, 0),
    width: toNumber(element.width, 0),
    height: toNumber(element.height, 0),

    rotate: element.rotate,
    hidden: element.hidden,
    locked: element.locked,

    binding: element.binding,
    style: element.style,
    options: element.options,
    raw: element.raw,
  };
}

function toNumber(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}
