import { useDesignerState } from "../hooks/useDesignerState";
import { useDesignerCommands } from "../hooks/useDesignerCommands";
import {
  createBuiltinElement,
  type BuiltinInsertElementType,
} from "../hooks/useElementFactory";

const items: Array<{
  type: BuiltinInsertElementType;
  label: string;
}> = [
  { type: "text", label: "Text" },
  { type: "image", label: "Image" },
  { type: "rect", label: "Rect" },
  { type: "line", label: "Line" },
  { type: "table", label: "Table" },
];

export function ElementPalette() {
  const state = useDesignerState();
  const commands = useDesignerCommands();

  const panelId = state.activePanelId;

  function add(type: BuiltinInsertElementType) {
    if (!panelId) return;

    commands.addElement(
      panelId,
      createBuiltinElement(type, { x: 20, y: 20 }),
    );
  }

  return (
    <div className="hiprint-designer-panel">
      <div className="hiprint-designer-panel-title">Elements</div>

      <div className="hiprint-designer-palette">
        {items.map((item) => (
          <button
            key={item.type}
            className="hiprint-designer-palette-item"
            onClick={() => add(item.type)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
