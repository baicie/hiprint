import { CORE_SCHEMA_VERSION } from "../../version";
import type {
  LegacyPanel,
  LegacyPrintElement,
  LegacyTemplate,
} from "../../types/legacy";
import type { PrintTemplate } from "../../types/template";
import type { PrintPanel } from "../../types/panel";
import type { PrintElement, TableColumn } from "../../types/element";
import type { PaperOrientation } from "../../types/paper";
import type { PrintStyle } from "../../types/style";
import { normalizeTemplate } from "../../schema/normalizeTemplate";
import { mapLegacyElementType } from "./mapLegacyElementType";

/**
 * Legacy hiprint stores element geometry in px at 96dpi, not mm.
 * This constant reflects that internal coordinate system.
 */
const LEGACY_DPI = 96;

function pxToMm(px: number): number {
  return (px / LEGACY_DPI) * 25.4;
}

export interface FromLegacyTemplateOptions {
  id?: string;
  name?: string;
}

export function fromLegacyTemplate(
  legacy: LegacyTemplate,
  options: FromLegacyTemplateOptions = {},
): PrintTemplate {
  const panels = Array.isArray(legacy.panels) ? legacy.panels : [];

  const firstPanel = panels[0];

  const width = toNumber(firstPanel?.width, 210);
  const height = toNumber(firstPanel?.height, 297);

  const template: PrintTemplate = {
    schemaVersion: CORE_SCHEMA_VERSION,
    id: options.id ?? "template_legacy",
    meta: {
      name: options.name,
      source: "legacy",
    },
    paper: {
      preset: inferPaperPreset(firstPanel?.paperType),
      width,
      height,
      unit: "mm",
      orientation: inferOrientation(width, height),
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    panels: panels.map(mapLegacyPanel),
    raw: {
      legacy,
    },
  };

  return normalizeTemplate(template);
}

function mapLegacyPanel(panel: LegacyPanel, panelIndex: number): PrintPanel {
  const printElements = Array.isArray(panel.printElements)
    ? panel.printElements
    : [];

  return {
    id: `legacy_panel_${panel.index ?? panelIndex}`,
    index: panel.index ?? panelIndex,
    name: panel.name ?? `panel-${panelIndex}`,
    paper: {
      width: toNumber(panel.width, 210),
      height: toNumber(panel.height, 297),
      preset: inferPaperPreset(panel.paperType),
      orientation: "portrait",
      unit: "mm",
    },
    elements: printElements.map((element, elementIndex) =>
      mapLegacyElement(element, panelIndex, elementIndex),
    ),
    raw: {
      legacyPanel: panel,
    },
  };
}

function mapLegacyElement(
  element: LegacyPrintElement,
  panelIndex: number,
  elementIndex: number,
): PrintElement {
  const options = element.options ?? {};
  const legacyType = element.printElementType?.type;
  const type = mapLegacyElementType(legacyType);

  const base = {
    id: createLegacyElementId(panelIndex, elementIndex, options),
    x: pxToMm(toNumber(options.left, 0)),
    y: pxToMm(toNumber(options.top, 0)),
    width: pxToMm(toNumber(options.width, 0)),
    height: pxToMm(toNumber(options.height, 0)),
    rotate: toNumber(options.rotate, undefined),
    hidden: options.hidden === true || options.hidden === 1,
    locked: options.fixed === true,
    binding: {
      field: typeof options.field === "string" ? options.field : undefined,
      title: typeof options.title === "string" ? options.title : undefined,
      formatter:
        typeof options.formatter === "string" ? options.formatter : undefined,
      expression:
        typeof options.expression === "string" ? options.expression : undefined,
    },
    style: extractStyle(options),
    options: mapLegacyOptionsByType(type, options),
    raw: {
      legacyElement: element,
      legacyType,
    },
  };

  switch (type) {
    case "text":
      return { ...base, type: "text" };
    case "image":
      return { ...base, type: "image" };
    case "line":
      return { ...base, type: "line" };
    case "rect":
      return { ...base, type: "rect" };
    case "table":
      return { ...base, type: "table" };
    case "html":
      return { ...base, type: "html" };
    case "barcode":
      return { ...base, type: "barcode" };
    case "qrcode":
      return { ...base, type: "qrcode" };
    default:
      return { ...base, type: "unknown" };
  }
}

function mapLegacyOptionsByType(
  type: string,
  options: Record<string, unknown>,
): Record<string, unknown> {
  if (type === "text") {
    return {
      content: options.text ?? options.title,
    };
  }

  if (type === "image") {
    return {
      src: options.src,
      objectFit: options.objectFit,
    };
  }

  if (type === "table") {
    return {
      columns: mapLegacyColumns(options.columns),
      dataField: options.field,
      showHeader: options.showHeader ?? true,
    };
  }

  return {
    ...options,
  };
}

function mapLegacyColumns(input: unknown): TableColumn[] {
  if (!Array.isArray(input)) return [];

  const result: TableColumn[] = [];

  for (const column of input) {
    if (Array.isArray(column)) {
      for (const inner of column) {
        const record = isRecord(inner) ? inner : {};
        result.push(makeTableColumn(record, result.length));
      }
    } else {
      const record = isRecord(column) ? column : {};
      result.push(makeTableColumn(record, result.length));
    }
  }

  return result;
}

function makeTableColumn(
  record: Record<string, unknown>,
  index: number,
): TableColumn {
  return {
    id: String(record.id ?? record.field ?? `column_${index}`),
    field: typeof record.field === "string" ? record.field : undefined,
    title: typeof record.title === "string" ? record.title : undefined,
    width: toNumber(record.width, undefined),
    align: normalizeAlign(record.align),
    raw: {
      legacyColumn: record,
    },
  };
}

function extractStyle(options: Record<string, unknown>): PrintStyle {
  return {
    fontSize: toNumber(options.fontSize, undefined),
    fontFamily:
      typeof options.fontFamily === "string" ? options.fontFamily : undefined,
    fontWeight: normalizeFontWeight(options.fontWeight),
    color:
      typeof options.color === "string"
        ? options.color
        : typeof options.fontColor === "string"
          ? options.fontColor
          : undefined,
    backgroundColor:
      typeof options.backgroundColor === "string"
        ? options.backgroundColor
        : undefined,
    textAlign: normalizeTextAlign(options.textAlign),
    verticalAlign: normalizeVerticalAlign(options.verticalAlign),
    lineHeight: toNumber(options.lineHeight, undefined),

    borderColor:
      typeof options.borderColor === "string" ? options.borderColor : undefined,
    borderWidth: toNumber(options.borderWidth, undefined),
    borderStyle: normalizeBorderStyle(options.borderStyle),

    paddingTop: toNumber(options.paddingTop, undefined),
    paddingRight: toNumber(options.paddingRight, undefined),
    paddingBottom: toNumber(options.paddingBottom, undefined),
    paddingLeft: toNumber(options.paddingLeft, undefined),
  };
}

function normalizeBorderStyle(
  value: unknown,
): "solid" | "dashed" | "dotted" | "none" | undefined {
  if (
    value === "solid" ||
    value === "dashed" ||
    value === "dotted" ||
    value === "none"
  ) {
    return value;
  }
  return undefined;
}

function createLegacyElementId(
  panelIndex: number,
  elementIndex: number,
  options: Record<string, unknown>,
): string {
  if (typeof options.id === "string" && options.id) {
    return options.id;
  }

  return `legacy_p${panelIndex}_el${elementIndex}`;
}

function inferPaperPreset(value: unknown): "A3" | "A4" | "A5" | "B5" | "custom" {
  if (value === "A3" || value === "A4" || value === "A5" || value === "B5") {
    return value;
  }

  return "custom";
}

function inferOrientation(width: number, height: number): PaperOrientation {
  return width > height ? "landscape" : "portrait";
}

function normalizeTextAlign(
  value: unknown,
): "left" | "center" | "right" | undefined {
  if (value === "left" || value === "center" || value === "right") {
    return value;
  }

  return undefined;
}

function normalizeAlign(
  value: unknown,
): "left" | "center" | "right" | undefined {
  if (value === "left" || value === "center" || value === "right") {
    return value;
  }

  return undefined;
}

function normalizeFontWeight(value: unknown): string | number | undefined {
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  return undefined;
}

function normalizeVerticalAlign(
  value: unknown,
): "top" | "middle" | "bottom" | undefined {
  if (value === "top" || value === "middle" || value === "bottom") {
    return value;
  }
  return undefined;
}

function toNumber(value: unknown, fallback: number): number;
function toNumber(value: unknown, fallback: undefined): number | undefined;
function toNumber(value: unknown, fallback: number | undefined): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
