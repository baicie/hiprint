import type { File } from "@babel/types";
import * as t from "@babel/types";
import { traverse } from "../ast";
import type { ConstructorUsage } from "../types";
import { locOf, pushCounted } from "../utils";

export function collectConstructors(
  ast: File,
  file: string,
): ConstructorUsage[] {
  const result: ConstructorUsage[] = [];

  traverse(ast, {
    FunctionDeclaration(path) {
      const name = path.node.id?.name;
      if (!name || !looksLikeConstructor(name)) return;

      pushCounted(
        result,
        (item) => `${item.name}:${item.kind}`,
        () => ({
          name,
          kind: "function",
          count: 0,
          locations: [],
        }),
        locOf(file, path.node),
      );
    },

    ClassDeclaration(path) {
      const name = path.node.id?.name;
      if (!name) return;

      pushCounted(
        result,
        (item) => `${item.name}:${item.kind}`,
        () => ({
          name,
          kind: "class",
          count: 0,
          locations: [],
        }),
        locOf(file, path.node),
      );
    },

    VariableDeclarator(path) {
      if (!t.isIdentifier(path.node.id)) return;

      const name = path.node.id.name;
      if (!looksLikeConstructor(name)) return;

      const init = path.node.init;
      if (!t.isFunctionExpression(init) && !t.isArrowFunctionExpression(init))
        return;

      pushCounted(
        result,
        (item) => `${item.name}:${item.kind}`,
        () => ({
          name,
          kind: "variable-function",
          count: 0,
          locations: [],
        }),
        locOf(file, path.node),
      );
    },
  });

  return result;
}

function looksLikeConstructor(name: string): boolean {
  return (
    /^[A-Z]/.test(name) ||
    /Template|Element|Panel|Provider|Print|Paper|Table/.test(name)
  );
}
