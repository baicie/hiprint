import { describe, expect, it } from "vitest";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { PrintDesigner } from "../../packages/designer-react/src";
import basicTemplate from "../../fixtures/templates/basic-text.json";
import basicData from "../../fixtures/data/basic-text.data.json";

describe("PrintDesigner", () => {
  it("should render designer shell", () => {
    const { container } = render(
      <div style={{ width: 1000, height: 800 }}>
        <PrintDesigner
          template={basicTemplate}
          templateKind="legacy"
          data={basicData}
        />
      </div>,
    );

    expect(container.querySelector(".hiprint-designer")).toBeTruthy();
    expect(container.querySelector(".hiprint-designer-toolbar")).toBeTruthy();
    expect(container.querySelector(".hiprint-designer-canvas")).toBeTruthy();
  });

  it("should select element from canvas hitbox", async () => {
    const { container } = render(
      <div style={{ width: 1000, height: 800 }}>
        <PrintDesigner
          template={basicTemplate}
          templateKind="legacy"
          data={basicData}
        />
      </div>,
    );

    await waitFor(() => {
      expect(container.querySelector(".hiprint-designer-hitbox")).toBeTruthy();
    });

    fireEvent.pointerDown(container.querySelector(".hiprint-designer-hitbox")!);

    await waitFor(() => {
      expect(container.querySelector(".hiprint-designer-selection")).toBeTruthy();
    });
  });
});
