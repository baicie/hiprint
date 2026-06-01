import type { PropertyFieldSchema } from "@hiprint-re/core";

export interface PropertyFieldProps {
  field: PropertyFieldSchema;
  value: unknown;
  onChange: (value: unknown) => void;
}

export function PropertyField(props: PropertyFieldProps) {
  const { field, value } = props;

  if (field.hidden) return null;

  if (field.type === "boolean") {
    return (
      <label className="hiprint-designer-field is-checkbox">
        <span>{field.label}</span>
        <input
          type="checkbox"
          checked={Boolean(value)}
          disabled={field.readonly}
          onChange={(event) => props.onChange(event.target.checked)}
        />
      </label>
    );
  }

  if (field.type === "select") {
    return (
      <label className="hiprint-designer-field">
        <span>{field.label}</span>
        <select
          value={String(value ?? field.defaultValue ?? "")}
          disabled={field.readonly}
          onChange={(event) => {
            const selected = field.options?.find(
              (option) => String(option.value) === event.target.value,
            );

            props.onChange(selected ? selected.value : event.target.value);
          }}
        >
          <option value="">请选择</option>
          {field.options?.map((option) => (
            <option key={String(option.value)} value={String(option.value)}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === "textarea" || field.type === "json") {
    return (
      <label className="hiprint-designer-field">
        <span>{field.label}</span>
        <textarea
          value={
            field.type === "json"
              ? JSON.stringify(value ?? field.defaultValue ?? {}, null, 2)
              : String(value ?? field.defaultValue ?? "")
          }
          disabled={field.readonly}
          onChange={(event) => {
            if (field.type === "json") {
              try {
                props.onChange(JSON.parse(event.target.value));
              } catch {
                props.onChange(event.target.value);
              }
              return;
            }

            props.onChange(event.target.value);
          }}
        />
      </label>
    );
  }

  return (
    <label className="hiprint-designer-field">
      <span>{field.label}</span>
      <input
        type={toInputType(field.type)}
        value={String(value ?? field.defaultValue ?? "")}
        min={field.min}
        max={field.max}
        step={field.step}
        placeholder={field.placeholder}
        readOnly={field.readonly}
        onChange={(event) => {
          const nextValue =
            field.type === "number"
              ? Number(event.target.value)
              : event.target.value;

          props.onChange(nextValue);
        }}
      />
    </label>
  );
}

function toInputType(type: string): string {
  if (type === "number") return "number";
  if (type === "color") return "color";
  if (type === "image") return "text";
  return "text";
}
