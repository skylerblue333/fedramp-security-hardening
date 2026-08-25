# Control Evidence Lab

**Status: engineering beta / compliance-evidence engineering lab.** This TypeScript library inventories caller-declared control evidence and reports whether required evidence identifiers are present, missing, or not assessed.

It deliberately does **not** determine FedRAMP compliance, perform assessor judgment, issue an authorization, validate the authenticity or sufficiency of evidence, or claim that a system meets any government security baseline.

## Implemented

- bounded control IDs, descriptions, and evidence identifiers;
- deterministic evidence deduplication and ordering;
- explicit `present`, `missing`, and `not-assessed` statuses;
- missing-evidence reporting;
- aggregate evidence counts;
- permanent `certificationPerformed: false` truth signal;
- strict TypeScript, regression tests, production build, package-import smoke test, and dependency-audit CI.

## Development

```bash
npm install
npm run typecheck
npm test
npm run build
```

## Integration boundary

Use this package only as an internal evidence-inventory primitive. A real FedRAMP or other compliance program requires the applicable control baseline, system boundary, SSP and supporting documentation, evidence collection/provenance, implementation review, testing, assessor judgment, POA&M handling, authorization process, continuous monitoring, and program-specific requirements maintained outside this library.

A `present` result means only that all evidence identifiers the caller declared as required were also supplied to the function. It is not a finding that the evidence is correct, current, sufficient, authentic, or compliant.

## Explicit limitations

This repository ships no official FedRAMP/NIST control catalog, policy requirements, scanning engine, cloud hardening automation, assessor workflow, ATO workflow, continuous monitoring service, or production deployment. It never applies security patches or mutates infrastructure.

See `SECURITY.md` for responsible-use boundaries and `LICENSE` for licensing terms.
