下面给你一版 **Phase 7：React / Vue Designer MVP 可视化设计器** 的详细设计与代码草案。

这一阶段的定位是：

```txt
Phase 0：legacy 能跑
Phase 1：legacy 可审计
Phase 2：core schema / legacy adapter
Phase 3：layout engine
Phase 4：DOM renderer / preview / print
Phase 5：React / Vue preview adapter
Phase 6：designer-core 状态与命令系统
Phase 7：真正可见、可操作的 Designer MVP
```

Phase 7 做完后，项目第一次具备“设计器产品形态”。

---

# 1. Phase 7 总目标

Phase 7 要完成：

```txt
1. 新增 @hiprint-re/designer-react
2. 新增 @hiprint-re/designer-vue
3. 实现设计器整体布局
4. 实现元素面板
5. 实现画布预览
6. 实现元素选中
7. 实现元素拖拽移动
8. 实现元素缩放
9. 实现属性面板
10. 实现图层面板
11. 实现 toolbar
12. 实现 undo / redo
13. 实现 copy / paste / delete / duplicate
14. 实现 align / distribute
15. 实现 zoom
16. 实现 preview / print
17. 新增 playground-designer-react
18. 新增 playground-designer-vue
```

最终 React 用法：

```tsx
import { PrintDesigner } from "@hiprint-re/designer-react";

export function App() {
  return (
    <PrintDesigner
      template={template}
      templateKind="legacy"
      data={data}
      onChange={(nextTemplate) => {
        console.log(nextTemplate);
      }}
    />
  );
}
```

Vue 用法：

```vue
<PrintDesigner
  :template="template"
  template-kind="legacy"
  :data="data"
  @change="handleChange"
/>
```

---

# 2. Phase 7 不做什么

Phase 7 是 Designer MVP，不是完整商业级设计器。

暂时不做：

```txt
不做插件市场 UI
不做复杂属性 schema 表单
不做复杂表格编辑器
不做表格单元格拖拽
不做标尺 ruler
不做高级辅助线渲染
不做多页面模板复杂管理
不做 PDF 导出
不做云端模板管理
不做设计器主题系统
```

Phase 7 的目标是先做出：

```txt
能新增元素
能选中
能拖动
能缩放
能改属性
能撤销重做
能预览打印
```

---

# 3. 总体架构

```txt
@hiprint-re/core
  ├─ schema / template
  ├─ layoutTemplate

@hiprint-re/dom
  ├─ mountLayout
  ├─ printLayout

@hiprint-re/designer-core
  ├─ DesignerStore
  ├─ command
  ├─ selection
  ├─ history
  ├─ geometry

@hiprint-re/designer-react
  ├─ React UI
  ├─ DOM event binding
  ├─ pointer drag / resize
  ├─ keyboard shortcut
  └─ property panel

@hiprint-re/designer-vue
  ├─ Vue UI
  ├─ DOM event binding
  ├─ pointer drag / resize
  ├─ keyboard shortcut
  └─ property panel
```

核心原则：

```txt
designer-core 负责状态和命令
designer-react/vue 负责 UI 和事件
core 负责 layout
dom 负责最终渲染和 print
```

---

# 4. 推荐目录结构

```txt
packages/
├─ designer-react/
│  ├─ package.json
│  ├─ tsconfig.json
│  └─ src/
│     ├─ index.ts
│     ├─ types.ts
│     ├─ normalizeInputTemplate.ts
│     │
│     ├─ context/
│     │  ├─ DesignerContext.tsx
│     │  ├─ DesignerProvider.tsx
│     │  └─ useDesignerContext.ts
│     │
│     ├─ hooks/
│     │  ├─ useDesignerState.ts
│     │  ├─ useDesignerLayout.ts
│     │  ├─ useDesignerCommands.ts
│     │  ├─ useDesignerKeyboard.ts
│     │  ├─ useCanvasPointer.ts
│     │  └─ useElementFactory.ts
│     │
│     ├─ components/
│     │  ├─ PrintDesigner.tsx
│     │  ├─ DesignerShell.tsx
│     │  ├─ DesignerToolbar.tsx
│     │  ├─ ElementPalette.tsx
│     │  ├─ DesignerCanvas.tsx
│     │  ├─ DesignerPage.tsx
│     │  ├─ SelectionOverlay.tsx
│     │  ├─ ResizeHandles.tsx
│     │  ├─ PropertyPanel.tsx
│     │  ├─ LayerPanel.tsx
│     │  └─ StatusBar.tsx
│     │
│     └─ style/
│        └─ designer.css
│
└─ designer-vue/
   ├─ package.json
   ├─ tsconfig.json
   └─ src/
      ├─ index.ts
      ├─ types.ts
      ├─ normalizeInputTemplate.ts
      ├─ composables/
      │  ├─ useDesignerStore.ts
      │  ├─ useDesignerLayout.ts
      │  ├─ useDesignerKeyboard.ts
      │  └─ useCanvasPointer.ts
      └─ components/
         ├─ PrintDesigner.ts
         ├─ DesignerToolbar.ts
         ├─ ElementPalette.ts
         ├─ DesignerCanvas.ts
         ├─ PropertyPanel.ts
         └─ LayerPanel.ts
```

---

# 5. React Designer 包

## 5.1 `packages/designer-react/package.json`

```json
{
  "name": "@hiprint-re/designer-react",
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
    "@hiprint-re/designer-core": "workspace:*"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0"
  }
}
```

---

## 5.2 `packages/designer-react/tsconfig.json`

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

---

# 6. React Designer 类型设计

## `packages/designer-react/src/types.ts`

```ts
import type {
  LayoutDocument,
  LayoutOptions,
  LegacyTemplate,
  PrintTemplate,
} from "@hiprint-re/core";
import type { DomRenderOptions } from "@hiprint-re/dom";
import type { DesignerStore } from "@hiprint-re/designer-core";

export type DesignerTemplateKind = "core" | "legacy" | "auto";

export type DesignerTemplateInput = PrintTemplate | LegacyTemplate | unknown;

export interface PrintDesignerProps {
  template: DesignerTemplateInput;
  templateKind?: DesignerTemplateKind;
  data?: unknown;

  layoutOptions?: LayoutOptions;
  domOptions?: DomRenderOptions;

  className?: string;
  style?: React.CSSProperties;

  readonly?: boolean;

  onChange?: (template: PrintTemplate) => void;
  onLayout?: (layout: LayoutDocument) => void;
  onError?: (error: Error) => void;
}

export interface DesignerContextValue {
  store: DesignerStore;
  data: unknown;
  layoutOptions?: LayoutOptions;
  domOptions?: DomRenderOptions;
  readonly: boolean;
  onChange?: (template: PrintTemplate) => void;
  onLayout?: (layout: LayoutDocument) => void;
  onError?: (error: Error) => void;
}
```

---

# 7. 模板输入归一化

## `packages/designer-react/src/normalizeInputTemplate.ts`

