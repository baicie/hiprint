下面给你一版 **Phase 3：`@hiprint-re/core` Layout Engine 布局引擎** 的详细设计与代码草案。

Phase 3 的定位是：

```txt
Phase 0：legacy 能跑
Phase 1：legacy 可审计
Phase 2：core schema / model / legacy adapter
Phase 3：core layout engine
```

这一阶段的核心目标是：**让 `@hiprint-re/core` 能把模板 + 数据转换成稳定、可测试、框架无关的布局结果。**

---

# 1. Phase 3 总目标

Phase 3 要完成：

```txt
1. 定义 LayoutDocument / LayoutPage / LayoutElement
2. 实现单位换算：mm / px
3. 实现纸张尺寸与页面模型
4. 实现基础元素布局：text / image / line / rect
5. 实现基础 table 布局
6. 实现简单分页
7. 实现 data binding
8. 实现 layout warning
9. 增加 fixtures layout snapshot 测试
10. 保证 layout engine 不依赖 DOM / React / Vue / jQuery
```

最终效果：

```ts
import { fromLegacyTemplate, layoutTemplate } from "@hiprint-re/core";

const template = fromLegacyTemplate(legacyTemplate);

const layout = layoutTemplate(template, data);

console.log(layout.pages);
```

输出类似：

```ts
{
  unit: "mm",
  pages: [
    {
      index: 0,
      width: 210,
      height: 297,
      elements: [
        {
          id: "legacy_p0_el0",
          type: "text",
          x: 20,
          y: 20,
          width: 80,
          height: 10,
          value: "NO-20260531-0001"
        }
      ]
    }
  ],
  warnings: []
}
```

---

# 2. Phase 3 不做什么

这一阶段不要失控。

```txt
不做 DOM renderer
不做 React/Vue
不做 designer
不做拖拽
不做 undo/redo
不做浏览器 print
不做 iframe preview
不做精确字体渲染测量
不做复杂表格跨页边框
不做合并单元格完整算法
不做 PDF renderer
```

Phase 3 只负责：

```txt
schema + data -> layout result
```

---

# 3. 推荐目录结构

在 `packages/core/src` 下新增：

```txt
packages/core/src/
├─ layout/
│  ├─ index.ts
│  ├─ types.ts
│  ├─ layoutTemplate.ts
│  ├─ layoutPanel.ts
│  ├─ layoutElement.ts
│  ├─ layoutText.ts
│  ├─ layoutImage.ts
│  ├─ layoutLine.ts
│  ├─ layoutRect.ts
│  ├─ layoutTable.ts
│  ├─ pageBuilder.ts
│  ├─ unit.ts
│  ├─ paper.ts
│  ├─ measureText.ts
│  ├─ resolveBinding.ts
│  ├─ warnings.ts
│  └─ utils.ts
```

然后在 `packages/core/src/index.ts` 导出：

```ts
export * from "./layout";
```

---

# 4. Layout 设计原则

## 4.1 core layout 不依赖 DOM

`layout` 层不能出现：

```ts
window;
document;
HTMLElement;
CanvasRenderingContext2D;
React;
Vue;
jQuery;
```

文字测量只能用默认估算，或者通过外部注入 measurer。

---

## 4.2 layout output 必须稳定

Phase 3 的结果要适合 snapshot 测试，所以输出必须稳定：

```txt
同一份 template + data
  ↓
每次 layout 输出一致
```

不要在 layout 里生成随机 ID。
如果没有 ID，应该在 Phase 2 normalize 阶段补齐。

---

## 4.3 layout 不直接修改 template

错误：

```ts
template.panels[0].elements[0].x = 123;
```

正确：

```ts
const layout = layoutTemplate(template, data);
```

layout result 是新的对象。

---

# 5. Layout 类型设计

## `packages/core/src/layout/types.ts`

