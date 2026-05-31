import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { createRuntimeSnapshot } from "../../packages/legacy/src/debug/createRuntimeSnapshot";

describe("runtime snapshot", () => {
  beforeEach(() => {
    window.hiprint = {
      foo() {},
      bar: 1,
    } as unknown;

    window.hiprintTemplate = function HiprintTemplate() {} as unknown;
    window.hiprintTemplate.prototype.preview = function preview() {};
    window.hiprintTemplate.prototype.print = function print() {};
  });

  afterEach(() => {
    delete window.hiprint;
    delete window.hiprintTemplate;
  });

  it("should collect runtime keys", () => {
    const snapshot = createRuntimeSnapshot();

    expect(snapshot.globals.hasHiprint).toBe(true);
    expect(snapshot.globals.hasHiprintTemplate).toBe(true);
    expect(snapshot.hiprintKeys).toContain("foo");
    expect(snapshot.hiprintTemplatePrototypeKeys).toContain("preview");
    expect(snapshot.hiprintTemplatePrototypeKeys).toContain("print");
  });

  it("should reflect missing globals", () => {
    delete window.hiprint;
    delete window.hiprintTemplate;

    const snapshot = createRuntimeSnapshot();

    expect(snapshot.globals.hasHiprint).toBe(false);
    expect(snapshot.globals.hasHiprintTemplate).toBe(false);
  });
});
