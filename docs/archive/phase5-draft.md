下面给你一版 **Phase 5：React / Vue Preview Adapter 适配层** 的详细设计与代码草案。

Phase 5 的定位是：

```txt
Phase 0：legacy 能跑
Phase 1：legacy 可审计
Phase 2：core schema / model / legacy adapter
Phase 3：core layout engine
Phase 4：DOM renderer / preview / print
Phase 5：React / Vue Preview Adapter
```

这一阶段的核心目标是：**让 React/Vue 项目可以直接使用 `@hiprint-re/core` + `@hiprint-re/dom` 的能力完成预览和打印。**

---

# 1. Phase 5 总目标

Phase 5 要完成：

```txt
1. 新增 @hiprint-re/react
2. 新增 @hiprint-re/vue
3. React 提供 usePrintLayout / usePrintPreview / PrintPreview
4. Vue 提供 usePrintLayout / usePrintPreview / PrintPreview
5. 支持 core template 输入
6. 支持 legacy template 输入
7. 支持 data 变化后重新 layout + render
8. 支持 warnings / error 回调
9. 支持 print()
10. 新增 React/Vue preview playground
```

最终使用效果：

```tsx
import { PrintPreview } from "@hiprint-re/react";

export function App() {
  return (
    <PrintPreview
      template={template}
      templateKind="legacy"
      data={data}
      onWarnings={console.warn}
    />
  );
}
```

Vue：

```vue
<template>
  <PrintPreview
    :template="template"
    template-kind="legacy"
    :data="data"
    @warnings="handleWarnings"
  />
</template>
```

---

# 2. Phase 5 不做什么

这一阶段不要做 designer。

```txt
不做拖拽
不做缩放
不做选区
不做属性面板
不做 undo / redo
不做插件市场
不做模板编辑器
不做复杂状态管理
不做 React/Vue 版完整设计器
```

Phase 5 只做：

```txt
template + data
  ↓
layout
  ↓
DOM preview
  ↓
print
```

---

# 3. 总体架构

```txt
@hiprint-re/core
  ├─ fromLegacyTemplate
  ├─ layoutTemplate
  └─ Validate / Schema

@hiprint-re/dom
  ├─ mountLayout
  ├─ previewLayout
  └─ printLayout

@hiprint-re/react
  ├─ usePrintLayout
  ├─ usePrintPreview
  ├─ usePrintActions
  └─ PrintPreview

@hiprint-re/vue
  ├─ usePrintLayout
  ├─ usePrintPreview
  ├─ usePrintActions
  └─ PrintPreview
```

核心原则：

```txt
core 负责数据和布局
dom 负责真实 DOM 渲染
react/vue 负责生命周期和响应式绑定
```

---

# 4. 推荐目录结构

```txt
packages/
├─ react/
│  ├─ package.json
│  ├─ tsconfig.json
│  └─ src/
│     ├─ index.ts
│     ├─ types.ts
│     ├─ utils.ts
│     ├─ normalizeInputTemplate.ts
│     ├─ useIsomorphicLayoutEffect.ts
│     ├─ usePrintLayout.ts
│     ├─ usePrintPreview.ts
│     ├─ usePrintActions.ts
│     └─ PrintPreview.tsx
│
└─ vue/
   ├─ package.json
   ├─ tsconfig.json
   └─ src/
      ├─ index.ts
      ├─ types.ts
      ├─ normalizeInputTemplate.ts
      ├─ usePrintLayout.ts
      ├─ usePrintPreview.ts
      ├─ usePrintActions.ts
      └─ components/
         └─ PrintPreview.ts
```

Playground：

```txt
apps/
├─ playground-react/
└─ playground-vue/
```

---

# 5. 统一输入模型

React/Vue 都应该支持两种模板输入：

```txt
1. core template
2. legacy template
```

所以先定义通用概念：

```ts
type TemplateKind = "core" | "legacy" | "auto";
```

`auto` 规则：

```txt
存在 schemaVersion => core
不存在 schemaVersion 但存在 panels => legacy
```

---

# 6. React 包设计

## 6.1 `packages/react/package.json`

```json
{
  "name": "@hiprint-re/react",
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

## 6.2 `packages/react/tsconfig.json`

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

## 6.3 React 类型定义

### `packages/react/src/types.ts`

```ts
import type {
  LayoutDocument,
  LayoutOptions,
  LayoutWarning,
  LegacyTemplate,
  PrintTemplate,
} from "@hiprint-re/core";
import type {
  DomRenderOptions,
  MountLayoutResult,
  PrintLayoutOptions,
} from "@hiprint-re/dom";

export type ReactTemplateKind = "core" | "legacy" | "auto";

export type ReactTemplateInput = PrintTemplate | LegacyTemplate | unknown;

export interface ReactPrintLayoutOptions {
  template: ReactTemplateInput;
  templateKind?: ReactTemplateKind;
  data?: unknown;
  layoutOptions?: LayoutOptions;
}

export interface UsePrintLayoutResult {
  layout: LayoutDocument | null;
  warnings: LayoutWarning[];
  error: Error | null;
}

