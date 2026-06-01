下面给你一版 **Phase 11：多渲染目标 / SVG、Canvas、PDF Export** 的详细设计与代码草案。

Phase 11 的定位是：

```txt
Phase 10：Plugin System / Custom Elements
Phase 11：多渲染目标，支持 SVG / Canvas / PDF 导出
```

这一阶段的核心目标是：**所有导出能力都基于 Phase 3 的 `LayoutDocument`，不要重新计算布局。**

---

# 1. Phase 11 总目标

```txt
1. 新增 @hiprint-re/render-core
2. 新增 @hiprint-re/svg
3. 新增 @hiprint-re/canvas
4. 新增 @hiprint-re/pdf
5. SVG 支持 renderToSvgString / renderToSvgElement
6. Canvas 支持 renderToCanvas / exportPng
7. PDF 支持 exportPdfBytes / downloadPdf
8. 支持 text / image / line / rect / table
9. 支持插件元素的 export renderer 扩展点
10. designer-react 增加 Export SVG / PNG / PDF
11. 增加 fixtures snapshot 测试
12. 增加 docs/render-targets.md / docs/phase-11.md
```

最终链路：

```txt
PrintTemplate
  ↓
layoutTemplate
  ↓
LayoutDocument
  ├─ DOM Preview
  ├─ SVG Export
  ├─ Canvas Export
  └─ PDF Export
```

---

# 2. Phase 11 不做什么

先不要把导出系统做得过度复杂。

```txt
不做服务端渲染完整方案
不做 PDF 编辑器
不做 Word / Excel 导出
不做高级字体子集化
不内置中文字体文件
不做远程字体下载
不做完整 CMYK / 印刷色彩管理
不做浏览器外的原生打印驱动
```

尤其注意：**不要把字体文件放进仓库或包里**。PDF 中文字体应由使用方通过 API 注入字体数据。

---

# 3. 推荐包结构

```txt
packages/
├─ render-core/
│  ├─ package.json
│  └─ src/
│     ├─ index.ts
│     ├─ types.ts
│     ├─ unit.ts
│     ├─ color.ts
│     ├─ table.ts
│     └─ image.ts
│
├─ svg/
│  ├─ package.json
│  └─ src/
│     ├─ index.ts
│     ├─ types.ts
│     ├─ renderToSvgString.ts
│     ├─ renderToSvgElement.ts
│     ├─ renderers/
│     │  ├─ renderSvgElement.ts
│     │  ├─ renderSvgText.ts
│     │  ├─ renderSvgImage.ts
│     │  ├─ renderSvgLine.ts
│     │  ├─ renderSvgRect.ts
│     │  └─ renderSvgTable.ts
│     └─ utils/
│        └─ escapeXml.ts
│
├─ canvas/
│  ├─ package.json
│  └─ src/
│     ├─ index.ts
│     ├─ types.ts
│     ├─ renderToCanvas.ts
│     ├─ exportPng.ts
│     └─ renderers/
│        ├─ drawCanvasElement.ts
│        ├─ drawCanvasText.ts
│        ├─ drawCanvasImage.ts
│        ├─ drawCanvasLine.ts
│        ├─ drawCanvasRect.ts
│        └─ drawCanvasTable.ts
│
└─ pdf/
   ├─ package.json
   └─ src/
      ├─ index.ts
      ├─ types.ts
      ├─ exportPdfBytes.ts
      ├─ downloadPdf.ts
      ├─ unit.ts
      └─ renderers/
         ├─ renderPdfPage.ts
         ├─ renderPdfElement.ts
         ├─ renderPdfText.ts
         ├─ renderPdfLine.ts
         ├─ renderPdfRect.ts
         └─ renderPdfTable.ts
```

---

# 4. `@hiprint-re/render-core`

这个包放不同 renderer 之间共用的工具，避免 SVG / Canvas / PDF 各写一套。

## `packages/render-core/package.json`

```json
{
  "name": "@hiprint-re/render-core",
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
    "@hiprint-re/core": "workspace:*"
  }
}
```

---

## `packages/render-core/src/types.ts`

```ts
import type {
  LayoutDocument,
  LayoutElement,
} from "@hiprint-re/core"

export type RenderTarget = "dom" | "svg" | "canvas" | "pdf"

export interface RenderWarning {
  code: string
  message: string
  elementId?: string
}

export interface BaseRenderOptions {
  scale?: number
  background?: string
  warnings?: RenderWarning[]
}

export interface ElementRenderContext {
  document: LayoutDocument
  target: RenderTarget
  scale: number
  warnings: RenderWarning[]
}

export interface ElementExportRenderer<T = unknown> {
  type: string
  target: RenderTarget
  render(element: LayoutElement, ctx: T): void | Promise<void>
}
```

---

## `packages/render-core/src/unit.ts`

```ts
import type { Unit } from "@hiprint-re/core"

export function toPx(value: number, unit: Unit, dpi = 96): number {
  if (unit === "px") return value
  return (value / 25.4) * dpi
}

export function toPt(value: number, unit: Unit): number {
  if (unit === "px") {
    return value * 0.75
  }

  return (value / 25.4) * 72
}

export function round(value: number): number {
  return Number(value.toFixed(4))
}
```

---

## `packages/render-core/src/color.ts`

```ts
export interface RgbColor {
  r: number
  g: number
  b: number
}

export function parseHexColor(value: unknown): RgbColor | undefined {
  if (typeof value !== "string") return undefined

  const input = value.trim()

  if (!input.startsWith("#")) return undefined

  const hex = input.slice(1)

  if (hex.length === 3) {
    return {
      r: parseInt(hex[0]! + hex[0]!, 16),
      g: parseInt(hex[1]! + hex[1]!, 16),
      b: parseInt(hex[2]! + hex[2]!, 16),
    }
  }

  if (hex.length === 6) {
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    }
  }

  return undefined
}
```