```ts
import type { Unit } from "../types/common";
import type { PrintElementType } from "../types/element";
import type { PrintTemplate } from "../types/template";

export interface LayoutOptions {
  /**
   * 输出布局单位。Phase 3 默认 mm。
   */
  unit?: Unit;

  /**
   * px 和 mm 换算使用的 DPI。
   * 默认 96。
   */
  dpi?: number;

  /**
   * 是否允许元素溢出页面。
   * false 时会产生 warning，但不会直接 throw。
   */
  allowOverflow?: boolean;

  /**
   * 自定义文本测量函数。
   * 不传时使用 core 内部估算。
   */
  measureText?: TextMeasurer;
}

export interface LayoutContext {
  template: PrintTemplate;
  data: unknown;
  unit: Unit;
  dpi: number;
  allowOverflow: boolean;
  measureText: TextMeasurer;
  warnings: LayoutWarning[];
}

export interface TextMeasurer {
  measure(input: MeasureTextInput): MeasureTextResult;
}

export interface MeasureTextInput {
  text: string;
  fontSize: number;
  fontFamily?: string;
  fontWeight?: string | number;
  lineHeight?: number;
  maxWidth?: number;
  unit: Unit;
}

export interface MeasureTextResult {
  width: number;
  height: number;
  lines: string[];
  lineHeight: number;
}

export interface LayoutDocument {
  unit: Unit;
  width: number;
  height: number;
  pages: LayoutPage[];
  warnings: LayoutWarning[];
}

export interface LayoutPage {
  index: number;
  width: number;
  height: number;
  elements: LayoutElement[];
}

export interface LayoutWarning {
  code: string;
  level: "warning" | "error";
  message: string;
  path?: string;
  elementId?: string;
}

export interface LayoutRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface LayoutElementBase extends LayoutRect {
  id: string;
  type: PrintElementType;
  sourcePanelId: string;
  sourceElementId: string;
  pageIndex: number;
  hidden?: boolean;
  style?: Record<string, unknown>;
  raw?: Record<string, unknown>;
}

export interface LayoutTextElement extends LayoutElementBase {
  type: "text";
  value: string;
  lines: string[];
  fontSize: number;
  lineHeight: number;
}

export interface LayoutImageElement extends LayoutElementBase {
  type: "image";
  src?: string;
  objectFit?: "contain" | "cover" | "fill";
}

export interface LayoutLineElement extends LayoutElementBase {
  type: "line";
  direction: "horizontal" | "vertical";
}

export interface LayoutRectElement extends LayoutElementBase {
  type: "rect";
  radius?: number;
}

export interface LayoutTableElement extends LayoutElementBase {
  type: "table";
  columns: LayoutTableColumn[];
  rows: LayoutTableRow[];
  headerHeight: number;
  rowHeight: number;
}

export interface LayoutTableColumn {
  id: string;
  field?: string;
  title?: string;
  x: number;
  width: number;
}

export interface LayoutTableRow {
  index: number;
  y: number;
  height: number;
  cells: LayoutTableCell[];
  raw?: unknown;
}

export interface LayoutTableCell {
  columnId: string;
  value: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface LayoutUnknownElement extends LayoutElementBase {
  type: "unknown";
}

export type LayoutElement =
  | LayoutTextElement
  | LayoutImageElement
  | LayoutLineElement
  | LayoutRectElement
  | LayoutTableElement
  | LayoutUnknownElement
  | LayoutElementBase;
```

---

# 6. 单位换算

## `packages/core/src/layout/unit.ts`

```ts
import type { Unit } from "../types/common";

export interface UnitContext {
  from: Unit;
  to: Unit;
  dpi: number;
}

export function convertUnit(value: number, ctx: UnitContext): number {
  if (ctx.from === ctx.to) return value;

  if (ctx.from === "mm" && ctx.to === "px") {
    return mmToPx(value, ctx.dpi);
  }

  if (ctx.from === "px" && ctx.to === "mm") {
    return pxToMm(value, ctx.dpi);
  }

  return value;
}

export function mmToPx(mm: number, dpi = 96): number {
  return (mm / 25.4) * dpi;
}

export function pxToMm(px: number, dpi = 96): number {
  return (px / dpi) * 25.4;
}

export function roundLayoutValue(value: number): number {
  return Number(value.toFixed(4));
}
```

Phase 3 默认输出 `mm`，后面 DOM renderer 可以把它转换成 CSS `mm` 或 `px`。

---

# 7. 纸张工具

## `packages/core/src/layout/paper.ts`

```ts
import type { PaperConfig } from "../types/paper";
import type { Unit } from "../types/common";
import { convertUnit, roundLayoutValue } from "./unit";

export interface ResolvedPaper {
  width: number;
  height: number;
  unit: Unit;
}

export function resolvePaper(
  paper: PaperConfig,
  outputUnit: Unit,
  dpi: number,
): ResolvedPaper {
  return {
    width: roundLayoutValue(
      convertUnit(paper.width, {
        from: paper.unit,
        to: outputUnit,
        dpi,
      }),
    ),
    height: roundLayoutValue(
      convertUnit(paper.height, {
        from: paper.unit,
        to: outputUnit,
        dpi,
      }),
    ),
    unit: outputUnit,
  };
}
```

---

# 8. Warning 工具

## `packages/core/src/layout/warnings.ts`

```ts
import type { LayoutContext, LayoutWarning } from "./types";

export function pushLayoutWarning(
  ctx: LayoutContext,
  warning: LayoutWarning,
): void {
  ctx.warnings.push(warning);
}

export function warnElementOverflow(input: {
  ctx: LayoutContext;
  elementId: string;
  path: string;
}): void {
  pushLayoutWarning(input.ctx, {
    level: "warning",
    code: "element.overflow",
    elementId: input.elementId,
    path: input.path,
    message: `Element "${input.elementId}" overflows page bounds.`,
  });
}

export function warnUnknownElement(input: {
  ctx: LayoutContext;
  elementId: string;
  path: string;
}): void {
  pushLayoutWarning(input.ctx, {
    level: "warning",
    code: "element.unknown",
    elementId: input.elementId,
    path: input.path,
    message: `Element "${input.elementId}" has unknown type.`,
  });
}
```

---

# 9. 数据绑定

## `packages/core/src/layout/resolveBinding.ts`

