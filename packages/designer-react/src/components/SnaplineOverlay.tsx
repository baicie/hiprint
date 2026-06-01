import { useDesignerState } from "../hooks/useDesignerState";

export function SnaplineOverlay() {
  const state = useDesignerState();
  const lines = state.interaction.snapLines ?? [];

  return (
    <div className="hiprint-designer-snapline-layer">
      {lines.map((line) => (
        <div
          key={line.id}
          className={[
            "hiprint-designer-snapline",
            `is-${line.type}`,
          ].join(" ")}
          style={
            line.type === "vertical"
              ? { left: `${line.position}mm` }
              : { top: `${line.position}mm` }
          }
        />
      ))}
    </div>
  );
}
