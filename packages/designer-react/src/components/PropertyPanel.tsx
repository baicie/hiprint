import type { PrintElement } from "@hiprint-re/core";
import { getElementById } from "@hiprint-re/designer-core";
import { useDesignerState } from "../hooks/useDesignerState";
import { useDesignerCommands } from "../hooks/useDesignerCommands";

export function PropertyPanel() {
  const state = useDesignerState();
  const commands = useDesignerCommands();

  const activeId = state.selection.activeId;
  const element = activeId ? getElementById(state, activeId) : undefined;

  if (!element) {
    return (
      <div className="hiprint-designer-panel">
        <div className="hiprint-designer-panel-title">Properties</div>
        <div className="hiprint-designer-empty">No element selected</div>
      </div>
    );
  }

  function update(patch: Partial<PrintElement>) {
    commands.updateElement(element!.id, patch);
  }

  return (
    <div className="hiprint-designer-panel">
      <div className="hiprint-designer-panel-title">Properties</div>

      <Field label="ID" value={element.id} readonly />

      <Field
        label="X"
        value={element.x}
        type="number"
        onChange={(value) => update({ x: Number(value) })}
      />

      <Field
        label="Y"
        value={element.y}
        type="number"
        onChange={(value) => update({ y: Number(value) })}
      />

      <Field
        label="Width"
        value={element.width}
        type="number"
        onChange={(value) => update({ width: Number(value) })}
      />

      <Field
        label="Height"
        value={element.height}
        type="number"
        onChange={(value) => update({ height: Number(value) })}
      />

      <Field
        label="Field"
        value={element.binding?.field ?? ""}
        onChange={(value) =>
          update({
            binding: {
              ...(element.binding ?? {}),
              field: String(value),
            },
          })
        }
      />

      <Field
        label="Title"
        value={element.binding?.title ?? ""}
        onChange={(value) =>
          update({
            binding: {
              ...(element.binding ?? {}),
              title: String(value),
            },
          })
        }
      />

      {element.type === "text" ? (
        <>
          <Field
            label="Content"
            value={String(element.options?.content ?? "")}
            onChange={(value) =>
              update({
                options: {
                  ...element.options,
                  content: String(value),
                },
              })
            }
          />

          <Field
            label="Font Size"
            value={Number(element.style?.fontSize ?? 12)}
            type="number"
            onChange={(value) =>
              update({
                style: {
                  ...element.style,
                  fontSize: Number(value),
                },
              })
            }
          />
        </>
      ) : null}

      {element.type === "image" ? (
        <Field
          label="Src"
          value={String(element.options?.src ?? "")}
          onChange={(value) =>
            update({
              options: {
                ...element.options,
                src: String(value),
              },
            })
          }
        />
      ) : null}
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string | number;
  type?: string;
  readonly?: boolean;
  onChange?: (value: string) => void;
}

function Field(props: FieldProps) {
  return (
    <label className="hiprint-designer-field">
      <span>{props.label}</span>
      <input
        type={props.type ?? "text"}
        value={props.value}
        readOnly={props.readonly}
        onChange={(event) => props.onChange?.(event.target.value)}
      />
    </label>
  );
}
