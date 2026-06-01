# Designer Core

`@hiprint-re/designer-core` provides framework-agnostic state management
for editing print templates.

## Goals

- Designer state
- Selection
- Commands
- History
- Clipboard
- Geometry helpers
- Keyboard shortcut mapping

## Non-goals

- React UI
- Vue UI
- DOM event binding
- Property panel
- Drag handle rendering
- Resize handle rendering

## Flow

```
UI event
  ↓
create command
  ↓
store.dispatch(command)
  ↓
DesignerState updated
  ↓
React/Vue rerender preview
```

## Packages

```
@hiprint-re/core
  ↑
@hiprint-re/designer-core
  ↑
@hiprint-re/designer-react
@hiprint-re/designer-vue
```

## Usage

```ts
import {
  createDesignerStore,
  createAddElementCommand,
  createMoveElementCommand,
} from "@hiprint-re/designer-core";

const store = createDesignerStore({
  template,
});

store.dispatch(
  createAddElementCommand({
    panelId: "panel_1",
    element: {
      id: "text_1",
      type: "text",
      x: 20,
      y: 20,
      width: 80,
      height: 12,
      options: { content: "Hello" },
    },
  }),
);

store.dispatch(
  createMoveElementCommand({
    ids: ["text_1"],
    dx: 10,
    dy: 5,
  }),
);

store.undo();
store.redo();
```

## API

### createDesignerStore(options)

Creates a new designer store.

```ts
const store = createDesignerStore({
  template,
  activePanelId?: string,
  historyLimit?: number,
});
```

### store.getState() / store.getStateRef()

Returns a deep clone of the current state (or a direct reference).

### store.setState(state)

Directly sets the state (for external sync).

### store.dispatch(command)

Dispatches a command to modify the state.

### store.subscribe(fn)

Subscribes to state changes. Returns an unsubscribe function.

### store.undo() / store.redo()

Undoes or redoes the last command.

### store.canUndo() / store.canRedo()

Returns whether undo/redo is available.

### store.clearHistory()

Clears all undo/redo history.

## Commands

- `createAddElementCommand`
- `createRemoveElementCommand`
- `createUpdateElementCommand`
- `createMoveElementCommand`
- `createResizeElementCommand`
- `createSelectElementCommand`
- `createClearSelectionCommand`
- `createDuplicateElementCommand`
- `createPasteElementsCommand`
- `createAlignElementsCommand`
- `createDistributeElementsCommand`

## Geometry

- `moveElement` — translate element by delta
- `resizeElement` — resize element from a handle
- `alignElements` — align to left/center/right/top/middle/bottom
- `distributeElements` — distribute horizontally or vertically
- `snapElement` — compute snap lines for alignment
- `getElementRect` / `getElementsBounds` — bounding box utilities

## Selection

- `hitTestElement` — find element at a point
- `isPointInElement` — point-in-rectangle test

## Keyboard

- `defaultKeymap` — default shortcut bindings
- `resolveShortcutAction` — resolve a keyboard event to an action
