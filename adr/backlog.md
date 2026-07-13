# ADR Backlog

## Purpose

This backlog defines Architecture Decision Record candidates that should be produced as RFCs are accepted.

## Goals

- Keep accepted decisions traceable to RFCs and specifications.
- Identify decisions that block implementation.
- Prevent undocumented architecture drift.

## Architecture

ADR candidates are created from RFC review. Accepted ADRs are immutable records that update the architecture book, specifications, implementation plans, tests, and release notes.

## Diagrams

```mermaid
flowchart LR
  RFC --> Decision
  Decision --> ADR
  ADR --> Specs
  ADR --> Tests
  ADR --> Implementation
```

## Examples

If RFC-005 accepts a plugin isolation model, the corresponding ADR records the chosen model, rejected alternatives, operational consequences, and security implications.

### ADR Candidates

| Candidate | Decision | Linked RFCs | Linked Specifications | Owner Role | Proposed Sprint |
| --- | --- | --- | --- | --- | --- |
| ADR-002 | Adopt specification stability levels | RFC-003 | all specs | Architect | Sprint 001 |
| ADR-003 | Adopt API-first contract strategy | RFC-008 | context, retrieval, ranking, prompt builder | Architect | Sprint 002 |
| ADR-004 | Adopt runtime Clean Architecture boundaries | RFC-004 | context, memory, retrieval, ranking | Architect | Sprint 002 |
| ADR-005 | Adopt plugin lifecycle and isolation model | RFC-005 | plugin, provider, connector | Security | Sprint 002 |
| ADR-006 | Adopt provider port taxonomy | RFC-006 | provider, plugin | Architect | Sprint 003 |
| ADR-007 | Adopt connector sync and permission model | RFC-007 | connector, context, plugin | Security | Sprint 003 |
| ADR-008 | Adopt conformance-first testing strategy | RFC-009 | all specs | Tester | Sprint 001 |
| ADR-009 | Adopt enterprise security posture | RFC-010 | connector, plugin, prompt builder, memory | Security | Sprint 002 |
| ADR-010 | Adopt monorepo package governance | RFC-004, RFC-006, RFC-007 | provider, connector, plugin | Reviewer | Sprint 002 |

### Blocking Decisions

The following ADRs block implementation:

- ADR-002 blocks spec promotion beyond Draft.
- ADR-004 blocks runtime package and module layout.
- ADR-005 blocks provider and connector plugin implementation.
- ADR-008 blocks executable conformance tests.
- ADR-009 blocks enterprise-facing connector, memory, and prompt behavior.

## Tradeoffs

Maintaining an ADR backlog creates more planning artifacts, but it prevents major decisions from being buried in RFC comments or implementation details.

## Future Work

Future ADR work should create template files, add status values, and link accepted ADRs from the architecture book and relevant specifications.
