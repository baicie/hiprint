下面给你一版 **Phase 4：`@hiprint-re/dom` DOM Renderer / Preview / Browser Print** 的详细设计与代码草案。

Phase 4 的定位是：

```txt
Phase 0：legacy 能跑
Phase 1：legacy 可审计
Phase 2：core schema / model / legacy adapter
Phase 3：core layout engine
Phase 4：DOM renderer，把 LayoutDocument 画出来
```

这一阶段的核心目标是：**把 Phase 3 产出的 `LayoutDocument` 稳定渲染成 DOM / HTML，并支持 preview 和 browser print。**

---

# 1. Phase 4 总目标

Phase 4 要完成：

```txt
1. 新增 packages/dom
2. 实现 renderToDom(layout)
3. 实现 mountLayout(layout, container)
4. 实现 renderToHtmlString(layout)
5. 实现 text/image/line/rect/table 的 DOM 渲染
6. 实现默认打印样式
7. 实现 preview 容器
8. 实现 browser print
9. 增加 DOM renderer 测试
10. 增加 docs/dom-renderer.md
```

最终 API 形态：

```ts
import { fromLegacyTemplate, layoutTemplate } from "@hiprint-re/core";

import { renderToDom, mountLayout, printLayout } from "@hiprint-re/dom";

const template = fromLegacyTemplate(legacyTemplate);
const layout = layoutTemplate(template, data);

mountLayout(layout, document.querySelector("#preview")!);

await printLayout(layout);
```

---

# 2. Phase 4 不做什么

这一阶段不做：

```txt
不做 React/Vue
不做 designer
不做拖拽
不做属性面板
不做 undo/redo
不做 PDF renderer
不做 Canvas renderer
不做精确 table 跨页边框
不做复杂字体测量
不修改 core template
```

Phase 4 只负责：

```txt
LayoutDocument -> DOM / HTML / Print
```

---

# 3. 推荐目录结构

```txt
packages/
└─ dom/
   ├─ package.json
   ├─ tsconfig.json
   └─ src/
      ├─ index.ts
      ├─ types.ts
      │
      ├─ renderToDom.ts
      ├─ mountLayout.ts
      ├─ renderToHtmlString.ts
      │
      ├─ renderers/
      │  ├─ renderPage.ts
      │  ├─ renderElement.ts
      │  ├─ renderText.ts
      │  ├─ renderImage.ts
      │  ├─ renderLine.ts
      │  ├─ renderRect.ts
      │  ├─ renderTable.ts
      │  └─ renderUnknown.ts
      │
      ├─ style/
      │  ├─ defaultCss.ts
      │  ├─ applyElementStyle.ts
      │  ├─ cssLength.ts
      │  └─ injectStyle.ts
      │
      ├─ preview/
      │  ├─ createPreviewRoot.ts
      │  └─ previewLayout.ts
      │
      ├─ print/
      │  ├─ createPrintHtml.ts
      │  └─ printLayout.ts
      │
      └─ utils/
         ├─ dom.ts
         └─ escapeHtml.ts
```

---

# 4. package.json

## `packages/dom/package.json`

```json
{
  "name": "@hiprint-re/dom",
  "version": "0.0.0",
  "type": "module",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "files": ["src"],
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "test": "vitest run"
  },
  "dependencies": {
    "@hiprint-re/core": "workspace:*",
    "@hiprint-re/shared": "workspace:*"
  }
}
```

---

# 5. tsconfig

## `packages/dom/tsconfig.json`

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

---

# 6. DOM Renderer 类型设计

## `packages/dom/src/types.ts`

```ts
import type {
  LayoutDocument,
  LayoutElement,
  LayoutPage,
} from "@hiprint-re/core";

export interface DomRenderOptions {
  /**
   * 默认使用当前 document。
   * 在 iframe / jsdom / popup 中渲染时可以传入目标 document。
   */
  document?: Document;

  /**
   * class 前缀，避免和业务项目样式冲突。
   */
  classNamePrefix?: string;

  /**
   * 是否注入默认 CSS。
   */
  injectDefaultStyle?: boolean;

  /**
   * 页面之间的间距，仅 preview 模式有意义。
   */
  pageGap?: number;

  /**
   * 几何单位。默认使用 layout.unit。
   */
  geometryUnit?: "mm" | "px";

  /**
   * 字体数字单位。默认 px。
   * 注意：layout 几何单位和字体单位不一定相同。
   */
  typographyUnit?: "px" | "pt" | "mm";

  /**
   * 自定义图片 src 解析。
   */
  resolveImageSrc?: (src: string | undefined) => string | undefined;

  /**
   * 是否渲染 unknown element 占位。
   */
  renderUnknown?: boolean;

  /**
   * 额外 className。
   */
  className?: string;
}

export interface DomRenderContext {
  document: Document;
  layout: LayoutDocument;
  options: RequiredDomRenderOptions;
}

export interface RequiredDomRenderOptions {
  classNamePrefix: string;
  injectDefaultStyle: boolean;
  pageGap: number;
  geometryUnit: "mm" | "px";
  typographyUnit: "px" | "pt" | "mm";
  resolveImageSrc: (src: string | undefined) => string | undefined;
  renderUnknown: boolean;
  className?: string;
}

export interface DomRenderResult {
  root: HTMLElement;
  pages: HTMLElement[];
  dispose(): void;
}

export interface MountLayoutResult extends DomRenderResult {
  container: HTMLElement;
}

export interface ElementRenderer<T extends LayoutElement = LayoutElement> {
  type: string;
  render(element: T, page: LayoutPage, ctx: DomRenderContext): HTMLElement;
}
```