```ts
import type { DataBinding } from "../types/element";

export function resolveBindingValue(
  binding: DataBinding | undefined,
  data: unknown,
  fallback?: unknown,
): string {
  if (!binding?.field) {
    return stringifyValue(fallback ?? binding?.title ?? "");
  }

  const value = getByPath(data, binding.field);

  return stringifyValue(value ?? fallback ?? "");
}

export function getByPath(data: unknown, path: string): unknown {
  if (!path) return undefined;

  const parts = path.split(".");
  let current: any = data;

  for (const part of parts) {
    if (current == null) return undefined;
    current = current[part];
  }

  return current;
}

export function stringifyValue(value: unknown): string {
  if (value == null) return "";

  if (typeof value === "string") return value;

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  return JSON.stringify(value);
}
```

支持：

```txt
orderNo
customer.name
items
```

Phase 3 不做复杂表达式。表达式系统可以后续单独加。

---

# 10. 文本测量

Phase 3 不能依赖 DOM，所以用估算。

## `packages/core/src/layout/measureText.ts`

```ts
import type {
  MeasureTextInput,
  MeasureTextResult,
  TextMeasurer,
} from "./types";

export class DefaultTextMeasurer implements TextMeasurer {
  measure(input: MeasureTextInput): MeasureTextResult {
    const fontSize = input.fontSize || 12;
    const lineHeight = input.lineHeight || fontSize * 1.2;
    const text = input.text || "";

    const charWidth = estimateCharWidth(fontSize);
    const maxWidth = input.maxWidth;

    const lines =
      maxWidth && maxWidth > 0
        ? wrapText(text, maxWidth, charWidth)
        : splitLines(text);

    const width = maxWidth
      ? Math.min(
          maxWidth,
          Math.max(...lines.map((line) => line.length * charWidth), 0),
        )
      : Math.max(...lines.map((line) => line.length * charWidth), 0);

    return {
      width,
      height: lines.length * lineHeight,
      lines,
      lineHeight,
    };
  }
}

export function createDefaultTextMeasurer(): TextMeasurer {
  return new DefaultTextMeasurer();
}

function estimateCharWidth(fontSize: number): number {
  return fontSize * 0.55;
}

function splitLines(text: string): string[] {
  const lines = text.split(/\r?\n/);
  return lines.length > 0 ? lines : [""];
}

function wrapText(text: string, maxWidth: number, charWidth: number): string[] {
  const rawLines = splitLines(text);
  const result: string[] = [];
  const maxCharsPerLine = Math.max(1, Math.floor(maxWidth / charWidth));

  for (const rawLine of rawLines) {
    if (rawLine.length <= maxCharsPerLine) {
      result.push(rawLine);
      continue;
    }

    let rest = rawLine;

    while (rest.length > maxCharsPerLine) {
      result.push(rest.slice(0, maxCharsPerLine));
      rest = rest.slice(maxCharsPerLine);
    }

    if (rest) {
      result.push(rest);
    }
  }

  return result.length > 0 ? result : [""];
}
```

后面 DOM renderer 可以传入更精确的 measurer，比如 Canvas 版本，但 core 默认不能依赖 Canvas。

---

# 11. PageBuilder

负责把元素放进页面。

## `packages/core/src/layout/pageBuilder.ts`

```ts
import type { LayoutElement, LayoutPage, LayoutWarning } from "./types";

export interface PageBuilderOptions {
  width: number;
  height: number;
}

export class PageBuilder {
  private pages: LayoutPage[] = [];

  constructor(private options: PageBuilderOptions) {
    this.ensurePage(0);
  }

  getPages(): LayoutPage[] {
    return this.pages;
  }

  getPage(index: number): LayoutPage {
    return this.ensurePage(index);
  }

  addElement(pageIndex: number, element: LayoutElement): void {
    const page = this.ensurePage(pageIndex);

    page.elements.push({
      ...element,
      pageIndex,
    });
  }

  private ensurePage(index: number): LayoutPage {
    while (this.pages.length <= index) {
      this.pages.push({
        index: this.pages.length,
        width: this.options.width,
        height: this.options.height,
        elements: [],
      });
    }

    return this.pages[index]!;
  }
}
```

---

# 12. Layout 工具函数

## `packages/core/src/layout/utils.ts`

```ts
import type { LayoutRect } from "./types";

export function isRectOverflow(rect: LayoutRect, bounds: LayoutRect): boolean {
  return (
    rect.x < bounds.x ||
    rect.y < bounds.y ||
    rect.x + rect.width > bounds.x + bounds.width ||
    rect.y + rect.height > bounds.y + bounds.height
  );
}

export function getPageIndexByY(y: number, pageHeight: number): number {
  if (y <= 0) return 0;
  return Math.floor(y / pageHeight);
}

export function normalizeYInPage(y: number, pageHeight: number): number {
  const pageIndex = getPageIndexByY(y, pageHeight);
  return y - pageIndex * pageHeight;
}
```

---

# 13. layoutTemplate

总入口。

## `packages/core/src/layout/layoutTemplate.ts`

