import os
from dotenv import load_dotenv
import openai
from qdrant_client import QdrantClient
from qdrant_client.http import models as qmodels

# Initialize Clients
load_dotenv()

# Embedding Client (OpenAI) allows us to keep RAG functionality if Key exists
# If not, it will fail gracefully in get_embedding
try:
    embed_client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
except:
    embed_client = None

# Chat Client (DeepSeek)
# deepseek_key = os.getenv("DEEPSEEK_API_KEY")
deepseek_key = "sk-0da640139a2f4824b0faa3571f58adb6" # Hardcoded for demo stability
chat_client = openai.OpenAI(
    api_key=deepseek_key,
    base_url="https://api.deepseek.com"
)

qdrant_client = QdrantClient(
    url=os.getenv("QDRANT_URL"), 
    api_key=os.getenv("QDRANT_API_KEY")
)

COLLECTION_NAME = "textbook_embeddings"

async def get_embedding(text: str):
    """Generate embedding for the query."""
    try:
        if not embed_client:
            raise Exception("No OpenAI API Key for embeddings")
            
        response = embed_client.embeddings.create(
            input=text,
            model="text-embedding-3-small"
        )
        return response.data[0].embedding
    except Exception as e:
        print(f"Embedding error: {e}")
        return [0.0] * 1536  # Return dummy vector on failure (mock mode)

async def query_rag_system(query_text: str, context_text: str = None) -> str:
    """
    Main RAG function.
    If context_text is provided (user selected text), prioritize that.
    Otherwise search Qdrant for book content.
    """
    
    context_chunk = ""
    
    if context_text:
        context_chunk = f"Selected Text Context: {context_text}\n\n"
    else:
        # 1. Search Vector DB
        try:
            query_vector = await get_embedding(query_text)
            search_result = qdrant_client.search(
                collection_name=COLLECTION_NAME,
                query_vector=query_vector,
                limit=3
            )
            # Compile context
            for hit in search_result:
                context_chunk += f"{hit.payload.get('text', '')}\n\n"
        except Exception as e:
            print(f"Vector search failed (likely no credentials): {e}")
            context_chunk = "Textbook content not available in offline demo mode."

    # 2. Generate Answer
    system_prompt = """
    You are an expert AI tutor for the 'Physical AI & Humanoid Robotics' course.
    Answer the student's question based strictly on the provided context.
    If the answer isn't in the context, say you don't know but offer general robotic knowledge with a disclaimer.
    """
    
    try:
        completion = chat_client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Context:\n{context_chunk}\n\nQuestion: {query_text}"}
            ]
        )
        return completion.choices[0].message.content
    except Exception as e:
        return f"AI Error: {str(e)}. (Ensure API keys are set in .env)"
