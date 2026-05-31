import { parse } from "@babel/parser";
import * as traverseNS from "@babel/traverse";
import type { File } from "@babel/types";

// @babel/traverse ships as ESM. The module has .default.default pointing to
// the actual traverse function: traverseNS.default.default
const traverse = (traverseNS as unknown as { default: { default: typeof traverseNS } }).default.default;

export { traverse };

export function parseJavaScript(code: string, filename: string): File {
  return parse(code, {
    sourceType: "unambiguous",
    sourceFilename: filename,
    allowReturnOutsideFunction: true,
    allowSuperOutsideMethod: true,
    errorRecovery: true,
    plugins: [
      "jsx",
      "classProperties",
      "objectRestSpread",
      "optionalChaining",
      "nullishCoalescingOperator",
      "dynamicImport",
    ],
  });
}
