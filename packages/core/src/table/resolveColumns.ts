import type { TableColumn } from "../types/table";
import type { LayoutTableColumn } from "../layout/tableTypes";

export function resolveTableColumns(
  columns: TableColumn[],
  tableWidth: number,
): LayoutTableColumn[] {
  const visibleColumns = flattenColumns(columns).filter(
    (column) => column.visible !== false,
  );

  if (visibleColumns.length === 0) return [];

  const explicitWidth = visibleColumns.reduce((sum, column) => {
    return sum + (typeof column.width === "number" ? column.width : 0);
  }, 0);

  const missing = visibleColumns.filter(
    (column) => typeof column.width !== "number",
  );

  const fallbackWidth =
    missing.length > 0
      ? Math.max(0, tableWidth - explicitWidth) / missing.length
      : 0;

  let x = 0;

  return visibleColumns.map((column) => {
    const width =
      typeof column.width === "number" ? column.width : fallbackWidth;

    const result: LayoutTableColumn = {
      id: column.id,
      field: column.field,
      title: column.title,
      x,
      width,
      align: column.align,
      style: column.style,
    };

    x += width;

    return result;
  });
}

export function flattenColumns(columns: TableColumn[]): TableColumn[] {
  const result: TableColumn[] = [];

  for (const column of columns) {
    if (Array.isArray(column.children) && column.children.length > 0) {
      result.push(...flattenColumns(column.children));
    } else {
      result.push(column);
    }
  }

  return result;
}
