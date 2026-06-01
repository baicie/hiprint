import { describe, expect, it } from "vitest";
import { normalizeTableOptions } from "../../../packages/core/src";

describe("normalizeTableOptions", () => {
  it("should apply defaults when options are undefined", () => {
    const result = normalizeTableOptions(undefined);

    expect(result.columns).toEqual([]);
    expect(result.header?.show).toBe(true);
    expect(result.header?.height).toBe(8);
    expect(result.header?.repeatOnPageBreak).toBe(true);
    expect(result.body?.rowHeight).toBe(8);
    expect(result.body?.autoRowHeight).toBe(false);
    expect(result.footer?.show).toBe(false);
    expect(result.footer?.rows).toEqual([]);
    expect(result.pagination?.repeatHeader).toBe(true);
    expect(result.pagination?.footerMode).toBe("last-page");
    expect(result.pagination?.rowBreakMode).toBe("avoid");
    expect(result.pagination?.allowPageBreak).toBe(true);
    expect(result.border?.enabled).toBe(true);
    expect(result.border?.color).toBe("#111827");
  });

  it("should preserve provided values", () => {
    const result = normalizeTableOptions({
      dataField: "items",
      columns: [{ id: "col1", title: "列1", width: 100 }],
      header: { show: false, height: 12 },
      body: { rowHeight: 10 },
      pagination: { repeatHeader: false, footerMode: "every-page" },
      border: { enabled: false },
    });

    expect(result.dataField).toBe("items");
    expect(result.columns).toHaveLength(1);
    expect(result.header?.show).toBe(false);
    expect(result.header?.height).toBe(12);
    expect(result.body?.rowHeight).toBe(10);
    expect(result.pagination?.repeatHeader).toBe(false);
    expect(result.pagination?.footerMode).toBe("every-page");
    expect(result.border?.enabled).toBe(false);
  });

  it("should handle partial column options", () => {
    const result = normalizeTableOptions({
      columns: [
        { id: "col1" },
        { id: "col2", title: "Col 2" },
      ],
    });

    expect(result.columns).toHaveLength(2);
    expect(result.columns[0]?.id).toBe("col1");
    expect(result.columns[1]?.title).toBe("Col 2");
  });
});
