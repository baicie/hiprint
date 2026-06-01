import { useMemo, useRef, useState } from "react";
import { PrintPreview, type PrintPreviewRef } from "@hiprint-re/react";

import basicTemplate from "../../../fixtures/templates/basic-text.json";
import basicData from "../../../fixtures/data/basic-text.data.json";
import complexTemplate from "../../../fixtures/templates/complex-order.json";
import complexData from "../../../fixtures/data/complex-order.data.json";
import tableTemplate from "../../../fixtures/templates/table-basic.json";
import tableData from "../../../fixtures/data/table-basic.data.json";

const LEGACY_IMAGE_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20160%2088%22%3E%3Crect%20width%3D%22160%22%20height%3D%2288%22%20rx%3D%228%22%20fill%3D%22%23f8fafc%22/%3E%3Crect%20x%3D%2212%22%20y%3D%2212%22%20width%3D%22136%22%20height%3D%2264%22%20rx%3D%226%22%20fill%3D%22%23e0f2fe%22%20stroke%3D%22%230ea5e9%22%20stroke-width%3D%222%22/%3E%3Ccircle%20cx%3D%2248%22%20cy%3D%2236%22%20r%3D%2210%22%20fill%3D%22%230284c7%22/%3E%3Cpath%20d%3D%22M24%2068%2058%2048%2080%2062%20102%2042%20138%2068Z%22%20fill%3D%22%230369a1%22/%3E%3C/svg%3E";

const samples = {
  basic: {
    label: "Basic text",
    template: basicTemplate,
    data: basicData,
  },
  complex: {
    label: "Complex order",
    template: complexTemplate,
    data: complexData,
  },
  table: {
    label: "Table",
    template: tableTemplate,
    data: tableData,
  },
} as const;

type SampleKey = keyof typeof samples;

function resolveLegacyImageSrc(src: string | undefined): string | undefined {
  if (!src) return src;

  if (src === "/Content/assets/hi.png") {
    return LEGACY_IMAGE_PLACEHOLDER;
  }

  return src;
}

export function App() {
  const previewRef = useRef<PrintPreviewRef>(null);
  const [sampleKey, setSampleKey] = useState<SampleKey>("basic");
  const sample = samples[sampleKey];
  const domOptions = useMemo(
    () => ({
      resolveImageSrc: resolveLegacyImageSrc,
    }),
    [],
  );

  return (
    <div className="app">
      <div className="toolbar">
        <label>
          Sample
          <select
            value={sampleKey}
            onChange={(event) => setSampleKey(event.target.value as SampleKey)}
          >
            {Object.entries(samples).map(([key, value]) => (
              <option key={key} value={key}>
                {value.label}
              </option>
            ))}
          </select>
        </label>
        <button onClick={() => previewRef.current?.refresh()}>Refresh</button>
        <button onClick={() => previewRef.current?.print()}>Print</button>
      </div>

      <div className="preview">
        <PrintPreview
          ref={previewRef}
          template={sample.template}
          templateKind="legacy"
          data={sample.data}
          domOptions={domOptions}
          onWarnings={(warnings) => {
            console.warn("[warnings]", warnings);
          }}
          onError={(error) => {
            console.error("[error]", error);
          }}
        />
      </div>
    </div>
  );
}
