# Plugin API

## HiprintPlugin

```ts
interface HiprintPlugin {
  name: string;
  version: string;
  description?: string;
  elements?: ElementDefinition[];
  domRenderers?: PluginDomRenderer[];
  designer?: PluginDesignerExtension;
  setup?: (ctx: PluginSetupContext) => void;
}
```

## ElementDefinition

```ts
interface ElementDefinition {
  type: string;
  name: string;
  description?: string;
  builtin?: boolean;
  defaultWidth: number;
  defaultHeight: number;
  createElement(input: CreateElementInput): PrintElement;
  propertySchema?: ElementPropertySchema;
}
```

## DOM Renderer

```ts
interface PluginDomRenderer {
  type: string;
  render(element: LayoutElement, ctx: DomRenderContext): HTMLElement;
}
```

## PluginManager

```ts
class PluginManager {
  register(plugin: HiprintPlugin): void;
  createElementRegistry(): ElementRegistry;
  getDomRenderer(type: string): PluginDomRenderer | undefined;
  getElementDefinitions(): ElementDefinition[];
  getDomRenderers(): PluginDomRenderer[];
}
```

## createPlugin

```ts
function createPlugin(plugin: HiprintPlugin): HiprintPlugin;
```

Wraps a plugin object. Throws if the plugin has invalid structure (missing name/version or duplicate element types).

## validatePlugin

```ts
function validatePlugin(plugin: HiprintPlugin): void;
```

Validates plugin structure. Throws descriptive errors for:
- Missing `name`
- Missing `version`
- Duplicate element types within the same plugin

## DomRendererRegistry

```ts
class DomRendererRegistry {
  register(renderer: DomElementRenderer): void;
  get(type: string): DomElementRenderer | undefined;
  has(type: string): boolean;
  list(): DomElementRenderer[];
}
```

Registry for DOM renderers in the `@hiprint-re/dom` package. Accepts renderers passed via `DomRenderOptions.renderers`.
