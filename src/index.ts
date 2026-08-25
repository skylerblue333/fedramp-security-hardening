export type EvidenceStatus = "present" | "missing" | "not-assessed";

export interface ControlEvidenceInput {
  readonly controlId: string;
  readonly description: string;
  readonly requiredEvidence: readonly string[];
  readonly suppliedEvidence?: readonly string[];
}

export interface ControlEvidenceResult {
  readonly controlId: string;
  readonly status: EvidenceStatus;
  readonly missingEvidence: readonly string[];
  readonly suppliedEvidence: readonly string[];
  readonly certificationPerformed: false;
}

const CONTROL_RE = /^[A-Z]{2,4}-\d{1,3}(?:\.\d{1,2})?$/;
const EVIDENCE_RE = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$/;
const MAX_EVIDENCE = 64;

export function assessControlEvidence(input: ControlEvidenceInput): ControlEvidenceResult {
  if (!CONTROL_RE.test(input.controlId)) throw new Error("invalid control id");
  const description = input.description.trim();
  if (description.length < 1 || description.length > 500) throw new Error("description must contain 1-500 characters");

  const required = normalizeEvidence(input.requiredEvidence, "required evidence");
  const supplied = normalizeEvidence(input.suppliedEvidence ?? [], "supplied evidence");
  const suppliedSet = new Set(supplied);
  const missing = required.filter((item) => !suppliedSet.has(item));
  const status: EvidenceStatus = required.length === 0 ? "not-assessed" : missing.length === 0 ? "present" : "missing";

  return Object.freeze({
    controlId: input.controlId,
    status,
    missingEvidence: Object.freeze(missing),
    suppliedEvidence: Object.freeze(supplied),
    certificationPerformed: false,
  });
}

export function summarizeEvidence(results: readonly ControlEvidenceResult[]) {
  if (results.length > 10_000) throw new Error("result capacity exceeded");
  const summary = { present: 0, missing: 0, notAssessed: 0, certificationPerformed: false as const };
  for (const result of results) {
    if (result.status === "present") summary.present += 1;
    else if (result.status === "missing") summary.missing += 1;
    else summary.notAssessed += 1;
  }
  return Object.freeze(summary);
}

function normalizeEvidence(values: readonly string[], label: string): string[] {
  if (!Array.isArray(values) || values.length > MAX_EVIDENCE) throw new Error(`${label} must contain at most ${MAX_EVIDENCE} entries`);
  const normalized = values.map((value) => {
    if (typeof value !== "string" || !EVIDENCE_RE.test(value)) throw new Error(`invalid ${label} identifier`);
    return value;
  });
  return [...new Set(normalized)].sort((a, b) => a.localeCompare(b));
}
