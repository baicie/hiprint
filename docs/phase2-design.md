下面给你一版 **Phase 2：抽离 `@hiprint-re/core` 的 schema / model / legacy adapter** 的详细设计与代码草案。

Phase 2 的定位是：

```txt
Phase 0：legacy 能跑
Phase 1：legacy 可审计
Phase 2：抽出框架无关 core 数据结构
```

这一阶段 **不做 layout、render、designer、React/Vue**。
核心目标是先把模板数据结构从 legacy 黑盒里抽出来。

---

# 1. Phase 2 总目标

Phase 2 要完成这几件事：

```txt
1. 新增 packages/core
2. 定义 framework-agnostic 的 PrintTemplate schema
3. 定义 Element / Panel / Paper / Style / DataBinding 类型
4. 实现 template normalize
5. 实现 template validate
6. 实现 core schema migration
7. 实现 legacy template -> core template
8. 实现 core template -> legacy template
9. fixtures 增加转换测试
10. docs 增加 schema 文档
```

最终你应该能做到：

```ts
import {
  fromLegacyTemplate,
  toLegacyTemplate,
  validateTemplate,
  normalizeTemplate,
} from "@hiprint-re/core";

const coreTemplate = fromLegacyTemplate(legacyTemplate);

const normalized = normalizeTemplate(coreTemplate);

const result = validateTemplate(normalized);

const legacyAgain = toLegacyTemplate(normalized);
```

---

# 2. Phase 2 不做什么

这一阶段不要扩太大。

```txt
不做 DOM renderer
不做 browser print
不做 layout engine
不做 table 分页
不做 React/Vue
不做 designer 拖拽
不做 undo/redo
不做插件市场
不重写 legacy bundle
```

Phase 2 的核心只有一个：**让模板数据脱离 legacy。**

---

# 3. 推荐目录结构

```txt
packages/
├─ core/
│  ├─ package.json
│  ├─ tsconfig.json
│  └─ src/
│     ├─ index.ts
│     ├─ version.ts
│     │
│     ├─ types/
│     │  ├─ common.ts
│     │  ├─ paper.ts
│     │  ├─ style.ts
│     │  ├─ element.ts
│     │  ├─ panel.ts
│     │  ├─ template.ts
│     │  ├─ validate.ts
│     │  └─ legacy.ts
│     │
│     ├─ schema/
│     │  ├─ createEmptyTemplate.ts
│     │  ├─ normalizeTemplate.ts
│     │  ├─ validateTemplate.ts
│     │  ├─ migrateTemplate.ts
│     │  └─ elementTypeGuards.ts
│     │
│     ├─ model/
│     │  ├─ TemplateModel.ts
│     │  ├─ createTemplateModel.ts
│     │  └─ elementUtils.ts
│     │
│     ├─ registry/
│     │  ├─ elementRegistry.ts
│     │  ├─ builtinElements.ts
│     │  └─ globalRegistry.ts
│     │
│     └─ adapters/
│        └─ legacy/
│           ├─ fromLegacyTemplate.ts
│           ├─ toLegacyTemplate.ts
│           ├─ mapLegacyElementType.ts
│           └─ index.ts
```

Phase 2 先把 legacy adapter 放在 `core/adapters/legacy` 里。
后面如果 legacy 兼容逻辑膨胀，再独立成：

```txt
packages/legacy-adapter
```

但现在没必要拆太细。

---

# 4. packages/core/package.json

```json
{
  "name": "@hiprint-re/core",
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
    "@hiprint-re/shared": "workspace:*"
  }
}
```

---

# 5. packages/core/tsconfig.json

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

# 6. Core 版本定义

## packages/core/src/version.ts

```ts
export const CORE_SCHEMA_VERSION = "0.1.0" as const;

export type CoreSchemaVersion = typeof CORE_SCHEMA_VERSION;
```

---

# 7. 基础类型设计

## packages/core/src/types/common.ts

```ts
export type ID = string;

export type Unit = "mm" | "px";

export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Rect extends Point, Size {}

export interface UnknownRecord {
  [key: string]: unknown;
}
```

---

## packages/core/src/types/paper.ts

```ts
import type { Unit } from "./common";

export type PaperPreset = "A3" | "A4" | "A5" | "B5" | "custom";

export type PaperOrientation = "portrait" | "landscape";

export interface PaperConfig {
  preset: PaperPreset;
  width: number;
  height: number;
  unit: Unit;
  orientation: PaperOrientation;
  margin?: PaperMargin;
}

export interface PaperMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
```

---

## packages/core/src/types/style.ts

```ts
export interface PrintStyle {
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string | number;
  color?: string;
  backgroundColor?: string;

  textAlign?: "left" | "center" | "right";
  verticalAlign?: "top" | "middle" | "bottom";

  borderColor?: string;
  borderWidth?: number;
  borderStyle?: "solid" | "dashed" | "dotted" | "none";

  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;

  lineHeight?: number;
}
```

---

# 8. Element 类型设计

## packages/core/src/types/element.ts

