import { describe, expect, it } from "vitest";
import { getByPath, resolveBindingValue } from "../../../packages/core/src";

describe("resolveBinding", () => {
  const data = {
    order: {
      no: "NO-001",
      customer: {
        name: "张三",
      },
    },
    items: [
      { name: "苹果", price: 10 },
      { name: "香蕉", price: 20 },
    ],
  };

  describe("getByPath", () => {
    it("should get value by path", () => {
      expect(getByPath(data, "order.no")).toBe("NO-001");
      expect(getByPath(data, "order.customer.name")).toBe("张三");
    });

    it("should return undefined for invalid path", () => {
      expect(getByPath(data, "order.missing")).toBeUndefined();
      expect(getByPath(data, "")).toBeUndefined();
      expect(getByPath(null, "a")).toBeUndefined();
    });

    it("should get array item by path", () => {
      expect(getByPath(data, "items.0.name")).toBe("苹果");
    });
  });

  describe("resolveBindingValue", () => {
    it("should resolve binding value by field", () => {
      expect(
        resolveBindingValue(
          { field: "order.no" },
          data,
        ),
      ).toBe("NO-001");
    });

    it("should resolve nested field binding", () => {
      expect(
        resolveBindingValue(
          { field: "order.customer.name" },
          data,
        ),
      ).toBe("张三");
    });

    it("should return fallback when field not found", () => {
      expect(
        resolveBindingValue(
          { field: "missing" },
          data,
          "default",
        ),
      ).toBe("default");
    });

    it("should return title when no field", () => {
      expect(
        resolveBindingValue(
          { title: "订单编号" },
          data,
        ),
      ).toBe("订单编号");
    });

    it("should return fallback when no binding", () => {
      expect(resolveBindingValue(undefined, data, "fallback")).toBe("fallback");
    });

    it("should handle number value", () => {
      expect(
        resolveBindingValue(
          { field: "items.0.price" },
          data,
        ),
      ).toBe("10");
    });
  });
});
