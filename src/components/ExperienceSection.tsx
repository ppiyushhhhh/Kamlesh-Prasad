import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Building2,
  Calendar,
  MapPin,
  CheckCircle2,
  ListFilter,
  GitCommit,
  Briefcase,
  ChevronDown,
  Sparkles,
} from "lucide-react";

import runwalLogo from "@/assets/logos/runwal-realty.jfif";
import nexusLogo from "@/assets/logos/nexus-malls.png";
import avenueLogo from "@/assets/logos/avenue-ecommerce.jfif";
import accentureLogo from "@/assets/logos/accenture.jfif";
import ibmLogo from "@/assets/logos/ibm.jfif";
import sitelLogo from "@/assets/logos/sitel.jfif";

const companyLogos: Record<string, string> = {
  "Runwal Realty": runwalLogo,
  "Nexus Malls": nexusLogo,
  "Avenue E-Commerce Limited": avenueLogo,
  "Accenture Consulting Services": accentureLogo,
  "IBM India Pvt Ltd": ibmLogo,
  "Sitel India Pvt Ltd": sitelLogo,
};

const CompanyLogo = ({ name }: { name: string }) => {
  const [failed, setFailed] = useState(false);
  const src = companyLogos[name];

  if (!src || failed) {
    return (
      <div className="w-10 h-10 border border-border bg-card flex items-center justify-center flex-shrink-0 text-muted-foreground">
        <Building2 size={18} />
      </div>
    );
  }

  return (
    <div className="w-11 h-11 bg-white p-1.5 border border-border flex items-center justify-center flex-shrink-0 shadow-xs rounded-sm">
      <img
        src={src}
        alt={`${name} logo`}
        className="max-w-[34px] max-h-[34px] object-contain"
        onError={() => setFailed(true)}
      />
    </div>
  );
};

interface Role {
  title: string;
  duration: string;
  location: string;
  highlights: string[];
}

interface Company {
  name: string;
  period: string;
  tenure?: string;
  domain: string;
  executiveSummary: string;
  keyMetrics: string[];
  roles: Role[];
}

