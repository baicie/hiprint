import { describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { PrintDesigner } from "../../packages/designer-vue/src";
import basicTemplate from "../../fixtures/templates/basic-text.json";
import basicData from "../../fixtures/data/basic-text.data.json";

describe("PrintDesigner (Vue)", () => {
  it("should render designer shell", () => {
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

    expect(wrapper.find(".hiprint-designer").exists()).toBe(true);
    expect(wrapper.find(".hiprint-designer-toolbar").exists()).toBe(true);
    expect(wrapper.find(".hiprint-designer-canvas").exists()).toBe(true);
  });

  it("should select element from canvas hitbox", async () => {
    const wrapper = mount(PrintDesigner, {
      props: {
        template: basicTemplate,
        templateKind: "legacy",
        data: basicData,
      },
      attachTo: document.body,
      global: {
        stubs: {
          teleport: true,
        },
      },
    });

    for (let i = 0; i < 10; i++) {
      await wrapper.vm.$nextTick();
    }

    const hitbox = wrapper.find(".hiprint-designer-hitbox");
    expect(hitbox.exists()).toBe(true);

    await hitbox.trigger("pointerdown");
    await wrapper.vm.$nextTick();

    expect(wrapper.find(".hiprint-designer-selection").exists()).toBe(true);
  });
});
