import type { TableElementOptions } from "../types/table";
import {
  defaultTableBodyOptions,
  defaultTableBorderOptions,
  defaultTableFooterOptions,
  defaultTableHeaderOptions,
  defaultTablePaginationOptions,
} from "./defaults";

export function normalizeTableOptions(
  options: Partial<TableElementOptions> | undefined,
): TableElementOptions {
  return {
    dataField: options?.dataField,
    columns: Array.isArray(options?.columns) ? options.columns : [],

    header: {
      ...defaultTableHeaderOptions,
      ...options?.header,
    },

    body: {
      ...defaultTableBodyOptions,
      ...options?.body,
    },

    footer: {
      ...defaultTableFooterOptions,
      ...options?.footer,
      rows: Array.isArray(options?.footer?.rows) ? options.footer.rows : [],
    },

    pagination: {
      ...defaultTablePaginationOptions,
      ...options?.pagination,
    },

    border: {
      ...defaultTableBorderOptions,
      ...options?.border,
    },

    merges: Array.isArray(options?.merges) ? options.merges : [],
  };
}
