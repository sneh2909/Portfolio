---
title: Sneh Shah Portfolio AMA
emoji: 🤖
colorFrom: cyan
colorTo: indigo
sdk: docker
pinned: false
---

# Sneh Shah — AMA Backend

FastAPI backend for the portfolio AMA chatbot. Deployed as a HuggingFace Space Docker app.

## Setup

1. Create a new HuggingFace Space: `snehshah/portfolio-ama` (Docker SDK)
2. Add `GROQ_API_KEY` as a Space secret (Settings → Variables and secrets)
3. Push this directory:

```bash
cd ama-backend/
huggingface-cli login
git init
git remote add space https://huggingface.co/spaces/SnehShah/portfolio-ama
git add .
git commit -m "Initial deploy"
git push space main
```

## API

- `GET /` — health check
- `POST /chat` — chat endpoint

```json
{
  "message": "What are you working on?",
  "history": []
}
```

Response: `{ "response": "..." }`
