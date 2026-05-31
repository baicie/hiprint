import { invariant } from "@hiprint-re/shared";
import { loadLegacyRuntime } from "./loadLegacy";
import type {
  CreateLegacyTemplateOptions,
  LegacyLoadOptions,
  LegacyRuntime,
  LegacyTemplateInstance,
} from "./types";

export class LegacyHiprintFacade {
  private runtime: LegacyRuntime | undefined;

  async load(options?: LegacyLoadOptions): Promise<LegacyRuntime> {
    this.runtime = await loadLegacyRuntime(options);
    return this.runtime;
  }

  getRuntime(): LegacyRuntime {
    invariant(this.runtime, "Legacy runtime has not been loaded.");
    return this.runtime;
  }

  getGlobal() {
    return this.getRuntime().hiprint;
  }

  createTemplate(options: CreateLegacyTemplateOptions): LegacyTemplateInstance {
    this.getRuntime();

    const TemplateCtor = window.hiprintTemplate;

    invariant(
      TemplateCtor,
      "window.hiprintTemplate was not found. Please check legacy runtime loading order.",
    );

    return new (TemplateCtor as new (options?: unknown) => LegacyTemplateInstance)({
      template: options.template,
      settingContainer: options.settingContainer,
      paginationContainer: options.paginationContainer,
    });
  }

  design(
    instance: LegacyTemplateInstance,
    container: string | HTMLElement,
  ): void {
    invariant(
      instance.design,
      "Legacy template instance does not support design().",
    );
    instance.design(container);
  }

  preview(instance: LegacyTemplateInstance, data?: unknown): unknown {
    invariant(
      instance.preview,
      "Legacy template instance does not support preview().",
    );
    return instance.preview(data);
  }

  print(instance: LegacyTemplateInstance, data?: unknown): unknown {
    invariant(
      instance.print,
      "Legacy template instance does not support print().",
    );
    return instance.print(data);
  }

  getJson(instance: LegacyTemplateInstance): unknown {
    invariant(
      instance.getJson,
      "Legacy template instance does not support getJson().",
    );
    return instance.getJson();
  }
}

export function createLegacyHiprint(): LegacyHiprintFacade {
  return new LegacyHiprintFacade();
}
