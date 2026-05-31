# hiprint 重构 — Agent 执行手册

> 本文档是 AI Agent 的执行指南，用于将 hiprint 反编译产物重构为框架无关的现代 monorepo。

## 项目背景

hiprint 是一个浏览器端打印设计器，当前状态：

- 源码为 webpack + Babel 压缩混淆的 bundle（`hiprint.bundle.js`）
- 已有反编译工具在 `reverse-hiprint/`，产出 34 个 webpack 模块 + 307 个 browserify 模块
- 核心类：`BasePrintElement`、`TablePrintElement`、`PrintTemplate`、`PrintPanel`
- 全局挂载：`window.hinnn`、`window.hiwebSocket`、`window.hiLocalStorage`
- License: LGPL 或商业授权（需注意）

## 核心原则

```
legacy ≠ core
core ≠ dom
react/vue ≠ 业务核心
```

**永远不要在反编译代码上直接堆 React/Vue 组件。**

---

## 架构目标

```
hiprint/
├─ packages/
│  ├─ legacy/              # 反编译产物的稳定封装层
│  ├─ core/                # 框架无关核心（模型/布局/分页/schema/插件协议）
│  ├─ dom/                 # 浏览器 DOM 渲染适配
│  ├─ react/               # React 胶水层
│  ├─ vue/                 # Vue 胶水层
│  ├─ designer/            # 通用设计器逻辑（不绑定框架）
│  ├─ designer-react/       # React 版设计器组件
│  └─ designer-vue/        # Vue 版设计器组件
├─ apps/
│  ├─ playground-legacy/
│  ├─ playground-react/
│  └─ playground-vue/
├─ fixtures/
│  ├─ templates/           # 真实打印模板 JSON
│  ├─ data/               # 模板对应的数据
│  └─ snapshots/          # 渲染截图
├─ tools/
│  ├─ reverse-audit/       # 反解析辅助脚本
│  ├─ bundle-analyzer/
│  └─ codemods/
└─ docs/
```

---

## Phase 0：冻结当前成果

**目标**：保证当前能跑，不要边清理边丢功能。

### 创建项目结构

```
packages/legacy/
├─ src/
│  ├─ index.ts            # 统一入口，暴露 hiprint 全局
│  ├─ loadLegacy.ts      # 加载 vendor 文件
│  ├─ global.ts           # window.hinnn / hiwebSocket 封装
│  └─ types.ts            # 从 bundle 反推的类型
├─ vendor/                 # 直接复制 reverse-hiprint/output/cleaned/
│  ├─ hiprint.bundle.js
│  ├─ hiprint.config.js
│  └─ polyfill.min.js
└─ package.json
```

### 执行步骤

1. **建立 monorepo**：使用 pnpm workspace + Turborepo
2. **复制反编译产物**：将 `reverse-hiprint/output/cleaned/` 内容放入 `packages/legacy/vendor/`
3. **建立 `packages/legacy/src/index.ts`**：动态加载 vendor 文件
4. **建立 `apps/playground-legacy/`**：一个可运行的 HTML demo，证明原行为完好
5. **收集 fixtures**：从用户真实业务中收集 3-5 个典型模板 JSON，放入 `fixtures/templates/`
6. **建立快照测试**：用 Playwright 对 playground-legacy 关键页面截图

### 验收标准

- [ ] playground-legacy 能正常运行
- [ ] 能加载模板、预览、打印、导出 JSON
- [ ] 每次改动后可对比快照
- [ ] fixtures 中每个模板能正确渲染

---

## Phase 1：反解析代码可读化

**目标**：从"能看懂一点"推进到"能按模块维护"。

### reverse-audit 文档

在 `tools/reverse-audit/README.md` 中记录：