---

## `packages/render-core/src/table.ts`

```ts
import type {
  LayoutTableElement,
  LayoutTableRow,
} from "@hiprint-re/core"

export function getAllTableRows(
  table: LayoutTableElement,
): LayoutTableRow[] {
  return [
    ...table.headerRows,
    ...table.bodyRows,
    ...table.footerRows,
  ]
}
```

---

## `packages/render-core/src/index.ts`

```ts
export * from "./types"
export * from "./unit"
export * from "./color"
export * from "./table"
```

---

# 5. `@hiprint-re/svg`

SVG 的价值：

```txt
1. 可导出矢量图
2. 可嵌入网页
3. 可以作为 PDF / 图片导出的中间格式
4. 方便做 snapshot 测试
```

---

## `packages/svg/package.json`

```json
{
  "name": "@hiprint-re/svg",
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
    "@hiprint-re/render-core": "workspace:*"
  }
}
```

---

## `packages/svg/src/types.ts`

```ts
import type {
  LayoutDocument,
  LayoutElement,
} from "@hiprint-re/core"

export interface SvgRenderOptions {
  scale?: number
  background?: string
  classNamePrefix?: string
  renderers?: SvgElementRenderer[]
}

export interface SvgRenderContext {
  layout: LayoutDocument
  options: Required<SvgRenderOptions>
}

export interface SvgElementRenderer {
  type: string
  render(element: LayoutElement, ctx: SvgRenderContext): string
}
```

---

## `packages/svg/src/utils/escapeXml.ts`

```ts
export function escapeXml(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")
}
```

---

## `packages/svg/src/renderToSvgString.ts`

```ts
import type { LayoutDocument } from "@hiprint-re/core"
import type { SvgRenderOptions, SvgRenderContext } from "./types"
import { renderSvgElement } from "./renderers/renderSvgElement"

export function renderToSvgString(
  layout: LayoutDocument,
  options: SvgRenderOptions = {},
): string {
  const resolved: Required<SvgRenderOptions> = {
    scale: options.scale ?? 1,
    background: options.background ?? "#ffffff",
    classNamePrefix: options.classNamePrefix ?? "hiprint-svg",
    renderers: options.renderers ?? [],
  }

  const ctx: SvgRenderContext = {
    layout,
    options: resolved,
  }

  const pageSvgs = layout.pages.map((page) => {
    const elements = page.elements
      .map((element) => renderSvgElement(element, ctx))
      .join("\n")

    return `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="${page.width}${layout.unit}"
  height="${page.height}${layout.unit}"
  viewBox="0 0 ${page.width} ${page.height}"
  data-page-index="${page.index}"
>
  <rect x="0" y="0" width="${page.width}" height="${page.height}" fill="${resolved.background}" />
  ${elements}
</svg>`
  })

  return pageSvgs.join("\n")
}
```

---

## `packages/svg/src/renderers/renderSvgElement.ts`

```ts
import type { LayoutElement } from "@hiprint-re/core"
import type { SvgRenderContext } from "../types"
import { renderSvgText } from "./renderSvgText"
import { renderSvgImage } from "./renderSvgImage"
import { renderSvgLine } from "./renderSvgLine"
import { renderSvgRect } from "./renderSvgRect"
import { renderSvgTable } from "./renderSvgTable"

export function renderSvgElement(
  element: LayoutElement,
  ctx: SvgRenderContext,
): string {
  switch (element.type) {
    case "text":
      return renderSvgText(element as any, ctx)

    case "image":
      return renderSvgImage(element as any, ctx)

    case "line":
      return renderSvgLine(element as any, ctx)

    case "rect":
      return renderSvgRect(element as any, ctx)

    case "table":
      return renderSvgTable(element as any, ctx)
  }

  const custom = ctx.options.renderers.find(
    (renderer) => renderer.type === element.type,
  )

  if (custom) {
    return custom.render(element, ctx)
  }

  return `<rect
  x="${element.x}"
  y="${element.y}"
  width="${element.width}"
  height="${element.height}"
  fill="none"
  stroke="#9ca3af"
  stroke-dasharray="2 2"
/>`
}
```

---

## `packages/svg/src/renderers/renderSvgText.ts`

```ts
import type { LayoutTextElement } from "@hiprint-re/core"
import type { SvgRenderContext } from "../types"
import { escapeXml } from "../utils/escapeXml"

export function renderSvgText(
  element: LayoutTextElement,
  _ctx: SvgRenderContext,
): string {
  const fontSize = Number(element.style?.fontSize ?? element.fontSize ?? 12)
  const fill = String(element.style?.color ?? "#111827")
  const lineHeight = element.lineHeight ?? fontSize * 1.2

  const lines = element.lines?.length
    ? element.lines
    : [element.value]

  const tspans = lines
    .map((line, index) => {
      const dy = index === 0 ? 0 : lineHeight
      return `<tspan x="${element.x}" dy="${dy}">${escapeXml(line)}</tspan>`
    })
    .join("")

  return `<text
  x="${element.x}"
  y="${element.y + fontSize}"
  font-size="${fontSize}"
  fill="${fill}"
>${tspans}</text>`
}
```

---

## `packages/svg/src/renderers/renderSvgRect.ts`

```ts
import type { LayoutRectElement } from "@hiprint-re/core"
import type { SvgRenderContext } from "../types"

export function renderSvgRect(
  element: LayoutRectElement,
  _ctx: SvgRenderContext,
): string {
  const stroke = String(element.style?.borderColor ?? "#111827")
  const strokeWidth = Number(element.style?.borderWidth ?? 1)
  const fill = String(element.style?.backgroundColor ?? "none")

  return `<rect
  x="${element.x}"
  y="${element.y}"
  width="${element.width}"
  height="${element.height}"
  rx="${element.radius ?? 0}"
  fill="${fill}"
  stroke="${stroke}"
  stroke-width="${strokeWidth}"
