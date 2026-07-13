# Governance

## Purpose

This document describes how OpenContextPlatform decisions are made.

## Goals

- Keep the project open, predictable, and technically rigorous.
- Require RFCs and ADRs for architecture-affecting changes.
- Protect specification compatibility.

## Architecture

Governance uses issues for discovery, RFCs for proposals, ADRs for accepted decisions, maintainers for review, and releases for communication.

## Diagrams

```mermaid
flowchart LR
  Proposal --> RFC
  RFC --> Decision
  Decision --> ADR
  ADR --> Implementation
  Implementation --> Release
```

## Examples

A new connector category requires an RFC. A change to context identity requires an RFC, ADR, migration strategy, and compatibility review.

## Tradeoffs

Formal governance slows changes but creates the trust required for an open standard.

## Future Work

Maintainer roles, voting rules, release trains, and specification stability levels will be documented before the first public release.
