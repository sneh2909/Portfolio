import os
import time
from collections import defaultdict
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq

app = FastAPI(title="Sneh Shah — AMA Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://sneh2909.github.io",
        "http://localhost:3000",
        "http://localhost:3001",
    ],
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)

PORTFOLIO_CONTEXT = """
You are an AI assistant for Sneh Shah's portfolio website. Answer questions about Sneh accurately and concisely.
If asked something you don't know, say so honestly. Keep answers conversational (2-4 sentences).

=== ABOUT SNEH SHAH ===
Sneh Shah is a Machine Learning Engineer currently at NoBroker (Convozen.ai) in Bengaluru, India (Jul 2025–Present).
Email: snehshah2901@gmail.com | GitHub: github.com/sneh2909 | LinkedIn: linkedin.com/in/sneh-shah29/

=== CURRENT ROLE — NoBroker (Convozen.ai) ===
- Engineered and deployed end-to-end Chatbot and Email Co-Pilot harness for live multi-channel conversational AI
- Architected MSOCA (Multi-Session + Omni-Channel Architecture) with unified Agent-User-Context across Voice, Chat, WhatsApp
- Migrated session state from MongoDB to Redis (hot/cold pattern + write-behind flush), cutting per-turn I/O by 50–150ms
- Built a standalone Memory Management Service (FastAPI) with RAG retrieval, reducing effective prompt size by 30–40%
- Enabled multi-modal ingestion via Whisper STT and Vision LLMs for voice-note, image, and video turns
- Fine-tuned Whisper and multilingual Conformer ASR, deployed on NVIDIA Riva + Triton (sub-second multilingual transcription)
- Engineered "Piggyback" end-of-call extraction: post-call analysis JSON emitted in agent's final turn, eliminating separate LLM call

=== PREVIOUS ROLE — Salesken.ai (Apr 2024–Jun 2025) ===
ML Engineer 1:
- Reduced transcription costs by 20% by fine-tuning a Conformer ASR model to replace Deepgram
- Built LLM Agent system for personalized client emails
- Developed RAG-based Knowledge Extractor with web scraping, Azure, Kafka (+25% retrieval efficiency)
- Engineered Kafka Controller for idempotent message handling (–15% data duplication)
- Optimized Whisper-ASR on Triton Inference Server (–25% latency)

ML Intern (Jan 2024–Mar 2024):
- Increased ASR accuracy by 10% via speaker diarization and voice activity detection modules
- Deployed Emotion Detection models on Triton Inference Server

=== PROJECTS ===
1. House M.D. Clinical Reasoning RL Environment (Apr 2026) — FEATURED
   - POMDP emergency-department simulator with 15 conditions and 75 actions (25 interview, 15 exam, 35 lab/imaging)
   - Post-trained Gemma-3-4B-IT as sequential diagnostician via SFT (Unsloth + TRL) + custom GRPO loop
   - 5-rubric reward (accuracy, cost, anchoring, safety, format) with reward-hacking mitigation
   - Evaluated on 45-patient holdout vs random, greedy, base-model, Gemini Flash baselines
   - Live: https://huggingface.co/spaces/SnehShah/house-md-env | Code: github.com/sneh2909/Overfitters

2. Neural Collaborative Filtering (Oct–Dec 2023)
   - Recommendation system using NCF, +20% accuracy improvement
   - Gradio UI, novel scoring combining user preferences + IMDb rankings
   - Code: github.com/sneh2909/Neural-Collaborative-Filtering

3. Neural Style Transfer (Jul–Nov 2023)
   - VGG-19 with custom loss functions, ~30% processing time reduction via L-BFGS
   - Live: sneh2909.github.io/Neural-Style-Transfer/

=== RESEARCH ===
Published: "Comparative Performance Analysis of ML and DL Techniques in Pneumonia Detection: A Study"
- 14th ICCCNT Conference, IIT Delhi (Jan–May 2023)
- Evaluated 6 ML + 3 DL algorithms; CNN achieved 94.06% train / 89.74% test accuracy
- Link: https://ieeexplore.ieee.org/abstract/document/10306711

=== SKILLS ===
Languages: Python, R, Java, SQL, MATLAB
Libraries: PyTorch, TensorFlow, Transformers, TRL, Unsloth, Scikit-Learn, NumPy, Pandas, FastAPI
Tools: Azure, Docker, LangChain, HuggingFace, Weights & Biases, Redis, MongoDB, Triton, Riva, Kubernetes, Kafka
ML & DS: RL (GRPO, SFT, RLHF), LLM Post-training, RAG, Multi-Agent Systems, ASR/TTS, Computer Vision

=== EDUCATION ===
- MSc Data Science — Christ (Deemed to be University), Bengaluru | Aug 2022–Apr 2024 | GPA 3.63/4
- BSc Data Science — Gujarat University, Ahmedabad | Jun 2019–May 2022 | GPA 7.77/10

=== ACHIEVEMENTS ===
- Certificate of Recognition at NoBroker for exceptional dedication (Jan 2026)
- ML Specialization by Stanford / DeepLearning.AI (Coursera, Jun 2023)
- Deep Learning with PyTorch: GAN (Coursera, Mar 2024)
""".strip()

client = Groq(api_key=os.environ["GROQ_API_KEY"])

# Simple rate limiter: max 10 requests per IP per hour
_rate: dict[str, list[float]] = defaultdict(list)
RATE_LIMIT = 10
RATE_WINDOW = 3600


def check_rate(ip: str) -> bool:
    now = time.time()
    _rate[ip] = [t for t in _rate[ip] if now - t < RATE_WINDOW]
    if len(_rate[ip]) >= RATE_LIMIT:
        return False
    _rate[ip].append(now)
    return True


class ChatRequest(BaseModel):
    message: str
    history: list[dict] = []


@app.get("/")
def health():
    return {"status": "ok", "name": "Sneh Shah AMA Backend"}


@app.post("/chat")
async def chat(req: ChatRequest, request: Request):
    ip = request.headers.get("x-forwarded-for", request.client.host if request.client else "unknown")
    ip = ip.split(",")[0].strip()

    if not check_rate(ip):
        raise HTTPException(status_code=429, detail="Rate limit exceeded. Try again in an hour.")

    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Empty message")

    if len(req.message) > 500:
        raise HTTPException(status_code=400, detail="Message too long (max 500 chars)")

    messages = [{"role": "system", "content": f"You are an AI assistant for Sneh Shah's portfolio. Answer only based on the context below. Be concise (2-4 sentences). If unsure, say so.\n\n{PORTFOLIO_CONTEXT}"}]

    for h in req.history[-6:]:
        if h.get("role") in ("user", "assistant") and h.get("content"):
            messages.append({"role": h["role"], "content": str(h["content"])[:500]})

    messages.append({"role": "user", "content": req.message.strip()})

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=messages,
        max_tokens=300,
        temperature=0.7,
    )

    return {"response": completion.choices[0].message.content}
