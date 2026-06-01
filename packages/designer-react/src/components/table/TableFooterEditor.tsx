import type { TableElementOptions, TableFooterRow } from "@hiprint-re/core";
import { createUpdateTableOptionsCommand } from "@hiprint-re/designer-core";
import { useDesignerContext } from "../../context/useDesignerContext";

export interface TableFooterEditorProps {
  tableId: string;
  options: TableElementOptions;
}

export function TableFooterEditor(props: TableFooterEditorProps) {
  const { store, onChange } = useDesignerContext();

  function updateFooter(rows: TableFooterRow[]) {
    store.dispatch(
      createUpdateTableOptionsCommand({
        tableId: props.tableId,
        patch: {
          footer: {
            ...props.options.footer,
            show: rows.length > 0,
            rows,
          },
        },
      }),
    );

    onChange?.(store.getStateRef().template);
  }

  function addFooterRow() {
    const columns = props.options.columns;
    const row: TableFooterRow = {
      id: `footer_${Math.random().toString(36).slice(2, 8)}`,
      height: 8,
      cells: columns.map((column, index) => ({
        id: `footer_cell_${column.id}`,
        columnId: column.id,
        value: index === 0 ? "Total" : "",
      })),
    };

    updateFooter([...(props.options.footer?.rows ?? []), row]);
  }

  function updateCell(rowId: string, columnId: string, value: string) {
    const rows = (props.options.footer?.rows ?? []).map((row) => {
      if (row.id !== rowId) return row;

      return {
        ...row,
        cells: row.cells.map((cell) =>
          cell.columnId === columnId
            ? {
                ...cell,
                value,
              }
            : cell,
        ),
      };
    });

    updateFooter(rows);
  }

  function updateRowHeight(rowId: string, height: number) {
    const rows = (props.options.footer?.rows ?? []).map((row) =>
      row.id === rowId ? { ...row, height } : row,
    );
    updateFooter(rows);
  }

  function removeFooterRow(rowId: string) {
    updateFooter(
      (props.options.footer?.rows ?? []).filter((row) => row.id !== rowId),
    );
  }

  return (
    <div className="hiprint-designer-property-group">
      <div className="hiprint-designer-property-group-title">Footer</div>

      <div className="hiprint-table-footer-editor">
        {(props.options.footer?.rows ?? []).map((row) => (
          <div key={row.id} className="hiprint-table-footer-row">
            <div className="hiprint-table-footer-row-header">
              <label className="hiprint-designer-field">
                <span>Height</span>
                <input
                  type="number"
                  value={row.height}
                  onChange={(event) =>
                    updateRowHeight(row.id, Number(event.target.value))
                  }
                />
              </label>
              <button
                className="hiprint-table-remove-footer"
                onClick={() => removeFooterRow(row.id)}
              >
                Remove
              </button>
            </div>
            <div className="hiprint-table-footer-cells">
              {row.cells.map((cell) => (
                <label key={cell.columnId}>
                  <span>{cell.columnId}</span>
                  <input
                    value={cell.value ?? ""}
                    onChange={(event) =>
                      updateCell(row.id, cell.columnId, event.target.value)
                    }
                  />
                </label>
              ))}
            </div>
          </div>
        ))}

        <button className="hiprint-table-add-footer" onClick={addFooterRow}>
          + Add Footer Row
        </button>
      </div>
    </div>
  );
}
