下面给你一版 **Phase 10：Plugin System / Custom Elements / Barcode / QRCode** 的详细设计与代码草案。

Phase 10 的定位是：

```txt
Phase 8：设计器具备 schema 驱动和 registry 基础
Phase 9：高级 Table Editor
Phase 10：插件系统 + 自定义元素 + 条码/二维码/HTML 元素
```

这一阶段的核心目标是：**让元素能力从“内置写死”升级为“插件注册”。**

---

# 1. Phase 10 总目标

Phase 10 要完成：

```txt
1. 新增插件协议 Plugin API
2. 支持插件注册 ElementDefinition
3. 支持插件注册 PropertySchema
4. 支持插件注册 DOM renderer
5. 支持插件注册 Designer inspector / toolbar 扩展点基础
6. 内置 barcode 插件
7. 内置 qrcode 插件
8. 内置 html 插件
9. 内置 custom-text / amount-uppercase 这类业务元素示例
10. designer-react 支持 plugins 参数
11. dom renderer 支持自定义元素 renderer
12. core layout 支持 plugin element layout fallback
13. 增加 plugin playground
14. 增加 plugin docs
```

最终使用形态：

```tsx
import { PrintDesigner } from "@hiprint-re/designer-react";
import { barcodePlugin, qrcodePlugin } from "@hiprint-re/plugins-basic";

export function App() {
  return (
    <PrintDesigner
      template={template}
      templateKind="core"
      data={data}
      plugins={[barcodePlugin(), qrcodePlugin()]}
    />
  );
}
```

---

# 2. Phase 10 不做什么

Phase 10 先做本地插件，不做远程插件市场。

暂时不做：

```txt
不做远程插件下载
不做插件沙箱隔离
不做插件权限系统
不做 npm 在线插件市场
不做 wasm 插件
不做 iframe sandbox 插件运行
不做在线安装/卸载 UI
不做插件热更新
```

也就是说，Phase 10 的插件是：

```txt
应用代码静态 import 插件
  ↓
传给 PrintDesigner / renderer
  ↓
插件注册元素、属性和渲染器
```

而不是：

```txt
运行时从远程市场下载插件
```

---

# 3. Phase 10 推荐包结构

新增两个包：

```txt
packages/
├─ plugin/
│  ├─ package.json
│  ├─ tsconfig.json
│  └─ src/
│     ├─ index.ts
│     ├─ types.ts
│     ├─ createPlugin.ts
│     ├─ pluginManager.ts
│     └─ validatePlugin.ts
│
└─ plugins-basic/
   ├─ package.json
   ├─ tsconfig.json
   └─ src/
      ├─ index.ts
      ├─ barcode/
      │  ├─ barcodePlugin.ts
      │  ├─ barcodeElement.ts
      │  ├─ barcodeRenderer.ts
      │  └─ encodeCode128.ts
      ├─ qrcode/
      │  ├─ qrcodePlugin.ts
      │  ├─ qrcodeElement.ts
      │  └─ qrcodeRenderer.ts
      ├─ html/
      │  ├─ htmlPlugin.ts
      │  ├─ htmlElement.ts
      │  └─ htmlRenderer.ts
      └─ amount/
         ├─ amountUppercasePlugin.ts
         └─ amountUppercaseElement.ts
```

已有包需要增强：

```txt
packages/core
├─ src/plugin/
│  └─ pluginElement.ts

packages/dom
├─ src/plugin/
│  ├─ domRendererRegistry.ts
│  └─ renderPluginElement.ts

packages/designer-react
├─ src/plugin/
│  ├─ DesignerPluginProvider.tsx
│  └─ useDesignerPlugins.ts
```

---

# 4. 插件整体架构

```txt
Plugin
  ├─ name
  ├─ version
  ├─ elements[]
  ├─ domRenderers[]
  ├─ designerExtensions?
  └─ setup?

ElementDefinition
  ├─ type
  ├─ name
  ├─ createElement()
  ├─ propertySchema
  └─ layout?

DOM Renderer
  ├─ type
  └─ render(element, ctx)

Designer
  ├─ palette 自动读取 element definitions
  ├─ property panel 自动读取 propertySchema
  └─ canvas 通过 dom renderer 渲染插件元素
```

核心流转：

```txt
plugins
  ↓
PluginManager
  ↓
ElementRegistry
  ↓
Designer Palette / Property Panel
  ↓
Core Layout
  ↓
DOM Renderer Registry
  ↓
Preview / Print
```

---

# 5. `@hiprint-re/plugin` 设计

## `packages/plugin/package.json`

```json
{
  "name": "@hiprint-re/plugin",
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
    "@hiprint-re/dom": "workspace:*"
  }
}
```

---

## `packages/plugin/src/types.ts`

```ts
import type { ElementDefinition, PrintElement } from "@hiprint-re/core";
import type { DomRenderContext } from "@hiprint-re/dom";

export interface HiprintPlugin {
  name: string;
  version: string;
  description?: string;

  elements?: ElementDefinition[];
  domRenderers?: PluginDomRenderer[];

  designer?: PluginDesignerExtension;

  setup?: (ctx: PluginSetupContext) => void;
}

export interface PluginSetupContext {
  registerElement: (definition: ElementDefinition) => void;
  registerDomRenderer: (renderer: PluginDomRenderer) => void;
}

export interface PluginDomRenderer<
  TElement extends PrintElement = PrintElement,
> {
  type: string;
  render: (element: TElement, ctx: DomRenderContext) => HTMLElement;
}

export interface PluginDesignerExtension {
  toolbarItems?: PluginToolbarItem[];
}

export interface PluginToolbarItem {
  id: string;
  label: string;
  action: string;
}
```

---

## `packages/plugin/src/createPlugin.ts`

```ts
import type { HiprintPlugin } from "./types";

export function createPlugin(plugin: HiprintPlugin): HiprintPlugin {
  return plugin;
}
```

---

## `packages/plugin/src/pluginManager.ts`

