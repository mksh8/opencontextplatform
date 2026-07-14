from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import contexts, metrics, search

app = FastAPI(title="OpenContextPlatform Gateway", version="1.1.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "online", "service": "OpenContextPlatform Gateway (Modular)", "version": "1.1.0"}

# Include Routers
app.include_router(contexts.router)
app.include_router(metrics.router)
app.include_router(search.router)