/>`
}
```

---

## `packages/svg/src/renderers/renderSvgLine.ts`

```ts
import type { LayoutLineElement } from "@hiprint-re/core"
import type { SvgRenderContext } from "../types"

export function renderSvgLine(
  element: LayoutLineElement,
  _ctx: SvgRenderContext,
): string {
  const stroke = String(element.style?.borderColor ?? "#111827")
  const strokeWidth = Number(element.style?.borderWidth ?? 1)

  const x1 = element.x
  const y1 = element.y
  const x2 = element.direction === "vertical"
    ? element.x
    : element.x + element.width
  const y2 = element.direction === "vertical"
    ? element.y + element.height
    : element.y

  return `<line
  x1="${x1}"
  y1="${y1}"
  x2="${x2}"
  y2="${y2}"
  stroke="${stroke}"
  stroke-width="${strokeWidth}"
/>`
}
```

---

## `packages/svg/src/renderers/renderSvgImage.ts`

```ts
import type { LayoutImageElement } from "@hiprint-re/core"
import type { SvgRenderContext } from "../types"
import { escapeXml } from "../utils/escapeXml"

export function renderSvgImage(
  element: LayoutImageElement,
  _ctx: SvgRenderContext,
): string {
  if (!element.src) return ""

  return `<image
  x="${element.x}"
  y="${element.y}"
  width="${element.width}"
  height="${element.height}"
  href="${escapeXml(element.src)}"
  preserveAspectRatio="xMidYMid meet"
/>`
}
```

---

## `packages/svg/src/renderers/renderSvgTable.ts`

```ts
import type { LayoutTableElement } from "@hiprint-re/core"
import type { SvgRenderContext } from "../types"
import { getAllTableRows } from "@hiprint-re/render-core"
import { escapeXml } from "../utils/escapeXml"

export function renderSvgTable(
  table: LayoutTableElement,
  _ctx: SvgRenderContext,
): string {
  const rows = getAllTableRows(table)

  const cells = rows.flatMap((row) =>
    row.cells.map((cell) => {
      return `<g>
  <rect
    x="${table.x + cell.x}"
    y="${cell.y}"
    width="${cell.width}"
    height="${cell.height}"
    fill="none"
    stroke="#111827"
    stroke-width="0.2"
  />
  <text
    x="${table.x + cell.x + 1}"
    y="${cell.y + cell.height * 0.7}"
    font-size="3.5"
    fill="#111827"
  >${escapeXml(cell.value)}</text>
</g>`
    }),
  )

  return `<g data-table-id="${table.id}">
${cells.join("\n")}
</g>`
}
```

---

## `packages/svg/src/renderToSvgElement.ts`

```ts
import type { LayoutDocument } from "@hiprint-re/core"
import type { SvgRenderOptions } from "./types"
import { renderToSvgString } from "./renderToSvgString"

export function renderToSvgElement(
  layout: LayoutDocument,
  options: SvgRenderOptions = {},
): SVGSVGElement[] {
  if (typeof document === "undefined") {
    throw new Error("[hiprint-re/svg] document is not available.")
  }

  const wrapper = document.createElement("div")
  wrapper.innerHTML = renderToSvgString(layout, options)

  return Array.from(wrapper.querySelectorAll("svg"))
}
```

---

## `packages/svg/src/index.ts`

```ts
export * from "./types"
export * from "./renderToSvgString"
export * from "./renderToSvgElement"
```

---

# 6. `@hiprint-re/canvas`

Canvas 的价值：

```txt
1. 导出 PNG
2. 用于截图预览
3. 后续可做高性能缩略图
4. 可作为部分 PDF 图片 fallback
```

---

## `packages/canvas/package.json`

```json
{
  "name": "@hiprint-re/canvas",
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
    "@hiprint-re/render-core": "workspace:*"
  }
}
```

---

## `packages/canvas/src/types.ts`

```ts
import type {
  LayoutDocument,
  LayoutElement,
} from "@hiprint-re/core"

export interface CanvasRenderOptions {
  scale?: number
  dpi?: number
  background?: string
  renderers?: CanvasElementRenderer[]
}

export interface CanvasRenderContext {
  layout: LayoutDocument
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  options: Required<CanvasRenderOptions>
}

export interface CanvasElementRenderer {
  type: string
  draw(element: LayoutElement, ctx: CanvasRenderContext): void | Promise<void>
}
```

---

## `packages/canvas/src/renderToCanvas.ts`

```ts
import type { LayoutDocument } from "@hiprint-re/core"
import { toPx } from "@hiprint-re/render-core"
import type { CanvasRenderOptions, CanvasRenderContext } from "./types"
import { drawCanvasElement } from "./renderers/drawCanvasElement"

export async function renderToCanvas(
  layout: LayoutDocument,
  options: CanvasRenderOptions = {},
): Promise<HTMLCanvasElement[]> {
  if (typeof document === "undefined") {
    throw new Error("[hiprint-re/canvas] document is not available.")
  }

  const resolved: Required<CanvasRenderOptions> = {
    scale: options.scale ?? 2,
    dpi: options.dpi ?? 96,
    background: options.background ?? "#ffffff",
    renderers: options.renderers ?? [],
  }

  const canvases: HTMLCanvasElement[] = []

  for (const page of layout.pages) {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) {
      throw new Error("[hiprint-re/canvas] Failed to create canvas context.")
    }

    const widthPx = toPx(page.width, layout.unit, resolved.dpi)
    const heightPx = toPx(page.height, layout.unit, resolved.dpi)

    canvas.width = Math.ceil(widthPx * resolved.scale)
    canvas.height = Math.ceil(heightPx * resolved.scale)
    canvas.style.width = `${widthPx}px`
    canvas.style.height = `${heightPx}px`

    ctx.scale(resolved.scale, resolved.scale)
    ctx.fillStyle = resolved.background
    ctx.fillRect(0, 0, widthPx, heightPx)

    const renderCtx: CanvasRenderContext = {
      layout,
      canvas,
      ctx,
      options: resolved,
    }

    for (const element of page.elements) {
      await drawCanvasElement(element, renderCtx)
    }

    canvases.push(canvas)
  }

  return canvases
}
```

