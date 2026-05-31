import type { ReverseAuditManifest } from "./types";

export function renderMarkdownReport(manifest: ReverseAuditManifest): string {
  return `# Reverse Audit Report

Generated at: ${manifest.generatedAt}

Source root:

\`\`\`txt
${manifest.sourceRoot}
\`\`\`

## Summary

| Type | Count |
| --- | ---: |
| Files | ${manifest.files.length} |
| Globals | ${manifest.globals.length} |
| Constructors | ${manifest.constructors.length} |
| Prototypes | ${manifest.prototypes.length} |
| Strings | ${manifest.strings.length} |
| DOM usages | ${manifest.domUsages.length} |
| jQuery usages | ${manifest.jqueryUsages.length} |
| Risks | ${manifest.risks.length} |
| Module candidates | ${manifest.moduleCandidates.length} |

## Files

${manifest.files
  .map(
    (file) =>
      `- \`${file.path}\` - ${file.size} bytes, ${file.lines} lines, hash \`${file.hash}\``,
  )
  .join("\n")}

## Global usages

${renderTable(
  ["Name", "Kind", "Member", "Count"],
  manifest.globals
    .sort((a, b) => b.count - a.count)
    .slice(0, 100)
    .map((item) => [
      item.name,
      item.kind,
      item.member ?? "",
      String(item.count),
    ]),
)}

## Constructor candidates

${renderTable(
  ["Name", "Kind", "Count"],
  manifest.constructors
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((item) => [item.name, item.kind, String(item.count)]),
)}

## Prototype methods

${renderTable(
  ["Owner", "Method", "Count"],
  manifest.prototypes
    .sort((a, b) =>
      `${a.owner}.${a.method}`.localeCompare(`${b.owner}.${b.method}`),
    )
    .slice(0, 200)
    .map((item) => [item.owner, item.method, String(item.count)]),
)}

## DOM usages

${renderTable(
  ["API", "Count"],
  manifest.domUsages
    .sort((a, b) => b.count - a.count)
    .map((item) => [item.api, String(item.count)]),
)}

## jQuery usages

${renderTable(
  ["API", "Count"],
  manifest.jqueryUsages
    .sort((a, b) => b.count - a.count)
    .map((item) => [item.api, String(item.count)]),
)}

## Risks

${manifest.risks
  .map(
    (risk) => `### ${risk.level.toUpperCase()} - ${risk.category}

${risk.message}
`,
  )
  .join("\n")}

## Module candidates

${renderTable(
  ["Name", "Target", "Reason"],
  manifest.moduleCandidates.map((item) => [
    item.name,
    item.targetPackage,
    item.reason,
  ]),
)}
`;
}

function renderTable(headers: string[], rows: string[][]): string {
  const header = `| ${headers.join(" |")} |`;
  const divider = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = rows
    .map((row) => `| ${row.map(escapeCell).join(" | ")} |`)
    .join("\n");

  return [header, divider, body].filter(Boolean).join("\n");
}

function escapeCell(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\n/g, "<br />");
}