```ts
import {
  fromLegacyTemplate,
  normalizeTemplate,
  type LegacyTemplate,
  type PrintTemplate,
} from "@hiprint-re/core";
import type { DesignerTemplateInput, DesignerTemplateKind } from "./types";

export function normalizeInputTemplate(
  template: DesignerTemplateInput,
  kind: DesignerTemplateKind = "auto",
): PrintTemplate {
  const resolvedKind = resolveTemplateKind(template, kind);

  if (resolvedKind === "core") {
    return normalizeTemplate(template as Partial<PrintTemplate>);
  }

  if (resolvedKind === "legacy") {
    return fromLegacyTemplate(template as LegacyTemplate);
  }

  throw new Error("[hiprint-re/designer-react] Invalid template.");
}

function resolveTemplateKind(
  template: DesignerTemplateInput,
  kind: DesignerTemplateKind,
): Exclude<DesignerTemplateKind, "auto"> {
  if (kind !== "auto") return kind;

  if (isRecord(template) && typeof template.schemaVersion === "string") {
    return "core";
  }

  if (isRecord(template) && Array.isArray(template.panels)) {
    return "legacy";
  }

  throw new Error("[hiprint-re/designer-react] Cannot detect template kind.");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
```

---

# 8. Designer Context

## `packages/designer-react/src/context/DesignerContext.tsx`

```tsx
import { createContext } from "react";
import type { DesignerContextValue } from "../types";

export const DesignerContext = createContext<DesignerContextValue | null>(null);
```

---

## `packages/designer-react/src/context/useDesignerContext.ts`

```ts
import { useContext } from "react";
import { DesignerContext } from "./DesignerContext";

export function useDesignerContext() {
  const ctx = useContext(DesignerContext);

  if (!ctx) {
    throw new Error(
      "[hiprint-re/designer-react] useDesignerContext must be used within DesignerProvider.",
    );
  }

  return ctx;
}
```

---

## `packages/designer-react/src/context/DesignerProvider.tsx`

```tsx
import { useMemo } from "react";
import { createDesignerStore } from "@hiprint-re/designer-core";
import { DesignerContext } from "./DesignerContext";
import { normalizeInputTemplate } from "../normalizeInputTemplate";
import type { DesignerContextValue, PrintDesignerProps } from "../types";

export interface DesignerProviderProps extends PrintDesignerProps {
  children: React.ReactNode;
}

export function DesignerProvider(props: DesignerProviderProps) {
  const template = useMemo(
    () => normalizeInputTemplate(props.template, props.templateKind ?? "auto"),
    [props.template, props.templateKind],
  );

  const store = useMemo(
    () =>
      createDesignerStore({
        template,
      }),
    [template],
  );

  const value = useMemo<DesignerContextValue>(
    () => ({
      store,
      data: props.data ?? {},
      layoutOptions: props.layoutOptions,
      domOptions: props.domOptions,
      readonly: props.readonly ?? false,
      onChange: props.onChange,
      onLayout: props.onLayout,
      onError: props.onError,
    }),
    [
      store,
      props.data,
      props.layoutOptions,
      props.domOptions,
      props.readonly,
      props.onChange,
      props.onLayout,
      props.onError,
    ],
  );

  return (
    <DesignerContext.Provider value={value}>
      {props.children}
    </DesignerContext.Provider>
  );
}
```

注意：
`template` 变化时会重建 store。后续可以做受控/非受控模式，MVP 先保持简单。

---

# 9. useDesignerState

用 `useSyncExternalStore` 接入 DesignerStore。

## `packages/designer-react/src/hooks/useDesignerState.ts`

```ts
import { useSyncExternalStore } from "react";
import type { DesignerState } from "@hiprint-re/designer-core";
import { useDesignerContext } from "../context/useDesignerContext";

export function useDesignerState(): DesignerState {
  const { store } = useDesignerContext();

  return useSyncExternalStore(
    (listener) => store.subscribe(listener),
    () => store.getState(),
    () => store.getState(),
  );
}
```

---

# 10. useDesignerLayout

把当前 template + data 转成 layout。

## `packages/designer-react/src/hooks/useDesignerLayout.ts`

```ts
import { useEffect, useMemo } from "react";
import { layoutTemplate } from "@hiprint-re/core";
import { useDesignerContext } from "../context/useDesignerContext";
import { useDesignerState } from "./useDesignerState";

export function useDesignerLayout() {
  const ctx = useDesignerContext();
  const state = useDesignerState();

  const result = useMemo(() => {
    try {
      const layout = layoutTemplate(
        state.template,
        ctx.data ?? {},
        ctx.layoutOptions,
      );

      return {
        layout,
        error: null,
      };
    } catch (error) {
      return {
        layout: null,
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
  }, [state.template, ctx.data, ctx.layoutOptions]);

  useEffect(() => {
    if (result.layout) {
      ctx.onLayout?.(result.layout);
    }

    if (result.error) {
      ctx.onError?.(result.error);
    }
  }, [result.layout, result.error, ctx]);

  return result;
}
```

---

# 11. useDesignerCommands

封装常用命令，避免组件直接 import 一堆 command。

## `packages/designer-react/src/hooks/useDesignerCommands.ts`

```ts
import { useMemo } from "react";
import {
  createAddElementCommand,
  createAlignElementsCommand,
  createClearSelectionCommand,
  createDuplicateElementCommand,
  createMoveElementCommand,
  createPasteElementsCommand,
  createRemoveElementCommand,
  createResizeElementCommand,
  createSelectElementCommand,
  createUpdateElementCommand,
  getSelectedElements,
} from "@hiprint-re/designer-core";
import type { PrintElement } from "@hiprint-re/core";
import type { ResizeHandle } from "@hiprint-re/designer-core";
import { useDesignerContext } from "../context/useDesignerContext";

export function useDesignerCommands() {
  const { store, onChange } = useDesignerContext();

  return useMemo(() => {
    function emitChange() {
      onChange?.(store.getStateRef().template);
    }

    return {
      addElement(panelId: string, element: PrintElement) {
        store.dispatch(
          createAddElementCommand({
            panelId,
            element,
            select: true,
          }),
        );
        emitChange();
      },

      select(ids: string[], activeId?: string, append?: boolean) {
        store.dispatch(
          createSelectElementCommand({
            ids,
            activeId,
            append,
          }),
        );
      },

      clearSelection() {
        store.dispatch(createClearSelectionCommand());
      },

      removeSelected() {
        const state = store.getStateRef();
        const ids = state.selection.ids;

        if (ids.length === 0) return;

        store.dispatch(
          createRemoveElementCommand({
            ids,
          }),
        );
        emitChange();
      },

      moveSelected(dx: number, dy: number) {
        const ids = store.getStateRef().selection.ids;

        if (ids.length === 0) return;

        store.dispatch(
          createMoveElementCommand({
            ids,
            dx,
            dy,
          }),
        );
        emitChange();
      },

      resizeElement(id: string, handle: ResizeHandle, dx: number, dy: number) {
        store.dispatch(
          createResizeElementCommand({
            id,
            handle,
            dx,
            dy,
          }),
        );
        emitChange();
      },

      updateElement(id: string, patch: Partial<PrintElement>) {
        store.dispatch(
          createUpdateElementCommand({
            id,
            patch,
          }),
        );
        emitChange();
      },

      duplicateSelected() {
        store.dispatch(createDuplicateElementCommand());
        emitChange();
      },

      paste() {
        store.dispatch(createPasteElementsCommand());
        emitChange();
      },

      align(type: Parameters<typeof createAlignElementsCommand>[0]["type"]) {
        store.dispatch(createAlignElementsCommand({ type }));
        emitChange();
      },

      undo() {
        store.undo();
        emitChange();
      },

      redo() {
        store.redo();
        emitChange();
      },

      canUndo() {
        return store.canUndo();
      },

      canRedo() {
        return store.canRedo();
      },
    };
  }, [store, onChange]);
}
```