const experienceData: Company[] = [
  {
    name: "Runwal Realty",
    period: "2026 — PRESENT",
    tenure: "Present",
    domain: "Real Estate & Retail Transformation",
    executiveSummary:
      "Leading enterprise digital transformation, SAP & Salesforce architecture, and CISO cybersecurity governance with a Zero Trust posture.",
    keyMetrics: ["Enterprise CIO & CTO", "Zero Trust Posture", "SAP & Salesforce", "IoT Ecosystems"],
    roles: [
      {
        title: "Chief Information Officer (CIO)",
        duration: "Aug 2026 – Present",
        location: "Mumbai, India",
        highlights: [
          "Lead enterprise-wide information security and cyber security strategy, governance, and risk management across real estate and retail operations.",
          "Drive digital transformation initiatives spanning e-commerce, omni-channel platforms, cloud infrastructure, and IoT ecosystems.",
          "Shape strategic IT roadmap and technology investments as a start-up specialist, aligning innovation with business outcomes.",
          "Champion AI adoption and data-driven decision-making to modernize operations and enhance customer experience.",
        ],
      },
      {
        title: "Chief Technology Officer (CTO)",
        duration: "May 2026 – July 2026",
        location: "Mumbai, Maharashtra, India",
        highlights: [
          "Oversee technology architecture and digital transformation for Runwal Realty, integrating SAP, Salesforce, and cloud-native solutions.",
          "Lead IT infrastructure, cybersecurity, and enterprise systems to ensure scalable, secure, and resilient technology operations.",
          "Spearhead retail technology strategy and platform modernization across sales, service, and customer engagement channels.",
          "Align technology execution with business priorities, enabling secure, high-performance digital platforms for growth.",
        ],
      },
    ],
  },
  {
    name: "Nexus Malls",
    period: "2017 — 2026",
    tenure: "9 years",
    domain: "Retail REIT Infrastructure & CISO Practice",
    executiveSummary:
      "Scaled IT ecosystem from 2 to 20+ mega malls with Zero Data Loss, oversaw ₹250M annual budget, 100% SSO, 98% Cloud compute, and established CISO governance.",
    keyMetrics: ["2 to 20+ Malls Scaled", "₹250M IT Budget", "100% SSO", "98% Cloud Compute", "REIT ERM 3.2"],
    roles: [
      {
        title: "General Manager – Information Technology & Cyber Security",
        duration: "Dec 2017 – May 2026",
        location: "Mumbai, India",
        highlights: [
          "Primary IT interface to CXOs & Head of Departments, Centre Directors, and Finance Heads.",
          "Managed prioritization, IT Governance, Steering committee reviews on progress & business benefits realization.",
          "Head IT Security Practice and leads cyber security - SOC, NOC, ITSM, ITAM, CISO practice, BCP-DR.",
          "Accountable for ₹250 Mn annual IT budget, with continuous focus on quality & cost efficiencies.",
          "Closely work with M&A Team to initiate knowledge transfer and digital transformation.",
          "Worked on SOW, RFI/RFP, IT Services contracts & negotiations in close coordination with commercial teams.",
        ],
      },
      {
        title: "Key Strategic Milestones at Nexus",
        duration: "Leadership Impact",
        location: "Pan-India",
        highlights: [
          "Led IT Department from 2 malls to 20+ malls with seamless data migration and employee rebadging with Zero Data Loss.",
          "Established and directed CISO practice for the entire organization.",
          "Successfully executed 4 VAPT cycles with RED Team and Blue Team across Mobile App and Omnichannel Platform.",
          "Implemented 100% SSO (Single Sign-On) across all applications in Nexus.",
          "Spearheaded SIEM deployment and enhanced endpoint defense via EDR and Zscaler.",
          "Performed ERM post-listing and achieved risk score of 3.2 (best in REIT).",
          "Supported Nexus One App deployment across 13 malls onboarding 400,000+ active customers.",
          "Built Nexus as 98% Cloud Compute Organization (SaaS, PaaS, IaaS).",
          "Engineered DPDP Act 2023 compliance readiness framework.",
        ],
      },
    ],
  },
  {
    name: "Avenue E-Commerce Limited",
    period: "2015 — 2017",
    tenure: "3 years",
    domain: "E-Commerce Startup & High-Availability Infra",
    executiveSummary:
      "Architected 3-Tier DC/DR/NDR infrastructure, deployed 1,100 VMs, MPLS network, and launched 60 stores with zero downtime.",
    keyMetrics: ["3-Tier DC/DR/NDR", "1,100 VMs", "60 Stores Zero Downtime", "Radware GSLB/SLB"],
    roles: [
      {
        title: "Manager – IT Infrastructure / Start-Up Lead",
        duration: "2015 – 2017",
        location: "Mumbai, India",
        highlights: [
          "Designed and executed 3-Tier data center architecture (DC, DR and NDR).",
          "Led deployment of firewalls, 1,100 VMs with MPLS network, taking 60 stores live with zero downtime.",
          "Configured GSLB, SLB (Radware), LLB, and Telco Active-Active HA (SD-WAN).",
          "Delivered 2-year IT roadmap with 1 fulfillment center and 100-store scale capacity.",
          "Established initial SOC and performed inaugural VAPT with zero critical gaps.",
        ],
      },
    ],
  },
  {
    name: "Accenture Consulting Services",
    period: "2014 — 2015",
    tenure: "1 year",
    domain: "Global Enterprise Consulting",
    executiveSummary:
      "Led infrastructure consulting assignments for Raymond Limited across 13 portfolio companies, data migration, and life-cycle security for 10,000+ assets.",
    keyMetrics: ["Raymond Limited", "13 Portfolio Companies", "10,000+ Assets", "PAN-India Logistics"],
    roles: [
      {
        title: "Consulting – IT Infrastructure",
        duration: "2014 – 2015",
        location: "Mumbai, India",
        highlights: [
          "Led enterprise consulting assignments in India for Raymond Limited (Thane).",
          "Managed data migration, server consolidation, and SharePoint applications across 13 portfolio companies.",
          "Directed PAN-India IT operations for stores, retail outlets, warehouses, and manufacturing plants.",
          "Managed life-cycle and security of 10,000+ enterprise IT assets.",
        ],
      },
    ],
  },
  {
    name: "IBM India Pvt Ltd",
    period: "2007 — 2014",
    tenure: "7 years",
    domain: "Enterprise Infrastructure & Operations",
    executiveSummary:
      "Delivered multi-OS infrastructure across AIX, UNIX, VMware, and Windows for Telco and BFSI clients across India & Africa; led US technical support at IBM Daksh.",
    keyMetrics: ["AIX / HP UNIX / VMware", "West India Delivery Lead", "IBM Tivoli & HP Data Protector", "India & Zambia"],
    roles: [
      {
        title: "Server Support Delivery Lead & IT Infrastructure Lead",
        duration: "2008 – 2014",
        location: "Mumbai, India & Zambia, Africa",
        highlights: [
          "Delivered enterprise infrastructure across AIX, HP UNIX, VMware, Windows, and RHEL environments.",
          "Managed backup operations using IBM Tivoli and HP Data Protector for Telco, BFSI, Sales, and FMCG sectors.",
          "Served as West India Accounts server support and infrastructure delivery lead.",
        ],
      },
      {
        title: "Assistant Manager Operations (IBM Daksh)",
        duration: "2007 – 2008",
        location: "Pune, India",
        highlights: [
          "Led HP 6J Technical Support operations for US enterprise clients.",
          "Managed call volume, CSAT benchmarks, and AHT metrics across operational teams.",
        ],
      },
    ],
  },
  {
    name: "Sitel India Pvt Ltd",
    period: "2003 — 2007",
    tenure: "4 years",
    domain: "Technical Support Services & Operations",
    executiveSummary:
      "Managed business outsourcing and technical support operations for AOL, Earthlink, and Dell Tech Support.",
    keyMetrics: ["Dell Tech Support", "AOL & Earthlink", "Quality SLAs", "Team Governance"],
    roles: [
      {
        title: "Team Manager",
        duration: "2003 – 2007",
        location: "Mumbai & Hyderabad, India",
        highlights: [
          "Managed business outsourcing operations for AOL, Earthlink, and Dell Tech Support.",
          "Led team governance, quality management frameworks, and support SLAs.",
        ],
      },
    ],
  },
];

