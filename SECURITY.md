# Security and Responsible-Use Policy

Control Evidence Lab is an engineering-beta evidence-inventory library. It is not a compliance certification, security scanner, assessor, or infrastructure-hardening system.

The library validates bounded identifiers and produces deterministic missing/present metadata. It does not verify evidence contents, provenance, freshness, implementation effectiveness, or system configuration. `certificationPerformed` is always `false` by design.

Do not place secrets, credentials, private keys, regulated records, assessor work papers, or sensitive system details in evidence identifiers. Integrators must separately protect evidence repositories, identities, authorization, audit logs, retention, encryption, and transmission.

Never use a `present` result as proof of FedRAMP, NIST, legal, regulatory, contractual, or security compliance. Independent qualified review and the applicable authorization process remain required.

Report suspected vulnerabilities through GitHub private vulnerability reporting when available. Do not disclose private assessment evidence or credentials in public issues.