---

# 12. 元素工厂

## `packages/designer-react/src/hooks/useElementFactory.ts`

```ts
import type { PrintElement } from "@hiprint-re/core";

export type BuiltinInsertElementType =
  | "text"
  | "image"
  | "rect"
  | "line"
  | "table";

export function createBuiltinElement(
  type: BuiltinInsertElementType,
  input: {
    x: number;
    y: number;
  },
): PrintElement {
  const id = createElementId(type);

  if (type === "text") {
    return {
      id,
      type: "text",
      x: input.x,
      y: input.y,
      width: 60,
      height: 12,
      binding: {
        title: "文本",
      },
      options: {
        content: "文本",
      },
      style: {
        fontSize: 12,
      },
    };
  }

  if (type === "image") {
    return {
      id,
      type: "image",
      x: input.x,
      y: input.y,
      width: 40,
      height: 40,
      options: {
        src: "",
        objectFit: "contain",
      },
    };
  }

  if (type === "rect") {
    return {
      id,
      type: "rect",
      x: input.x,
      y: input.y,
      width: 40,
      height: 24,
      style: {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#111827",
      },
    };
  }

  if (type === "line") {
    return {
      id,
      type: "line",
      x: input.x,
      y: input.y,
      width: 50,
      height: 1,
      options: {
        direction: "horizontal",
      },
    };
  }

  return {
    id,
    type: "table",
    x: input.x,
    y: input.y,
    width: 120,
    height: 50,
    options: {
      dataField: "items",
      columns: [
        {
          id: "name",
          field: "name",
          title: "名称",
          width: 60,
        },
        {
          id: "value",
          field: "value",
          title: "值",
          width: 60,
        },
      ],
    },
  };
}

function createElementId(type: string): string {
  return `${type}_${Math.random().toString(36).slice(2, 9)}`;
}
```

---

# 13. Keyboard 绑定

## `packages/designer-react/src/hooks/useDesignerKeyboard.ts`

```ts
import { useEffect } from "react";
import {
  defaultKeymap,
  resolveShortcutAction,
} from "@hiprint-re/designer-core";
import { useDesignerCommands } from "./useDesignerCommands";
import { useDesignerContext } from "../context/useDesignerContext";

export function useDesignerKeyboard() {
  const { readonly } = useDesignerContext();
  const commands = useDesignerCommands();

  useEffect(() => {
    if (readonly) return;

    function onKeyDown(event: KeyboardEvent) {
      const action = resolveShortcutAction(event, defaultKeymap);

      if (!action) return;

      event.preventDefault();

      switch (action) {
        case "delete":
          commands.removeSelected();
          break;

        case "duplicate":
          commands.duplicateSelected();
          break;

        case "paste":
          commands.paste();
          break;

        case "undo":
          commands.undo();
          break;

        case "redo":
          commands.redo();
          break;

        case "moveLeft":
          commands.moveSelected(event.shiftKey ? -10 : -1, 0);
          break;

        case "moveRight":
          commands.moveSelected(event.shiftKey ? 10 : 1, 0);
          break;

        case "moveUp":
          commands.moveSelected(0, event.shiftKey ? -10 : -1);
          break;

        case "moveDown":
          commands.moveSelected(0, event.shiftKey ? 10 : 1);
          break;
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [readonly, commands]);
}
```

---

# 14. Designer 主组件

## `packages/designer-react/src/components/PrintDesigner.tsx`

```tsx
import { DesignerProvider } from "../context/DesignerProvider";
import type { PrintDesignerProps } from "../types";
import { DesignerShell } from "./DesignerShell";
import "../style/designer.css";

export function PrintDesigner(props: PrintDesignerProps) {
  return (
    <DesignerProvider {...props}>
      <DesignerShell className={props.className} style={props.style} />
    </DesignerProvider>
  );
}
```

---

## `packages/designer-react/src/components/DesignerShell.tsx`

```tsx
import { useDesignerKeyboard } from "../hooks/useDesignerKeyboard";
import { DesignerToolbar } from "./DesignerToolbar";
import { ElementPalette } from "./ElementPalette";
import { DesignerCanvas } from "./DesignerCanvas";
import { PropertyPanel } from "./PropertyPanel";
import { LayerPanel } from "./LayerPanel";
import { StatusBar } from "./StatusBar";

export interface DesignerShellProps {
  className?: string;
  style?: React.CSSProperties;
}

export function DesignerShell(props: DesignerShellProps) {
  useDesignerKeyboard();

  return (
    <div
      className={["hiprint-designer", props.className]
        .filter(Boolean)
        .join(" ")}
      style={props.style}
    >
      <DesignerToolbar />

      <div className="hiprint-designer-main">
        <aside className="hiprint-designer-left">
          <ElementPalette />
          <LayerPanel />
        </aside>

        <main className="hiprint-designer-center">
          <DesignerCanvas />
        </main>

        <aside className="hiprint-designer-right">
          <PropertyPanel />
        </aside>
      </div>

      <StatusBar />
    </div>
  );
}
```

---

# 15. Toolbar

## `packages/designer-react/src/components/DesignerToolbar.tsx`

```tsx
import { printLayout } from "@hiprint-re/dom";
import { useDesignerContext } from "../context/useDesignerContext";
import { useDesignerLayout } from "../hooks/useDesignerLayout";
import { useDesignerCommands } from "../hooks/useDesignerCommands";

export function DesignerToolbar() {
  const ctx = useDesignerContext();
  const commands = useDesignerCommands();
  const { layout } = useDesignerLayout();

  async function print() {
    if (!layout) return;

    await printLayout(layout, ctx.domOptions);
  }

  return (
    <div className="hiprint-designer-toolbar">
      <button onClick={commands.undo}>Undo</button>

      <button onClick={commands.redo}>Redo</button>

      <span className="hiprint-designer-toolbar-separator" />

      <button onClick={() => commands.align("left")}>Align Left</button>

      <button onClick={() => commands.align("center")}>Align Center</button>

      <button onClick={() => commands.align("top")}>Align Top</button>

      <span className="hiprint-designer-toolbar-separator" />

      <button onClick={commands.duplicateSelected}>Duplicate</button>

      <button onClick={commands.removeSelected}>Delete</button>

      <span className="hiprint-designer-toolbar-separator" />

      <button onClick={print}>Print</button>
    </div>
  );
}
```

