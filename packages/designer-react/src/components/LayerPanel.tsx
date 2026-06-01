import { getActivePanel } from "@hiprint-re/designer-core";
import { useDesignerState } from "../hooks/useDesignerState";
import { useDesignerCommands } from "../hooks/useDesignerCommands";

export function LayerPanel() {
  const state = useDesignerState();
  const commands = useDesignerCommands();

  const panel = getActivePanel(state);

  return (
    <div className="hiprint-designer-panel">
      <div className="hiprint-designer-panel-title">Layers</div>

      <div className="hiprint-designer-layers">
        {panel?.elements.map((element) => {
          const selected = state.selection.ids.includes(element.id);

          return (
            <button
              key={element.id}
              className={[
                "hiprint-designer-layer-item",
                selected && "is-selected",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => commands.select([element.id], element.id)}
            >
              <span>{element.type}</span>
              <small>{element.id}</small>
            </button>
          );
        })}
      </div>
    </div>
  );
}