---

## `packages/canvas/src/renderers/drawCanvasElement.ts`

```ts
import type { LayoutElement } from "@hiprint-re/core"
import type { CanvasRenderContext } from "../types"
import { drawCanvasText } from "./drawCanvasText"
import { drawCanvasImage } from "./drawCanvasImage"
import { drawCanvasLine } from "./drawCanvasLine"
import { drawCanvasRect } from "./drawCanvasRect"
import { drawCanvasTable } from "./drawCanvasTable"

export async function drawCanvasElement(
  element: LayoutElement,
  ctx: CanvasRenderContext,
): Promise<void> {
  switch (element.type) {
    case "text":
      drawCanvasText(element as any, ctx)
      return

    case "image":
      await drawCanvasImage(element as any, ctx)
      return

    case "line":
      drawCanvasLine(element as any, ctx)
      return

    case "rect":
      drawCanvasRect(element as any, ctx)
      return

    case "table":
      drawCanvasTable(element as any, ctx)
      return
  }

  const custom = ctx.options.renderers.find(
    (renderer) => renderer.type === element.type,
  )

  if (custom) {
    await custom.draw(element, ctx)
    return
  }

  ctx.ctx.save()
  ctx.ctx.strokeStyle = "#9ca3af"
  ctx.ctx.setLineDash([4, 4])
  ctx.ctx.strokeRect(element.x, element.y, element.width, element.height)
  ctx.ctx.restore()
}
```

---

## `packages/canvas/src/renderers/drawCanvasText.ts`

```ts
import type { LayoutTextElement } from "@hiprint-re/core"
import type { CanvasRenderContext } from "../types"

export function drawCanvasText(
  element: LayoutTextElement,
  renderCtx: CanvasRenderContext,
): void {
  const ctx = renderCtx.ctx
  const fontSize = Number(element.style?.fontSize ?? element.fontSize ?? 12)
  const color = String(element.style?.color ?? "#111827")
  const lineHeight = element.lineHeight ?? fontSize * 1.2

  ctx.save()
  ctx.fillStyle = color
  ctx.font = `${fontSize}px ${String(element.style?.fontFamily ?? "Arial")}`
  ctx.textBaseline = "top"

  const lines = element.lines?.length
    ? element.lines
    : [element.value]

  lines.forEach((line, index) => {
    ctx.fillText(line, element.x, element.y + index * lineHeight)
  })

  ctx.restore()
}
```

---

## `packages/canvas/src/renderers/drawCanvasRect.ts`

```ts
import type { LayoutRectElement } from "@hiprint-re/core"
import type { CanvasRenderContext } from "../types"

export function drawCanvasRect(
  element: LayoutRectElement,
  renderCtx: CanvasRenderContext,
): void {
  const ctx = renderCtx.ctx

  ctx.save()

  const fill = element.style?.backgroundColor

  if (typeof fill === "string") {
    ctx.fillStyle = fill
    ctx.fillRect(element.x, element.y, element.width, element.height)
  }

  ctx.strokeStyle = String(element.style?.borderColor ?? "#111827")
  ctx.lineWidth = Number(element.style?.borderWidth ?? 1)
  ctx.strokeRect(element.x, element.y, element.width, element.height)

  ctx.restore()
}
```

---

## `packages/canvas/src/renderers/drawCanvasLine.ts`

```ts
import type { LayoutLineElement } from "@hiprint-re/core"
import type { CanvasRenderContext } from "../types"

export function drawCanvasLine(
  element: LayoutLineElement,
  renderCtx: CanvasRenderContext,
): void {
  const ctx = renderCtx.ctx

  ctx.save()
  ctx.strokeStyle = String(element.style?.borderColor ?? "#111827")
  ctx.lineWidth = Number(element.style?.borderWidth ?? 1)

  ctx.beginPath()
  ctx.moveTo(element.x, element.y)

  if (element.direction === "vertical") {
    ctx.lineTo(element.x, element.y + element.height)
  } else {
    ctx.lineTo(element.x + element.width, element.y)
  }

  ctx.stroke()
  ctx.restore()
}
```

---

## `packages/canvas/src/renderers/drawCanvasImage.ts`

```ts
import type { LayoutImageElement } from "@hiprint-re/core"
import type { CanvasRenderContext } from "../types"

export async function drawCanvasImage(
  element: LayoutImageElement,
  renderCtx: CanvasRenderContext,
): Promise<void> {
  if (!element.src) return

  const image = await loadImage(element.src)

  renderCtx.ctx.drawImage(
    image,
    element.x,
    element.y,
    element.width,
    element.height,
  )
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.crossOrigin = "anonymous"
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error(`[hiprint-re/canvas] Failed to load image: ${src}`))
    image.src = src
  })
}
```

---

## `packages/canvas/src/renderers/drawCanvasTable.ts`

