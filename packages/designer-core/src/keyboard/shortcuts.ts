import type { KeyBinding, ShortcutAction } from "./keymap";

export interface ShortcutEventLike {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
}

export function resolveShortcutAction(
  event: ShortcutEventLike,
  keymap: KeyBinding[],
): ShortcutAction | undefined {
  const normalizedKey = event.key.toLowerCase();

  const matched = keymap.find((binding) => {
    return (
      binding.key.toLowerCase() === normalizedKey &&
      Boolean(binding.ctrl) === Boolean(event.ctrlKey) &&
      Boolean(binding.meta) === Boolean(event.metaKey) &&
      Boolean(binding.shift) === Boolean(event.shiftKey) &&
      Boolean(binding.alt) === Boolean(event.altKey)
    );
  });

  return matched?.action;
}
