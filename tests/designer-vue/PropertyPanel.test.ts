import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { PrintDesigner } from "../../packages/designer-vue/src";
import basicTemplate from "../../fixtures/templates/basic-text.json";
import basicData from "../../fixtures/data/basic-text.data.json";

describe("PropertyPanel (Vue)", () => {
  it("should render empty state", () => {
    const wrapper = mount(PrintDesigner, {
      props: {
        template: basicTemplate,
        templateKind: "legacy",
        data: basicData,
      },
      global: {
        stubs: {
          teleport: true,
        },
      },
    });

    const panels = wrapper.findAll(".hiprint-designer-panel");
    const propertiesPanel = panels[panels.length - 1];
    expect(propertiesPanel.exists()).toBe(true);
    expect(propertiesPanel.text()).toContain("Properties");
  });
});
