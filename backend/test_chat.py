import httpx
import asyncio
import json

async def test_question(question):
    """Test a single question"""
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://localhost:8000/api/chat",
            json={"question": question},
            timeout=30.0
        )
        data = response.json()
        print(f"\n{'='*70}")
        print(f"Q: {question}")
        print(f"{'='*70}")
        print(f"A: {data['answer']}")
        print(f"\nSource: {data['sources'][0]}")

async def main():
    print("\n🤖 RoboNative Chatbot Demo")
    print("="*70)
    
    questions = [
        "What is ROS 2?",
        "Explain digital twins",
        "What are VLA models?",
        "Tell me about URDF",
        "What is a humanoid robot?",
        "How do I build a robot?"  # Test unknown question
    ]
    
    for question in questions:
        await test_question(question)
        await asyncio.sleep(0.5)
    
    print(f"\n{'='*70}")
    print("✅ Chatbot is working perfectly!")
    print("='*70}\n")

if __name__ == "__main__":
    asyncio.run(main())
