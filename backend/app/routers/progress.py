from fastapi import APIRouter, HTTPException
from typing import Dict, Optional
import json
from datetime import datetime

from ..models.user_progress import UserProgress
from ..database import get_session

router = APIRouter()

@router.post("/progress/{user_id}/{chapter}")
async def save_progress(
    user_id: int,
    chapter: int,
    answers: Dict[int, int],
    score: float,
    completed: bool = False
):
    """Save user's progress for a specific chapter."""
    with get_session() as session:
        # Convert answers dict to JSON string
        answers_json = json.dumps(answers)
        
        # Check if progress exists for this user and chapter
        existing = session.query(UserProgress).filter(
            UserProgress.user_id == user_id,
            UserProgress.chapter == chapter
        ).first()
        
        if existing:
            # Update existing progress
            existing.answers = answers_json
            existing.score = score
            existing.completed = completed
            existing.last_updated = datetime.utcnow()
        else:
            # Create new progress
            progress = UserProgress(
                user_id=user_id,
                chapter=chapter,
                answers=answers_json,
                score=score,
                completed=completed
            )
            session.add(progress)
        
        session.commit()
        return {"status": "success"}

@router.get("/progress/{user_id}/{chapter}")
async def get_progress(user_id: int, chapter: int):
    """Get user's progress for a specific chapter."""
    with get_session() as session:
        progress = session.query(UserProgress).filter(
            UserProgress.user_id == user_id,
            UserProgress.chapter == chapter
        ).first()
        
        if not progress:
            raise HTTPException(status_code=404, detail="Progress not found")
        
        return {
            "answers": json.loads(progress.answers),
            "score": progress.score,
            "completed": progress.completed,
            "last_updated": progress.last_updated
        }

@router.get("/progress/{user_id}")
async def get_all_progress(user_id: int):
    """Get all progress for a user."""
    with get_session() as session:
        progress = session.query(UserProgress).filter(
            UserProgress.user_id == user_id
        ).all()
        
        return [{
            "chapter": p.chapter,
            "answers": json.loads(p.answers),
            "score": p.score,
            "completed": p.completed,
            "last_updated": p.last_updated
        } for p in progress] 