```md
# Reverse Audit

## 全局对象
- `window.hiprint` / `window.hiprintTemplate`
- `window.hinnn`
- `window.hiwebSocket`
- `window.hiLocalStorage`
- `provider`
- `printElementTypeManager`

## 核心类映射（基于 manifest）
- module-033: PrintTemplate / PrintPanel — 模板和面板，126KB
- module-004: BasePrintElement — 基础元素类，22.9KB
- module-015: TablePrintElement — 表格元素，22.3KB
- module-009: PrintElementOptionBuilder — 选项构建器，124KB
- module-016: 表格设计器交互，27.8KB
- module-002: HiPrint 实例
- module-000: hinnn 工具库

## 主要流程
1. 初始化 → 注册元素类型
2. 创建 PrintTemplate
3. 加载模板 JSON
4. 渲染设计器 DOM
5. 用户交互（拖拽/缩放/选区）
6. 预览 renderToHtml
7. 浏览器打印

## 模块边界识别
- [ ] 模板模型（LoadTemplate / SaveTemplate）
- [ ] 元素模型（Base / Text / Image / Table / Shape）
- [ ] 设计器画布
- [ ] 拖拽缩放
- [ ] 预览渲染
- [ ] 打印调用
- [ ] 数据绑定
- [ ] 表格逻辑
- [ ] 插件注册
- [ ] 全局配置
```

### 执行步骤

1. 阅读 `reverse-hiprint/output/cleaned/hiprint/module-033.js`（最大最核心）
2. 阅读 `reverse-hiprint/output/cleaned/hiprint/module-004.js`（BasePrintElement）
3. 阅读 `reverse-hiprint/output/cleaned/hiprint/module-015.js`（TablePrintElement）
4. 为每个模块补充 `tools/reverse-audit/README.md` 的说明
5. 确定哪些代码进 `core`，哪些留在 `dom/designer`

### 验收标准

- [ ] 主要全局对象有说明
- [ ] 主要类/函数有用途说明
- [ ] 关键调用链能画出来
- [ ] 能确定哪些代码进 core，哪些留在 UI 层

---

## Phase 2：抽离 schema 和 model

**目标**：先抽数据结构，不急着抽渲染。这是整个重构最关键的一步。

### 定义核心类型

在 `packages/core/src/schema/` 下创建：

```ts
// packages/core/src/schema/template.ts
export interface PrintTemplate {
  version: "0.1.0";
  paper: PaperConfig;
  panels: PrintPanel[];
  elements: PrintElement[];
  plugins?: string[];
}

export interface PaperConfig {
  width: number;       // mm
  height: number;      // mm
  orientation?: "portrait" | "landscape";
  margin?: { top: number; right: number; bottom: number; left: number };
}

export interface PrintPanel {
  index: number;
  width: number;
  height: number;
  elements: PrintElement[];
}

export type PrintElement = TextElement | ImageElement | TableElement |
  LineElement | RectElement | BarcodeElement | QrCodeElement | HtmlElement;

export interface PrintElementBase {
  id: string;
  tid: string;
  type: string;
  title?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotate?: number;
  hidden?: boolean;
  fixed?: boolean;
  field?: string;
  options?: Record<string, unknown>;
}

export interface TextElement extends PrintElementBase {
  type: "text";
  content?: string;
  textType?: "static" | "dynamic";
}

export interface ImageElement extends PrintElementBase {
  type: "image";
  src?: string;
}

export interface TableElement extends PrintElementBase {
  type: "table";
  columns: TableColumn[];
  rows?: TableRow[];
}

export interface LineElement extends PrintElementBase {
  type: "hline" | "vline";
}

export interface RectElement extends PrintElementBase {
  type: "rect" | "oval";
}
```

### 版本控制

```ts
// packages/core/src/schema/migrate.ts
export function migrateTemplate(template: unknown, fromVersion: string): PrintTemplate {
  // v0.x 之间的迁移逻辑
  return template as PrintTemplate;
}

export function validateTemplate(template: unknown): ValidateResult {
  // JSON Schema 校验
}

export function serialize(template: PrintTemplate): string {
  return JSON.stringify(template);
}

export function deserialize(json: string): PrintTemplate {
  return JSON.parse(json);
}
```

### 双向转换器

```ts
// packages/core/src/converters/legacy-to-core.ts
// packages/core/src/converters/core-to-legacy.ts
```

### 验收标准