---

# 16. ElementPalette

## `packages/designer-react/src/components/ElementPalette.tsx`

```tsx
import { useDesignerState } from "../hooks/useDesignerState";
import { useDesignerCommands } from "../hooks/useDesignerCommands";
import {
  createBuiltinElement,
  type BuiltinInsertElementType,
} from "../hooks/useElementFactory";

const items: Array<{
  type: BuiltinInsertElementType;
  label: string;
}> = [
  {
    type: "text",
    label: "Text",
  },
  {
    type: "image",
    label: "Image",
  },
  {
    type: "rect",
    label: "Rect",
  },
  {
    type: "line",
    label: "Line",
  },
  {
    type: "table",
    label: "Table",
  },
];

export function ElementPalette() {
  const state = useDesignerState();
  const commands = useDesignerCommands();

  const panelId = state.activePanelId;

  function add(type: BuiltinInsertElementType) {
    if (!panelId) return;

    commands.addElement(
      panelId,
      createBuiltinElement(type, {
        x: 20,
        y: 20,
      }),
    );
  }

  return (
    <div className="hiprint-designer-panel">
      <div className="hiprint-designer-panel-title">Elements</div>

      <div className="hiprint-designer-palette">
        {items.map((item) => (
          <button
            key={item.type}
            className="hiprint-designer-palette-item"
            onClick={() => add(item.type)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
```

---

# 17. DesignerCanvas

这里的策略是：

```txt
1. 用 core layoutTemplate 得到 LayoutDocument
2. 用 dom mountLayout 把打印结果渲染出来
3. 在同一个坐标系上覆盖 selection overlay
4. pointer 操作只作用于 overlay
```

## `packages/designer-react/src/components/DesignerCanvas.tsx`

```tsx
import { useEffect, useRef } from "react";
import { mountLayout, type MountLayoutResult } from "@hiprint-re/dom";
import { useDesignerContext } from "../context/useDesignerContext";
import { useDesignerLayout } from "../hooks/useDesignerLayout";
import { useDesignerCommands } from "../hooks/useDesignerCommands";
import { useDesignerState } from "../hooks/useDesignerState";
import { SelectionOverlay } from "./SelectionOverlay";

export function DesignerCanvas() {
  const ctx = useDesignerContext();
  const state = useDesignerState();
  const commands = useDesignerCommands();
  const { layout, error } = useDesignerLayout();

  const previewRef = useRef<HTMLDivElement | null>(null);
  const mountRef = useRef<MountLayoutResult | null>(null);

  useEffect(() => {
    const container = previewRef.current;

    if (!container || !layout) return;

    mountRef.current?.dispose();
    mountRef.current = mountLayout(layout, container, {
      ...ctx.domOptions,
      pageGap: 24,
    });

    return () => {
      mountRef.current?.dispose();
      mountRef.current = null;
    };
  }, [layout, ctx.domOptions]);

  function clearSelection(event: React.MouseEvent) {
    if (event.target === event.currentTarget) {
      commands.clearSelection();
    }
  }

  if (error) {
    return <pre className="hiprint-designer-error">{error.message}</pre>;
  }

  return (
    <div className="hiprint-designer-canvas" onMouseDown={clearSelection}>
      <div className="hiprint-designer-canvas-scroll">
        <div
          className="hiprint-designer-canvas-content"
          style={{
            transform: `scale(${state.viewport.zoom})`,
            transformOrigin: "top center",
          }}
        >
          <div ref={previewRef} className="hiprint-designer-preview-layer" />

          {layout ? <SelectionOverlay layout={layout} /> : null}
        </div>
      </div>
    </div>
  );
}
```

---

# 18. SelectionOverlay

负责显示选中框、拖动、缩放 handle。

## `packages/designer-react/src/components/SelectionOverlay.tsx`

```tsx
import type { LayoutDocument, LayoutElement } from "@hiprint-re/core";
import { getSelectedElements } from "@hiprint-re/designer-core";
import { useDesignerState } from "../hooks/useDesignerState";
import { useCanvasPointer } from "../hooks/useCanvasPointer";
import { ResizeHandles } from "./ResizeHandles";

export interface SelectionOverlayProps {
  layout: LayoutDocument;
}

export function SelectionOverlay(props: SelectionOverlayProps) {
  const state = useDesignerState();
  const pointer = useCanvasPointer();

  const selected = getSelectedElements(state);

  const layoutMap = new Map<string, LayoutElement>();

  for (const page of props.layout.pages) {
    for (const element of page.elements) {
      layoutMap.set(element.sourceElementId, element);
    }
  }

  return (
    <div className="hiprint-designer-overlay">
      {selected.map((element) => {
        const layoutElement = layoutMap.get(element.id);

        if (!layoutElement) return null;

        return (
          <div
            key={element.id}
            className="hiprint-designer-selection"
            style={{
              left: `${layoutElement.x}${props.layout.unit}`,
              top: `${layoutElement.y}${props.layout.unit}`,
              width: `${layoutElement.width}${props.layout.unit}`,
              height: `${layoutElement.height}${props.layout.unit}`,
            }}
            onPointerDown={(event) => {
              pointer.startDrag(event, element.id);
            }}
          >
            <ResizeHandles
              elementId={element.id}
              onResizeStart={pointer.startResize}
            />
          </div>
        );
      })}
    </div>
  );
}
```

---

# 19. ResizeHandles

## `packages/designer-react/src/components/ResizeHandles.tsx`

```tsx
import type { ResizeHandle } from "@hiprint-re/designer-core";

const handles: ResizeHandle[] = ["n", "s", "e", "w", "ne", "nw", "se", "sw"];

export interface ResizeHandlesProps {
  elementId: string;
  onResizeStart: (
    event: React.PointerEvent,
    elementId: string,
    handle: ResizeHandle,
  ) => void;
}

export function ResizeHandles(props: ResizeHandlesProps) {
  return (
    <>
      {handles.map((handle) => (
        <span
          key={handle}
          className={`hiprint-designer-resize-handle hiprint-designer-resize-${handle}`}
          onPointerDown={(event) => {
            event.stopPropagation();
            props.onResizeStart(event, props.elementId, handle);
          }}
        />
      ))}
    </>
  );
}
```

---

# 20. useCanvasPointer

拖拽和缩放事件绑定在 React 层。
关键：**mousemove 不进 history，pointerup 才 dispatch 最终 command。**

## `packages/designer-react/src/hooks/useCanvasPointer.ts`

