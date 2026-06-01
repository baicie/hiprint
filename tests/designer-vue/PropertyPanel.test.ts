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

  it("should show properties after selecting a layer", async () => {
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

    await wrapper.vm.$nextTick();
    await wrapper.find(".hiprint-designer-layer-item").trigger("click");
    await wrapper.vm.$nextTick();

    const propertiesPanel = wrapper.findAll(".hiprint-designer-panel").at(-1);
    expect(propertiesPanel?.text()).toContain("ID");
    expect(propertiesPanel?.text()).not.toContain("No element selected");
  });
});
