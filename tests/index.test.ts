import { describe, expect, it } from "vitest";
import { assessControlEvidence, summarizeEvidence } from "../src/index";

describe("control evidence assessment", () => {
  it("reports missing caller-declared evidence without certifying compliance", () => {
    const result = assessControlEvidence({
      controlId: "AC-2",
      description: "Account management evidence inventory",
      requiredEvidence: ["policy/account-management", "sample/access-review"],
      suppliedEvidence: ["policy/account-management"],
    });
    expect(result.status).toBe("missing");
    expect(result.missingEvidence).toEqual(["sample/access-review"]);
    expect(result.certificationPerformed).toBe(false);
  });

  it("reports present only when all declared evidence identifiers are supplied", () => {
    const result = assessControlEvidence({
      controlId: "AU-2",
      description: "Event logging evidence inventory",
      requiredEvidence: ["config/audit-events", "sample/audit-log"],
      suppliedEvidence: ["sample/audit-log", "config/audit-events", "sample/audit-log"],
    });
    expect(result.status).toBe("present");
    expect(result.suppliedEvidence).toEqual(["config/audit-events", "sample/audit-log"]);
  });

  it("uses not-assessed when no evidence requirements are declared", () => {
    expect(assessControlEvidence({ controlId: "CM-2", description: "Baseline configuration", requiredEvidence: [] }).status).toBe("not-assessed");
  });

  it("rejects malformed control and evidence identifiers", () => {
    expect(() => assessControlEvidence({ controlId: "bad", description: "x", requiredEvidence: [] })).toThrow("invalid control id");
    expect(() => assessControlEvidence({ controlId: "AC-2", description: "x", requiredEvidence: ["bad evidence"] })).toThrow("invalid required evidence");
  });

  it("summarizes statuses without producing a certification verdict", () => {
    const present = assessControlEvidence({ controlId: "AC-2", description: "x", requiredEvidence: ["policy/a"], suppliedEvidence: ["policy/a"] });
    const missing = assessControlEvidence({ controlId: "AU-2", description: "x", requiredEvidence: ["policy/b"] });
    expect(summarizeEvidence([present, missing])).toEqual({ present: 1, missing: 1, notAssessed: 0, certificationPerformed: false });
  });
});
