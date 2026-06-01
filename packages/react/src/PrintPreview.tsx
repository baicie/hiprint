import { forwardRef, useImperativeHandle } from "react";
import type { PrintPreviewProps, PrintPreviewRef } from "./types";
import { usePrintPreview } from "./usePrintPreview";

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
