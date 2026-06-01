import type {
  PrintElement,
  TableElement,
  TableElementOptions,
  TableColumn,
} from "@hiprint-re/core";
import { normalizeTableOptions } from "@hiprint-re/core";

export function isTableElement(
  element: PrintElement | undefined,
): element is TableElement {
  return Boolean(element && element.type === "table");
}

export function getTableOptions(element: TableElement): TableElementOptions {
  return normalizeTableOptions(element.options);
}

export function updateTableOptions(
  element: TableElement,
  updater: (options: TableElementOptions) => TableElementOptions,
): TableElement {
  const options = getTableOptions(element);

  return {
    ...element,
    options: updater(options),
  };
}

export function createTableColumn(
  input: Partial<TableColumn> = {},
): TableColumn {
  return {
    id: input.id ?? `col_${Math.random().toString(36).slice(2, 8)}`,
    title: input.title ?? "Column",
    field: input.field ?? "",
    width: input.width ?? 40,
    align: input.align ?? "left",
    visible: input.visible ?? true,
    ...input,
  };
}
