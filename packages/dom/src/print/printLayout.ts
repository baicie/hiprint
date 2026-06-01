import type { LayoutDocument } from "@hiprint-re/core";
import type { DomRenderOptions } from "../types";
import { getDefaultDocument } from "../utils/dom";
import { createPrintHtml } from "./createPrintHtml";

export interface PrintLayoutOptions extends DomRenderOptions {
  /**
   * Auto-remove the iframe after printing.
   * @default true
   */
  autoRemove?: boolean;

  /**
   * Delay before removing the iframe in ms.
   * @default 1000
   */
  removeDelay?: number;
}

export async function printLayout(
  layout: LayoutDocument,
  options: PrintLayoutOptions = {},
): Promise<void> {
  const doc = options.document ?? getDefaultDocument();
  const html = createPrintHtml(layout, options);

  const iframe = doc.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  iframe.style.visibility = "hidden";

  doc.body.appendChild(iframe);

  const iframeDoc = iframe.contentDocument;
  const iframeWin = iframe.contentWindow;

  if (!iframeDoc || !iframeWin) {
    iframe.remove();
    throw new Error("[hiprint-re/dom] Failed to create print iframe.");
  }

  iframeDoc.open();
  iframeDoc.write(html);
  iframeDoc.close();

  await waitForIframeReady(iframe);

  iframeWin.focus();
  iframeWin.print();

  if (options.autoRemove ?? true) {
    const removeDelay = options.removeDelay ?? 1000;
    setTimeout(() => {
      iframe.remove();
    }, removeDelay);
  }
}

function waitForIframeReady(iframe: HTMLIFrameElement): Promise<void> {
  return new Promise((resolve) => {
    const win = iframe.contentWindow;

    if (!win) {
      resolve();
      return;
    }

    if (iframe.contentDocument?.readyState === "complete") {
      requestAnimationFrame(() => resolve());
      return;
    }

    iframe.onload = () => {
      requestAnimationFrame(() => resolve());
    };
  });
}