```ts
import type {
  LayoutTableElement,
  LayoutTableRow,
} from "@hiprint-re/core"
import { getAllTableRows } from "@hiprint-re/render-core"
import type { CanvasRenderContext } from "../types"

export function drawCanvasTable(
  table: LayoutTableElement,
  renderCtx: CanvasRenderContext,
): void {
  const ctx = renderCtx.ctx
  const rows = getAllTableRows(table)

  ctx.save()
  ctx.strokeStyle = "#111827"
  ctx.lineWidth = 0.5
  ctx.font = "12px Arial"
  ctx.textBaseline = "middle"

  for (const row of rows) {
    drawRow(ctx, table, row)
  }

  ctx.restore()
}

function drawRow(
  ctx: CanvasRenderingContext2D,
  table: LayoutTableElement,
  row: LayoutTableRow,
): void {
  for (const cell of row.cells) {
    const x = table.x + cell.x
    const y = cell.y

    ctx.strokeRect(x, y, cell.width, cell.height)
    ctx.fillText(String(cell.value ?? ""), x + 2, y + cell.height / 2)
  }
}
```

---

## `packages/canvas/src/exportPng.ts`

```ts
import type { LayoutDocument } from "@hiprint-re/core"
import type { CanvasRenderOptions } from "./types"
import { renderToCanvas } from "./renderToCanvas"

export async function exportPngDataUrls(
  layout: LayoutDocument,
  options: CanvasRenderOptions = {},
): Promise<string[]> {
  const canvases = await renderToCanvas(layout, options)
  return canvases.map((canvas) => canvas.toDataURL("image/png"))
}

export async function downloadPngPages(
  layout: LayoutDocument,
  options: CanvasRenderOptions = {},
): Promise<void> {
  const dataUrls = await exportPngDataUrls(layout, options)

  dataUrls.forEach((url, index) => {
    const a = document.createElement("a")
    a.href = url
    a.download = `page-${index + 1}.png`
    a.click()
  })
}
```

---

## `packages/canvas/src/index.ts`

```ts
export * from "./types"
export * from "./renderToCanvas"
export * from "./exportPng"
```

---

# 7. `@hiprint-re/pdf`

PDF 的目标：

```txt
1. 支持基础矢量导出
2. 支持 text / line / rect / table
3. image 作为后续增强
4. 中文字体由使用方注入
```

这里建议用 `pdf-lib` 风格实现，但你的包可以把它作为依赖或可选依赖。关键设计是：**不要在项目里内置字体文件。**

---

## `packages/pdf/package.json`

```json
{
  "name": "@hiprint-re/pdf",
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
    "@hiprint-re/render-core": "workspace:*",
    "pdf-lib": "^1.17.1"
  }
}
```

---

## `packages/pdf/src/types.ts`

```ts
import type {
  LayoutDocument,
  LayoutElement,
} from "@hiprint-re/core"
import type {
  PDFDocument,
  PDFFont,
  PDFPage,
} from "pdf-lib"

export interface PdfExportOptions {
  title?: string
  author?: string

  /**
   * 使用方注入字体数据。
   * 不要在包内内置字体文件。
   */
  fontBytes?: ArrayBuffer | Uint8Array

  renderers?: PdfElementRenderer[]
}

export interface PdfRenderContext {
  layout: LayoutDocument
  pdfDoc: PDFDocument
  page: PDFPage
  font: PDFFont
  options: PdfExportOptions
}

export interface PdfElementRenderer {
  type: string
  render(element: LayoutElement, ctx: PdfRenderContext): void | Promise<void>
}
```

---

## `packages/pdf/src/unit.ts`

```ts
import type { Unit } from "@hiprint-re/core"

export function toPdfPt(value: number, unit: Unit): number {
  if (unit === "px") return value * 0.75
  return (value / 25.4) * 72
}

export function yToPdf(
  y: number,
  height: number,
  pageHeight: number,
  unit: Unit,
): number {
  return toPdfPt(pageHeight - y - height, unit)
}
```

---

## `packages/pdf/src/exportPdfBytes.ts`

```ts
import type { LayoutDocument } from "@hiprint-re/core"
import {
  PDFDocument,
  StandardFonts,
} from "pdf-lib"
import type { PdfExportOptions } from "./types"
import { toPdfPt } from "./unit"
import { renderPdfPage } from "./renderers/renderPdfPage"

export async function exportPdfBytes(
  layout: LayoutDocument,
  options: PdfExportOptions = {},
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create()

  if (options.title) {
    pdfDoc.setTitle(options.title)
  }

  if (options.author) {
    pdfDoc.setAuthor(options.author)
  }

  const font = options.fontBytes
    ? await pdfDoc.embedFont(options.fontBytes)
    : await pdfDoc.embedFont(StandardFonts.Helvetica)

  for (const layoutPage of layout.pages) {
    const page = pdfDoc.addPage([
      toPdfPt(layoutPage.width, layout.unit),
      toPdfPt(layoutPage.height, layout.unit),
    ])

    await renderPdfPage(layoutPage, {
      layout,
      pdfDoc,
      page,
      font,
      options,
    })
  }

  return pdfDoc.save()
}
```

---

## `packages/pdf/src/renderers/renderPdfPage.ts`

```ts
import type { LayoutPage } from "@hiprint-re/core"
import type { PdfRenderContext } from "../types"
import { renderPdfElement } from "./renderPdfElement"

export async function renderPdfPage(
  layoutPage: LayoutPage,
  ctx: PdfRenderContext,
): Promise<void> {
  for (const element of layoutPage.elements) {
    await renderPdfElement(element, ctx)
  }
}
```

---

## `packages/pdf/src/renderers/renderPdfElement.ts`