```ts
import type { PrintTemplate } from "../types/template";
import type { LayoutContext, LayoutDocument, LayoutOptions } from "./types";
import { resolvePaper } from "./paper";
import { createDefaultTextMeasurer } from "./measureText";
import { layoutPanel } from "./layoutPanel";
import { PageBuilder } from "./pageBuilder";

export function layoutTemplate(
  template: PrintTemplate,
  data: unknown = {},
  options: LayoutOptions = {},
): LayoutDocument {
  const unit = options.unit ?? template.paper.unit ?? "mm";
  const dpi = options.dpi ?? 96;

  const paper = resolvePaper(template.paper, unit, dpi);

  const ctx: LayoutContext = {
    template,
    data,
    unit,
    dpi,
    allowOverflow: options.allowOverflow ?? false,
    measureText: options.measureText ?? createDefaultTextMeasurer(),
    warnings: [],
  };

  const pageBuilder = new PageBuilder({
    width: paper.width,
    height: paper.height,
  });

  for (const panel of template.panels) {
    layoutPanel({
      ctx,
      panel,
      pageBuilder,
      pageWidth: paper.width,
      pageHeight: paper.height,
    });
  }

  return {
    unit,
    width: paper.width,
    height: paper.height,
    pages: pageBuilder.getPages(),
    warnings: ctx.warnings,
  };
}
```

---

# 14. layoutPanel

## `packages/core/src/layout/layoutPanel.ts`

```ts
import type { PrintPanel } from "../types/panel";
import type { LayoutContext } from "./types";
import type { PageBuilder } from "./pageBuilder";
import { layoutElement } from "./layoutElement";
import { getPageIndexByY } from "./utils";

export interface LayoutPanelInput {
  ctx: LayoutContext;
  panel: PrintPanel;
  pageBuilder: PageBuilder;
  pageWidth: number;
  pageHeight: number;
}

export function layoutPanel(input: LayoutPanelInput): void {
  const { ctx, panel, pageBuilder, pageHeight } = input;

  for (const [elementIndex, element] of panel.elements.entries()) {
    if (element.hidden) continue;

    const pageIndex = getPageIndexByY(element.y, pageHeight);

    const result = layoutElement({
      ctx,
      panel,
      element,
      pageIndex,
      pageHeight,
      elementPath: `panels.${panel.index}.elements.${elementIndex}`,
    });

    for (const layoutElement of result) {
      pageBuilder.addElement(layoutElement.pageIndex, layoutElement);
    }
  }
}
```

---

# 15. layoutElement 分发器

## `packages/core/src/layout/layoutElement.ts`

```ts
import type { PrintElement } from "../types/element";
import type { PrintPanel } from "../types/panel";
import type { LayoutContext, LayoutElement } from "./types";
import { layoutText } from "./layoutText";
import { layoutImage } from "./layoutImage";
import { layoutLine } from "./layoutLine";
import { layoutRect } from "./layoutRect";
import { layoutTable } from "./layoutTable";
import { warnUnknownElement } from "./warnings";
import { normalizeYInPage } from "./utils";

export interface LayoutElementInput {
  ctx: LayoutContext;
  panel: PrintPanel;
  element: PrintElement;
  pageIndex: number;
  pageHeight: number;
  elementPath: string;
}

export function layoutElement(input: LayoutElementInput): LayoutElement[] {
  const { element, ctx } = input;

  switch (element.type) {
    case "text":
      return [layoutText(input)];

    case "image":
      return [layoutImage(input)];

    case "line":
      return [layoutLine(input)];

    case "rect":
      return [layoutRect(input)];

    case "table":
      return layoutTable(input);

    default:
      warnUnknownElement({
        ctx,
        elementId: element.id,
        path: input.elementPath,
      });

      return [
        {
          id: element.id,
          sourcePanelId: input.panel.id,
          sourceElementId: element.id,
          pageIndex: input.pageIndex,
          type: "unknown",
          x: element.x,
          y: normalizeYInPage(element.y, input.pageHeight),
          width: element.width,
          height: element.height,
          hidden: element.hidden,
          style: element.style,
          raw: element.raw,
        },
      ];
  }
}
```

---

# 16. Text 布局

## `packages/core/src/layout/layoutText.ts`

```ts
import type { TextElement } from "../types/element";
import type { LayoutTextElement } from "./types";
import type { LayoutElementInput } from "./layoutElement";
import { resolveBindingValue } from "./resolveBinding";
import { normalizeYInPage, isRectOverflow } from "./utils";
import { warnElementOverflow } from "./warnings";

export function layoutText(input: LayoutElementInput): LayoutTextElement {
  const { ctx, panel, element, pageIndex, pageHeight, elementPath } = input;
  const textElement = element as TextElement;

  const value = resolveBindingValue(
    textElement.binding,
    ctx.data,
    textElement.options?.content ?? textElement.binding?.title,
  );

  const fontSize = getNumber(textElement.style?.fontSize, 12);
  const lineHeight = getNumber(textElement.style?.lineHeight, fontSize * 1.2);

  const measured = ctx.measureText.measure({
    text: value,
    fontSize,
    fontFamily: textElement.style?.fontFamily,
    fontWeight: textElement.style?.fontWeight,
    lineHeight,
    maxWidth: textElement.width,
    unit: ctx.unit,
  });

  const height = Math.max(textElement.height, measured.height);

  const layout: LayoutTextElement = {
    id: textElement.id,
    sourcePanelId: panel.id,
    sourceElementId: textElement.id,
    pageIndex,
    type: "text",
    x: textElement.x,
    y: normalizeYInPage(textElement.y, pageHeight),
    width: textElement.width,
    height,
    value,
    lines: measured.lines,
    fontSize,
    lineHeight: measured.lineHeight,
    hidden: textElement.hidden,
    style: textElement.style,
    raw: textElement.raw,
  };

  if (
    !ctx.allowOverflow &&
    isRectOverflow(layout, {
      x: 0,
      y: 0,
      width: pageWidth,
      height: pageHeight,
    })
  ) {
    warnElementOverflow({
      ctx,
      elementId: textElement.id,
      path: elementPath,
    });
  }

  return layout;
}

function getNumber(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}
```