```ts
import { useRef } from "react";
import type { ResizeHandle } from "@hiprint-re/designer-core";
import { useDesignerState } from "./useDesignerState";
import { useDesignerCommands } from "./useDesignerCommands";

interface DragSession {
  type: "drag";
  elementId: string;
  startX: number;
  startY: number;
}

interface ResizeSession {
  type: "resize";
  elementId: string;
  handle: ResizeHandle;
  startX: number;
  startY: number;
}

type PointerSession = DragSession | ResizeSession;

export function useCanvasPointer() {
  const state = useDesignerState();
  const commands = useDesignerCommands();
  const sessionRef = useRef<PointerSession | null>(null);

  function toDelta(event: PointerEvent | React.PointerEvent) {
    const session = sessionRef.current;

    if (!session) {
      return {
        dx: 0,
        dy: 0,
      };
    }

    const zoom = state.viewport.zoom || 1;

    return {
      dx: (event.clientX - session.startX) / zoom,
      dy: (event.clientY - session.startY) / zoom,
    };
  }

  function startDrag(event: React.PointerEvent, elementId: string) {
    event.stopPropagation();

    commands.select([elementId], elementId);

    sessionRef.current = {
      type: "drag",
      elementId,
      startX: event.clientX,
      startY: event.clientY,
    };

    window.addEventListener("pointerup", onPointerUp);
  }

  function startResize(
    event: React.PointerEvent,
    elementId: string,
    handle: ResizeHandle,
  ) {
    event.stopPropagation();

    commands.select([elementId], elementId);

    sessionRef.current = {
      type: "resize",
      elementId,
      handle,
      startX: event.clientX,
      startY: event.clientY,
    };

    window.addEventListener("pointerup", onPointerUp);
  }

  function onPointerUp(event: PointerEvent) {
    const session = sessionRef.current;

    if (!session) return;

    const delta = toDelta(event);

    if (session.type === "drag") {
      commands.moveSelected(delta.dx, delta.dy);
    }

    if (session.type === "resize") {
      commands.resizeElement(
        session.elementId,
        session.handle,
        delta.dx,
        delta.dy,
      );
    }

    sessionRef.current = null;
    window.removeEventListener("pointerup", onPointerUp);
  }

  return {
    startDrag,
    startResize,
  };
}
```

这个版本是最小 MVP，拖动过程中不会实时移动，只在松手后更新。
后续可以增强为：

```txt
pointermove -> 本地 ghost transform
pointerup -> dispatch final command
```

这样不会污染 history。

---

# 21. PropertyPanel

MVP 属性面板只做常用字段：

```txt
x / y / width / height
field / title
fontSize
content
src
```

## `packages/designer-react/src/components/PropertyPanel.tsx`

```tsx
import type { PrintElement } from "@hiprint-re/core";
import { getElementById } from "@hiprint-re/designer-core";
import { useDesignerState } from "../hooks/useDesignerState";
import { useDesignerCommands } from "../hooks/useDesignerCommands";

export function PropertyPanel() {
  const state = useDesignerState();
  const commands = useDesignerCommands();

  const activeId = state.selection.activeId;
  const element = activeId ? getElementById(state, activeId) : undefined;

  if (!element) {
    return (
      <div className="hiprint-designer-panel">
        <div className="hiprint-designer-panel-title">Properties</div>
        <div className="hiprint-designer-empty">No element selected</div>
      </div>
    );
  }

  function update(patch: Partial<PrintElement>) {
    if (!element) return;
    commands.updateElement(element.id, patch);
  }

  return (
    <div className="hiprint-designer-panel">
      <div className="hiprint-designer-panel-title">Properties</div>

      <Field label="ID" value={element.id} readonly />

      <Field
        label="X"
        value={element.x}
        type="number"
        onChange={(value) => update({ x: Number(value) })}
      />

      <Field
        label="Y"
        value={element.y}
        type="number"
        onChange={(value) => update({ y: Number(value) })}
      />

      <Field
        label="Width"
        value={element.width}
        type="number"
        onChange={(value) => update({ width: Number(value) })}
      />

      <Field
        label="Height"
        value={element.height}
        type="number"
        onChange={(value) => update({ height: Number(value) })}
      />

      <Field
        label="Field"
        value={element.binding?.field ?? ""}
        onChange={(value) =>
          update({
            binding: {
              ...element.binding,
              field: String(value),
            },
          })
        }
      />

      <Field
        label="Title"
        value={element.binding?.title ?? ""}
        onChange={(value) =>
          update({
            binding: {
              ...element.binding,
              title: String(value),
            },
          })
        }
      />

      {element.type === "text" ? (
        <>
          <Field
            label="Content"
            value={String(element.options?.content ?? "")}
            onChange={(value) =>
              update({
                options: {
                  ...element.options,
                  content: String(value),
                },
              })
            }
          />

          <Field
            label="Font Size"
            value={Number(element.style?.fontSize ?? 12)}
            type="number"
            onChange={(value) =>
              update({
                style: {
                  ...element.style,
                  fontSize: Number(value),
                },
              })
            }
          />
        </>
      ) : null}

      {element.type === "image" ? (
        <Field
          label="Src"
          value={String(element.options?.src ?? "")}
          onChange={(value) =>
            update({
              options: {
                ...element.options,
                src: String(value),
              },
            })
          }
        />
      ) : null}
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string | number;
  type?: string;
  readonly?: boolean;
  onChange?: (value: string) => void;
}

function Field(props: FieldProps) {
  return (
    <label className="hiprint-designer-field">
      <span>{props.label}</span>
      <input
        type={props.type ?? "text"}
        value={props.value}
        readOnly={props.readonly}
        onChange={(event) => props.onChange?.(event.target.value)}
      />
    </label>
  );
}
```

---

# 22. LayerPanel

## `packages/designer-react/src/components/LayerPanel.tsx`

```tsx
import { getActivePanel } from "@hiprint-re/designer-core";
import { useDesignerState } from "../hooks/useDesignerState";
import { useDesignerCommands } from "../hooks/useDesignerCommands";

export function LayerPanel() {
  const state = useDesignerState();
  const commands = useDesignerCommands();

  const panel = getActivePanel(state);

  return (
    <div className="hiprint-designer-panel">
      <div className="hiprint-designer-panel-title">Layers</div>

      <div className="hiprint-designer-layers">
        {panel?.elements.map((element) => {
          const selected = state.selection.ids.includes(element.id);

          return (
            <button
              key={element.id}
              className={[
                "hiprint-designer-layer-item",
                selected && "is-selected",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => commands.select([element.id], element.id)}
            >
              <span>{element.type}</span>
              <small>{element.id}</small>
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

---

# 23. StatusBar

## `packages/designer-react/src/components/StatusBar.tsx`

```tsx
import { useDesignerState } from "../hooks/useDesignerState";

