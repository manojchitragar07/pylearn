"""
PyLearn Backend — FastAPI Application
======================================
Provides sandboxed Python code execution and curriculum data APIs.

Run:
    uvicorn app.main:app --reload --port 8000
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import code, curriculum, health

app = FastAPI(
    title="PyLearn API",
    description="Backend for the PyLearn interactive Python learning platform",
    version="1.0.0",
)

# ── CORS ─────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # Vite dev server
        "http://localhost:4173",   # Vite preview
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(health.router,     prefix="/api")
app.include_router(code.router,       prefix="/api/code")
app.include_router(curriculum.router, prefix="/api")
