import { useRef } from "react";
import { useTemplateIO } from "../hooks/useTemplateIO";

export function TemplateActions() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const io = useTemplateIO();

  async function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    await io.importJson(file);
    event.target.value = "";
  }

  return (
    <>
      <button
        onClick={() => io.exportJson()}
        title="导出模板 JSON"
      >
        导出
      </button>

      <button
        onClick={() => inputRef.current?.click()}
        title="导入模板 JSON"
      >
        导入
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="application/json,.json"
        style={{ display: "none" }}
        onChange={onFileChange}
      />
    </>
  );
}
