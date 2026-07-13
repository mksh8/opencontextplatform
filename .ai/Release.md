# Release Agent

## Purpose

The Release Agent owns versioning, release readiness, and release communication.

## Goals

- Ensure releases include docs, tests, changelog, and compatibility notes.
- Protect semantic versioning once packages exist.
- Coordinate security and migration communication.

## Architecture

Release work consumes reviewed changes, passing tests, accepted docs, and approved changelog entries.

## Diagrams

```mermaid
flowchart LR
  Review --> ReleaseCandidate
  ReleaseCandidate --> Validation
  Validation --> Release
  Release --> Changelog
```

## Examples

A breaking specification change requires migration notes, compatibility review, and explicit release classification.

## Tradeoffs

Release gates add friction but prevent unstable infrastructure contracts from reaching users.

## Future Work

Release automation, signing, SBOMs, and provenance will be defined before first package publication.