```ts
import type { ID, UnknownRecord } from "./common";
import type { PrintStyle } from "./style";

export type PrintElementType =
  | "text"
  | "image"
  | "table"
  | "line"
  | "rect"
  | "barcode"
  | "qrcode"
  | "html"
  | "unknown";

export interface DataBinding {
  field?: string;
  title?: string;
  formatter?: string;
  expression?: string;
}

export interface PrintElementBase<
  TOptions extends UnknownRecord = UnknownRecord,
> {
  id: ID;
  type: PrintElementType;

  x: number;
  y: number;
  width: number;
  height: number;

  rotate?: number;
  hidden?: boolean;
  locked?: boolean;

  binding?: DataBinding;
  style?: PrintStyle;
  options?: TOptions;

  /**
   * 用于保留 legacy 中暂时无法识别的信息。
   * Phase 2 不要丢信息。
   */
  raw?: UnknownRecord;
}

export interface TextElementOptions extends UnknownRecord {
  content?: string;
  placeholder?: string;
}

export interface ImageElementOptions extends UnknownRecord {
  src?: string;
  objectFit?: "contain" | "cover" | "fill";
}

export interface LineElementOptions extends UnknownRecord {
  direction?: "horizontal" | "vertical";
}

export interface RectElementOptions extends UnknownRecord {
  radius?: number;
}

export interface TableColumn {
  id: ID;
  field?: string;
  title?: string;
  width?: number;
  align?: "left" | "center" | "right";
  children?: TableColumn[];
  raw?: UnknownRecord;
}

export interface TableElementOptions extends UnknownRecord {
  columns: TableColumn[];
  dataField?: string;
  showHeader?: boolean;
}

export type TextElement = PrintElementBase<TextElementOptions> & {
  type: "text";
};

export type ImageElement = PrintElementBase<ImageElementOptions> & {
  type: "image";
};

export type LineElement = PrintElementBase<LineElementOptions> & {
  type: "line";
};

export type RectElement = PrintElementBase<RectElementOptions> & {
  type: "rect";
};

export type TableElement = PrintElementBase<TableElementOptions> & {
  type: "table";
};

export type UnknownElement = PrintElementBase & {
  type: "unknown";
};

export type PrintElement =
  | TextElement
  | ImageElement
  | LineElement
  | RectElement
  | TableElement
  | UnknownElement
  | PrintElementBase;
```

设计重点：

```txt
1. 坐标统一成 x/y/width/height
2. field/title 进入 binding
3. style 单独放 style
4. legacy 无法识别的东西放 raw
5. table 先只保留 columns，不处理分页
```

---

# 9. Panel / Template 类型

## packages/core/src/types/panel.ts

```ts
import type { ID } from "./common";
import type { PaperConfig } from "./paper";
import type { PrintElement } from "./element";

export interface PrintPanel {
  id: ID;
  name?: string;
  index: number;
  paper?: Partial<PaperConfig>;
  elements: PrintElement[];
  raw?: Record<string, unknown>;
}
```

---

## packages/core/src/types/template.ts

```ts
import type { CoreSchemaVersion } from "../version";
import type { PaperConfig } from "./paper";
import type { PrintPanel } from "./panel";

export interface PrintTemplateMeta {
  name?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  source?: "core" | "legacy" | "unknown";
}

export interface PrintTemplate {
  schemaVersion: CoreSchemaVersion;
  id: string;
  meta?: PrintTemplateMeta;
  paper: PaperConfig;
  panels: PrintPanel[];
  raw?: Record<string, unknown>;
}
```

---

# 10. Validate 类型

## packages/core/src/types/validate.ts

```ts
export type ValidateIssueLevel = "error" | "warning";

export interface ValidateIssue {
  level: ValidateIssueLevel;
  code: string;
  path: string;
  message: string;
}

export interface ValidateResult {
  valid: boolean;
  issues: ValidateIssue[];
}

export function createValidateResult(issues: ValidateIssue[]): ValidateResult {
  return {
    valid: !issues.some((issue) => issue.level === "error"),
    issues,
  };
}
```

---

# 11. Legacy 类型

## packages/core/src/types/legacy.ts

```ts
export interface LegacyTemplate {
  panels?: LegacyPanel[];
  [key: string]: unknown;
}

export interface LegacyPanel {
  index?: number;
  name?: string;
  width?: number;
  height?: number;
  paperType?: string;
  printElements?: LegacyPrintElement[];
  [key: string]: unknown;
}

export interface LegacyPrintElement {
  options?: LegacyPrintElementOptions;
  printElementType?: LegacyPrintElementType;
  [key: string]: unknown;
}

export interface LegacyPrintElementOptions {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  title?: string;
  field?: string;
  text?: string;
  src?: string;
  columns?: unknown[];
  [key: string]: unknown;
}

export interface LegacyPrintElementType {
  type?: string;
  title?: string;
  [key: string]: unknown;
}
```

---

# 12. 创建空模板

## packages/core/src/schema/createEmptyTemplate.ts

```ts
import { CORE_SCHEMA_VERSION } from "../version";
import type { PrintTemplate } from "../types/template";

export function createEmptyTemplate(): PrintTemplate {
  return {
    schemaVersion: CORE_SCHEMA_VERSION,
    id: createId("template"),
    meta: {
      source: "core",
      createdAt: new Date().toISOString(),
    },
    paper: {
      preset: "A4",
      width: 210,
      height: 297,
      unit: "mm",
      orientation: "portrait",
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    panels: [
      {
        id: createId("panel"),
        index: 0,
        name: "default",
        elements: [],
      },
    ],
  };
}

export function createId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}
```