- [ ] 旧模板可以转换为新 schema
- [ ] 新 schema 可以转换回 legacy 模板
- [ ] schema 有完整的 TypeScript 类型定义
- [ ] schema 有 JSON Schema 校验
- [ ] schema 有版本迁移机制
- [ ] fixtures 中的模板全部能通过转换

---

## Phase 3：抽离 layout engine

**目标**：把坐标、尺寸、分页、单位换算从 UI 中拿出来。

### 核心模块

```
packages/core/src/layout/
├─ unit.ts              # px/mm/pt 转换
├─ paper.ts             # 纸张尺寸
├─ position.ts          # 元素绝对定位
├─ bounds.ts            # 元素边界计算
├─ pagination.ts        # 分页计算
├─ table-pagination.ts  # 表格分页
├─ collision.ts          # 碰撞检测
├─ align.ts             # 对齐辅助线计算
└─ index.ts
```

### 接口设计

```ts
// packages/core/src/layout/types.ts
export interface LayoutContext {
  paper: PaperConfig;
  unit: "px" | "mm";
  dpi: number;
}

export interface LayoutResult {
  pages: LayoutPage[];
  warnings: LayoutWarning[];
}

export interface LayoutPage {
  index: number;
  width: number;
  height: number;
  elements: LayoutElement[];
}

export interface LayoutElement {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotate?: number;
  content: unknown;
}

// packages/core/src/layout/index.ts
export function layout(
  template: PrintTemplate,
  data: unknown,
  ctx: LayoutContext,
): LayoutResult;
```

### 验收标准

- [ ] 同一份模板 + 数据，layout 输出稳定
- [ ] px / mm / pt 转换正确
- [ ] 表格分页有测试用例（表头重复、跨页边框）
- [ ] layout engine 不依赖 DOM
- [ ] layout engine 不依赖 React/Vue

---

## Phase 4：建立 renderer 抽象

**目标**：让 core 不关心最终渲染到 DOM、Canvas、SVG、PDF 还是图片。

### DOM Renderer

```
packages/dom/
├─ src/
│  ├─ renderToHtml.ts
│  ├─ BrowserPrintRenderer.ts
│  ├─ HtmlPreviewRenderer.ts
│  └─ style/
└─ package.json
```

```ts
export function renderToHtml(
  layoutResult: LayoutResult,
  options?: RenderOptions,
): HTMLElement;

export interface RenderOptions {
  container?: HTMLElement;
  mode?: "preview" | "print";
  scale?: number;
}
```

### 验收标准

- [ ] core layout 结果可以被 DOM renderer 渲染
- [ ] 不再直接依赖 legacy 渲染流程
- [ ] 预览结果和 legacy 结果大体一致
- [ ] 关键模板有 Playwright 截图回归测试

---

## Phase 5：插件系统

**目标**：把 text/image/table/barcode/qrcode 等元素从硬编码改成插件。

### 内置插件（先不拆独立包）

```
packages/core/src/plugins/
├─ text/
├─ image/
├─ table/
├─ shape/
├─ barcode/
└─ qrcode/
```

```ts
// packages/core/src/plugins/types.ts
export interface PrintElementDefinition<T = unknown> {
  type: string;
  name: string;
  defaultOptions: T;
  validate?: (element: PrintElement<T>) => ValidateResult;
  layout?: ElementLayoutHandler<T>;
  render?: ElementRenderHandler<T>;
}

export interface PrintPlugin {
  name: string;
  elements?: PrintElementDefinition[];
  commands?: CommandDefinition[];
}
```

### 验收标准

- [ ] 新增元素不需要改 core 主流程
- [ ] 每个元素类型有默认配置
- [ ] 每个元素有属性面板 schema
- [ ] 每个元素有渲染逻辑
- [ ] 每个元素有序列化/反序列化能力

---

## Phase 6：设计器状态模型

**目标**：把 designer 的交互状态抽出来，不绑定 React/Vue。

### 命令模式

