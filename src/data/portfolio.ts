export const personal = {
  name: "Sneh Shah",
  role: "Machine Learning Engineer",
  location: "Bengaluru, India",
  tagline: "Building conversational AI at scale · RL post-training enthusiast",
  email: "snehshah2901@gmail.com",
  phone: "+91 9428911398",
  github: "https://github.com/sneh2909",
  linkedin: "https://www.linkedin.com/in/sneh-shah29/",
  huggingface: "https://huggingface.co/SnehShah",
  resume:
    "https://drive.google.com/file/d/18uDNAE2ElyrohW2zVu7tkJNNhpmKTH-K/view?usp=sharing",
};

export const experience = [
  {
    company: "NoBroker (Convozen.ai)",
    url: "https://convozen.ai/",
    location: "Bengaluru, Karnataka",
    role: "Machine Learning Engineer",
    period: "Jul 2025 – Present",
    bullets: [
      "Engineered and deployed end-to-end Chatbot and Email Co-Pilot harness powering live multi-channel conversational AI in production.",
      "Architected MSOCA (Multi-Session + Omni-Channel Architecture) with a unified Agent-User-Context, sharing state across Voice, Chat, and WhatsApp via single-active-focus arbitration.",
      "Migrated session state from MongoDB to Redis under a hot/cold pattern with write-behind flush, cutting per-turn I/O by 50–150 ms to meet voice TTFB budgets.",
      "Built a standalone Memory Management Service (FastAPI) with pluggable Redis, Mongo, and Vector backends implementing rolling-window summarization and RAG retrieval, reducing effective prompt size by 30–40%.",
      "Enabled multi-modal ingestion via Whisper STT and Vision LLMs, letting agents reason natively over voice-note, image, and video turns.",
      "Fine-tuned Whisper and multilingual Conformer ASR and deployed on NVIDIA Riva and Triton, delivering sub-second multilingual transcription at production scale.",
      'Engineered a "Piggyback" end-of-call extraction emitting post-call analysis JSON in the agent\'s final turn, eliminating a separate analysis LLM call and cutting analytics cost to output tokens only.',
    ],
    tags: ["LLM", "RAG", "Redis", "FastAPI", "Riva", "Triton", "Kafka", "ASR"],
  },
  {
    company: "Salesken.ai",
    url: "https://www.salesken.ai/",
    location: "Bengaluru, Karnataka",
    role: "ML Engineer 1",
    period: "Apr 2024 – Jun 2025",
    bullets: [
      "Reduced monthly transcription costs by 20% by fine-tuning a Conformer ASR model to replace a third-party service.",
      "Built an LLM Agent system to generate personalized client emails, improving creation accuracy.",
      "Developed a RAG-based Knowledge Extractor with web scraping, Azure, and Kafka, boosting data retrieval efficiency by 25%.",
      "Engineered a Kafka Controller for idempotent message handling, cutting data duplication by 15%.",
      "Optimized and deployed a Whisper-ASR system on Triton Inference Server, reducing latency by 25%.",
    ],
    tags: ["ASR", "LLM", "RAG", "Kafka", "Triton", "Azure"],
  },
  {
    company: "Salesken.ai",
    url: "https://www.salesken.ai/",
    location: "Bengaluru, Karnataka",
    role: "ML Intern",
    period: "Jan 2024 – Mar 2024",
    bullets: [
      "Increased ASR transcription accuracy by 10% by adding speaker diarization and voice activity detection modules.",
      "Deployed Emotion Detection models on Triton Inference Server to enhance conversational AI capabilities.",
    ],
    tags: ["ASR", "Triton", "PyTorch", "Docker"],
  },
];

