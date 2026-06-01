import { describe, expect, it } from "vitest";
import { createPlugin, validatePlugin } from "../../packages/plugin/src";
import { createPluginManager } from "../../packages/plugin/src";

describe("PluginManager", () => {
  it("should register plugin element", () => {
    const plugin = createPlugin({
      name: "test-plugin",
      version: "0.0.0",
      elements: [
        {
          type: "test:element",
          name: "Test Element",
          defaultWidth: 10,
          defaultHeight: 10,
          createElement(input) {
            return {
              id: input.id,
              type: "test:element",
              x: input.x,
              y: input.y,
              width: 10,
              height: 10,
            };
          },
        },
      ],
    });

    const manager = createPluginManager([plugin]);
    const registry = manager.createElementRegistry();

    expect(registry.has("test:element")).toBe(true);
  });

  it("should register dom renderer", () => {
    const plugin = createPlugin({
      name: "test-renderer-plugin",
      version: "0.0.0",
      domRenderers: [
        {
          type: "custom-type",
          render() {
            return document.createElement("div");
          },
        },
      ],
    });

    const manager = createPluginManager([plugin]);
    const renderer = manager.getDomRenderer("custom-type");

    expect(renderer).toBeTruthy();
    expect(renderer?.type).toBe("custom-type");
  });

  it("should throw on duplicate plugin name", () => {
    const plugin = createPlugin({
      name: "duplicate-plugin",
      version: "0.0.0",
    });

    const manager = createPluginManager([plugin]);

    expect(() => manager.register(plugin)).toThrow(
      "[hiprint-re/plugin] Duplicate plugin: duplicate-plugin",
    );
  });

  it("should throw on duplicate element type across plugins", () => {
    const plugin = createPlugin({
      name: "plugin-1",
      version: "0.0.0",
      elements: [
        {
          type: "shared-type",
          name: "Shared",
          defaultWidth: 10,
          defaultHeight: 10,
          createElement(input) {
            return { id: input.id, type: "shared-type", x: input.x, y: input.y, width: 10, height: 10 };
          },
        },
      ],
    });

    const plugin2 = createPlugin({
      name: "plugin-2",
      version: "0.0.0",
      elements: [
        {
          type: "shared-type",
          name: "Shared Again",
          defaultWidth: 20,
          defaultHeight: 20,
          createElement(input) {
            return { id: input.id, type: "shared-type", x: input.x, y: input.y, width: 20, height: 20 };
          },
        },
      ],
    });

    const manager = createPluginManager([plugin]);
    expect(() => manager.register(plugin2)).toThrow(
      "[hiprint-re/plugin] Duplicate element type: shared-type",
    );
  });

  it("should throw on duplicate dom renderer type across plugins", () => {
    const plugin1 = createPlugin({
      name: "plugin-r1",
      version: "0.0.0",
      domRenderers: [
        {
          type: "same-type",
          render() { return document.createElement("div"); },
        },
      ],
    });

    const plugin2 = createPlugin({
      name: "plugin-r2",
      version: "0.0.0",
      domRenderers: [
        {
          type: "same-type",
          render() { return document.createElement("span"); },
        },
      ],
    });

    const manager = createPluginManager([plugin1]);
    expect(() => manager.register(plugin2)).toThrow(
      "[hiprint-re/plugin] Duplicate DOM renderer: same-type",
    );
  });

  it("should get all element definitions", () => {
    const plugin = createPlugin({
      name: "test-defs",
      version: "0.0.0",
      elements: [
        {
          type: "def-type-1",
          name: "Def1",
          defaultWidth: 10,
          defaultHeight: 10,
          createElement(input) {
            return { id: input.id, type: "def-type-1", x: input.x, y: input.y, width: 10, height: 10 };
          },
        },
        {
          type: "def-type-2",
          name: "Def2",
          defaultWidth: 20,
          defaultHeight: 20,
          createElement(input) {
            return { id: input.id, type: "def-type-2", x: input.x, y: input.y, width: 20, height: 20 };
          },
        },
      ],
    });

    const manager = createPluginManager([plugin]);
    const defs = manager.getElementDefinitions();

    expect(defs.some((d) => d.type === "def-type-1")).toBe(true);
    expect(defs.some((d) => d.type === "def-type-2")).toBe(true);
  });

  it("should get all dom renderers", () => {
    const plugin = createPlugin({
      name: "test-renderers",
      version: "0.0.0",
      domRenderers: [
        {
          type: "renderer-1",
          render() { return document.createElement("div"); },
        },
        {
          type: "renderer-2",
          render() { return document.createElement("span"); },
        },
      ],
    });

    const manager = createPluginManager([plugin]);
    const renderers = manager.getDomRenderers();

    expect(renderers.some((r) => r.type === "renderer-1")).toBe(true);
    expect(renderers.some((r) => r.type === "renderer-2")).toBe(true);
  });
});

describe("validatePlugin", () => {
  it("should throw when name is missing", () => {
    expect(() =>
      validatePlugin({
        name: "",
        version: "0.0.0",
      }),
    ).toThrow("[hiprint-re/plugin] Plugin name is required.");
  });

  it("should throw when version is missing", () => {
    expect(() =>
      validatePlugin({
        name: "test",
        version: "",
      }),
    ).toThrow("[hiprint-re/plugin] Plugin version is required.");
  });

  it("should throw when duplicate element types in same plugin", () => {
    expect(() =>
      validatePlugin({
        name: "dup-elements",
        version: "0.0.0",
        elements: [
          {
            type: "dup",
            name: "Dup1",
            defaultWidth: 10,
            defaultHeight: 10,
            createElement(input) {
              return { id: input.id, type: "dup", x: input.x, y: input.y, width: 10, height: 10 };
            },
          },
          {
            type: "dup",
            name: "Dup2",
            defaultWidth: 20,
            defaultHeight: 20,
            createElement(input) {
              return { id: input.id, type: "dup", x: input.x, y: input.y, width: 20, height: 20 };
            },
          },
        ],
      }),
    ).toThrow(
      '[hiprint-re/plugin] Duplicate element type in plugin "dup-elements": dup',
    );
  });
});
