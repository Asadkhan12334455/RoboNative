<<<<<<< HEAD
# Physical AI & Humanoid Robotics Textbook Platform

A next-generation educational platform built with **Antigravity AI**.
Features a Docusaurus-based interactive textbook, integrated RAG Chatbot (FastAPI + Qdrant), and simulated personalization.

## Project Structure
- `frontend/`: Docusaurus v3 application + React Components.
- `backend/`: FastAPI application + RAG Logic + Auth Stubs.
- `docs/`: Course Modules (Markdown).

## Setup Instructions

### Prerequisites
- Node.js 18+
- Python 3.10+
- Qdrant (Cloud or Docker)
- OpenAI API Key

### Backend Setup
1. Navigate to `backend`:
   ```bash
   cd backend
   ```
2. Create virtual env & install dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   pip install -r requirements.txt
   ```
3. Configure `.env`:
   ```bash
   cp .env.example .env
   # Edit .env with your API Keys
   ```
4. Run Server:
   ```bash
   uvicorn main:app --reload
   ```
   *API will run at http://localhost:8000*

### Frontend Setup
1. Navigate to `frontend`:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run Development Server:
   ```bash
   npm start
   ```
   *Book will open at http://localhost:3000*

## Deployment

### GitHub Pages (Frontend)
1. Edit `docusaurus.config.ts` to set `url` and `baseUrl`.
2. Run deployment command:
   ```bash
   GIT_USER=<YourGitHubUsername> npm run deploy
   ```

### Render/Vercel (Backend)
- Connect repository to Vercel/Render.
- Set Root Directory to `backend`.
- Set Build Command: `pip install -r requirements.txt`.
- Set Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`.

## Features
- **Integrated RAG**: Ask questions about the book content via the floating chat widget.
- **Personalization**: Toggle between "Software" and "Hardware" perspectives.
- **Urdu Translation**: (Demo) Switch language context to see localized content.
=======
# RoboNatice
>>>>>>> 99f4c1af3d28ff1f715d6c76174e309288f53c88