---

# 7. CSS length 工具

## `packages/dom/src/style/cssLength.ts`

```ts
export function cssLength(
  value: number,
  unit: "mm" | "px" | "pt" = "mm",
): string {
  if (!Number.isFinite(value)) return `0${unit}`;

  return `${round(value)}${unit}`;
}

export function cssNumber(value: number): string {
  if (!Number.isFinite(value)) return "0";
  return String(round(value));
}

function round(value: number): number {
  return Number(value.toFixed(4));
}
```

---

# 8. 默认 CSS

## `packages/dom/src/style/defaultCss.ts`

```ts
export function createDefaultCss(prefix = "hiprint-re"): string {
  return `
.${prefix}-document {
  box-sizing: border-box;
  width: 100%;
  min-height: 100%;
  background: #f3f4f6;
  color: #111827;
  font-family: Arial, "Microsoft YaHei", sans-serif;
}

.${prefix}-page {
  position: relative;
  box-sizing: border-box;
  background: #ffffff;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
}

.${prefix}-page-print {
  box-shadow: none;
  page-break-after: always;
  break-after: page;
}

.${prefix}-element {
  position: absolute;
  box-sizing: border-box;
}

.${prefix}-text {
  white-space: pre-wrap;
  overflow: hidden;
  word-break: break-word;
}

.${prefix}-image {
  display: block;
  overflow: hidden;
}

.${prefix}-image > img {
  display: block;
  width: 100%;
  height: 100%;
}

.${prefix}-line {
  pointer-events: none;
}

.${prefix}-rect {
  background: transparent;
}

.${prefix}-table {
  overflow: hidden;
}

.${prefix}-table-cell {
  position: absolute;
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 2px;
  border: 1px solid #111827;
  font-size: 12px;
  line-height: 1.4;
}

.${prefix}-table-header-cell {
  font-weight: 600;
  background: #f9fafb;
}

.${prefix}-unknown {
  border: 1px dashed #9ca3af;
  color: #6b7280;
  font-size: 12px;
  overflow: hidden;
}

@media print {
  html,
  body {
    margin: 0;
    padding: 0;
    background: #fff;
  }

  .${prefix}-document {
    background: #fff;
  }

  .${prefix}-page {
    margin: 0 !important;
    box-shadow: none !important;
  }

  .${prefix}-page-print {
    page-break-after: always;
    break-after: page;
  }
}
`;
}
```

---

# 9. 注入 style

## `packages/dom/src/style/injectStyle.ts`

```ts
import { createDefaultCss } from "./defaultCss";

const STYLE_ATTR = "data-hiprint-re-style";

export function injectDefaultStyle(
  doc: Document,
  prefix = "hiprint-re",
): HTMLStyleElement {
  const existing = doc.querySelector<HTMLStyleElement>(
    `style[${STYLE_ATTR}="${prefix}"]`,
  );

  if (existing) return existing;

  const style = doc.createElement("style");
  style.setAttribute(STYLE_ATTR, prefix);
  style.textContent = createDefaultCss(prefix);

  doc.head.appendChild(style);

  return style;
}
```

---

# 10. 通用 DOM 工具

## `packages/dom/src/utils/dom.ts`

```ts
export function getDefaultDocument(): Document {
  if (typeof document === "undefined") {
    throw new Error("[hiprint-re/dom] document is not available.");
  }

  return document;
}

export function clearElement(element: HTMLElement): void {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function setClassName(
  element: HTMLElement,
  ...classNames: Array<string | undefined | false>
): void {
  element.className = classNames.filter(Boolean).join(" ");
}
```

---

# 11. applyElementStyle

## `packages/dom/src/style/applyElementStyle.ts`

```ts
import type { LayoutElement } from "@hiprint-re/core";
import type { DomRenderContext } from "../types";
import { cssLength } from "./cssLength";

export function applyElementBaseStyle(
  dom: HTMLElement,
  element: LayoutElement,
  ctx: DomRenderContext,
): void {
  const unit = ctx.options.geometryUnit;

  dom.style.left = cssLength(element.x, unit);
  dom.style.top = cssLength(element.y, unit);
  dom.style.width = cssLength(element.width, unit);
  dom.style.height = cssLength(element.height, unit);

  if (element.hidden) {
    dom.style.display = "none";
  }

  applyPrintStyle(dom, element.style, ctx);
}

export function applyPrintStyle(
  dom: HTMLElement,
  style: Record<string, unknown> | undefined,
  ctx: DomRenderContext,
): void {
  if (!style) return;

  const typographyUnit = ctx.options.typographyUnit;

  setCss(dom, "color", style.color);
  setCss(dom, "backgroundColor", style.backgroundColor);
  setCss(dom, "fontFamily", style.fontFamily);
  setCss(dom, "fontWeight", style.fontWeight);
  setCss(dom, "textAlign", style.textAlign);

  if (typeof style.fontSize === "number") {
    dom.style.fontSize = cssLength(style.fontSize, typographyUnit);
  }

  if (typeof style.lineHeight === "number") {
    dom.style.lineHeight = cssLength(style.lineHeight, typographyUnit);
  }

  if (typeof style.borderWidth === "number") {
    dom.style.borderWidth = cssLength(
      style.borderWidth,
      ctx.options.geometryUnit,
    );
  }

  setCss(dom, "borderColor", style.borderColor);
  setCss(dom, "borderStyle", style.borderStyle);

  if (typeof style.paddingTop === "number") {
    dom.style.paddingTop = cssLength(
      style.paddingTop,
      ctx.options.geometryUnit,
    );
  }

  if (typeof style.paddingRight === "number") {
    dom.style.paddingRight = cssLength(
      style.paddingRight,
      ctx.options.geometryUnit,
    );
  }

  if (typeof style.paddingBottom === "number") {
    dom.style.paddingBottom = cssLength(
      style.paddingBottom,
      ctx.options.geometryUnit,
    );
  }

  if (typeof style.paddingLeft === "number") {
    dom.style.paddingLeft = cssLength(
      style.paddingLeft,
      ctx.options.geometryUnit,
    );
  }
}

function setCss(
  dom: HTMLElement,
  key: keyof CSSStyleDeclaration,
  value: unknown,
): void {
  if (typeof value === "string" || typeof value === "number") {
    (dom.style as any)[key] = String(value);
  }
}
```

