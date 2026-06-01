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
    expect(toolbar?.textContent).toContain("撤销");
    expect(toolbar?.textContent).toContain("重做");
    expect(toolbar?.textContent).toContain("对齐");
    expect(toolbar?.textContent).toContain("复制");
    expect(toolbar?.textContent).toContain("删除");
    expect(toolbar?.textContent).toContain("打印");
  });
});
