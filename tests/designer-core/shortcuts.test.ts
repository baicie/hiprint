import { describe, expect, it } from "vitest";
import {
  defaultKeymap,
  resolveShortcutAction,
} from "../../packages/designer-core/src";

describe("shortcuts", () => {
  it("should resolve delete", () => {
    expect(
      resolveShortcutAction(
        {
          key: "Delete",
        },
        defaultKeymap,
      ),
    ).toBe("delete");
  });

  it("should resolve ctrl z", () => {
    expect(
      resolveShortcutAction(
        {
          key: "z",
          ctrlKey: true,
        },
        defaultKeymap,
      ),
    ).toBe("undo");
  });

  it("should resolve ctrl shift z for redo", () => {
    expect(
      resolveShortcutAction(
        {
          key: "z",
          ctrlKey: true,
          shiftKey: true,
        },
        defaultKeymap,
      ),
    ).toBe("redo");
  });

  it("should resolve arrow keys", () => {
    expect(
      resolveShortcutAction(
        { key: "ArrowLeft" },
        defaultKeymap,
      ),
    ).toBe("moveLeft");

    expect(
      resolveShortcutAction(
        { key: "ArrowRight" },
        defaultKeymap,
      ),
    ).toBe("moveRight");

    expect(
      resolveShortcutAction(
        { key: "ArrowUp" },
        defaultKeymap,
      ),
    ).toBe("moveUp");

    expect(
      resolveShortcutAction(
        { key: "ArrowDown" },
        defaultKeymap,
      ),
    ).toBe("moveDown");
  });

  it("should resolve macOS Cmd shortcuts", () => {
    expect(
      resolveShortcutAction({ key: "c", metaKey: true }, defaultKeymap),
    ).toBe("copy");

    expect(
      resolveShortcutAction({ key: "v", metaKey: true }, defaultKeymap),
    ).toBe("paste");

    expect(
      resolveShortcutAction({ key: "d", metaKey: true }, defaultKeymap),
    ).toBe("duplicate");

    expect(
      resolveShortcutAction({ key: "z", metaKey: true }, defaultKeymap),
    ).toBe("undo");

    expect(
      resolveShortcutAction({ key: "z", metaKey: true, shiftKey: true }, defaultKeymap),
    ).toBe("redo");

    expect(
      resolveShortcutAction({ key: "a", metaKey: true }, defaultKeymap),
    ).toBe("selectAll");
  });
});
