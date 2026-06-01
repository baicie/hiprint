export function createPreviewRoot(container: HTMLElement): HTMLElement {
  const doc = container.ownerDocument;

  let root = container.querySelector<HTMLElement>(
    "[data-hiprint-re-preview-root]",
  );

  if (root) return root;

  root = doc.createElement("div");
  root.dataset.hiprintRePreviewRoot = "true";

  root.style.width = "100%";
  root.style.height = "100%";
  root.style.overflow = "auto";
  root.style.background = "#f3f4f6";
  root.style.padding = "24px 0";

  container.appendChild(root);

  return root;
}