```ts
// packages/designer/src/commands/types.ts
export interface Command {
  id: string;
  name: string;
  execute(ctx: DesignerContext): void;
  undo?(ctx: DesignerContext): void;
}

// 内置命令
export class AddElementCommand implements Command { ... }
export class RemoveElementCommand implements Command { ... }
export class MoveElementCommand implements Command { ... }
export class ResizeElementCommand implements Command { ... }
export class UpdateElementOptionsCommand implements Command { ... }
export class GroupElementsCommand implements Command { ... }
export class UngroupElementsCommand implements Command { ... }
```

### 设计器状态

```ts
// packages/designer/src/store/types.ts
export interface DesignerState {
  template: PrintTemplate;
  selectedIds: string[];
  hoveredId: string | null;
  zoom: number;
  clipboard: PrintElement[];
  history: CommandHistory;
}
```

### 验收标准

- [ ] React 和 Vue 能复用同一套 designer store
- [ ] undo/redo 可用
- [ ] 拖拽/缩放逻辑不写死在组件里
- [ ] 快捷键可以复用 command

---

## Phase 7-8：React / Vue 胶水层

### React

```
packages/react/
├─ src/
│  ├─ hooks/
│  │  ├─ usePrintEngine.ts
│  │  └─ usePrintDesigner.ts
│  ├─ components/
│  │  ├─ PrintDesigner.tsx
│  │  ├─ PrintPreview.tsx
│  │  ├─ PrintCanvas.tsx
│  │  ├─ PrintToolbar.tsx
│  │  ├─ PropertyPanel.tsx
│  │  ├─ ElementList.tsx
│  │  └─ LayerPanel.tsx
│  └─ index.ts
└─ package.json
```

### Vue

```
packages/vue/
├─ src/
│  ├─ composables/
│  │  ├─ usePrintEngine.ts
│  │  └─ usePrintDesigner.ts
│  ├─ components/
│  │  ├─ PrintDesigner.vue
│  │  ├─ PrintPreview.vue
│  │  ├─ PrintCanvas.vue
│  │  ├─ PrintToolbar.vue
│  │  ├─ PropertyPanel.vue
│  │  ├─ ElementList.vue
│  │  └─ LayerPanel.vue
│  └─ index.ts
└─ package.json
```

### 验收标准

- [ ] React demo 和 Vue demo 功能对齐
- [ ] 共享 fixtures
- [ ] 共享 core 测试
- [ ] React/Vue 层不包含业务核心逻辑

---

## 优先级与里程碑

### 优先级

| 优先级 | 任务 |
|--------|------|
| P0 | legacy 封装 + playground + fixtures |
| P0 | schema/model 抽离 |
| P0 | 旧模板到新 schema 的双向转换器 |
| P1 | layout engine |
| P1 | DOM renderer |
| P1 | React preview |
| P2 | designer state + command |
| P2 | React designer |
| P2 | Vue preview |
| P3 | Vue designer |
| P3 | 插件市场/高级元素 |
| P3 | PDF/Canvas/SVG renderer |

### 里程碑

| 版本 | 内容 |
|------|------|
| v0.1.0 | legacy 封装 + playground 可运行 + fixtures + 基础文档 |
| v0.2.0 | PrintTemplate schema + 双向转换器 + 校验 |
| v0.3.0 | layout engine 初版（纸张/单位/元素布局/基础分页） |
| v0.4.0 | DOM renderer + preview + browser print + 截图回归测试 |
| v0.5.0 | React preview (`usePrintEngine` + `PrintPreview`) |
| v0.6.0 | React designer MVP（画布/拖拽/属性面板/undo-redo/导入导出） |
| v0.7.0 | Vue preview |
| v0.8.0 | Vue designer MVP |
| v1.0.0 | core API 稳定 + schema 版本稳定 + React/Vue 适配稳定 + 迁移指南 |

---

## 第一轮重构分支

```bash
git checkout -b refactor/core-architecture
```

**第一轮只做这些**（不要贪多）：

1. 新建 pnpm workspace + Turborepo
2. 新建 `packages/legacy`（放入反编译产物）
3. 新建 `packages/core`（只建目录，不写代码）
4. 新建 `apps/playground-legacy`
5. 新建 `fixtures/templates/`（收集 3-5 个真实模板）
6. 定义 `PrintTemplate` / `PrintElement` / `PaperConfig` 类型
7. 写 `legacy template -> core schema` 转换器
8. 写 `core schema -> legacy template` 转换器
9. 用 vitest 写 schema 转换的单元测试
10. Playwright 截图测试框架

