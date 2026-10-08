import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Building2, Calendar, MapPin, CheckCircle2 } from "lucide-react";

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
    <div className="w-11 h-11 bg-white p-1.5 border border-border flex items-center justify-center flex-shrink-0 shadow-xs">
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
  roles: Role[];
}

const experienceData: Company[] = [
  {
    name: "Runwal Realty",
    period: "2026 — PRESENT",
    tenure: "Present",
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
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="section-padding bg-section-alt border-b border-border/80 scroll-mt-16">
      <div className="container mx-auto max-w-7xl" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12 pb-4 border-b border-border/60"
        >
          <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
            02 / PROFESSIONAL EXPERIENCE
          </span>
          <span className="h-[1px] w-12 bg-accent/40" />
          <span className="text-xs uppercase font-mono tracking-wider text-muted-foreground">
            Executive Leadership Timeline
          </span>
        </motion.div>

        {/* Editorial Timeline Container */}
        <div className="space-y-14">
          {experienceData.map((company, cIndex) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * cIndex, duration: 0.5 }}
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
                          {company.tenure}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