```ts
import type { LayoutElement } from "@hiprint-re/core"
import type { PdfRenderContext } from "../types"
import { renderPdfText } from "./renderPdfText"
import { renderPdfLine } from "./renderPdfLine"
import { renderPdfRect } from "./renderPdfRect"
import { renderPdfTable } from "./renderPdfTable"

export async function renderPdfElement(
  element: LayoutElement,
  ctx: PdfRenderContext,
): Promise<void> {
  switch (element.type) {
    case "text":
      renderPdfText(element as any, ctx)
      return

    case "line":
      renderPdfLine(element as any, ctx)
      return

    case "rect":
      renderPdfRect(element as any, ctx)
      return

    case "table":
      renderPdfTable(element as any, ctx)
      return
  }

  const custom = ctx.options.renderers?.find(
    (renderer) => renderer.type === element.type,
  )

  if (custom) {
    await custom.render(element, ctx)
    return
  }

  renderPdfRect(
    {
      ...element,
      type: "rect",
      style: {
        borderColor: "#9ca3af",
        borderWidth: 0.5,
      },
    } as any,
    ctx,
  )
}
```

---

## `packages/pdf/src/renderers/renderPdfText.ts`

```ts
import type { LayoutTextElement } from "@hiprint-re/core"
import { rgb } from "pdf-lib"
import { parseHexColor } from "@hiprint-re/render-core"
import type { PdfRenderContext } from "../types"
import { toPdfPt, yToPdf } from "../unit"

export function renderPdfText(
  element: LayoutTextElement,
  ctx: PdfRenderContext,
): void {
  const fontSize = Number(element.style?.fontSize ?? element.fontSize ?? 12)
  const color = parseHexColor(element.style?.color) ?? {
    r: 17,
    g: 24,
    b: 39,
  }

  const lineHeight = element.lineHeight ?? fontSize * 1.2
  const lines = element.lines?.length
    ? element.lines
    : [element.value]

  lines.forEach((line, index) => {
    ctx.page.drawText(line, {
      x: toPdfPt(element.x, ctx.layout.unit),
      y: yToPdf(
        element.y + index * lineHeight,
        fontSize,
        ctx.page.getHeight() / 72 * 25.4,
        ctx.layout.unit,
      ),
      size: fontSize,
      font: ctx.font,
      color: rgb(color.r / 255, color.g / 255, color.b / 255),
    })
  })
}
```

> 这里 `yToPdf` 的页面高度换算可以再封装得更严谨。落地时建议直接从 `LayoutPage.height` 传入，而不是从 `PDFPage.getHeight()` 反算。

---

## `packages/pdf/src/renderers/renderPdfRect.ts`

```ts
import type { LayoutRectElement } from "@hiprint-re/core"
import { rgb } from "pdf-lib"
import { parseHexColor } from "@hiprint-re/render-core"
import type { PdfRenderContext } from "../types"
import { toPdfPt, yToPdf } from "../unit"

export function renderPdfRect(
  element: LayoutRectElement,
  ctx: PdfRenderContext,
): void {
  const stroke = parseHexColor(element.style?.borderColor) ?? {
    r: 17,
    g: 24,
    b: 39,
  }

  const fill = parseHexColor(element.style?.backgroundColor)

  ctx.page.drawRectangle({
    x: toPdfPt(element.x, ctx.layout.unit),
    y: yToPdf(
      element.y,
      element.height,
      ctx.page.getHeight() / 72 * 25.4,
      ctx.layout.unit,
    ),
    width: toPdfPt(element.width, ctx.layout.unit),
    height: toPdfPt(element.height, ctx.layout.unit),
    borderColor: rgb(stroke.r / 255, stroke.g / 255, stroke.b / 255),
    borderWidth: Number(element.style?.borderWidth ?? 1),
    color: fill
      ? rgb(fill.r / 255, fill.g / 255, fill.b / 255)
      : undefined,
  })
}
```

---

## `packages/pdf/src/renderers/renderPdfLine.ts`

```ts
import type { LayoutLineElement } from "@hiprint-re/core"
import { rgb } from "pdf-lib"
import { parseHexColor } from "@hiprint-re/render-core"
import type { PdfRenderContext } from "../types"
import { toPdfPt, yToPdf } from "../unit"

export function renderPdfLine(
  element: LayoutLineElement,
  ctx: PdfRenderContext,
): void {
  const color = parseHexColor(element.style?.borderColor) ?? {
    r: 17,
    g: 24,
    b: 39,
  }

  const pageHeightMm = ctx.page.getHeight() / 72 * 25.4

  const start = {
    x: toPdfPt(element.x, ctx.layout.unit),
    y: yToPdf(element.y, 0, pageHeightMm, ctx.layout.unit),
  }

  const end =
    element.direction === "vertical"
      ? {
          x: toPdfPt(element.x, ctx.layout.unit),
          y: yToPdf(element.y + element.height, 0, pageHeightMm, ctx.layout.unit),
        }
      : {
          x: toPdfPt(element.x + element.width, ctx.layout.unit),
          y: yToPdf(element.y, 0, pageHeightMm, ctx.layout.unit),
        }

  ctx.page.drawLine({
    start,
    end,
    thickness: Number(element.style?.borderWidth ?? 1),
    color: rgb(color.r / 255, color.g / 255, color.b / 255),
  })
}
```

---

## `packages/pdf/src/renderers/renderPdfTable.ts`