```ts
import {
  createElementRegistry,
  builtinElementDefinitions,
  type ElementDefinition,
  type ElementRegistry,
} from "@hiprint-re/core";
import type { HiprintPlugin, PluginDomRenderer } from "./types";

export class PluginManager {
  private plugins: HiprintPlugin[] = [];
  private elementDefinitions: ElementDefinition[] = [
    ...builtinElementDefinitions,
  ];
  private domRenderers = new Map<string, PluginDomRenderer>();

  register(plugin: HiprintPlugin): void {
    if (this.plugins.some((item) => item.name === plugin.name)) {
      throw new Error(`[hiprint-re/plugin] Duplicate plugin: ${plugin.name}`);
    }

    this.plugins.push(plugin);

    for (const element of plugin.elements ?? []) {
      this.registerElement(element);
    }

    for (const renderer of plugin.domRenderers ?? []) {
      this.registerDomRenderer(renderer);
    }

    plugin.setup?.({
      registerElement: (definition) => this.registerElement(definition),
      registerDomRenderer: (renderer) => this.registerDomRenderer(renderer),
    });
  }

  registerElement(definition: ElementDefinition): void {
    if (this.elementDefinitions.some((item) => item.type === definition.type)) {
      return;
    }

    this.elementDefinitions.push(definition);
  }

  registerDomRenderer(renderer: PluginDomRenderer): void {
    if (this.domRenderers.has(renderer.type)) {
      return;
    }

    this.domRenderers.set(renderer.type, renderer);
  }

  createElementRegistry(): ElementRegistry {
    return createElementRegistry(this.elementDefinitions);
  }

  getDomRenderer(type: string): PluginDomRenderer | undefined {
    return this.domRenderers.get(type);
  }

  getPlugins(): HiprintPlugin[] {
    return [...this.plugins];
  }

  getElementDefinitions(): ElementDefinition[] {
    return [...this.elementDefinitions];
  }

  getDomRenderers(): PluginDomRenderer[] {
    return [...this.domRenderers.values()];
  }
}

export function createPluginManager(
  plugins: HiprintPlugin[] = [],
): PluginManager {
  const manager = new PluginManager();

  for (const plugin of plugins) {
    manager.register(plugin);
  }

  return manager;
}
```

> **设计说明 — 静默跳过策略**：`registerElement` 和 `registerDomRenderer` 对重复注册采用静默跳过而非抛错。这是刻意的权衡——允许多个插件包共存于同一应用而不崩溃，代价是第一个注册的版本生效。`register` 层面的插件名重复仍会报错。

---

## `packages/plugin/src/validatePlugin.ts`

```ts
import type { HiprintPlugin } from "./types";

export function validatePlugin(plugin: HiprintPlugin): void {
  if (!plugin.name) {
    throw new Error("[hiprint-re/plugin] Plugin name is required.");
  }

  if (!plugin.version) {
    throw new Error("[hiprint-re/plugin] Plugin version is required.");
  }

  const elementTypes = new Set<string>();

  for (const element of plugin.elements ?? []) {
    if (elementTypes.has(element.type)) {
      throw new Error(
        `[hiprint-re/plugin] Duplicate element type in plugin "${plugin.name}": ${element.type}`,
      );
    }

    elementTypes.add(element.type);
  }
}
```

---

## `packages/plugin/src/index.ts`

```ts
export * from "./types";
export * from "./createPlugin";
export * from "./pluginManager";
export * from "./validatePlugin";
```

---

# 6. Core：支持 Plugin Element

目前 `PrintElementType` 是 union：

```ts
"text" | "image" | "table" | ...
```

插件元素类型不可能都提前写进去，所以 Phase 10 要放宽。

## `packages/core/src/types/element.ts` 修改

```ts
export type BuiltinPrintElementType =
  | "text"
  | "image"
  | "table"
  | "line"
  | "rect"
  | "barcode"
  | "qrcode"
  | "html"
  | "unknown";

export type PrintElementType = BuiltinPrintElementType | string;
```

这样插件可以注册：

```txt
plugin:signature
plugin:amount-uppercase
business:order-total
```

---

## 插件元素命名规范

建议文档里规定：

```txt
内置元素：
text
image
table
line
rect

基础插件元素：
barcode
qrcode
html

第三方/业务元素：
plugin:<name>
business:<name>
```

例如：

```txt
business:amount-uppercase
business:seal
business:signature
```

---

# 7. Core Layout：插件元素 fallback

Phase 3 的 `layoutElement` 对未知类型输出 unknown。
Phase 10 可以先不让插件参与 layout 算法，默认插件元素采用普通矩形布局。

## `packages/core/src/layout/layoutPluginElement.ts`

```ts
import type { PrintElement } from "../types/element";
import type { LayoutElement } from "./types";
import type { LayoutElementInput } from "./layoutElement";
import { normalizeYInPage } from "./utils";

export function layoutPluginElement(input: LayoutElementInput): LayoutElement {
  const { panel, element, pageIndex, pageHeight } = input;

  return {
    id: element.id,
    sourcePanelId: panel.id,
    sourceElementId: element.id,
    pageIndex,
    type: element.type,
    x: element.x,
    y: normalizeYInPage(element.y, pageHeight),
    width: element.width,
    height: element.height,
    hidden: element.hidden,
    style: element.style,
    raw: element.raw,
  };
}
```

然后在 `layoutElement.ts` 的 default 分支改成：

```ts
default:
  return [layoutPluginElement(input)]
```

这样插件元素能正常出现在 layout 里。

---

# 8. DOM：Renderer Registry

Phase 4 的 `renderElement` 是 switch 写死。Phase 10 要支持外部 renderer。

## `packages/dom/src/plugin/domRendererRegistry.ts`

```ts
import type { LayoutElement } from "@hiprint-re/core";
import type { DomRenderContext } from "../types";

export interface DomElementRenderer<T extends LayoutElement = LayoutElement> {
  type: string;
  render: (element: T, ctx: DomRenderContext) => HTMLElement;
}

export class DomRendererRegistry {
  private renderers = new Map<string, DomElementRenderer>();

  register(renderer: DomElementRenderer): void {
    this.renderers.set(renderer.type, renderer);
  }

  get(type: string): DomElementRenderer | undefined {
    return this.renderers.get(type);
  }

  has(type: string): boolean {
    return this.renderers.has(type);
  }

  list(): DomElementRenderer[] {
    return [...this.renderers.values()];
  }
}

export function createDomRendererRegistry(
  renderers: DomElementRenderer[] = [],
): DomRendererRegistry {
  const registry = new DomRendererRegistry();

  for (const renderer of renderers) {
    registry.register(renderer);
  }

  return registry;
}
```