export interface UsePrintPreviewOptions extends ReactPrintLayoutOptions {
  domOptions?: DomRenderOptions;
  onLayout?: (layout: LayoutDocument) => void;
  onWarnings?: (warnings: LayoutWarning[]) => void;
  onError?: (error: Error) => void;
}

export interface UsePrintPreviewResult {
  containerRef: React.RefObject<HTMLDivElement | null>;
  layout: LayoutDocument | null;
  warnings: LayoutWarning[];
  error: Error | null;
  mountResult: MountLayoutResult | null;
  refresh: () => void;
  print: (options?: PrintLayoutOptions) => Promise<void>;
}

export interface PrintPreviewProps extends UsePrintPreviewOptions {
  className?: string;
  style?: React.CSSProperties;
  loadingFallback?: React.ReactNode;
  errorFallback?: React.ReactNode | ((error: Error) => React.ReactNode);
}
```

---

## 6.4 模板归一化

### `packages/react/src/normalizeInputTemplate.ts`

```ts
import {
  fromLegacyTemplate,
  normalizeTemplate,
  type LegacyTemplate,
  type PrintTemplate,
} from "@hiprint-re/core";
import type { ReactTemplateKind, ReactTemplateInput } from "./types";

export function normalizeInputTemplate(
  template: ReactTemplateInput,
  kind: ReactTemplateKind = "auto",
): PrintTemplate {
  const resolvedKind = resolveTemplateKind(template, kind);

  if (resolvedKind === "core") {
    return normalizeTemplate(template as Partial<PrintTemplate>);
  }

  if (resolvedKind === "legacy") {
    return fromLegacyTemplate(template as LegacyTemplate);
  }

  throw new Error("[hiprint-re/react] Unable to detect template kind.");
}

function resolveTemplateKind(
  template: ReactTemplateInput,
  kind: ReactTemplateKind,
): Exclude<ReactTemplateKind, "auto"> {
  if (kind !== "auto") return kind;

  if (isRecord(template) && typeof template.schemaVersion === "string") {
    return "core";
  }

  if (isRecord(template) && Array.isArray(template.panels)) {
    return "legacy";
  }

  throw new Error("[hiprint-re/react] Invalid template input.");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
```

---

## 6.5 useIsomorphicLayoutEffect

避免 SSR 环境报 warning。

### `packages/react/src/useIsomorphicLayoutEffect.ts`

```ts
import { useEffect, useLayoutEffect } from "react";

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
```

---

## 6.6 usePrintLayout

负责：

```txt
template + data -> layout
```

### `packages/react/src/usePrintLayout.ts`

```ts
import { useMemo } from "react";
import { layoutTemplate, type LayoutWarning } from "@hiprint-re/core";
import type { ReactPrintLayoutOptions, UsePrintLayoutResult } from "./types";
import { normalizeInputTemplate } from "./normalizeInputTemplate";

export function usePrintLayout(
  options: ReactPrintLayoutOptions,
): UsePrintLayoutResult {
  return useMemo(() => {
    try {
      const coreTemplate = normalizeInputTemplate(
        options.template,
        options.templateKind ?? "auto",
      );

      const layout = layoutTemplate(
        coreTemplate,
        options.data ?? {},
        options.layoutOptions,
      );

      return {
        layout,
        warnings: layout.warnings as LayoutWarning[],
        error: null,
      };
    } catch (error) {
      return {
        layout: null,
        warnings: [],
        error: normalizeError(error),
      };
    }
  }, [
    options.template,
    options.templateKind,
    options.data,
    options.layoutOptions,
  ]);
}

function normalizeError(error: unknown): Error {
  return error instanceof Error ? error : new Error(String(error));
}
```

注意：这里依赖 `template/data/layoutOptions` 引用变化。使用方传新对象时会重新 layout。

---

## 6.7 usePrintPreview

负责：

```txt
layout -> mountLayout
```

### `packages/react/src/usePrintPreview.ts`

```ts
import { useCallback, useRef, useState } from "react";
import {
  mountLayout,
  printLayout,
  type MountLayoutResult,
  type PrintLayoutOptions,
} from "@hiprint-re/dom";
import type { UsePrintPreviewOptions, UsePrintPreviewResult } from "./types";
import { usePrintLayout } from "./usePrintLayout";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export function usePrintPreview(
  options: UsePrintPreviewOptions,
): UsePrintPreviewResult {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mountResultRef = useRef<MountLayoutResult | null>(null);
  const [version, setVersion] = useState(0);

  const { layout, warnings, error } = usePrintLayout(options);

  const refresh = useCallback(() => {
    setVersion((value) => value + 1);
  }, []);

  const print = useCallback(
    async (printOptions?: PrintLayoutOptions) => {
      if (!layout) {
        throw new Error(
          "[hiprint-re/react] Cannot print before layout is ready.",
        );
      }

      await printLayout(layout, {
        ...options.domOptions,
        ...printOptions,
      });
    },
    [layout, options.domOptions],
  );

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    if (mountResultRef.current) {
      mountResultRef.current.dispose();
      mountResultRef.current = null;
    }

    if (error) {
      options.onError?.(error);
      return;
    }

    if (!layout) return;

    try {
      const result = mountLayout(layout, container, options.domOptions);

      mountResultRef.current = result;

      options.onLayout?.(layout);

      if (layout.warnings.length > 0) {
        options.onWarnings?.(layout.warnings);
      }
    } catch (err) {
      const normalizedError =
        err instanceof Error ? err : new Error(String(err));

      options.onError?.(normalizedError);
    }

    return () => {
      if (mountResultRef.current) {
        mountResultRef.current.dispose();
        mountResultRef.current = null;
      }
    };
  }, [
    layout,
    error,
    version,
    options.domOptions,
    options.onLayout,
    options.onWarnings,
    options.onError,
  ]);

  return {
    containerRef,
    layout,
    warnings,
    error,
    mountResult: mountResultRef.current,
    refresh,
    print,
  };
}
```

---

## 6.8 usePrintActions

给只想拿 print 能力的场景用。

### `packages/react/src/usePrintActions.ts`

```ts
import { useCallback } from "react";
import { printLayout, type PrintLayoutOptions } from "@hiprint-re/dom";
import { usePrintLayout } from "./usePrintLayout";
import type { ReactPrintLayoutOptions } from "./types";