```ts
import type {
  LayoutTableElement,
  LayoutTableRow,
} from "@hiprint-re/core"
import { getAllTableRows } from "@hiprint-re/render-core"
import type { PdfRenderContext } from "../types"
import { renderPdfRect } from "./renderPdfRect"
import { renderPdfText } from "./renderPdfText"

export function renderPdfTable(
  table: LayoutTableElement,
  ctx: PdfRenderContext,
): void {
  const rows = getAllTableRows(table)

  for (const row of rows) {
    drawRow(table, row, ctx)
  }
}

function drawRow(
  table: LayoutTableElement,
  row: LayoutTableRow,
  ctx: PdfRenderContext,
): void {
  for (const cell of row.cells) {
    renderPdfRect(
      {
        id: cell.id,
        type: "rect",
        sourcePanelId: table.sourcePanelId,
        sourceElementId: table.sourceElementId,
        pageIndex: table.pageIndex,
        x: table.x + cell.x,
        y: cell.y,
        width: cell.width,
        height: cell.height,
        style: {
          borderColor: "#111827",
          borderWidth: 0.5,
        },
      } as any,
      ctx,
    )

    renderPdfText(
      {
        id: `${cell.id}_text`,
        type: "text",
        sourcePanelId: table.sourcePanelId,
        sourceElementId: table.sourceElementId,
        pageIndex: table.pageIndex,
        x: table.x + cell.x + 1,
        y: cell.y + 1,
        width: cell.width - 2,
        height: cell.height - 2,
        value: cell.value,
        lines: [cell.value],
        fontSize: 10,
        lineHeight: 12,
        style: {
          fontSize: 10,
          color: "#111827",
        },
      } as any,
      ctx,
    )
  }
}
```

---

## `packages/pdf/src/downloadPdf.ts`

```ts
import type { LayoutDocument } from "@hiprint-re/core"
import type { PdfExportOptions } from "./types"
import { exportPdfBytes } from "./exportPdfBytes"

export async function downloadPdf(
  layout: LayoutDocument,
  filename = "print.pdf",
  options: PdfExportOptions = {},
): Promise<void> {
  const bytes = await exportPdfBytes(layout, options)

  const blob = new Blob([bytes], {
    type: "application/pdf",
  })

  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")

  a.href = url
  a.download = filename
  a.click()

  URL.revokeObjectURL(url)
}
```

---

## `packages/pdf/src/index.ts`

```ts
export * from "./types"
export * from "./exportPdfBytes"
export * from "./downloadPdf"
```

---

# 8. 插件系统增强

Phase 10 的插件只支持 DOM renderer。Phase 11 要扩展为：

```txt
svgRenderers
canvasRenderers
pdfRenderers
```

## `packages/plugin/src/types.ts` 增强

```ts
import type { SvgElementRenderer } from "@hiprint-re/svg"
import type { CanvasElementRenderer } from "@hiprint-re/canvas"
import type { PdfElementRenderer } from "@hiprint-re/pdf"

export interface HiprintPlugin {
  name: string
  version: string
  description?: string

  elements?: ElementDefinition[]
  domRenderers?: PluginDomRenderer[]

  svgRenderers?: SvgElementRenderer[]
  canvasRenderers?: CanvasElementRenderer[]
  pdfRenderers?: PdfElementRenderer[]

  designer?: PluginDesignerExtension
  setup?: (ctx: PluginSetupContext) => void
}
```

## `PluginManager` 增强

```ts
private svgRenderers = new Map<string, SvgElementRenderer>()
private canvasRenderers = new Map<string, CanvasElementRenderer>()
private pdfRenderers = new Map<string, PdfElementRenderer>()

getSvgRenderers() {
  return [...this.svgRenderers.values()]
}

getCanvasRenderers() {
  return [...this.canvasRenderers.values()]
}

getPdfRenderers() {
  return [...this.pdfRenderers.values()]
}
```

---

# 9. Designer React 增加导出按钮

## `packages/designer-react/src/components/ExportActions.tsx`

```tsx
import { downloadPngPages } from "@hiprint-re/canvas"
import { downloadPdf } from "@hiprint-re/pdf"
import { renderToSvgString } from "@hiprint-re/svg"
import { useDesignerLayout } from "../hooks/useDesignerLayout"
import { useDesignerPluginManager } from "../plugin/DesignerPluginProvider"

export function ExportActions() {
  const { layout } = useDesignerLayout()
  const pluginManager = useDesignerPluginManager()

  function downloadText(
    content: string,
    filename: string,
    type: string,
  ) {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")

    a.href = url
    a.download = filename
    a.click()

    URL.revokeObjectURL(url)
  }

  async function exportSvg() {
    if (!layout) return

    const svg = renderToSvgString(layout, {
      renderers: pluginManager.getSvgRenderers(),
    })

    downloadText(svg, "print.svg", "image/svg+xml;charset=utf-8")
  }

  async function exportPng() {
    if (!layout) return

    await downloadPngPages(layout, {
      renderers: pluginManager.getCanvasRenderers(),
    })
  }

  async function exportPdf() {
    if (!layout) return

    await downloadPdf(layout, "print.pdf", {
      renderers: pluginManager.getPdfRenderers(),
    })
  }

  return (
    <>
      <button onClick={exportSvg}>Export SVG</button>
      <button onClick={exportPng}>Export PNG</button>
      <button onClick={exportPdf}>Export PDF</button>
    </>
  )
}
```

在 `DesignerToolbar` 中加入：

```tsx
<ExportActions />
```

---

# 10. 测试设计

新增：

```txt
tests/svg/
├─ renderToSvgString.test.ts
├─ renderSvgTable.test.ts

tests/canvas/
├─ renderToCanvas.test.ts

tests/pdf/
├─ exportPdfBytes.test.ts

tests/render-core/
├─ unit.test.ts
├─ color.test.ts
```

---

## `tests/svg/renderToSvgString.test.ts`

```ts
import { describe, expect, it } from "vitest"
import {
  createEmptyTemplate,
  layoutTemplate,
} from "../../packages/core/src"
import { renderToSvgString } from "../../packages/svg/src"

describe("renderToSvgString", () => {
  it("should render svg string", () => {
    const template = createEmptyTemplate()

    template.panels[0]!.elements.push({
      id: "text_1",
      type: "text",
      x: 10,
      y: 10,
      width: 80,
      height: 10,
      options: {
        content: "Hello",
      },
    })

    const layout = layoutTemplate(template, {})
    const svg = renderToSvgString(layout)

    expect(svg).toContain("<svg")
    expect(svg).toContain("Hello")
  })
})
```

