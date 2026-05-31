import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const repoRoot = path.resolve(__dirname, "../..");

export const legacyVendorRoot = path.resolve(
  repoRoot,
  "packages/legacy/vendor",
);

export const reverseReportRoot = path.resolve(
  repoRoot,
  "reports/reverse-audit",
);

export const sourcePatterns = [path.join(legacyVendorRoot, "**/*.js")];

export const ignoredPatterns = ["**/*.min.js.map", "**/*.map"];

export const importantGlobals = [
  "window",
  "document",
  "hiprint",
  "hiprintTemplate",
  "$",
  "jQuery",
  "localStorage",
  "sessionStorage",
  "navigator",
  "location",
  "Blob",
  "URL",
];

export const importantDomApis = [
  "querySelector",
  "querySelectorAll",
  "createElement",
  "appendChild",
  "removeChild",
  "addEventListener",
  "removeEventListener",
  "getBoundingClientRect",
  "getComputedStyle",
  "innerHTML",
  "outerHTML",
  "classList",
  "style",
];

export const importantJqueryApis = [
  "on",
  "off",
  "append",
  "remove",
  "html",
  "css",
  "attr",
  "data",
  "find",
  "children",
  "parent",
  "closest",
  "width",
  "height",
  "offset",
  "position",
  "each",
];
