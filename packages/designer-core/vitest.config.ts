import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["../../tests/designer-core/**/*.test.ts"],
  },
});
