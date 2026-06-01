import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { PrintDesigner } from "../../packages/designer-react/src";
import basicTemplate from "../../fixtures/templates/basic-text.json";
import basicData from "../../fixtures/data/basic-text.data.json";

describe("DesignerToolbar", () => {
  it("should render toolbar with buttons", () => {
    const { container } = render(
      <div style={{ width: 1000, height: 800 }}>
        <PrintDesigner
          template={basicTemplate}
          templateKind="legacy"
          data={basicData}
        />
      </div>,
    );

    const toolbar = container.querySelector(".hiprint-designer-toolbar");
    expect(toolbar).toBeTruthy();
    expect(toolbar?.textContent).toContain("Undo");
    expect(toolbar?.textContent).toContain("Redo");
    expect(toolbar?.textContent).toContain("Align");
    expect(toolbar?.textContent).toContain("Duplicate");
    expect(toolbar?.textContent).toContain("Delete");
    expect(toolbar?.textContent).toContain("Print");
  });
});
