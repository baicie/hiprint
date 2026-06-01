import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { PrintDesigner } from "../../packages/designer-vue/src";
import basicTemplate from "../../fixtures/templates/basic-text.json";
import basicData from "../../fixtures/data/basic-text.data.json";

describe("DesignerToolbar (Vue)", () => {
  it("should render toolbar with buttons", () => {
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

    const toolbar = wrapper.find(".hiprint-designer-toolbar");
    expect(toolbar.exists()).toBe(true);
    expect(toolbar.text()).toContain("Undo");
    expect(toolbar.text()).toContain("Redo");
    expect(toolbar.text()).toContain("Align");
    expect(toolbar.text()).toContain("Duplicate");
    expect(toolbar.text()).toContain("Delete");
    expect(toolbar.text()).toContain("Print");
  });
});
