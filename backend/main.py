from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Physical AI Textbook API", version="1.0.0")

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple models to avoid importing connection-heavy modules
class ChatQuery(BaseModel):
    question: str
    context_text: str | None = None

class ChatResponse(BaseModel):
    answer: str
    sources: list[str]

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(query: ChatQuery):
    """
    Chat endpoint with AI integration and demo mode fallback.
    """
    # First, try Groq API if key is available
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")
    
    if GROQ_API_KEY and GROQ_API_KEY != "sk-demo":
        try:
            import httpx
            
            # Build context message if user selected text
            context_info = ""
            if query.context_text:
                context_info = f"\n\nContext from textbook:\n{query.context_text}"
            
            # System prompt for Physical AI tutor
            system_prompt = """You are an expert AI tutor for the 'Physical AI & Humanoid Robotics' course (RoboNative). 
You help students understand ROS 2, Digital Twins, VLA models, Humanoid robotics, and URDF modeling. 
Give clear, concise, and easy-to-understand answers."""

            async with httpx.AsyncClient() as client:
                response = await client.post(
                    "https://api.groq.com/openai/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {GROQ_API_KEY}",
                        "Content-Type": "application/json"
                    },
                    json={
                        "model": "llama-3.1-8b-instant",
                        "messages": [
                            {"role": "system", "content": system_prompt},
                            {"role": "user", "content": query.question + context_info}
                        ],
                        "temperature": 0.7,
                    },
                    timeout=30.0
                )

                if response.status_code == 200:
                    data = response.json()
                    answer = data['choices'][0]['message']['content']
                    source = "Groq Llama 3 (Context-based)" if query.context_text else "Groq Llama 3 AI Tutor"
                    return {"answer": answer, "sources": [source]}
                    
        except Exception as e:
            print(f"Groq API Error: {e}")
            # Fall through to demo mode
    
    # Demo Mode - Intelligent responses for common questions
    question_lower = query.question.lower()
    
    responses = {
        "ros": """**ROS 2 (Robot Operating System 2)** is the next-generation robotics middleware framework.

Key features:
• **Real-time performance** with DDS (Data Distribution Service)
• **Multi-platform support** (Linux, Windows, macOS)
• **Security** built-in with authentication and encryption
• **Scalable architecture** for both hobby and industrial robots

ROS 2 uses a publish-subscribe model where nodes communicate via topics. It's essential for modern robotics development, especially for humanoid robots and autonomous systems.""",
        
        "digital twin": """**Digital Twins** are virtual replicas of physical robots that mirror their real-world counterparts in real-time.

Benefits in robotics:
• **Safe testing** of behaviors before deployment
• **Predictive maintenance** by monitoring virtual sensors
• **Training AI models** in simulation
• **Remote monitoring** and diagnostics

Popular tools: Gazebo, NVIDIA Isaac Sim, Unity Robotics.""",
        
        "vla": """**VLA (Vision-Language-Action) models** are AI systems that combine:
• **Vision** - Understanding visual scenes
• **Language** - Processing natural language commands
• **Action** - Executing physical robot actions

Examples: Google's RT-2, OpenAI's VLM. These models allow robots to follow human commands like "Pick up the red cup" by understanding both what they see and what you're asking.""",
        
        "urdf": """**URDF (Unified Robot Description Format)** is an XML format for defining robot structures.

Components:
• **Links** - Physical parts (chassis, arms, wheels)
• **Joints** - Connections between links (revolute, prismatic, fixed)
• **Visual & Collision** meshes
• **Inertial properties** for physics simulation

Essential for robot simulation and motion planning in ROS 2.""",
        
        "humanoid": """**Humanoid Robots** are robots designed to resemble the human form.

Key challenges:
• **Balance & locomotion** - Bipedal walking is complex
• **Dexterity** - Human-like hand manipulation
• **Perception** - Understanding the environment
• **Human-robot interaction** - Natural communication

Examples: Boston Dynamics Atlas, Tesla Optimus, Figure 01.""",
    }
    
    # Find best matching response
    for keyword, response in responses.items():
        if keyword in question_lower:
            return {
                "answer": response + "\n\n💡 *Note: Running in demo mode. Connect a valid AI API key for personalized answers.*",
                "sources": ["RoboNative Knowledge Base (Demo)"]
            }
    
    # Default response
    return {
        "answer": f"""I'm here to help with Physical AI & Humanoid Robotics topics!

Try asking about:
• **ROS 2** - Robot Operating System fundamentals
• **Digital Twins** - Virtual robot simulation
• **VLA Models** - Vision-Language-Action AI
• **URDF** - Robot modeling format
• **Humanoid Robotics** - Walking robots

Your question: "{query.question}"

💡 *Running in demo mode. For AI-powered answers, add a valid API key to your .env file.*""",
        "sources": ["RoboNative Assistant (Demo)"]
    }
        
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
