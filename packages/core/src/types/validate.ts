export type ValidateIssueLevel = "error" | "warning";

export interface ValidateIssue {
  level: ValidateIssueLevel;
  code: string;
  path: string;
  message: string;
}

export interface ValidateResult {
  valid: boolean;
  issues: ValidateIssue[];
}

export function createValidateResult(issues: ValidateIssue[]): ValidateResult {
  return {
    valid: !issues.some((issue) => issue.level === "error"),
    issues,
  };
}
