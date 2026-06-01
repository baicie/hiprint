import { useState } from "react";
import { PrintDesigner } from "@hiprint-re/designer-react";
import type { PrintTemplate, LegacyTemplate } from "@hiprint-re/core";

import basicTemplate from "../../../fixtures/templates/basic-text.json";
import basicData from "../../../fixtures/data/basic-text.data.json";

const LEGACY_IMAGE_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20160%2088%22%3E%3Crect%20width%3D%22160%22%20height%3D%2288%22%20rx%3D%228%22%20fill%3D%22%23f8fafc%22/%3E%3Crect%20x%3D%2212%22%20y%3D%2212%22%20width%3D%22136%22%20height%3D%2264%22%20rx%3D%226%22%20fill%3D%22%23e0f2fe%22%20stroke%3D%22%230ea5e9%22%20stroke-width%3D%222%22/%3E%3Ccircle%20cx%3D%2248%22%20cy%3D%2236%22%20r%3D%2210%22%20fill%3D%22%230284c7%22/%3E%3Cpath%20d%3D%22M24%2068%2058%2048%2080%2062%20102%2042%20138%2068Z%22%20fill%3D%22%230369a1%22/%3E%3C/svg%3E";

export function App() {
  const [template, setTemplate] = useState<PrintTemplate | LegacyTemplate>(basicTemplate);

  return (
    <div className="app">
      <PrintDesigner
        template={template}
        templateKind="legacy"
        data={basicData}
        domOptions={{
          resolveImageSrc: (src) => {
            if (!src) return src;
            if (src === "/Content/assets/hi.png") return LEGACY_IMAGE_PLACEHOLDER;
            return src;
          },
        }}
        onChange={(nextTemplate) => {
          setTemplate(nextTemplate);
          console.log("[template changed]", nextTemplate);
        }}
        onError={(error) => {
          console.error(error);
        }}
      />
    </div>
  );
}