---

# 12. renderToDom

## `packages/dom/src/renderToDom.ts`

```ts
import type { LayoutDocument } from "@hiprint-re/core";
import type {
  DomRenderContext,
  DomRenderOptions,
  DomRenderResult,
  RequiredDomRenderOptions,
} from "./types";
import { getDefaultDocument } from "./utils/dom";
import { injectDefaultStyle } from "./style/injectStyle";
import { renderPage } from "./renderers/renderPage";

export function renderToDom(
  layout: LayoutDocument,
  options: DomRenderOptions = {},
): DomRenderResult {
  const doc = options.document ?? getDefaultDocument();

  const resolvedOptions = resolveOptions(layout, options);

  if (resolvedOptions.injectDefaultStyle) {
    injectDefaultStyle(doc, resolvedOptions.classNamePrefix);
  }

  const ctx: DomRenderContext = {
    document: doc,
    layout,
    options: resolvedOptions,
  };

  const root = doc.createElement("div");
  const prefix = resolvedOptions.classNamePrefix;

  root.className = [`${prefix}-document`, resolvedOptions.className]
    .filter(Boolean)
    .join(" ");

  const pages = layout.pages.map((page) => {
    const pageDom = renderPage(page, ctx);
    root.appendChild(pageDom);
    return pageDom;
  });

  return {
    root,
    pages,
    dispose() {
      root.remove();
    },
  };
}

function resolveOptions(
  layout: LayoutDocument,
  options: DomRenderOptions,
): RequiredDomRenderOptions {
  return {
    classNamePrefix: options.classNamePrefix ?? "hiprint-re",
    injectDefaultStyle: options.injectDefaultStyle ?? true,
    pageGap: options.pageGap ?? 16,
    geometryUnit: options.geometryUnit ?? layout.unit,
    typographyUnit: options.typographyUnit ?? "px",
    resolveImageSrc: options.resolveImageSrc ?? ((src) => src),
    renderUnknown: options.renderUnknown ?? true,
    className: options.className,
  };
}
```

---

# 13. renderPage

## `packages/dom/src/renderers/renderPage.ts`

```ts
import type { LayoutPage } from "@hiprint-re/core";
import type { DomRenderContext } from "../types";
import { cssLength } from "../style/cssLength";
import { renderElement } from "./renderElement";

export function renderPage(
  page: LayoutPage,
  ctx: DomRenderContext,
): HTMLElement {
  const doc = ctx.document;
  const prefix = ctx.options.classNamePrefix;
  const unit = ctx.options.geometryUnit;

  const pageDom = doc.createElement("div");
  pageDom.className = `${prefix}-page ${prefix}-page-print`;
  pageDom.dataset.pageIndex = String(page.index);

  pageDom.style.width = cssLength(page.width, unit);
  pageDom.style.height = cssLength(page.height, unit);
  pageDom.style.margin = `0 auto ${ctx.options.pageGap}px`;

  for (const element of page.elements) {
    const elementDom = renderElement(element, page, ctx);

    if (elementDom) {
      pageDom.appendChild(elementDom);
    }
  }

  return pageDom;
}
```

---

# 14. renderElement 分发器

## `packages/dom/src/renderers/renderElement.ts`

```ts
import type { LayoutElement, LayoutPage } from "@hiprint-re/core";
import type { DomRenderContext } from "../types";
import { renderText } from "./renderText";
import { renderImage } from "./renderImage";
import { renderLine } from "./renderLine";
import { renderRect } from "./renderRect";
import { renderTable } from "./renderTable";
import { renderUnknown } from "./renderUnknown";

export function renderElement(
  element: LayoutElement,
  page: LayoutPage,
  ctx: DomRenderContext,
): HTMLElement | null {
  switch (element.type) {
    case "text":
      return renderText(element as any, page, ctx);

    case "image":
      return renderImage(element as any, page, ctx);

    case "line":
      return renderLine(element as any, page, ctx);

    case "rect":
      return renderRect(element as any, page, ctx);

    case "table":
      return renderTable(element as any, page, ctx);

    case "unknown":
    default:
      return ctx.options.renderUnknown
        ? renderUnknown(element, page, ctx)
        : null;
  }
}
```

