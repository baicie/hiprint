import { createRuntimeSnapshot } from "../debug/createRuntimeSnapshot";
import type { LegacyPatch } from "./index";

export const patchRuntimeProbe: LegacyPatch = {
  name: "runtime-probe",

  apply() {
    window.__HIPRINT_RE_RUNTIME_SNAPSHOT__ = createRuntimeSnapshot();
  },
};
