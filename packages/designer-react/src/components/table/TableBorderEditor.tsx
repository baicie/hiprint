import type { TableBorderOptions } from "@hiprint-re/core";
import { createUpdateTableOptionsCommand } from "@hiprint-re/designer-core";
import { useDesignerContext } from "../../context/useDesignerContext";

export interface TableBorderEditorProps {
  tableId: string;
  border: TableBorderOptions;
}

export function TableBorderEditor(props: TableBorderEditorProps) {
  const { store, onChange } = useDesignerContext();

  function update(patch: Partial<TableBorderOptions>) {
    store.dispatch(
      createUpdateTableOptionsCommand({
        tableId: props.tableId,
        patch: {
          border: {
            ...props.border,
            ...patch,
          },
        },
      }),
    );

    onChange?.(store.getStateRef().template);
  }

  return (
    <div className="hiprint-designer-property-group">
      <div className="hiprint-designer-property-group-title">Border</div>

      <label className="hiprint-designer-field is-checkbox">
        <span>Show Border</span>
        <input
          type="checkbox"
          checked={props.border.enabled ?? true}
          onChange={(event) =>
            update({ enabled: event.target.checked })
          }
        />
      </label>

      {props.border.enabled !== false && (
        <>
          <label className="hiprint-designer-field">
            <span>Color</span>
            <div className="hiprint-designer-color-input">
              <input
                type="color"
                value={props.border.color ?? "#111827"}
                onChange={(event) =>
                  update({ color: event.target.value })
                }
              />
              <input
                type="text"
                value={props.border.color ?? "#111827"}
                onChange={(event) =>
                  update({ color: event.target.value })
                }
              />
            </div>
          </label>

          <label className="hiprint-designer-field">
            <span>Width (mm)</span>
            <input
              type="number"
              min={0}
              step={0.5}
              value={props.border.width ?? 1}
              onChange={(event) =>
                update({ width: Number(event.target.value) })
              }
            />
          </label>

          <label className="hiprint-designer-field">
            <span>Style</span>
            <select
              value={props.border.style ?? "solid"}
              onChange={(event) =>
                update({
                  style: event.target.value as "solid" | "dashed" | "dotted",
                })
              }
            >
              <option value="solid">Solid</option>
              <option value="dashed">Dashed</option>
              <option value="dotted">Dotted</option>
            </select>
          </label>
        </>
      )}
    </div>
  );
}
