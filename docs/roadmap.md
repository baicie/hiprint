我这边通过 GitHub 连接器确认到 `baicie/hiprint` 仓库可访问、默认分支是 `main`，但代码搜索索引没有返回有效文件结果，根目录 `package.json` 也没有直接取到。所以我下面不强行假设它已经是标准 monorepo，而是按你现在“已经初步反解析 bundle / config / polyfill 产物”的状态，给一条最稳的演进路线。

结论：**不要直接把反编译后的代码改成 React/Vue 组件库**。应该先保留一个 `legacy` 层，把现有可运行行为冻结下来，然后逐步抽出 framework-agnostic 的 `core`，最后再做 React/Vue 胶水层。

---

## 一、目标架构

建议最终拆成这样：

```txt
hiprint/
├─ packages/
│  ├─ legacy/              # 当前反解析产物的稳定封装层
│  ├─ core/                # 框架无关核心
│  ├─ dom/                 # 浏览器 DOM 渲染适配
│  ├─ react/               # React 胶水层
│  ├─ vue/                 # Vue 胶水层
│  ├─ designer/            # 可选：通用设计器逻辑，不绑定框架
│  ├─ designer-react/      # React 版设计器组件
│  └─ designer-vue/        # Vue 版设计器组件
├─ apps/
│  ├─ playground-legacy/
│  ├─ playground-react/
│  └─ playground-vue/
├─ fixtures/
│  ├─ templates/
│  ├─ data/
│  └─ snapshots/
├─ tools/
│  ├─ reverse-audit/       # 反解析辅助脚本
│  ├─ bundle-analyzer/
│  └─ codemods/
└─ docs/
   ├─ architecture.md
   ├─ core-api.md
   ├─ schema.md
   └─ migration.md
```

其中最关键的是：

```txt
legacy ≠ core
core ≠ dom
react/vue ≠ 业务核心
```

`core` 只负责模型、布局、分页、schema、插件协议、事件协议，不依赖 React/Vue，也尽量不直接依赖 DOM。

---

## 二、core 应该抽什么

`@hiprint-re/core` 建议包含这些能力：

```txt
@hiprint-re/core
├─ model/          # Template、Paper、Page、Element、Panel、Field 等模型
├─ schema/         # JSON schema、版本迁移、校验
├─ layout/         # 元素布局、分页、坐标换算、单位转换
├─ binding/        # 数据绑定、表达式解析、字段映射
├─ plugins/        # 元素插件、渲染插件、数据插件
├─ events/         # 框架无关事件系统
├─ command/        # undo / redo / copy / paste / align 等命令模型
├─ history/        # 历史栈
├─ selection/      # 选区模型
├─ serializer/     # import/export
└─ types/          # 公共类型
```

不要放进 core 的内容：

```txt
React 组件
Vue 组件
DOM 查询
window / document 直接访问
具体 UI 样式
具体拖拽库
具体弹窗、菜单、表单组件
浏览器打印窗口实现
```

这些应该放到 `dom`、`designer-react`、`designer-vue` 里。

---

## 三、建议的核心 API 形态

可以先设计成这种结构：

```ts
export interface PrintTemplate {
  version: string;
  paper: PaperConfig;
  panels: PrintPanel[];
  elements: PrintElement[];
  plugins?: string[];
}

export interface PrintEngineOptions {
  plugins?: PrintPlugin[];
  unit?: "px" | "mm";
}

export interface PrintEngine {
  loadTemplate(template: PrintTemplate): void;
  getTemplate(): PrintTemplate;
  validate(): ValidateResult;
  layout(data: unknown): LayoutResult;
  render<T>(renderer: Renderer<T>, data: unknown): T;
}

export interface Renderer<T> {
  createDocument(ctx: RenderContext): T;
  createPage(ctx: PageRenderContext): unknown;
  drawText(element: LayoutTextElement): unknown;
  drawImage(element: LayoutImageElement): unknown;
  drawTable(element: LayoutTableElement): unknown;
  drawShape(element: LayoutShapeElement): unknown;
  commit(): T;
}

export interface PrintPlugin {
  name: string;
  elements?: PrintElementDefinition[];
  renderers?: RendererDefinition[];
  commands?: CommandDefinition[];
}
```

这样 React/Vue 只消费 core：

```ts
const engine = createPrintEngine({
  plugins: [textPlugin(), imagePlugin(), tablePlugin()],
});

engine.loadTemplate(template);

const result = engine.layout(data);
```

React 层：

```ts
const { engine, template, setTemplate, preview } = usePrintDesigner();
```

Vue 层：

```ts
const { engine, template, setTemplate, preview } = usePrintDesigner();
```