---

# 17. Image 布局

## `packages/core/src/layout/layoutImage.ts`

```ts
import type { ImageElement } from "../types/element";
import type { LayoutImageElement } from "./types";
import type { LayoutElementInput } from "./layoutElement";
import { resolveBindingValue } from "./resolveBinding";
import { normalizeYInPage } from "./utils";

export function layoutImage(input: LayoutElementInput): LayoutImageElement {
  const { panel, element, pageIndex, pageHeight, ctx } = input;
  const imageElement = element as ImageElement;

  const srcFromBinding = imageElement.binding?.field
    ? resolveBindingValue(imageElement.binding, ctx.data)
    : undefined;

  return {
    id: imageElement.id,
    sourcePanelId: panel.id,
    sourceElementId: imageElement.id,
    pageIndex,
    type: "image",
    x: imageElement.x,
    y: normalizeYInPage(imageElement.y, pageHeight),
    width: imageElement.width,
    height: imageElement.height,
    src: srcFromBinding || imageElement.options?.src,
    objectFit: imageElement.options?.objectFit ?? "contain",
    hidden: imageElement.hidden,
    style: imageElement.style,
    raw: imageElement.raw,
  };
}
```

---

# 18. Line 布局

## `packages/core/src/layout/layoutLine.ts`

```ts
import type { LineElement } from "../types/element";
import type { LayoutLineElement } from "./types";
import type { LayoutElementInput } from "./layoutElement";
import { normalizeYInPage } from "./utils";

export function layoutLine(input: LayoutElementInput): LayoutLineElement {
  const { panel, element, pageIndex, pageHeight } = input;
  const lineElement = element as LineElement;

  return {
    id: lineElement.id,
    sourcePanelId: panel.id,
    sourceElementId: lineElement.id,
    pageIndex,
    type: "line",
    x: lineElement.x,
    y: normalizeYInPage(lineElement.y, pageHeight),
    width: lineElement.width,
    height: lineElement.height,
    direction:
      lineElement.options?.direction ??
      inferLineDirection(lineElement.width, lineElement.height),
    hidden: lineElement.hidden,
    style: lineElement.style,
    raw: lineElement.raw,
  };
}

function inferLineDirection(
  width: number,
  height: number,
): "horizontal" | "vertical" {
  return height > width ? "vertical" : "horizontal";
}
```

---

# 19. Rect 布局

## `packages/core/src/layout/layoutRect.ts`

```ts
import type { RectElement } from "../types/element";
import type { LayoutRectElement } from "./types";
import type { LayoutElementInput } from "./layoutElement";
import { normalizeYInPage } from "./utils";

export function layoutRect(input: LayoutElementInput): LayoutRectElement {
  const { panel, element, pageIndex, pageHeight } = input;
  const rectElement = element as RectElement;

  return {
    id: rectElement.id,
    sourcePanelId: panel.id,
    sourceElementId: rectElement.id,
    pageIndex,
    type: "rect",
    x: rectElement.x,
    y: normalizeYInPage(rectElement.y, pageHeight),
    width: rectElement.width,
    height: rectElement.height,
    radius: rectElement.options?.radius,
    hidden: rectElement.hidden,
    style: rectElement.style,
    raw: rectElement.raw,
  };
}
```

---

# 20. Table 布局，Phase 3 简化版

Phase 3 的 table 只做基础分页，不处理复杂功能：

```txt
支持：
1. columns
2. rows from dataField / binding.field
3. header
4. fixed row height
5. 简单跨页拆分

不支持：
1. 合并单元格
2. 动态行高
3. 跨页边框修复
4. 表尾汇总
5. 嵌套子表
```

## `packages/core/src/layout/layoutTable.ts`