---

## `tests/pdf/exportPdfBytes.test.ts`

```ts
import { describe, expect, it } from "vitest"
import {
  createEmptyTemplate,
  layoutTemplate,
} from "../../packages/core/src"
import { exportPdfBytes } from "../../packages/pdf/src"

describe("exportPdfBytes", () => {
  it("should export pdf bytes", async () => {
    const template = createEmptyTemplate()

    template.panels[0]!.elements.push({
      id: "text_1",
      type: "text",
      x: 10,
      y: 10,
      width: 80,
      height: 10,
      options: {
        content: "Hello PDF",
      },
    })

    const layout = layoutTemplate(template, {})
    const bytes = await exportPdfBytes(layout)

    expect(bytes.length).toBeGreaterThan(0)

    const header = new TextDecoder().decode(bytes.slice(0, 5))
    expect(header).toBe("%PDF-")
  })
})
```

---

# 11. 文档

## `docs/phase-11.md`

````md
# Phase 11 - Multi Target Renderers

## Goal

Add SVG, Canvas and PDF export support based on `LayoutDocument`.

## Packages

- `@hiprint-re/render-core`
- `@hiprint-re/svg`
- `@hiprint-re/canvas`
- `@hiprint-re/pdf`

## Flow

```txt
PrintTemplate
  ↓
layoutTemplate
  ↓
LayoutDocument
  ├─ renderToDom
  ├─ renderToSvgString
  ├─ renderToCanvas
  └─ exportPdfBytes
````

## Non-goals

* No built-in font files
* No full server-side rendering
* No Excel/Word export
* No complete print color management

## Font policy

PDF renderer must not bundle font files.

Applications should provide font bytes explicitly:

```ts
await exportPdfBytes(layout, {
  fontBytes,
})
```

````

---

## `docs/render-targets.md`

```md
# Render Targets

## DOM

Best for browser preview and browser print.

## SVG

Best for vector export and snapshots.

## Canvas

Best for PNG export and thumbnails.

## PDF

Best for downloadable print files.

## Rule

All render targets consume `LayoutDocument`.

Renderers must not recalculate layout.
````

---

# 12. Phase 11 验收标准

```txt
1. 新增 @hiprint-re/render-core
2. 新增 @hiprint-re/svg
3. 新增 @hiprint-re/canvas
4. 新增 @hiprint-re/pdf
5. SVG 可以导出 text/line/rect/image/table
6. Canvas 可以导出 PNG
7. PDF 可以导出基础 PDF bytes
8. PDF 不内置字体文件
9. designer-react 有 Export SVG / PNG / PDF
10. 插件系统支持 svg/canvas/pdf renderers
11. tests/svg 通过
12. tests/canvas 通过
13. tests/pdf 通过
14. docs/phase-11.md 完成
15. docs/render-targets.md 完成
```

---

# 13. 推荐 PR 拆分

```txt
PR 1：feat(render-core): add shared render utilities
PR 2：feat(svg): add svg renderer
PR 3：feat(canvas): add canvas renderer and png export
PR 4：feat(pdf): add basic pdf exporter
PR 5：feat(plugin): support export renderers
PR 6：feat(designer-react): add export actions
PR 7：docs(render): document render targets
```

---

# 14. 关键风险点

## 1. 不要让 SVG / Canvas / PDF 重算布局

错误：

```txt
PDF renderer 重新根据 template 算分页
```

正确：

```txt
layoutTemplate 只算一次
PDF renderer 只消费 LayoutDocument
```

---

## 2. 中文 PDF 字体不要内置

PDF 默认标准字体通常不适合中文。正确方式是：

```ts
const fontBytes = await fetch("/fonts/my-font.ttf").then(r => r.arrayBuffer())

await exportPdfBytes(layout, {
  fontBytes,
})
```

字体由使用方提供，不要把字体文件打进库里。

---

## 3. Canvas 图片会遇到跨域污染

如果图片跨域且没有 CORS，`canvas.toDataURL()` 会失败。

需要文档说明：

```txt
导出 PNG 时，图片资源必须允许 CORS
```

---

## 4. 插件 renderer 要分目标

一个插件可能需要同时提供：

```txt
domRenderer
svgRenderer
canvasRenderer
pdfRenderer
```

不要试图拿 DOM renderer 去复用到 PDF。

---

# 15. Phase 11 最小 TODO

```txt
[ ] 新建 packages/render-core
[ ] 新建 packages/svg
[ ] 实现 renderToSvgString
[ ] 实现 SVG text/line/rect/image/table
[ ] 新建 packages/canvas
[ ] 实现 renderToCanvas
[ ] 实现 canvas text/line/rect/image/table
[ ] 实现 exportPngDataUrls / downloadPngPages
[ ] 新建 packages/pdf
[ ] 实现 exportPdfBytes
[ ] 实现 PDF text/line/rect/table
[ ] 实现 downloadPdf
[ ] 插件系统增加 svg/canvas/pdf renderer
[ ] designer-react 增加 ExportActions
[ ] 新增 tests/svg
[ ] 新增 tests/canvas
[ ] 新增 tests/pdf
[ ] 新增 docs/phase-11.md
[ ] 新增 docs/render-targets.md
```

---

# 16. 最终判断

Phase 11 的本质是：

```txt
把打印设计器从“浏览器预览工具”升级为“多格式输出引擎”
```

做到 Phase 11 后，项目能力会变成：

```txt
设计模板
  ↓
预览
  ↓
浏览器打印
  ↓
导出 SVG
  ↓
导出 PNG
  ↓
导出 PDF
```

这一步完成后，项目就更接近真正的打印平台了。下一阶段 Phase 12 可以开始做：

```txt
模板管理 / 本地模板库 / 模板市场 / 云同步 / 版本管理
```
