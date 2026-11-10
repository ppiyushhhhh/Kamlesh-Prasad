import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Linkedin, ChevronDown, FileText, ArrowDown, MapPin, ShieldCheck, Server, Cloud, RefreshCw, Maximize2, X, Share2 } from "lucide-react";
import { toast } from "sonner";
import kamleshPhoto from "@/assets/kamlesh-photo.jpg";
import ResumeModal from "@/components/ResumeModal";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const HeroSection = () => {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [photoOpen, setPhotoOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // On mobile or reduced motion, render immediately without hiding content behind opacity: 0
  const getHeroMotion = (yOffset = 20, delay = 0, duration = 0.6) => {
    if (shouldReduceMotion || isMobile) {
      return {
        initial: false,
        animate: { opacity: 1, y: 0 },
        transition: { duration: isMobile ? 0.25 : 0 },
      };
    }
    return {
      initial: { opacity: 0, y: yOffset },
      animate: { opacity: 1, y: 0 },
      transition: { duration, delay },
    };
  };

  const handleShare = async () => {
    const shareData = {
      title: "Kamlesh Prasad | Technology Executive • CIO • CISO",
      text: "Executive portfolio of Kamlesh Prasad — Chief Information Officer with 22+ years in IT Infrastructure, Cyber Security, and Digital Transformation.",
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

  const pillars = [
    { title: "ITSM & Operations", icon: Server, desc: "ServiceDesk & Asset Governance" },
    { title: "Cloud & Enterprise IT", icon: Cloud, desc: "AWS, Hybrid Infra & Platforms" },
    { title: "Cybersecurity", icon: ShieldCheck, desc: "Zero Trust & Systems Resilience" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[96vh] lg:min-h-screen flex items-center bg-[#0A0A0C] text-white pt-24 pb-16 lg:py-0 overflow-hidden tech-grid"
    >
      {/* Subtle architectural vertical lines */}
      <div className="absolute inset-0 pointer-events-none flex justify-between max-w-7xl mx-auto px-6 opacity-[0.06]">
        <div className="w-[1px] h-full bg-white" />
        <div className="w-[1px] h-full bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-white hidden lg:block" />
        <div className="w-[1px] h-full bg-white" />
      </div>

      {/* Ambient platinum executive gradient */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-white/[0.03] blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Executive Typography & Narrative */}
          <div className="lg:col-span-7 xl:col-span-7 text-left">
            {/* Top Technical Metadata Bar */}
            <motion.div
              {...getHeroMotion(15, 0, 0.5)}
              className="inline-flex items-center gap-3 border border-zinc-800 bg-zinc-900/60 px-3 py-1.5 rounded-sm mb-6 font-mono text-[11px] tracking-widest uppercase text-zinc-300"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>IT Infrastructure &bull; ITSM &bull; Cloud &bull; Cyber Security</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-400">22+ Years</span>
            </motion.div>

            {/* Massive Hero Name */}
            <motion.div
              {...getHeroMotion(25, 0.1, 0.7)}
              className="mb-6"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-display font-black tracking-tighter uppercase leading-[0.92] text-white">
                Kamlesh
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                  Prasad
                </span>
              </h1>
            </motion.div>

            {/* Executive Core Domain Subheader */}
            <motion.div
              {...getHeroMotion(20, 0.2, 0.6)}
              className="mb-6 space-y-2"
            >
              <p className="text-sm md:text-base font-mono uppercase tracking-[0.2em] text-zinc-200 font-semibold">
                Enterprise IT Operations &bull; Cloud Infrastructure &bull; Systems Resilience
              </p>
              <p className="text-zinc-300 text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-2xl">
                Delivering dependable enterprise IT services, managing mission-critical infrastructure, and architecting resilient Linux, AWS, and automated CI/CD environments.
              </p>
            </motion.div>

            {/* Technical Pillars Matrix */}
            <motion.div
              {...getHeroMotion(20, 0.3, 0.6)}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 pt-2"
            >
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="border border-zinc-800 bg-zinc-900/40 p-3 rounded-sm flex flex-col justify-between hover:border-zinc-500 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <p.icon size={16} className="text-white shrink-0" />
                    <span className="text-xs font-mono font-bold tracking-wider uppercase text-white">
                      {p.title}
                    </span>
                  </div>
                  <span className="text-[11px] text-zinc-400 font-normal">
                    {p.desc}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              {...getHeroMotion(20, 0.4, 0.6)}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#experience"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-zinc-200 transition-all duration-200 shadow-sm"
              >
                <span>View Experience</span>
                <ArrowDown size={14} />
              </a>

              <button
                onClick={() => setResumeOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-zinc-700 bg-zinc-900/60 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-sm hover:border-zinc-500 hover:bg-zinc-800/80 transition-all duration-200"
              >
                <FileText size={15} />
                <span>Executive Resume</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-3.5 border border-zinc-800 bg-zinc-900/40 text-zinc-300 font-mono text-xs font-bold uppercase tracking-wider rounded-sm hover:border-zinc-600 hover:text-white transition-all duration-200 cursor-pointer"
                aria-label="Share Profile"
                title="Share Executive Profile"
              >
                <Share2 size={15} />
                <span>Share</span>
              </button>

              <a
                href="https://www.linkedin.com/in/kamleshsprasad0512/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 text-zinc-400 hover:text-white transition-colors text-xs font-mono uppercase tracking-wider"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={16} className="text-zinc-300" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            </motion.div>

            {/* Location & Verified Strip */}
            <motion.div
              {...getHeroMotion(10, 0.5, 0.6)}
              className="mt-8 pt-6 border-t border-zinc-800 flex flex-wrap items-center gap-6 text-xs text-zinc-400 font-mono"
            >
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-zinc-500" />
                <span>Mumbai, India</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-pulse" />
                <span>Current: Chief Information Officer, Runwal Realty</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Editorial Architectural Portrait */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              {...(shouldReduceMotion || isMobile
                ? { initial: false, animate: { opacity: 1, scale: 1, y: 0 }, transition: { duration: isMobile ? 0.25 : 0 } }
                : { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, transition: { duration: 0.8, delay: 0.2 } }
              )}
              className="relative w-full max-w-md"
            >
              {/* Technical architectural framing */}
              <div className="relative border border-zinc-700 bg-zinc-900 p-2 sm:p-3 shadow-2xl">
                {/* Corner crosshairs */}
                <span className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-white/80" />
                <span className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-white/80" />
                <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-white/80" />
                <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-white/80" />

                {/* Portrait container */}
                <div
                  className="relative overflow-hidden aspect-[4/5] bg-zinc-950 cursor-pointer group"
                  onClick={() => setPhotoOpen(true)}
                  title="Click to view full photo"
                >
                  <img
                    src={kamleshPhoto}
                    alt="Kamlesh Prasad – Technology Executive"
                    width={480}
                    height={600}
                    decoding="async"
                    loading="eager"
                    fetchPriority="high"
                    className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-[1.02]"
                  />
                  {/* Subtle bottom gradient scrim for metadata badge */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0A0A0C]/90 to-transparent pointer-events-none" />

                  {/* Hover Inspect badge */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/80 border border-white/20 text-white font-mono text-xs font-semibold rounded-xs shadow-lg backdrop-blur-xs">
                      <Maximize2 size={13} />
                      <span>View Full Photo</span>
                    </span>
                  </div>

                  {/* On-image technical overlay badge */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-sm flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-300 font-bold">
                        Leadership &bull; Strategy
                      </p>
                      <p className="text-xs font-semibold text-white">
                        Runwal &bull; Nexus &bull; IBM &bull; Accenture
                      </p>
                    </div>
                    <span className="font-mono text-[10px] text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded">
                      ITGC/VAPT
                    </span>
                  </div>
                </div>

                {/* Frame metadata strip */}
                <div className="mt-2 pt-2 border-t border-zinc-800 flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-widest px-1">
                  <span>REF: KP-EXEC-2026</span>
                  <span>ENTERPRISE SCALE</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-500 hidden md:flex flex-col items-center gap-1 cursor-pointer"
        onClick={() => {
          document.getElementById("profile")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
        <ChevronDown size={18} />
      </motion.div>

      <ResumeModal open={resumeOpen} onOpenChange={setResumeOpen} />

      {/* Full Photo Modal */}
      <Dialog open={photoOpen} onOpenChange={setPhotoOpen}>
        <DialogContent className="max-w-3xl w-[94vw] p-0 bg-zinc-950 border-zinc-800 text-white [&>button]:hidden overflow-hidden shadow-2xl">
          <div className="relative flex flex-col items-center">
            <div className="w-full px-5 py-3.5 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between font-mono text-xs">
              <span className="text-white font-bold tracking-wider uppercase truncate max-w-[80%]">
                Kamlesh Prasad &bull; Chief Information Officer
              </span>
              <button
                type="button"
                onClick={() => setPhotoOpen(false)}
                aria-label="Close photo view"
                className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xs transition-colors border border-zinc-700"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-4 sm:p-6 max-h-[82vh] flex items-center justify-center bg-black w-full">
              <img
                src={kamleshPhoto}
                alt="Kamlesh Prasad – Technology Executive"
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-xs shadow-2xl"
              />
            </div>
            <div className="w-full px-5 py-3 bg-zinc-900/90 border-t border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>Runwal Realty &bull; Mumbai, India</span>
              <span className="text-zinc-300">22+ Years Leadership</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default HeroSection;