---

## `packages/dom/src/types.ts` 增强

```ts
import type { DomElementRenderer } from "./plugin/domRendererRegistry";

export interface DomRenderOptions {
  document?: Document;
  classNamePrefix?: string;
  injectDefaultStyle?: boolean;
  pageGap?: number;
  geometryUnit?: "mm" | "px";
  typographyUnit?: "px" | "pt" | "mm";
  resolveImageSrc?: (src: string | undefined) => string | undefined;
  renderUnknown?: boolean;
  className?: string;

  /**
   * Plugin DOM renderers.
   */
  renderers?: DomElementRenderer[];
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
  renderers: DomElementRenderer[];
}
```

`resolveOptions` 里补：

```ts
renderers: options.renderers ?? [],
```

---

## `packages/dom/src/renderers/renderElement.ts` 修改

```ts
import type { LayoutElement, LayoutPage } from "@hiprint-re/core";
import type { DomRenderContext } from "../types";
import { createDomRendererRegistry } from "../plugin/domRendererRegistry";
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
  }

  const registry = createDomRendererRegistry(ctx.options.renderers);
  const pluginRenderer = registry.get(element.type);

  if (pluginRenderer) {
    return pluginRenderer.render(element, ctx);
  }

  return ctx.options.renderUnknown ? renderUnknown(element, page, ctx) : null;
}
```

---

# 9. Designer React：plugins 参数

## `PrintDesignerProps` 增强

```ts
import type { HiprintPlugin } from "@hiprint-re/plugin";

export interface PrintDesignerProps {
  template: DesignerTemplateInput;
  templateKind?: DesignerTemplateKind;
  data?: unknown;

  plugins?: HiprintPlugin[];

  layoutOptions?: LayoutOptions;
  domOptions?: DomRenderOptions;

  className?: string;
  style?: React.CSSProperties;

  readonly?: boolean;

  onChange?: (template: PrintTemplate) => void;
  onLayout?: (layout: LayoutDocument) => void;
  onError?: (error: Error) => void;
}
```

---

## `DesignerPluginProvider`

### `packages/designer-react/src/plugin/DesignerPluginProvider.tsx`

```tsx
import { createContext, useContext, useMemo } from "react";
import {
  createPluginManager,
  type HiprintPlugin,
  type PluginManager,
} from "@hiprint-re/plugin";

const DesignerPluginContext = createContext<PluginManager | null>(null);

export interface DesignerPluginProviderProps {
  plugins?: HiprintPlugin[];
  children: React.ReactNode;
}

export function DesignerPluginProvider(props: DesignerPluginProviderProps) {
  const manager = useMemo(
    () => createPluginManager(props.plugins ?? []),
    [props.plugins],
  );

  return (
    <DesignerPluginContext.Provider value={manager}>
      {props.children}
    </DesignerPluginContext.Provider>
  );
}

export function useDesignerPluginManager(): PluginManager {
  const manager = useContext(DesignerPluginContext);

  if (!manager) {
    throw new Error(
      "[hiprint-re/designer-react] DesignerPluginProvider is missing.",
    );
  }

  return manager;
}
```

---

## 修改 `PrintDesigner`

```tsx
import { DesignerPluginProvider } from "../plugin/DesignerPluginProvider";
import { DesignerRegistryProvider } from "../registry/DesignerRegistryContext";
import { DesignerProvider } from "../context/DesignerProvider";
import type { PrintDesignerProps } from "../types";
import { DesignerShell } from "./DesignerShell";
import "../style/designer.css";

export function PrintDesigner(props: PrintDesignerProps) {
  return (
    <DesignerPluginProvider plugins={props.plugins}>
      <DesignerRegistryProvider>
        <DesignerProvider {...props}>
          <DesignerShell className={props.className} style={props.style} />
        </DesignerProvider>
      </DesignerRegistryProvider>
    </DesignerPluginProvider>
  );
}
```

---

## 修改 `DesignerRegistryProvider`

从 pluginManager 读取 elementDefinitions。

```tsx
import { createContext, useContext, useMemo } from "react";
import type { ElementRegistry } from "@hiprint-re/core";
import { useDesignerPluginManager } from "../plugin/DesignerPluginProvider";

export const DesignerRegistryContext = createContext<ElementRegistry | null>(
  null,
);

export interface DesignerRegistryProviderProps {
  children: React.ReactNode;
}

export function DesignerRegistryProvider(props: DesignerRegistryProviderProps) {
  const pluginManager = useDesignerPluginManager();

  const registry = useMemo(() => {
    return pluginManager.createElementRegistry();
  }, [pluginManager]);

  return (
    <DesignerRegistryContext.Provider value={registry}>
      {props.children}
    </DesignerRegistryContext.Provider>
  );
}

export function useDesignerRegistry(): ElementRegistry {
  const registry = useContext(DesignerRegistryContext);

  if (!registry) {
    throw new Error(
      "[hiprint-re/designer-react] DesignerRegistryProvider is missing.",
    );
  }

  return registry;
}
```

---

## 修改 `DesignerCanvas` 的 `mountLayout`

把插件 renderer 传给 dom：

```tsx
import { useDesignerPluginManager } from "../plugin/DesignerPluginProvider";

const pluginManager = useDesignerPluginManager();

mountRef.current = mountLayout(layout, container, {
  ...ctx.domOptions,
  pageGap: 24,
  renderers: [
    ...(ctx.domOptions?.renderers ?? []),
    ...pluginManager.getDomRenderers(),
  ],
});
```

---

# 10. `@hiprint-re/plugins-basic`

这个包提供基础插件：

```txt
barcodePlugin
qrcodePlugin
htmlPlugin
amountUppercasePlugin
```

---

## `packages/plugins-basic/package.json`

```json
{
  "name": "@hiprint-re/plugins-basic",
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
    "@hiprint-re/dom": "workspace:*",
    "@hiprint-re/plugin": "workspace:*"
  }
}
```

---

# 11. Barcode 插件

