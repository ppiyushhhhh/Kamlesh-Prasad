import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Server,
  ShieldCheck,
  Cloud,
  HardDrive,
  Network,
  BarChart3,
  Users,
  Lock,
} from "lucide-react";

const expertise = [
  { icon: ShieldCheck, title: "IT Security & CISO Practice", desc: "SOC, NOC, ITSM, ITAM, BCP-DR, VAPT (Black, Brown & White Box), SIEM, EDR, Zscaler, SSO. Leading end-to-end cyber security posture." },
  { icon: Server, title: "Digital Transformation", desc: "Spearheaded transformation from 2 malls to 20+ malls. Built 98% Cloud Compute Organization (SaaS, PaaS, IaaS) with zero data loss." },
  { icon: Cloud, title: "Cloud & Infrastructure", desc: "3-Tier DC/DR/NDR deployments, Microsoft 365, hybrid cloud migrations, MPLS networks, SD-WAN, and Active-Active HA configurations." },
  { icon: BarChart3, title: "IT Governance & Compliance", desc: "ITGC, SEBI, CERT-In, DPDP Act, NIST & SANS frameworks. ERM post listing achieving risk score of 3.2 (best in REIT)." },
  { icon: Network, title: "Program & Vendor Management", desc: "Multi-vendor management with IBM, TCS, Wipro & Accenture. SOW, RFI/RFP, IT Services contracts & negotiations." },
  { icon: HardDrive, title: "M&A IT Integration", desc: "Technology due diligence, knowledge transfer, data migration, employee rebadging, and digital transformation for acquisitions." },
  { icon: Users, title: "Stakeholder Engagement", desc: "Primary IT interface to CXOs, Head of Departments, Centre Directors. Steering committee reviews and business benefits realization." },
  { icon: Lock, title: "Cyber Security", desc: "End-to-end cyber defense covering threat detection, incident response, Zero Trust architecture, VAPT, DPDP Act 2023 readiness, and continuous security posture management across the enterprise." },
];

const ExpertiseSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="expertise" className="section-padding bg-background scroll-mt-16">
      <div className="container mx-auto max-w-6xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent uppercase tracking-[0.2em] text-sm font-medium mb-3">Specializations</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-12">
            Core Expertise
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertise.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.1 * i, duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -4, boxShadow: "0 8px 30px -12px hsl(var(--primary) / 0.15)" }}
              className="bg-card border border-border rounded-lg p-6 group transition-colors duration-300 hover:border-accent/40"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon className="text-primary" size={24} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
