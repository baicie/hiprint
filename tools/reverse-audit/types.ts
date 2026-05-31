export interface ReverseAuditManifest {
  version: string;
  generatedAt: string;
  sourceRoot: string;
  files: AuditedFile[];
  globals: GlobalUsage[];
  constructors: ConstructorUsage[];
  prototypes: PrototypeUsage[];
  strings: StringUsage[];
  domUsages: DomUsage[];
  jqueryUsages: JqueryUsage[];
  risks: ReverseRisk[];
  moduleCandidates: ModuleCandidate[];
}

export interface AuditedFile {
  path: string;
  size: number;
  lines: number;
  hash: string;
}

export interface SourceLocation {
  file: string;
  line: number;
  column: number;
}

export interface GlobalUsage {
  name: string;
  kind: "read" | "write" | "call" | "member";
  member?: string;
  count: number;
  locations: SourceLocation[];
}

export interface ConstructorUsage {
  name: string;
  kind: "function" | "class" | "variable-function";
  count: number;
  locations: SourceLocation[];
}

export interface PrototypeUsage {
  owner: string;
  method: string;
  count: number;
  locations: SourceLocation[];
}

export interface StringUsage {
  value: string;
  count: number;
  locations: SourceLocation[];
}

export interface DomUsage {
  api: string;
  count: number;
  locations: SourceLocation[];
}

export interface JqueryUsage {
  api: string;
  count: number;
  locations: SourceLocation[];
}

export interface ReverseRisk {
  level: "low" | "medium" | "high";
  category:
    | "global-state"
    | "dom-coupling"
    | "jquery-coupling"
    | "runtime-patch"
    | "unknown-api";
  message: string;
  locations?: SourceLocation[];
}

export interface ModuleCandidate {
  name: string;
  reason: string;
  symbols: string[];
  targetPackage:
    | "core"
    | "dom"
    | "designer"
    | "legacy"
    | "react"
    | "vue"
    | "unknown";
}