Phase 10 可以先做简化版 Code128-like 可视化，不追求完整工业级编码。
如果后面要严肃支持条码标准，可以再接入成熟编码器或自己完整实现 Code128/EAN13。

## `packages/plugins-basic/src/barcode/barcodeElement.ts`

```ts
import { createPropertySchema, type ElementDefinition } from "@hiprint-re/core";

export const barcodeElementDefinition: ElementDefinition = {
  type: "barcode",
  name: "Barcode",
  builtin: true,
  defaultWidth: 60,
  defaultHeight: 20,

  propertySchema: createPropertySchema({
    groups: [
      {
        key: "geometry",
        label: "Geometry",
      },
      {
        key: "data",
        label: "Data",
      },
      {
        key: "barcode",
        label: "Barcode",
      },
    ],
    fields: [
      {
        key: "x",
        label: "X",
        type: "number",
        group: "geometry",
      },
      {
        key: "y",
        label: "Y",
        type: "number",
        group: "geometry",
      },
      {
        key: "width",
        label: "Width",
        type: "number",
        group: "geometry",
      },
      {
        key: "height",
        label: "Height",
        type: "number",
        group: "geometry",
      },
      {
        key: "binding.field",
        label: "Field",
        type: "field",
        group: "data",
      },
      {
        key: "options.value",
        label: "Value",
        type: "text",
        group: "data",
      },
      {
        key: "options.format",
        label: "Format",
        type: "select",
        group: "barcode",
        options: [
          {
            label: "Code128",
            value: "code128",
          },
        ],
      },
      {
        key: "options.showText",
        label: "Show Text",
        type: "boolean",
        group: "barcode",
        defaultValue: true,
      },
    ],
  }),

  createElement(input) {
    return {
      id: input.id,
      type: "barcode",
      x: input.x,
      y: input.y,
      width: 60,
      height: 20,
      binding: {
        title: "Barcode",
      },
      options: {
        value: "1234567890",
        format: "code128",
        showText: true,
      },
    };
  },
};
```

---

## 简化 barcode 编码

### `packages/plugins-basic/src/barcode/encodeCode128.ts`

```ts
export interface BarcodeBar {
  x: number;
  width: number;
}

export function encodePseudoCode128(value: string): BarcodeBar[] {
  /**
   * 这是 MVP 级伪编码：只保证稳定生成条纹，不保证符合真实 Code128 标准。
   * 后续严肃打印条码时，要替换成完整编码器。
   */
  const bars: BarcodeBar[] = [];
  let x = 0;

  for (const char of value) {
    const code = char.charCodeAt(0);

    for (let bit = 0; bit < 7; bit++) {
      const on = (code >> bit) & 1;
      const width = on ? 2 : 1;

      if (on) {
        bars.push({
          x,
          width,
        });
      }

      x += width + 1;
    }
  }

  return bars;
}
```

---

## `packages/plugins-basic/src/barcode/barcodeRenderer.ts`

```ts
import type { LayoutElement } from "@hiprint-re/core";
import type { PluginDomRenderer } from "@hiprint-re/plugin";
import type { DomRenderContext } from "@hiprint-re/dom";
import { cssLength } from "@hiprint-re/dom";
import { encodePseudoCode128 } from "./encodeCode128";

export const barcodeDomRenderer: PluginDomRenderer<LayoutElement> = {
  type: "barcode",

  render(element, ctx) {
    const doc = ctx.document;
    const unit = ctx.options.geometryUnit;
    const prefix = ctx.options.classNamePrefix;

    const root = doc.createElement("div");
    root.className = `${prefix}-element ${prefix}-barcode`;
    root.dataset.elementId = element.id;
    root.dataset.elementType = "barcode";

    root.style.position = "absolute";
    root.style.left = cssLength(element.x, unit);
    root.style.top = cssLength(element.y, unit);
    root.style.width = cssLength(element.width, unit);
    root.style.height = cssLength(element.height, unit);
    root.style.overflow = "hidden";

    const value = resolveBarcodeValue(element);
    const svg = createBarcodeSvg(doc, value, element.width, element.height);

    root.appendChild(svg);

    return root;
  },
};

function resolveBarcodeValue(element: LayoutElement): string {
  const rawElement = element.raw?.legacyElement as any;
  const options = rawElement?.options ?? element.raw?.options ?? {};

  return String(options.value ?? options.text ?? element.id);
}

function createBarcodeSvg(
  doc: Document,
  value: string,
  width: number,
  height: number,
): SVGSVGElement {
  const svg = doc.createElementNS("http://www.w3.org/2000/svg", "svg");

  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

  const bars = encodePseudoCode128(value);
  const totalWidth = Math.max(...bars.map((bar) => bar.x + bar.width), 1);

  const scale = width / totalWidth;

  for (const bar of bars) {
    const rect = doc.createElementNS("http://www.w3.org/2000/svg", "rect");

    rect.setAttribute("x", String(bar.x * scale));
    rect.setAttribute("y", "0");
    rect.setAttribute("width", String(bar.width * scale));
    rect.setAttribute("height", String(height * 0.78));
    rect.setAttribute("fill", "#000");

    svg.appendChild(rect);
  }

  const text = doc.createElementNS("http://www.w3.org/2000/svg", "text");

  text.textContent = value;
  text.setAttribute("x", String(width / 2));
  text.setAttribute("y", String(height - 1));
  text.setAttribute("font-size", "3");
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("fill", "#000");

  svg.appendChild(text);

  return svg;
}
```

> 注意：上面 barcode 是 MVP 伪编码。真实商用条码需要完整 Code128/EAN13 编码和校验位。

---

## `packages/plugins-basic/src/barcode/barcodePlugin.ts`

```ts
import { createPlugin } from "@hiprint-re/plugin";
import { barcodeElementDefinition } from "./barcodeElement";
import { barcodeDomRenderer } from "./barcodeRenderer";

export function barcodePlugin() {
  return createPlugin({
    name: "@hiprint-re/plugin-barcode",
    version: "0.0.0",
    description: "Builtin barcode element plugin.",
    elements: [barcodeElementDefinition],
    domRenderers: [barcodeDomRenderer],
  });
}
```

---

# 12. QRCode 插件

QRCode 完整编码比条码复杂。Phase 10 可以做两种策略：