export function usePrintActions(options: ReactPrintLayoutOptions) {
  const { layout, warnings, error } = usePrintLayout(options);

  const print = useCallback(
    async (printOptions?: PrintLayoutOptions) => {
      if (!layout) {
        throw error ?? new Error("[hiprint-re/react] Layout is not ready.");
      }

      await printLayout(layout, printOptions);
    },
    [layout, error],
  );

  return {
    layout,
    warnings,
    error,
    print,
  };
}
```

---

## 6.9 PrintPreview 组件

### `packages/react/src/PrintPreview.tsx`

```tsx
import { forwardRef, useImperativeHandle } from "react";
import type { PrintPreviewProps, UsePrintPreviewResult } from "./types";
import { usePrintPreview } from "./usePrintPreview";

export interface PrintPreviewRef {
  refresh: () => void;
  print: UsePrintPreviewResult["print"];
  getLayout: () => UsePrintPreviewResult["layout"];
}

export const PrintPreview = forwardRef<PrintPreviewRef, PrintPreviewProps>(
  function PrintPreview(props, ref) {
    const {
      className,
      style,
      loadingFallback = null,
      errorFallback,
      ...previewOptions
    } = props;

    const preview = usePrintPreview(previewOptions);

    useImperativeHandle(
      ref,
      () => ({
        refresh: preview.refresh,
        print: preview.print,
        getLayout: () => preview.layout,
      }),
      [preview],
    );

    if (preview.error) {
      if (typeof errorFallback === "function") {
        return <>{errorFallback(preview.error)}</>;
      }

      if (errorFallback) {
        return <>{errorFallback}</>;
      }

      return (
        <div className={className} style={style}>
          <pre style={{ color: "crimson", whiteSpace: "pre-wrap" }}>
            {preview.error.message}
          </pre>
        </div>
      );
    }

    if (!preview.layout) {
      return <>{loadingFallback}</>;
    }

    return (
      <div
        ref={preview.containerRef}
        className={className}
        style={{
          width: "100%",
          height: "100%",
          overflow: "auto",
          ...style,
        }}
      />
    );
  },
);
```

---

## 6.10 React 统一导出

### `packages/react/src/index.ts`

```ts
export * from "./types";
export * from "./normalizeInputTemplate";
export * from "./usePrintLayout";
export * from "./usePrintPreview";
export * from "./usePrintActions";
export * from "./PrintPreview";
```

---

# 7. Vue 包设计

## 7.1 `packages/vue/package.json`

```json
{
  "name": "@hiprint-re/vue",
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

## 7.2 `packages/vue/tsconfig.json`

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "jsx": "preserve"
  },
  "include": ["src"]
}
```

---

## 7.3 Vue 类型定义

### `packages/vue/src/types.ts`

```ts
import type {
  LayoutDocument,
  LayoutOptions,
  LayoutWarning,
  LegacyTemplate,
  PrintTemplate,
} from "@hiprint-re/core";
import type {
  DomRenderOptions,
  MountLayoutResult,
  PrintLayoutOptions,
} from "@hiprint-re/dom";

export type VueTemplateKind = "core" | "legacy" | "auto";

export type VueTemplateInput = PrintTemplate | LegacyTemplate | unknown;

export interface VuePrintLayoutOptions {
  template: VueTemplateInput;
  templateKind?: VueTemplateKind;
  data?: unknown;
  layoutOptions?: LayoutOptions;
}

export interface VueUsePrintLayoutResult {
  layout: Readonly<import("vue").Ref<LayoutDocument | null>>;
  warnings: Readonly<import("vue").Ref<LayoutWarning[]>>;
  error: Readonly<import("vue").Ref<Error | null>>;
}

