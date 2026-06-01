import { useMemo } from "react";
import { createDesignerStore } from "@hiprint-re/designer-core";
import { DesignerContext } from "./DesignerContext";
import { normalizeInputTemplate } from "../normalizeInputTemplate";
import type {
  DesignerContextValue,
  DesignerProviderProps,
} from "../types";

export function DesignerProvider(props: DesignerProviderProps) {
  const template = useMemo(
    () => normalizeInputTemplate(props.template, props.templateKind ?? "auto"),
    [props.template, props.templateKind],
  );

  const store = useMemo(
    () =>
      createDesignerStore({
        template,
      }),
    [template],
  );

  const value = useMemo<DesignerContextValue>(
    () => ({
      store,
      data: props.data ?? {},
      layoutOptions: props.layoutOptions,
      domOptions: props.domOptions,
      readonly: props.readonly ?? false,
      onChange: props.onChange,
      onLayout: props.onLayout,
      onError: props.onError,
    }),
    [
      store,
      props.data,
      props.layoutOptions,
      props.domOptions,
      props.readonly,
      props.onChange,
      props.onLayout,
      props.onError,
    ],
  );

  return (
    <DesignerContext.Provider value={value}>
      {props.children}
    </DesignerContext.Provider>
  );
}
