# Base image per user request
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies if any are needed for ArcadeDB client / LLM libraries
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Assuming requirements.txt exists (we will map packages manually in actual deployment)
# COPY requirements.txt .
# RUN pip install --no-cache-dir -r requirements.txt

# For the sake of this reference implementation without a requirements.txt
RUN pip install --no-cache-dir fastapi uvicorn pydantic

# Copy the rest of the backend codebase
COPY . .

# Expose the API port
EXPOSE 8000

# Start the FastAPI server (assuming a main.py entrypoint exists, we use uvicorn)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
