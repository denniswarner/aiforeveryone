from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel, Field

class UserProgress(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(index=True)
    chapter: int
    answers: str  # JSON string of question_id -> answer_index mappings
    score: float
    completed: bool = False
    last_updated: datetime = Field(default_factory=datetime.utcnow) 