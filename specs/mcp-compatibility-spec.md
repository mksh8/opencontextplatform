# Model Context Protocol (MCP) Compatibility Specification

## Overview
The Model Context Protocol (MCP) is an open standard that enables AI models and assistants to securely access external tools and data sources. OpenContextPlatform (OCP) implements the MCP specification to act as a universal memory and context backend for any MCP-compliant client (e.g., Claude Code, Cursor, custom agents).

## OCP as an MCP Server
OpenContextPlatform exposes an MCP Server interface alongside its standard REST/gRPC APIs. This allows AI clients to dynamically retrieve relevant organizational context without needing to write custom integration code for OCP.

### 1. Resources (`mcp.resources`)
OCP exposes static and dynamic context nodes as MCP resources.

- **URI Scheme**: `ocp://{tenant_id}/{context_type}/{id}`
- **Example**: `ocp://org-123/semantic/doc-456`
- **Behavior**: Clients can request specific memory nodes. The OCP MCP server will return the `content` and `metadata` of the node as the resource payload.

### 2. Prompts (`mcp.prompts`)
OCP's Prompt Builder engine exposes dynamic prompts that automatically inject relevant hybrid search results.

- **Name**: `ocp-context-assembly`
- **Arguments**: 
  - `query` (string): The natural language query to search for.
  - `hybrid_weight` (number, optional): The bias between vector similarity and graph traversal.
- **Behavior**: When a client invokes this prompt, OCP executes a hybrid search on the backend, ranks the results, and returns a fully assembled prompt string containing the top-k context snippets.

### 3. Tools (`mcp.tools`)
OCP exposes active tools for agents to read and write to the knowledge graph.

#### Tool: `ocp_ingest_memory`
- **Description**: Add a new episodic or semantic memory to the knowledge graph.
- **Parameters**:
  - `content` (string): The memory to store.
  - `type` (string): "semantic" or "episodic".
  - `metadata` (object): Key-value tags.

#### Tool: `ocp_hybrid_search`
- **Description**: Perform a hybrid search against the OCP database.
- **Parameters**:
  - `query` (string): The search query.
  - `top_k` (integer): Number of results to return.

## Security & Tenancy
All MCP interactions are routed through the OCP RBAC Policy Engine. The MCP connection must be initialized with a Bearer Token representing the `tenant_id`. The MCP server strictly isolates resources, ensuring an agent can only retrieve context belonging to the authenticated tenant.