---

# 15. Text renderer

## `packages/dom/src/renderers/renderText.ts`

```ts
import type { LayoutPage, LayoutTextElement } from "@hiprint-re/core";
import type { DomRenderContext } from "../types";
import { applyElementBaseStyle } from "../style/applyElementStyle";

export function renderText(
  element: LayoutTextElement,
  _page: LayoutPage,
  ctx: DomRenderContext,
): HTMLElement {
  const doc = ctx.document;
  const prefix = ctx.options.classNamePrefix;

  const dom = doc.createElement("div");
  dom.className = `${prefix}-element ${prefix}-text`;
  dom.dataset.elementId = element.id;
  dom.dataset.elementType = element.type;

  applyElementBaseStyle(dom, element, ctx);

  dom.textContent = element.lines?.length
    ? element.lines.join("\n")
    : element.value;

  return dom;
}
```

这里使用 `textContent`，避免把数据内容当 HTML 注入。

---

# 16. Image renderer

## `packages/dom/src/renderers/renderImage.ts`

```ts
import type { LayoutImageElement, LayoutPage } from "@hiprint-re/core";
import type { DomRenderContext } from "../types";
import { applyElementBaseStyle } from "../style/applyElementStyle";

export function renderImage(
  element: LayoutImageElement,
  _page: LayoutPage,
  ctx: DomRenderContext,
): HTMLElement {
  const doc = ctx.document;
  const prefix = ctx.options.classNamePrefix;

  const wrapper = doc.createElement("div");
  wrapper.className = `${prefix}-element ${prefix}-image`;
  wrapper.dataset.elementId = element.id;
  wrapper.dataset.elementType = element.type;

  applyElementBaseStyle(wrapper, element, ctx);

  const src = ctx.options.resolveImageSrc(element.src);

  if (src) {
    const img = doc.createElement("img");
    img.src = src;
    img.alt = "";
    img.style.objectFit = element.objectFit ?? "contain";

    wrapper.appendChild(img);
  }

  return wrapper;
}
```

---

# 17. Line renderer

## `packages/dom/src/renderers/renderLine.ts`

```ts
import type { LayoutLineElement, LayoutPage } from "@hiprint-re/core";
import type { DomRenderContext } from "../types";
import { applyElementBaseStyle } from "../style/applyElementStyle";

export function renderLine(
  element: LayoutLineElement,
  _page: LayoutPage,
  ctx: DomRenderContext,
): HTMLElement {
  const doc = ctx.document;
  const prefix = ctx.options.classNamePrefix;

  const dom = doc.createElement("div");
  dom.className = `${prefix}-element ${prefix}-line`;
  dom.dataset.elementId = element.id;
  dom.dataset.elementType = element.type;

  applyElementBaseStyle(dom, element, ctx);

  const color = String(element.style?.borderColor ?? "#111827");
  const width = String(element.style?.borderWidth ?? 1);

  if (element.direction === "vertical") {
    dom.style.borderLeft = `${width}px solid ${color}`;
  } else {
    dom.style.borderTop = `${width}px solid ${color}`;
  }

  return dom;
}
```

---

# 18. Rect renderer

## `packages/dom/src/renderers/renderRect.ts`

```ts
import type { LayoutPage, LayoutRectElement } from "@hiprint-re/core";
import type { DomRenderContext } from "../types";
import { applyElementBaseStyle } from "../style/applyElementStyle";
import { cssLength } from "../style/cssLength";

export function renderRect(
  element: LayoutRectElement,
  _page: LayoutPage,
  ctx: DomRenderContext,
): HTMLElement {
  const doc = ctx.document;
  const prefix = ctx.options.classNamePrefix;

  const dom = doc.createElement("div");
  dom.className = `${prefix}-element ${prefix}-rect`;
  dom.dataset.elementId = element.id;
  dom.dataset.elementType = element.type;

  applyElementBaseStyle(dom, element, ctx);

  if (!dom.style.borderStyle) {
    dom.style.borderStyle = "solid";
  }

  if (!dom.style.borderWidth) {
    dom.style.borderWidth = "1px";
  }

  if (!dom.style.borderColor) {
    dom.style.borderColor = "#111827";
  }

  if (typeof element.radius === "number") {
    dom.style.borderRadius = cssLength(
      element.radius,
      ctx.options.geometryUnit,
    );
  }

  return dom;
}
```

---

# 19. Table renderer

Phase 4 的 table renderer 只消费 Phase 3 产出的 `LayoutTableElement`。
它不负责重新计算行高、分页、列宽。

## `packages/dom/src/renderers/renderTable.ts`

