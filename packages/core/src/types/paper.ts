import type { Unit } from "./common";

export type PaperPreset = "A3" | "A4" | "A5" | "B5" | "custom";

export type PaperOrientation = "portrait" | "landscape";

export interface PaperConfig {
  preset: PaperPreset;
  width: number;
  height: number;
  unit: Unit;
  orientation: PaperOrientation;
  margin?: PaperMargin;
}

export interface PaperMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
