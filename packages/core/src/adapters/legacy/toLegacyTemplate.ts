import type { PrintTemplate } from "../../types/template";
import type { PrintPanel } from "../../types/panel";
import type { PrintElement } from "../../types/element";
import type {
  LegacyPanel,
  LegacyPrintElement,
  LegacyTemplate,
} from "../../types/legacy";
import { toLegacyElementType } from "./mapLegacyElementType";

export function toLegacyTemplate(template: PrintTemplate): LegacyTemplate {
  return {
    panels: template.panels.map(toLegacyPanel),
  };
}

function toLegacyPanel(panel: PrintPanel): LegacyPanel {
  const legacyPanel = getRawLegacyPanel(panel);

  return {
    ...legacyPanel,
    index: panel.index,
    name: panel.name,
    width: panel.paper?.width,
    height: panel.paper?.height,
    paperType: panel.paper?.preset,
    printElements: panel.elements.map(toLegacyElement),
  };
}

function toLegacyElement(element: PrintElement): LegacyPrintElement {
  const rawLegacyElement = getRawLegacyElement(element);

  return {
    ...rawLegacyElement,
    options: {
      ...rawLegacyElement?.options,
      left: element.x,
      top: element.y,
      width: element.width,
      height: element.height,
      rotate: element.rotate,
      hidden: element.hidden,
      fixed: element.locked,
      title: element.binding?.title,
      field: element.binding?.field,
      formatter: element.binding?.formatter,
      expression: element.binding?.expression,
      ...toLegacyOptions(element),
    },
    printElementType: {
      ...rawLegacyElement?.printElementType,
      type: toLegacyElementType(element.type),
    },
  };
}

function toLegacyOptions(element: PrintElement): Record<string, unknown> {
  const styleOptions = {
    borderColor: element.style?.borderColor,
    borderWidth: element.style?.borderWidth,
    borderStyle: element.style?.borderStyle,
    paddingTop: element.style?.paddingTop,
    paddingRight: element.style?.paddingRight,
    paddingBottom: element.style?.paddingBottom,
    paddingLeft: element.style?.paddingLeft,
  };

  if (element.type === "text") {
    return {
      ...styleOptions,
      text: element.options?.content,
    };
  }

  if (element.type === "image") {
    return {
      ...styleOptions,
      src: element.options?.src,
    };
  }

  if (element.type === "table") {
    return {
      ...styleOptions,
      columns: toLegacyColumns(element.options?.columns),
      field: element.options?.dataField ?? element.binding?.field,
    };
  }

  if (element.type === "rect" || element.type === "html") {
    return {
      ...styleOptions,
      ...element.options,
    };
  }

  return {
    ...element.options,
    ...styleOptions,
  };
}

function toLegacyColumns(columns: unknown): unknown[] {
  if (!Array.isArray(columns)) return [];

  return columns.map((col) => {
    if (Array.isArray(col)) {
      return col.map(toLegacyColumn);
    }
    return toLegacyColumn(col);
  });
}

function toLegacyColumn(col: unknown): Record<string, unknown> {
  if (!isRecord(col)) return {};

  return {
    field: col.field,
    title: col.title,
    width: col.width,
    align: col.align,
  };
}

function getRawLegacyPanel(panel: PrintPanel): LegacyPanel {
  const raw = panel.raw?.legacyPanel;

  if (isRecord(raw)) {
    return raw as LegacyPanel;
  }

  return {};
}

function getRawLegacyElement(element: PrintElement): LegacyPrintElement {
  const raw = element.raw?.legacyElement;

  if (isRecord(raw)) {
    return raw as LegacyPrintElement;
  }

  return {};
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