```ts
import type { LayoutPage, LayoutTableElement } from "@hiprint-re/core";
import type { DomRenderContext } from "../types";
import { applyElementBaseStyle } from "../style/applyElementStyle";
import { cssLength } from "../style/cssLength";

export function renderTable(
  element: LayoutTableElement,
  _page: LayoutPage,
  ctx: DomRenderContext,
): HTMLElement {
  const doc = ctx.document;
  const prefix = ctx.options.classNamePrefix;
  const unit = ctx.options.geometryUnit;

  const root = doc.createElement("div");
  root.className = `${prefix}-element ${prefix}-table`;
  root.dataset.elementId = element.id;
  root.dataset.elementType = element.type;

  applyElementBaseStyle(root, element, ctx);

  if (element.headerHeight > 0) {
    for (const column of element.columns) {
      const cell = doc.createElement("div");
      cell.className = `${prefix}-table-cell ${prefix}-table-header-cell`;

      cell.style.left = cssLength(column.x, unit);
      cell.style.top = cssLength(0, unit);
      cell.style.width = cssLength(column.width, unit);
      cell.style.height = cssLength(element.headerHeight, unit);
      cell.style.lineHeight = cssLength(element.headerHeight, unit);

      cell.textContent = column.title ?? column.field ?? "";

      root.appendChild(cell);
    }
  }

  for (const row of element.rows) {
    const localY = row.y - element.y;

    for (const cell of row.cells) {
      const cellDom = doc.createElement("div");
      cellDom.className = `${prefix}-table-cell`;

      cellDom.style.left = cssLength(cell.x, unit);
      cellDom.style.top = cssLength(localY, unit);
      cellDom.style.width = cssLength(cell.width, unit);
      cellDom.style.height = cssLength(cell.height, unit);
      cellDom.style.lineHeight = cssLength(cell.height, unit);

      cellDom.textContent = cell.value;

      root.appendChild(cellDom);
    }
  }

  return root;
}
```

---

# 20. Unknown renderer

## `packages/dom/src/renderers/renderUnknown.ts`

```ts
import type { LayoutElement, LayoutPage } from "@hiprint-re/core";
import type { DomRenderContext } from "../types";
import { applyElementBaseStyle } from "../style/applyElementStyle";

export function renderUnknown(
  element: LayoutElement,
  _page: LayoutPage,
  ctx: DomRenderContext,
): HTMLElement {
  const doc = ctx.document;
  const prefix = ctx.options.classNamePrefix;

  const dom = doc.createElement("div");
  dom.className = `${prefix}-element ${prefix}-unknown`;
  dom.dataset.elementId = element.id;
  dom.dataset.elementType = element.type;

  applyElementBaseStyle(dom, element, ctx);

  dom.textContent = `Unknown: ${element.type}`;

  return dom;
}
```

---

# 21. mountLayout

## `packages/dom/src/mountLayout.ts`

```ts
import type { LayoutDocument } from "@hiprint-re/core";
import type { DomRenderOptions, MountLayoutResult } from "./types";
import { clearElement } from "./utils/dom";
import { renderToDom } from "./renderToDom";

export function mountLayout(
  layout: LayoutDocument,
  container: HTMLElement,
  options: DomRenderOptions = {},
): MountLayoutResult {
  clearElement(container);

  const result = renderToDom(layout, {
    ...options,
    document: options.document ?? container.ownerDocument,
  });

  container.appendChild(result.root);

  return {
    ...result,
    container,
    dispose() {
      result.root.remove();
    },
  };
}
```

---

# 22. renderToHtmlString

## `packages/dom/src/renderToHtmlString.ts`

```ts
import type { LayoutDocument } from "@hiprint-re/core";
import type { DomRenderOptions } from "./types";
import { renderToDom } from "./renderToDom";

export function renderToHtmlString(
  layout: LayoutDocument,
  options: DomRenderOptions = {},
): string {
  const result = renderToDom(layout, options);

  try {
    return result.root.outerHTML;
  } finally {
    result.dispose();
  }
}
```

这个适合测试或后续 SSR/导出 HTML 使用。

---

# 23. Preview API

## `packages/dom/src/preview/createPreviewRoot.ts`

```ts
export function createPreviewRoot(container: HTMLElement): HTMLElement {
  const doc = container.ownerDocument;

  let root = container.querySelector<HTMLElement>(
    "[data-hiprint-re-preview-root]",
  );

  if (root) return root;

  root = doc.createElement("div");
  root.dataset.hiprintRePreviewRoot = "true";

  root.style.width = "100%";
  root.style.height = "100%";
  root.style.overflow = "auto";
  root.style.background = "#f3f4f6";
  root.style.padding = "24px 0";

  container.appendChild(root);

  return root;
}
```

---

## `packages/dom/src/preview/previewLayout.ts`

```ts
import type { LayoutDocument } from "@hiprint-re/core";
import type { DomRenderOptions, MountLayoutResult } from "../types";
import { createPreviewRoot } from "./createPreviewRoot";
import { mountLayout } from "../mountLayout";

export function previewLayout(
  layout: LayoutDocument,
  container: HTMLElement,
  options: DomRenderOptions = {},
): MountLayoutResult {
  const root = createPreviewRoot(container);

  return mountLayout(layout, root, {
    pageGap: 24,
    ...options,
  });
}
```

---

# 24. Print HTML

## `packages/dom/src/print/createPrintHtml.ts`

