# RFC 0019: RBAC and SSO

## Purpose
This RFC defines Identity Federation and Role-Based Access Control for the OpenContextPlatform.

## Goals
- Provide an `ISSOProvider` interface designed around OIDC/OAuth2.
- Define a reference implementation using **Auth0**.
- Define an RBAC engine that maps Auth0 claims to internal platform roles.

## Architecture
1. **SSO Provider**: Validates JWT tokens against an IDP's (Auth0) JWKS endpoint.
2. **RBAC Mapper**: Reads the authenticated user profile and maps it to specific permissions based on the active `tenant_id`.
3. **Roles**: `Admin` (full system access), `Contributor` (can ingest context), `Viewer` (can only query context).
