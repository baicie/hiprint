下面给你一版 **Phase 8：设计器高级化与可扩展基础** 的详细设计与代码草案。

Phase 8 的定位是：

```txt
Phase 7：能用的 Designer MVP
Phase 8：让 Designer 从“写死 UI”升级为“可扩展设计器”
```

这一阶段重点不是继续堆 UI，而是把 Phase 7 里写死的东西抽象掉：

```txt
写死元素面板     → 元素注册表
写死属性面板     → 属性 schema 驱动
简单拖拽         → 实时 ghost + snapline
无标尺           → ruler / guide 基础
无导入导出体验   → template import/export
```

---

# 1. Phase 8 总目标

Phase 8 建议做这些：

```txt
1. 增强 @hiprint-re/core 的 ElementRegistry
2. 引入 PropertySchema，支持属性面板动态生成
3. 内置 text/image/line/rect/table 的属性 schema
4. designer-core 增强 snapline / guide / drag ghost 状态
5. designer-react 使用 schema 驱动属性面板
6. designer-react 支持 ruler / snapline overlay
7. designer-react 支持 import / export template
8. designer-react 支持 zoom 控制
9. designer-vue 对齐基础能力
10. 增加插件式元素注册基础
```

Phase 8 完成后，设计器应该从：

```txt
只能改写死的几个字段
```

升级为：

```txt
元素定义自己声明属性面板
设计器根据 schema 自动渲染属性表单
后续新增元素不需要大改 PropertyPanel
```

---

# 2. Phase 8 不做什么

Phase 8 不建议吃太多复杂功能。

暂时不做：

```txt
不做完整插件市场
不做远程插件加载
不做复杂表格单元格编辑器
不做合并单元格
不做表格跨页高级算法
不做 PDF 导出
不做多人协同
不做云端模板管理
```

复杂表格编辑建议放 Phase 9。

---

# 3. Phase 8 最终架构

```txt
@hiprint-re/core
  ├─ ElementRegistry
  ├─ ElementDefinition
  ├─ PropertySchema
  └─ builtin element definitions

@hiprint-re/designer-core
  ├─ snapline
  ├─ guide
  ├─ drag ghost
  ├─ viewport command
  └─ import/export helpers

@hiprint-re/designer-react
  ├─ DynamicPropertyPanel
  ├─ ElementPalette from registry
  ├─ Ruler
  ├─ SnaplineOverlay
  ├─ TemplateImportExport
  └─ enhanced canvas pointer

@hiprint-re/designer-vue
  └─ 对齐 React 的核心能力
```

---

# 4. 推荐新增目录

## `packages/core`

```txt
packages/core/src/
├─ property/
│  ├─ types.ts
│  ├─ createPropertySchema.ts
│  └─ index.ts
│
├─ registry/
│  ├─ elementRegistry.ts
│  ├─ builtinElements.ts
│  ├─ builtinPropertySchemas.ts
│  └─ index.ts
```

## `packages/designer-core`

```txt
packages/designer-core/src/
├─ guides/
│  ├─ types.ts
│  ├─ guideManager.ts
│  └─ index.ts
│
├─ geometry/
│  ├─ snap.ts          # 增强
│  ├─ ruler.ts
│  └─ viewport.ts
│
├─ command/commands/
│  ├─ setViewport.ts
│  ├─ setMode.ts
│  └─ updateGuides.ts
│
├─ io/
│  ├─ exportTemplate.ts
│  └─ importTemplate.ts
```

## `packages/designer-react`

```txt
packages/designer-react/src/
├─ registry/
│  ├─ DesignerRegistryContext.tsx
│  └─ useDesignerRegistry.ts
│
├─ components/
│  ├─ DynamicPropertyPanel.tsx
│  ├─ PropertyField.tsx
│  ├─ Ruler.tsx
│  ├─ SnaplineOverlay.tsx
│  ├─ TemplateActions.tsx
│  └─ ZoomControls.tsx
│
├─ hooks/
│  ├─ useTemplateIO.ts
│  ├─ useSnapDrag.ts
│  └─ useDesignerRegistry.ts
```

---

# 5. Core：PropertySchema 设计

## `packages/core/src/property/types.ts`

```ts
export type PropertyFieldType =
  | "text"
  | "number"
  | "boolean"
  | "select"
  | "color"
  | "textarea"
  | "image"
  | "field"
  | "json";

export interface PropertyOption {
  label: string;
  value: string | number | boolean;
}

export interface PropertyFieldSchema {
  key: string;
  label: string;
  type: PropertyFieldType;
  group?: string;
  placeholder?: string;
  defaultValue?: unknown;
  options?: PropertyOption[];
  min?: number;
  max?: number;
  step?: number;
  readonly?: boolean;
  hidden?: boolean;
}

export interface PropertyGroupSchema {
  key: string;
  label: string;
  order?: number;
}

export interface ElementPropertySchema {
  groups: PropertyGroupSchema[];
  fields: PropertyFieldSchema[];
}
```

---

## `packages/core/src/property/createPropertySchema.ts`

```ts
import type {
  ElementPropertySchema,
  PropertyFieldSchema,
  PropertyGroupSchema,
} from "./types";

export function createPropertySchema(input: {
  groups?: PropertyGroupSchema[];
  fields: PropertyFieldSchema[];
}): ElementPropertySchema {
  return {
    groups: input.groups ?? inferGroups(input.fields),
    fields: input.fields,
  };
}

function inferGroups(fields: PropertyFieldSchema[]): PropertyGroupSchema[] {
  const groups = new Map<string, PropertyGroupSchema>();

  for (const field of fields) {
    const key = field.group ?? "base";

    if (!groups.has(key)) {
      groups.set(key, {
        key,
        label: key,
      });
    }
  }

  return [...groups.values()];
}
```

---

## `packages/core/src/property/index.ts`

```ts
export * from "./types";
export * from "./createPropertySchema";
```

---

# 6. Core：增强 ElementRegistry

之前 Phase 3 的 `ElementRegistry` 只保存基础信息。Phase 8 要让它保存：

```txt
1. 元素类型
2. 默认尺寸
3. 默认元素创建方法
4. 属性 schema
5. 是否内置
```

## `packages/core/src/registry/elementRegistry.ts`

