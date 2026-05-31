import { defineConfig } from "vite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = __dirname;
const repoRoot = path.resolve(root, "../..");
const legacyVendorDir = path.resolve(repoRoot, "packages/legacy/vendor");
const publicLegacyDir = path.resolve(root, "public/legacy");

function copyDir(from: string, to: string) {
  fs.mkdirSync(to, { recursive: true });

  for (const file of fs.readdirSync(from)) {
    const src = path.join(from, file);
    const dest = path.join(to, file);

    if (fs.statSync(src).isDirectory()) {
      copyDir(src, dest);
    } else {
      fs.copyFileSync(src, dest);
    }
  }
}

function copyLegacyVendorPlugin() {
  return {
    name: "copy-legacy-vendor",
    buildStart() {
      copyDir(legacyVendorDir, publicLegacyDir);
    },
    configureServer() {
      copyDir(legacyVendorDir, publicLegacyDir);
    },
  };
}

export default defineConfig({
  plugins: [copyLegacyVendorPlugin()],
  server: {
    port: 5173,
  },
});
