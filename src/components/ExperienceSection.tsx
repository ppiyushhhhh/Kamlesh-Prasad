import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Briefcase } from "lucide-react";

import nexusLogo from "@/assets/logos/nexus-malls.png";
import avenueLogo from "@/assets/logos/avenue-ecommerce.jfif";
import accentureLogo from "@/assets/logos/accenture.jfif";
import ibmLogo from "@/assets/logos/ibm.jfif";
import sitelLogo from "@/assets/logos/sitel.jfif";

const companyLogos: Record<string, string> = {
  "Nexus Malls": nexusLogo,
  "Avenue E-Commerce Limited": avenueLogo,
  "Accenture Consulting Services": accentureLogo,
  "IBM India Pvt Ltd": ibmLogo,
  "Sitel India Pvt Ltd": sitelLogo,
};

const CompanyLogo = ({ name }: { name: string }) => {
  const [failed, setFailed] = useState(false);
  const src = companyLogos[name];

  if (!src || failed) return null;

  return (
    <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-white flex items-center justify-center flex-shrink-0 overflow-hidden border border-border shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 hover:border-accent">
      <img
        src={src}
        alt={`${name} logo`}
        className="max-w-[40px] max-h-[40px] md:max-w-[46px] md:max-h-[46px] object-contain"
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
  tenure?: string;
  roles: Role[];
}

const companies: Company[] = [
  {
    name: "Nexus Malls",
    tenure: "9 years",
    roles: [
      {
        title: "General Manager – Information Technology & Cyber Security (Dec 2017 – May 2026)",
        duration: "Dec 2017 – May 2026",
        location: "Mumbai, India",
        highlights: [
          "Primary IT interface to CXOs & Head of Departments, Centre Directors and Finance Heads",
          "Managed prioritization, IT Governance, Steering committee reviews on progress & business benefits realization",
          "Head IT Security Practice and leads cyber security — SOC, NOC, ITSM, ITAM, CISO practice, BCP-DR",
          "Accountable for ₹250 Mn annual IT budget, with continuous focus on quality & cost efficiencies",
          "Closely work with M&A Team to initiate knowledge transfer and digital transformation",
          "Worked on SOW, RFI/RFP, IT Services contracts & negotiations in close coordination with commercial teams",
        ],
      },
      {
        title: "Key Achievements at Nexus",
        duration: "",
        location: "",
        highlights: [
          "Led IT Department from 2 malls to 20+ malls, seamless data migration and employee rebadging with Zero Data Loss",
          "Lead CISO practice for the organization",
          "Successfully performed 4 VAPT working with RED Team and Blue Team – Mobile App and Omnichannel Platform",
          "Implementation of 100% SSO (Single Sign-On) across all apps in Nexus",
          "Spearheaded deployment of SIEM solutions and enhanced endpoint protection using EDR and Zscaler",
          "Performed ERM post listing and achieved risk score of 3.2 (best in REIT)",
          "Supported Nexus One App deployment on 13 malls with 4 lacs customers onboarded",
          "Built Nexus as 98% Cloud Compute Organization – SaaS, PaaS, IaaS",
          "DPDP Act 2023 readiness",
        ],
      },
    ],
  },
  {
    name: "Avenue E-Commerce Limited",
    tenure: "3 years",
    roles: [
      {
        title: "Manager – IT Infrastructure / Start-Up Lead",
        duration: "2015 – 2017",
        location: "Mumbai, India",
        highlights: [
          "Implementation of 3-Tier data center deployment (DC, DR and NDR)",
          "Led projects of Firewall deployment, 1100 VMs with MPLS network, making 60 stores live",
          "GSLB, SLB (Radware), LLB and Telco configuration with Active-Active HA (SD-WAN)",
          "Developed and delivered 2-year IT roadmap with one Fulfillment center and 100 store capabilities",
          "Zero downtime during and after business go-live",
          "Setup SOC and performed first VAPT with minimal IT security gaps",
        ],
      },
    ],
  },
  {
    name: "Accenture Consulting Services",
    roles: [
      {
        title: "Consulting – IT Infrastructure",
        duration: "2014 – 2015",
        location: "Mumbai, India",
        highlights: [
          "Led consulting assignments in India for Raymond Limited (Thane)",
          "Successfully led 13 portfolio companies' data migration, server consolidation and SharePoint apps",
          "PAN India IT operations for Store, Retail Outlets, Warehouses and Plants",
          "Handling asset management of 10,000+ IT Assets",
        ],
      },
    ],
  },
  {
    name: "IBM India Pvt Ltd",
    tenure: "7 years",
    roles: [
      {
        title: "Server Support Delivery Lead & IT Infrastructure Lead",
        duration: "2008 – 2014",
        location: "Mumbai, India & Zambia, Africa",
        highlights: [
          "Server Hardware, OS (AIX, HP UNIX, VMware, Windows & RHEL), Backup Operations (IBM Tivoli, HP Data Protector)",
          "Projects handled – Telco, BFSI, Sales and FMCG",
          "West India Accounts server support and infrastructure delivery lead",
        ],
      },
      {
        title: "Assistant Manager Operations (IBM Daksh)",
        duration: "2007 – 2008",
        location: "Pune, India",
        highlights: [
          "HP 6J Technical Support for US customers",
          "Handling Call Volume, CSAT and AHT",
        ],
      },
    ],
  },
  {
    name: "Sitel India Pvt Ltd",
    roles: [
      {
        title: "Team Manager",
        duration: "2003 – 2007",
        location: "Mumbai & Hyderabad, India",
        highlights: [
          "Part of Business Outsourcing Team for AOL, Earthlink and Dell Tech Support",
          "Team Management, Quality Management, and Sales oversight",
        ],
      },
    ],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="section-padding bg-section-alt scroll-mt-16">
      <div className="container mx-auto max-w-5xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent uppercase tracking-[0.2em] text-sm font-medium mb-3">Career</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-12">
            Professional Experience
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-12">
            {companies.map((company, ci) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 * ci, duration: 0.5 }}
              >
                {/* Company header */}
                <div className="flex items-start md:items-center gap-4 mb-6 pl-2">
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-primary flex items-center justify-center flex-shrink-0 z-10 shadow-md">
                    <Briefcase className="text-primary-foreground" size={18} />
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <CompanyLogo name={company.name} />
                    <div>
                      <h3 className="text-xl md:text-2xl font-display font-bold text-foreground">
                        {company.name}
                      </h3>
                      {company.tenure && (
                        <p className="text-sm text-muted-foreground">{company.tenure}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Roles */}
                <div className="ml-16 md:ml-20 space-y-6">
                  {company.roles.map((role, ri) => (
                    <motion.div
                      key={role.title}
                      initial={{ opacity: 0, y: 30, scale: 0.97 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ delay: 0.1 * ri, duration: 0.5, ease: "easeOut" }}
                      whileHover={{ y: -4, boxShadow: "0 8px 30px -12px hsl(var(--primary) / 0.15)" }}
                      className="bg-card rounded-lg p-6 shadow-sm border border-border transition-colors duration-300 hover:border-accent/40"
                    >
                      <h4 className="font-semibold text-foreground mb-1">{role.title}</h4>
                      <p className="text-sm text-accent font-medium mb-1">{role.duration}</p>
                      <p className="text-xs text-muted-foreground mb-3">{role.location}</p>
                      <ul className="space-y-1.5">
                        {role.highlights.map((h, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
