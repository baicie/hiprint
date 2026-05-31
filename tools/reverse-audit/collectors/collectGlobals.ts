import type { File } from "@babel/types";
import * as t from "@babel/types";
import { traverse } from "../ast";
import { importantGlobals } from "../config";
import type { GlobalUsage } from "../types";
import { locOf, pushCounted } from "../utils";

export function collectGlobals(ast: File, file: string): GlobalUsage[] {
  const result: GlobalUsage[] = [];

  traverse(ast, {
    Identifier(path) {
      const name = path.node.name;

      if (!importantGlobals.includes(name)) return;

      if (path.isBindingIdentifier()) return;

      pushCounted(
        result,
        (item) => `${item.name}:${item.kind}:${item.member ?? ""}`,
        () => ({
          name,
          kind: "read",
          count: 0,
          locations: [],
        }),
        locOf(file, path.node),
      );
    },

    MemberExpression(path) {
      const object = path.node.object;
      const property = path.node.property;

      if (!t.isIdentifier(object)) return;
      if (!importantGlobals.includes(object.name)) return;

      const member = t.isIdentifier(property)
        ? property.name
        : t.isStringLiteral(property)
          ? property.value
          : undefined;

      pushCounted(
        result,
        (item) => `${item.name}:${item.kind}:${item.member ?? ""}`,
        () => ({
          name: object.name,
          kind: "member",
          member,
          count: 0,
          locations: [],
        }),
        locOf(file, path.node),
      );
    },

    AssignmentExpression(path) {
      const left = path.node.left;

      if (t.isMemberExpression(left) && t.isIdentifier(left.object)) {
        const objectName = left.object.name;

        if (!importantGlobals.includes(objectName)) return;

        const member = t.isIdentifier(left.property)
          ? left.property.name
          : t.isStringLiteral(left.property)
            ? left.property.value
            : undefined;

        pushCounted(
          result,
          (item) => `${item.name}:${item.kind}:${item.member ?? ""}`,
          () => ({
            name: objectName,
            kind: "write",
            member,
            count: 0,
            locations: [],
          }),
          locOf(file, path.node),
        );
      }
    },

    CallExpression(path) {
      const callee = path.node.callee;

      if (t.isIdentifier(callee) && importantGlobals.includes(callee.name)) {
        pushCounted(
          result,
          (item) => `${item.name}:${item.kind}:${item.member ?? ""}`,
          () => ({
            name: callee.name,
            kind: "call",
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
