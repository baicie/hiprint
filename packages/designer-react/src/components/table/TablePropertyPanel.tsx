import { getElementById } from "@hiprint-re/designer-core";
import { normalizeTableOptions } from "@hiprint-re/core";
import { useDesignerState } from "../../hooks/useDesignerState";
import { TableColumnEditor } from "./TableColumnEditor";
import { TableBorderEditor } from "./TableBorderEditor";
import { TableGeneralEditor } from "./TableGeneralEditor";
import { TableFooterEditor } from "./TableFooterEditor";

export interface TablePropertyPanelProps {
  elementId: string;
}

export function TablePropertyPanel(props: TablePropertyPanelProps) {
  const state = useDesignerState();
  const element = getElementById(state, props.elementId);

  if (!element || element.type !== "table") {
    return null;
  }

  const options = normalizeTableOptions(element.options);

  return (
    <div className="hiprint-designer-panel">
      <div className="hiprint-designer-panel-title">Table Properties</div>

      <TableGeneralEditor tableId={element.id} options={options} />

      <TableBorderEditor tableId={element.id} border={options.border} />

      <TableColumnEditor tableId={element.id} columns={options.columns} />

      <TableFooterEditor tableId={element.id} options={options} />
    </div>
  );
}
