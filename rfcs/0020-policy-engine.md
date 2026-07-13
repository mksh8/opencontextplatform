# RFC 0020: Policy Engine

## Purpose
This RFC defines how fine-grained access is evaluated against specific Context Objects.

## Goals
- Support both simple internal Access Control Lists (ACL) and robust external Open Policy Agent (OPA) integration.

## Architecture
1. **ACL Engine**: A fast, local Python evaluator that checks if a user's RBAC role satisfies the required permissions for a given operation.
2. **OPA Engine**: A robust evaluator that serializes the user's claims and the target `ContextObject` into JSON, and queries a sidecar Rego service for a `allow = true` response.
3. **Policy Router**: Routes the authorization check to the configured engine (ACL vs OPA) before fulfilling API requests.
