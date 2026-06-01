import type { TableColumn } from "@hiprint-re/core";
import {
  createAddTableColumnCommand,
  createRemoveTableColumnCommand,
  createUpdateTableColumnCommand,
} from "@hiprint-re/designer-core";
import { useDesignerContext } from "../../context/useDesignerContext";

export interface TableColumnEditorProps {
  tableId: string;
  columns: TableColumn[];
}

export function TableColumnEditor(props: TableColumnEditorProps) {
  const { store, onChange } = useDesignerContext();

  function emitChange() {
    onChange?.(store.getStateRef().template);
  }

  function addColumn() {
    store.dispatch(
      createAddTableColumnCommand({
        tableId: props.tableId,
        column: {
          title: "Column",
          field: "",
          width: 40,
        },
      }),
    );
    emitChange();
  }

  function removeColumn(columnId: string) {
    store.dispatch(
      createRemoveTableColumnCommand({
        tableId: props.tableId,
        columnId,
      }),
    );
    emitChange();
  }

  function updateColumn(columnId: string, patch: Partial<TableColumn>) {
    store.dispatch(
      createUpdateTableColumnCommand({
        tableId: props.tableId,
        columnId,
        patch,
      }),
    );
    emitChange();
  }

  return (
    <div className="hiprint-designer-property-group">
      <div className="hiprint-designer-property-group-title">Columns</div>

      <div className="hiprint-table-column-editor">
        {props.columns.map((column) => (
          <div key={column.id} className="hiprint-table-column-item">
            <label>
              <span>Title</span>
              <input
                value={column.title ?? ""}
                onChange={(event) =>
                  updateColumn(column.id, {
                    title: event.target.value,
                  })
                }
              />
            </label>

            <label>
              <span>Field</span>
              <input
                value={column.field ?? ""}
                onChange={(event) =>
                  updateColumn(column.id, {
                    field: event.target.value,
                  })
                }
              />
            </label>

            <label>
              <span>Width</span>
              <input
                type="number"
                value={column.width ?? 40}
                onChange={(event) =>
                  updateColumn(column.id, {
                    width: Number(event.target.value),
                  })
                }
              />
            </label>

            <label>
              <span>Align</span>
              <select
                value={column.align ?? "left"}
                onChange={(event) =>
                  updateColumn(column.id, {
                    align: event.target.value as "left" | "center" | "right",
                  })
                }
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </label>

            <label className="hiprint-designer-field is-checkbox">
              <span>Visible</span>
              <input
                type="checkbox"
                checked={column.visible ?? true}
                onChange={(event) =>
                  updateColumn(column.id, {
                    visible: event.target.checked,
                  })
                }
              />
            </label>

            <button
              className="hiprint-table-remove-column"
              onClick={() => removeColumn(column.id)}
            >
              Remove
            </button>
          </div>
        ))}

        <button className="hiprint-table-add-column" onClick={addColumn}>
          + Add Column
        </button>
      </div>
    </div>
  );
}