```ts
import type { PrintElement, PrintElementType } from "../types/element";
import type { ElementPropertySchema } from "../property";

export interface CreateElementInput {
  id: string;
  x: number;
  y: number;
}

export interface ElementDefinition {
  type: PrintElementType;
  name: string;
  description?: string;
  builtin?: boolean;

  defaultWidth: number;
  defaultHeight: number;

  createElement: (input: CreateElementInput) => PrintElement;

  propertySchema?: ElementPropertySchema;
}

export class ElementRegistry {
  private definitions = new Map<string, ElementDefinition>();

  register(definition: ElementDefinition): void {
    this.definitions.set(definition.type, definition);
  }

  unregister(type: string): void {
    this.definitions.delete(type);
  }

  get(type: string): ElementDefinition | undefined {
    return this.definitions.get(type);
  }

  has(type: string): boolean {
    return this.definitions.has(type);
  }

  list(): ElementDefinition[] {
    return [...this.definitions.values()];
  }

  createElement(
    type: string,
    input: CreateElementInput,
  ): PrintElement | undefined {
    return this.get(type)?.createElement(input);
  }
}

export function createElementRegistry(
  definitions: ElementDefinition[] = [],
): ElementRegistry {
  const registry = new ElementRegistry();

  for (const definition of definitions) {
    registry.register(definition);
  }

  return registry;
}
```

---

# 7. Core：内置属性 schema

## `packages/core/src/registry/builtinPropertySchemas.ts`

```ts
import { createPropertySchema } from "../property";

export const commonGeometryFields = [
  {
    key: "x",
    label: "X",
    type: "number",
    group: "geometry",
    step: 1,
  },
  {
    key: "y",
    label: "Y",
    type: "number",
    group: "geometry",
    step: 1,
  },
  {
    key: "width",
    label: "Width",
    type: "number",
    group: "geometry",
    min: 0,
    step: 1,
  },
  {
    key: "height",
    label: "Height",
    type: "number",
    group: "geometry",
    min: 0,
    step: 1,
  },
] as const;

export const commonBindingFields = [
  {
    key: "binding.field",
    label: "Field",
    type: "field",
    group: "binding",
  },
  {
    key: "binding.title",
    label: "Title",
    type: "text",
    group: "binding",
  },
] as const;

export const textPropertySchema = createPropertySchema({
  groups: [
    {
      key: "geometry",
      label: "Geometry",
      order: 1,
    },
    {
      key: "binding",
      label: "Binding",
      order: 2,
    },
    {
      key: "content",
      label: "Content",
      order: 3,
    },
    {
      key: "style",
      label: "Style",
      order: 4,
    },
  ],
  fields: [
    ...commonGeometryFields,
    ...commonBindingFields,
    {
      key: "options.content",
      label: "Content",
      type: "textarea",
      group: "content",
    },
    {
      key: "style.fontSize",
      label: "Font Size",
      type: "number",
      group: "style",
      min: 1,
      step: 1,
      defaultValue: 12,
    },
    {
      key: "style.color",
      label: "Color",
      type: "color",
      group: "style",
    },
    {
      key: "style.textAlign",
      label: "Text Align",
      type: "select",
      group: "style",
      options: [
        {
          label: "Left",
          value: "left",
        },
        {
          label: "Center",
          value: "center",
        },
        {
          label: "Right",
          value: "right",
        },
      ],
    },
  ],
});

export const imagePropertySchema = createPropertySchema({
  groups: [
    {
      key: "geometry",
      label: "Geometry",
    },
    {
      key: "binding",
      label: "Binding",
    },
    {
      key: "image",
      label: "Image",
    },
  ],
  fields: [
    ...commonGeometryFields,
    ...commonBindingFields,
    {
      key: "options.src",
      label: "Image URL",
      type: "image",
      group: "image",
    },
    {
      key: "options.objectFit",
      label: "Object Fit",
      type: "select",
      group: "image",
      options: [
        {
          label: "Contain",
          value: "contain",
        },
        {
          label: "Cover",
          value: "cover",
        },
        {
          label: "Fill",
          value: "fill",
        },
      ],
    },
  ],
});

export const rectPropertySchema = createPropertySchema({
  fields: [
    ...commonGeometryFields,
    {
      key: "style.borderWidth",
      label: "Border Width",
      type: "number",
      group: "style",
      min: 0,
    },
    {
      key: "style.borderColor",
      label: "Border Color",
      type: "color",
      group: "style",
    },
    {
      key: "style.backgroundColor",
      label: "Background",
      type: "color",
      group: "style",
    },
  ],
});

export const linePropertySchema = createPropertySchema({
  fields: [
    ...commonGeometryFields,
    {
      key: "options.direction",
      label: "Direction",
      type: "select",
      group: "line",
      options: [
        {
          label: "Horizontal",
          value: "horizontal",
        },
        {
          label: "Vertical",
          value: "vertical",
        },
      ],
    },
    {
      key: "style.borderWidth",
      label: "Line Width",
      type: "number",
      group: "style",
      min: 1,
    },
    {
      key: "style.borderColor",
      label: "Color",
      type: "color",
      group: "style",
    },
  ],
});

export const tablePropertySchema = createPropertySchema({
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
      key: "table",
      label: "Table",
    },
  ],
  fields: [
    ...commonGeometryFields,
    {
      key: "options.dataField",
      label: "Data Field",
      type: "field",
      group: "data",
    },
    {
      key: "options.showHeader",
      label: "Show Header",
      type: "boolean",
      group: "table",
      defaultValue: true,
    },
    {
      key: "options.columns",
      label: "Columns JSON",
      type: "json",
      group: "table",
    },
  ],
});
```

---

# 8. Core：内置元素定义

## `packages/core/src/registry/builtinElements.ts`

```ts
import type { ElementDefinition } from "./elementRegistry";
import {
  imagePropertySchema,
  linePropertySchema,
  rectPropertySchema,
  tablePropertySchema,
  textPropertySchema,
} from "./builtinPropertySchemas";

export const builtinElementDefinitions: ElementDefinition[] = [
  {
    type: "text",
    name: "Text",
    builtin: true,
    defaultWidth: 60,
    defaultHeight: 12,
    propertySchema: textPropertySchema,
    createElement(input) {
      return {
        id: input.id,
        type: "text",
        x: input.x,
        y: input.y,
        width: 60,
        height: 12,
        binding: {
          title: "Text",
        },
        options: {
          content: "Text",
        },
        style: {
          fontSize: 12,
          color: "#111827",
        },
      };
    },
  },
  {
    type: "image",
    name: "Image",
    builtin: true,
    defaultWidth: 40,
    defaultHeight: 40,
    propertySchema: imagePropertySchema,
    createElement(input) {
      return {
        id: input.id,
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
    },
  },
  {
    type: "rect",
    name: "Rectangle",
    builtin: true,
    defaultWidth: 40,
    defaultHeight: 24,
    propertySchema: rectPropertySchema,
    createElement(input) {
      return {
        id: input.id,
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
    },
  },
  {
    type: "line",
    name: "Line",
    builtin: true,
    defaultWidth: 50,
    defaultHeight: 1,
    propertySchema: linePropertySchema,
    createElement(input) {
      return {
        id: input.id,
        type: "line",
        x: input.x,
        y: input.y,
        width: 50,
        height: 1,
        options: {
          direction: "horizontal",
        },
        style: {
          borderWidth: 1,
          borderColor: "#111827",
        },
      };
    },
  },
  {
    type: "table",
    name: "Table",
    builtin: true,
    defaultWidth: 120,
    defaultHeight: 50,
    propertySchema: tablePropertySchema,
    createElement(input) {
      return {
        id: input.id,
        type: "table",
        x: input.x,
        y: input.y,
        width: 120,
        height: 50,
        options: {
          dataField: "items",
          showHeader: true,
          columns: [
            {
              id: "name",
              field: "name",
              title: "Name",
              width: 60,
            },
            {
              id: "value",
              field: "value",
              title: "Value",
              width: 60,
            },
          ],
        },
      };
    },
  },
];
```

