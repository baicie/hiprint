import { useDesignerState } from "../hooks/useDesignerState";
import { useDesignerCommands } from "../hooks/useDesignerCommands";
import { useDesignerRegistry } from "../registry/DesignerRegistryContext";
import type { PrintElementType } from "@hiprint-re/core";

function createElementId(type: string): string {
  return `${type}_${Math.random().toString(36).slice(2, 9)}`;
}

export function ElementPalette() {
  const state = useDesignerState();
  const commands = useDesignerCommands();
  const registry = useDesignerRegistry();

  const panelId = state.activePanelId;
  const elements = registry.list();

  function add(type: string) {
    if (!panelId) return;

    const element = registry.createElement(type as PrintElementType, {
      id: createElementId(type),
      x: 20,
      y: 20,
    });

    if (!element) return;

    commands.addElement(panelId, element);
  }

  return (
    <div className="hiprint-designer-panel">
      <div className="hiprint-designer-panel-title">元素</div>

      <div className="hiprint-designer-palette">
        {elements.map((item) => (
          <button
            key={item.type}
            className="hiprint-designer-palette-item"
            onClick={() => add(item.type)}
            title={item.description}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}
