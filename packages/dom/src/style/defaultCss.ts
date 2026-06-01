/**
 * Creates the default CSS for hiprint-re DOM rendering.
 */
export function createDefaultCss(prefix = "hiprint-re"): string {
  return `
.${prefix}-document {
  box-sizing: border-box;
  width: 100%;
  min-height: 100%;
  background: #f3f4f6;
  color: #111827;
  font-family: Arial, "Microsoft YaHei", sans-serif;
}

.${prefix}-page {
  position: relative;
  box-sizing: border-box;
  background: #ffffff;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
}

.${prefix}-page-print {
  box-shadow: none;
  page-break-after: always;
  break-after: page;
}

.${prefix}-element {
  position: absolute;
  box-sizing: border-box;
}

.${prefix}-text {
  white-space: pre-wrap;
  overflow: hidden;
  word-break: break-word;
}

.${prefix}-image {
  display: block;
  overflow: hidden;
}

.${prefix}-image > img {
  display: block;
  width: 100%;
  height: 100%;
}

.${prefix}-line {
  pointer-events: none;
}

.${prefix}-rect {
  background: transparent;
}

.${prefix}-table {
  overflow: hidden;
}

.${prefix}-table-cell {
  position: absolute;
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 2px;
  border: 1px solid #111827;
  font-size: 12px;
  line-height: 1.4;
}

.${prefix}-table-header-cell {
  font-weight: 600;
  background: #f9fafb;
}

.${prefix}-unknown {
  border: 1px dashed #9ca3af;
  color: #6b7280;
  font-size: 12px;
  overflow: hidden;
}

@media print {
  html,
  body {
    margin: 0;
    padding: 0;
    background: #fff;
  }

  .${prefix}-document {
    background: #fff;
  }

  .${prefix}-page {
    margin: 0 !important;
    box-shadow: none !important;
  }

  .${prefix}-page-print {
    page-break-after: always;
    break-after: page;
  }
}
`;
}
