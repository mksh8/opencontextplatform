#!/bin/bash

# Base directories
mkdir -p apps/api/app/core
mkdir -p apps/api/app/api/v1/contexts
mkdir -p apps/api/app/api/v1/metrics
mkdir -p apps/api/app/api/v1/search
mkdir -p apps/api/app/modules/context
mkdir -p apps/api/app/modules/metrics
mkdir -p apps/api/app/modules/search
mkdir -p apps/api/app/db
mkdir -p apps/api/app/plugins
mkdir -p apps/api/app/events
mkdir -p apps/api/app/middleware
mkdir -p apps/api/app/integrations
mkdir -p apps/api/app/telemetry
mkdir -p apps/api/app/tests
mkdir -p apps/api/scripts

# Touch __init__.py files
touch apps/api/app/__init__.py
touch apps/api/app/core/__init__.py
touch apps/api/app/api/__init__.py
touch apps/api/app/api/v1/__init__.py
touch apps/api/app/api/v1/contexts/__init__.py
touch apps/api/app/api/v1/metrics/__init__.py
touch apps/api/app/api/v1/search/__init__.py
touch apps/api/app/modules/__init__.py
touch apps/api/app/modules/context/__init__.py
touch apps/api/app/modules/metrics/__init__.py
touch apps/api/app/modules/search/__init__.py
touch apps/api/app/db/__init__.py

# Touch core files
touch apps/api/README.md
touch apps/api/pyproject.toml
touch apps/api/Dockerfile
touch apps/api/alembic.ini
touch apps/api/app/lifecycle.py
touch apps/api/app/core/config.py
touch apps/api/app/core/settings.py
touch apps/api/app/core/logging.py
touch apps/api/app/core/security.py
touch apps/api/app/core/constants.py
touch apps/api/app/core/exceptions.py
touch apps/api/app/api/dependencies.py
touch apps/api/app/api/middleware.py
touch apps/api/app/api/exception_handlers.py
touch apps/api/app/api/v1/router.py

# Touch module boilerplate
for module in context metrics search; do
  touch apps/api/app/modules/$module/service.py
  touch apps/api/app/modules/$module/repository.py
  touch apps/api/app/modules/$module/models.py
  touch apps/api/app/modules/$module/schemas.py
  touch apps/api/app/modules/$module/interfaces.py
done

# Clean up previous temporary structure
rm -f apps/api/routers/contexts.py
rm -f apps/api/routers/metrics.py
rm -f apps/api/routers/search.py
rm -f apps/api/routers/__init__.py
rmdir apps/api/routers || true
rm -f apps/api/main.py