export interface VueUsePrintPreviewOptions extends VuePrintLayoutOptions {
  domOptions?: DomRenderOptions;
  onLayout?: (layout: LayoutDocument) => void;
  onWarnings?: (warnings: LayoutWarning[]) => void;
  onError?: (error: Error) => void;
}

export interface VueUsePrintPreviewResult {
  containerRef: import("vue").Ref<HTMLElement | null>;
  layout: import("vue").Ref<LayoutDocument | null>;
  warnings: import("vue").Ref<LayoutWarning[]>;
  error: import("vue").Ref<Error | null>;
  mountResult: import("vue").Ref<MountLayoutResult | null>;
  refresh: () => void;
  print: (options?: PrintLayoutOptions) => Promise<void>;
}
```

---

## 7.4 Vue 模板归一化

### `packages/vue/src/normalizeInputTemplate.ts`

```ts
import {
  fromLegacyTemplate,
  normalizeTemplate,
  type LegacyTemplate,
  type PrintTemplate,
} from "@hiprint-re/core";
import type { VueTemplateInput, VueTemplateKind } from "./types";

export function normalizeInputTemplate(
  template: VueTemplateInput,
  kind: VueTemplateKind = "auto",
): PrintTemplate {
  const resolvedKind = resolveTemplateKind(template, kind);

  if (resolvedKind === "core") {
    return normalizeTemplate(template as Partial<PrintTemplate>);
  }

  if (resolvedKind === "legacy") {
    return fromLegacyTemplate(template as LegacyTemplate);
  }

  throw new Error("[hiprint-re/vue] Unable to detect template kind.");
}