export function StatusBar() {
  const state = useDesignerState();

  return (
    <div className="hiprint-designer-statusbar">
      <span>Mode: {state.mode}</span>
      <span>Zoom: {Math.round(state.viewport.zoom * 100)}%</span>
      <span>Selected: {state.selection.ids.length}</span>
    </div>
  );
}
```

---

# 24. 样式草案

## `packages/designer-react/src/style/designer.css`

```css
.hiprint-designer {
  display: grid;
  grid-template-rows: 44px 1fr 24px;
  width: 100%;
  height: 100%;
  color: #111827;
  background: #f3f4f6;
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

.hiprint-designer-toolbar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 12px;
  border-bottom: 1px solid #e5e7eb;
  background: #fff;
}

.hiprint-designer-toolbar button {
  height: 28px;
  padding: 0 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
}

.hiprint-designer-toolbar-separator {
  width: 1px;
  height: 20px;
  margin: 0 4px;
  background: #e5e7eb;
}

.hiprint-designer-main {
  display: grid;
  grid-template-columns: 240px 1fr 280px;
  min-height: 0;
}

.hiprint-designer-left,
.hiprint-designer-right {
  min-height: 0;
  overflow: auto;
  background: #fff;
  border-right: 1px solid #e5e7eb;
}

.hiprint-designer-right {
  border-right: 0;
  border-left: 1px solid #e5e7eb;
}

.hiprint-designer-center {
  min-width: 0;
  min-height: 0;
}

.hiprint-designer-panel {
  border-bottom: 1px solid #e5e7eb;
}

.hiprint-designer-panel-title {
  height: 36px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  font-weight: 600;
  font-size: 13px;
  background: #f9fafb;
}

.hiprint-designer-palette {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  padding: 12px;
}

.hiprint-designer-palette-item {
  height: 36px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
}

.hiprint-designer-canvas {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.hiprint-designer-canvas-scroll {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 32px;
}

.hiprint-designer-canvas-content {
  position: relative;
  width: max-content;
  min-width: 100%;
  margin: 0 auto;
}

.hiprint-designer-preview-layer {
  position: relative;
  z-index: 1;
}

.hiprint-designer-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
}

.hiprint-designer-selection {
  position: absolute;
  box-sizing: border-box;
  border: 1px solid #2563eb;
  pointer-events: auto;
  cursor: move;
}

.hiprint-designer-resize-handle {
  position: absolute;
  width: 7px;
  height: 7px;
  background: #2563eb;
  border: 1px solid #fff;
  border-radius: 999px;
}

.hiprint-designer-resize-n {
  top: -4px;
  left: 50%;
  transform: translateX(-50%);
  cursor: ns-resize;
}

.hiprint-designer-resize-s {
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  cursor: ns-resize;
}

.hiprint-designer-resize-e {
  right: -4px;
  top: 50%;
  transform: translateY(-50%);
  cursor: ew-resize;
}

.hiprint-designer-resize-w {
  left: -4px;
  top: 50%;
  transform: translateY(-50%);
  cursor: ew-resize;
}

.hiprint-designer-resize-ne {
  right: -4px;
  top: -4px;
  cursor: nesw-resize;
}

.hiprint-designer-resize-nw {
  left: -4px;
  top: -4px;
  cursor: nwse-resize;
}

.hiprint-designer-resize-se {
  right: -4px;
  bottom: -4px;
  cursor: nwse-resize;
}

.hiprint-designer-resize-sw {
  left: -4px;
  bottom: -4px;
  cursor: nesw-resize;
}

.hiprint-designer-field {
  display: grid;
  gap: 4px;
  padding: 8px 12px;
  font-size: 12px;
}

.hiprint-designer-field input {
  height: 28px;
  padding: 0 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
}

.hiprint-designer-layers {
  display: grid;
  gap: 4px;
  padding: 8px;
}

.hiprint-designer-layer-item {
  display: grid;
  gap: 2px;
  text-align: left;
  padding: 8px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
}

.hiprint-designer-layer-item.is-selected {
  border-color: #2563eb;
  background: #eff6ff;
}

.hiprint-designer-layer-item small {
  color: #6b7280;
}

.hiprint-designer-statusbar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 12px;
  border-top: 1px solid #e5e7eb;
  background: #fff;
  font-size: 12px;
  color: #6b7280;
}

.hiprint-designer-empty {
  padding: 12px;
  color: #6b7280;
  font-size: 13px;
}

.hiprint-designer-error {
  margin: 0;
  padding: 16px;
  color: crimson;
}
```

---

# 25. React 统一导出

## `packages/designer-react/src/index.ts`

```ts
export * from "./types";
export * from "./normalizeInputTemplate";

export * from "./context/DesignerContext";
export * from "./context/DesignerProvider";
export * from "./context/useDesignerContext";

export * from "./hooks/useDesignerState";
export * from "./hooks/useDesignerLayout";
export * from "./hooks/useDesignerCommands";
export * from "./hooks/useDesignerKeyboard";
export * from "./hooks/useCanvasPointer";
export * from "./hooks/useElementFactory";

export * from "./components/PrintDesigner";
export * from "./components/DesignerShell";
export * from "./components/DesignerToolbar";
export * from "./components/ElementPalette";
export * from "./components/DesignerCanvas";
export * from "./components/PropertyPanel";
export * from "./components/LayerPanel";
export * from "./components/StatusBar";
```

---

# 26. Vue Designer 包设计

Vue 版可以复用同一套 `designer-core`。Phase 7 的 Vue MVP 可以先做到功能对齐，但代码结构比 React 简化。

## `packages/designer-vue/package.json`

```json
{
  "name": "@hiprint-re/designer-vue",
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
    "@hiprint-re/designer-core": "workspace:*"
  },
  "peerDependencies": {
    "vue": ">=3.4.0"
  },
  "devDependencies": {
    "vue": "^3.5.0"
  }
}
```

---

## `packages/designer-vue/src/composables/useDesignerStore.ts`

```ts
import {
  onBeforeUnmount,
  ref,
  shallowRef,
  watch,
  toValue,
  type MaybeRefOrGetter,
} from "vue";
import {
  createDesignerStore,
  type DesignerState,
  type DesignerStore,
} from "@hiprint-re/designer-core";
import type { PrintTemplate } from "@hiprint-re/core";

export interface UseDesignerStoreInput {
  template: MaybeRefOrGetter<PrintTemplate>;
}

export function useDesignerStore(input: UseDesignerStoreInput) {
  const store = shallowRef<DesignerStore>();
  const state = ref<DesignerState>();

  let unsubscribe: (() => void) | undefined;

  function create() {
    unsubscribe?.();

    const nextStore = createDesignerStore({
      template: toValue(input.template),
    });

    store.value = nextStore;
    state.value = nextStore.getState();

    unsubscribe = nextStore.subscribe((nextState) => {
      state.value = nextState;
    });
  }

  watch(
    () => toValue(input.template),
    () => create(),
    {
      immediate: true,
    },
  );

  onBeforeUnmount(() => {
    unsubscribe?.();
  });

  return {
    store,
    state,
  };
}
```

---

## `packages/designer-vue/src/components/PrintDesigner.ts`

```ts
import { defineComponent, h, computed } from "vue";
import { fromLegacyTemplate, normalizeTemplate } from "@hiprint-re/core";
import { DesignerToolbar } from "./DesignerToolbar";
import { ElementPalette } from "./ElementPalette";
import { DesignerCanvas } from "./DesignerCanvas";
import { PropertyPanel } from "./PropertyPanel";
import { LayerPanel } from "./LayerPanel";
import { useDesignerStore } from "../composables/useDesignerStore";

