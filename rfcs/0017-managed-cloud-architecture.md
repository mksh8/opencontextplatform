# RFC 0017: Managed Cloud Architecture

## Purpose
This RFC defines the multi-tenant managed architecture for OpenContextPlatform (Phase 7).

## Goals
- Support multi-tenancy securely across both Kubernetes (namespace isolation) and Serverless (AWS Lambda, logical DB partition) deployment targets.
- Manage Tenant provisioning and API key lifecycle.

## Architecture
1. **TenantManager**: Validates incoming API keys and extracts the `tenant_id`. It injects the `tenant_id` into the execution context.
2. **RateLimiter**: Intercepts requests immediately after authentication. Uses the Cache Provider (e.g., Redis) to enforce limits based on the tenant's tier.
3. **Deployment Targets**:
   - **K8s Mode**: Tenants can be assigned dedicated database instances (namespace isolation).
   - **Serverless Mode**: Tenants share the underlying ArcadeDB cluster but all queries are strictly filtered by the `tenant_id` root document property (logical partition).

## Tradeoffs
Supporting both K8s isolation and serverless logical partitions adds complexity to the database provider logic, but it offers maximum flexibility for different enterprise customers.