```txt
MVP：生成占位式 QR 网格，保证设计器流程跑通
后续：替换为完整 QR encoder
```

## `packages/plugins-basic/src/qrcode/qrcodeElement.ts`

```ts
import { createPropertySchema, type ElementDefinition } from "@hiprint-re/core";

export const qrcodeElementDefinition: ElementDefinition = {
  type: "qrcode",
  name: "QRCode",
  builtin: true,
  defaultWidth: 30,
  defaultHeight: 30,

  propertySchema: createPropertySchema({
    groups: [
      {
        key: "geometry",
        label: "Geometry",
      },
      {
        key: "data",
        label: "Data",
      },
      {
        key: "qrcode",
        label: "QRCode",
      },
    ],
    fields: [
      {
        key: "x",
        label: "X",
        type: "number",
        group: "geometry",
      },
      {
        key: "y",
        label: "Y",
        type: "number",
        group: "geometry",
      },
      {
        key: "width",
        label: "Width",
        type: "number",
        group: "geometry",
      },
      {
        key: "height",
        label: "Height",
        type: "number",
        group: "geometry",
      },
      {
        key: "binding.field",
        label: "Field",
        type: "field",
        group: "data",
      },
      {
        key: "options.value",
        label: "Value",
        type: "text",
        group: "data",
      },
      {
        key: "options.errorCorrectionLevel",
        label: "Error Correction",
        type: "select",
        group: "qrcode",
        options: [
          {
            label: "L",
            value: "L",
          },
          {
            label: "M",
            value: "M",
          },
          {
            label: "Q",
            value: "Q",
          },
          {
            label: "H",
            value: "H",
          },
        ],
      },
    ],
  }),

  createElement(input) {
    return {
      id: input.id,
      type: "qrcode",
      x: input.x,
      y: input.y,
      width: 30,
      height: 30,
      options: {
        value: "https://example.com",
        errorCorrectionLevel: "M",
      },
    };
  },
};
```

---

## `packages/plugins-basic/src/qrcode/qrcodeRenderer.ts`

```ts
import type { LayoutElement } from "@hiprint-re/core";
import type { PluginDomRenderer } from "@hiprint-re/plugin";
import { cssLength } from "@hiprint-re/dom";

export const qrcodeDomRenderer: PluginDomRenderer<LayoutElement> = {
  type: "qrcode",

  render(element, ctx) {
    const doc = ctx.document;
    const unit = ctx.options.geometryUnit;
    const prefix = ctx.options.classNamePrefix;

    const root = doc.createElement("div");
    root.className = `${prefix}-element ${prefix}-qrcode`;
    root.dataset.elementId = element.id;
    root.dataset.elementType = "qrcode";

    root.style.position = "absolute";
    root.style.left = cssLength(element.x, unit);
    root.style.top = cssLength(element.y, unit);
    root.style.width = cssLength(element.width, unit);
    root.style.height = cssLength(element.height, unit);

    const value = resolveQRCodeValue(element);
    const svg = createPseudoQrSvg(doc, value);

    root.appendChild(svg);

    return root;
  },
};

function resolveQRCodeValue(element: LayoutElement): string {
  const rawElement = element.raw?.legacyElement as any;
  const options = rawElement?.options ?? element.raw?.options ?? {};

  return String(options.value ?? element.id);
}

function createPseudoQrSvg(doc: Document, value: string): SVGSVGElement {
  /**
   * MVP 占位 QR：稳定生成矩阵，但不是可扫描二维码。
   * 后续需要替换为完整 QR encoder。
   */
  const size = 21;
  const svg = doc.createElementNS("http://www.w3.org/2000/svg", "svg");

  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("viewBox", `0 0 ${size} ${size}`);

  const bg = doc.createElementNS("http://www.w3.org/2000/svg", "rect");
  bg.setAttribute("x", "0");
  bg.setAttribute("y", "0");
  bg.setAttribute("width", String(size));
  bg.setAttribute("height", String(size));
  bg.setAttribute("fill", "#fff");
  svg.appendChild(bg);

  const seed = hash(value);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (isFinder(x, y, size) || shouldFill(seed, x, y)) {
        const rect = doc.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", String(x));
        rect.setAttribute("y", String(y));
        rect.setAttribute("width", "1");
        rect.setAttribute("height", "1");
        rect.setAttribute("fill", "#000");
        svg.appendChild(rect);
      }
    }
  }

  return svg;
}

function hash(value: string): number {
  let result = 0;

  for (const char of value) {
    result = (result * 31 + char.charCodeAt(0)) >>> 0;
  }

  return result;
}

function shouldFill(seed: number, x: number, y: number): boolean {
  return (seed + x * 17 + y * 31) % 5 < 2;
}

function isFinder(x: number, y: number, size: number): boolean {
  return (
    inFinder(x, y, 0, 0) ||
    inFinder(x, y, size - 7, 0) ||
    inFinder(x, y, 0, size - 7)
  );
}

function inFinder(
  x: number,
  y: number,
  startX: number,
  startY: number,
): boolean {
  const localX = x - startX;
  const localY = y - startY;

  if (localX < 0 || localY < 0 || localX >= 7 || localY >= 7) {
    return false;
  }

  return (
    localX === 0 ||
    localY === 0 ||
    localX === 6 ||
    localY === 6 ||
    (localX >= 2 && localX <= 4 && localY >= 2 && localY <= 4)
  );
}
```

---

## `packages/plugins-basic/src/qrcode/qrcodePlugin.ts`

```ts
import { createPlugin } from "@hiprint-re/plugin";
import { qrcodeElementDefinition } from "./qrcodeElement";
import { qrcodeDomRenderer } from "./qrcodeRenderer";

export function qrcodePlugin() {
  return createPlugin({
    name: "@hiprint-re/plugin-qrcode",
    version: "0.0.0",
    description: "Builtin QRCode element plugin.",
    elements: [qrcodeElementDefinition],
    domRenderers: [qrcodeDomRenderer],
  });
}
```

---

# 13. HTML 插件

HTML 元素有安全风险，必须默认明确：**只适合可信模板和可信数据**。

## `packages/plugins-basic/src/html/htmlElement.ts`

