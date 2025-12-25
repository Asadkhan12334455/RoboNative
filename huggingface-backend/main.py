import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime

# Initialize Application
app = FastAPI(
    title="Hugging Face Backend",
    description="Production-ready FastAPI backend for Hugging Face Spaces",
    version="1.0.0"
)

# CORS Configuration
# Enabled for * to allow access from any Vercel/Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic Models
class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str
    timestamp: str
    status: str

# Routes
@app.get("/")
async def root():
    """
    Health check and root endpoint.
    Verifies the service is running and accessible.
    """
    return {
        "status": "online",
        "service": "Hugging Face Backend API",
        "timestamp": datetime.now().isoformat(),
        "documentation": "/docs"
    }

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """
    Sample chat endpoint.
    in a real scenario, connect this to an LLM or database.
    Current implementation echoes the input with a timestamp.
    """
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    # Simulation of backend processing
    processed_response = f"Backend received: {request.message}"

    return ChatResponse(
        response=processed_response,
        timestamp=datetime.now().isoformat(),
        status="success"
    )

# Entry point for local debugging
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=7860, reload=True)
