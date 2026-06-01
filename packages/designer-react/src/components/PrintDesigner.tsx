import { DesignerProvider } from "../context/DesignerProvider";
import type { PrintDesignerProps } from "../types";
import { DesignerShell } from "./DesignerShell";
import "../style/designer.css";

export function PrintDesigner(props: PrintDesignerProps) {
  return (
    <DesignerProvider {...props}>
      <DesignerShell className={props.className} style={props.style} />
    </DesignerProvider>
  );
}
