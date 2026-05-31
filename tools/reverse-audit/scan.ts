import fs from "node:fs";
import path from "node:path";
import fg from "fast-glob";
import {
  ignoredPatterns,
  legacyVendorRoot,
  reverseReportRoot,
  sourcePatterns,
} from "./config";
import { parseJavaScript } from "./ast";
import type {
  AuditedFile,
  ConstructorUsage,
  DomUsage,
  GlobalUsage,
  JqueryUsage,
  PrototypeUsage,
  ReverseAuditManifest,
  StringUsage,
} from "./types";
import {
  countLines,
  ensureDir,
  hashContent,
  readText,
  writeJson,
  writeText,
} from "./utils";
import { collectGlobals } from "./collectors/collectGlobals";
import { collectPrototypes } from "./collectors/collectPrototypes";
import { collectConstructors } from "./collectors/collectConstructors";
import { collectStrings } from "./collectors/collectStrings";
import { collectDomUsage } from "./collectors/collectDomUsage";
import { collectJqueryUsage } from "./collectors/collectJqueryUsage";
import { inferModuleCandidates } from "./moduleCandidates";
import { inferRisks } from "./risk";
import { renderMarkdownReport } from "./renderMarkdown";

async function main() {
  ensureDir(reverseReportRoot);

  const files = await fg(sourcePatterns, {
    ignore: ignoredPatterns,
    absolute: true,
  });

  const auditedFiles: AuditedFile[] = [];
  const globals: GlobalUsage[] = [];
  const constructors: ConstructorUsage[] = [];
  const prototypes: PrototypeUsage[] = [];
  const strings: StringUsage[] = [];
  const domUsages: DomUsage[] = [];
  const jqueryUsages: JqueryUsage[] = [];

  for (const absoluteFile of files) {
    const relativeFile = path.relative(process.cwd(), absoluteFile);
    const code = readText(absoluteFile);

    auditedFiles.push({
      path: relativeFile,
      size: Buffer.byteLength(code),
      lines: countLines(code),
      hash: hashContent(code),
    });

    try {
      const ast = parseJavaScript(code, relativeFile);

      globals.push(...collectGlobals(ast, relativeFile));
      constructors.push(...collectConstructors(ast, relativeFile));
      prototypes.push(...collectPrototypes(ast, relativeFile));
      strings.push(...collectStrings(ast, relativeFile));
      domUsages.push(...collectDomUsage(ast, relativeFile));
      jqueryUsages.push(...collectJqueryUsage(ast, relativeFile));
    } catch (err) {
      console.warn(`[reverse-audit] failed to parse ${relativeFile}`);
      console.warn(err);
    }
  }

  const mergedGlobals = mergeBy(
    globals,
    (item) => `${item.name}:${item.kind}:${item.member ?? ""}`,
  );
  const mergedConstructors = mergeBy(
    constructors,
    (item) => `${item.name}:${item.kind}`,
  );
  const mergedPrototypes = mergeBy(
    prototypes,
    (item) => `${item.owner}:${item.method}`,
  );
  const mergedStrings = mergeBy(strings, (item) => item.value);
  const mergedDomUsages = mergeBy(domUsages, (item) => item.api);
  const mergedJqueryUsages = mergeBy(jqueryUsages, (item) => item.api);

  const moduleCandidates = inferModuleCandidates({
    constructors: mergedConstructors,
    prototypes: mergedPrototypes,
  });

  const risks = inferRisks({
    globals: mergedGlobals,
    domUsages: mergedDomUsages,
    jqueryUsages: mergedJqueryUsages,
  });

  const manifest: ReverseAuditManifest = {
    version: "0.1.0",
    generatedAt: new Date().toISOString(),
    sourceRoot: path.relative(process.cwd(), legacyVendorRoot),
    files: auditedFiles,
    globals: mergedGlobals,
    constructors: mergedConstructors,
    prototypes: mergedPrototypes,
    strings: mergedStrings.sort((a, b) => b.count - a.count).slice(0, 500),
    domUsages: mergedDomUsages,
    jqueryUsages: mergedJqueryUsages,
    risks,
    moduleCandidates,
  };

  writeJson(path.join(reverseReportRoot, "manifest.json"), manifest);
  writeJson(path.join(reverseReportRoot, "globals.json"), manifest.globals);
  writeJson(
    path.join(reverseReportRoot, "prototypes.json"),
    manifest.prototypes,
  );
  writeJson(path.join(reverseReportRoot, "strings.json"), manifest.strings);
  writeJson(path.join(reverseReportRoot, "risks.json"), manifest.risks);

  writeText(
    path.join(reverseReportRoot, "manifest.md"),
    renderMarkdownReport(manifest),
  );

  console.log(`[reverse-audit] scanned ${files.length} files`);
  console.log(`[reverse-audit] report written to ${reverseReportRoot}`);
}

function mergeBy<T extends { count: number; locations: unknown[] }>(
  list: T[],
  key: (item: T) => string,
): T[] {
  const map = new Map<string, T>();

  for (const item of list) {
    const id = key(item);
    const existing = map.get(id);

    if (!existing) {
      map.set(id, {
        ...item,
        locations: [...item.locations],
      });
      continue;
    }

    existing.count += item.count;
    existing.locations.push(
      ...(item.locations as unknown[]).slice(0, 20 - existing.locations.length),
    );
  }

  return [...map.values()];
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
