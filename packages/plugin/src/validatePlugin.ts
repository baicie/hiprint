import type { HiprintPlugin } from "./types";

export function validatePlugin(plugin: HiprintPlugin): void {
  if (!plugin.name) {
    throw new Error("[hiprint-re/plugin] Plugin name is required.");
  }

  if (!plugin.version) {
    throw new Error("[hiprint-re/plugin] Plugin version is required.");
  }

  const elementTypes = new Set<string>();

  for (const element of plugin.elements ?? []) {
    if (elementTypes.has(element.type)) {
      throw new Error(
        `[hiprint-re/plugin] Duplicate element type in plugin "${plugin.name}": ${element.type}`,
      );
    }

    elementTypes.add(element.type);
  }
}
