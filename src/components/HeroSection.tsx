import { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, ChevronDown, FileText, ArrowDown, MapPin, ShieldCheck, Server, RefreshCw } from "lucide-react";
import kamleshPhoto from "@/assets/kamlesh-photo.jpg";
import ResumeModal from "@/components/ResumeModal";

const HeroSection = () => {
  const [resumeOpen, setResumeOpen] = useState(false);

  const pillars = [
    { title: "Cybersecurity", icon: ShieldCheck, desc: "CISO Practice & Resilience" },
    { title: "Infrastructure", icon: Server, desc: "Cloud, Hybrid & Scale" },
    { title: "Transformation", icon: RefreshCw, desc: "Enterprise & M&A Strategy" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[96vh] lg:min-h-screen flex items-center bg-[#070B16] text-white pt-24 pb-16 lg:py-0 overflow-hidden tech-grid"
    >
      {/* Subtle architectural vertical lines */}
      <div className="absolute inset-0 pointer-events-none flex justify-between max-w-7xl mx-auto px-6 opacity-[0.07]">
        <div className="w-[1px] h-full bg-white" />
        <div className="w-[1px] h-full bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-white hidden lg:block" />
        <div className="w-[1px] h-full bg-white" />
      </div>

      {/* Ambient executive gradient */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-blue-600/10 blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Executive Typography & Narrative */}
          <div className="lg:col-span-7 xl:col-span-7 text-left">
            {/* Top Technical Metadata Bar */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 border border-slate-800 bg-slate-900/60 px-3 py-1.5 rounded-sm mb-6 font-mono text-[11px] tracking-widest uppercase text-slate-300"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>Technology Executive &bull; CIO &bull; CISO</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">22+ Years</span>
            </motion.div>

            {/* Massive Hero Name */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mb-6"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-display font-black tracking-tighter uppercase leading-[0.92] text-white">
                Kamlesh
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">
                  Prasad
                </span>
              </h1>
            </motion.div>

            {/* Executive Core Domain Subheader */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 space-y-2"
            >
              <p className="text-sm md:text-base font-mono uppercase tracking-[0.2em] text-accent font-semibold">
                Cybersecurity &bull; Infrastructure &bull; Transformation
              </p>
              <p className="text-slate-300 text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-2xl">
                Building resilient enterprise technology environments, safeguarding mission-critical infrastructure, and leading strategic digital transformation at scale.
              </p>
            </motion.div>

            {/* Technical Pillars Matrix */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 pt-2"
            >
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="border border-slate-800/80 bg-slate-900/40 p-3 rounded-sm flex flex-col justify-between hover:border-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <p.icon size={16} className="text-accent shrink-0" />
                    <span className="text-xs font-mono font-bold tracking-wider uppercase text-white">
                      {p.title}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-normal">
                    {p.desc}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#experience"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-accent text-white font-mono text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-accent/90 transition-all duration-200 shadow-sm"
              >
                <span>View Experience</span>
                <ArrowDown size={14} />
              </a>

              <button
                onClick={() => setResumeOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-700 bg-slate-900/60 text-white font-mono text-xs font-bold uppercase tracking-wider rounded-sm hover:border-slate-500 hover:bg-slate-800/80 transition-all duration-200"
              >
                <FileText size={15} />
                <span>Executive Resume</span>
              </button>

              <a
                href="https://www.linkedin.com/in/kamleshsprasad0512/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 text-slate-400 hover:text-white transition-colors text-xs font-mono uppercase tracking-wider"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={16} className="text-accent" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            </motion.div>

            {/* Location & Verified Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono"
            >
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-slate-500" />
                <span>Mumbai, India</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Current: CIO, Runwal Realty</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Editorial Architectural Portrait */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-md"
            >
              {/* Technical architectural framing */}
              <div className="relative border border-slate-700/80 bg-slate-900 p-2 sm:p-3 shadow-2xl">
                {/* Corner crosshairs */}
                <span className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-accent" />
                <span className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-accent" />
                <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-accent" />
                <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-accent" />

                {/* Portrait container */}
                <div className="relative overflow-hidden aspect-[4/5] bg-slate-950">
                  <img
                    src={kamleshPhoto}
                    alt="Kamlesh Prasad – Technology Executive"
                    width={480}
                    height={600}
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover object-top filter grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
                  />
                  {/* Subtle technical gradient scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070B16] via-transparent to-transparent opacity-80" />

                  {/* On-image technical overlay badge */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-sm flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-mono uppercase tracking-wider text-accent font-bold">
                        Leadership &bull; Strategy
                      </p>
                      <p className="text-xs font-semibold text-white">
                        Runwal &bull; Nexus &bull; IBM &bull; Accenture
                      </p>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      ITGC/VAPT
                    </span>
                  </div>
                </div>

                {/* Frame metadata strip */}
                <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase tracking-widest px-1">
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
    </section>
  );
};

export default HeroSection;
