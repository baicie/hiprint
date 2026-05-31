import type { File } from "@babel/types";
import * as t from "@babel/types";
import { traverse } from "../ast";
import { importantJqueryApis } from "../config";
import type { JqueryUsage } from "../types";
import { locOf, pushCounted } from "../utils";

export function collectJqueryUsage(ast: File, file: string): JqueryUsage[] {
  const result: JqueryUsage[] = [];

  traverse(ast, {
    CallExpression(path) {
      const callee = path.node.callee;

      if (
        t.isIdentifier(callee) &&
        (callee.name === "$" || callee.name === "jQuery")
      ) {
        pushCounted(
          result,
          (item) => item.api,
          () => ({
            api: callee.name,
            count: 0,
            locations: [],
          }),
          locOf(file, path.node),
        );
      }

      if (t.isMemberExpression(callee)) {
        const property = callee.property;
        const api = t.isIdentifier(property)
          ? property.name
          : t.isStringLiteral(property)
            ? property.value
            : undefined;

        if (!api || !importantJqueryApis.includes(api)) return;

        pushCounted(
          result,
          (item) => item.api,
          () => ({
            api,
            count: 0,
            locations: [],
          }),
          locOf(file, path.node),
        );
      }
    },
  });

  return result;
}