```ts
import type { LayoutDocument } from "@hiprint-re/core";
import type { DomRenderOptions } from "../types";
import { renderToHtmlString } from "../renderToHtmlString";
import { createDefaultCss } from "../style/defaultCss";

export function createPrintHtml(
  layout: LayoutDocument,
  options: DomRenderOptions = {},
): string {
  const prefix = options.classNamePrefix ?? "hiprint-re";

  const body = renderToHtmlString(layout, {
    ...options,
    injectDefaultStyle: false,
    classNamePrefix: prefix,
    pageGap: 0,
  });

  const css = createDefaultCss(prefix);

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Print</title>
  <style>${css}</style>
  <style>
    @page {
      size: ${layout.width}${layout.unit} ${layout.height}${layout.unit};
      margin: 0;
    }
  </style>
</head>
<body>
${body}
</body>
</html>`;
}
```

---

# 25. Browser Print

## `packages/dom/src/print/printLayout.ts`

```ts
import type { LayoutDocument } from "@hiprint-re/core";
import type { DomRenderOptions } from "../types";
import { getDefaultDocument } from "../utils/dom";
import { createPrintHtml } from "./createPrintHtml";

export interface PrintLayoutOptions extends DomRenderOptions {
  /**
   * 打印结束后是否自动移除 iframe。
   */
  autoRemove?: boolean;

  /**
   * 自动移除延迟。
   */
  removeDelay?: number;
}

export async function printLayout(
  layout: LayoutDocument,
  options: PrintLayoutOptions = {},
): Promise<void> {
  const doc = options.document ?? getDefaultDocument();
  const html = createPrintHtml(layout, options);

  const iframe = doc.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  iframe.style.visibility = "hidden";

  doc.body.appendChild(iframe);

  const iframeDoc = iframe.contentDocument;
  const iframeWin = iframe.contentWindow;

  if (!iframeDoc || !iframeWin) {
    iframe.remove();
    throw new Error("[hiprint-re/dom] Failed to create print iframe.");
  }

  iframeDoc.open();
  iframeDoc.write(html);
  iframeDoc.close();

  await waitForIframeReady(iframe);

  iframeWin.focus();
  iframeWin.print();

  if (options.autoRemove ?? true) {
    const removeDelay = options.removeDelay ?? 1000;
    window.setTimeout(() => {
      iframe.remove();
    }, removeDelay);
  }
}

function waitForIframeReady(iframe: HTMLIFrameElement): Promise<void> {
  return new Promise((resolve) => {
    const win = iframe.contentWindow;

    if (!win) {
      resolve();
      return;
    }

    if (iframe.contentDocument?.readyState === "complete") {
      requestAnimationFrame(() => resolve());
      return;
    }

    iframe.onload = () => {
      requestAnimationFrame(() => resolve());
    };
  });
}
```

注意：这里用了 `window.setTimeout` 和 `requestAnimationFrame`。
这是 DOM 包允许的，不能放在 core。

---

# 26. index.ts

## `packages/dom/src/index.ts`

```ts
export * from "./types";

export * from "./renderToDom";
export * from "./mountLayout";
export * from "./renderToHtmlString";

export * from "./preview/createPreviewRoot";
export * from "./preview/previewLayout";

export * from "./print/createPrintHtml";
export * from "./print/printLayout";

export * from "./style/defaultCss";
export * from "./style/cssLength";
export * from "./style/injectStyle";
export * from "./style/applyElementStyle";
```

---

# 27. Playground 集成草案

可以新增一个 playground：

```txt
apps/playground-dom/
```

不过 Phase 4 也可以先复用 `playground-legacy`，增加一个 Core DOM Preview 按钮。

更推荐新增：

```txt
apps/playground-dom/
```

目录：

```txt
apps/playground-dom/
├─ package.json
├─ index.html
├─ vite.config.ts
└─ src/
   ├─ main.ts
   └─ style.css
```

---

## `apps/playground-dom/package.json`

```json
{
  "name": "@hiprint-re/playground-dom",
  "version": "0.0.0",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "vite --host 0.0.0.0",
    "build": "vite build",
    "typecheck": "tsc -p tsconfig.json --noEmit"
  },
  "dependencies": {
    "@hiprint-re/core": "workspace:*",
    "@hiprint-re/dom": "workspace:*"
  },
  "devDependencies": {
    "vite": "^7.0.0",
    "typescript": "^5.0.0"
  }
}
```

---

## `apps/playground-dom/index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>hiprint dom playground</title>
  </head>
  <body>
    <div class="toolbar">
      <button id="preview">Preview</button>
      <button id="print">Print</button>
    </div>

    <div id="preview-root"></div>

    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

---

## `apps/playground-dom/src/main.ts`

```ts
import { fromLegacyTemplate, layoutTemplate } from "@hiprint-re/core";
import { previewLayout, printLayout } from "@hiprint-re/dom";

import basicTemplate from "../../../fixtures/templates/basic-text.json";
import basicData from "../../../fixtures/data/basic-text.data.json";

import "./style.css";

const previewRoot = document.querySelector<HTMLElement>("#preview-root")!;

function createLayout() {
  const coreTemplate = fromLegacyTemplate(basicTemplate as any, {
    id: "playground_basic",
    name: "Basic Template",
  });

  return layoutTemplate(coreTemplate, basicData);
}

document.querySelector("#preview")?.addEventListener("click", () => {
  const layout = createLayout();

  previewLayout(layout, previewRoot);
});

document.querySelector("#print")?.addEventListener("click", async () => {
  const layout = createLayout();

  await printLayout(layout);
});
```

---

## `apps/playground-dom/src/style.css`

```css
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  width: 100%;
  height: 100%;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

.toolbar {
  height: 48px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  border-bottom: 1px solid #e5e7eb;
  background: #fff;
}

.toolbar button {
  height: 32px;
  padding: 0 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
}

#preview-root {
  height: calc(100vh - 48px);
}
```

