import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    include: ["tests/**/*.test.ts", "tests/**/*.test.tsx"],
  },
  resolve: {
    alias: {
      "@hiprint-re/core": resolve(__dirname, "packages/core/src"),
      "@hiprint-re/dom": resolve(__dirname, "packages/dom/src"),
      "@hiprint-re/designer-core": resolve(__dirname, "packages/designer-core/src"),
      "@hiprint-re/plugin": resolve(__dirname, "packages/plugin/src"),
      "@hiprint-re/plugins-basic": resolve(__dirname, "packages/plugins-basic/src"),
    },
  },
});
