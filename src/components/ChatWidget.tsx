import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Loader2, FileText, RotateCcw, Sparkles } from "lucide-react";
import { getOfflineAnswer } from "../data/offlineAnswers";

type Role = "user" | "assistant";
interface ChatMessage {
  role: Role;
  content: string;
}

const WELCOME =
  "Welcome. I am Kamlesh AI, executive profile assistant for Kamlesh Prasad. You may inquire about his 22+ years of technology leadership, CISO practice, enterprise infrastructure, certifications, and transformation milestones.";

const STARTER_TOPICS = [
  "Experience",
  "Cybersecurity",
  "Leadership",
  "Certifications",
  "Education",
];

const STARTER_QUESTIONS: Record<string, string> = {
  Experience: "What is Kamlesh's professional experience and leadership background?",
  Cybersecurity: "Tell me about Kamlesh's cybersecurity leadership and CISO practice.",
  Leadership: "What is Kamlesh's leadership style and CXO collaboration experience?",
  Certifications: "What certifications does Kamlesh hold?",
  Education: "What is Kamlesh's education and academic background?",
};

const FOLLOW_UPS = [
  "Tell me about his cloud & infrastructure scale",
  "What awards has Kamlesh received?",
  "How can I contact Kamlesh for an executive role?",
];

const MAX_LENGTH = 1000;

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
    else triggerRef.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = async (raw: string) => {
    const text = raw.trim();
    if (loading) return;
    if (!text) {
      setError("Please enter a question.");
      return;
    }

    setError(null);
    const history = messages;
    setMessages([...history, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });

      const data = (await res.json().catch(() => null)) as { reply?: string; error?: string } | null;

      if (!res.ok || !data?.reply) {
        const offlineReply = getOfflineAnswer(text);
        setMessages((prev) => [...prev, { role: "assistant", content: offlineReply }]);
        return;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply as string }]);
    } catch {
      const offlineReply = getOfflineAnswer(text);
      setMessages((prev) => [...prev, { role: "assistant", content: offlineReply }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send(input);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={open ? "Close Kamlesh AI" : "Open Kamlesh AI Assistant"}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2.5 rounded-sm border border-zinc-700 bg-[#0A0A0C] px-4 py-3 text-xs font-mono font-bold tracking-wider uppercase text-white shadow-2xl hover:border-white hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        {open ? (
          <X size={16} />
        ) : (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <Bot size={16} className="text-white" />
          </div>
        )}
        <span>{open ? "Close AI" : "Kamlesh AI"}</span>
      </motion.button>

      {/* Floating Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="false"
            aria-label="Kamlesh AI Assistant"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-20 right-4 left-4 sm:left-auto sm:right-6 sm:w-[420px] z-50 flex max-h-[80dvh] flex-col overflow-hidden border border-zinc-800 bg-[#111115] text-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 bg-[#0A0A0C] px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 border border-zinc-700 bg-zinc-900 flex items-center justify-center text-white">
                  <Bot size={17} />
                </div>
                <div>
                  <h3 className="font-display text-xs font-black tracking-wider uppercase text-white">
                    Kamlesh AI
                  </h3>
                  <p className="font-mono text-[10px] text-zinc-400">
                    Executive Profile Assistant
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setMessages([]);
                    setError(null);
                    setInput("");
                    inputRef.current?.focus();
                  }}
                  aria-label="Reset chat"
                  title="Reset chat"
                  className="p-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <RotateCcw size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="p-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Quick Ask Strip */}
            <div className="border-b border-slate-800/80 bg-slate-950/60 px-4 py-2">
              <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-1.5">
                Ask me about:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {STARTER_TOPICS.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => void send(STARTER_QUESTIONS[topic] || topic)}
                    className="px-2 py-0.5 border border-zinc-800 bg-zinc-900 font-mono text-[10px] text-zinc-300 hover:border-white hover:text-white transition-colors"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Conversation Log */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3.5 overflow-y-auto px-4 py-4 text-xs leading-relaxed max-h-[46dvh]"
              aria-live="polite"
            >
              {messages.length === 0 && (
                <div className="p-3 border border-zinc-800 bg-zinc-900/40 text-zinc-300 font-light">
                  {WELCOME}
                </div>
              )}

              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[85%] whitespace-pre-wrap break-words bg-white text-black px-3 py-2 font-medium">
                      {m.content}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex justify-start">
                    <div className="max-w-[95%] whitespace-pre-wrap break-words border border-zinc-800 bg-zinc-900/90 text-zinc-200 px-3 py-2 leading-relaxed font-light">
                      {m.content}
                    </div>
                  </div>
                ),
              )}

              {loading && (
                <div className="flex items-center gap-2 text-zinc-400 font-mono text-[11px]">
                  <Loader2 className="animate-spin text-white" size={13} />
                  <span>Retrieving executive data...</span>
                </div>
              )}

              {error && (
                <p role="alert" className="text-red-400 font-mono text-[11px]">
                  {error}
                </p>
              )}
            </div>

            {/* Input Composer */}
            <div className="border-t border-zinc-800 bg-[#0A0A0C] p-3">
              <div className="flex items-end gap-2">
                <textarea
                  id="kamlesh-ai-input"
                  ref={inputRef}
                  rows={1}
                  value={input}
                  maxLength={MAX_LENGTH}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Inquire about leadership, cybersecurity, infrastructure..."
                  className="max-h-24 min-h-[38px] flex-1 resize-none border border-zinc-700 bg-zinc-900/90 px-3 py-2 text-xs text-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:border-white"
                />
                <button
                  type="button"
                  onClick={() => void send(input)}
                  disabled={loading}
                  aria-label="Send query"
                  className="inline-flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center bg-white text-black hover:bg-zinc-200 disabled:opacity-50 transition-colors"
                >
                  {loading ? <Loader2 className="animate-spin" size={14} /> : <Send size={14} />}
                </button>
              </div>

              <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <a
                  href="/kamlesh-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <FileText size={11} />
                  <span>Download Resume (PDF)</span>
                </a>
                <span>Shift+Enter for newline</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