```ts
import type { TableColumn, TableElement } from "../types/element";
import type {
  LayoutTableCell,
  LayoutTableColumn,
  LayoutTableElement,
  LayoutTableRow,
} from "./types";
import type { LayoutElementInput } from "./layoutElement";
import { getByPath, stringifyValue } from "./resolveBinding";
import { normalizeYInPage, getPageIndexByY } from "./utils";

export function layoutTable(input: LayoutElementInput): LayoutTableElement[] {
  const { ctx, panel, element, pageHeight } = input;
  const tableElement = element as TableElement;

  const columns = normalizeColumns(
    tableElement.options?.columns ?? [],
    tableElement.width,
  );

  const rowsData = resolveTableData(tableElement, ctx.data);

  const headerHeight = getNumber(tableElement.options?.headerHeight, 8);
  const rowHeight = getNumber(tableElement.options?.rowHeight, 8);
  const showHeader = tableElement.options?.showHeader ?? true;

  const startY = tableElement.y;
  const firstPageIndex = getPageIndexByY(startY, pageHeight);

  const result: LayoutTableElement[] = [];

  let currentPageIndex = firstPageIndex;
  let currentY = normalizeYInPage(startY, pageHeight);

  let currentRows: LayoutTableRow[] = [];
  let currentTableY = currentY;

  const availableHeightOnPage = () => {
    return pageHeight - currentY;
  };

  const flush = () => {
    if (currentRows.length === 0) return;

    const tableHeight =
      (showHeader ? headerHeight : 0) +
      currentRows.reduce((sum, row) => sum + row.height, 0);

    result.push({
      id: `${tableElement.id}__page_${currentPageIndex}`,
      sourcePanelId: panel.id,
      sourceElementId: tableElement.id,
      pageIndex: currentPageIndex,
      type: "table",
      x: tableElement.x,
      y: currentTableY,
      width: tableElement.width,
      height: tableHeight,
      columns,
      rows: currentRows,
      headerHeight: showHeader ? headerHeight : 0,
      rowHeight,
      hidden: tableElement.hidden,
      style: tableElement.style,
      raw: tableElement.raw,
    });

    currentRows = [];
  };

  for (let rowIndex = 0; rowIndex < rowsData.length; rowIndex++) {
    const requiredHeight =
      currentRows.length === 0 && showHeader
        ? headerHeight + rowHeight
        : rowHeight;

    if (requiredHeight > availableHeightOnPage()) {
      flush();
      currentPageIndex += 1;
      currentY = 0;
      currentTableY = 0;
    }

    const rowY =
      currentRows.length === 0
        ? currentY + (showHeader ? headerHeight : 0)
        : currentRows[currentRows.length - 1]!.y + rowHeight;

    const row = createLayoutRow({
      rowIndex,
      rowData: rowsData[rowIndex],
      columns,
      rowY,
      rowHeight,
    });

    currentRows.push(row);
  }

  flush();

  if (result.length === 0) {
    result.push({
      id: `${tableElement.id}__page_${firstPageIndex}`,
      sourcePanelId: panel.id,
      sourceElementId: tableElement.id,
      pageIndex: firstPageIndex,
      type: "table",
      x: tableElement.x,
      y: normalizeYInPage(tableElement.y, pageHeight),
      width: tableElement.width,
      height: showHeader ? headerHeight : 0,
      columns,
      rows: [],
      headerHeight: showHeader ? headerHeight : 0,
      rowHeight,
      hidden: tableElement.hidden,
      style: tableElement.style,
      raw: tableElement.raw,
    });
  }

  return result;
}

function normalizeColumns(
  columns: TableColumn[],
  tableWidth: number,
): LayoutTableColumn[] {
  if (!columns.length) return [];

  const explicitWidth = columns.reduce((sum, column) => {
    return sum + (typeof column.width === "number" ? column.width : 0);
  }, 0);

  const missingWidthColumns = columns.filter(
    (column) => typeof column.width !== "number",
  );

  const fallbackWidth =
    missingWidthColumns.length > 0
      ? Math.max(0, tableWidth - explicitWidth) / missingWidthColumns.length
      : 0;

  let x = 0;

  return columns.map((column) => {
    const width =
      typeof column.width === "number" ? column.width : fallbackWidth;

    const result: LayoutTableColumn = {
      id: column.id,
      field: column.field,
      title: column.title,
      x,
      width,
    };

    x += width;

    return result;
  });
}

function resolveTableData(element: TableElement, data: unknown): unknown[] {
  const dataField = element.options?.dataField ?? element.binding?.field;

  if (!dataField) return [];

  const value = getByPath(data, dataField);

  return Array.isArray(value) ? value : [];
}

function createLayoutRow(input: {
  rowIndex: number;
  rowData: unknown;
  columns: LayoutTableColumn[];
  rowY: number;
  rowHeight: number;
}): LayoutTableRow {
  const cells: LayoutTableCell[] = input.columns.map((column) => {
    const value = column.field
      ? stringifyValue(getByPath(input.rowData, column.field))
      : "";

    return {
      columnId: column.id,
      value,
      x: column.x,
      y: input.rowY,
      width: column.width,
      height: input.rowHeight,
    };
  });

  return {
    index: input.rowIndex,
    y: input.rowY,
    height: input.rowHeight,
    cells,
    raw: input.rowData,
  };
}

function getNumber(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}
```

---

# 21. layout 统一出口

## `packages/core/src/layout/index.ts`

```ts
export * from "./types";
export * from "./layoutTemplate";
export * from "./layoutPanel";
export * from "./layoutElement";
export * from "./layoutText";
export * from "./layoutImage";
export * from "./layoutLine";
export * from "./layoutRect";
export * from "./layoutTable";
export * from "./pageBuilder";
export * from "./unit";
export * from "./paper";
export * from "./measureText";
export * from "./resolveBinding";
export * from "./warnings";
export * from "./utils";
```

然后修改：

## `packages/core/src/index.ts`

```ts
export * from "./layout";
```

---

# 22. 测试设计

新增：

