# Sprints

## Purpose

This directory contains sprint plans for OpenContextPlatform.

## Goals

- Convert the roadmap into time-boxed, reviewable work.
- Keep sprint scope aligned with the required lifecycle.
- Track deliverables without mixing unrelated milestones.

## Architecture

Each sprint links to roadmap milestones, RFCs, ADRs, specifications, documentation, verification checks, and loop progress artifacts.

## Diagrams

```mermaid
flowchart LR
  Roadmap --> Sprint
  Sprint --> Loop
  Loop --> Outputs
  Outputs --> Review
```

## Examples

Sprint 001 focuses on foundation specifications and does not add runtime business logic.

## Tradeoffs

Sprint plans add planning overhead. They prevent uncontrolled expansion of scope during architecture-heavy work.

## Future Work

Future sprints will include acceptance criteria, owners, risk registers, and release readiness checklists.
