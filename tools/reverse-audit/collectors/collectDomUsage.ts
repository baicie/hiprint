import type { File } from "@babel/types";
import * as t from "@babel/types";
import { traverse } from "../ast";
import { importantDomApis } from "../config";
import type { DomUsage } from "../types";
import { locOf, pushCounted } from "../utils";

export function collectDomUsage(ast: File, file: string): DomUsage[] {
  const result: DomUsage[] = [];

  traverse(ast, {
    MemberExpression(path) {
      const property = path.node.property;
      const api = t.isIdentifier(property)
        ? property.name
        : t.isStringLiteral(property)
          ? property.value
          : undefined;

      if (!api || !importantDomApis.includes(api)) return;

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
    },
  });

  return result;
}
