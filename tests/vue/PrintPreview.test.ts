import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { PrintPreview } from "../../packages/vue/src";
import basicTemplate from "../../fixtures/templates/basic-text.json";
import basicData from "../../fixtures/data/basic-text.data.json";

describe("Vue PrintPreview", () => {
  it("should mount preview container", async () => {
    const wrapper = mount(PrintPreview, {
      props: {
        template: basicTemplate,
        templateKind: "legacy",
        data: basicData,
      },
      attachTo: document.body,
    });

    await wrapper.vm.$nextTick();

    const div = wrapper.element as HTMLElement;
    expect(div).toBeTruthy();
  });

  it("should expose refresh and print methods", async () => {
    const wrapper = mount(PrintPreview, {
      props: {
        template: basicTemplate,
        templateKind: "legacy",
        data: basicData,
      },
      attachTo: document.body,
    });

    await wrapper.vm.$nextTick();

    const exposed = wrapper.vm as Record<string, unknown>;
    expect(typeof exposed.refresh).toBe("function");
    expect(typeof exposed.print).toBe("function");
  });
});
