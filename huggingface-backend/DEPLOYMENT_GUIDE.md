# 🚀 Deployment Guide: Hugging Face Spaces

**Target Repo:** `asadkhan11/Book`
**Method:** Docker SDK

---

## 1. Recommendation

**✅ Use Browser Upload**
Since you only have **4 files** (`main.py`, `requirements.txt`, `Dockerfile`, `README.md`) and they are already verified, the Browser Upload method is:
- **Faster**: No need to install Git or configure SSH/Tokens locally.
- **Simpler**: Drag-and-drop to deploy.
- **Less Prone to Error**: Avoids common Git authentication issues.

*(Use Git Push only if you plan to make frequent code changes later.)*

---

## 2. Option A: Browser Upload (Recommended)

1. **Create the Space**:
   - Go to [Hugging Face New Space](https://huggingface.co/new-space).
   - **Owner**: `asadkhan11`
   - **Space Name**: `Book`
   - **License**: `MIT`
   - **Select SDK**: `Docker` (⚠️ CRITICAL)
   - **Hardware**: `CPU Basic` (Free)
   - **Visiblity**: Public (easier to test) or Private.
   - Click **Create Space**.

2. **Upload Files**:
   - Once the Space is created, click the **Files** tab (top navigation).
   - Click **Add file** -> **Upload files**.
   - Drag and drop your **4 verified files** (`main.py`, `requirements.txt`, `Dockerfile`, `README.md`) into the box.
   - **Commit message**: `Initial deployment`
   - Click **Commit changes to main**.

3. **Deploy**:
   - Hugging Face will automatically trigger the build.
   - Click the **App** tab to watch the build logs.
   - Wait for `Status: Running` (Green badge).

---

## 3. Option B: Git Push (Command Line)

If you prefer terminal, run these commands in your `huggingface-backend` folder.

**Prerequisites**:
- You need a **Hugging Face Access Token** with `write` permissions.
  - Go to [Settings > Tokens](https://huggingface.co/settings/tokens).
  - Create new token (Role: Write).

**Commands**:

```powershell
# 1. Initialize Git (if not already)
git init

# 2. Add Remote
git remote add origin https://huggingface.co/spaces/asadkhan11/Book

# 3. Pull existing config (README) if Space exists
git pull origin main --rebase

# 4. Add your files
git add main.py requirements.txt Dockerfile README.md

# 5. Commit
git commit -m "Deploy FastAPI Backend"

# 6. Push
git push origin main
```

**🔐 Authentication**:
- When asked for **Username**: `asadkhan11`
- When asked for **Password**: Paste your **Access Token** (starts with `hf_...`). **Do NOT use your actual password.**

---

## 4. Troubleshooting Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| **Connection Refused** | App is not listening on correct port. | Ensure `uvicorn ... --port 7860`. (Already Fixed) |
| **Permission Denied** | Docker trying to write as root. | Ensure `useradd -m -u 1000 user` in Dockerfile. (Already Fixed) |
| **Build Timeout** | Installing too many heavy ML libs. | We used `requirements.txt` with minimal deps. (Optimized) |
| **Health Check Fails** | `/` route returns 404 or error. | We verified `GET /` returns JSON locally. |

---

## 5. ✅ Final Checklist

1. **Badge Status**: Look for the **"Running"** badge at the top of the Space.
2. **Logs**: In the **App** tab, ensure you see:
   `INFO: Application startup complete.`
   `INFO: Uvicorn running on http://0.0.0.0:7860`
3. **Public URL Verification**:
   - Open `https://asadkhan11-book.hf.space/` -> Should see JSON `{"status": "online"...}`.
   - Open `https://asadkhan11-book.hf.space/docs` -> Should see Swagger UI.
4. **Chat API Test**:
   - Send a POST request to `https://asadkhan11-book.hf.space/api/chat` to confirm logic works.
