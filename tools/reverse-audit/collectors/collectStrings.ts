import type { File } from "@babel/types";
import { traverse } from "../ast";
import type { StringUsage } from "../types";
import { locOf, pushCounted } from "../utils";

const MAX_STRING_LENGTH = 120;

export function collectStrings(ast: File, file: string): StringUsage[] {
  const result: StringUsage[] = [];

  traverse(ast, {
    StringLiteral(path) {
      const value = path.node.value;

      if (!shouldCollectString(value)) return;

      pushCounted(
        result,
        (item) => item.value,
        () => ({
          value,
          count: 0,
          locations: [],
        }),
        locOf(file, path.node),
      );
    },
  });

  return result;
}

function shouldCollectString(value: string): boolean {
  if (!value.trim()) return false;
  if (value.length > MAX_STRING_LENGTH) return false;

  return (
    /hiprint|template|panel|paper|print|element|table|image|text|barcode|qrcode|field|width|height|left|top|options|style/i.test(
      value,
    ) || value.length <= 32
  );
}
