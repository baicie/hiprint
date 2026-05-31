import type { DomUsage, GlobalUsage, JqueryUsage, ReverseRisk } from "./types";

export function inferRisks(input: {
  globals: GlobalUsage[];
  domUsages: DomUsage[];
  jqueryUsages: JqueryUsage[];
}): ReverseRisk[] {
  const risks: ReverseRisk[] = [];

  const globalWrites = input.globals.filter((item) => item.kind === "write");

  if (globalWrites.length > 0) {
    risks.push({
      level: "high",
      category: "global-state",
      message: `Detected ${globalWrites.length} global write patterns. These should be wrapped or patched before core extraction.`,
      locations: globalWrites.flatMap((item) => item.locations).slice(0, 20),
    });
  }

  if (input.domUsages.length > 0) {
    risks.push({
      level: "medium",
      category: "dom-coupling",
      message: `Detected ${input.domUsages.length} DOM API usage groups. DOM logic should not move into core.`,
      locations: input.domUsages.flatMap((item) => item.locations).slice(0, 20),
    });
  }

  if (input.jqueryUsages.length > 0) {
    risks.push({
      level: "medium",
      category: "jquery-coupling",
      message: `Detected ${input.jqueryUsages.length} jQuery API usage groups. jQuery dependency should stay in legacy/dom layer.`,
      locations: input.jqueryUsages
        .flatMap((item) => item.locations)
        .slice(0, 20),
    });
  }

  const unknownHiprint = input.globals.filter(
    (item) => item.name === "hiprint" || item.member?.includes("hiprint"),
  );

  if (unknownHiprint.length > 0) {
    risks.push({
      level: "low",
      category: "unknown-api",
      message: `Detected ${unknownHiprint.length} hiprint-related global usages. Need runtime probe to classify public APIs.`,
      locations: unknownHiprint.flatMap((item) => item.locations).slice(0, 20),
    });
  }

  return risks;
}