```ts
import { createPropertySchema, type ElementDefinition } from "@hiprint-re/core";

export const htmlElementDefinition: ElementDefinition = {
  type: "html",
  name: "HTML",
  builtin: true,
  defaultWidth: 80,
  defaultHeight: 30,

  propertySchema: createPropertySchema({
    groups: [
      {
        key: "geometry",
        label: "Geometry",
      },
      {
        key: "content",
        label: "Content",
      },
    ],
    fields: [
      {
        key: "x",
        label: "X",
        type: "number",
        group: "geometry",
      },
      {
        key: "y",
        label: "Y",
        type: "number",
        group: "geometry",
      },
      {
        key: "width",
        label: "Width",
        type: "number",
        group: "geometry",
      },
      {
        key: "height",
        label: "Height",
        type: "number",
        group: "geometry",
      },
      {
        key: "options.html",
        label: "HTML",
        type: "textarea",
        group: "content",
      },
      {
        key: "options.sandbox",
        label: "Sandbox",
        type: "boolean",
        group: "content",
        defaultValue: true,
      },
    ],
  }),

  createElement(input) {
    return {
      id: input.id,
      type: "html",
      x: input.x,
      y: input.y,
      width: 80,
      height: 30,
      options: {
        html: "<strong>HTML</strong>",
        sandbox: true,
      },
    };
  },
};
```

---

## `packages/plugins-basic/src/html/htmlRenderer.ts`

```ts
import type { LayoutElement } from "@hiprint-re/core";
import type { PluginDomRenderer } from "@hiprint-re/plugin";
import { cssLength } from "@hiprint-re/dom";

export const htmlDomRenderer: PluginDomRenderer<LayoutElement> = {
  type: "html",

  render(element, ctx) {
    const doc = ctx.document;
    const unit = ctx.options.geometryUnit;
    const prefix = ctx.options.classNamePrefix;

    const root = doc.createElement("div");
    root.className = `${prefix}-element ${prefix}-html`;
    root.dataset.elementId = element.id;
    root.dataset.elementType = "html";

    root.style.position = "absolute";
    root.style.left = cssLength(element.x, unit);
    root.style.top = cssLength(element.y, unit);
    root.style.width = cssLength(element.width, unit);
    root.style.height = cssLength(element.height, unit);
    root.style.overflow = "hidden";

    const html = resolveHtml(element);

    /**
     * 注意：
     * html element 只适合可信模板。
     * 如果要支持不可信输入，需要额外 sanitizer。
     */
    root.innerHTML = html;

    return root;
  },
};

function resolveHtml(element: LayoutElement): string {
  const rawElement = element.raw?.legacyElement as any;
  const options = rawElement?.options ?? element.raw?.options ?? {};

  return String(options.html ?? "");
}
```

---

## `packages/plugins-basic/src/html/htmlPlugin.ts`

```ts
import { createPlugin } from "@hiprint-re/plugin";
import { htmlElementDefinition } from "./htmlElement";
import { htmlDomRenderer } from "./htmlRenderer";

export function htmlPlugin() {
  return createPlugin({
    name: "@hiprint-re/plugin-html",
    version: "0.0.0",
    description: "Trusted HTML element plugin.",
    elements: [htmlElementDefinition],
    domRenderers: [htmlDomRenderer],
  });
}
```

---

# 14. 金额大写业务插件示例

这是一个很适合展示插件系统价值的业务元素。

## `packages/plugins-basic/src/amount/amountUppercaseElement.ts`

```ts
import { createPropertySchema, type ElementDefinition } from "@hiprint-re/core";

export const amountUppercaseElementDefinition: ElementDefinition = {
  type: "business:amount-uppercase",
  name: "Amount Uppercase",
  description: "Render number amount as Chinese uppercase amount.",
  defaultWidth: 100,
  defaultHeight: 12,

  propertySchema: createPropertySchema({
    groups: [
      {
        key: "geometry",
        label: "Geometry",
      },
      {
        key: "data",
        label: "Data",
      },
      {
        key: "style",
        label: "Style",
      },
    ],
    fields: [
      {
        key: "x",
        label: "X",
        type: "number",
        group: "geometry",
      },
      {
        key: "y",
        label: "Y",
        type: "number",
        group: "geometry",
      },
      {
        key: "width",
        label: "Width",
        type: "number",
        group: "geometry",
      },
      {
        key: "height",
        label: "Height",
        type: "number",
        group: "geometry",
      },
      {
        key: "binding.field",
        label: "Amount Field",
        type: "field",
        group: "data",
      },
      {
        key: "style.fontSize",
        label: "Font Size",
        type: "number",
        group: "style",
        defaultValue: 12,
      },
    ],
  }),

  createElement(input) {
    return {
      id: input.id,
      type: "business:amount-uppercase",
      x: input.x,
      y: input.y,
      width: 100,
      height: 12,
      binding: {
        field: "totalAmount",
        title: "金额大写",
      },
      style: {
        fontSize: 12,
      },
    };
  },
};
```

---

## `packages/plugins-basic/src/amount/amountUppercasePlugin.ts`

```ts
import { createPlugin } from "@hiprint-re/plugin";
import type { LayoutElement } from "@hiprint-re/core";
import { cssLength } from "@hiprint-re/dom";
import { amountUppercaseElementDefinition } from "./amountUppercaseElement";

export function amountUppercasePlugin() {
  return createPlugin({
    name: "@hiprint-re/plugin-amount-uppercase",
    version: "0.0.0",
    description: "Amount uppercase business element.",
    elements: [amountUppercaseElementDefinition],
    domRenderers: [
      {
        type: "business:amount-uppercase",
        render(element, ctx) {
          const doc = ctx.document;
          const unit = ctx.options.geometryUnit;
          const prefix = ctx.options.classNamePrefix;

          const root = doc.createElement("div");
          root.className = `${prefix}-element ${prefix}-amount-uppercase`;
          root.dataset.elementId = element.id;
          root.dataset.elementType = element.type;

          root.style.position = "absolute";
          root.style.left = cssLength(element.x, unit);
          root.style.top = cssLength(element.y, unit);
          root.style.width = cssLength(element.width, unit);
          root.style.height = cssLength(element.height, unit);
          root.style.fontSize = "12px";
          root.style.whiteSpace = "nowrap";

          const value = resolveAmountValue(element);

          root.textContent = toChineseAmount(value);

          return root;
        },
      },
    ],
  });
}

function resolveAmountValue(element: LayoutElement): number {
  const raw = element.raw as any;
  const value = raw?.value ?? raw?.amount ?? 0;

  if (typeof value === "number") return value;

  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : 0;
}

function toChineseAmount(value: number): string {
  /**
   * MVP 简化版。
   * 后续可以替换为完整人民币大写算法。
   */
  return `人民币 ${value.toFixed(2)} 元`;
}
```

