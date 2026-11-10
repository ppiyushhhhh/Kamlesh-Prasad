import { useState, useRef } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { BadgeCheck, ShieldCheck, Layers, Server, Users, Sparkles } from "lucide-react";

type CredentialCategory = "all" | "itsm" | "infrastructure" | "leadership";

interface CredentialItem {
  code: string;
  title: string;
  domain: string;
  issuer: string;
  category: "itsm" | "infrastructure" | "leadership";
  categoryLabel: string;
  summary: string;
  skills: string[];
  icon: typeof ShieldCheck;
}

const credentials: CredentialItem[] = [
  {
    code: "ITIL-INT",
    title: "ITIL Intermediate",
    domain: "Service Operations",
    issuer: "AXELOS / ITIL",
    category: "itsm",
    categoryLabel: "ITSM & Service Operations",
    summary:
      "Operational lifecycle governance, service desk workflow architecture, incident & problem management, and SLA fulfillment.",
    skills: ["Service Operations", "Incident Mgmt", "SLA Governance", "Event Monitoring"],
    icon: ShieldCheck,
  },
  {
    code: "ITIL-V3",
    title: "ITIL V3 Foundation",
    domain: "IT Service Management",
    issuer: "AXELOS / ITIL",
    category: "itsm",
    categoryLabel: "ITSM & Service Operations",
    summary:
      "Enterprise framework for aligned IT service delivery, continual service improvement, and business-IT operational alignment.",
    skills: ["Service Strategy", "Service Transition", "Continual Improvement", "ITIL Framework"],
    icon: Layers,
  },
  {
    code: "VMW-6.5",
    title: "VMware vSphere 6.5",
    domain: "Virtualization & Cloud Foundations",
    issuer: "VMware",
    category: "infrastructure",
    categoryLabel: "Cloud & Virtualization",
    summary:
      "High-availability data center virtualization, vCenter cluster administration, ESXi compute optimization, and vMotion migration.",
    skills: ["vSphere ESXi", "vCenter Server", "HA / DRS Clusters", "Virtual Networking"],
    icon: Server,
  },
  {
    code: "MCITP",
    title: "MCITP Enterprise",
    domain: "Microsoft Windows Server Infrastructure",
    issuer: "Microsoft",
    category: "infrastructure",
    categoryLabel: "Enterprise Systems",
    summary:
      "Enterprise Windows Server architecture, Active Directory Domain Services (AD DS), DNS/DHCP infrastructure, and identity governance.",
    skills: ["Active Directory", "Group Policy", "Identity Governance", "Enterprise Servers"],
    icon: Server,
  },
  {
    code: "MS-EXCH",
    title: "Microsoft Exchange Certified",
    domain: "Enterprise Messaging & Collaboration",
    issuer: "Microsoft",
    category: "infrastructure",
    categoryLabel: "Enterprise Systems",
    summary:
      "Mission-critical corporate messaging infrastructure, high-availability database availability groups (DAG), transport security, and hygiene.",
    skills: ["Exchange Server", "DAG Clustering", "Mail Transport", "Compliance & Archiving"],
    icon: Server,
  },
  {
    code: "LEAD-2024",
    title: "LEAD Program",
    domain: "Leadership Excellence & Development",
    issuer: "upGrad Enterprise (2024)",
    category: "leadership",
    categoryLabel: "Executive Leadership",
    summary:
      "Executive leadership mastery, strategic organizational transformation, cross-functional team orchestration, and agile delivery.",
    skills: ["Executive Strategy", "Org Transformation", "Cross-Functional Ops", "Agile Leadership"],
    icon: Users,
  },
];

const categories = [
  { id: "all", label: "All Credentials", count: 6 },
  { id: "itsm", label: "ITSM & Service Ops", count: 2 },
  { id: "infrastructure", label: "Cloud & Systems", count: 3 },
  { id: "leadership", label: "Leadership", count: 1 },
] as const;

