import { useState, useEffect } from "react";
import { Menu, X, FileText, Sun, Moon, ArrowUpRight } from "lucide-react";
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

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 dark:bg-[#0A0A0C]/90 backdrop-blur-md border-b border-border shadow-sm py-3.5"
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
            <span className={`text-xs font-bold tracking-wider uppercase leading-none transition-colors ${scrolled ? "text-foreground" : "text-white"}`}>
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
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setDark(!dark)}
            className={`p-2 rounded border border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${
              scrolled
                ? "text-zinc-600 dark:text-zinc-400 hover:text-foreground hover:border-border"
                : "text-zinc-300 hover:text-white hover:border-zinc-700"
            }`}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <button
            onClick={() => setResumeOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 border border-foreground bg-foreground text-background text-xs font-bold tracking-wider uppercase transition-all duration-200 hover:opacity-90 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm"
          >
            <FileText size={14} />
            <span>Resume</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setDark(!dark)}
            className={`p-2 transition-colors rounded ${scrolled ? "text-foreground" : "text-white"}`}
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`p-2 transition-colors rounded border border-border/40 ${scrolled ? "text-foreground bg-muted/50" : "text-white bg-zinc-800/80"}`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-background/98 dark:bg-[#0A0A0C]/98 backdrop-blur-xl border-b border-border shadow-2xl px-6 py-6 transition-all duration-300 animate-in slide-in-from-top-2">
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
                  className={`flex items-center justify-between py-3 px-3 text-sm font-semibold tracking-wide uppercase transition-colors rounded-sm ${
                    isActive
                      ? "text-foreground bg-muted border-l-2 border-foreground"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted/40"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted-foreground">{l.number}</span>
                    <span>{l.label}</span>
                  </span>
                  <ArrowUpRight size={14} className="opacity-40" />
                </a>
              );
            })}
          </div>

          <div className="pt-4 border-t border-border flex items-center justify-between">
            <button
              onClick={() => {
                setMobileOpen(false);
                setResumeOpen(true);
              }}
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-foreground text-background text-xs font-bold tracking-wider uppercase rounded-sm"
            >
              <FileText size={15} />
              <span>View Executive Resume</span>
            </button>
          </div>
        </div>
      )}

      <ResumeModal open={resumeOpen} onOpenChange={setResumeOpen} />
    </header>
  );
};

export default Navbar;