---

# 28. 测试设计

新增：

```txt
tests/dom/
├─ renderToDom.test.ts
├─ renderText.test.ts
├─ renderTable.test.ts
├─ renderToHtmlString.test.ts
└─ createPrintHtml.test.ts
```

---

## `tests/dom/renderToDom.test.ts`

```ts
import { describe, expect, it } from "vitest";
import { createEmptyTemplate, layoutTemplate } from "../../packages/core/src";
import { renderToDom } from "../../packages/dom/src";

describe("renderToDom", () => {
  it("should render layout document", () => {
    const template = createEmptyTemplate();

    const layout = layoutTemplate(template, {});

    const result = renderToDom(layout);

    expect(result.root.className).toContain("hiprint-re-document");
    expect(result.pages.length).toBeGreaterThan(0);
    expect(result.pages[0]?.className).toContain("hiprint-re-page");

    result.dispose();
  });
});
```

---

## `tests/dom/renderText.test.ts`

```ts
import { describe, expect, it } from "vitest";
import { createEmptyTemplate, layoutTemplate } from "../../packages/core/src";
import { renderToDom } from "../../packages/dom/src";

describe("render text", () => {
  it("should render text content", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "text_1",
      type: "text",
      x: 10,
      y: 20,
      width: 80,
      height: 10,
      binding: {
        field: "orderNo",
      },
    });

    const layout = layoutTemplate(template, {
      orderNo: "NO-001",
    });

    const result = renderToDom(layout);

    const text = result.root.querySelector<HTMLElement>(
      '[data-element-id="text_1"]',
    );

    expect(text).toBeTruthy();
    expect(text?.textContent).toContain("NO-001");
  });
});
```

---

## `tests/dom/renderTable.test.ts`

```ts
import { describe, expect, it } from "vitest";
import { createEmptyTemplate, layoutTemplate } from "../../packages/core/src";
import { renderToDom } from "../../packages/dom/src";

describe("render table", () => {
  it("should render table cells", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "table_1",
      type: "table",
      x: 10,
      y: 10,
      width: 100,
      height: 40,
      options: {
        dataField: "items",
        columns: [
          {
            id: "name",
            field: "name",
            title: "名称",
            width: 50,
          },
          {
            id: "price",
            field: "price",
            title: "价格",
            width: 50,
          },
        ],
      },
    });

    const layout = layoutTemplate(template, {
      items: [
        {
          name: "苹果",
          price: 10,
        },
      ],
    });

    const result = renderToDom(layout);

    expect(result.root.textContent).toContain("名称");
    expect(result.root.textContent).toContain("苹果");
    expect(result.root.textContent).toContain("10");
  });
});
```

---

## `tests/dom/renderToHtmlString.test.ts`

```ts
import { describe, expect, it } from "vitest";
import { createEmptyTemplate, layoutTemplate } from "../../packages/core/src";
import { renderToHtmlString } from "../../packages/dom/src";

describe("renderToHtmlString", () => {
  it("should serialize layout to html string", () => {
    const template = createEmptyTemplate();
    const layout = layoutTemplate(template, {});

    const html = renderToHtmlString(layout);

    expect(html).toContain("hiprint-re-document");
    expect(html).toContain("hiprint-re-page");
  });
});
```

---

## `tests/dom/createPrintHtml.test.ts`

```ts
import { describe, expect, it } from "vitest";
import { createEmptyTemplate, layoutTemplate } from "../../packages/core/src";
import { createPrintHtml } from "../../packages/dom/src";

describe("createPrintHtml", () => {
  it("should create printable html", () => {
    const template = createEmptyTemplate();
    const layout = layoutTemplate(template, {});

    const html = createPrintHtml(layout);

    expect(html).toContain("<!doctype html>");
    expect(html).toContain("@page");
    expect(html).toContain("hiprint-re-document");
  });
});
```

---

# 29. 根 package.json 脚本

```json
{
  "scripts": {
    "test:dom": "vitest run tests/dom",
    "check:dom": "pnpm --filter @hiprint-re/dom typecheck && pnpm test:dom",
    "dev:dom": "pnpm --filter @hiprint-re/playground-dom dev"
  }
}
```

如果已有 `pnpm -r build/typecheck`，`@hiprint-re/dom` 会自动被包含。

---

# 30. docs/dom-renderer.md

````md
# DOM Renderer

## Goal

`@hiprint-re/dom` renders `LayoutDocument` from `@hiprint-re/core`
into DOM / HTML / browser print output.

## Input

```ts
LayoutDocument;
```
````

## Output

- HTMLElement
- HTML string
- browser print iframe

## APIs

```ts
renderToDom(layout);
mountLayout(layout, container);
renderToHtmlString(layout);
previewLayout(layout, container);
printLayout(layout);
```

## Rules

DOM renderer may depend on:

- document
- HTMLElement
- iframe
- browser print

DOM renderer must not depend on:

- React
- Vue
- designer state
- legacy runtime
- jQuery

## Rendering flow

```txt
LayoutDocument
  ↓
renderToDom
  ↓
renderPage
  ↓
renderElement
  ↓
renderText / renderImage / renderLine / renderRect / renderTable
```

## Print flow

```txt
LayoutDocument
  ↓
createPrintHtml
  ↓
hidden iframe
  ↓
iframe.contentWindow.print()
```