```txt
tests/core/layout/
├─ unit.test.ts
├─ resolveBinding.test.ts
├─ layoutText.test.ts
├─ layoutTable.test.ts
├─ layoutTemplate.test.ts
└─ layoutFixtures.test.ts
```

---

## `tests/core/layout/unit.test.ts`

```ts
import { describe, expect, it } from "vitest";
import { mmToPx, pxToMm } from "../../../packages/core/src";

describe("unit conversion", () => {
  it("should convert mm to px", () => {
    expect(Number(mmToPx(25.4, 96).toFixed(2))).toBe(96);
  });

  it("should convert px to mm", () => {
    expect(Number(pxToMm(96, 96).toFixed(2))).toBe(25.4);
  });
});
```

---

## `tests/core/layout/resolveBinding.test.ts`

```ts
import { describe, expect, it } from "vitest";
import { getByPath, resolveBindingValue } from "../../../packages/core/src";

describe("resolveBinding", () => {
  const data = {
    order: {
      no: "NO-001",
      customer: {
        name: "张三",
      },
    },
  };

  it("should get value by path", () => {
    expect(getByPath(data, "order.no")).toBe("NO-001");
    expect(getByPath(data, "order.customer.name")).toBe("张三");
  });

  it("should resolve binding value", () => {
    expect(
      resolveBindingValue(
        {
          field: "order.no",
        },
        data,
      ),
    ).toBe("NO-001");
  });
});
```

---

## `tests/core/layout/layoutText.test.ts`

```ts
import { describe, expect, it } from "vitest";
import {
  createEmptyTemplate,
  layoutTemplate,
} from "../../../packages/core/src";

describe("layout text", () => {
  it("should layout text element with binding data", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "el_order_no",
      type: "text",
      x: 20,
      y: 30,
      width: 80,
      height: 10,
      binding: {
        field: "orderNo",
      },
      style: {
        fontSize: 12,
      },
    });

    const layout = layoutTemplate(template, {
      orderNo: "NO-001",
    });

    expect(layout.pages).toHaveLength(1);

    const element = layout.pages[0]!.elements[0];

    expect(element?.type).toBe("text");
    expect((element as any).value).toBe("NO-001");
    expect(element?.x).toBe(20);
    expect(element?.y).toBe(30);
  });
});
```

---

## `tests/core/layout/layoutTable.test.ts`

```ts
import { describe, expect, it } from "vitest";
import {
  createEmptyTemplate,
  layoutTemplate,
} from "../../../packages/core/src";

describe("layout table", () => {
  it("should layout table rows", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "table_1",
      type: "table",
      x: 10,
      y: 20,
      width: 100,
      height: 30,
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
        {
          name: "香蕉",
          price: 20,
        },
      ],
    });

    const table = layout.pages[0]!.elements[0] as any;

    expect(table.type).toBe("table");
    expect(table.rows).toHaveLength(2);
    expect(table.rows[0].cells[0].value).toBe("苹果");
    expect(table.rows[0].cells[1].value).toBe("10");
  });
});
```

---

## `tests/core/layout/layoutTemplate.test.ts`

```ts
import { describe, expect, it } from "vitest";
import {
  createEmptyTemplate,
  layoutTemplate,
} from "../../../packages/core/src";

describe("layoutTemplate", () => {
  it("should create layout document", () => {
    const template = createEmptyTemplate();

    const layout = layoutTemplate(template, {});

    expect(layout.unit).toBe("mm");
    expect(layout.width).toBe(210);
    expect(layout.height).toBe(297);
    expect(layout.pages.length).toBeGreaterThan(0);
  });

  it("should create next page if element y exceeds page height", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "el_page_2",
      type: "text",
      x: 10,
      y: 310,
      width: 50,
      height: 10,
      options: {
        content: "page 2",
      },
    });

    const layout = layoutTemplate(template, {});

    expect(layout.pages.length).toBeGreaterThanOrEqual(2);
    expect(layout.pages[1]!.elements[0]?.id).toBe("el_page_2");
    expect(layout.pages[1]!.elements[0]?.y).toBe(13);
  });
});
```

---

# 23. Layout fixture snapshot 测试

## `tests/core/layout/layoutFixtures.test.ts`

```ts
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { fromLegacyTemplate, layoutTemplate } from "../../../packages/core/src";

const fixturesRoot = path.resolve(process.cwd(), "fixtures");

describe("layout fixtures", () => {
  const templatesDir = path.join(fixturesRoot, "templates");
  const dataDir = path.join(fixturesRoot, "data");

  const templateFiles = fs
    .readdirSync(templatesDir)
    .filter((file) => file.endsWith(".json"));

  for (const file of templateFiles) {
    it(`should layout fixture ${file}`, () => {
      const templatePath = path.join(templatesDir, file);
      const dataPath = path.join(
        dataDir,
        file.replace(/\.json$/, ".data.json"),
      );

      const legacyTemplate = JSON.parse(fs.readFileSync(templatePath, "utf8"));
      const data = fs.existsSync(dataPath)
        ? JSON.parse(fs.readFileSync(dataPath, "utf8"))
        : {};

      const coreTemplate = fromLegacyTemplate(legacyTemplate);
      const layout = layoutTemplate(coreTemplate, data);

      expect(layout).toMatchSnapshot();
    });
  }
});
```

