import type { TableElement } from "../types/element";
import { getByPath } from "../layout/resolveBinding";

export function resolveTableData(
  element: TableElement,
  data: unknown,
): unknown[] {
  const dataField = element.options?.dataField ?? element.binding?.field;

  if (!dataField) return [];

  const value = getByPath(data, dataField);

  return Array.isArray(value) ? value : [];
}
