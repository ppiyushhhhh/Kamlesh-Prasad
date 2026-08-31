import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Loader2, FileText, RotateCcw } from "lucide-react";
import { getOfflineAnswer } from "../data/offlineAnswers";

type Role = "user" | "assistant";
interface ChatMessage {
  role: Role;
  content: string;
}

const WELCOME =
  "Hi! I'm Kamlesh AI. I can answer questions about Kamlesh's experience, skills, certifications, leadership, projects, and career background.";

const STARTER_QUESTIONS = [
  "Who is Kamlesh Prasad?",
  "What is Kamlesh's professional experience?",
  "What are Kamlesh's key skills?",
  "Tell me about Kamlesh's cybersecurity experience.",
  "What certifications does Kamlesh have?",
  "Why should a company hire Kamlesh?",
];

const FOLLOW_UPS = [
  "Tell me more about his experience",
  "What cloud technologies does he use?",
  "What certifications does he have?",
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

  const suggestions = messages.length === 0 ? STARTER_QUESTIONS : FOLLOW_UPS;
  const showSuggestions = !loading && (messages.length === 0 || messages[messages.length - 1].role === "assistant");

  return (
    <>
      {/* Floating trigger */}
      <motion.button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={open ? "Close Kamlesh AI chat" : "Ask Kamlesh AI"}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full border border-border bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-colors duration-300 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 md:px-5"
      >
        {open ? <X size={18} /> : <Bot size={18} className="text-gold" />}
        <span className="hidden sm:inline">{open ? "Close" : "Ask Kamlesh AI"}</span>
        <span className="sr-only sm:hidden">{open ? "Close chat" : "Ask Kamlesh AI"}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            ref={panelRef}
            role="dialog"
            aria-modal="false"
            aria-label="Kamlesh AI chat"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-3 left-3 z-50 flex max-h-[75dvh] flex-col overflow-hidden rounded-lg border border-border bg-card shadow-xl sm:left-auto sm:right-5 sm:w-[400px] md:max-h-[70dvh]"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-border bg-card px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/15">
                  <Bot className="text-gold" size={18} />
                </div>
                <div>
                  <p className="font-display text-base font-bold leading-tight text-foreground">Kamlesh AI</p>
                  <p className="text-xs text-muted-foreground">Ask me about Kamlesh</p>
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
                  aria-label="Start a new chat"
                  title="New chat"
                  className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Conversation */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
              aria-live="polite"
              aria-atomic="false"
            >
              {messages.length === 0 && (
                <p className="text-sm leading-relaxed text-muted-foreground">{WELCOME}</p>
              )}

              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[85%] whitespace-pre-wrap break-words rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground">
                      {m.content}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="max-w-full whitespace-pre-wrap break-words text-sm leading-relaxed text-foreground">
                    {m.content}
                  </div>
                ),
              )}

              {loading && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="animate-spin" size={14} />
                  <span>Thinking...</span>
                </div>
              )}

              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}

              {showSuggestions && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {suggestions.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => void send(q)}
                      className="rounded-md border border-border bg-muted px-3 py-1.5 text-left text-xs font-medium text-foreground transition-colors duration-200 hover:border-accent/40 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Composer */}
            <div className="border-t border-border bg-card px-3 py-3">
              <div className="flex items-end gap-2">
                <label htmlFor="kamlesh-ai-input" className="sr-only">
                  Ask a question about Kamlesh
                </label>
                <textarea
                  id="kamlesh-ai-input"
                  ref={inputRef}
                  rows={1}
                  value={input}
                  maxLength={MAX_LENGTH}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about experience, skills, certifications..."
                  className="max-h-28 min-h-[40px] flex-1 resize-none rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                />
                <button
                  type="button"
                  onClick={() => void send(input)}
                  disabled={loading}
                  aria-label="Send message"
                  className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-gold text-primary transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <a
                  href="/kamlesh-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <FileText size={13} />
                  View Resume
                </a>
                <span className="text-[11px] text-muted-foreground">Press Enter to send</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
