import { useState, useEffect } from "react";
import { Menu, X, FileText, Sun, Moon, ArrowUpRight, Share2 } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { toast } from "sonner";
import ResumeModal from "@/components/ResumeModal";
import kpLogo from "@/assets/kamlesh-prasad-logo.png";

const navLinks = [
  { label: "Profile", href: "#profile", number: "01" },
  { label: "Experience", href: "#experience", number: "02" },
  { label: "Expertise", href: "#expertise", number: "03" },
  { label: "Recognition", href: "#achievements", number: "04" },
  { label: "Credentials", href: "#certifications", number: "05" },
  { label: "Education", href: "#education", number: "06" },
  { label: "Contact", href: "#contact", number: "07" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  // Scroll reading progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-80px 0px -50% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });

    const prevTabIndex = el.getAttribute("tabindex");
    if (prevTabIndex === null) el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });

    if (history.replaceState) {
      history.replaceState(null, "", `#${id}`);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: "Kamlesh Prasad | Technology Executive • CIO • CISO",
      text: "Executive portfolio of Kamlesh Prasad — Chief Technology Officer with 22+ years in IT Infrastructure, Cyber Security, and Digital Transformation.",
      url: window.location.origin || window.location.href,
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err: unknown) {
        if ((err as Error)?.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(shareData.url);
      toast.success("Profile URL copied to clipboard!");
    } catch {
      toast("Profile URL: " + shareData.url);
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Scroll Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-accent via-white to-accent origin-left z-[100] pointer-events-none shadow-[0_0_8px_rgba(255,255,255,0.4)]"
        style={{ scaleX }}
        aria-hidden="true"
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen
            ? "bg-white dark:bg-[#0A0A0C] border-b border-border shadow-sm py-3.5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Monogram Brand */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group flex items-center gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm"
            aria-label="Kamlesh Prasad Home"
          >
            <div className="w-10 h-10 border border-slate-300 dark:border-zinc-700 bg-white flex items-center justify-center overflow-hidden rounded-sm transition-all duration-200 group-hover:border-foreground shadow-xs p-0.5">
              <img
                src={kpLogo}
                alt="Kamlesh Prasad"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className={`text-xs font-bold tracking-wider uppercase leading-none transition-colors ${scrolled || mobileOpen ? "text-foreground" : "text-white"}`}>
                Kamlesh Prasad
              </span>
              <span className="text-[10px] tracking-widest uppercase text-zinc-400 font-mono mt-1">
                Technology Executive
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
            {navLinks.map((l) => {
              const isActive = activeSection === l.href.replace("#", "");
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleClick(e, l.href)}
                  className={`text-xs font-semibold tracking-wider uppercase transition-colors relative py-1 hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground ${
                    isActive
                      ? "text-foreground font-bold"
                      : scrolled
                      ? "text-zinc-600 dark:text-zinc-400"
                      : "text-zinc-300"
                  }`}
                >
                  {l.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action Controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Share Profile Button */}
            <button
              type="button"
              onClick={handleShare}
              className={`p-2 rounded border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${
                scrolled
                  ? "text-zinc-600 dark:text-zinc-400 hover:text-foreground hover:border-border"
                  : "text-zinc-300 hover:text-white hover:border-zinc-700"
              }`}
              title="Share Executive Profile"
              aria-label="Share Executive Profile"
            >
              <Share2 size={16} />
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={() => setDark(!dark)}
              className={`p-2 rounded border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${
                scrolled
                  ? "text-zinc-600 dark:text-zinc-400 hover:text-foreground hover:border-border"
                  : "text-zinc-300 hover:text-white hover:border-zinc-700"
              }`}
              aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
              title={dark ? "Light mode" : "Dark mode"}
            >
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* Resume Button */}
            <button
              type="button"
              onClick={() => setResumeOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 border border-foreground bg-foreground text-background text-xs font-bold tracking-wider uppercase transition-all duration-200 hover:opacity-90 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm cursor-pointer"
            >
              <FileText size={14} />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              type="button"
              onClick={handleShare}
              className={`p-2 transition-colors rounded ${scrolled || mobileOpen ? "text-foreground" : "text-white"}`}
              aria-label="Share profile"
              title="Share profile"
            >
              <Share2 size={17} />
            </button>

            <button
              type="button"
              onClick={() => setDark(!dark)}
              className={`p-2 transition-colors rounded ${scrolled || mobileOpen ? "text-foreground" : "text-white"}`}
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2 transition-colors rounded border ${
                scrolled || mobileOpen
                  ? "text-foreground bg-muted border-border"
                  : "text-white bg-zinc-800/80 border-border/40"
              }`}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <>
            {/* Backdrop Dimmer to obscure underlying page content */}
            <div
              className="lg:hidden fixed inset-0 bg-black/60 -z-10 transition-opacity"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* 100% Solid Opaque Drawer */}
            <div className="lg:hidden absolute top-full inset-x-0 bg-white dark:bg-[#0A0A0C] border-b border-zinc-200 dark:border-zinc-800 shadow-2xl px-6 py-6 z-50 overflow-y-auto max-h-[calc(100dvh-70px)] animate-in slide-in-from-top-2 duration-200">
              <div className="space-y-1 pb-4">
                {navLinks.map((l) => {
                  const isActive = activeSection === l.href.replace("#", "");
                  return (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={(e) => {
                        handleClick(e, l.href);
                        setMobileOpen(false);
                      }}
                      className={`flex items-center justify-between py-3.5 px-3 text-sm font-semibold tracking-wide uppercase transition-colors rounded-sm ${
                        isActive
                          ? "text-black dark:text-white bg-zinc-100 dark:bg-zinc-900 border-l-2 border-black dark:border-white font-bold"
                          : "text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900/60"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">{l.number}</span>
                        <span>{l.label}</span>
                      </span>
                      <ArrowUpRight size={14} className="opacity-40" />
                    </a>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setResumeOpen(true);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-black dark:bg-white text-white dark:text-black text-xs font-bold tracking-wider uppercase rounded-sm hover:opacity-90 transition-opacity shadow-sm"
                >
                  <FileText size={15} />
                  <span>View Executive Resume</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    void handleShare();
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 border border-zinc-300 dark:border-zinc-700 bg-transparent text-foreground text-xs font-mono font-medium tracking-wider uppercase rounded-sm hover:bg-muted transition-colors"
                >
                  <Share2 size={14} />
                  <span>Share Profile</span>
                </button>
              </div>
            </div>
          </>
        )}

        <ResumeModal open={resumeOpen} onOpenChange={setResumeOpen} />
      </header>
    </>
  );
};

export default Navbar;
