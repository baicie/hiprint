export interface LegacyLoadOptions {
  /**
   * Base URL for vendor scripts.
   *
   * Example:
   * /legacy/
   * /node_modules/@hiprint-re/legacy/vendor/
   */
  baseUrl?: string;

  /**
   * Whether to force reload legacy scripts.
   */
  force?: boolean;
}

export interface LegacyRuntime {
  hiprint: LegacyHiprintGlobal;
  rawWindow: Window;
}

export interface LegacyHiprintGlobal {
  [key: string]: unknown;

  init?: (...args: unknown[]) => unknown;
  print?: (...args: unknown[]) => unknown;
  preview?: (...args: unknown[]) => unknown;
}

export interface LegacyTemplateOptions {
  template?: unknown;
  settingContainer?: string | HTMLElement;
  paginationContainer?: string | HTMLElement;
  history?: boolean;
  [key: string]: unknown;
}

export interface LegacyTemplateInstance {
  design?: (...args: unknown[]) => unknown;
  preview?: (...args: unknown[]) => unknown;
  print?: (...args: unknown[]) => unknown;
  getJson?: (...args: unknown[]) => unknown;
  update?: (...args: unknown[]) => unknown;
  [key: string]: unknown;
}

export interface CreateLegacyTemplateOptions {
  template: unknown;
  container?: string | HTMLElement;
  settingContainer?: string | HTMLElement;
  paginationContainer?: string | HTMLElement;
  data?: unknown;
}