后续可以换成稳定 ID 生成器。Phase 2 先够用。

---

# 13. normalizeTemplate

normalize 的作用是：

```txt
1. 补齐 id
2. 补齐 schemaVersion
3. 补齐 paper
4. 补齐 panel
5. 补齐 element 基础字段
6. 保证 elements 是数组
```

## packages/core/src/schema/normalizeTemplate.ts

```ts
import { CORE_SCHEMA_VERSION } from "../version";
import type { PrintTemplate } from "../types/template";
import type { PrintPanel } from "../types/panel";
import type { PrintElement } from "../types/element";
import { createId } from "./createEmptyTemplate";

export function normalizeTemplate(
  input: Partial<PrintTemplate>,
): PrintTemplate {
  const panels = Array.isArray(input.panels) ? input.panels : [];

  return {
    schemaVersion: CORE_SCHEMA_VERSION,
    id: input.id || createId("template"),
    meta: {
      source: input.meta?.source ?? "core",
      ...input.meta,
    },
    paper: {
      preset: input.paper?.preset ?? "A4",
      width: input.paper?.width ?? 210,
      height: input.paper?.height ?? 297,
      unit: input.paper?.unit ?? "mm",
      orientation: input.paper?.orientation ?? "portrait",
      margin: {
        top: input.paper?.margin?.top ?? 0,
        right: input.paper?.margin?.right ?? 0,
        bottom: input.paper?.margin?.bottom ?? 0,
        left: input.paper?.margin?.left ?? 0,
      },
    },
    panels: panels.map(normalizePanel),
    raw: input.raw,
  };
}

function normalizePanel(panel: Partial<PrintPanel>, index: number): PrintPanel {
  return {
    id: panel.id || createId(`panel_${index}`),
    index: panel.index ?? index,
    name: panel.name ?? `panel-${index}`,
    paper: panel.paper,
    elements: Array.isArray(panel.elements)
      ? panel.elements.map((element, elementIndex) =>
          normalizeElement(element, index, elementIndex),
        )
      : [],
    raw: panel.raw,
  };
}

function normalizeElement(
  element: Partial<PrintElement>,
  panelIndex: number,
  elementIndex: number,
): PrintElement {
  return {
    id: element.id || createId(`p${panelIndex}_el${elementIndex}`),
    type: element.type ?? "unknown",

    x: toNumber(element.x, 0),
    y: toNumber(element.y, 0),
    width: toNumber(element.width, 0),
    height: toNumber(element.height, 0),

    rotate: element.rotate,
    hidden: element.hidden,
    locked: element.locked,

    binding: element.binding,
    style: element.style,
    options: element.options,
    raw: element.raw,
  } as PrintElement;
}

function toNumber(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}
```

---

# 14. validateTemplate

## packages/core/src/schema/validateTemplate.ts

```ts
import type { PrintTemplate } from "../types/template";
import type { ValidateIssue } from "../types/validate";
import { createValidateResult } from "../types/validate";

export function validateTemplate(template: PrintTemplate) {
  const issues: ValidateIssue[] = [];

  if (!template.id) {
    issues.push({
      level: "error",
      code: "template.id.missing",
      path: "id",
      message: "Template id is required.",
    });
  }

  if (!template.schemaVersion) {
    issues.push({
      level: "error",
      code: "template.schemaVersion.missing",
      path: "schemaVersion",
      message: "Template schemaVersion is required.",
    });
  }

  validatePaper(template, issues);
  validatePanels(template, issues);

  return createValidateResult(issues);
}

function validatePaper(template: PrintTemplate, issues: ValidateIssue[]): void {
  const paper = template.paper;

  if (!paper) {
    issues.push({
      level: "error",
      code: "template.paper.missing",
      path: "paper",
      message: "Template paper is required.",
    });
    return;
  }

  if (paper.width <= 0) {
    issues.push({
      level: "error",
      code: "paper.width.invalid",
      path: "paper.width",
      message: "Paper width must be greater than 0.",
    });
  }

  if (paper.height <= 0) {
    issues.push({
      level: "error",
      code: "paper.height.invalid",
      path: "paper.height",
      message: "Paper height must be greater than 0.",
    });
  }
}

function validatePanels(
  template: PrintTemplate,
  issues: ValidateIssue[],
): void {
  if (!Array.isArray(template.panels) || template.panels.length === 0) {
    issues.push({
      level: "error",
      code: "template.panels.empty",
      path: "panels",
      message: "Template must contain at least one panel.",
    });
    return;
  }

  const elementIds = new Set<string>();

  template.panels.forEach((panel, panelIndex) => {
    if (!panel.id) {
      issues.push({
        level: "error",
        code: "panel.id.missing",
        path: `panels.${panelIndex}.id`,
        message: "Panel id is required.",
      });
    }

    panel.elements.forEach((element, elementIndex) => {
      const path = `panels.${panelIndex}.elements.${elementIndex}`;

      if (!element.id) {
        issues.push({
          level: "error",
          code: "element.id.missing",
          path: `${path}.id`,
          message: "Element id is required.",
        });
      }

      if (elementIds.has(element.id)) {
        issues.push({
          level: "error",
          code: "element.id.duplicated",
          path: `${path}.id`,
          message: `Duplicated element id: ${element.id}.`,
        });
      }

      elementIds.add(element.id);

      if (element.width < 0 || element.height < 0) {
        issues.push({
          level: "error",
          code: "element.size.invalid",
          path,
          message: "Element width and height must be non-negative.",
        });
      }

      if (element.type === "unknown") {
        issues.push({
          level: "warning",
          code: "element.type.unknown",
          path: `${path}.type`,
          message: "Unknown element type. It will be preserved with raw data.",
        });
      }
    });
  });
}
```