---

## 四、Roadmap

### Phase 0：冻结当前反解析成果

目标：**先保证当前能跑，不要边清理边丢功能。**

要做：

```txt
1. 保留原始反编译产物
2. 新建 packages/legacy
3. 把当前 hiprint.bundle.js / config / polyfill 等产物封装成稳定入口
4. 建立最小 demo
5. 建立 fixtures
6. 建立快照测试
```

建议目录：

```txt
packages/legacy/
├─ src/
│  ├─ index.ts
│  ├─ loadLegacy.ts
│  ├─ global.ts
│  └─ types.ts
├─ vendor/
│  ├─ hiprint.bundle.js
│  ├─ hiprint.config.js
│  └─ polyfill.min.js
└─ package.json
```

验收标准：

```txt
1. 原始 demo 能跑
2. 能加载模板
3. 能预览
4. 能打印
5. 能导出模板 JSON
6. 每次改动后可以对比快照
```

这一阶段不要大规模重命名变量。先把行为锁住。

---

### Phase 1：反解析代码可读化

目标：**从“能看懂一点”推进到“能按模块维护”。**

重点不是美化，而是识别边界。

要拆的模块：

```txt
1. 模板模型
2. 打印元素
3. 设计器画布
4. 拖拽缩放
5. 预览渲染
6. 打印调用
7. 数据绑定
8. 表格逻辑
9. 插件注册
10. 全局配置
```

建议做一个 `reverse-audit` 文档：

```md
# Reverse Audit

## 全局对象

- hiprint
- hiprintTemplate
- provider
- printElementTypeManager

## 核心类

- XxxTemplate
- XxxPrintElement
- XxxProvider
- XxxPanel

## 主要流程

1. 初始化
2. 注册元素
3. 加载模板
4. 渲染设计器
5. 预览
6. 打印

## 待命名模块

...
```

验收标准：

```txt
1. 主要全局对象有说明
2. 主要类/函数有用途说明
3. 关键调用链能画出来
4. 能确定哪些代码进 core，哪些留在 UI 层
```

---

### Phase 2：抽离 schema 和 model

目标：**先抽数据结构，不急着抽渲染。**

这是最重要的一步。打印设计器最核心的不是 UI，而是模板数据结构。

建议先定义：

```txt
PrintTemplate
PaperConfig
PrintPanel
PrintElement
TextElement
ImageElement
TableElement
LineElement
RectElement
BarcodeElement
QrCodeElement
```

示例：

```ts
export interface PrintElementBase {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotate?: number;
  hidden?: boolean;
  style?: PrintStyle;
  field?: string;
  options?: Record<string, unknown>;
}

export interface TextElement extends PrintElementBase {
  type: "text";
  content?: string;
}

export interface ImageElement extends PrintElementBase {
  type: "image";
  src?: string;
}

export interface TableElement extends PrintElementBase {
  type: "table";
  columns: TableColumn[];
}
```

还要做版本控制：

```ts
export interface PrintTemplate {
  version: "0.1.0";
  paper: PaperConfig;
  elements: PrintElement[];
}
```

验收标准：

```txt
1. 旧模板可以转换为新 schema
2. 新 schema 可以转换回 legacy 模板
3. schema 有类型定义
4. schema 有校验
5. schema 有迁移机制
```

这一步完成后，项目才算真正脱离“反编译代码泥潭”。

---

### Phase 3：抽离 layout engine

目标：**把坐标、尺寸、分页、单位换算从 UI 中拿出来。**

core 里应该有：

```txt
1. px / mm 转换
2. 纸张尺寸
3. 元素绝对定位
4. 元素边界计算
5. 分页计算
6. 表格分页
7. 元素碰撞检测
8. 对齐辅助线计算
```

建议接口：

```ts
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
```

验收标准：

```txt
1. 同一份模板 + 数据，layout 输出稳定
2. 有 fixtures 测试
3. 表格分页有测试
4. 不依赖 DOM
5. 不依赖 React/Vue
```

---

### Phase 4：建立 renderer 抽象

目标：**让 core 不关心最终渲染到 DOM、Canvas、SVG、PDF 还是图片。**

建议先做 DOM renderer：

```txt
@hiprint-re/dom
├─ DomRenderer
├─ HtmlPreviewRenderer
├─ BrowserPrintRenderer
└─ style/
```

接口：

```ts
export function renderToHtml(
  template: PrintTemplate,
  data: unknown,
  options?: RenderOptions,
): HTMLElement;
```

后续可以扩展：

```txt
renderToDom
renderToHtmlString
renderToCanvas
renderToPdf
renderToImage
```