---

## `packages/core/src/registry/index.ts`

```ts
export * from "./elementRegistry";
export * from "./builtinElements";
export * from "./builtinPropertySchemas";
```

---

# 9. designer-core：增强 DesignerState

Phase 8 需要加入：

```txt
1. snaplines
2. guides
3. transient drag ghost
```

## `packages/designer-core/src/types.ts` 增强

```ts
export interface DesignerGuide {
  id: string;
  type: "vertical" | "horizontal";
  position: number;
}

export interface DesignerSnapLine {
  id: string;
  type: "vertical" | "horizontal";
  position: number;
  sourceElementId?: string;
}

export interface DragGhost {
  ids: string[];
  dx: number;
  dy: number;
}

export interface ResizeGhost {
  id: string;
  dx: number;
  dy: number;
  handle: ResizeHandle;
}

export interface DesignerInteraction {
  dragging?: DragState;
  resizing?: ResizeState;
  dragGhost?: DragGhost;
  resizeGhost?: ResizeGhost;
  snapLines?: DesignerSnapLine[];
}

export interface DesignerState {
  template: PrintTemplate;
  mode: DesignerMode;
  activePanelId?: string;
  selection: DesignerSelection;
  viewport: DesignerViewport;
  clipboard: DesignerClipboard;
  interaction: DesignerInteraction;
  guides: DesignerGuide[];
}
```

初始化补上：

```ts
guides: [],
interaction: {
  snapLines: [],
},
```

---

# 10. designer-core：Guide 类型与工具

## `packages/designer-core/src/guides/types.ts`

```ts
export interface DesignerGuide {
  id: string;
  type: "vertical" | "horizontal";
  position: number;
}

export interface CreateGuideInput {
  type: "vertical" | "horizontal";
  position: number;
}
```

## `packages/designer-core/src/guides/guideManager.ts`

```ts
import type { DesignerGuide } from "./types";

export function createGuide(input: {
  type: "vertical" | "horizontal";
  position: number;
}): DesignerGuide {
  return {
    id: `guide_${Math.random().toString(36).slice(2, 8)}`,
    type: input.type,
    position: input.position,
  };
}

export function removeGuide(
  guides: DesignerGuide[],
  id: string,
): DesignerGuide[] {
  return guides.filter((guide) => guide.id !== id);
}
```

---

# 11. designer-core：增强 snap

## `packages/designer-core/src/geometry/snap.ts`

```ts
import type { PrintElement } from "@hiprint-re/core";
import type { DesignerGuide } from "../types";

export interface SnapLine {
  id: string;
  type: "vertical" | "horizontal";
  position: number;
  sourceElementId?: string;
  sourceGuideId?: string;
}

export interface SnapResult {
  x: number;
  y: number;
  snapped: boolean;
  lines: SnapLine[];
}

export interface SnapInput {
  moving: PrintElement;
  others: PrintElement[];
  guides?: DesignerGuide[];
  x: number;
  y: number;
  threshold?: number;
}

export function snapElement(input: SnapInput): SnapResult {
  const threshold = input.threshold ?? 3;

  let x = input.x;
  let y = input.y;

  const lines: SnapLine[] = [];

  const verticalTargets = collectVerticalTargets(input.others, input.guides);
  const horizontalTargets = collectHorizontalTargets(
    input.others,
    input.guides,
  );

  const movingVerticalPoints = getVerticalPoints(input.moving, x);
  const movingHorizontalPoints = getHorizontalPoints(input.moving, y);

  for (const point of movingVerticalPoints) {
    const target = findNearestTarget(
      point.position,
      verticalTargets,
      threshold,
    );

    if (target) {
      x += target.position - point.position;
      lines.push({
        id: `snap_v_${target.position}`,
        type: "vertical",
        position: target.position,
        sourceElementId: target.sourceElementId,
        sourceGuideId: target.sourceGuideId,
      });
      break;
    }
  }

  for (const point of movingHorizontalPoints) {
    const target = findNearestTarget(
      point.position,
      horizontalTargets,
      threshold,
    );

    if (target) {
      y += target.position - point.position;
      lines.push({
        id: `snap_h_${target.position}`,
        type: "horizontal",
        position: target.position,
        sourceElementId: target.sourceElementId,
        sourceGuideId: target.sourceGuideId,
      });
      break;
    }
  }

  return {
    x,
    y,
    snapped: lines.length > 0,
    lines,
  };
}

interface SnapPoint {
  position: number;
  sourceElementId?: string;
  sourceGuideId?: string;
}

function collectVerticalTargets(
  elements: PrintElement[],
  guides: DesignerGuide[] = [],
): SnapPoint[] {
  const targets: SnapPoint[] = [];

  for (const element of elements) {
    targets.push(
      {
        position: element.x,
        sourceElementId: element.id,
      },
      {
        position: element.x + element.width / 2,
        sourceElementId: element.id,
      },
      {
        position: element.x + element.width,
        sourceElementId: element.id,
      },
    );
  }

  for (const guide of guides) {
    if (guide.type === "vertical") {
      targets.push({
        position: guide.position,
        sourceGuideId: guide.id,
      });
    }
  }

  return targets;
}

function collectHorizontalTargets(
  elements: PrintElement[],
  guides: DesignerGuide[] = [],
): SnapPoint[] {
  const targets: SnapPoint[] = [];

  for (const element of elements) {
    targets.push(
      {
        position: element.y,
        sourceElementId: element.id,
      },
      {
        position: element.y + element.height / 2,
        sourceElementId: element.id,
      },
      {
        position: element.y + element.height,
        sourceElementId: element.id,
      },
    );
  }

  for (const guide of guides) {
    if (guide.type === "horizontal") {
      targets.push({
        position: guide.position,
        sourceGuideId: guide.id,
      });
    }
  }

  return targets;
}

function getVerticalPoints(element: PrintElement, x: number): SnapPoint[] {
  return [
    {
      position: x,
    },
    {
      position: x + element.width / 2,
    },
    {
      position: x + element.width,
    },
  ];
}

function getHorizontalPoints(element: PrintElement, y: number): SnapPoint[] {
  return [
    {
      position: y,
    },
    {
      position: y + element.height / 2,
    },
    {
      position: y + element.height,
    },
  ];
}

function findNearestTarget(
  position: number,
  targets: SnapPoint[],
  threshold: number,
): SnapPoint | undefined {
  let nearest: SnapPoint | undefined;
  let nearestDistance = Infinity;

  for (const target of targets) {
    const distance = Math.abs(position - target.position);

    if (distance <= threshold && distance < nearestDistance) {
      nearest = target;
      nearestDistance = distance;
    }
  }

  return nearest;
}
```

