---
title: Production FastAPI Backend
emoji: 🚀
colorFrom: indigo
colorTo: blue
sdk: docker
app_port: 7860
---

# 🚀 Production FastAPI Backend

This is a complete, production-ready backend designed for Hugging Face Spaces.

## 📂 Deployment Instructions

1. **Create Space**:
   - Go to [Hugging Face Spaces](https://huggingface.co/new-space)
   - **Space Name**: `my-backend-api` (or your choice)
   - **License**: MIT
   - **Select SDK**: `Docker` (Crucial step)
   - **Hardware**: CPU Basic (Free) is sufficient

2. **Upload Files**:
   - Upload the following 4 files directly to the root of your Space:
     - `main.py`
     - `requirements.txt`
     - `Dockerfile`
     - `README.md` (metadata at the top is required)

3. **Wait for Build**:
   - The Space will automatically build the container.
   - Watch the "Logs" tab for `Application startup complete`.

## 🧪 How to Test

Once the Space logs show "Running", your API is live.

### 1. Root Endpoint (Health Check)
Open your browser to the Space URL (e.g., `https://username-space-name.hf.space/`).
You should see a JSON response:
```json
{
  "status": "online",
  "service": "Hugging Face Backend API",
  ...
}
```

### 2. Chat API (via Curl)
Test the POST route using curl or Postman:

```bash
curl -X POST https://YOUR_SPACE_URL.hf.space/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello Backend!"}'
```

**Expected Response:**
```json
{
  "response": "Backend received: Hello Backend!",
  "timestamp": "2025-12-25T...",
  "status": "success"
}
```

## 🔌 API Documentation
Interactive docs are available at `/docs` (e.g., `https://YOUR_SPACE_URL.hf.space/docs`).