const CertificationsSection = () => {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const isVisible = inView || shouldReduceMotion;
  const [activeTab, setActiveTab] = useState<CredentialCategory>("all");

  const filteredCredentials =
    activeTab === "all"
      ? credentials
      : credentials.filter((c) => c.category === activeTab);

  return (
    <section id="certifications" className="section-padding bg-background border-b border-border/80 scroll-mt-16">
      <div className="container mx-auto max-w-7xl" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-4 border-b border-border/60"
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
              05 / CREDENTIALS
            </span>
            <span className="h-[1px] w-12 bg-accent/40" />
            <span className="text-xs uppercase font-mono tracking-wider text-muted-foreground">
              Certifications &amp; Executive Credentials
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-zinc-400">
            <Sparkles size={13} className="text-accent" />
            <span>Formally Accredited &bull; 100% Industry Recognized</span>
          </div>
        </motion.div>

        {/* Executive Stats & Category Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id as CredentialCategory)}
                  type="button"
                  className={`cursor-pointer px-3.5 py-1.5 text-xs font-mono tracking-wide rounded-xs transition-all duration-200 border flex items-center gap-2 ${
                    isActive
                      ? "bg-accent/15 border-accent text-accent font-semibold shadow-xs"
                      : "bg-card/60 border-border/80 text-muted-foreground hover:text-foreground hover:border-zinc-600 hover:bg-card"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
            <span className="flex items-center gap-1.5 bg-card border border-border/80 px-2.5 py-1 rounded-xs">
              <BadgeCheck size={13} className="text-emerald-400" />
              <span>6 Accredited Certifications</span>
            </span>
          </div>
        </div>

        {/* Credentials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredCredentials.map((cert, i) => {
              const IconComponent = cert.icon;
              return (
                <motion.div
                  key={cert.code}
                  layout
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ delay: shouldReduceMotion ? 0 : 0.05 * i, duration: 0.3 }}
                  className="group relative border border-border bg-card/60 backdrop-blur-xs p-5 sm:p-6 hover:bg-card hover:border-zinc-500 transition-all duration-300 rounded-xs flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-0.5"
                >
                  {/* Subtle architectural corner accents */}
                  <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-700 group-hover:border-accent transition-colors" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-700 group-hover:border-accent transition-colors" />

                  {/* Top: Header metadata */}
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      {/* Code Badge */}
                      <span className="font-mono text-xs font-bold text-accent bg-accent/10 border border-accent/25 px-2.5 py-1 rounded-xs tracking-wider">
                        {cert.code}
                      </span>

                      {/* Verified Badge */}
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-zinc-300 bg-zinc-900/90 border border-zinc-700/80 px-2 py-0.5 rounded-xs">
                        <BadgeCheck size={12} className="text-emerald-400" />
                        <span>Verified</span>
                      </span>
                    </div>

                    {/* Domain Category */}
                    <div className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase mb-1.5 flex items-center gap-1.5">
                      <IconComponent size={11} className="text-zinc-500 group-hover:text-accent transition-colors" />
                      <span>{cert.categoryLabel}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-display font-bold text-foreground group-hover:text-accent transition-colors leading-snug mb-1">
                      {cert.title}
                    </h3>

                    {/* Issuer */}
                    <p className="text-xs font-mono text-foreground/85 font-medium mb-3">
                      Issued by <span className="text-white font-semibold">{cert.issuer}</span>
                    </p>

                    {/* Description Summary */}
                    <p className="text-xs text-muted-foreground font-light leading-relaxed mb-4">
                      {cert.summary}
                    </p>
                  </div>

                  {/* Bottom: Skills / Competencies pills */}
                  <div className="pt-3 border-t border-border/60">
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="font-mono text-[10px] text-zinc-400 bg-muted/60 border border-border/60 px-2 py-0.5 rounded-xs group-hover:border-zinc-700 group-hover:text-zinc-300 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Interactive bottom glowing border on hover */}
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