---

# 12. designer-core：viewport 命令

## `packages/designer-core/src/command/commands/setViewport.ts`

```ts
import type { DesignerCommand } from "../types";
import type { DesignerViewport } from "../../types";

export function createSetViewportCommand(
  patch: Partial<DesignerViewport>,
): DesignerCommand {
  return {
    id: "viewport.set",
    name: "Set Viewport",
    history: false,

    execute(state) {
      return {
        ...state,
        viewport: {
          ...state.viewport,
          ...patch,
        },
      };
    },
  };
}
```

---

# 13. designer-core：interaction 命令

## `packages/designer-core/src/command/commands/setInteraction.ts`

```ts
import type { DesignerInteraction } from "../../types";
import type { DesignerCommand } from "../types";

export function createSetInteractionCommand(
  patch: Partial<DesignerInteraction>,
): DesignerCommand {
  return {
    id: "interaction.set",
    name: "Set Interaction",
    history: false,

    execute(state) {
      return {
        ...state,
        interaction: {
          ...state.interaction,
          ...patch,
        },
      };
    },
  };
}

export function createClearInteractionCommand(): DesignerCommand {
  return {
    id: "interaction.clear",
    name: "Clear Interaction",
    history: false,

    execute(state) {
      return {
        ...state,
        interaction: {
          snapLines: [],
        },
      };
    },
  };
}
```

---

# 14. designer-core：导入导出

## `packages/designer-core/src/io/exportTemplate.ts`

```ts
import type { PrintTemplate } from "@hiprint-re/core";

export interface ExportTemplateOptions {
  pretty?: boolean;
}

export function exportTemplateToJson(
  template: PrintTemplate,
  options: ExportTemplateOptions = {},
): string {
  return JSON.stringify(template, null, options.pretty === false ? 0 : 2);
}

export function downloadTemplateJson(
  template: PrintTemplate,
  filename = "template.json",
): void {
  const content = exportTemplateToJson(template);

  const blob = new Blob([content], {
    type: "application/json;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}
```

注意：`downloadTemplateJson` 用了 DOM，更严格可以放到 `designer-react` 或 `dom`。如果你想让 `designer-core` 完全不碰 DOM，只保留 `exportTemplateToJson`，下载放 React 层。

更推荐：

```txt
designer-core：exportTemplateToJson
designer-react：downloadJson
```

---

## `packages/designer-core/src/io/importTemplate.ts`

```ts
import {
  migrateTemplate,
  validateTemplate,
  type PrintTemplate,
} from "@hiprint-re/core";

export interface ImportTemplateResult {
  template: PrintTemplate;
  warnings: string[];
}

export function importTemplateFromJson(json: string): ImportTemplateResult {
  const raw = JSON.parse(json);
  const template = migrateTemplate(raw);
  const result = validateTemplate(template);

  return {
    template,
    warnings: result.issues
      .filter((issue) => issue.level === "warning")
      .map((issue) => issue.message),
  };
}
```

---

# 15. React：Registry Context

## `packages/designer-react/src/registry/DesignerRegistryContext.tsx`

```tsx
import { createContext, useContext, useMemo } from "react";
import {
  builtinElementDefinitions,
  createElementRegistry,
  type ElementDefinition,
  type ElementRegistry,
} from "@hiprint-re/core";

export const DesignerRegistryContext = createContext<ElementRegistry | null>(
  null,
);

export interface DesignerRegistryProviderProps {
  elements?: ElementDefinition[];
  children: React.ReactNode;
}

export function DesignerRegistryProvider(props: DesignerRegistryProviderProps) {
  const registry = useMemo(() => {
    return createElementRegistry([
      ...builtinElementDefinitions,
      ...(props.elements ?? []),
    ]);
  }, [props.elements]);

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

## 修改 `PrintDesignerProps`

```ts
import type { ElementDefinition } from "@hiprint-re/core";

export interface PrintDesignerProps {
  template: DesignerTemplateInput;
  templateKind?: DesignerTemplateKind;
  data?: unknown;

