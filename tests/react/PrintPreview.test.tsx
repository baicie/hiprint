import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PrintPreview } from "../../packages/react/src";
import basicTemplate from "../../fixtures/templates/basic-text.json";
import basicData from "../../fixtures/data/basic-text.data.json";

describe("PrintPreview", () => {
  it("should render preview container", () => {
    render(
      <div style={{ width: 800, height: 600 }}>
        <PrintPreview
          template={basicTemplate}
          templateKind="legacy"
          data={basicData}
        />
      </div>,
    );

    expect(screen.getByRole("presentation")).toBeTruthy();
  });

  it("should render error state when template kind is invalid", () => {
    render(
      <div style={{ width: 800, height: 600 }}>
        <PrintPreview
          template={{ random: "data" }}
          templateKind="auto"
        />
      </div>,
    );

    expect(document.querySelector("pre")).toBeTruthy();
  });

  it("should use errorFallback when provided", () => {
    render(
      <div style={{ width: 800, height: 600 }}>
        <PrintPreview
          template={{ random: "data" }}
          templateKind="auto"
          errorFallback={<span data-testid="custom-error">Custom Error</span>}
        />
      </div>,
    );

    expect(document.querySelector('[data-testid="custom-error"]')).toBeTruthy();
  });

  it("should support className and style props", () => {
    render(
      <PrintPreview
        template={basicTemplate}
        templateKind="legacy"
        data={basicData}
        className="my-preview"
        style={{ backgroundColor: "red" }}
      />,
    );

    const container = document.querySelector(".my-preview");
    expect(container).toBeTruthy();
  });
});
