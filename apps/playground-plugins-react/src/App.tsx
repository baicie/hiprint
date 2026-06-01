import { useState } from "react";
import { PrintDesigner } from "@hiprint-re/designer-react";
import {
  barcodePlugin,
  qrcodePlugin,
  htmlPlugin,
  amountUppercasePlugin,
} from "@hiprint-re/plugins-basic";
import { createEmptyTemplate } from "@hiprint-re/core";

const plugins = [
  barcodePlugin(),
  qrcodePlugin(),
  htmlPlugin(),
  amountUppercasePlugin(),
];

export function App() {
  const [template, setTemplate] = useState(() => createEmptyTemplate());

  return (
    <div className="app">
      <PrintDesigner
        template={template}
        templateKind="core"
        data={{
          orderNo: "NO-20260601-001",
          totalAmount: 199.98,
          qrValue: "https://example.com/order/NO-20260601-001",
        }}
        plugins={plugins}
        onChange={setTemplate}
      />
    </div>
  );
}
