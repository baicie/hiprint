import { describe, expect, it, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { PrintDesigner } from "../../packages/designer-react/src";
import basicTemplate from "../../fixtures/templates/basic-text.json";
import basicData from "../../fixtures/data/basic-text.data.json";

describe("ElementPalette", () => {
  it("should add text element", () => {
    const onChange = vi.fn();

    const { getByText } = render(
      <div style={{ width: 1000, height: 800 }}>
        <PrintDesigner
          template={basicTemplate}
          templateKind="legacy"
          data={basicData}
          onChange={onChange}
        />
      </div>,
    );

    fireEvent.click(getByText("Text"));

    expect(onChange).toHaveBeenCalled();
  });
});
