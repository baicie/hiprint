import { downloadPngPages } from "@hiprint-re/canvas";
import { downloadPdf } from "@hiprint-re/pdf";
import { renderToSvgString } from "@hiprint-re/svg";
import { useDesignerLayout } from "../hooks/useDesignerLayout";
import { useDesignerPluginManager } from "../plugin/DesignerPluginProvider";
import { downloadTextFile } from "../utils/download";

export function ExportActions() {
  const { layout } = useDesignerLayout();
  const pluginManager = useDesignerPluginManager();

  async function exportSvg() {
    if (!layout) return;

    const svg = renderToSvgString(layout, {
      renderers: pluginManager.getSvgRenderers(),
    });

    downloadTextFile(svg, "print.svg", "image/svg+xml;charset=utf-8");
  }

  async function exportPng() {
    if (!layout) return;

    await downloadPngPages(layout, {
      renderers: pluginManager.getCanvasRenderers(),
    });
  }

  async function exportPdf() {
    if (!layout) return;

    await downloadPdf(layout, "print.pdf", {
      renderers: pluginManager.getPdfRenderers(),
    });
  }

  return (
    <>
      <button
        onClick={exportSvg}
        disabled={!layout}
        title="导出 SVG"
      >
        SVG
      </button>
      <button
        onClick={exportPng}
        disabled={!layout}
        title="导出 PNG"
      >
        PNG
      </button>
      <button
        onClick={exportPdf}
        disabled={!layout}
        title="导出 PDF"
      >
        PDF
      </button>
    </>
  );
}
