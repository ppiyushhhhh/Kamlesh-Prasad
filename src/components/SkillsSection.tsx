import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Cpu, Languages, Server, Cloud, ShieldCheck, GitBranch } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: typeof Server;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "IT Service Management & Operations",
    icon: Server,
    skills: [
      "ManageEngine ServiceDesk Plus",
      "ITIL v3 / Intermediate Operations",
      "IT Asset Management (10,000+ Assets)",
      "Incident, Problem & Change Management",
      "Service Level Agreement (SLA) Governance",
      "Multi-Vendor SLA Delivery (IBM, Dell)",
    ],
  },
  {
    title: "Cloud & Linux Infrastructure",
    icon: Cloud,
    skills: [
      "AWS (EC2, S3, IAM, CloudWatch)",
      "Linux / Ubuntu Server Administration",
      "Nginx Web Server & Reverse Proxy",
      "Cloudflare (DNS, SSL/TLS, WAF)",
      "VMware vSphere & Virtualization",
      "Active Directory, SSO & Hybrid Identity",
    ],
  },
  {
    title: "DevOps, CI/CD & Automation",
    icon: GitBranch,
    skills: [
      "GitHub Actions Automated CI/CD",
      "Bash Shell Scripting & Maintenance",
      "Infrastructure Monitoring & 5-Min Alerts",
      "Automated Backups & Retention Policy",
      "Automated PDF Health Reporting (Node.js)",
      "Git Version Control & Release Automation",
    ],
  },
  {
    title: "Cybersecurity & Systems Resilience",
    icon: ShieldCheck,
    skills: [
      "Zero Trust Architecture & Security Posture",
      "CISO Governance & Policy Enforcement",
      "SIEM & EDR Deployment (Zscaler)",
      "VAPT Coordination (Red / Blue Team Cycles)",
      "3-Tier DC / DR / NDR Business Continuity",
      "DPDP Act 2023 Compliance Readiness",
    ],
  },
];

const languages = [
  { name: "English", level: "Professional Working Proficiency" },
  { name: "Hindi", level: "Native / Full Professional" },
  { name: "Marathi", level: "Professional Proficiency" },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const isVisible = inView || shouldReduceMotion;

  return (
    <section id="skills" className="section-padding bg-background border-b border-border/80 scroll-mt-16">
      <div className="container mx-auto max-w-7xl" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10 pb-4 border-b border-border/60"
        >
          <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
            Technical Stack &amp; Capabilities
          </span>
          <span className="h-[1px] w-12 bg-accent/40" />
          <span className="text-xs uppercase font-mono tracking-wider text-muted-foreground">
            IT Operations &bull; Cloud &bull; DevOps
          </span>
        </motion.div>

        {/* 4 Technical Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {skillCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="border border-border bg-card p-6 md:p-7 rounded-sm flex flex-col justify-between hover:border-accent/40 transition-colors shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-border/60">
                    <div className="w-8 h-8 rounded-xs border border-border bg-muted/30 flex items-center justify-center text-accent shrink-0">
                      <Icon size={16} />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest block">
                        Domain 0{idx + 1}
                      </span>
                      <h3 className="font-display text-sm font-bold text-foreground uppercase tracking-wider">
                        {cat.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 border border-border bg-muted/40 text-foreground font-mono text-xs hover:border-accent hover:text-accent transition-colors cursor-default rounded-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Languages & Communication Strip */}
        <div className="border border-border bg-card p-6 md:p-7 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xs border border-border bg-muted/30 flex items-center justify-center text-accent shrink-0">
              <Languages size={16} />
            </div>
            <div>
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest block">
                Communication
              </span>
              <h3 className="font-display text-sm font-bold text-foreground uppercase tracking-wider">
                Professional Languages
              </h3>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 md:gap-8">
            {languages.map((l) => (
              <div key={l.name} className="flex items-baseline gap-2 font-mono text-xs">
                <span className="font-semibold text-foreground uppercase tracking-wider">{l.name}:</span>
                <span className="text-muted-foreground">{l.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
