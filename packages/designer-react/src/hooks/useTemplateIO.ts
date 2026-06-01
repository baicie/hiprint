import {
  exportTemplateToJson,
  importTemplateFromJson,
} from "@hiprint-re/designer-core";
import { useDesignerContext } from "../context/useDesignerContext";
import { downloadTextFile } from "../utils/download";
import { useCallback } from "react";

export function useTemplateIO() {
  const { store, onChange } = useDesignerContext();

  const exportJson = useCallback(
    (filename = "template.json") => {
      const template = store.getStateRef().template;
      const json = exportTemplateToJson(template);
      downloadTextFile(json, filename);
    },
    [store],
  );

  const importJson = useCallback(
    async (file: File) => {
      const content = await file.text();
      const result = importTemplateFromJson(content);

      const current = store.getStateRef();

      store.setState({
        ...current,
        template: result.template,
        activePanelId: result.template.panels[0]?.id,
        selection: {
          ids: [],
          activeId: undefined,
        },
      });

      onChange?.(result.template);

      return result;
    },
    [store, onChange],
  );

  return {
    exportJson,
    importJson,
  };
}
