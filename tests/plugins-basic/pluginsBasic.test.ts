import { describe, expect, it } from "vitest";
import { createPluginManager } from "../../packages/plugin/src";
import {
  barcodePlugin,
  qrcodePlugin,
  htmlPlugin,
  amountUppercasePlugin,
} from "../../packages/plugins-basic/src";

describe("plugins-basic", () => {
  describe("barcodePlugin", () => {
    it("should register barcode element and renderer", () => {
      const manager = createPluginManager([barcodePlugin()]);

      const registry = manager.createElementRegistry();

      expect(registry.has("barcode")).toBe(true);
      expect(manager.getDomRenderer("barcode")).toBeTruthy();

      const def = registry.get("barcode");
      expect(def?.name).toBe("Barcode");
      expect(def?.defaultWidth).toBe(60);
      expect(def?.defaultHeight).toBe(20);
    });
  });

  describe("qrcodePlugin", () => {
    it("should register qrcode element and renderer", () => {
      const manager = createPluginManager([qrcodePlugin()]);

      const registry = manager.createElementRegistry();

      expect(registry.has("qrcode")).toBe(true);
      expect(manager.getDomRenderer("qrcode")).toBeTruthy();

      const def = registry.get("qrcode");
      expect(def?.name).toBe("QRCode");
      expect(def?.defaultWidth).toBe(30);
      expect(def?.defaultHeight).toBe(30);
    });
  });

  describe("htmlPlugin", () => {
    it("should register html element and renderer", () => {
      const manager = createPluginManager([htmlPlugin()]);

      const registry = manager.createElementRegistry();

      expect(registry.has("html")).toBe(true);
      expect(manager.getDomRenderer("html")).toBeTruthy();

      const def = registry.get("html");
      expect(def?.name).toBe("HTML");
      expect(def?.defaultWidth).toBe(80);
      expect(def?.defaultHeight).toBe(30);
    });
  });

  describe("amountUppercasePlugin", () => {
    it("should register amount uppercase element and renderer", () => {
      const manager = createPluginManager([amountUppercasePlugin()]);

      const registry = manager.createElementRegistry();

      expect(registry.has("business:amount-uppercase")).toBe(true);
      expect(manager.getDomRenderer("business:amount-uppercase")).toBeTruthy();

      const def = registry.get("business:amount-uppercase");
      expect(def?.name).toBe("Amount Uppercase");
      expect(def?.defaultWidth).toBe(100);
      expect(def?.defaultHeight).toBe(12);
    });
  });

  it("should register all plugins together without conflict", () => {
    const manager = createPluginManager([
      barcodePlugin(),
      qrcodePlugin(),
      htmlPlugin(),
      amountUppercasePlugin(),
    ]);

    const registry = manager.createElementRegistry();

    expect(registry.has("barcode")).toBe(true);
    expect(registry.has("qrcode")).toBe(true);
    expect(registry.has("html")).toBe(true);
    expect(registry.has("business:amount-uppercase")).toBe(true);

    expect(manager.getDomRenderer("barcode")).toBeTruthy();
    expect(manager.getDomRenderer("qrcode")).toBeTruthy();
    expect(manager.getDomRenderer("html")).toBeTruthy();
    expect(manager.getDomRenderer("business:amount-uppercase")).toBeTruthy();
  });
});