---

# 15. `plugins-basic` 统一导出

## `packages/plugins-basic/src/index.ts`

```ts
export * from "./barcode/barcodePlugin";
export * from "./qrcode/qrcodePlugin";
export * from "./html/htmlPlugin";
export * from "./amount/amountUppercasePlugin";
```

---

# 16. fromLegacyTemplate 支持 barcode/qrcode/html

Phase 2 的 `mapLegacyElementType.ts` 已经有：

```ts
barcode: "barcode",
qrcode: "qrcode",
html: "html"
```

Phase 10 要保证 `fromLegacyTemplate` 对这些类型保留 options：

```ts
function mapLegacyOptionsByType(
  type: string,
  options: Record<string, unknown>,
): Record<string, unknown> {
  if (type === "barcode") {
    return {
      value: options.text ?? options.value ?? options.title,
      format: options.format ?? "code128",
      showText: options.showText ?? true,
    };
  }

  if (type === "qrcode") {
    return {
      value: options.text ?? options.value ?? options.title,
      errorCorrectionLevel: options.errorCorrectionLevel ?? "M",
    };
  }

  if (type === "html") {
    return {
      html: options.html ?? options.content ?? "",
      sandbox: true,
    };
  }

  // existing text/image/table...
}
```

---

# 17. Playground：plugin 示例

新增：

```txt
apps/playground-plugins-react/
```

## `apps/playground-plugins-react/src/App.tsx`

```tsx
import { useState } from "react";
import { PrintDesigner } from "@hiprint-re/designer-react";
import {
  barcodePlugin,
  qrcodePlugin,
  htmlPlugin,
  amountUppercasePlugin,
} from "@hiprint-re/plugins-basic";
import { createEmptyTemplate } from "@hiprint-re/core";

const plugins = [
  barcodePlugin(),
  qrcodePlugin(),
  htmlPlugin(),
  amountUppercasePlugin(),
];

export function App() {
  const [template, setTemplate] = useState(() => createEmptyTemplate());

  return (
    <div className="app">
      <PrintDesigner
        template={template}
        templateKind="core"
        data={{
          orderNo: "NO-20260601-001",
          totalAmount: 199.98,
          qrValue: "https://example.com/order/NO-20260601-001",
        }}
        plugins={plugins}
        onChange={setTemplate}
      />
    </div>
  );
}
```

---

# 18. 测试设计

新增：

```txt
tests/plugin/
├─ pluginManager.test.ts
├─ duplicate-plugin.test.ts

tests/plugins-basic/
├─ barcodePlugin.test.ts
├─ qrcodePlugin.test.ts
├─ htmlPlugin.test.ts

tests/designer-react/
├─ plugin-palette.test.tsx
├─ plugin-renderer.test.tsx
```

---

## `tests/plugin/pluginManager.test.ts`

```ts
import { describe, expect, it } from "vitest";
import { createPlugin } from "../../packages/plugin/src";
import { createPluginManager } from "../../packages/plugin/src";

describe("PluginManager", () => {
  it("should register plugin element", () => {
    const plugin = createPlugin({
      name: "test-plugin",
      version: "0.0.0",
      elements: [
        {
          type: "test:element",
          name: "Test Element",
          defaultWidth: 10,
          defaultHeight: 10,
          createElement(input) {
            return {
              id: input.id,
              type: "test:element",
              x: input.x,
              y: input.y,
              width: 10,
              height: 10,
            };
          },
        },
      ],
    });

    const manager = createPluginManager([plugin]);
    const registry = manager.createElementRegistry();

    expect(registry.has("test:element")).toBe(true);
  });
});
```

---

## `tests/plugins-basic/barcodePlugin.test.ts`

```ts
import { describe, expect, it } from "vitest";
import { createPluginManager } from "../../packages/plugin/src";
import { barcodePlugin } from "../../packages/plugins-basic/src";

describe("barcodePlugin", () => {
  it("should register barcode element and renderer", () => {
    const manager = createPluginManager([barcodePlugin()]);

    const registry = manager.createElementRegistry();

    expect(registry.has("barcode")).toBe(true);
    expect(manager.getDomRenderer("barcode")).toBeTruthy();
  });
});
```

---

## `tests/designer-react/plugin-palette.test.tsx`

```tsx
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { PrintDesigner } from "../../packages/designer-react/src";
import { createEmptyTemplate } from "../../packages/core/src";
import { barcodePlugin } from "../../packages/plugins-basic/src";

describe("designer plugin palette", () => {
  it("should show plugin element in palette", () => {
    const { container } = render(
      <div style={{ width: 1000, height: 800 }}>
        <PrintDesigner
          template={createEmptyTemplate()}
          templateKind="core"
          plugins={[barcodePlugin()]}
        />
      </div>,
    );

    expect(container.textContent).toContain("Barcode");
  });
});
```

---

# 19. 文档

## `docs/phase-10.md`

````md
# Phase 10 - Plugin System and Custom Elements

## Goal

Introduce a plugin system for custom print elements, property schemas and DOM renderers.

## Deliverables

- `@hiprint-re/plugin`
- `@hiprint-re/plugins-basic`
- PluginManager
- Plugin element registration
- Plugin DOM renderer registration
- Barcode plugin
- QRCode plugin
- HTML plugin
- Business custom element example
- Designer plugin integration
- Plugin playground

## Non-goals

- Remote plugin marketplace
- Runtime plugin sandbox
- Permission system
- Online install/uninstall
- WASM plugin runtime

## Plugin flow

```txt
plugin
  ↓
PluginManager
  ↓
ElementRegistry
  ↓
Designer Palette
  ↓
PropertySchema
  ↓
DOM Renderer
```
````

## Example

