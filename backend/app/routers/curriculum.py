"""
Curriculum Router — GET /api/curriculum  |  GET /api/exercises
Serves the Python curriculum data as JSON so the frontend can optionally
fetch it from the API instead of bundling it statically.
"""
import json
from pathlib import Path

from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse

router = APIRouter(tags=["Curriculum"])

DATA_DIR = Path(__file__).parent.parent / "data"


@router.get("/curriculum")
async def get_curriculum():
    """Return the full Python curriculum."""
    path = DATA_DIR / "curriculum.json"
    if not path.exists():
        raise HTTPException(status_code=404, detail="Curriculum data not found")
    return JSONResponse(content=json.loads(path.read_text()))


@router.get("/exercises")
async def get_exercises():
    """Return standalone practice exercises."""
    path = DATA_DIR / "exercises.json"
    if not path.exists():
        raise HTTPException(status_code=404, detail="Exercises data not found")
    return JSONResponse(content=json.loads(path.read_text()))
