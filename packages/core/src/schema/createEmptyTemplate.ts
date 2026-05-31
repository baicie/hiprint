import { CORE_SCHEMA_VERSION } from "../version";
import type { PaperConfig, PaperPreset } from "../types/paper";
import type { PrintTemplate } from "../types/template";

export const PAPER_PRESET_DIMENSIONS: Record<Exclude<PaperPreset, "custom">, { width: number; height: number }> = {
  A3: { width: 297, height: 420 },
  A4: { width: 210, height: 297 },
  A5: { width: 148, height: 210 },
  B5: { width: 176, height: 250 },
};

export function getPresetDimensions(preset: PaperPreset): { width: number; height: number } {
  if (preset === "custom") return { width: 210, height: 297 };
  return PAPER_PRESET_DIMENSIONS[preset];
}

export function createEmptyTemplate(): PrintTemplate {
  const dimensions = getPresetDimensions("A4");

  return {
    schemaVersion: CORE_SCHEMA_VERSION,
    id: createId("template"),
    meta: {
      source: "core",
      createdAt: new Date().toISOString(),
    },
    paper: {
      preset: "A4",
      width: dimensions.width,
      height: dimensions.height,
      unit: "mm",
      orientation: "portrait",
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    panels: [
      {
        id: createId("panel"),
        index: 0,
        name: "default",
        elements: [],
      },
    ],
  };
}

export function createId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}
