export type LegacyApiTarget =
  | "core"
  | "dom"
  | "designer"
  | "legacy"
  | "unknown";

export interface LegacyApiMapItem {
  name: string;
  target: LegacyApiTarget;
  status: "known" | "suspected" | "unknown";
  description: string;
}

export const legacyApiMap: LegacyApiMapItem[] = [
  {
    name: "hiprint",
    target: "legacy",
    status: "known",
    description: "Main legacy global namespace.",
  },
  {
    name: "hiprintTemplate",
    target: "core",
    status: "suspected",
    description:
      "Legacy template constructor. Needs schema/model extraction later.",
  },
  {
    name: "preview",
    target: "dom",
    status: "suspected",
    description: "Preview behavior likely belongs to DOM renderer layer.",
  },
  {
    name: "print",
    target: "dom",
    status: "suspected",
    description:
      "Browser print behavior should remain outside framework-agnostic core.",
  },
];
