import { useState, useEffect } from "react";
import { Menu, X, FileText, Sun, Moon } from "lucide-react";
import ResumeModal from "@/components/ResumeModal";

const links = [
  { label: "Profile", href: "#profile" },
  { label: "Experience", href: "#experience" },
  { label: "Expertise", href: "#expertise" },
  { label: "Recognition", href: "#achievements" },
  { label: "Certifications", href: "#certifications" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
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
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = links.map((l) => l.href.replace("#", ""));
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

    // Move focus to the section for keyboard/tab users without re-scrolling
    const prevTabIndex = el.getAttribute("tabindex");
    if (prevTabIndex === null) el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });

    // Update the URL hash without jumping
    if (history.replaceState) {
      history.replaceState(null, "", `#${id}`);
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className={`text-lg font-bold tracking-tight transition-colors ${
            scrolled ? "text-foreground" : "text-hero-foreground"
          }`}
        >
          KP
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const isActive = activeSection === l.href.replace("#", "");
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleClick(e, l.href)}
                className={`text-sm font-medium transition-all duration-200 relative pb-1 hover:text-accent ${
                  isActive
                    ? "text-accent"
                    : scrolled
                    ? "text-muted-foreground"
                    : "text-hero-muted"
                }`}
              >
                {l.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full" />
                )}
              </a>
            );
          })}
          <button
            onClick={() => setDark(!dark)}
            className={`p-2 rounded-md transition-colors ${
              scrolled ? "text-muted-foreground hover:text-foreground" : "text-hero-muted hover:text-hero-foreground"
            }`}
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setResumeOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-gold text-primary text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <FileText size={14} />
            Resume
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden ${scrolled ? "text-foreground" : "text-hero-foreground"}`}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-b border-border px-6 py-4 space-y-3">
          {links.map((l) => {
            const isActive = activeSection === l.href.replace("#", "");
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => { handleClick(e, l.href); setMobileOpen(false); }}
                className={`block text-sm font-medium transition-colors hover:text-accent ${
                  isActive ? "text-accent border-l-2 border-accent pl-2" : "text-muted-foreground"
                }`}
              >
                {l.label}
              </a>
            );
          })}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => { setMobileOpen(false); setResumeOpen(true); }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-gold text-primary text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <FileText size={14} />
              Resume
            </button>
          </div>
        </div>
      )}
      <ResumeModal open={resumeOpen} onOpenChange={setResumeOpen} />
    </nav>
  );
};

export default Navbar;
