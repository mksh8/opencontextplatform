# RFC 0021: Marketplace Architecture

## Purpose
This RFC defines the Plugin Marketplace for OpenContextPlatform (Phase 9), enabling community extensibility.

## Goals
- Provide a `PluginRegistry` that dynamically loads external components.
- Establish a `plugin.json` manifest schema.

## Architecture
1. **Local Registry**: The platform scans a configured `plugins/` directory. For each subdirectory, it parses the `plugin.json` manifest.
2. **Manifest Schema**:
   - `name`: Unique plugin identifier.
   - `type`: Either `connector`, `provider`, or `intelligence`.
   - `entrypoint`: The Python module and class to load (e.g., `main.MyCustomConnector`).
3. **Execution Boundary**:
   - For the initial reference architecture, plugins are loaded via standard `importlib` and execute within the main Python process (Trusted Execution).
   - *Future Production Requirement*: Production environments MUST enforce an architectural boundary, invoking plugins via gRPC sidecars or WebAssembly to prevent malicious code from crashing the main Context Engine.
