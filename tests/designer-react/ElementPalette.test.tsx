import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";
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

  it("should add and select text element", async () => {
    const onChange = vi.fn();

    const { container } = render(
      <div style={{ width: 1000, height: 800 }}>
        <PrintDesigner
          template={basicTemplate}
          templateKind="legacy"
          data={basicData}
          onChange={onChange}
        />
      </div>,
    );

    const before = container.querySelectorAll(
      ".hiprint-designer-layer-item",
    ).length;

    fireEvent.click(container.querySelector(".hiprint-designer-palette-item")!);

    await waitFor(() => {
      expect(
        container.querySelectorAll(".hiprint-designer-layer-item").length,
      ).toBe(before + 1);
      expect(container.querySelector(".hiprint-designer-selection")).toBeTruthy();
    });
    expect(onChange).toHaveBeenCalled();
  });
});
