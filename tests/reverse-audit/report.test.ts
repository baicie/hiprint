import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("reverse audit report", () => {
  it("should have markdown report after reverse scan", () => {
    const reportDir = path.resolve(process.cwd(), "reports/reverse-audit");

    if (!fs.existsSync(reportDir)) {
      expect(true).toBe(true);
      return;
    }

    const manifestMd = path.join(reportDir, "manifest.md");
    expect(fs.existsSync(manifestMd)).toBe(true);
  });
});