---

# 15. migrateTemplate

Phase 2 先做简单版本，给后续留扩展点。

## packages/core/src/schema/migrateTemplate.ts

```ts
import { CORE_SCHEMA_VERSION } from "../version";
import type { PrintTemplate } from "../types/template";
import { normalizeTemplate } from "./normalizeTemplate";

export function migrateTemplate(input: unknown): PrintTemplate {
  if (!isObject(input)) {
    return normalizeTemplate({});
  }

  const schemaVersion = input.schemaVersion;

  if (schemaVersion === CORE_SCHEMA_VERSION) {
    return normalizeTemplate(input as Partial<PrintTemplate>);
  }

  /**
   * Phase 2 目前只有 0.1.0。
   * 后续版本迁移在这里增加。
   */
  return normalizeTemplate({
    ...(input as Partial<PrintTemplate>),
    schemaVersion: CORE_SCHEMA_VERSION,
  });
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
```

---

# 16. Element Registry

Phase 2 先建立注册表，不做插件系统完整实现。

## packages/core/src/registry/elementRegistry.ts

```ts
import type { PrintElementType } from "../types/element";

export interface ElementDefinition {
  type: PrintElementType;
  name: string;
  defaultWidth: number;
  defaultHeight: number;
}

export class ElementRegistry {
  private definitions = new Map<PrintElementType, ElementDefinition>();

  register(definition: ElementDefinition): void {
    this.definitions.set(definition.type, definition);
  }

  get(type: PrintElementType): ElementDefinition | undefined {
    return this.definitions.get(type);
  }

  has(type: PrintElementType): boolean {
    return this.definitions.has(type);
  }

  list(): ElementDefinition[] {
    return [...this.definitions.values()];
  }
}

export function createElementRegistry(): ElementRegistry {
  return new ElementRegistry();
}
```

---

## packages/core/src/registry/builtinElements.ts

```ts
import type { ElementDefinition } from "./elementRegistry";

export const builtinElementDefinitions: ElementDefinition[] = [
  {
    type: "text",
    name: "Text",
    defaultWidth: 40,
    defaultHeight: 10,
  },
  {
    type: "image",
    name: "Image",
    defaultWidth: 40,
    defaultHeight: 40,
  },
  {
    type: "table",
    name: "Table",
    defaultWidth: 180,
    defaultHeight: 60,
  },
  {
    type: "line",
    name: "Line",
    defaultWidth: 40,
    defaultHeight: 1,
  },
  {
    type: "rect",
    name: "Rectangle",
    defaultWidth: 40,
    defaultHeight: 20,
  },
  {
    type: "barcode",
    name: "Barcode",
    defaultWidth: 60,
    defaultHeight: 20,
  },
  {
    type: "qrcode",
    name: "QRCode",
    defaultWidth: 30,
    defaultHeight: 30,
  },
];
```

---

# 17. TemplateModel

Phase 2 做最小 model，方便后续 designer 使用。

## packages/core/src/model/elementUtils.ts

```ts
import type { PrintElement } from "../types/element";

export function findElementById(
  elements: PrintElement[],
  id: string,
): PrintElement | undefined {
  return elements.find((element) => element.id === id);
}

export function updateElementById(
  elements: PrintElement[],
  id: string,
  updater: (element: PrintElement) => PrintElement,
): PrintElement[] {
  return elements.map((element) => {
    if (element.id !== id) return element;
    return updater(element);
  });
}

export function removeElementById(
  elements: PrintElement[],
  id: string,
): PrintElement[] {
  return elements.filter((element) => element.id !== id);
}
```

---

## packages/core/src/model/TemplateModel.ts

```ts
import type { PrintTemplate } from "../types/template";
import type { PrintElement } from "../types/element";
import { normalizeTemplate } from "../schema/normalizeTemplate";
import { validateTemplate } from "../schema/validateTemplate";
import {
  findElementById,
  removeElementById,
  updateElementById,
} from "./elementUtils";

export class TemplateModel {
  private template: PrintTemplate;

  constructor(template: PrintTemplate) {
    this.template = normalizeTemplate(template);
  }

  getSnapshot(): PrintTemplate {
    return structuredCloneSafe(this.template);
  }

  validate() {
    return validateTemplate(this.template);
  }

  getElement(id: string): PrintElement | undefined {
    for (const panel of this.template.panels) {
      const element = findElementById(panel.elements, id);
      if (element) return element;
    }

    return undefined;
  }

  addElement(panelId: string, element: PrintElement): void {
    this.template = {
      ...this.template,
      panels: this.template.panels.map((panel) => {
        if (panel.id !== panelId) return panel;

        return {
          ...panel,
          elements: [...panel.elements, element],
        };
      }),
    };
  }

  updateElement(
    id: string,
    updater: (element: PrintElement) => PrintElement,
  ): void {
    this.template = {
      ...this.template,
      panels: this.template.panels.map((panel) => ({
        ...panel,
        elements: updateElementById(panel.elements, id, updater),
      })),
    };
  }

  removeElement(id: string): void {
    this.template = {
      ...this.template,
      panels: this.template.panels.map((panel) => ({
        ...panel,
        elements: removeElementById(panel.elements, id),
      })),
    };
  }
}

function structuredCloneSafe<T>(value: T): T {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }

  return JSON.parse(JSON.stringify(value)) as T;
}
```

