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
  Mic,
  MicOff,
  ArrowUpRight,
  Zap,
  Trophy,
  Cpu,
  Mail,
  ArrowRight,
} from "lucide-react";
import { getOfflineAnswer } from "../data/offlineAnswers";
import ResumeModal from "@/components/ResumeModal";

type Role = "user" | "assistant";

interface ChatMessage {
  role: Role;
  content: string;
  userQuery?: string;
  isStreaming?: boolean;
}

interface DeepLink {
  label: string;
  target?: string;
  action?: "resume" | "scroll";
  icon: typeof Trophy;
}

interface SmartFollowUp {
  label: string;
  actionType: "query" | "resume" | "scroll";
  target?: string;
  icon: typeof Trophy;
}

const QUICK_PROMPTS = [
  { label: "Who is Kamlesh Prasad?", icon: User },
  { label: "What is his current role & experience?", icon: Briefcase },
  { label: "Tell me about his Cyber Security leadership", icon: ShieldCheck },
  { label: "What is his contact number?", icon: Phone },
  { label: "What awards has he won?", icon: Award },
  { label: "What certifications does he hold?", icon: GraduationCap },
];

const EXECUTIVE_PITCH_PROMPT = "Generate 60-Second Executive Pitch";

const MAX_LENGTH = 1000;

// Type declaration for SpeechRecognition
interface SpeechRecognitionResultItem {
  transcript: string;
}
interface SpeechRecognitionResultList {
  [index: number]: { [index: number]: SpeechRecognitionResultItem };
  length: number;
}
interface SpeechRecognitionEventLike {
  results: SpeechRecognitionResultList;
}
interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

function getSpeechRecognitionClass(): SpeechRecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  const win = window as unknown as {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  };
  return win.SpeechRecognition || win.webkitSpeechRecognition || null;
}

/** Determine high-impact interactive deep-links based on message content */
function getDeepLinks(content: string, userQuery?: string): DeepLink[] {
  const text = `${userQuery || ""} ${content}`.toLowerCase();
  const links: DeepLink[] = [];

  if (
    text.includes("award") ||
    text.includes("devops security expert") ||
    text.includes("recognition") ||
    text.includes("trophy") ||
    text.includes("krypton") ||
    text.includes("quantic") ||
    text.includes("cio conclave") ||
    text.includes("digital retail guardian")
  ) {
    links.push({
      label: "View Recognition & Awards",
      target: "#achievements",
      icon: Trophy,
    });
  }

  if (
    text.includes("experience") ||
    text.includes("career") ||
    text.includes("nexus malls") ||
    text.includes("runwal") ||
    text.includes("avenue") ||
    text.includes("accenture") ||
    text.includes("ibm") ||
    text.includes("sitel") ||
    text.includes("tenure") ||
    text.includes("journey")
  ) {
    links.push({
      label: "View Experience Timeline",
      target: "#experience",
      icon: Briefcase,
    });
  }

  if (
    text.includes("certification") ||
    text.includes("credential") ||
    text.includes("itil") ||
    text.includes("vmware") ||
    text.includes("mcitp") ||
    text.includes("upgrad")
  ) {
    links.push({
      label: "View Credentials",
      target: "#certifications",
      icon: ShieldCheck,
    });
  }

  if (
    text.includes("education") ||
    text.includes("degree") ||
    text.includes("mit xpro") ||
    text.includes("mba") ||
    text.includes("university") ||
    text.includes("academic")
  ) {
    links.push({
      label: "View Academic Background",
      target: "#education",
      icon: GraduationCap,
    });
  }

  if (
    text.includes("skill") ||
    text.includes("competenc") ||
    text.includes("zero trust") ||
    text.includes("ciso") ||
    text.includes("infrastructure") ||
    text.includes("governance") ||
    text.includes("sap") ||
    text.includes("salesforce") ||
    text.includes("dpdp")
  ) {
    links.push({
      label: "Explore Core Expertise",
      target: "#expertise",
      icon: Cpu,
    });
  }

  if (
    text.includes("contact") ||
    text.includes("phone") ||
    text.includes("email") ||
    text.includes("reach") ||
    text.includes("9004348595") ||
    text.includes("call") ||
    text.includes("hire")
  ) {
    links.push({
      label: "Open Contact Form",
      target: "#contact",
      icon: Mail,
    });
  }

  if (text.includes("resume") || text.includes("cv") || text.includes("download")) {
    links.push({
      label: "Open Executive Resume",
      action: "resume",
      icon: FileText,
    });
  }

  // Deduplicate by target/action and return maximum 2 chips
  const seen = new Set<string>();
  const uniqueLinks: DeepLink[] = [];
  for (const link of links) {
    const key = link.target || link.action || link.label;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueLinks.push(link);
    }
    if (uniqueLinks.length >= 2) break;
  }

  return uniqueLinks;
}

