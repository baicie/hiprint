import type { TableElementOptions } from "@hiprint-re/core";
import { createUpdateTableOptionsCommand } from "@hiprint-re/designer-core";
import { useDesignerContext } from "../../context/useDesignerContext";

export interface TableGeneralEditorProps {
  tableId: string;
  options: TableElementOptions;
}

export function TableGeneralEditor(props: TableGeneralEditorProps) {
  const { store, onChange } = useDesignerContext();

  function update(patch: Partial<TableElementOptions>) {
    store.dispatch(
      createUpdateTableOptionsCommand({
        tableId: props.tableId,
        patch,
      }),
    );

    onChange?.(store.getStateRef().template);
  }

  return (
    <div className="hiprint-designer-property-group">
      <div className="hiprint-designer-property-group-title">General</div>

      <label className="hiprint-designer-field">
        <span>Data Field</span>
        <input
          value={props.options.dataField ?? ""}
          onChange={(event) =>
            update({
              dataField: event.target.value,
            })
          }
        />
      </label>

      <label className="hiprint-designer-field is-checkbox">
        <span>Show Header</span>
        <input
          type="checkbox"
          checked={props.options.header?.show ?? true}
          onChange={(event) =>
            update({
              header: {
                ...props.options.header,
                show: event.target.checked,
              },
            })
          }
        />
      </label>

      <label className="hiprint-designer-field is-checkbox">
        <span>Repeat Header</span>
        <input
          type="checkbox"
          checked={props.options.pagination?.repeatHeader ?? true}
          onChange={(event) =>
            update({
              pagination: {
                ...props.options.pagination,
                repeatHeader: event.target.checked,
              },
            })
          }
        />
      </label>

      <label className="hiprint-designer-field">
        <span>Row Height</span>
        <input
          type="number"
          value={props.options.body?.rowHeight ?? 8}
          onChange={(event) =>
            update({
              body: {
                ...props.options.body,
                rowHeight: Number(event.target.value),
              },
            })
          }
        />
      </label>

      <label className="hiprint-designer-field">
        <span>Header Height</span>
        <input
          type="number"
          value={props.options.header?.height ?? 8}
          onChange={(event) =>
            update({
              header: {
                ...props.options.header,
                height: Number(event.target.value),
              },
            })
          }
        />
      </label>

      <label className="hiprint-designer-field">
        <span>Footer Mode</span>
        <select
          value={props.options.pagination?.footerMode ?? "last-page"}
          onChange={(event) =>
            update({
              pagination: {
                ...props.options.pagination,
                footerMode: event.target.value as "none" | "last-page" | "every-page",
              },
            })
          }
        >
          <option value="none">None</option>
          <option value="last-page">Last Page</option>
          <option value="every-page">Every Page</option>
        </select>
      </label>
    </div>
  );
}