---

## packages/core/src/model/createTemplateModel.ts

```ts
import type { PrintTemplate } from "../types/template";
import { normalizeTemplate } from "../schema/normalizeTemplate";
import { TemplateModel } from "./TemplateModel";

export function createTemplateModel(
  template: Partial<PrintTemplate>,
): TemplateModel {
  return new TemplateModel(normalizeTemplate(template));
}
```

---

# 18. Legacy type mapping

## packages/core/src/adapters/legacy/mapLegacyElementType.ts

```ts
import type { PrintElementType } from "../../types/element";

const legacyTypeMap: Record<string, PrintElementType> = {
  text: "text",
  image: "image",
  table: "table",
  line: "line",
  hline: "line",
  vline: "line",
  rect: "rect",
  rectangle: "rect",
  barcode: "barcode",
  qrcode: "qrcode",
  html: "html",
};

export function mapLegacyElementType(type: unknown): PrintElementType {
  if (typeof type !== "string") return "unknown";

  const normalized = type.toLowerCase().trim();

  return legacyTypeMap[normalized] ?? "unknown";
}

export function toLegacyElementType(type: PrintElementType): string {
  if (type === "unknown") return "unknown";
  return type;
}
```

---

# 19. fromLegacyTemplate

这是 Phase 2 的核心。

## packages/core/src/adapters/legacy/fromLegacyTemplate.ts

```ts
import { CORE_SCHEMA_VERSION } from "../../version";
import type {
  LegacyPanel,
  LegacyPrintElement,
  LegacyTemplate,
} from "../../types/legacy";
import type { PrintTemplate } from "../../types/template";
import type { PrintPanel } from "../../types/panel";
import type { PrintElement, TableColumn } from "../../types/element";
import { normalizeTemplate } from "../../schema/normalizeTemplate";
import { mapLegacyElementType } from "./mapLegacyElementType";

export interface FromLegacyTemplateOptions {
  id?: string;
  name?: string;
}

export function fromLegacyTemplate(
  legacy: LegacyTemplate,
  options: FromLegacyTemplateOptions = {},
): PrintTemplate {
  const panels = Array.isArray(legacy.panels) ? legacy.panels : [];

  const firstPanel = panels[0];

  const template: PrintTemplate = {
    schemaVersion: CORE_SCHEMA_VERSION,
    id: options.id ?? "template_legacy",
    meta: {
      name: options.name,
      source: "legacy",
    },
    paper: {
      preset: inferPaperPreset(firstPanel?.paperType),
      width: toNumber(firstPanel?.width, 210),
      height: toNumber(firstPanel?.height, 297),
      unit: "mm",
      orientation: inferOrientation(
        toNumber(firstPanel?.width, 210),
        toNumber(firstPanel?.height, 297),
      ),
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    panels: panels.map(mapLegacyPanel),
    raw: {
      legacy,
    },
  };

  return normalizeTemplate(template);
}

function mapLegacyPanel(panel: LegacyPanel, panelIndex: number): PrintPanel {
  const printElements = Array.isArray(panel.printElements)
    ? panel.printElements
    : [];

  return {
    id: `legacy_panel_${panel.index ?? panelIndex}`,
    index: panel.index ?? panelIndex,
    name: panel.name ?? `panel-${panelIndex}`,
    paper: {
      width: toNumber(panel.width, 210),
      height: toNumber(panel.height, 297),
      preset: inferPaperPreset(panel.paperType),
      orientation: inferOrientation(
        toNumber(panel.width, 210),
        toNumber(panel.height, 297),
      ),
      unit: "mm",
    },
    elements: printElements.map((element, elementIndex) =>
      mapLegacyElement(element, panelIndex, elementIndex),
    ),
    raw: {
      legacyPanel: panel,
    },
  };
}

function mapLegacyElement(
  element: LegacyPrintElement,
  panelIndex: number,
  elementIndex: number,
): PrintElement {
  const options = element.options ?? {};
  const legacyType = element.printElementType?.type;
  const type = mapLegacyElementType(legacyType);

  const coreElement: PrintElement = {
    id: createLegacyElementId(panelIndex, elementIndex, options),
    type,

    x: toNumber(options.left, 0),
    y: toNumber(options.top, 0),
    width: toNumber(options.width, 0),
    height: toNumber(options.height, 0),

    binding: {
      field: typeof options.field === "string" ? options.field : undefined,
      title: typeof options.title === "string" ? options.title : undefined,
    },

    style: extractStyle(options),

    options: mapLegacyOptionsByType(type, options),

    raw: {
      legacyElement: element,
      legacyType,
    },
  };

  return coreElement;
}

function mapLegacyOptionsByType(
  type: string,
  options: Record<string, unknown>,
): Record<string, unknown> {
  if (type === "text") {
    return {
      content: options.text ?? options.title,
    };
  }

  if (type === "image") {
    return {
      src: options.src,
      objectFit: options.objectFit,
    };
  }

  if (type === "table") {
    return {
      columns: mapLegacyColumns(options.columns),
      dataField: options.field,
      showHeader: options.showHeader ?? true,
    };
  }

  return {
    ...options,
  };
}

function mapLegacyColumns(input: unknown): TableColumn[] {
  if (!Array.isArray(input)) return [];

  return input.map((column, index) => {
    const record = isRecord(column) ? column : {};

    return {
      id: String(record.id ?? record.field ?? `column_${index}`),
      field: typeof record.field === "string" ? record.field : undefined,
      title: typeof record.title === "string" ? record.title : undefined,
      width: toNumber(record.width, undefined),
      align: normalizeAlign(record.align),
      raw: {
        legacyColumn: record,
      },
    };
  });
}

function extractStyle(options: Record<string, unknown>) {
  return {
    fontSize: toNumber(options.fontSize, undefined),
    fontFamily:
      typeof options.fontFamily === "string" ? options.fontFamily : undefined,
    fontWeight: normalizeFontWeight(options.fontWeight),
    color: typeof options.color === "string" ? options.color : undefined,
    backgroundColor:
      typeof options.backgroundColor === "string"
        ? options.backgroundColor
        : undefined,
    textAlign: normalizeTextAlign(options.textAlign),
    lineHeight: toNumber(options.lineHeight, undefined),
  };
}

function createLegacyElementId(
  panelIndex: number,
  elementIndex: number,
  options: Record<string, unknown>,
): string {
  if (typeof options.id === "string" && options.id) {
    return options.id;
  }

  return `legacy_p${panelIndex}_el${elementIndex}`;
}

function inferPaperPreset(value: unknown) {
  if (value === "A3" || value === "A4" || value === "A5" || value === "B5") {
    return value;
  }

  return "custom";
}

function inferOrientation(width: number, height: number) {
  return width > height ? "landscape" : "portrait";
}

function normalizeTextAlign(value: unknown) {
  if (value === "left" || value === "center" || value === "right") {
    return value;
  }

  return undefined;
}

function normalizeAlign(value: unknown) {
  if (value === "left" || value === "center" || value === "right") {
    return value;
  }

  return undefined;
}

function normalizeFontWeight(value: unknown) {
  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  return undefined;
}

function toNumber(value: unknown, fallback: number): number;
function toNumber(value: unknown, fallback: undefined): number | undefined;
function toNumber(
  value: unknown,
  fallback: number | undefined,
): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
```

