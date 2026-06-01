import { getElementById } from "@hiprint-re/designer-core";
import { useDesignerState } from "../hooks/useDesignerState";
import { useDesignerCommands } from "../hooks/useDesignerCommands";
import { useDesignerRegistry } from "../registry/DesignerRegistryContext";
import { getByPath } from "../utils/path";
import { PropertyField } from "./PropertyField";

export function DynamicPropertyPanel() {
  const state = useDesignerState();
  const commands = useDesignerCommands();
  const registry = useDesignerRegistry();

  const activeId = state.selection.activeId;
  const element = activeId ? getElementById(state, activeId) : undefined;

  if (!element) {
    return (
      <div className="hiprint-designer-panel">
        <div className="hiprint-designer-panel-title">属性</div>
        <div className="hiprint-designer-empty">未选中元素</div>
      </div>
    );
  }

  const definition = registry.get(element.type);
  const schema = definition?.propertySchema;

  if (!schema) {
    return (
      <div className="hiprint-designer-panel">
        <div className="hiprint-designer-panel-title">属性</div>
        <div className="hiprint-designer-empty">
          {element.type} 无属性配置
        </div>
      </div>
    );
  }

  function updateField(path: string, nextValue: unknown) {
    commands.updateElementProperty(element!.id, path, nextValue);
  }

  const sortedGroups = [...schema.groups].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

  return (
    <div className="hiprint-designer-panel">
      <div className="hiprint-designer-panel-title">
        属性 · {definition?.name ?? element.type}
      </div>

      {sortedGroups.map((group) => {
        const fields = schema.fields.filter(
          (field) => (field.group ?? "base") === group.key,
        );

        if (fields.length === 0) return null;

        return (
          <div
            key={group.key}
            className="hiprint-designer-property-group"
          >
            <div className="hiprint-designer-property-group-title">
              {group.label}
            </div>

            {fields.map((field) => (
              <PropertyField
                key={field.key}
                field={field}
                value={getByPath(element, field.key)}
                onChange={(nextValue) => updateField(field.key, nextValue)}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