/** Determine contextual follow-up questions tailored to conversation context */
function getSmartFollowUps(userQuery: string, reply: string): SmartFollowUp[] {
  const text = `${userQuery} ${reply}`.toLowerCase();

  // Cybersecurity / CISO / Zero Trust
  if (
    text.includes("cyber") ||
    text.includes("security") ||
    text.includes("ciso") ||
    text.includes("zero trust") ||
    text.includes("threat") ||
    text.includes("soc") ||
    text.includes("dpdp")
  ) {
    return [
      { label: "View CISO Certifications", actionType: "scroll", target: "#certifications", icon: ShieldCheck },
      { label: "See Security Awards", actionType: "scroll", target: "#achievements", icon: Award },
      { label: "Download Resume", actionType: "resume", icon: FileText },
    ];
  }

  if (text.includes("pitch") || text.includes("board-ready") || text.includes("60 second") || text.includes("60-sec")) {
    return [
      { label: "What is his current role at Runwal Realty?", actionType: "query", icon: Briefcase },
      { label: "See Security Awards", actionType: "scroll", target: "#achievements", icon: Award },
      { label: "Download Resume", actionType: "resume", icon: FileText },
    ];
  }

  if (text.includes("who is") || text.includes("introduce") || text.includes("about kamlesh")) {
    return [
      { label: "⚡ Generate 60-Second Executive Pitch", actionType: "query", icon: Zap },
      { label: "Tell me about his Cyber Security leadership", actionType: "query", icon: ShieldCheck },
      { label: "Download Resume", actionType: "resume", icon: FileText },
    ];
  }

  if (
    text.includes("experience") ||
    text.includes("runwal") ||
    text.includes("nexus") ||
    text.includes("career") ||
    text.includes("cio") ||
    text.includes("cto")
  ) {
    return [
      { label: "View 22-Year Career Timeline", actionType: "scroll", target: "#experience", icon: Briefcase },
      { label: "Tell me about his Cyber Security leadership", actionType: "query", icon: ShieldCheck },
      { label: "Download Resume", actionType: "resume", icon: FileText },
    ];
  }

  if (text.includes("award") || text.includes("achievement") || text.includes("honor") || text.includes("trophy")) {
    return [
      { label: "Tell me about the DevOps Security Expert award", actionType: "query", icon: Trophy },
      { label: "View All Honors & Stage Photos", actionType: "scroll", target: "#achievements", icon: Award },
      { label: "Download Resume", actionType: "resume", icon: FileText },
    ];
  }

  if (
    text.includes("certification") ||
    text.includes("education") ||
    text.includes("degree") ||
    text.includes("mit") ||
    text.includes("smu")
  ) {
    return [
      { label: "View MIT & Academic Background", actionType: "scroll", target: "#education", icon: GraduationCap },
      { label: "View CISO Certifications", actionType: "scroll", target: "#certifications", icon: ShieldCheck },
      { label: "Download Resume", actionType: "resume", icon: FileText },
    ];
  }

  if (text.includes("contact") || text.includes("phone") || text.includes("email") || text.includes("hire") || text.includes("call")) {
    return [
      { label: "Open Contact Form", actionType: "scroll", target: "#contact", icon: Mail },
      { label: "⚡ Generate 60-Second Executive Pitch", actionType: "query", icon: Zap },
      { label: "Download Resume", actionType: "resume", icon: FileText },
    ];
  }

  return [
    { label: "⚡ Generate 60-Second Executive Pitch", actionType: "query", icon: Zap },
    { label: "Tell me about his Cyber Security leadership", actionType: "query", icon: ShieldCheck },
    { label: "Download Resume", actionType: "resume", icon: FileText },
  ];
}

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    setSpeechSupported(Boolean(getSpeechRecognitionClass()));
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      triggerRef.current?.focus({ preventScroll: true });
      if (listening && recognitionRef.current) {
        recognitionRef.current.stop();
        setListening(false);
      }
    }
  }, [open, listening]);

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

  // Clean up speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const toggleListening = () => {
    const SpeechClass = getSpeechRecognitionClass();
    if (!SpeechClass) {
      setError("Speech recognition is not supported in this browser. Please type your query.");
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    try {
      const recognition = new SpeechClass();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setListening(true);
        setError(null);
      };

      recognition.onresult = (event: SpeechRecognitionEventLike) => {
        const transcript = Array.from({ length: event.results.length })
          .map((_, i) => event.results[i]?.[0]?.transcript || "")
          .join("");
        if (transcript) {
          setInput(transcript);
        }
      };

      recognition.onerror = (event: { error: string }) => {
        if (event.error === "not-allowed") {
          setError("Microphone permission was denied. Please allow microphone access to speak.");
        } else if (event.error !== "no-speech") {
          setError("Voice input error. Please try again or type your question.");
        }
        setListening(false);
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch {
      setError("Unable to start microphone. Please type your question.");
      setListening(false);
    }
  };

  const copyMessage = async (content: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 2000);
    } catch {
      // ignore
    }
  };

  const handleDeepLinkClick = (link: DeepLink) => {
    if (link.action === "resume") {
      setResumeOpen(true);
      return;
    }

    if (link.target) {
      const id = link.target.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        // Pulse ring highlight on target element
        el.classList.add("ring-2", "ring-accent", "ring-offset-2", "transition-all");
        setTimeout(() => {
          el.classList.remove("ring-2", "ring-accent", "ring-offset-2");
        }, 2200);

        // On small mobile screens, minimize chat to reveal section
        if (window.innerWidth < 640) {
          setOpen(false);
        }
      }
    }
  };

  const handleFollowUpClick = (chip: SmartFollowUp) => {
    if (chip.actionType === "resume") {
      setResumeOpen(true);
      return;
    }
    if (chip.actionType === "scroll" && chip.target) {
      const id = chip.target.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        el.classList.add("ring-2", "ring-accent", "ring-offset-2", "transition-all");
        setTimeout(() => {
          el.classList.remove("ring-2", "ring-accent", "ring-offset-2");
        }, 2200);

        if (window.innerWidth < 640) {
          setOpen(false);
        }
      }
      return;
    }
    void send(chip.label.replace(/^⚡\s*/, ""));
  };

  const send = async (raw: string) => {
    const text = raw.trim();
    if (loading) return;
    if (!text) {
      setError("Please enter a question.");
      return;
    }

    if (listening && recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }

    setError(null);
    const history = messages;
    const newMessages: ChatMessage[] = [
      ...history,
      { role: "user", content: text },
      { role: "assistant", content: "", userQuery: text, isStreaming: true },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const assistantIndex = newMessages.length - 1;

    // Helper for typewriter simulation (offline / non-streaming fallback)
    const runTypewriter = async (fullReply: string) => {
      const step = Math.max(2, Math.floor(fullReply.length / 35));
      for (let i = 0; i <= fullReply.length; i += step) {
        const slice = fullReply.slice(0, i + step);
        setMessages((prev) => {
          const clone = [...prev];
          if (clone[assistantIndex]) {
            clone[assistantIndex] = {
              ...clone[assistantIndex],
              content: slice,
              isStreaming: true,
            };
          }
          return clone;
        });
        await new Promise((r) => setTimeout(r, 14));
      }
      setMessages((prev) => {
        const clone = [...prev];
        if (clone[assistantIndex]) {
          clone[assistantIndex] = {
            ...clone[assistantIndex],
            content: fullReply,
            isStreaming: false,
          };
        }
        return clone;
      });
    };

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream, application/json",
        },
        body: JSON.stringify({ message: text, history, stream: true }),
      });

      const contentType = res.headers.get("content-type") || "";

      if (res.ok && contentType.includes("text/event-stream") && res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const dataStr = trimmed.slice(5).trim();
            if (dataStr === "[DONE]") break;
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.error && !accumulated) {
                const offlineReply = getOfflineAnswer(text);
                await runTypewriter(offlineReply);
                return;
              }
              if (parsed.text) {
                accumulated += parsed.text;
                setMessages((prev) => {
                  const clone = [...prev];
                  if (clone[assistantIndex]) {
                    clone[assistantIndex] = {
                      ...clone[assistantIndex],
                      content: accumulated,
                      isStreaming: true,
                    };
                  }
                  return clone;
                });
              }
            } catch {
              // chunk split
            }
          }
        }

        setMessages((prev) => {
          const clone = [...prev];
          if (clone[assistantIndex]) {
            clone[assistantIndex] = {
              ...clone[assistantIndex],
              content: accumulated || getOfflineAnswer(text),
              isStreaming: false,
            };
          }
          return clone;
        });
      } else {
        const data = (await res.json().catch(() => null)) as { reply?: string; error?: string } | null;
        const finalReply = res.ok && data?.reply ? data.reply : getOfflineAnswer(text);
        await runTypewriter(finalReply);
      }
    } catch {
      const offlineReply = getOfflineAnswer(text);
      await runTypewriter(offlineReply);
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
      {/* Executive Resume Modal */}
      <ResumeModal open={resumeOpen} onOpenChange={setResumeOpen} />

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
            className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[450px] max-w-[450px] z-50 flex flex-col h-[630px] max-h-[84dvh] overflow-hidden rounded-2xl border border-zinc-800/90 bg-[#0C0C10]/95 backdrop-blur-2xl text-white shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85)]"
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
                {/* 60s Pitch Header Shortcut */}
                <button
                  type="button"
                  onClick={() => void send(EXECUTIVE_PITCH_PROMPT)}
                  title="Generate 60-Second Executive Pitch"
                  className="hidden xs:inline-flex items-center gap-1 px-2 py-1 text-[11px] font-mono font-medium rounded border border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 transition-colors"
                >
                  <Zap size={11} className="text-amber-400" />
                  <span>60s Pitch</span>
                </button>

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
                <div className="space-y-4 py-1">
                  <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 text-zinc-300">
                    <div className="flex items-center gap-2 text-white font-semibold text-xs mb-1.5">
                      <Sparkles size={14} className="text-zinc-300" />
                      <span>Hello! How can I assist you?</span>
                    </div>
                    <p className="text-zinc-400 text-[11px] leading-relaxed">
                      I am Kamlesh Prasad&apos;s AI executive assistant. Ask me questions about his leadership, cyber security governance, M&amp;A scale, or request his board pitch.
                    </p>
                  </div>

                  {/* FEATURE 3: Highlighted 60-Second Executive Pitch Card */}
                  <button
                    type="button"
                    onClick={() => void send(EXECUTIVE_PITCH_PROMPT)}
                    className="w-full text-left p-3.5 rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-zinc-900/60 to-zinc-900/40 hover:border-amber-400 hover:from-amber-500/20 transition-all group flex items-center justify-between gap-3 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
                        <Zap size={16} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display font-bold text-xs uppercase tracking-wider text-white">
                            60-Second Executive Pitch
                          </span>
                          <span className="text-[9px] font-mono uppercase bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-400/30 font-semibold">
                            Board Ready
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
                          Instant high-impact summary of Kamlesh&apos;s 22-year career for CXOs &amp; boards.
                        </p>
                      </div>
                    </div>
                    <ArrowRight size={14} className="text-amber-400 shrink-0 group-hover:translate-x-1 transition-transform" />
                  </button>

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
              {messages.map((m, i) => {
                const isAssistant = m.role === "assistant";
                const isLatestAssistant =
                  isAssistant &&
                  i === messages.map((msg, idx) => (msg.role === "assistant" ? idx : -1)).filter((x) => x !== -1).pop();
                const deepLinks = isAssistant ? getDeepLinks(m.content, m.userQuery) : [];
                const followUps = isLatestAssistant ? getSmartFollowUps(m.userQuery || "", m.content) : [];

                return m.role === "user" ? (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[85%] whitespace-pre-wrap break-words bg-zinc-100 text-zinc-950 px-4 py-2.5 rounded-2xl rounded-tr-xs font-medium text-xs shadow-sm">
                      {m.content}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex flex-col gap-2 group">
                    <div className="flex items-start gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 shrink-0 mt-1">
                        <Bot size={13} />
                      </div>
                      <div className="relative max-w-[88%] w-full">
                        <div className="whitespace-pre-wrap break-words border border-zinc-800/90 bg-zinc-900/80 text-zinc-200 px-4 py-3 rounded-2xl rounded-tl-xs shadow-sm leading-relaxed text-xs font-normal">
                          {m.content}
                          {m.isStreaming && (
                            <span className="inline-block w-1.5 h-3.5 bg-amber-400 ml-1 translate-y-0.5 animate-pulse rounded-xs" />
                          )}

                          {/* FEATURE 1: Interactive Section Deep-Links */}
                          {!m.isStreaming && deepLinks.length > 0 && (
                            <div className="mt-3 pt-2.5 border-t border-zinc-800/80 flex flex-wrap gap-2">
                              {deepLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                  <button
                                    key={link.label}
                                    type="button"
                                    onClick={() => handleDeepLinkClick(link)}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium border border-zinc-700 bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 hover:text-white transition-colors cursor-pointer group/link shadow-xs"
                                  >
                                    <Icon size={12} className="text-amber-400 shrink-0" />
                                    <span>{link.label}</span>
                                    <ArrowUpRight
                                      size={11}
                                      className="text-zinc-400 group-hover/link:text-white group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                                    />
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        {/* Copy button */}
                        {!m.isStreaming && m.content && (
                          <button
                            type="button"
                            onClick={() => copyMessage(m.content, i)}
                            aria-label="Copy response"
                            title="Copy to clipboard"
                            className="opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-4 right-2 text-[10px] text-zinc-400 hover:text-white flex items-center gap-1 bg-zinc-800/90 px-1.5 py-0.5 rounded border border-zinc-700/60 cursor-pointer"
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
                        )}
                      </div>
                    </div>

                    {/* FEATURE 2: Smart Contextual Follow-Up Suggestions */}
                    {!m.isStreaming && followUps.length > 0 && (
                      <div className="ml-8 mt-1 space-y-1.5">
                        <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 px-1 flex items-center gap-1.5">
                          <Sparkles size={11} className="text-amber-400" />
                          <span>Suggested next steps:</span>
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {followUps.map((chip) => {
                            const ChipIcon = chip.icon;
                            return (
                              <button
                                key={chip.label}
                                type="button"
                                onClick={() => handleFollowUpClick(chip)}
                                className="group/chip text-left text-[11px] font-medium px-2.5 py-1 rounded-full border border-zinc-800 bg-zinc-900/70 hover:bg-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white transition-all shadow-xs flex items-center gap-1.5 cursor-pointer hover:shadow-sm"
                              >
                                <ChipIcon size={12} className="text-amber-400 shrink-0 group-hover/chip:scale-110 transition-transform" />
                                <span>{chip.label}</span>
                                <ArrowRight size={10} className="text-zinc-500 group-hover/chip:text-white group-hover/chip:translate-x-0.5 transition-transform shrink-0" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {loading && (!messages.length || !messages[messages.length - 1]?.content) && (
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
              {/* Voice Listening Active Banner */}
              {listening && (
                <div className="flex items-center justify-between px-3 py-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-[11px] font-mono animate-pulse">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Listening... Speak your question now</span>
                  </div>
                  <button
                    type="button"
                    onClick={toggleListening}
                    className="text-xs font-semibold text-emerald-200 hover:underline"
                  >
                    Done
                  </button>
                </div>
              )}

              <div className="relative flex items-end gap-1.5 p-1.5 rounded-xl border border-zinc-800 bg-zinc-950/80 focus-within:border-zinc-500 transition-colors">
                <textarea
                  id="kamlesh-ai-input"
                  ref={inputRef}
                  rows={1}
                  value={input}
                  maxLength={MAX_LENGTH}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    listening
                      ? "Listening to voice input..."
                      : "Ask about Kamlesh Prasad's career, CISO leadership..."
                  }
                  className="max-h-24 min-h-[36px] flex-1 resize-none border-0 bg-transparent px-2.5 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:ring-0 leading-normal"
                />

                {/* FEATURE 4: Voice-to-Text Microphone Toggle */}
                {speechSupported && (
                  <button
                    type="button"
                    onClick={toggleListening}
                    disabled={loading}
                    aria-label={listening ? "Stop voice listening" : "Start voice search"}
                    title={listening ? "Click to stop listening" : "Speak your question (Voice Input)"}
                    className={`inline-flex h-[34px] w-[34px] flex-shrink-0 items-center justify-center rounded-lg transition-all ${
                      listening
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/50 animate-pulse"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                    }`}
                  >
                    {listening ? <MicOff size={15} /> : <Mic size={15} />}
                  </button>
                )}

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
                  <button
                    type="button"
                    onClick={() => setResumeOpen(true)}
                    className="inline-flex items-center gap-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <FileText size={11} />
                    <span>View Resume</span>
                  </button>
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