  elements?: ElementDefinition[];

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

## 修改 `PrintDesigner`

```tsx
import { DesignerRegistryProvider } from "../registry/DesignerRegistryContext";
import { DesignerProvider } from "../context/DesignerProvider";
import type { PrintDesignerProps } from "../types";
import { DesignerShell } from "./DesignerShell";
import "../style/designer.css";

export function PrintDesigner(props: PrintDesignerProps) {
  return (
    <DesignerRegistryProvider elements={props.elements}>
      <DesignerProvider {...props}>
        <DesignerShell className={props.className} style={props.style} />
      </DesignerProvider>
    </DesignerRegistryProvider>
  );
}
```

---

# 16. React：ElementPalette 改成 Registry 驱动

## `packages/designer-react/src/components/ElementPalette.tsx`

```tsx
import { useDesignerState } from "../hooks/useDesignerState";
import { useDesignerCommands } from "../hooks/useDesignerCommands";
import { useDesignerRegistry } from "../registry/DesignerRegistryContext";

function createElementId(type: string): string {
  return `${type}_${Math.random().toString(36).slice(2, 9)}`;
}

export function ElementPalette() {
  const state = useDesignerState();
  const commands = useDesignerCommands();
  const registry = useDesignerRegistry();

  const panelId = state.activePanelId;
  const elements = registry.list();

  function add(type: string) {
    if (!panelId) return;

    const element = registry.createElement(type, {
      id: createElementId(type),
      x: 20,
      y: 20,
    });

    if (!element) return;

    commands.addElement(panelId, element);
  }

  return (
    <div className="hiprint-designer-panel">
      <div className="hiprint-designer-panel-title">Elements</div>

      <div className="hiprint-designer-palette">
        {elements.map((item) => (
          <button
            key={item.type}
            className="hiprint-designer-palette-item"
            onClick={() => add(item.type)}
            title={item.description}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}
```

---

# 17. React：动态属性面板

## 工具：对象路径读写

### `packages/designer-react/src/utils/path.ts`

```ts
export function getByPath(target: unknown, path: string): unknown {
  const parts = path.split(".");
  let current: any = target;

  for (const part of parts) {
    if (current == null) return undefined;
    current = current[part];
  }

  return current;
}

export function setByPath<T extends Record<string, any>>(
  target: T,
  path: string,
  value: unknown,
): T {
  const clone = structuredCloneSafe(target);
  const parts = path.split(".");

  let current: any = clone;

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i]!;

    if (!current[part] || typeof current[part] !== "object") {
      current[part] = {};
    }

    current = current[part];
  }

  current[parts[parts.length - 1]!] = value;

  return clone;
}

function structuredCloneSafe<T>(value: T): T {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }

  return JSON.parse(JSON.stringify(value)) as T;
}
```

---

## `PropertyField`

### `packages/designer-react/src/components/PropertyField.tsx`

```tsx
import type { PropertyFieldSchema } from "@hiprint-re/core";

export interface PropertyFieldProps {
  field: PropertyFieldSchema;
  value: unknown;
  onChange: (value: unknown) => void;
}

export function PropertyField(props: PropertyFieldProps) {
  const { field, value } = props;

  if (field.hidden) return null;

  if (field.type === "boolean") {
    return (
      <label className="hiprint-designer-field is-checkbox">
        <span>{field.label}</span>
        <input
          type="checkbox"
          checked={Boolean(value)}
          disabled={field.readonly}
          onChange={(event) => props.onChange(event.target.checked)}
        />
      </label>
    );
  }

  if (field.type === "select") {
    return (
      <label className="hiprint-designer-field">
        <span>{field.label}</span>
        <select
          value={String(value ?? field.defaultValue ?? "")}
          disabled={field.readonly}
          onChange={(event) => props.onChange(event.target.value)}
        >
          <option value="">Please select</option>
          {field.options?.map((option) => (
            <option key={String(option.value)} value={String(option.value)}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === "textarea" || field.type === "json") {
    return (
      <label className="hiprint-designer-field">
        <span>{field.label}</span>
        <textarea
          value={
            field.type === "json"
              ? JSON.stringify(value ?? field.defaultValue ?? "", null, 2)
              : String(value ?? field.defaultValue ?? "")
          }
          disabled={field.readonly}
          onChange={(event) => {
            if (field.type === "json") {
              try {
                props.onChange(JSON.parse(event.target.value));
              } catch {
                props.onChange(event.target.value);
              }
              return;
            }

            props.onChange(event.target.value);
          }}
        />
      </label>
    );
  }

  return (
    <label className="hiprint-designer-field">
      <span>{field.label}</span>
      <input
        type={toInputType(field.type)}
        value={String(value ?? field.defaultValue ?? "")}
        min={field.min}
        max={field.max}
        step={field.step}
        placeholder={field.placeholder}
        readOnly={field.readonly}
        onChange={(event) => {
          const nextValue =
            field.type === "number"
              ? Number(event.target.value)
              : event.target.value;

          props.onChange(nextValue);
        }}
      />
    </label>
  );
}

function toInputType(type: string): string {
  if (type === "number") return "number";
  if (type === "color") return "color";
  if (type === "image") return "text";
  return "text";
}
```

---

## `DynamicPropertyPanel`

### `packages/designer-react/src/components/DynamicPropertyPanel.tsx`

```tsx
import type { PrintElement } from "@hiprint-re/core";
import { getElementById } from "@hiprint-re/designer-core";
import { useDesignerState } from "../hooks/useDesignerState";
import { useDesignerCommands } from "../hooks/useDesignerCommands";
import { useDesignerRegistry } from "../registry/DesignerRegistryContext";
import { getByPath, setByPath } from "../utils/path";
import { PropertyField } from "./PropertyField";

export function DynamicPropertyPanel() {
  const state = useDesignerState();
  const commands = useDesignerCommands();
  const registry = useDesignerRegistry();

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

  const definition = registry.get(element.type);
  const schema = definition?.propertySchema;

  if (!schema) {
    return (
      <div className="hiprint-designer-panel">
        <div className="hiprint-designer-panel-title">Properties</div>
        <div className="hiprint-designer-empty">
          No schema for {element.type}
        </div>
      </div>
    );
  }

  function updateField(path: string, value: unknown) {
    if (!element) return;

    const next = setByPath(element as any, path, value) as PrintElement;

    commands.updateElement(element.id, next);
  }

  const sortedGroups = [...schema.groups].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

  return (
    <div className="hiprint-designer-panel">
      <div className="hiprint-designer-panel-title">
        Properties · {definition?.name ?? element.type}
      </div>

      {sortedGroups.map((group) => {
        const fields = schema.fields.filter(
          (field) => (field.group ?? "base") === group.key,
        );

        if (fields.length === 0) return null;

        return (
          <div key={group.key} className="hiprint-designer-property-group">
            <div className="hiprint-designer-property-group-title">
              {group.label}
            </div>

            {fields.map((field) => (
              <PropertyField
                key={field.key}
                field={field}
                value={getByPath(element, field.key)}
                onChange={(value) => updateField(field.key, value)}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
```

然后 Phase 7 的 `PropertyPanel` 可以替换为：

```tsx
import { DynamicPropertyPanel } from "./DynamicPropertyPanel";

export function PropertyPanel() {
  return <DynamicPropertyPanel />;
}
```

---

# 18. React：Ruler

## `packages/designer-react/src/components/Ruler.tsx`

```tsx
export interface RulerProps {
  direction: "horizontal" | "vertical";
  length: number;
  unit?: "mm" | "px";
  zoom: number;
  step?: number;
}

export function Ruler(props: RulerProps) {
  const step = props.step ?? 10;
  const ticks = [];

  for (let value = 0; value <= props.length; value += step) {
    ticks.push(value);
  }

  return (
    <div
      className={["hiprint-designer-ruler", `is-${props.direction}`].join(" ")}
    >
      {ticks.map((tick) => (
        <span
          key={tick}
          className="hiprint-designer-ruler-tick"
          style={
            props.direction === "horizontal"
              ? { left: `${tick * props.zoom}px` }
              : { top: `${tick * props.zoom}px` }
          }
        >
          {tick}
        </span>
      ))}
    </div>
  );
}
```

这只是基础版。后续可以把 `mm -> px` 换算做得更精确。

---

# 19. React：SnaplineOverlay

## `packages/designer-react/src/components/SnaplineOverlay.tsx`

```tsx
import { useDesignerState } from "../hooks/useDesignerState";

export function SnaplineOverlay() {
  const state = useDesignerState();
  const lines = state.interaction.snapLines ?? [];

  return (
    <div className="hiprint-designer-snapline-layer">
      {lines.map((line) => (
        <div
          key={line.id}
          className={["hiprint-designer-snapline", `is-${line.type}`].join(" ")}
          style={
            line.type === "vertical"
              ? { left: `${line.position}mm` }
              : { top: `${line.position}mm` }
          }
        />
      ))}
    </div>
  );
}
```

在 `DesignerCanvas` 里插入：

```tsx
<SnaplineOverlay />
```

---

# 20. React：ZoomControls

## `packages/designer-react/src/components/ZoomControls.tsx`

```tsx
import { createSetViewportCommand } from "@hiprint-re/designer-core";
import { useDesignerContext } from "../context/useDesignerContext";
import { useDesignerState } from "../hooks/useDesignerState";

export function ZoomControls() {
  const { store } = useDesignerContext();
  const state = useDesignerState();

  function setZoom(zoom: number) {
    store.dispatch(
      createSetViewportCommand({
        zoom: Math.max(0.2, Math.min(3, zoom)),
      }),
    );
  }

  return (
    <div className="hiprint-designer-zoom">
      <button onClick={() => setZoom(state.viewport.zoom - 0.1)}>-</button>
      <span>{Math.round(state.viewport.zoom * 100)}%</span>
      <button onClick={() => setZoom(state.viewport.zoom + 0.1)}>+</button>
      <button onClick={() => setZoom(1)}>100%</button>
    </div>
  );
}
```

把它放入 `DesignerToolbar`。

---

# 21. React：TemplateActions 导入导出

## `packages/designer-react/src/utils/download.ts`

```ts
export function downloadTextFile(
  content: string,
  filename: string,
  type = "application/json;charset=utf-8",
): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}
```

---

## `packages/designer-react/src/hooks/useTemplateIO.ts`

```ts
import {
  exportTemplateToJson,
  importTemplateFromJson,
} from "@hiprint-re/designer-core";
import { useDesignerContext } from "../context/useDesignerContext";
import { downloadTextFile } from "../utils/download";

export function useTemplateIO() {
  const { store, onChange } = useDesignerContext();

  function exportJson(filename = "template.json") {
    const template = store.getStateRef().template;
    const json = exportTemplateToJson(template);

    downloadTextFile(json, filename);
  }

  async function importJson(file: File) {
    const content = await file.text();
    const result = importTemplateFromJson(content);

    const current = store.getStateRef();

    store.setState({
      ...current,
      template: result.template,
      activePanelId: result.template.panels[0]?.id,
      selection: {
        ids: [],
        activeId: undefined,
      },
    });

    onChange?.(result.template);

    return result;
  }

  return {
    exportJson,
    importJson,
  };
}
```

---

## `packages/designer-react/src/components/TemplateActions.tsx`

```tsx
import { useRef } from "react";
import { useTemplateIO } from "../hooks/useTemplateIO";

export function TemplateActions() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const io = useTemplateIO();

  async function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    await io.importJson(file);

    event.target.value = "";
  }

  return (
    <>
      <button onClick={() => io.exportJson()}>Export</button>

      <button onClick={() => inputRef.current?.click()}>Import</button>

      <input
        ref={inputRef}
        type="file"
        accept="application/json,.json"
        style={{ display: "none" }}
        onChange={onFileChange}
      />
    </>
  );
}
```

在 `DesignerToolbar` 里加入：

```tsx
<TemplateActions />
<ZoomControls />
```

---

# 22. React：增强拖拽实时 ghost + snapline

Phase 7 的拖拽是 pointerup 才更新。Phase 8 做实时 ghost：

```txt
pointerdown：记录 session
pointermove：计算 dx/dy + snap，写入 interaction.dragGhost / snapLines
pointerup：dispatch move command，清空 interaction
```

## `packages/designer-react/src/hooks/useSnapDrag.ts`

```ts
import { useRef } from "react";
import {
  createClearInteractionCommand,
  createMoveElementCommand,
  createSetInteractionCommand,
  getAllElements,
  getElementById,
  snapElement,
} from "@hiprint-re/designer-core";
import { useDesignerContext } from "../context/useDesignerContext";
import { useDesignerState } from "./useDesignerState";
import { useDesignerCommands } from "./useDesignerCommands";

interface DragSession {
  elementId: string;
  startX: number;
  startY: number;
  lastDx: number;
  lastDy: number;
}

export function useSnapDrag() {
  const { store, onChange } = useDesignerContext();
  const state = useDesignerState();
  const commands = useDesignerCommands();

  const sessionRef = useRef<DragSession | null>(null);

  function startDrag(event: React.PointerEvent, elementId: string) {
    event.stopPropagation();

    commands.select([elementId], elementId);

    sessionRef.current = {
      elementId,
      startX: event.clientX,
      startY: event.clientY,
      lastDx: 0,
      lastDy: 0,
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  }

  function onPointerMove(event: PointerEvent) {
    const session = sessionRef.current;

    if (!session) return;

    const currentState = store.getStateRef();
    const moving = getElementById(currentState, session.elementId);

    if (!moving) return;

    const zoom = currentState.viewport.zoom || 1;

    let dx = (event.clientX - session.startX) / zoom;
    let dy = (event.clientY - session.startY) / zoom;

    const others = getAllElements(currentState).filter(
      (element) => element.id !== moving.id,
    );

    const snapped = snapElement({
      moving,
      others,
      guides: currentState.guides,
      x: moving.x + dx,
      y: moving.y + dy,
      threshold: 3,
    });

    dx = snapped.x - moving.x;
    dy = snapped.y - moving.y;

    session.lastDx = dx;
    session.lastDy = dy;

    store.dispatch(
      createSetInteractionCommand({
        dragGhost: {
          ids: [moving.id],
          dx,
          dy,
        },
        snapLines: snapped.lines,
      }),
    );
  }

  function onPointerUp() {
    const session = sessionRef.current;

    if (!session) return;

    if (session.lastDx !== 0 || session.lastDy !== 0) {
      store.dispatch(
        createMoveElementCommand({
          ids: [session.elementId],
          dx: session.lastDx,
          dy: session.lastDy,
        }),
      );

      onChange?.(store.getStateRef().template);
    }

    store.dispatch(createClearInteractionCommand());

    sessionRef.current = null;

    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  }

  return {
    startDrag,
  };
}
```

在 `SelectionOverlay` 里把 `useCanvasPointer` 替换为 `useSnapDrag`。

---

# 23. React：SelectionOverlay 支持 ghost transform

```tsx
const ghost = state.interaction.dragGhost
const isGhosted = ghost?.ids.includes(element.id)

const transform = isGhosted
  ? `translate(${ghost.dx}${props.layout.unit}, ${ghost.dy}${props.layout.unit})`
  : undefined

style={{
  left: `${layoutElement.x}${props.layout.unit}`,
  top: `${layoutElement.y}${props.layout.unit}`,
  width: `${layoutElement.width}${props.layout.unit}`,
  height: `${layoutElement.height}${props.layout.unit}`,
  transform,
}}
```

这样拖动过程中不会频繁改 template，只改临时 interaction。

---

# 24. CSS 补充

```css
.hiprint-designer-property-group {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 8px;
}

.hiprint-designer-property-group-title {
  padding: 10px 12px 4px;
  font-size: 12px;
  font-weight: 600;
  color: #374151;
}

.hiprint-designer-field select,
.hiprint-designer-field textarea {
  width: 100%;
  min-height: 28px;
  padding: 6px 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #fff;
}

.hiprint-designer-field textarea {
  min-height: 72px;
  resize: vertical;
}

.hiprint-designer-field.is-checkbox {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hiprint-designer-snapline-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 5;
}

.hiprint-designer-snapline {
  position: absolute;
  background: #ef4444;
}

.hiprint-designer-snapline.is-vertical {
  top: 0;
  bottom: 0;
  width: 1px;
}

.hiprint-designer-snapline.is-horizontal {
  left: 0;
  right: 0;
  height: 1px;
}

.hiprint-designer-ruler {
  position: absolute;
  background: #f9fafb;
  color: #6b7280;
  font-size: 10px;
  user-select: none;
}

.hiprint-designer-ruler.is-horizontal {
  left: 24px;
  top: 0;
  right: 0;
  height: 24px;
  border-bottom: 1px solid #e5e7eb;
}

.hiprint-designer-ruler.is-vertical {
  left: 0;
  top: 24px;
  bottom: 0;
  width: 24px;
  border-right: 1px solid #e5e7eb;
}

.hiprint-designer-ruler-tick {
  position: absolute;
  transform: translateX(-50%);
}

.hiprint-designer-zoom {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
```

---

# 25. Vue 版 Phase 8 策略

Vue 版不建议在 Phase 8 重新写一大套。建议：

```txt
1. 先复用 core 的 ElementRegistry / PropertySchema
2. Vue DynamicPropertyPanel 对齐 React
3. Vue ElementPalette 从 registry 渲染
4. Vue 先支持 import/export + zoom
5. snapline 可以稍后补
```

Vue 动态属性面板核心逻辑和 React 一样，只是用 `h()` 或 `.vue` 文件实现。

示例：

```ts
export const DynamicPropertyPanel = defineComponent({
  props: {
    store: {
      type: Object,
      required: true,
    },
    state: {
      type: Object,
      required: true,
    },
    registry: {
      type: Object,
      required: true,
    },
  },

  emits: ["change"],

  setup(props, { emit }) {
    return () => {
      const activeId = props.state.selection.activeId;
      const element = activeId
        ? getElementById(props.state, activeId)
        : undefined;

      if (!element) {
        return h(
          "div",
          { class: "hiprint-designer-empty" },
          "No element selected",
        );
      }

      const definition = props.registry.get(element.type);
      const schema = definition?.propertySchema;

      if (!schema) {
        return h("div", `No schema for ${element.type}`);
      }

      return h("div", { class: "hiprint-designer-panel" }, [
        h("div", { class: "hiprint-designer-panel-title" }, "Properties"),
        ...schema.fields.map((field) =>
          h("label", { class: "hiprint-designer-field" }, [
            h("span", field.label),
            h("input", {
              value: String(getByPath(element, field.key) ?? ""),
              onInput(event: Event) {
                const value = (event.target as HTMLInputElement).value;
                const next = setByPath(element as any, field.key, value);

                props.store.dispatch(
                  createUpdateElementCommand({
                    id: element.id,
                    patch: next,
                  }),
                );

                emit("change");
              },
            }),
          ]),
        ),
      ]);
    };
  },
});
```

---

# 26. 测试设计

新增：

```txt
tests/core/property-schema.test.ts
tests/core/element-registry.test.ts
tests/designer-core/snapline.test.ts
tests/designer-react/dynamic-property-panel.test.tsx
tests/designer-react/template-actions.test.tsx
```

---

## `tests/core/element-registry.test.ts`

```ts
import { describe, expect, it } from "vitest";
import {
  builtinElementDefinitions,
  createElementRegistry,
} from "../../packages/core/src";

describe("ElementRegistry", () => {
  it("should register builtin elements", () => {
    const registry = createElementRegistry(builtinElementDefinitions);

    expect(registry.has("text")).toBe(true);
    expect(registry.has("image")).toBe(true);
    expect(registry.list().length).toBeGreaterThan(0);
  });

  it("should create builtin text element", () => {
    const registry = createElementRegistry(builtinElementDefinitions);

    const element = registry.createElement("text", {
      id: "text_1",
      x: 10,
      y: 20,
    });

    expect(element?.type).toBe("text");
    expect(element?.x).toBe(10);
    expect(element?.y).toBe(20);
  });
});
```

---

## `tests/designer-core/snapline.test.ts`

```ts
import { describe, expect, it } from "vitest";
import { snapElement } from "../../packages/designer-core/src";

describe("snapElement", () => {
  it("should snap to another element left edge", () => {
    const result = snapElement({
      moving: {
        id: "moving",
        type: "rect",
        x: 0,
        y: 0,
        width: 10,
        height: 10,
      },
      x: 49,
      y: 0,
      threshold: 3,
      others: [
        {
          id: "target",
          type: "rect",
          x: 50,
          y: 0,
          width: 10,
          height: 10,
        },
      ],
    });

    expect(result.snapped).toBe(true);
    expect(result.x).toBe(50);
    expect(result.lines[0]?.type).toBe("vertical");
  });
});
```

---

## `tests/designer-react/dynamic-property-panel.test.tsx`

```tsx
import { describe, expect, it } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { PrintDesigner } from "../../packages/designer-react/src";
import { createEmptyTemplate } from "../../packages/core/src";

describe("DynamicPropertyPanel", () => {
  it("should show schema driven fields after adding text", () => {
    const template = createEmptyTemplate();

    const { getByText, container } = render(
      <div style={{ width: 1000, height: 800 }}>
        <PrintDesigner template={template} templateKind="core" />
      </div>,
    );

    fireEvent.click(getByText("Text"));

    expect(container.textContent).toContain("Geometry");
    expect(container.textContent).toContain("Content");
    expect(container.textContent).toContain("Font Size");
  });
});
```

---

# 27. 文档

## `docs/phase-8.md`

````md
# Phase 8 - Designer Extensibility

## Goal

Upgrade Designer MVP into a schema-driven and extensible designer foundation.

## Deliverables

- ElementRegistry enhancement
- PropertySchema
- Builtin element property schemas
- DynamicPropertyPanel
- Registry-driven ElementPalette
- Ruler foundation
- Snapline overlay
- Template import/export
- Zoom controls

## Non-goals

- Full plugin marketplace
- Remote plugin loading
- Advanced table editor
- PDF export
- Cloud template management

## Flow

```txt
ElementDefinition
  ↓
propertySchema
  ↓
DynamicPropertyPanel
  ↓
updateElementCommand
  ↓
DesignerState updated
```
````

## Extensibility

Custom elements can be registered through:

```ts
<PrintDesigner
  elements={[customElementDefinition]}
/>
```

````

---

## `docs/property-schema.md`

```md
# Property Schema

PropertySchema describes how Designer should render element properties.

## Field

```ts
interface PropertyFieldSchema {
  key: string
  label: string
  type: PropertyFieldType
  group?: string
}
````

## Example

```ts
{
  key: "style.fontSize",
  label: "Font Size",
  type: "number",
  group: "style"
}
```

## Path

Field key is a dot path into `PrintElement`.

Examples:

- `x`
- `y`
- `width`
- `binding.field`
- `options.content`
- `style.fontSize`

````

---

# 28. Phase 8 验收标准

Phase 8 完成后，应满足：

```txt
1. core 支持 PropertySchema
2. core ElementRegistry 支持 createElement
3. builtin text/image/line/rect/table 有 propertySchema
4. ElementPalette 从 registry 渲染
5. PropertyPanel 从 propertySchema 动态生成
6. 支持自定义 ElementDefinition 注册
7. 支持 zoom controls
8. 支持 template export
9. 支持 template import
10. 支持 snapline 基础计算
11. 支持拖拽 ghost
12. 选中元素拖拽时能显示 snapline
13. 不在 PropertyPanel 写死 text/image/rect 等大量分支
14. designer-core 仍然不依赖 React/Vue
15. core 仍然不依赖 DOM
16. tests 通过
17. docs/phase-8.md 完成
18. docs/property-schema.md 完成
````

---

# 29. 推荐 PR 拆分

## PR 1：PropertySchema + ElementRegistry

```txt
feat(core): add schema driven element registry
```

内容：

```txt
property/types
property/createPropertySchema
registry/elementRegistry
registry/builtinPropertySchemas
registry/builtinElements
```

---

## PR 2：Dynamic Property Panel

```txt
feat(designer-react): add schema driven property panel
```

内容：

```txt
DesignerRegistryProvider
ElementPalette from registry
DynamicPropertyPanel
PropertyField
path utils
```

---

## PR 3：Snapline + Ghost Drag

```txt
feat(designer): add snapline and drag ghost
```

内容：

```txt
designer-core snap 增强
interaction.dragGhost
interaction.snapLines
useSnapDrag
SnaplineOverlay
```

---

## PR 4：Template IO + Zoom + Ruler

```txt
feat(designer-react): add template io zoom and ruler foundation
```

内容：

```txt
TemplateActions
useTemplateIO
ZoomControls
Ruler
docs
```

---

## PR 5：Vue 对齐

```txt
feat(designer-vue): align schema driven designer basics
```

---

# 30. Phase 8 最小 TODO

```txt
[ ] 新增 core/property
[ ] 增强 core ElementRegistry
[ ] 新增 builtinPropertySchemas
[ ] 改造 builtinElements
[ ] designer-react 新增 DesignerRegistryProvider
[ ] ElementPalette 改成 registry 驱动
[ ] 新增 DynamicPropertyPanel
[ ] 新增 PropertyField
[ ] 新增 getByPath / setByPath
[ ] designer-core 增强 snapElement
[ ] DesignerState 增加 guides / snapLines / dragGhost
[ ] 新增 setInteraction command
[ ] 新增 useSnapDrag
[ ] 新增 SnaplineOverlay
[ ] 新增 ZoomControls
[ ] 新增 TemplateActions
[ ] 新增 import/export helpers
[ ] Vue 版对齐基础能力
[ ] 新增测试
[ ] 新增 docs/phase-8.md
[ ] 新增 docs/property-schema.md
```

---

# 31. 关键风险点

## 1. 属性面板不要继续写死

Phase 7 的属性面板是可以接受的 MVP，但 Phase 8 必须避免继续这样：

```tsx
if (element.type === "text") {
  renderTextFields();
}
```

应该变成：

```tsx
const schema = registry.get(element.type)?.propertySchema;
renderFields(schema);
```

否则后续加 barcode、qrcode、自定义元素会爆炸。

---

## 2. ElementRegistry 不等于插件市场

Phase 8 只是本地注册：

```ts
registry.register(customElement);
```

不要急着做：

```txt
远程插件
插件包下载
插件沙箱
插件市场
```

那些可以放更后面。

---

## 3. Snapline 只负责计算，不负责改变 layout

Snapline 的职责是：

```txt
输入：moving element + others + guides
输出：建议 x/y + lines
```

真正模板修改还是：

```txt
pointerup -> move command
```

不要让 snapline 直接改 template。

---

## 4. Template IO 不要混入 legacy runtime

导入导出应该基于 core template：

```txt
export core template JSON
import core template JSON
```

legacy template 进入新设计器后，应该先：

```txt
fromLegacyTemplate
```

然后导出的是 core schema。

---

# 32. 最终判断

Phase 8 的本质是：

```txt
把设计器从“能用”升级成“能扩展”
```

做完 Phase 8 后，你的设计器就具备长期演进基础：

```txt
新增元素类型
  ↓
注册 ElementDefinition
  ↓
声明 propertySchema
  ↓
ElementPalette 自动出现
  ↓
PropertyPanel 自动渲染
  ↓
DesignerCore 统一更新模板
```

这一步完成后，后面的路线就很清晰：

```txt
Phase 9：高级 Table Editor
Phase 10：Plugin System / Custom Elements
Phase 11：PDF / Canvas / SVG Renderer
Phase 12：Template Marketplace / Cloud Sync
```

Phase 8 是后续插件化和复杂元素编辑的前置基础，建议一定做扎实。