function resolveTemplateKind(
  template: VueTemplateInput,
  kind: VueTemplateKind,
): Exclude<VueTemplateKind, "auto"> {
  if (kind !== "auto") return kind;

  if (isRecord(template) && typeof template.schemaVersion === "string") {
    return "core";
  }

  if (isRecord(template) && Array.isArray(template.panels)) {
    return "legacy";
  }

  throw new Error("[hiprint-re/vue] Invalid template input.");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
```

---

## 7.5 usePrintLayout

### `packages/vue/src/usePrintLayout.ts`

```ts
import { computed, toValue, type MaybeRefOrGetter } from "vue";
import {
  layoutTemplate,
  type LayoutDocument,
  type LayoutWarning,
  type LayoutOptions,
} from "@hiprint-re/core";
import { normalizeInputTemplate } from "./normalizeInputTemplate";
import type { VueTemplateInput, VueTemplateKind } from "./types";

export interface UsePrintLayoutInput {
  template: MaybeRefOrGetter<VueTemplateInput>;
  templateKind?: MaybeRefOrGetter<VueTemplateKind | undefined>;
  data?: MaybeRefOrGetter<unknown>;
  layoutOptions?: MaybeRefOrGetter<LayoutOptions | undefined>;
}

export function usePrintLayout(input: UsePrintLayoutInput) {
  const result = computed<{
    layout: LayoutDocument | null;
    warnings: LayoutWarning[];
    error: Error | null;
  }>(() => {
    try {
      const coreTemplate = normalizeInputTemplate(
        toValue(input.template),
        toValue(input.templateKind) ?? "auto",
      );

      const layout = layoutTemplate(
        coreTemplate,
        toValue(input.data) ?? {},
        toValue(input.layoutOptions),
      );

      return {
        layout,
        warnings: layout.warnings,
        error: null,
      };
    } catch (error) {
      return {
        layout: null,
        warnings: [],
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
  });

  const layout = computed(() => result.value.layout);
  const warnings = computed(() => result.value.warnings);
  const error = computed(() => result.value.error);

  return {
    layout,
    warnings,
    error,
  };
}
```

---

## 7.6 usePrintPreview

### `packages/vue/src/usePrintPreview.ts`

```ts
import {
  nextTick,
  onBeforeUnmount,
  ref,
  toValue,
  watch,
  type MaybeRefOrGetter,
} from "vue";
import {
  mountLayout,
  printLayout,
  type DomRenderOptions,
  type MountLayoutResult,
  type PrintLayoutOptions,
} from "@hiprint-re/dom";
import type { LayoutDocument, LayoutOptions } from "@hiprint-re/core";
import type { VueTemplateInput, VueTemplateKind } from "./types";
import { usePrintLayout } from "./usePrintLayout";

export interface UsePrintPreviewInput {
  template: MaybeRefOrGetter<VueTemplateInput>;
  templateKind?: MaybeRefOrGetter<VueTemplateKind | undefined>;
  data?: MaybeRefOrGetter<unknown>;
  layoutOptions?: MaybeRefOrGetter<LayoutOptions | undefined>;
  domOptions?: MaybeRefOrGetter<DomRenderOptions | undefined>;
  onLayout?: (layout: LayoutDocument) => void;
  onWarnings?: (warnings: LayoutDocument["warnings"]) => void;
  onError?: (error: Error) => void;
}

export function usePrintPreview(input: UsePrintPreviewInput) {
  const containerRef = ref<HTMLElement | null>(null);
  const mountResult = ref<MountLayoutResult | null>(null);
  const refreshVersion = ref(0);

  const { layout, warnings, error } = usePrintLayout(input);

  function dispose() {
    if (mountResult.value) {
      mountResult.value.dispose();
      mountResult.value = null;
    }
  }

  async function render() {
    await nextTick();

    const container = containerRef.value;

    if (!container) return;

    dispose();

    if (error.value) {
      input.onError?.(error.value);
      return;
    }

    if (!layout.value) return;

    try {
      const result = mountLayout(
        layout.value,
        container,
        toValue(input.domOptions),
      );

      mountResult.value = result;

      input.onLayout?.(layout.value);

      if (layout.value.warnings.length > 0) {
        input.onWarnings?.(layout.value.warnings);
      }
    } catch (err) {
      const normalizedError =
        err instanceof Error ? err : new Error(String(err));

      input.onError?.(normalizedError);
    }
  }

  watch(
    [layout, error, refreshVersion, () => toValue(input.domOptions)],
    () => {
      void render();
    },
    {
      immediate: true,
      deep: false,
    },
  );

  onBeforeUnmount(() => {
    dispose();
  });

  function refresh() {
    refreshVersion.value += 1;
  }

  async function print(options?: PrintLayoutOptions) {
    if (!layout.value) {
      throw error.value ?? new Error("[hiprint-re/vue] Layout is not ready.");
    }

    await printLayout(layout.value, {
      ...toValue(input.domOptions),
      ...options,
    });
  }

  return {
    containerRef,
    layout,
    warnings,
    error,
    mountResult,
    refresh,
    print,
  };
}
```

---

## 7.7 usePrintActions

### `packages/vue/src/usePrintActions.ts`

```ts
import { toValue, type MaybeRefOrGetter } from "vue";
import { printLayout, type PrintLayoutOptions } from "@hiprint-re/dom";
import type { LayoutOptions } from "@hiprint-re/core";
import type { VueTemplateInput, VueTemplateKind } from "./types";
import { usePrintLayout } from "./usePrintLayout";

export interface UsePrintActionsInput {
  template: MaybeRefOrGetter<VueTemplateInput>;
  templateKind?: MaybeRefOrGetter<VueTemplateKind | undefined>;
  data?: MaybeRefOrGetter<unknown>;
  layoutOptions?: MaybeRefOrGetter<LayoutOptions | undefined>;
}

export function usePrintActions(input: UsePrintActionsInput) {
  const { layout, warnings, error } = usePrintLayout(input);

  async function print(options?: PrintLayoutOptions) {
    if (!layout.value) {
      throw error.value ?? new Error("[hiprint-re/vue] Layout is not ready.");
    }

    await printLayout(layout.value, options);
  }

  return {
    layout,
    warnings,
    error,
    print,
  };
}
```

---

## 7.8 Vue PrintPreview 组件

这里用 `defineComponent` 写 TS 组件，方便直接在 `src/components/PrintPreview.ts` 中维护。

### `packages/vue/src/components/PrintPreview.ts`

```ts
import { defineComponent, h, toRef } from "vue";
import type { LayoutOptions } from "@hiprint-re/core";
import type { DomRenderOptions } from "@hiprint-re/dom";
import type { VueTemplateInput, VueTemplateKind } from "../types";
import { usePrintPreview } from "../usePrintPreview";

export const PrintPreview = defineComponent({
  name: "HiprintPrintPreview",

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
    layoutOptions: {
      type: Object,
      default: undefined,
    },
    domOptions: {
      type: Object,
      default: undefined,
    },
    className: {
      type: String,
      default: undefined,
    },
  },

  emits: ["layout", "warnings", "error"],

  setup(props, { emit, expose }) {
    const preview = usePrintPreview({
      template: toRef(props, "template") as unknown as () => VueTemplateInput,
      templateKind: toRef(
        props,
        "templateKind",
      ) as unknown as () => VueTemplateKind,
      data: toRef(props, "data"),
      layoutOptions: toRef(props, "layoutOptions") as unknown as () =>
        | LayoutOptions
        | undefined,
      domOptions: toRef(props, "domOptions") as unknown as () =>
        | DomRenderOptions
        | undefined,

      onLayout(layout) {
        emit("layout", layout);
      },

      onWarnings(warnings) {
        emit("warnings", warnings);
      },

      onError(error) {
        emit("error", error);
      },
    });

    expose({
      refresh: preview.refresh,
      print: preview.print,
      getLayout: () => preview.layout.value,
    });

    return () => {
      if (preview.error.value) {
        return h(
          "pre",
          {
            style: {
              color: "crimson",
              whiteSpace: "pre-wrap",
            },
          },
          preview.error.value.message,
        );
      }

      return h("div", {
        ref: preview.containerRef,
        class: props.className,
        style: {
          width: "100%",
          height: "100%",
          overflow: "auto",
        },
      });
    };
  },
});
```

这里的 `toRef` 类型会稍微绕，后面可以用更明确的 props 类型重构。Phase 5 先保证 API 跑通。

---

## 7.9 Vue 统一导出

### `packages/vue/src/index.ts`

```ts
export * from "./types";
export * from "./normalizeInputTemplate";
export * from "./usePrintLayout";
export * from "./usePrintPreview";
export * from "./usePrintActions";
export * from "./components/PrintPreview";
```

---

# 8. React Playground

## 8.1 目录

```txt
apps/playground-react/
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

## 8.2 `apps/playground-react/package.json`

```json
{
  "name": "@hiprint-re/playground-react",
  "version": "0.0.0",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "vite --host 0.0.0.0",
    "build": "vite build",
    "typecheck": "tsc -p tsconfig.json --noEmit"
  },
  "dependencies": {
    "@hiprint-re/react": "workspace:*",
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

## 8.3 `apps/playground-react/vite.config.ts`

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
  },
});
```

---

## 8.4 `apps/playground-react/src/App.tsx`

```tsx
import { useRef } from "react";
import { PrintPreview, type PrintPreviewRef } from "@hiprint-re/react";

import basicTemplate from "../../../fixtures/templates/basic-text.json";
import basicData from "../../../fixtures/data/basic-text.data.json";

export function App() {
  const previewRef = useRef<PrintPreviewRef>(null);

  return (
    <div className="app">
      <div className="toolbar">
        <button onClick={() => previewRef.current?.refresh()}>Refresh</button>

        <button onClick={() => previewRef.current?.print()}>Print</button>
      </div>

      <div className="preview">
        <PrintPreview
          ref={previewRef}
          template={basicTemplate}
          templateKind="legacy"
          data={basicData}
          onWarnings={(warnings) => {
            console.warn("[warnings]", warnings);
          }}
          onError={(error) => {
            console.error("[error]", error);
          }}
        />
      </div>
    </div>
  );
}
```

---

## 8.5 `apps/playground-react/src/main.tsx`

```tsx
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./style.css";

createRoot(document.querySelector("#root")!).render(<App />);
```

---

## 8.6 `apps/playground-react/index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>hiprint react playground</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## 8.7 `apps/playground-react/src/style.css`

```css
* {
  box-sizing: border-box;
}

html,
body,
#root {
  margin: 0;
  width: 100%;
  height: 100%;
}

body {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

.app {
  width: 100%;
  height: 100%;
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

.preview {
  height: calc(100% - 48px);
}
```

---

# 9. Vue Playground

## 9.1 目录

```txt
apps/playground-vue/
├─ package.json
├─ index.html
├─ vite.config.ts
├─ tsconfig.json
└─ src/
   ├─ App.vue
   ├─ main.ts
   └─ style.css
```

---

## 9.2 `apps/playground-vue/package.json`

```json
{
  "name": "@hiprint-re/playground-vue",
  "version": "0.0.0",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "vite --host 0.0.0.0",
    "build": "vite build",
    "typecheck": "vue-tsc -p tsconfig.json --noEmit"
  },
  "dependencies": {
    "@hiprint-re/vue": "workspace:*",
    "vue": "^3.5.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^6.0.0",
    "typescript": "^5.0.0",
    "vite": "^7.0.0",
    "vue-tsc": "^3.0.0"
  }
}
```

---

## 9.3 `apps/playground-vue/vite.config.ts`

```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5176,
  },
});
```

---

## 9.4 `apps/playground-vue/src/App.vue`

```vue
<script setup lang="ts">
import { ref } from "vue";
import { PrintPreview } from "@hiprint-re/vue";

import basicTemplate from "../../../fixtures/templates/basic-text.json";
import basicData from "../../../fixtures/data/basic-text.data.json";

const previewRef = ref<{
  refresh: () => void;
  print: () => Promise<void>;
  getLayout: () => unknown;
} | null>(null);

function refresh() {
  previewRef.value?.refresh();
}

async function print() {
  await previewRef.value?.print();
}

function handleWarnings(warnings: unknown[]) {
  console.warn("[warnings]", warnings);
}

function handleError(error: Error) {
  console.error("[error]", error);
}
</script>

<template>
  <div class="app">
    <div class="toolbar">
      <button @click="refresh">Refresh</button>
      <button @click="print">Print</button>
    </div>

    <div class="preview">
      <PrintPreview
        ref="previewRef"
        :template="basicTemplate"
        template-kind="legacy"
        :data="basicData"
        @warnings="handleWarnings"
        @error="handleError"
      />
    </div>
  </div>
</template>
```

---

## 9.5 `apps/playground-vue/src/main.ts`

```ts
import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";

createApp(App).mount("#app");
```

---

## 9.6 `apps/playground-vue/index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>hiprint vue playground</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

---

## 9.7 `apps/playground-vue/src/style.css`

```css
* {
  box-sizing: border-box;
}

html,
body,
#app {
  margin: 0;
  width: 100%;
  height: 100%;
}

body {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

.app {
  width: 100%;
  height: 100%;
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

.preview {
  height: calc(100% - 48px);
}
```

---

# 10. 根 package.json 脚本

新增：

```json
{
  "scripts": {
    "dev:react": "pnpm --filter @hiprint-re/playground-react dev",
    "dev:vue": "pnpm --filter @hiprint-re/playground-vue dev",
    "test:react": "vitest run tests/react",
    "test:vue": "vitest run tests/vue",
    "check:react": "pnpm --filter @hiprint-re/react typecheck && pnpm test:react",
    "check:vue": "pnpm --filter @hiprint-re/vue typecheck && pnpm test:vue",
    "check:adapters": "pnpm check:react && pnpm check:vue"
  }
}
```

---

# 11. 测试设计

Phase 5 的测试重点不是视觉，而是：

```txt
1. hook 能生成 layout
2. PrintPreview 能 mount DOM
3. error 能被暴露
4. print 方法存在
```

---

## 11.1 React 测试

安装依赖：

```bash
pnpm add -D @testing-library/react @testing-library/dom -w
```

### `tests/react/usePrintLayout.test.tsx`

```tsx
import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePrintLayout } from "../../packages/react/src";
import basicTemplate from "../../fixtures/templates/basic-text.json";
import basicData from "../../fixtures/data/basic-text.data.json";

describe("usePrintLayout", () => {
  it("should create layout from legacy template", () => {
    const { result } = renderHook(() =>
      usePrintLayout({
        template: basicTemplate,
        templateKind: "legacy",
        data: basicData,
      }),
    );

    expect(result.current.error).toBe(null);
    expect(result.current.layout).toBeTruthy();
    expect(result.current.layout?.pages.length).toBeGreaterThan(0);
  });
});
```

---

### `tests/react/PrintPreview.test.tsx`

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { PrintPreview } from "../../packages/react/src";
import basicTemplate from "../../fixtures/templates/basic-text.json";
import basicData from "../../fixtures/data/basic-text.data.json";

describe("PrintPreview", () => {
  it("should render preview container", () => {
    const { container } = render(
      <div style={{ width: 800, height: 600 }}>
        <PrintPreview
          template={basicTemplate}
          templateKind="legacy"
          data={basicData}
        />
      </div>,
    );

    expect(container.querySelector(".hiprint-re-document")).toBeTruthy();
  });
});
```

---

## 11.2 Vue 测试

安装依赖：

```bash
pnpm add -D @vue/test-utils -w
```

### `tests/vue/usePrintLayout.test.ts`

```ts
import { describe, expect, it } from "vitest";
import { usePrintLayout } from "../../packages/vue/src";
import basicTemplate from "../../fixtures/templates/basic-text.json";
import basicData from "../../fixtures/data/basic-text.data.json";

describe("vue usePrintLayout", () => {
  it("should create layout from legacy template", () => {
    const { layout, error } = usePrintLayout({
      template: basicTemplate,
      templateKind: "legacy",
      data: basicData,
    });

    expect(error.value).toBe(null);
    expect(layout.value).toBeTruthy();
    expect(layout.value?.pages.length).toBeGreaterThan(0);
  });
});
```

---

### `tests/vue/PrintPreview.test.ts`

```ts
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { PrintPreview } from "../../packages/vue/src";
import basicTemplate from "../../fixtures/templates/basic-text.json";
import basicData from "../../fixtures/data/basic-text.data.json";

describe("Vue PrintPreview", () => {
  it("should mount preview", async () => {
    const wrapper = mount(PrintPreview, {
      props: {
        template: basicTemplate,
        templateKind: "legacy",
        data: basicData,
      },
      attachTo: document.body,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.element.querySelector(".hiprint-re-document")).toBeTruthy();
  });
});
```

---

# 12. docs/react.md

````md
# React Adapter

`@hiprint-re/react` provides React bindings for previewing and printing templates.

## APIs

```ts
usePrintLayout(options)
usePrintPreview(options)
usePrintActions(options)
<PrintPreview />
```
````

## Example

```tsx
import { PrintPreview } from "@hiprint-re/react";

export function App() {
  return <PrintPreview template={template} templateKind="legacy" data={data} />;
}
```

## Rules

React adapter must not implement layout or rendering logic.

It only connects:

```txt
core layout + dom renderer
  ↓
React lifecycle
```

## Non-goals

- Designer
- Drag
- Resize
- Property panel

````

---

# 13. docs/vue.md

```md
# Vue Adapter

`@hiprint-re/vue` provides Vue 3 bindings for previewing and printing templates.

## APIs

```ts
usePrintLayout(options)
usePrintPreview(options)
usePrintActions(options)
<PrintPreview />
````

## Example

```vue
<template>
  <PrintPreview :template="template" template-kind="legacy" :data="data" />
</template>
```

## Rules

Vue adapter must not implement layout or rendering logic.

It only connects:

```txt
core layout + dom renderer
  ↓
Vue lifecycle
```

## Non-goals

- Designer
- Drag
- Resize
- Property panel

````

---

# 14. docs/phase-5.md

```md
# Phase 5 - React / Vue Preview Adapters

## Goal

Provide framework adapters for previewing and printing templates.

## Packages

- `@hiprint-re/react`
- `@hiprint-re/vue`

## Flow

```txt
template + data
  ↓
fromLegacyTemplate / normalizeTemplate
  ↓
layoutTemplate
  ↓
mountLayout / printLayout
  ↓
React / Vue lifecycle
````

## Deliverables

- React hooks
- React PrintPreview
- Vue composables
- Vue PrintPreview
- React playground
- Vue playground
- adapter tests

## Non-goals

- Designer
- Editing
- Drag/resize
- Command system
- Plugin market

````

---

# 15. Phase 5 验收标准

Phase 5 完成后，应满足：

```txt
1. 新增 @hiprint-re/react
2. 新增 @hiprint-re/vue
3. React usePrintLayout 可用
4. React usePrintPreview 可用
5. React PrintPreview 可用
6. React PrintPreview ref 支持 refresh / print / getLayout
7. Vue usePrintLayout 可用
8. Vue usePrintPreview 可用
9. Vue PrintPreview 可用
10. Vue expose 支持 refresh / print / getLayout
11. 支持 templateKind = core / legacy / auto
12. 支持 data 变化后重新渲染
13. 支持 warnings / error 回调
14. 不在 React/Vue 包里实现 layout 逻辑
15. 不在 React/Vue 包里直接操作 legacy runtime
16. playground-react 可运行
17. playground-vue 可运行
18. tests/react 通过
19. tests/vue 通过
20. docs/phase-5.md 完成
````

---

# 16. 推荐 PR 拆分

## PR 1：React adapter

```txt
feat(react): add print preview adapter
```

包含：

```txt
packages/react
usePrintLayout
usePrintPreview
usePrintActions
PrintPreview
tests/react
```

---

## PR 2：Vue adapter

```txt
feat(vue): add print preview adapter
```

包含：

```txt
packages/vue
usePrintLayout
usePrintPreview
usePrintActions
PrintPreview
tests/vue
```

---

## PR 3：Playgrounds

```txt
feat(playground): add react and vue preview playgrounds
```

包含：

```txt
apps/playground-react
apps/playground-vue
```

---

## PR 4：Docs

```txt
docs(adapters): document react and vue preview adapters
```

包含：

```txt
docs/react.md
docs/vue.md
docs/phase-5.md
```

---

# 17. Phase 5 最小 TODO

```txt
[ ] 新建 packages/react
[ ] 实现 React normalizeInputTemplate
[ ] 实现 React usePrintLayout
[ ] 实现 React usePrintPreview
[ ] 实现 React usePrintActions
[ ] 实现 React PrintPreview
[ ] 新建 packages/vue
[ ] 实现 Vue normalizeInputTemplate
[ ] 实现 Vue usePrintLayout
[ ] 实现 Vue usePrintPreview
[ ] 实现 Vue usePrintActions
[ ] 实现 Vue PrintPreview
[ ] 新建 apps/playground-react
[ ] 新建 apps/playground-vue
[ ] 新增 tests/react
[ ] 新增 tests/vue
[ ] 新增 docs/react.md
[ ] 新增 docs/vue.md
[ ] 新增 docs/phase-5.md
```

---

# 18. 关键风险点

## 1. React/Vue 不要复制 layout 逻辑

错误：

```ts
// packages/react 里自己计算元素坐标
```

正确：

```ts
const layout = layoutTemplate(coreTemplate, data);
```

---

## 2. React/Vue 不要直接碰 legacy runtime

错误：

```ts
window.hiprintTemplate;
```

正确：

```ts
fromLegacyTemplate(legacyTemplate);
```

Phase 5 的 React/Vue 适配层应基于 `core + dom`，不是基于 `legacy`。

---

## 3. 注意生命周期清理

React/Vue 组件卸载时必须调用：

```ts
mountResult.dispose();
```

否则 DOM 会残留，后续重新渲染可能重复插入 page。

---

## 4. SSR 环境要避免直接访问 document

React 用：

```ts
useIsomorphicLayoutEffect;
```

Vue 在 `nextTick` 之后检查：

```ts
containerRef.value;
```

真正 DOM 操作都由 `@hiprint-re/dom` 执行，并且只在浏览器生命周期内触发。

---

# 19. 最终判断

Phase 5 的本质是：

```txt
让 core/dom 的打印预览能力进入真实前端框架生态
```

完成后你的链路会变成：

```txt
React/Vue App
  ↓
PrintPreview
  ↓
usePrintLayout
  ↓
fromLegacyTemplate / normalizeTemplate
  ↓
layoutTemplate
  ↓
mountLayout
  ↓
DOM preview / browser print
```

到 Phase 5 结束，这个项目已经可以作为一个 **可嵌入 React/Vue 项目的打印预览库** 使用。

下一阶段才建议进入真正复杂的：

```txt
Phase 6：designer state / command / selection / history
Phase 7：React/Vue Designer
```

Phase 5 不要急着做设计器，把 preview adapter 先做稳。