const ExperienceSection = () => {
  const [viewMode, setViewMode] = useState<"detailed" | "timeline">("detailed");
  const [expandedTimelineIndex, setExpandedTimelineIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="section-padding bg-section-alt border-b border-border/80 scroll-mt-16">
      <div className="container mx-auto max-w-7xl" ref={ref}>
        {/* Section Header with View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12 pb-4 border-b border-border/60"
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
              02 / PROFESSIONAL EXPERIENCE
            </span>
            <span className="h-[1px] w-12 bg-accent/40" />
            <span className="text-xs uppercase font-mono tracking-wider text-muted-foreground hidden sm:inline">
              Executive Leadership Timeline
            </span>
          </div>

          {/* View Toggle Segmented Control */}
          <div className="inline-flex items-center p-1 bg-card border border-border rounded-lg text-xs font-mono self-start sm:self-auto shadow-xs">
            <button
              type="button"
              onClick={() => setViewMode("detailed")}
              aria-pressed={viewMode === "detailed"}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                viewMode === "detailed"
                  ? "bg-foreground text-background font-bold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ListFilter size={13} />
              <span>Detailed View</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("timeline")}
              aria-pressed={viewMode === "timeline"}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                viewMode === "timeline"
                  ? "bg-foreground text-background font-bold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <GitCommit size={13} />
              <span>Executive Timeline</span>
            </button>
          </div>
        </motion.div>

        {/* Dynamic View Content */}
        <AnimatePresence mode="wait">
          {viewMode === "detailed" ? (
            /* DETAILED EDITORIAL VIEW */
            <motion.div
              key="detailed-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-14"
            >
              {experienceData.map((company, cIndex) => (
                <div
                  key={company.name}
                  className="border-b border-border pb-12 last:border-b-0 last:pb-0"
                >
                  {/* Company Header Row */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start mb-6">
                    <div className="md:col-span-4">
                      <div className="inline-block font-mono text-xs font-bold text-accent tracking-widest uppercase mb-1">
                        {company.period}
                      </div>
                      <div className="flex items-center gap-3">
                        <CompanyLogo name={company.name} />
                        <div>
                          <h3 className="text-xl md:text-2xl font-display font-bold text-foreground">
                            {company.name}
                          </h3>
                          {company.tenure && (
                            <p className="text-xs font-mono text-muted-foreground">
                              {company.tenure} &bull; {company.domain}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Roles Stack */}
                    <div className="md:col-span-8 space-y-8">
                      {company.roles.map((role) => (
                        <div
                          key={role.title}
                          className="border-l-2 border-border pl-6 relative space-y-3"
                        >
                          {/* Timeline dot */}
                          <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-accent" />

                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                            <h4 className="text-base md:text-lg font-display font-bold text-foreground">
                              {role.title}
                            </h4>
                            <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                              {role.duration && (
                                <span className="flex items-center gap-1">
                                  <Calendar size={13} className="text-accent" />
                                  {role.duration}
                                </span>
                              )}
                              {role.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin size={13} />
                                  {role.location}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Highlights */}
                          <ul className="space-y-2 pt-1">
                            {role.highlights.map((h, hIdx) => (
                              <li
                                key={hIdx}
                                className="text-sm text-muted-foreground flex items-start gap-2.5 leading-relaxed"
                              >
                                <span className="w-1.5 h-1.5 bg-accent shrink-0 mt-2 rounded-[1px]" />
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            /* EXECUTIVE TIMELINE VIEW (Visual Milestones) */
            <motion.div
              key="timeline-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="relative py-4"
            >
              {/* Central Glowing Guide Rail */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent via-accent/40 to-border/40 transform md:-translate-x-1/2" />

              <div className="space-y-10">
                {experienceData.map((company, idx) => {
                  const isEven = idx % 2 === 0;
                  const isExpanded = expandedTimelineIndex === idx;

                  return (
                    <div
                      key={company.name}
                      className={`relative flex flex-col md:flex-row items-start ${
                        isEven ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      {/* Timeline Node Icon Indicator */}
                      <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-2 border-accent bg-card flex items-center justify-center text-accent shadow-sm z-10">
                        <Briefcase size={14} />
                      </div>

                      {/* Content Card with Left Padding on Mobile */}
                      <div
                        className={`w-full md:w-[calc(50%-36px)] pl-12 md:pl-0 ${
                          isEven ? "md:pr-4" : "md:pl-4"
                        }`}
                      >
                        <div className="border border-border bg-card rounded-xl p-5 hover:border-accent/50 transition-all shadow-xs group">
                          {/* Year & Tenure Strip */}
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="font-mono text-xs font-bold text-accent tracking-wider uppercase bg-accent/10 px-2 py-0.5 rounded-xs">
                              {company.period}
                            </span>
                            {company.tenure && (
                              <span className="font-mono text-[11px] text-muted-foreground border border-border px-2 py-0.5 rounded-full">
                                {company.tenure}
                              </span>
                            )}
                          </div>

                          {/* Company & Role Header */}
                          <div className="flex items-start gap-3 mb-3">
                            <CompanyLogo name={company.name} />
                            <div>
                              <h3 className="font-display font-bold text-base md:text-lg text-foreground group-hover:text-accent transition-colors">
                                {company.name}
                              </h3>
                              <p className="text-xs text-muted-foreground font-mono">
                                {company.roles[0]?.title}
                              </p>
                            </div>
                          </div>

                          {/* Executive Impact Statement */}
                          <p className="text-xs text-foreground/90 leading-relaxed mb-3.5 bg-muted/40 p-3 rounded-lg border border-border/60">
                            {company.executiveSummary}
                          </p>

                          {/* Key Metric Tags */}
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {company.keyMetrics.map((metric) => (
                              <span
                                key={metric}
                                className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/80"
                              >
                                {metric}
                              </span>
                            ))}
                          </div>

                          {/* Collapsible Deep-Dive Details */}
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedTimelineIndex(isExpanded ? null : idx)
                            }
                            className="inline-flex items-center gap-1 text-[11px] font-mono text-accent hover:underline cursor-pointer"
                          >
                            <span>{isExpanded ? "Hide Details" : "View Full Highlights"}</span>
                            <ChevronDown
                              size={12}
                              className={`transition-transform duration-200 ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 pt-3 border-t border-border space-y-2 text-xs text-muted-foreground"
                            >
                              {company.roles.flatMap((r) => r.highlights).map((h, hIdx) => (
                                <div key={hIdx} className="flex items-start gap-2">
                                  <CheckCircle2 size={12} className="text-accent shrink-0 mt-0.5" />
                                  <span>{h}</span>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ExperienceSection;
