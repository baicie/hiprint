import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { PrintDesigner } from "../../packages/designer-vue/src";
import basicTemplate from "../../fixtures/templates/basic-text.json";
import basicData from "../../fixtures/data/basic-text.data.json";

describe("ElementPalette (Vue)", () => {
  it("should render palette with element buttons", () => {
    const onChange = vi.fn();

    const wrapper = mount(PrintDesigner, {
      props: {
        template: basicTemplate,
        templateKind: "legacy",
        data: basicData,
        onChange,
      },
      global: {
        stubs: {
          teleport: true,
        },
      },
    });

    const palette = wrapper.findAll(".hiprint-designer-palette-item");
    expect(palette.length).toBe(5);
    expect(palette[0].text()).toBe("Text");
    expect(palette[1].text()).toBe("Image");
    expect(palette[2].text()).toBe("Rect");
    expect(palette[3].text()).toBe("Line");
    expect(palette[4].text()).toBe("Table");
  });
});