第一次跑会生成 snapshot：

```bash
pnpm vitest run tests/core/layout/layoutFixtures.test.ts -u
```

---

# 24. package scripts

根 `package.json` 增加：

```json
{
  "scripts": {
    "test:layout": "vitest run tests/core/layout",
    "check:layout": "pnpm --filter @hiprint-re/core typecheck && pnpm test:layout"
  }
}
```

---

# 25. docs/phase-3.md

````md
# Phase 3 - Core Layout Engine

## Goal

Convert core template schema and data into a framework-agnostic layout result.

## Input

- PrintTemplate
- data
- LayoutOptions

## Output

- LayoutDocument
- LayoutPage[]
- LayoutElement[]
- LayoutWarning[]

## Non-goals

- No DOM rendering
- No React/Vue
- No designer
- No browser print
- No PDF
- No precise font measurement
- No advanced table pagination

## Flow

```txt
PrintTemplate + data
  ↓
layoutTemplate
  ↓
layoutPanel
  ↓
layoutElement
  ↓
layoutText / layoutImage / layoutTable / ...
  ↓
LayoutDocument
```
````

## Rules

`@hiprint-re/core` layout must not depend on:

- window
- document
- HTMLElement
- jQuery
- React
- Vue

````

---

# 26. docs/layout.md

```md
# Layout Engine

## LayoutDocument

```ts
interface LayoutDocument {
  unit: "mm" | "px"
  width: number
  height: number
  pages: LayoutPage[]
  warnings: LayoutWarning[]
}
````

## LayoutPage

```ts
interface LayoutPage {
  index: number;
  width: number;
  height: number;
  elements: LayoutElement[];
}
```

## LayoutElement

Every layout element contains:

```ts
interface LayoutElementBase {
  id: string;
  type: PrintElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  pageIndex: number;
}
```

## Text layout

Text is measured using `TextMeasurer`.

By default, core uses an approximate text measurer.

DOM renderer may provide a more accurate measurer later.

## Table layout

Phase 3 table layout supports:

- columns
- rows
- header height
- fixed row height
- simple page splitting

Advanced features are deferred.

````

---

# 27. Phase 3 验收标准

Phase 3 完成后，必须满足：

```txt
1. @hiprint-re/core 导出 layoutTemplate
2. layoutTemplate 不依赖 DOM
3. text/image/line/rect/table 都能生成 LayoutElement
4. 支持 basic data binding
5. 支持元素 y 超过页面高度时进入下一页
6. table 支持基础 rows 布局
7. table 支持简单分页
8. 支持 warnings
9. fixtures 能生成 layout snapshot
10. pnpm check:layout 通过
11. docs/phase-3.md 完成
12. docs/layout.md 完成
````

---

# 28. 推荐 PR 拆分

## PR 1：Layout 基础类型与单位

```txt
feat(core): add layout document types and unit conversion
```

包含：

```txt
layout/types.ts
layout/unit.ts
layout/paper.ts
layout/warnings.ts
```

---

## PR 2：基础元素 layout

```txt
feat(core): add basic element layout
```

包含：

```txt
layoutTemplate
layoutPanel
layoutElement
layoutText
layoutImage
layoutLine
layoutRect
```

---

## PR 3：Table layout 初版

```txt
feat(core): add basic table layout
```

包含：

```txt
layoutTable
table rows
columns
simple page split
```

---

## PR 4：Layout 测试与文档

```txt
test(core): add layout snapshot tests
docs(core): document layout engine
```

包含：

```txt
tests/core/layout
docs/phase-3.md
docs/layout.md
```

---

# 29. Phase 3 最小 TODO

```txt
[ ] 新增 packages/core/src/layout/types.ts
[ ] 新增 unit conversion
[ ] 新增 paper resolver
[ ] 新增 data binding resolver
[ ] 新增 default text measurer
[ ] 新增 PageBuilder
[ ] 实现 layoutTemplate
[ ] 实现 layoutPanel
[ ] 实现 layoutElement
[ ] 实现 layoutText
[ ] 实现 layoutImage
[ ] 实现 layoutLine
[ ] 实现 layoutRect
[ ] 实现 layoutTable 简化版
[ ] 增加 layout unit tests
[ ] 增加 text layout tests
[ ] 增加 table layout tests
[ ] 增加 fixture snapshot tests
[ ] 增加 docs/layout.md
[ ] 增加 docs/phase-3.md
```

---

# 30. 最终判断

Phase 3 的本质是：

```txt
建立“模板数据 → 页面布局”的核心能力
```

它是后面所有东西的基础：

```txt
Phase 4 DOM renderer 消费 LayoutDocument
Phase 5 React/Vue preview 消费 LayoutDocument
Phase 6 designer state 修改 PrintTemplate
Phase 7 React/Vue designer 重新 layout
```

这一阶段做完后，你的项目就不再只是“schema 转换器”，而是开始具备真正打印引擎的核心能力。

最重要的边界还是一句话：

```txt
core 负责算布局
dom 负责画出来
designer 负责改模板
react/vue 负责绑定生命周期和 UI
```

Phase 3 只做第一件事。
