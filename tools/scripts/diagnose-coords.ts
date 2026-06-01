import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const fixture = JSON.parse(
  readFileSync(resolve(__dirname, "../../fixtures/templates/basic-text.json"), "utf-8"),
);

const panel = fixture.panels[0];
const LEGACY_DPI = 96;

console.log("=== 假设: panel width/height 是 mm，element left/top/width/height 是 px (96dpi) ===\n");

console.log("Panel:", panel.width, "x", panel.height, "(mm)");
console.log("Page:", (210 / 25.4 * LEGACY_DPI).toFixed(1), "x", (297 / 25.4 * LEGACY_DPI).toFixed(1), "px at 96dpi\n");

for (const el of panel.printElements ?? []) {
  const { left, top, width, height, title, src } = el.options ?? {};
  const type = el.printElementType?.type ?? "?";

  // Convert px -> mm
  const left_mm = (left / LEGACY_DPI * 25.4).toFixed(1);
  const top_mm = (top / LEGACY_DPI * 25.4).toFixed(1);
  const width_mm = (width / LEGACY_DPI * 25.4).toFixed(1);
  const height_mm = (height / LEGACY_DPI * 25.4).toFixed(1);
  const right_mm = ((left + width) / LEGACY_DPI * 25.4).toFixed(1);

  const label = title || src || type;
  console.log(`${type}: "${label}"`);
  console.log(`  px: left=${left}, top=${top}, w=${width}, h=${height}`);
  console.log(`  mm: left=${left_mm}, top=${top_mm}, w=${width_mm}, h=${height_mm}`);
  console.log(`  mm: right=${right_mm} (page=210mm) ${parseFloat(right_mm) > 210 ? "❌ OVERFLOW" : "✓ OK"}`);
  console.log();
}

console.log("=== 如果 left/top/width/height 真的是 mm（当前实现的行为） ===\n");
console.log("A4 page: 210mm x 297mm\n");
for (const el of panel.printElements ?? []) {
  const { left, top, width, height, title, src } = el.options ?? {};
  const type = el.printElementType?.type ?? "?";

  const right_mm = (left + width).toFixed(1);
  const bottom_mm = (top + height).toFixed(1);
  const label = title || src || type;

  console.log(`${type}: "${label}"`);
  console.log(`  mm: left=${left}, top=${top}, w=${width}, h=${height}`);
  console.log(`  mm: right=${right_mm} bottom=${bottom_mm} (page=210x297) ${parseFloat(right_mm) > 210 ? "❌ OVERFLOW" : "✓"}`);
  console.log();
}