```ts
const plugin = createPlugin({
  name: "my-plugin",
  version: "0.0.0",
  elements: [myElementDefinition],
  domRenderers: [myRenderer],
});
```

````

---

## `docs/plugin-api.md`

```md
# Plugin API

## HiprintPlugin

```ts
interface HiprintPlugin {
  name: string
  version: string
  elements?: ElementDefinition[]
  domRenderers?: PluginDomRenderer[]
  setup?: (ctx: PluginSetupContext) => void
}
````

## ElementDefinition

```ts
interface ElementDefinition {
  type: string;
  name: string;
  defaultWidth: number;
  defaultHeight: number;
  createElement(input): PrintElement;
  propertySchema?: ElementPropertySchema;
}
```

## DOM Renderer

```ts
interface PluginDomRenderer {
  type: string;
  render(element, ctx): HTMLElement;
}
```

## Element type naming

Recommended:

```txt
builtin:
text
image
table
line
rect

basic plugin:
barcode
qrcode
html

business plugin:
business:amount-uppercase
business:signature
business:seal
```

````

---

# 20. Phase 10 验收标准

Phase 10 完成后，应满足：

```txt
1. 新增 @hiprint-re/plugin
2. 新增 PluginManager
3. 插件可以注册 ElementDefinition
4. 插件可以注册 DOM renderer
5. designer-react 支持 plugins 参数
6. ElementPalette 可以展示插件元素
7. DynamicPropertyPanel 可以渲染插件元素属性
8. dom renderer 可以渲染插件元素
9. barcodePlugin 可注册
10. qrcodePlugin 可注册
11. htmlPlugin 可注册
12. amountUppercasePlugin 可注册
13. legacy barcode/qrcode/html 能转换成 core element
14. plugin playground 可运行
15. 插件重复注册会静默跳过（第一个生效）
16. tests/plugin 通过
17. tests/plugins-basic 通过
18. docs/phase-10.md 完成
19. docs/plugin-api.md 完成
````

---

# 21. 推荐 PR 拆分

## PR 1：Plugin API

```txt
feat(plugin): add local plugin system
```

内容：

```txt
packages/plugin
HiprintPlugin
PluginManager
createPlugin
validatePlugin
```

---

## PR 2：DOM renderer registry

```txt
feat(dom): support plugin element renderers
```

内容：

```txt
domRendererRegistry
renderElement plugin fallback
DomRenderOptions.renderers
```

---

## PR 3：Designer plugin integration

```txt
feat(designer-react): support plugins in designer
```

内容：

```txt
DesignerPluginProvider
plugins prop
ElementPalette plugin elements
DesignerCanvas plugin renderers
```

---

## PR 4：Basic plugins

```txt
feat(plugins-basic): add barcode qrcode and html plugins
```

内容：

```txt
barcodePlugin
qrcodePlugin
htmlPlugin
amountUppercasePlugin
```

---

## PR 5：Playground + Docs + Tests

```txt
test(plugin): add plugin coverage
docs(plugin): document plugin api
feat(playground): add plugin playground
```

---

# 22. Phase 10 最小 TODO

```txt
[ ] 新建 packages/plugin
[ ] 定义 HiprintPlugin
[ ] 定义 PluginDomRenderer
[ ] 实现 createPlugin
[ ] 实现 PluginManager
[ ] core 放宽 PrintElementType
[ ] core layout default 支持 plugin element fallback
[ ] dom 新增 DomRendererRegistry
[ ] dom renderElement 支持 plugin renderer
[ ] designer-react 增加 plugins prop
[ ] designer-react 新增 DesignerPluginProvider
[ ] designer-react ElementPalette 接入 plugin element
[ ] designer-react DesignerCanvas 传入 plugin dom renderers
[ ] 新建 packages/plugins-basic
[ ] 实现 barcodePlugin
[ ] 实现 qrcodePlugin
[ ] 实现 htmlPlugin
[ ] 实现 amountUppercasePlugin
[ ] fromLegacyTemplate 支持 barcode/qrcode/html options
[ ] 新增 playground-plugins-react
[ ] 新增 tests/plugin
[ ] 新增 tests/plugins-basic
[ ] 新增 docs/phase-10.md
[ ] 新增 docs/plugin-api.md
```

---

# 23. 关键风险点

## 1. 不要一上来做远程插件市场

Phase 10 先做本地插件协议：

```ts
plugins={[barcodePlugin(), qrcodePlugin()]}
```

远程插件会涉及：

```txt
安全隔离
权限模型
版本管理
依赖冲突
远程加载
沙箱执行
```

这些应该放更后面。

---

## 2. HTML 插件有 XSS 风险

`htmlPlugin` 使用了：

```ts
root.innerHTML = html;
```

所以必须明确：

```txt
只适合可信模板和可信数据
```

如果要支持不可信模板，需要引入 sanitizer 机制。

---

## 3. barcode/qrcode MVP 不等于商用可扫描

上面的 barcode/qrcode renderer 是为了跑通插件体系。

商用时需要：

```txt
完整 Code128/EAN13 编码
二维码完整编码
纠错级别
校验位
打印机兼容测试
```

Phase 10 可以把接口定好，后续替换编码实现。

---

## 4. 插件元素 layout 暂时用矩形 fallback

Phase 10 先让插件元素按：

```txt
x/y/width/height
```

布局。
后续如果插件需要自定义 layout，可以扩展：

```ts
ElementDefinition.layout?: (element, ctx) => LayoutElement[]
```

但不要一开始把 layout 插件化做太复杂。

---

# 24. 最终判断

Phase 10 的本质是：

```txt
把打印设计器从“内置元素集合”升级成“可扩展平台”
```

完成后你的项目会支持：

```txt
基础元素：text / image / line / rect / table
基础插件：barcode / qrcode / html
业务插件：金额大写 / 签名 / 印章 / 自定义字段块
```

整体能力链路变成：

```txt
Plugin
  ↓
ElementDefinition
  ↓
PropertySchema
  ↓
Designer Palette
  ↓
Template Element
  ↓
Layout fallback
  ↓
Plugin DOM Renderer
  ↓
Preview / Print
```

做到 Phase 10 后，这个项目就不只是“hiprint 反解析重构项目”，而是开始具备 **打印设计器平台化能力**。
