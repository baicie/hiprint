import type {
  ConstructorUsage,
  PrototypeUsage,
  ModuleCandidate,
} from "./types";

export function inferModuleCandidates(input: {
  constructors: ConstructorUsage[];
  prototypes: PrototypeUsage[];
}): ModuleCandidate[] {
  const symbols = new Set<string>();

  for (const item of input.constructors) {
    symbols.add(item.name);
  }

  for (const item of input.prototypes) {
    symbols.add(item.owner);
  }

  const result: ModuleCandidate[] = [];

  for (const symbol of symbols) {
    result.push(classifySymbol(symbol));
  }

  return result.sort((a, b) => a.name.localeCompare(b.name));
}

function classifySymbol(symbol: string): ModuleCandidate {
  const lower = symbol.toLowerCase();

  if (/template|panel|paper|element|field|option|style/.test(lower)) {
    return {
      name: symbol,
      reason: "Looks like template/model/schema related symbol.",
      symbols: [symbol],
      targetPackage: "core",
    };
  }

  if (/render|html|dom|preview|iframe/.test(lower)) {
    return {
      name: symbol,
      reason: "Looks like DOM rendering or preview related symbol.",
      symbols: [symbol],
      targetPackage: "dom",
    };
  }

  if (/design|designer|drag|resize|select|history|command/.test(lower)) {
    return {
      name: symbol,
      reason: "Looks like designer interaction related symbol.",
      symbols: [symbol],
      targetPackage: "designer",
    };
  }

  if (/jquery|\$/.test(lower)) {
    return {
      name: symbol,
      reason: "Looks like jQuery or legacy compatibility symbol.",
      symbols: [symbol],
      targetPackage: "legacy",
    };
  }

  return {
    name: symbol,
    reason: "Unknown module ownership.",
    symbols: [symbol],
    targetPackage: "unknown",
  };
}
