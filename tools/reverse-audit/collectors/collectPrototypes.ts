import type { File } from "@babel/types";
import * as t from "@babel/types";
import { traverse } from "../ast";
import type { PrototypeUsage } from "../types";
import { locOf, pushCounted } from "../utils";

export function collectPrototypes(ast: File, file: string): PrototypeUsage[] {
  const result: PrototypeUsage[] = [];

  traverse(ast, {
    AssignmentExpression(path) {
      const left = path.node.left;

      const parsed = parsePrototypeAssignment(left);

      if (!parsed) return;

      pushCounted(
        result,
        (item) => `${item.owner}:${item.method}`,
        () => ({
          owner: parsed.owner,
          method: parsed.method,
          count: 0,
          locations: [],
        }),
        locOf(file, path.node),
      );
    },
  });

  return result;
}

function parsePrototypeAssignment(
  node: unknown,
): { owner: string; method: string } | undefined {
  if (!t.isMemberExpression(node)) return;

  const method = getPropertyName(node.property);
  if (!method) return;

  const mid = node.object;
  if (!t.isMemberExpression(mid)) return;

  const prototypeName = getPropertyName(mid.property);
  if (prototypeName !== "prototype") return;

  if (!t.isIdentifier(mid.object)) return;

  return {
    owner: mid.object.name,
    method,
  };
}

function getPropertyName(node: unknown): string | undefined {
  if (t.isIdentifier(node)) return node.name;
  if (t.isStringLiteral(node)) return node.value;
  return undefined;
}
