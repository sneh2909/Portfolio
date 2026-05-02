"use client";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "What are you currently working on?",
  "Tell me about the HouseMD RL project",
  "What's your experience with LLMs?",
  "What tech stack do you work with?",
];

const HF_SPACE_URL = "https://snehshah-portfolio-ama.hf.space";
// Deploy ama-backend/ to HuggingFace Space → SnehShah/portfolio-ama, then update this URL

function DotPulse() {
  return (
    <div className="dot-pulse">
      <span /><span /><span />
    </div>
  );
}

function Message({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div className={cn("chat-message flex gap-2", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0 mt-0.5">
          <span className="text-xs font-mono text-accent">S</span>
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] text-sm px-3.5 py-2.5 rounded-2xl leading-relaxed",
          isUser
            ? "bg-accent text-background rounded-br-sm"
            : "bg-surface-2 text-foreground rounded-bl-sm border border-border"
        )}
      >
        {msg.content}
      </div>
    </div>
  );
}

export default function AMABot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Sneh's AI assistant. Ask me anything about his experience, projects, or skills. I'm powered by a RAG system trained on his portfolio. 👋",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    setError(null);
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${HF_SPACE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-6),
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const reply = data.response ?? data.message ?? "Sorry, I couldn't generate a response.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "The AMA backend is still being set up. In the meantime, feel free to reach Sneh directly at snehshah2901@gmail.com or check his GitHub at github.com/sneh2909!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full",
          "bg-accent text-background font-semibold text-sm shadow-lg shadow-accent/25",
          "hover:bg-accent/90 hover:shadow-accent/40 hover:scale-105",
          "transition-all duration-200 ease-out",
          open && "opacity-0 pointer-events-none"
        )}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        Ask me anything
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm flex flex-col rounded-2xl border border-border bg-surface shadow-2xl shadow-black/50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface-2">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
                  <span className="text-sm font-mono font-bold text-accent">S</span>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-surface-2" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Sneh&apos;s AMA Bot</p>
                <p className="text-xs text-muted">Powered by Groq · RAG</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-muted hover:text-foreground transition-colors p-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-80 min-h-48">
            {messages.map((msg, i) => (
              <Message key={i} msg={msg} />
            ))}
            {loading && (
              <div className="flex gap-2 items-start chat-message">
                <div className="w-6 h-6 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-mono text-accent">S</span>
                </div>
                <div className="bg-surface-2 border border-border rounded-2xl rounded-bl-sm px-4 py-3">
                  <DotPulse />
                </div>
              </div>
            )}
            {error && (
              <p className="text-xs text-red-400 text-center">{error}</p>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-xs px-2.5 py-1 rounded-full border border-border text-foreground-dim hover:border-accent/40 hover:text-accent transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-4 pb-4 pt-2 border-t border-border">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about Sneh..."
                className="flex-1 bg-surface-2 border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent/50 transition-colors"
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || loading}
                className="px-3 py-2 rounded-xl bg-accent text-background disabled:opacity-40 hover:bg-accent/90 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