注意：
`raw.legacyElement` 必须保留。Phase 2 最重要原则是：**转换时不丢信息。**

---

# 20. toLegacyTemplate

## packages/core/src/adapters/legacy/toLegacyTemplate.ts

```ts
import type { PrintTemplate } from "../../types/template";
import type { PrintPanel } from "../../types/panel";
import type { PrintElement } from "../../types/element";
import type {
  LegacyPanel,
  LegacyPrintElement,
  LegacyTemplate,
} from "../../types/legacy";
import { toLegacyElementType } from "./mapLegacyElementType";

export function toLegacyTemplate(template: PrintTemplate): LegacyTemplate {
  return {
    panels: template.panels.map(toLegacyPanel),
  };
}

function toLegacyPanel(panel: PrintPanel): LegacyPanel {
  const legacyPanel = getRawLegacyPanel(panel);

  return {
    ...legacyPanel,
    index: panel.index,
    name: panel.name,
    width: panel.paper?.width,
    height: panel.paper?.height,
    paperType: panel.paper?.preset,
    printElements: panel.elements.map(toLegacyElement),
  };
}

function toLegacyElement(element: PrintElement): LegacyPrintElement {
  const rawLegacyElement = getRawLegacyElement(element);

  return {
    ...rawLegacyElement,
    options: {
      ...rawLegacyElement?.options,
      left: element.x,
      top: element.y,
      width: element.width,
      height: element.height,
      title: element.binding?.title,
      field: element.binding?.field,
      ...toLegacyOptions(element),
    },
    printElementType: {
      ...rawLegacyElement?.printElementType,
      type: toLegacyElementType(element.type),
    },
  };
}

function toLegacyOptions(element: PrintElement): Record<string, unknown> {
  if (element.type === "text") {
    return {
      text: element.options?.content,
    };
  }

  if (element.type === "image") {
    return {
      src: element.options?.src,
    };
  }

  if (element.type === "table") {
    return {
      columns: element.options?.columns,
      field: element.options?.dataField ?? element.binding?.field,
    };
  }

  return {
    ...element.options,
  };
}

function getRawLegacyPanel(panel: PrintPanel): LegacyPanel {
  const raw = panel.raw?.legacyPanel;

  if (isRecord(raw)) {
    return raw as LegacyPanel;
  }

  return {};
}

function getRawLegacyElement(element: PrintElement): LegacyPrintElement {
  const raw = element.raw?.legacyElement;

  if (isRecord(raw)) {
    return raw as LegacyPrintElement;
  }

  return {};
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
```

这个版本的目标不是生成最漂亮的 legacy JSON，而是：

```txt
core -> legacy 后 legacy 还能识别
```

---

## packages/core/src/adapters/legacy/index.ts

```ts
export * from "./fromLegacyTemplate";
export * from "./toLegacyTemplate";
export * from "./mapLegacyElementType";
```

---

