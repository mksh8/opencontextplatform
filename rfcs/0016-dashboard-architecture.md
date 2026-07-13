# RFC 0016: Dashboard Architecture

## Purpose
This RFC defines the architecture for the OpenContextPlatform Web Dashboard (Phase 6).

## Goals
- Provide a sleek, premium control plane (Vercel/Linear aesthetic) for managing the Context Engine.
- Built as a Single Page Application (SPA) using React.
- Connects to the core REST API defined in Phase 2.

## Architecture
- **Framework**: React + Vite (TypeScript).
- **Styling**: Premium Vanilla CSS (custom design system, glassmorphism, dark mode, rich gradients).
- **Routing**: React Router (Client-side routing).
- **State**: React Context API for global state (auth, active tenant).

## Core Views
1. **Overview**: High-level metrics (Ingestion volume, LLM token usage).
2. **Memory Graph Explorer**: Visualizes the ArcadeDB graph of `ContextObjects`.
3. **Providers & Connectors**: Manages active integrations (e.g., GitHub, OpenAI keys).

## Design System Guidelines
- **Colors**: Deep blacks (`#0a0a0a`), subtle grays (`#1a1a1a`), vibrant accents (e.g., Indigo/Purple gradient for active states).
- **Typography**: Inter font family, high contrast for readability.
- **Effects**: Glassmorphism (`backdrop-filter: blur()`), subtle borders, micro-animations on hover.
