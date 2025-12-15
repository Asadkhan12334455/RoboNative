from fastapi import APIRouter, Depends, HTTPException, status
# from sqlalchemy.orm import Session
from database import get_db
from models import UserCreate, UserResponse

router = APIRouter()

@router.post("/register", response_model=UserResponse)
def register(user: UserCreate):
    # Stub implementation - in real world, hash password and save to DB
    # Simulate success
    return {"id": 1, "email": user.email, "background": user.background}

@router.post("/login")
def login(user_data: dict):
    # Stub login
    return {"access_token": "fake-jwt-token", "token_type": "bearer"}
