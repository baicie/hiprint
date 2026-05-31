import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";
import type { Node } from "@babel/types";
import type { SourceLocation } from "./types";

export function ensureDir(dir: string): void {
  fs.mkdirSync(dir, { recursive: true });
}

export function readText(file: string): string {
  return fs.readFileSync(file, "utf8");
}

export function writeJson(file: string, value: unknown): void {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

export function writeText(file: string, value: string): void {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, value);
}

export function hashContent(content: string): string {
  return crypto.createHash("sha256").update(content).digest("hex").slice(0, 16);
}

export function countLines(content: string): number {
  return content.split(/\r?\n/).length;
}

export function locOf(file: string, node: Node): SourceLocation {
  return {
    file,
    line: node.loc?.start.line ?? 0,
    column: node.loc?.start.column ?? 0,
  };
}

export function pushCounted<
  T extends { count: number; locations: SourceLocation[] },
>(
  list: T[],
  key: (item: T) => string,
  create: () => T,
  loc: SourceLocation,
): void {
  const id = key(create());
  const existing = list.find((item) => key(item) === id);

  if (existing) {
    existing.count += 1;
    if (existing.locations.length < 20) {
      existing.locations.push(loc);
    }
    return;
  }

  const item = create();
  item.count = 1;
  item.locations = [loc];
  list.push(item);
}
