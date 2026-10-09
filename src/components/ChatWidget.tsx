import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  X,
  Send,
  Loader2,
  FileText,
  RotateCcw,
  Sparkles,
  Phone,
  Copy,
  Check,
  ShieldCheck,
  Briefcase,
  User,
  Award,
  GraduationCap,
} from "lucide-react";
import { getOfflineAnswer } from "../data/offlineAnswers";

type Role = "user" | "assistant";
interface ChatMessage {
  role: Role;
  content: string;
}

const QUICK_PROMPTS = [
  { label: "Who is Kamlesh Prasad?", icon: User },
  { label: "What is his current role & experience?", icon: Briefcase },
  { label: "Tell me about his Cyber Security leadership", icon: ShieldCheck },
  { label: "What is his contact number?", icon: Phone },
  { label: "What awards has he won?", icon: Award },
  { label: "What certifications does he hold?", icon: GraduationCap },
];

const MAX_LENGTH = 1000;

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      triggerRef.current?.focus({ preventScroll: true });
    }
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

  const copyMessage = async (content: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    } catch {
      // ignore
    }
  };

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
      {/* Floating Circular Trigger Button - AI */}
      <motion.button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={open ? "Close AI Chat" : "Open AI Assistant"}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-6 right-6 z-50 group flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2px] bg-gradient-to-tr from-zinc-700 via-white to-zinc-600 shadow-[0_12px_40px_-5px_rgba(0,0,0,0.85)] hover:shadow-[0_18px_50px_-5px_rgba(255,255,255,0.25)] transition-shadow">
          <div className="w-full h-full rounded-full bg-[#0E0E12] border border-zinc-800 flex flex-col items-center justify-center relative overflow-hidden group-hover:bg-[#14141A] transition-colors">
            {open ? (
              <X size={22} className="text-zinc-200 group-hover:text-white transition-colors" />
            ) : (
              <>
                {/* Active live indicator beacon */}
                <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>

                <Sparkles
                  size={16}
                  className="text-zinc-300 group-hover:text-amber-400 group-hover:rotate-12 transition-all mb-0.5"
                />
                <span className="font-display font-black text-xs sm:text-sm tracking-widest text-white leading-none">
                  AI
                </span>
              </>
            )}
          </div>
        </div>
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
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[440px] max-w-[440px] z-50 flex flex-col h-[600px] max-h-[82dvh] overflow-hidden rounded-2xl border border-zinc-800/90 bg-[#0C0C10]/95 backdrop-blur-2xl text-white shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85)]"
          >
            {/* Executive Header */}
            <div className="flex items-center justify-between border-b border-zinc-800/90 bg-[#121218]/90 px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-white shadow-inner">
                  <Bot size={18} />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#121218]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-sm font-black tracking-wider uppercase text-white">
                      Kamlesh AI
                    </h3>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                      Gemini 3.1
                    </span>
                  </div>
                  <p className="font-mono text-[11px] text-zinc-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Executive Profile Intelligence</span>
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
                  title="Clear conversation"
                  className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-md transition-colors"
                >
                  <RotateCcw size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  title="Close"
                  className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-md transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Conversation Stream */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto px-4 py-4 text-xs leading-relaxed"
              aria-live="polite"
            >
              {/* Empty State Welcome Card & Quick Chips */}
              {messages.length === 0 && (
                <div className="space-y-4 py-2">
                  <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 text-zinc-300">
                    <div className="flex items-center gap-2 text-white font-semibold text-xs mb-1.5">
                      <Sparkles size={14} className="text-zinc-300" />
                      <span>Hello! How can I assist you?</span>
                    </div>
                    <p className="text-zinc-400 text-[11px] leading-relaxed">
                      I am Kamlesh Prasad&apos;s AI assistant. Ask me questions about his executive background, cyber security leadership, or contact channels.
                    </p>
                  </div>

                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 mb-2 px-1">
                      Quick Questions:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {QUICK_PROMPTS.map((prompt) => {
                        const Icon = prompt.icon;
                        return (
                          <button
                            key={prompt.label}
                            type="button"
                            onClick={() => void send(prompt.label)}
                            className="flex items-center gap-2 p-2.5 rounded-lg border border-zinc-800/80 bg-zinc-900/60 hover:bg-zinc-800/80 hover:border-zinc-600 text-left text-zinc-300 hover:text-white transition-all group"
                          >
                            <Icon size={14} className="text-zinc-400 group-hover:text-white shrink-0" />
                            <span className="text-[11px] font-medium leading-tight line-clamp-2">
                              {prompt.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Message Bubbles */}
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[85%] whitespace-pre-wrap break-words bg-zinc-100 text-zinc-950 px-4 py-2.5 rounded-2xl rounded-tr-xs font-medium text-xs shadow-sm">
                      {m.content}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex items-start gap-2.5 group">
                    <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 shrink-0 mt-1">
                      <Bot size={13} />
                    </div>
                    <div className="relative max-w-[88%]">
                      <div className="whitespace-pre-wrap break-words border border-zinc-800/90 bg-zinc-900/80 text-zinc-200 px-4 py-3 rounded-2xl rounded-tl-xs shadow-sm leading-relaxed text-xs font-normal">
                        {m.content}
                      </div>
                      <button
                        type="button"
                        onClick={() => copyMessage(m.content, i)}
                        aria-label="Copy response"
                        title="Copy to clipboard"
                        className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-4 right-2 text-[10px] text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-800/90 px-1.5 py-0.5 rounded border border-zinc-700/60"
                      >
                        {copiedIdx === i ? (
                          <>
                            <Check size={10} className="text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={10} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ),
              )}

              {loading && (
                <div className="flex items-center gap-2.5 text-zinc-400 font-mono text-[11px]">
                  <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 shrink-0">
                    <Bot size={13} />
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/50">
                    <Loader2 className="animate-spin text-zinc-300" size={13} />
                    <span className="text-zinc-400 text-xs">Kamlesh AI is thinking...</span>
                  </div>
                </div>
              )}

              {error && (
                <p role="alert" className="text-rose-400 font-mono text-[11px] px-2">
                  {error}
                </p>
              )}
            </div>

            {/* Input Composer */}
            <div className="border-t border-zinc-800/90 bg-[#121218]/90 p-3 space-y-2">
              <div className="relative flex items-end gap-2 p-1.5 rounded-xl border border-zinc-800 bg-zinc-950/80 focus-within:border-zinc-500 transition-colors">
                <textarea
                  id="kamlesh-ai-input"
                  ref={inputRef}
                  rows={1}
                  value={input}
                  maxLength={MAX_LENGTH}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a question about Kamlesh Prasad..."
                  className="max-h-24 min-h-[36px] flex-1 resize-none border-0 bg-transparent px-2.5 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:ring-0 leading-normal"
                />
                <button
                  type="button"
                  onClick={() => void send(input)}
                  disabled={loading || !input.trim()}
                  aria-label="Send query"
                  className="inline-flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-lg bg-white text-zinc-950 hover:bg-zinc-200 disabled:opacity-40 disabled:hover:bg-white transition-all shadow-sm"
                >
                  {loading ? <Loader2 className="animate-spin" size={14} /> : <Send size={14} />}
                </button>
              </div>

              {/* Quick Actions Footer */}
              <div className="flex items-center justify-between px-1 text-[10px] font-mono text-zinc-400">
                <div className="flex items-center gap-3">
                  <a
                    href="/kamlesh-resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
                  >
                    <FileText size={11} />
                    <span>Resume</span>
                  </a>
                  <a
                    href="tel:+919004348595"
                    className="inline-flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
                  >
                    <Phone size={11} />
                    <span>+91 9004348595</span>
                  </a>
                </div>
                <span className="hidden sm:inline text-zinc-500">Press Enter ↵</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
