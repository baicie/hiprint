import { describe, expect, it } from "vitest";
import { paginateTableRows } from "../../../packages/core/src";

describe("paginateTableRows", () => {
  function makeRows(count: number, height = 10): ReturnType<typeof makeRow>[] {
    return Array.from({ length: count }, (_, i) => makeRow(`row_${i}`, i, height));
  }

  function makeRow(id: string, index: number, height: number) {
    return {
      id,
      kind: "body" as const,
      index,
      y: index * height,
      height,
      cells: [],
    };
  }

  it("should split rows into pages", () => {
    const rows = makeRows(20, 10);

    const slices = paginateTableRows({
      bodyRows: rows,
      pageHeight: 100,
      tableStartY: 0,
      headerHeight: 10,
      footerHeight: 0,
      repeatHeader: true,
      footerMode: "none",
    });

    expect(slices.length).toBeGreaterThan(1);
    expect(slices[0]?.bodyRows.length).toBe(9);
  });

  it("should handle empty rows", () => {
    const slices = paginateTableRows({
      bodyRows: [],
      pageHeight: 100,
      tableStartY: 0,
      headerHeight: 10,
      footerHeight: 0,
      repeatHeader: true,
      footerMode: "none",
    });

    expect(slices.length).toBe(1);
    expect(slices[0]!.bodyRows).toHaveLength(0);
  });

  it("should respect footerMode=last-page", () => {
    const rows = makeRows(5, 15);

    const slices = paginateTableRows({
      bodyRows: rows,
      pageHeight: 100,
      tableStartY: 0,
      headerHeight: 10,
      footerHeight: 10,
      repeatHeader: true,
      footerMode: "last-page",
    });

    expect(slices.length).toBe(1);
    expect(slices[0]!.footerY).toBe(90);
  });

  it("should respect footerMode=every-page", () => {
    const rows = makeRows(20, 10);

    const slices = paginateTableRows({
      bodyRows: rows,
      pageHeight: 100,
      tableStartY: 0,
      headerHeight: 10,
      footerHeight: 10,
      repeatHeader: true,
      footerMode: "every-page",
    });

    expect(slices.length).toBeGreaterThan(1);
    for (const slice of slices) {
      expect(slice.footerY).toBeDefined();
    }
  });

  it("should not repeat header when repeatHeader=false", () => {
    const rows = makeRows(15, 10);

    const slices = paginateTableRows({
      bodyRows: rows,
      pageHeight: 100,
      tableStartY: 0,
      headerHeight: 10,
      footerHeight: 0,
      repeatHeader: false,
      footerMode: "none",
    });

    expect(slices.length).toBe(2);
  });
});