但 MVP 不建议一上来做 PDF renderer，优先 DOM + browser print。

验收标准：

```txt
1. core layout 结果可以被 DOM renderer 渲染
2. 不再直接依赖 legacy 渲染流程
3. 预览结果和 legacy 结果大体一致
4. 关键模板有截图回归测试
```

---

### Phase 5：插件系统

目标：**把 text/image/table/barcode/qrcode 等元素从硬编码改成插件。**

插件定义：

```ts
export interface PrintElementDefinition<T = any> {
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

内置插件：

```txt
@hiprint-re/plugin-text
@hiprint-re/plugin-image
@hiprint-re/plugin-table
@hiprint-re/plugin-shape
@hiprint-re/plugin-barcode
@hiprint-re/plugin-qrcode
```

MVP 可以先内置，不一定拆独立包：

```txt
packages/core/src/plugins/text
packages/core/src/plugins/image
packages/core/src/plugins/table
```

验收标准：

```txt
1. 新增元素不需要改 core 主流程
2. 元素有默认配置
3. 元素有属性面板 schema
4. 元素有渲染逻辑
5. 元素有序列化/反序列化能力
```

---

### Phase 6：设计器状态模型

目标：**把 designer 的交互状态抽出来，不绑定 React/Vue。**

core 或 designer 包里要有：

```txt
1. 当前模板
2. 当前选中元素
3. hover 元素
4. 拖拽中状态
5. 缩放中状态
6. 画布缩放比例
7. 历史记录
8. copy / paste
9. undo / redo
10. align / distribute
```

建议使用 command 模式：

```ts
export interface Command {
  id: string;
  name: string;
  execute(ctx: DesignerContext): void;
  undo?(ctx: DesignerContext): void;
}
```

示例命令：

```txt
AddElementCommand
RemoveElementCommand
MoveElementCommand
ResizeElementCommand
UpdateElementOptionsCommand
GroupElementsCommand
UngroupElementsCommand
```

验收标准：

```txt
1. React/Vue 都能复用同一套 designer store
2. undo/redo 可用
3. 拖拽/缩放逻辑不写死在组件里
4. 快捷键可以复用 command
```

---

### Phase 7：React 胶水层

目标：**让 React 只负责视图和生命周期，不负责核心逻辑。**

包名：

```txt
@hiprint-re/react
@hiprint-re/designer-react
```

React 层提供：

```ts
export function usePrintEngine(options?: PrintEngineOptions): PrintEngine;

export function usePrintDesigner(options?: DesignerOptions): {
  engine: PrintEngine;
  template: PrintTemplate;
  selectedIds: string[];
  commands: DesignerCommands;
};

export function PrintPreview(props: PrintPreviewProps): JSX.Element;

export function PrintDesigner(props: PrintDesignerProps): JSX.Element;
```

React 组件：

```txt
<PrintDesigner />
<PrintPreview />
<PrintToolbar />
<PrintCanvas />
<PropertyPanel />
<ElementList />
<LayerPanel />
```

验收标准：

```txt
1. React demo 可以创建模板
2. 可以拖拽元素
3. 可以修改属性
4. 可以预览
5. 可以打印
6. React 层没有复制 core 逻辑
```

---

### Phase 8：Vue 胶水层

目标：**复用 core 和 designer store，只换 Vue 绑定。**

包名：

```txt
@hiprint-re/vue
@hiprint-re/designer-vue
```

Vue 提供：

```ts
export function usePrintEngine(options?: PrintEngineOptions): PrintEngine;