# 21. core 统一出口

## packages/core/src/index.ts

```ts
export * from "./version";

export * from "./types/common";
export * from "./types/paper";
export * from "./types/style";
export * from "./types/element";
export * from "./types/panel";
export * from "./types/template";
export * from "./types/validate";
export * from "./types/legacy";

export * from "./schema/createEmptyTemplate";
export * from "./schema/normalizeTemplate";
export * from "./schema/validateTemplate";
export * from "./schema/migrateTemplate";

export * from "./model/TemplateModel";
export * from "./model/createTemplateModel";
export * from "./model/elementUtils";

export * from "./registry/elementRegistry";
export * from "./registry/builtinElements";

export * from "./adapters/legacy";
```

---

# 22. 增加测试

## tests/core/normalizeTemplate.test.ts

```ts
import { describe, expect, it } from "vitest";
import { normalizeTemplate } from "../../packages/core/src";

describe("normalizeTemplate", () => {
  it("should fill missing fields", () => {
    const template = normalizeTemplate({});

    expect(template.schemaVersion).toBe("0.1.0");
    expect(template.id).toBeTruthy();
    expect(template.paper.width).toBe(210);
    expect(template.paper.height).toBe(297);
    expect(template.panels).toEqual([]);
  });
});
```

这里你可以选择 `normalizeTemplate({})` 是否默认创建 panel。
如果你想默认有 panel，就让测试改成：

```ts
expect(template.panels.length).toBe(1);
```

我建议 Phase 2 默认空 panels 更干净，`createEmptyTemplate()` 才创建默认 panel。你前面的草案是 normalize 自动补 panels，我这版建议拆开：

```txt
normalizeTemplate：只修正已有结构
createEmptyTemplate：创建完整默认模板
```

如果你想延续前面草案，也可以保持自动补一个 panel。

---

## tests/core/validateTemplate.test.ts

```ts
import { describe, expect, it } from "vitest";
import { createEmptyTemplate, validateTemplate } from "../../packages/core/src";

describe("validateTemplate", () => {
  it("should validate empty template", () => {
    const template = createEmptyTemplate();
    const result = validateTemplate(template);

    expect(result.valid).toBe(true);
  });

  it("should report invalid element size", () => {
    const template = createEmptyTemplate();

    template.panels[0]!.elements.push({
      id: "el_1",
      type: "text",
      x: 0,
      y: 0,
      width: -1,
      height: 10,
    });

    const result = validateTemplate(template);

    expect(result.valid).toBe(false);
    expect(
      result.issues.some((issue) => issue.code === "element.size.invalid"),
    ).toBe(true);
  });
});
```

---

## tests/core/legacyAdapter.test.ts

```ts
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  fromLegacyTemplate,
  toLegacyTemplate,
  validateTemplate,
} from "../../packages/core/src";

const fixturesRoot = path.resolve(process.cwd(), "fixtures/templates");

describe("legacy adapter", () => {
  it("should convert legacy template to core template", () => {
    const legacyTemplate = readFixture("basic-text.json");

    const coreTemplate = fromLegacyTemplate(legacyTemplate);

    expect(coreTemplate.schemaVersion).toBe("0.1.0");
    expect(coreTemplate.panels.length).toBeGreaterThan(0);

    const result = validateTemplate(coreTemplate);

    expect(result.valid).toBe(true);
  });

  it("should preserve raw legacy data", () => {
    const legacyTemplate = readFixture("basic-text.json");

    const coreTemplate = fromLegacyTemplate(legacyTemplate);

    expect(coreTemplate.raw?.legacy).toBeTruthy();
    expect(coreTemplate.panels[0]?.raw?.legacyPanel).toBeTruthy();
    expect(
      coreTemplate.panels[0]?.elements[0]?.raw?.legacyElement,
    ).toBeTruthy();
  });

  it("should convert core template back to legacy template", () => {
    const legacyTemplate = readFixture("basic-text.json");

    const coreTemplate = fromLegacyTemplate(legacyTemplate);
    const legacyAgain = toLegacyTemplate(coreTemplate);

    expect(Array.isArray(legacyAgain.panels)).toBe(true);
    expect(legacyAgain.panels?.[0]?.printElements?.length).toBeGreaterThan(0);
  });
});

function readFixture(name: string) {
  return JSON.parse(fs.readFileSync(path.join(fixturesRoot, name), "utf8"));
}
```

---

# 23. 修改根 package.json

新增 core 后，根脚本不用大改，`pnpm -r` 会自动包含。

如果想加专用命令：

```json
{
  "scripts": {
    "test:core": "vitest run tests/core",
    "check:core": "pnpm --filter @hiprint-re/core typecheck && pnpm test:core"
  }
}
```

---

# 24. docs/schema.md

新增：

```txt
docs/schema.md
```

内容草案：

````md
# Core Template Schema

## Goal

`@hiprint-re/core` defines a framework-agnostic template schema.

It must not depend on:

- DOM
- React
- Vue
- jQuery
- legacy runtime

## Template

```ts
interface PrintTemplate {
  schemaVersion: "0.1.0";
  id: string;
  meta?: PrintTemplateMeta;
  paper: PaperConfig;
  panels: PrintPanel[];
  raw?: Record<string, unknown>;
}
```
````

## Panel

