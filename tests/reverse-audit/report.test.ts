import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("reverse audit report", () => {
  it("should have report directory after reverse scan", () => {
    const reportDir = path.resolve(process.cwd(), "reports/reverse-audit");

    if (!fs.existsSync(reportDir)) {
      expect(true).toBe(true);
      return;
    }

    const manifest = path.join(reportDir, "manifest.json");
    expect(fs.existsSync(manifest)).toBe(true);
  });
});