export function usePrintDesigner(options?: DesignerOptions): {
  engine: PrintEngine;
  template: Ref<PrintTemplate>;
  selectedIds: Ref<string[]>;
  commands: DesignerCommands;
};
```

组件：

```txt
<PrintDesigner />
<PrintPreview />
<PrintToolbar />
<PrintCanvas />
<PropertyPanel />
<ElementList />
<LayerPanel />
```

验收标准：

```txt
1. Vue demo 和 React demo 功能对齐
2. 共享 fixtures
3. 共享 core 测试
4. Vue 层不包含业务核心
```

---

## 五、建议优先级

我建议按这个优先级做：

```txt
P0：legacy 封装 + demo + fixtures
P0：schema/model 抽离
P0：旧模板到新 schema 的转换
P1：layout engine
P1：DOM renderer
P1：React preview
P2：designer state
P2：React designer
P2：Vue preview
P3：Vue designer
P3：插件市场/高级元素
P3：PDF/Canvas/SVG renderer
```

不要一开始就做 Vue + React + 插件市场 + PDF。这样会失控。

---

## 六、第一轮重构分支建议

可以开这个分支：

```txt
refactor/core-architecture
```

第一轮只做这些：

```txt
1. 新建 pnpm workspace
2. 新建 packages/legacy
3. 新建 packages/core
4. 新建 apps/playground-legacy
5. 新建 fixtures
6. 把现有反解析产物包进 legacy
7. 定义 PrintTemplate / PrintElement / PaperConfig 类型
8. 写 legacy template -> core schema 的转换器
9. 写 3-5 个模板 fixture
10. 写 vitest 快照测试
```

第一轮不要碰复杂 UI。

---

## 七、最关键的风险点

### 1. 反编译代码不能直接维护

反编译代码通常会有这些问题：

```txt
1. 变量名无语义
2. 模块边界消失
3. 全局状态很多
4. this 指向复杂
5. 原型链/闭包依赖不清晰
6. 业务逻辑和 DOM 操作混在一起
7. polyfill / vendor / 业务代码混在一起
```

所以不要直接在反编译代码上堆 React/Vue。

正确方式是：

```txt
legacy 稳住行为
core 重建模型
adapter 兼容旧模板
renderer 逐步替代 legacy
```

---

### 2. license 风险

如果这是对闭源或授权不明确项目的反编译，后续公开发布要谨慎。

建议：

```txt
1. 不直接复用原项目名称
2. 不直接发布原始 bundle
3. docs 里说明来源和用途
4. core 尽量重写而不是搬运
5. 保留 reverse 过程仅作分析，不作为最终 npm 包主体
```

如果只是个人研究问题不大；如果要公开发 npm 或商用，必须认真看授权。

---

### 3. 表格是最大复杂点

打印系统里最麻烦的通常不是文本或图片，而是表格：

```txt
1. 表头重复
2. 表格分页
3. 单元格合并
4. 动态行高
5. 字段绑定
6. 空数据处理
7. 汇总行
8. 嵌套字段
9. 跨页边框
```

所以 `table` 不建议第一版就完全重写。可以先 legacy fallback：

```txt
text/image/shape 先走新 core
table 暂时走 legacy
后续再单独迁移 table engine
```

---

## 八、推荐的里程碑版本

### v0.1.0：可运行的 legacy 包

```txt
- legacy 封装完成
- playground-legacy 可运行
- fixtures 建立
- 基础文档完成
```

### v0.2.0：core schema 完成

```txt
- PrintTemplate 类型完成
- schema 校验完成
- legacy -> core 转换完成
- core -> legacy 转换完成
```

### v0.3.0：layout engine 初版

```txt
- 纸张模型
- 单位转换
- 元素布局
- 基础分页
- 文本/图片/线条布局
```

### v0.4.0：DOM renderer 初版

```txt
- renderToHtml
- preview
- browser print
- 截图回归测试
```

### v0.5.0：React preview

```txt
- usePrintEngine
- PrintPreview
- React playground
```

### v0.6.0：React designer MVP

```txt
- 画布
- 元素拖拽
- 属性面板
- undo/redo
- 模板导入导出
```

### v0.7.0：Vue preview

```txt
- usePrintEngine
- PrintPreview
- Vue playground
```

### v0.8.0：Vue designer MVP

```txt
- Vue 设计器
- 和 React 功能基本对齐
```

### v1.0.0：稳定版

```txt
- core API 稳定
- schema version 稳定
- React/Vue 适配稳定
- 文档完善
- 有迁移指南
```

---

## 九、你现在最应该做的 10 个 TODO

```txt
1. 建立 monorepo
2. 把当前反解析产物放入 packages/legacy/vendor
3. 做 playground-legacy，保证原行为可运行
4. 整理 3-5 个真实打印模板作为 fixtures
5. 定义 PrintTemplate schema v0.1
6. 写 legacy template -> core schema 转换器
7. 写 core schema -> legacy template 转换器
8. 抽 text/image/line/rect 四类最简单元素
9. 写 layout engine 的最小版本
10. 做 React PrintPreview，不要先做完整 designer
```

---

## 十、整体判断

这个项目应该按“**重建内核，兼容旧模板，逐步替代 legacy**”来做。

最稳路线是：

```txt
反编译产物
  ↓
legacy 可运行封装
  ↓
schema/model 抽离
  ↓
layout engine
  ↓
DOM renderer
  ↓
React/Vue preview
  ↓
React/Vue designer
  ↓
插件化元素系统
```

不要按：

```txt
反编译代码
  ↓
直接改 React/Vue 组件
  ↓
越改越乱
```

这个方向很容易变成不可维护的二次混淆项目。你的核心目标应该是：**让反解析代码逐步退出主流程，而不是继续成为主流程。**