```ts
interface PrintPanel {
  id: string;
  index: number;
  name?: string;
  paper?: Partial<PaperConfig>;
  elements: PrintElement[];
  raw?: Record<string, unknown>;
}
```

## Element

```ts
interface PrintElementBase {
  id: string;
  type: PrintElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  binding?: DataBinding;
  style?: PrintStyle;
  options?: Record<string, unknown>;
  raw?: Record<string, unknown>;
}
```

## Legacy compatibility

Legacy data must be preserved under `raw`.

```ts
template.raw.legacy;
panel.raw.legacyPanel;
element.raw.legacyElement;
```

````

---

# 25. docs/phase-2.md

```md
# Phase 2 - Core Schema and Legacy Adapter

## Goal

Extract a framework-agnostic core schema and build a compatibility adapter
between legacy hiprint template JSON and the new core template schema.

## Non-goals

- No layout engine
- No renderer
- No designer
- No React/Vue integration
- No table pagination rewrite

## Deliverables

- `@hiprint-re/core`
- Core template types
- Element types
- Normalize / validate / migrate
- Legacy -> core adapter
- Core -> legacy adapter
- Fixtures conversion tests

## Acceptance

- Legacy fixtures can be converted to core template
- Core template can be validated
- Core template can be converted back to legacy template
- Raw legacy data is preserved
- No DOM / jQuery dependency in core
````

---

# 26. Phase 2 验收标准

完成后必须满足：

```txt
1. packages/core 存在
2. @hiprint-re/core 不依赖 DOM / React / Vue / jQuery
3. PrintTemplate / PrintPanel / PrintElement 类型完成
4. normalizeTemplate 可用
5. validateTemplate 可用
6. migrateTemplate 可用
7. fromLegacyTemplate 可用
8. toLegacyTemplate 可用
9. fixtures 里的 legacy 模板能转 core
10. core 模板能转回 legacy
11. raw legacy 信息不会丢
12. pnpm --filter @hiprint-re/core typecheck 通过
13. pnpm test:core 通过
14. docs/schema.md 完成
```

---

# 27. 推荐 PR 拆分

## PR 1：新增 core 包和基础类型

```txt
feat(core): add framework agnostic template schema
```

内容：

```txt
packages/core
types/common
types/paper
types/style
types/element
types/panel
types/template
```

---

## PR 2：新增 normalize / validate / migrate

```txt
feat(core): add template normalize validate and migrate
```

内容：

```txt
schema/normalizeTemplate
schema/validateTemplate
schema/migrateTemplate
tests/core
```

---

## PR 3：新增 legacy adapter

```txt
feat(core): add legacy template adapter
```

内容：

```txt
adapters/legacy/fromLegacyTemplate
adapters/legacy/toLegacyTemplate
legacy adapter tests
```

---

## PR 4：新增文档

```txt
docs(core): document core schema and phase 2
```

内容：

```txt
docs/schema.md
docs/phase-2.md
fixtures/README.md
```

---

# 28. Phase 2 最小 TODO

```txt
[ ] 新建 packages/core
[ ] 定义 CoreSchemaVersion
[ ] 定义 PaperConfig
[ ] 定义 PrintStyle
[ ] 定义 PrintElement
[ ] 定义 PrintPanel
[ ] 定义 PrintTemplate
[ ] 定义 LegacyTemplate 类型
[ ] 实现 createEmptyTemplate
[ ] 实现 normalizeTemplate
[ ] 实现 validateTemplate
[ ] 实现 migrateTemplate
[ ] 实现 ElementRegistry
[ ] 实现 fromLegacyTemplate
[ ] 实现 toLegacyTemplate
[ ] fixtures 增加 legacy adapter 测试
[ ] docs/schema.md
[ ] docs/phase-2.md
```

---

# 29. 关键设计原则

Phase 2 最重要的原则有三个。

## 1. core 不碰 DOM

`@hiprint-re/core` 里不能出现：

```ts
window;
document;
HTMLElement;
jQuery;
React;
Vue;
```

如果出现，就说明职责越界了。

---

## 2. legacy 信息不能丢

转换时不确定的字段都放进：

```ts
raw;
```

比如：

```ts
template.raw.legacy;
panel.raw.legacyPanel;
element.raw.legacyElement;
```

这样后面即使 core schema 初版不完整，也不会破坏旧模板。

---

## 3. table 只建模，不重写

Phase 2 对 table 只做：

```txt
识别 type = table
保留 columns
保留 dataField
保留 raw legacyElement
```

不要在 Phase 2 里做：

```txt
动态行高
分页
合并单元格
跨页边框
表头重复
```

这些应该放 Phase 3 / Phase 4。

---

# 30. 最终判断

Phase 2 的本质是：

```txt
建立新世界的数据协议
```

只要这个阶段完成，项目就从：

```txt
legacy runtime 项目
```

升级成：

```txt
有自己 core schema 的打印引擎项目
```

后续路线就顺了：

```txt
Phase 2：core schema/model
Phase 3：layout engine
Phase 4：DOM renderer
Phase 5：React/Vue preview
Phase 6：designer state
Phase 7：React/Vue designer
```

你下一步最应该先写的是：

```txt
packages/core/src/types/*
packages/core/src/adapters/legacy/fromLegacyTemplate.ts
tests/core/legacyAdapter.test.ts
```

这三个完成后，Phase 2 就算真正开始落地了。
