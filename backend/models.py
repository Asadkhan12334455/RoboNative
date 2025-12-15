from pydantic import BaseModel
from typing import List, Optional

class UserCreate(BaseModel):
    email: str
    password: str
    background: str  # software, hardware, student

class UserResponse(BaseModel):
    id: int
    email: str
    background: str

class ChatQuery(BaseModel):
    question: str
    context_text: Optional[str] = None  # Logic: user selects text to ask about
    chat_history: List[dict] = []

class ChatResponse(BaseModel):
    answer: str
    sources: List[str] = []