export const PrintDesigner = defineComponent({
  name: "HiprintVueDesigner",

  props: {
    template: {
      type: null,
      required: true,
    },
    templateKind: {
      type: String,
      default: "auto",
    },
    data: {
      type: null,
      default: undefined,
    },
  },

  emits: ["change", "error"],

  setup(props, { emit }) {
    const coreTemplate = computed(() => {
      if (
        props.templateKind === "core" ||
        (props.templateKind === "auto" &&
          props.template &&
          typeof props.template === "object" &&
          "schemaVersion" in props.template)
      ) {
        return normalizeTemplate(props.template as any);
      }

      return fromLegacyTemplate(props.template as any);
    });

    const { store, state } = useDesignerStore({
      template: coreTemplate,
    });

    function handleChange() {
      if (store.value) {
        emit("change", store.value.getStateRef().template);
      }
    }

    return () => {
      if (!store.value || !state.value) {
        return h("div", "Loading...");
      }

      return h(
        "div",
        {
          class: "hiprint-designer",
        },
        [
          h(DesignerToolbar, {
            store: store.value,
            onChange: handleChange,
          }),

          h(
            "div",
            {
              class: "hiprint-designer-main",
            },
            [
              h(
                "aside",
                {
                  class: "hiprint-designer-left",
                },
                [
                  h(ElementPalette, {
                    store: store.value,
                    state: state.value,
                    onChange: handleChange,
                  }),
                  h(LayerPanel, {
                    store: store.value,
                    state: state.value,
                  }),
                ],
              ),

              h(
                "main",
                {
                  class: "hiprint-designer-center",
                },
                [
                  h(DesignerCanvas, {
                    store: store.value,
                    state: state.value,
                    data: props.data,
                    onChange: handleChange,
                  }),
                ],
              ),

              h(
                "aside",
                {
                  class: "hiprint-designer-right",
                },
                [
                  h(PropertyPanel, {
                    store: store.value,
                    state: state.value,
                    onChange: handleChange,
                  }),
                ],
              ),
            ],
          ),
        ],
      );
    };
  },
});
```

Vue 的其他组件可以直接照 React 的结构迁移。MVP 阶段建议先保证 React 版体验完整，Vue 版功能对齐后再补样式细节。

---

# 27. Playground React Designer

## 目录

```txt
apps/playground-designer-react/
├─ package.json
├─ index.html
├─ vite.config.ts
├─ tsconfig.json
└─ src/
   ├─ App.tsx
   ├─ main.tsx
   └─ style.css
```

---

## `apps/playground-designer-react/package.json`

```json
{
  "name": "@hiprint-re/playground-designer-react",
  "version": "0.0.0",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "vite --host 0.0.0.0",
    "build": "vite build",
    "typecheck": "tsc -p tsconfig.json --noEmit"
  },
  "dependencies": {
    "@hiprint-re/designer-react": "workspace:*",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^5.0.0",
    "typescript": "^5.0.0",
    "vite": "^7.0.0"
  }
}
```

---

## `apps/playground-designer-react/src/App.tsx`

```tsx
import { useState } from "react";
import { PrintDesigner } from "@hiprint-re/designer-react";

import basicTemplate from "../../../fixtures/templates/basic-text.json";
import basicData from "../../../fixtures/data/basic-text.data.json";

export function App() {
  const [template, setTemplate] = useState<any>(basicTemplate);

  return (
    <div className="app">
      <PrintDesigner
        template={template}
        templateKind="legacy"
        data={basicData}
        onChange={(nextTemplate) => {
          setTemplate(nextTemplate);
          console.log("[template changed]", nextTemplate);
        }}
        onError={(error) => {
          console.error(error);
        }}
      />
    </div>
  );
}
```

---

## `apps/playground-designer-react/src/main.tsx`

```tsx
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./style.css";

createRoot(document.querySelector("#root")!).render(<App />);
```

---

## `apps/playground-designer-react/src/style.css`

```css
html,
body,
#root,
.app {
  margin: 0;
  width: 100%;
  height: 100%;
}
```

---

# 28. 根脚本

```json
{
  "scripts": {
    "dev:designer-react": "pnpm --filter @hiprint-re/playground-designer-react dev",
    "dev:designer-vue": "pnpm --filter @hiprint-re/playground-designer-vue dev",
    "test:designer-react": "vitest run tests/designer-react",
    "test:designer-vue": "vitest run tests/designer-vue",
    "check:designer-react": "pnpm --filter @hiprint-re/designer-react typecheck && pnpm test:designer-react",
    "check:designer-vue": "pnpm --filter @hiprint-re/designer-vue typecheck && pnpm test:designer-vue"
  }
}
```

---

# 29. 测试设计

新增：

```txt
tests/designer-react/
├─ PrintDesigner.test.tsx
├─ ElementPalette.test.tsx
├─ PropertyPanel.test.tsx
└─ DesignerToolbar.test.tsx

tests/designer-vue/
├─ PrintDesigner.test.ts
└─ basic.test.ts
```

---

## `tests/designer-react/PrintDesigner.test.tsx`

```tsx
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { PrintDesigner } from "../../packages/designer-react/src";

import basicTemplate from "../../fixtures/templates/basic-text.json";
import basicData from "../../fixtures/data/basic-text.data.json";

describe("PrintDesigner", () => {
  it("should render designer shell", () => {
    const { container } = render(
      <div style={{ width: 1000, height: 800 }}>
        <PrintDesigner
          template={basicTemplate}
          templateKind="legacy"
          data={basicData}
        />
      </div>,
    );

    expect(container.querySelector(".hiprint-designer")).toBeTruthy();
    expect(container.querySelector(".hiprint-designer-toolbar")).toBeTruthy();
    expect(container.querySelector(".hiprint-designer-canvas")).toBeTruthy();
  });
});
```

---

## `tests/designer-react/ElementPalette.test.tsx`

```tsx
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { PrintDesigner } from "../../packages/designer-react/src";

import basicTemplate from "../../fixtures/templates/basic-text.json";
import basicData from "../../fixtures/data/basic-text.data.json";

describe("ElementPalette", () => {
  it("should add text element", () => {
    const onChange = vi.fn();

    const { getByText } = render(
      <div style={{ width: 1000, height: 800 }}>
        <PrintDesigner
          template={basicTemplate}
          templateKind="legacy"
          data={basicData}
          onChange={onChange}
        />
      </div>,
    );

    fireEvent.click(getByText("Text"));

    expect(onChange).toHaveBeenCalled();
  });
});
```

---

## `tests/designer-react/PropertyPanel.test.tsx`

```tsx
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { PrintDesigner } from "../../packages/designer-react/src";

