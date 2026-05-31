import { legacyApiMap, type LegacyApiMapItem } from "./legacyApiMap";

export function classifyLegacyApi(name: string): LegacyApiMapItem {
  const exact = legacyApiMap.find((item) => item.name === name);

  if (exact) return exact;

  const lower = name.toLowerCase();

  if (/template|panel|paper|element|field|style|option/.test(lower)) {
    return {
      name,
      target: "core",
      status: "suspected",
      description: "Name looks like model/schema related API.",
    };
  }

  if (/print|preview|render|html|dom/.test(lower)) {
    return {
      name,
      target: "dom",
      status: "suspected",
      description: "Name looks like rendering or browser integration API.",
    };
  }

  if (/design|drag|resize|select|history/.test(lower)) {
    return {
      name,
      target: "designer",
      status: "suspected",
      description: "Name looks like designer interaction API.",
    };
  }

  return {
    name,
    target: "unknown",
    status: "unknown",
    description: "Unknown legacy API.",
  };
}