````

---

# 31. docs/phase-4.md

```md
# Phase 4 - DOM Renderer

## Goal

Render `LayoutDocument` into browser DOM and support preview / browser print.

## Non-goals

- No React/Vue
- No designer
- No drag/resize
- No PDF renderer
- No Canvas renderer
- No advanced table pagination

## Deliverables

- `@hiprint-re/dom`
- `renderToDom`
- `mountLayout`
- `renderToHtmlString`
- `previewLayout`
- `printLayout`
- basic renderer tests
- playground-dom

## Acceptance

- Can render layout to DOM
- Can mount preview into container
- Can serialize to HTML string
- Can create printable HTML
- Can trigger browser print through iframe
- Does not depend on React/Vue/jQuery/legacy runtime
````

---

# 32. Phase 4 验收标准

Phase 4 完成后，应满足：

```txt
1. 新增 @hiprint-re/dom
2. renderToDom(layout) 可用
3. mountLayout(layout, container) 可用
4. renderToHtmlString(layout) 可用
5. previewLayout(layout, container) 可用
6. printLayout(layout) 可用
7. text/image/line/rect/table 都有 DOM renderer
8. 不依赖 React/Vue/jQuery/legacy runtime
9. tests/dom 通过
10. playground-dom 可预览 basic fixture
11. docs/dom-renderer.md 完成
12. docs/phase-4.md 完成
```

---

# 33. 推荐 PR 拆分

## PR 1：新增 DOM 包和基础渲染

```txt
feat(dom): add dom renderer package
```

内容：

```txt
packages/dom
renderToDom
renderPage
renderElement
defaultCss
```

---

## PR 2：实现元素 renderer

```txt
feat(dom): add built-in element renderers
```

内容：

```txt
renderText
renderImage
renderLine
renderRect
renderTable
renderUnknown
```

---

## PR 3：实现 preview 和 print

```txt
feat(dom): add preview and browser print
```

内容：

```txt
previewLayout
createPrintHtml
printLayout
```

---

## PR 4：测试与 playground

```txt
test(dom): add dom renderer tests
feat(playground): add dom playground
docs(dom): document dom renderer
```

---

# 34. Phase 4 最小 TODO

```txt
[ ] 新建 packages/dom
[ ] 定义 DomRenderOptions / DomRenderContext
[ ] 实现 cssLength
[ ] 实现 defaultCss
[ ] 实现 injectDefaultStyle
[ ] 实现 applyElementBaseStyle
[ ] 实现 renderToDom
[ ] 实现 renderPage
[ ] 实现 renderElement
[ ] 实现 renderText
[ ] 实现 renderImage
[ ] 实现 renderLine
[ ] 实现 renderRect
[ ] 实现 renderTable
[ ] 实现 renderUnknown
[ ] 实现 mountLayout
[ ] 实现 renderToHtmlString
[ ] 实现 previewLayout
[ ] 实现 createPrintHtml
[ ] 实现 printLayout
[ ] 新增 tests/dom
[ ] 新增 apps/playground-dom
[ ] 新增 docs/dom-renderer.md
[ ] 新增 docs/phase-4.md
```

---

# 35. 关键风险点

## 1. 字体单位和几何单位不要混淆

`LayoutDocument.unit` 主要控制坐标、宽高、页面尺寸。

但是 `fontSize: 12` 更像 `12px` 或 `12pt`，不一定是 `12mm`。

所以 Phase 4 设计里分开了：

```ts
geometryUnit: "mm" | "px";
typographyUnit: "px" | "pt" | "mm";
```

默认：

```txt
geometryUnit = layout.unit
typographyUnit = px
```

后续如果你想更接近打印，可以把 `typographyUnit` 改成 `pt`。

---

## 2. DOM renderer 不要重新计算布局

错误：

```ts
// renderTable 里重新算分页
```

正确：

```ts
// renderTable 只消费 LayoutTableElement
```

Phase 3 负责布局，Phase 4 只负责画。

---

## 3. 不要使用 innerHTML 渲染数据

文本、表格 cell 等动态数据必须用：

```ts
element.textContent = value;
```

不要用：

```ts
element.innerHTML = value;
```

除非后面专门支持 `html` element，并明确由用户承担可信 HTML 风险。

---

## 4. print iframe 需要保持简单

Phase 4 只做浏览器原生 print：

```txt
LayoutDocument -> HTML -> iframe -> print()
```

不要在这一阶段做 PDF 导出。PDF 可以放后续：

```txt
Phase 8 / Phase 9
```

---

# 36. 最终判断

Phase 4 的本质是：

```txt
把 core layout 结果变成用户看得见、能打印的页面
```

完成后你的链路就变成：

```txt
legacy template
  ↓
fromLegacyTemplate
  ↓
core template
  ↓
layoutTemplate
  ↓
LayoutDocument
  ↓
renderToDom / previewLayout / printLayout
```

这一步做完后，项目就已经有一个完整闭环：

```txt
旧模板导入 → core schema → layout → DOM preview → browser print
```

但注意它仍然不是 designer。
designer 应该在后续 Phase 5 / Phase 6 做：

```txt
Phase 5：React/Vue preview adapter
Phase 6：designer state / command / selection
Phase 7：React/Vue designer
```

Phase 4 只把“打印结果”画出来。
