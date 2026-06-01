import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { PrintDesigner } from "../../packages/designer-react/src";
import { createEmptyTemplate } from "../../packages/core/src";
import { barcodePlugin, qrcodePlugin } from "../../packages/plugins-basic/src";
import React from "react";

describe("designer plugin integration", () => {
  it("should render designer with plugins", () => {
    const { container } = render(
      React.createElement(
        "div",
        { style: { width: 1000, height: 800 } },
        React.createElement(PrintDesigner, {
          template: createEmptyTemplate(),
          templateKind: "core",
          plugins: [barcodePlugin(), qrcodePlugin()],
        }),
      ),
    );

    expect(container.textContent).toContain("Barcode");
    expect(container.textContent).toContain("QRCode");
  });
});
