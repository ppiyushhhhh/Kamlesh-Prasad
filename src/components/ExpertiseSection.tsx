import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Server, RefreshCw, Scale } from "lucide-react";

interface Category {
  icon: typeof ShieldCheck;
  title: string;
  tagline: string;
  capabilities: string[];
}

const categories: Category[] = [
  {
    icon: ShieldCheck,
    title: "Cybersecurity",
    tagline: "CISO Practice & Defense",
    capabilities: [
      "Security Strategy & CISO Leadership",
      "Threat Detection, SIEM & EDR Operations",
      "VAPT (Red / Blue Team) & Zero Trust",
      "Endpoint Protection & Zscaler Cloud",
      "DPDP Act 2023 Readiness & Compliance",
      "BCP-DR & Incident Response Protocols",
    ],
  },
  {
    icon: Server,
    title: "Infrastructure",
    tagline: "Architecture & Resilience",
    capabilities: [
      "3-Tier Data Center (DC, DR & NDR)",
      "98% Cloud Compute (SaaS, PaaS, IaaS)",
      "Enterprise SD-WAN & MPLS Networking",
      "High Availability & GSLB / SLB (Radware)",
      "Multi-OS (Linux, RHEL, AIX, VMware)",
      "Enterprise Monitoring & NOC Workflows",
    ],
  },
  {
    icon: RefreshCw,
    title: "Transformation",
    tagline: "Scale & Digital Delivery",
    capabilities: [
      "Enterprise Scale (2 to 20+ Malls Unified)",
      "M&A Technology Due Diligence & Transfer",
      "Omni-Channel & 100% SSO Implementation",
      "AI Adoption & Modern Data Architecture",
      "SAP, Salesforce & Cloud Integrations",
      "Zero Data Loss System Migrations",
    ],
  },
  {
    icon: Scale,
    title: "Governance",
    tagline: "Risk, Audit & Oversight",
    capabilities: [
      "ITGC, SEBI & CERT-In Frameworks",
      "Enterprise Risk Management (REIT ERM 3.2)",
      "Multi-Vendor (IBM, Dell & Accenture)",
      "₹250 Mn Annual IT Budget Oversight",
      "SOW, RFI/RFP & Contract Negotiations",
      "ITSM, ITAM & Continuous Quality Audit",
    ],
  },
];

const ExpertiseSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="expertise" className="section-padding bg-background border-b border-border/80 scroll-mt-16">
      <div className="container mx-auto max-w-7xl" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12 pb-4 border-b border-border/60"
        >
          <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
            03 / CORE EXPERTISE
          </span>
          <span className="h-[1px] w-12 bg-accent/40" />
          <span className="text-xs uppercase font-mono tracking-wider text-muted-foreground">
            Strategic Competency Matrix
          </span>
        </motion.div>

        {/* Four Column Matrix with Thin Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-b border-border divide-y md:divide-y-0 md:divide-x divide-border">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="p-6 lg:p-8 flex flex-col justify-between hover:bg-muted/30 transition-colors"
            >
              <div>
                {/* Category Icon & Index */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 border border-border bg-card flex items-center justify-center text-accent">
                    <cat.icon size={20} />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground tracking-widest">
                    0{i + 1}
                  </span>
                </div>

                {/* Category Title */}
                <h3 className="text-xl font-display font-black tracking-tight uppercase text-foreground mb-1">
                  {cat.title}
                </h3>
                <p className="text-xs font-mono text-accent uppercase tracking-wider mb-6">
                  {cat.tagline}
                </p>

                {/* Capabilities List */}
                <ul className="space-y-3 pt-2 border-t border-border/60">
                  {cat.capabilities.map((cap, cIdx) => (
                    <li
                      key={cIdx}
                      className="text-xs text-muted-foreground flex items-start gap-2.5 leading-relaxed"
                    >
                      <span className="w-1 h-1 bg-accent/80 shrink-0 mt-1.5" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom rule indicator */}
              <div className="mt-8 pt-4 border-t border-border/40 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                <span className="uppercase tracking-wider">Enterprise Ready</span>
                <span>&bull;&bull;&bull;</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
