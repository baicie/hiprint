import { describe, expect, it } from "vitest";
import { resolveTableColumns } from "../../../packages/core/src";

describe("resolveTableColumns", () => {
  it("should resolve explicit and fallback widths", () => {
    const columns = resolveTableColumns(
      [
        {
          id: "name",
          title: "Name",
          width: 50,
        },
        {
          id: "amount",
          title: "Amount",
        },
      ],
      100,
    );

    expect(columns[0]?.width).toBe(50);
    expect(columns[1]?.width).toBe(50);
    expect(columns[1]?.x).toBe(50);
  });

  it("should filter out hidden columns", () => {
    const columns = resolveTableColumns(
      [
        { id: "a", title: "A", width: 30, visible: false },
        { id: "b", title: "B", width: 70 },
      ],
      100,
    );

    expect(columns).toHaveLength(1);
    expect(columns[0]?.id).toBe("b");
    expect(columns[0]?.x).toBe(0);
  });

  it("should flatten nested columns", () => {
    const columns = resolveTableColumns(
      [
        {
          id: "parent",
          title: "Parent",
          children: [
            { id: "child1", title: "Child 1", width: 25 },
            { id: "child2", title: "Child 2", width: 25 },
          ],
        },
        { id: "sibling", title: "Sibling", width: 50 },
      ],
      100,
    );

    expect(columns).toHaveLength(3);
    expect(columns[0]?.id).toBe("child1");
    expect(columns[1]?.id).toBe("child2");
    expect(columns[2]?.id).toBe("sibling");
  });

  it("should preserve column metadata", () => {
    const columns = resolveTableColumns(
      [
        {
          id: "col",
          field: "myField",
          title: "My Column",
          width: 80,
          align: "right",
        },
      ],
      100,
    );

    expect(columns[0]?.id).toBe("col");
    expect(columns[0]?.field).toBe("myField");
    expect(columns[0]?.title).toBe("My Column");
    expect(columns[0]?.align).toBe("right");
  });
});
