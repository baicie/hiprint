export interface RulerProps {
  direction: "horizontal" | "vertical";
  length: number;
  zoom: number;
  step?: number;
}

export function Ruler(props: RulerProps) {
  const step = props.step ?? 10;
  const ticks: number[] = [];

  for (let value = 0; value <= props.length; value += step) {
    ticks.push(value);
  }

  return (
    <div
      className={[
        "hiprint-designer-ruler",
        `is-${props.direction}`,
      ].join(" ")}
    >
      {ticks.map((tick) => (
        <span
          key={tick}
          className="hiprint-designer-ruler-tick"
          style={
            props.direction === "horizontal"
              ? { left: `${tick * props.zoom}px` }
              : { top: `${tick * props.zoom}px` }
          }
        >
          {tick}
        </span>
      ))}
    </div>
  );
}