export const projects = [
  {
    title: "House M.D. Clinical Reasoning RL Environment",
    period: "Apr 2026",
    url: "https://huggingface.co/spaces/SnehShah/house-md-env",
    github: "https://github.com/sneh2909/Overfitters",
    description:
      "POMDP emergency-department simulator for training diagnostic AI agents. Post-trained Gemma-3-4B-IT via SFT + custom GRPO loop with a 5-rubric reward function.",
    bullets: [
      "Built a POMDP emergency-department simulator with 15 conditions and 75 actions, deployed as a Hugging Face Space.",
      "Post-trained Gemma-3-4B-IT to act as a sequential diagnostician via SFT (Unsloth + TRL) followed by a custom GRPO loop.",
      "Designed a 5-rubric reward (accuracy, cost, anchoring, safety, format) with shaping that mitigates reward-hacking failure modes.",
      "Evaluated on a 45-patient holdout against random, greedy, base-model, and Gemini Flash baselines with full per-rubric breakdowns.",
    ],
    tags: ["Reinforcement Learning", "GRPO", "SFT", "Gemma-3", "Unsloth", "POMDP", "HuggingFace"],
    highlight: true,
  },
  {
    title: "Neural Collaborative Filtering",
    period: "Oct – Dec 2023",
    url: "https://github.com/sneh2909/Neural-Collaborative-Filtering",
    github: "https://github.com/sneh2909/Neural-Collaborative-Filtering",
    description:
      "High-impact movie recommendation system using Neural Collaborative Filtering with +20% accuracy improvement and a Gradio interactive demo.",
    bullets: [
      "Developed a recommendation system using Neural Collaborative Filtering with advanced algorithms.",
      "Achieved 20% improvement in recommendation accuracy over collaborative baselines.",
      "Integrated Gradio for an interactive UI; produced a novel scoring equation combining user preferences and IMDb rankings.",
    ],
    tags: ["PyTorch", "Recommendation Systems", "Gradio", "NCF"],
    highlight: false,
  },
  {
    title: "Neural Style Transfer",
    period: "Jul – Nov 2023",
    url: "https://sneh2909.github.io/Neural-Style-Transfer/",
    github: "https://github.com/sneh2909/Neural-Style-Transfer",
    description:
      "Neural Style Transfer using VGG-19 with custom loss functions. ~30% reduction in processing time via L-BFGS optimization; showcased on an interactive website.",
    bullets: [
      "Orchestrated development analyzing 2 main NST techniques using PyTorch and VGG-19.",
      "Enhanced VGG-19 with custom loss functions for precise style transfer.",
      "Achieved ~30% reduction in processing time using L-BFGS optimization.",
      "Showcased project on an interactive website.",
    ],
    tags: ["PyTorch", "Computer Vision", "VGG-19", "Optimization"],
    highlight: false,
  },
];

export const publication = {
  title:
    "Comparative Performance Analysis of Machine Learning and Deep Learning Techniques in Pneumonia Detection: A Study",
  venue: "14th ICCCNT Conference, IIT Delhi",
  period: "Jan – May 2023",
  url: "https://ieeexplore.ieee.org/abstract/document/10306711",
  summary:
    "Evaluated 6 ML and 3 DL algorithms for pneumonia detection. Designed a CNN achieving 94.06% training accuracy and 89.74% testing accuracy.",
};

export const skills = {
  Languages: ["Python", "R", "Java", "SQL", "MATLAB"],
  Libraries: [
    "PyTorch", "TensorFlow", "Transformers", "TRL", "Unsloth",
    "Scikit-Learn", "NumPy", "Pandas", "OpenCV", "FastAPI", "Pydantic",
  ],
  "Tools & Infra": [
    "Azure", "Docker", "LangChain", "Hugging Face", "Weights & Biases",
    "MongoDB", "Redis", "Postgres", "Triton", "Riva", "Kubernetes",
    "Kafka", "Jenkins", "CI/CD", "Prometheus", "Git",
  ],
  "ML & DS": [
    "Reinforcement Learning (GRPO, SFT, RLHF)",
    "LLM Post-training",
    "RAG",
    "Multi-Agent Systems",
    "ASR / TTS",
    "Recommender Systems",
    "Computer Vision",
    "A/B Testing",
  ],
};

export const education = [
  {
    institution: "Christ (Deemed to be University)",
    location: "Bengaluru, Karnataka",
    degree: "Masters of Science — Data Science",
    period: "Aug 2022 – Apr 2024",
    gpa: "3.63 / 4.0",
  },
  {
    institution: "Gujarat University",
    location: "Ahmedabad, Gujarat",
    degree: "Bachelors of Science — Data Science",
    period: "Jun 2019 – May 2022",
    gpa: "7.77 / 10",
  },
];

export const achievements = [
  {
    title: "Certificate of Recognition — NoBroker",
    description: "For exceptional dedication and outstanding contributions.",
    period: "Jan 2026",
    url: "https://drive.google.com/file/d/1xUls_00MpjDU6j2PbVNfKPHKCSXP-4Sn/view?usp=sharing",
  },
];

export const certifications = [
  {
    title: "Deep Learning with PyTorch: Generative Adversarial Network",
    issuer: "Coursera",
    period: "Mar 2024",
    url: "https://coursera.org/share/1319ce709c452bf989c387fa29a1cc89",
  },
  {
    title: "Machine Learning Specialization — Stanford University & DeepLearning.AI",
    issuer: "Coursera",
    period: "Jun 2023",
    url: "https://www.coursera.org/account/accomplishments/specialization/certificate/KHGLRMMQE8E8",
  },
];