**第一轮绝对不要碰**：复杂 UI、设计器拖拽、PDF renderer、Vue 组件。

---

## 风险点

### 1. 反编译代码不能直接维护

反编译代码的问题：变量名无语义、模块边界消失、全局状态多、this 指向复杂、原型链依赖不清晰、DOM 和业务逻辑混在一起。

**正确方式**：legacy 稳住行为 → core 重建模型 → adapter 兼容旧模板 → renderer 逐步替代 legacy。

### 2. license 风险

- 不直接复用原项目名称
- 不直接发布原始 bundle
- docs 里说明来源和用途
- core 尽量重写而不是搬运
- reverse 过程仅作分析，不作为最终 npm 包主体

### 3. 表格是最大复杂点

表格涉及：表头重复、表格分页、单元格合并、动态行高、字段绑定、空数据处理、汇总行、嵌套字段、跨页边框。

**建议**：text/image/shape 先走新 core，table 暂时走 legacy，后续单独迁移。

---

## TODO 检查清单（按执行顺序）

### 环境准备
- [ ] 建立 pnpm workspace + Turborepo
- [ ] 创建 `packages/legacy`、`packages/core`、`apps/playground-legacy`
- [ ] 把 `reverse-hiprint/output/cleaned/` 内容放入 `packages/legacy/vendor/`
- [ ] `packages/legacy/src/index.ts` 动态加载 vendor
- [ ] `apps/playground-legacy` 能正常运行

### Fixtures
- [ ] 收集 3-5 个真实打印模板 JSON 到 `fixtures/templates/`
- [ ] 每个模板配套真实数据 `fixtures/data/`

### Schema (Phase 2)
- [ ] `packages/core/src/schema/template.ts` — 核心类型定义
- [ ] `packages/core/src/schema/migrate.ts` — 版本迁移
- [ ] `packages/core/src/schema/validate.ts` — JSON Schema 校验
- [ ] `packages/core/src/converters/legacy-to-core.ts` — legacy → core
- [ ] `packages/core/src/converters/core-to-legacy.ts` — core → legacy
- [ ] vitest 测试覆盖双向转换

### Layout (Phase 3)
- [ ] `packages/core/src/layout/unit.ts` — 单位转换
- [ ] `packages/core/src/layout/paper.ts` — 纸张模型
- [ ] `packages/core/src/layout/position.ts` — 定位
- [ ] `packages/core/src/layout/pagination.ts` — 分页
- [ ] `packages/core/src/layout/table-pagination.ts` — 表格分页
- [ ] layout vitest 测试用例

### Renderer (Phase 4)
- [ ] `packages/dom/src/renderToHtml.ts`
- [ ] `packages/dom/src/BrowserPrintRenderer.ts`
- [ ] Playwright 截图回归测试

### Plugins (Phase 5)
- [ ] `packages/core/src/plugins/text/`
- [ ] `packages/core/src/plugins/image/`
- [ ] `packages/core/src/plugins/table/`
- [ ] `packages/core/src/plugins/shape/`

### Designer State (Phase 6)
- [ ] `packages/designer/src/commands/` — command 模式
- [ ] `packages/designer/src/store/` — designer store

### React (Phase 7)
- [ ] `packages/react/src/hooks/usePrintEngine.ts`
- [ ] `packages/react/src/hooks/usePrintDesigner.ts`
- [ ] `packages/react/src/components/PrintDesigner.tsx`
- [ ] `packages/react/src/components/PrintPreview.tsx`
- [ ] `apps/playground-react/` — React demo

### Vue (Phase 8)
- [ ] `packages/vue/src/composables/usePrintEngine.ts`
- [ ] `packages/vue/src/composables/usePrintDesigner.ts`
- [ ] `packages/vue/src/components/` — Vue 组件
- [ ] `apps/playground-vue/` — Vue demo