import basicTemplate from "../../fixtures/templates/basic-text.json";
import basicData from "../../fixtures/data/basic-text.data.json";

describe("PropertyPanel", () => {
  it("should render empty state", () => {
    const { container } = render(
      <div style={{ width: 1000, height: 800 }}>
        <PrintDesigner
          template={basicTemplate}
          templateKind="legacy"
          data={basicData}
        />
      </div>,
    );

    expect(container.textContent).toContain("Properties");
  });
});
```

---

# 30. docs/phase-7.md

````md
# Phase 7 - React / Vue Designer MVP

## Goal

Build visible designer UI on top of `@hiprint-re/designer-core`.

## Packages

- `@hiprint-re/designer-react`
- `@hiprint-re/designer-vue`

## Deliverables

- Designer shell
- Toolbar
- Element palette
- Canvas
- Selection overlay
- Resize handles
- Property panel
- Layer panel
- Keyboard shortcuts
- React playground
- Vue playground

## Flow

```txt
UI event
  ↓
designer-react / designer-vue
  ↓
designer-core command
  ↓
DesignerState updated
  ↓
layoutTemplate
  ↓
mountLayout
  ↓
visual designer preview
```
````

## Non-goals

- Plugin market
- Complex table editor
- Ruler
- Advanced snapline rendering
- PDF export

````

---

# 31. docs/designer-react.md

```md
# React Designer

## Usage

```tsx
import { PrintDesigner } from "@hiprint-re/designer-react"

export function App() {
  return (
    <PrintDesigner
      template={template}
      templateKind="legacy"
      data={data}
      onChange={setTemplate}
    />
  )
}
````

## Components

- `PrintDesigner`
- `DesignerToolbar`
- `ElementPalette`
- `DesignerCanvas`
- `PropertyPanel`
- `LayerPanel`

## Rules

React Designer owns DOM events and UI only.

It must not duplicate:

- layout algorithm
- template schema
- command logic
- DOM renderer internals

````

---

# 32. Phase 7 验收标准

Phase 7 完成后，应满足：

```txt
1. 新增 @hiprint-re/designer-react
2. 新增 @hiprint-re/designer-vue
3. React PrintDesigner 可渲染
4. Vue PrintDesigner 可渲染
5. 能新增 text/image/line/rect/table 元素
6. 能在图层面板选中元素
7. 能在画布显示选中框
8. 能拖动元素
9. 能缩放元素
10. 能编辑基础属性
11. 能删除元素
12. 能复制/粘贴/duplicate
13. 能 undo/redo
14. 能 align
15. 能 print
16. onChange 能返回 core template
17. 不在 designer-react/vue 里复制 designer-core 逻辑
18. 不在 designer-react/vue 里复制 layout 逻辑
19. playground-designer-react 可运行
20. playground-designer-vue 可运行
21. tests/designer-react 通过
22. tests/designer-vue 通过
23. docs/phase-7.md 完成
````

---

# 33. 推荐 PR 拆分

## PR 1：React Designer Shell

```txt
feat(designer-react): add designer shell and provider
```

包含：

```txt
DesignerProvider
useDesignerState
DesignerShell
Toolbar
Palette
Panel layout
```

---

## PR 2：React Canvas + Selection

```txt
feat(designer-react): add canvas selection and element overlay
```

包含：

```txt
DesignerCanvas
SelectionOverlay
ResizeHandles
useCanvasPointer
```

---

## PR 3：React Property / Layer / Commands

```txt
feat(designer-react): add property panel and layer panel
```

包含：

```txt
PropertyPanel
LayerPanel
Keyboard
delete / duplicate / undo / redo
```

---

## PR 4：Vue Designer MVP

```txt
feat(designer-vue): add vue designer mvp
```

---

## PR 5：Playgrounds + Docs + Tests

```txt
feat(playground): add designer playgrounds
test(designer): add designer ui tests
docs(designer): document designer mvp
```

---

# 34. Phase 7 最小 TODO

```txt
[ ] 新建 packages/designer-react
[ ] 实现 DesignerProvider
[ ] 实现 useDesignerState
[ ] 实现 useDesignerLayout
[ ] 实现 useDesignerCommands
[ ] 实现 useDesignerKeyboard
[ ] 实现 PrintDesigner
[ ] 实现 DesignerShell
[ ] 实现 DesignerToolbar
[ ] 实现 ElementPalette
[ ] 实现 DesignerCanvas
[ ] 实现 SelectionOverlay
[ ] 实现 ResizeHandles
[ ] 实现 PropertyPanel
[ ] 实现 LayerPanel
[ ] 实现 StatusBar
[ ] 新建 packages/designer-vue
[ ] 实现 Vue PrintDesigner MVP
[ ] 新建 playground-designer-react
[ ] 新建 playground-designer-vue
[ ] 新增 tests/designer-react
[ ] 新增 tests/designer-vue
[ ] 新增 docs/phase-7.md
[ ] 新增 docs/designer-react.md
```

---

# 35. 关键风险点

## 1. Designer UI 不要绕过 command

错误：

```ts
element.x += 10;
```

正确：

```ts
store.dispatch(
  createMoveElementCommand({
    ids: [element.id],
    dx: 10,
    dy: 0,
  }),
);
```

否则 undo/redo 会失效。

---

## 2. pointermove 不要疯狂写 history

错误：

```txt
pointermove -> dispatch move command -> history push
```

正确：

```txt
pointerdown -> 记录起点
pointermove -> 本地 ghost transform
pointerup -> dispatch final command
```

MVP 里可以先只在 pointerup 更新。

---

## 3. React/Vue 不要重复实现 layout

错误：

```tsx
<div style={{ left: element.x }}>
```

正确：

```txt
layoutTemplate -> mountLayout -> overlay selection
```

预览内容必须来自 core layout + dom renderer。

---

## 4. 属性面板先简单，不要过早做 schema form

Phase 7 先写死基础属性：

```txt
x/y/width/height
field/title
text content
fontSize
image src
```

后面再做：

```txt
property schema
dynamic form
plugin-defined properties
```

---

# 36. 最终判断

Phase 7 的本质是：

```txt
把前面所有底层能力串成一个真正能操作的设计器
```

完成后，项目能力会从：

```txt
能预览打印
```

升级到：

```txt
能设计模板 + 预览打印
```

完整闭环变成：

```txt
用户新增/编辑元素
  ↓
designer-react/vue
  ↓
designer-core command
  ↓
core template 更新
  ↓
layoutTemplate 重新布局
  ↓
dom renderer 重新预览
  ↓
printLayout 打印
```

做到 Phase 7，你这个项目就已经具备 **打印设计器 MVP** 的雏形了。后续 Phase 8 再去补高级能力，比如属性 schema、复杂表格编辑、插件化元素、标尺/辅助线、模板导入导出体验。
