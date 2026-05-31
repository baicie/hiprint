import { createRuntimeSnapshot } from "./createRuntimeSnapshot";

export function downloadRuntimeSnapshot(
  filename = "hiprint-runtime-snapshot.json",
): void {
  const snapshot = createRuntimeSnapshot();
  const content = JSON.stringify(snapshot, null, 2);

  const blob = new Blob([content], {
    type: "application/json;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}
