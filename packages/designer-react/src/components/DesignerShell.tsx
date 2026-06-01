import { useDesignerKeyboard } from "../hooks/useDesignerKeyboard";
import { DesignerToolbar } from "./DesignerToolbar";
import { ElementPalette } from "./ElementPalette";
import { DesignerCanvas } from "./DesignerCanvas";
import { PropertyPanel } from "./PropertyPanel";
import { LayerPanel } from "./LayerPanel";
import { StatusBar } from "./StatusBar";

export interface DesignerShellProps {
  className?: string;
  style?: React.CSSProperties;
}

export function DesignerShell(props: DesignerShellProps) {
  useDesignerKeyboard();

  return (
    <div
      className={["hiprint-designer", props.className].filter(Boolean).join(" ")}
      style={props.style}
    >
      <DesignerToolbar />

      <div className="hiprint-designer-main">
        <aside className="hiprint-designer-left">
          <ElementPalette />
          <LayerPanel />
        </aside>

        <main className="hiprint-designer-center">
          <DesignerCanvas />
        </main>

        <aside className="hiprint-designer-right">
          <PropertyPanel />
        </aside>
      </div>

      <StatusBar />
    </div>
  );
}
