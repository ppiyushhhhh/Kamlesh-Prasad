import { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, ChevronDown, FileText } from "lucide-react";
import kamleshPhoto from "@/assets/kamlesh-photo.jpg";
import ResumeModal from "@/components/ResumeModal";

const HeroSection = () => {
  const [resumeOpen, setResumeOpen] = useState(false);
  const pillars = [
    "Cyber Security Leadership",
    "IT Infrastructure (On-Prem | Cloud | SaaS | Hybrid)",
    "Governance, Risk & Compliance",
    "Digital Transformation & M&A Integrations",
  ];

  return (
    <section id="hero" className="hero-gradient relative min-h-screen flex items-center overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
        backgroundSize: "40px 40px"
      }} />

      <div className="container mx-auto section-padding relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-shrink-0"
          >
            <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-gold/30 shadow-2xl">
              <img
                src={kamleshPhoto}
                alt="Kamlesh Prasad"
                width={288}
                height={288}
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover"
              />

            </div>
          </motion.div>

          {/* Content */}
          <div className="text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-hero-muted uppercase tracking-[0.25em] text-sm mb-4 font-medium"
            >
              Technology Executive · Cyber Security Strategist
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-hero-foreground mb-4"
            >
              Kamlesh Prasad
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-hero-muted font-light mb-8 max-w-2xl"
            >
              Driving Enterprise-Wide IT Strategy, Cyber Resilience & Infrastructure Transformation
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start gap-2 mb-10"
            >
              {pillars.map((pillar) => (
                <span
                  key={pillar}
                  className="px-4 py-1.5 rounded-full text-xs md:text-sm border border-hero-muted/30 text-hero-muted transition-all duration-300 hover:border-gold hover:text-gold hover:bg-gold/10 hover:scale-105 cursor-default"
                >
                  {pillar}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <a
                href="#experience"
                className="px-8 py-3 bg-gold text-primary font-semibold rounded-md hover:opacity-90 transition-opacity"
              >
                View Experience
              </a>
              <a
                href="https://www.linkedin.com/in/kamleshsprasad0512/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border border-hero-muted/40 text-hero-foreground rounded-md hover:bg-hero-foreground/10 transition-colors inline-flex items-center gap-2"
              >
                <Linkedin size={18} />
                Connect on LinkedIn
              </a>
              <button
                onClick={() => setResumeOpen(true)}
                className="px-8 py-3 border border-gold/60 text-gold rounded-md hover:bg-gold/10 transition-colors inline-flex items-center gap-2 font-semibold"
              >
                <FileText size={18} />
                View Resume
              </button>
            </motion.div>
            <ResumeModal open={resumeOpen} onOpenChange={setResumeOpen} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-hero-muted/50"
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
