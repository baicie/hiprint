export type ShortcutAction =
  | "delete"
  | "copy"
  | "paste"
  | "duplicate"
  | "undo"
  | "redo"
  | "selectAll"
  | "moveLeft"
  | "moveRight"
  | "moveUp"
  | "moveDown";

export interface KeyBinding {
  key: string;
  ctrl?: boolean;
  meta?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: ShortcutAction;
}

export const defaultKeymap: KeyBinding[] = [
  {
    key: "Delete",
    action: "delete",
  },
  {
    key: "Backspace",
    action: "delete",
  },
  {
    key: "c",
    ctrl: true,
    action: "copy",
  },
  {
    key: "c",
    meta: true,
    action: "copy",
  },
  {
    key: "v",
    ctrl: true,
    action: "paste",
  },
  {
    key: "v",
    meta: true,
    action: "paste",
  },
  {
    key: "d",
    ctrl: true,
    action: "duplicate",
  },
  {
    key: "d",
    meta: true,
    action: "duplicate",
  },
  {
    key: "z",
    ctrl: true,
    action: "undo",
  },
  {
    key: "z",
    meta: true,
    action: "undo",
  },
  {
    key: "z",
    ctrl: true,
    shift: true,
    action: "redo",
  },
  {
    key: "z",
    meta: true,
    shift: true,
    action: "redo",
  },
  {
    key: "a",
    ctrl: true,
    action: "selectAll",
  },
  {
    key: "a",
    meta: true,
    action: "selectAll",
  },
  {
    key: "ArrowLeft",
    action: "moveLeft",
  },
  {
    key: "ArrowRight",
    action: "moveRight",
  },
  {
    key: "ArrowUp",
    action: "moveUp",
  },
  {
    key: "ArrowDown",
    action: "moveDown",
  },
];
