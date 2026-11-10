import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Shield, Server, Building2, Rocket } from "lucide-react";

const ProfileSection = () => {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const isVisible = inView || shouldReduceMotion;

  const metrics = [
    { value: "22+", label: "Years Experience", sub: "Enterprise IT & Security" },
    { value: "20+", label: "Malls Scaled", sub: "From 2 to 20+ Properties" },
    { value: "98%", label: "Cloud Compute", sub: "SaaS, PaaS, IaaS Architecture" },
    { value: "100%", label: "SSO Deployed", sub: "Zero Data Loss Migrations" },
  ];

  const corePillars = [
    {
      icon: Shield,
      title: "IT Service Management & Asset Governance",
      desc: "ManageEngine ServiceDesk Plus, ITIL operations, 10,000+ asset lifecycles, and SLA compliance.",
    },
    {
      icon: Server,
      title: "Cloud Infrastructure & Linux Systems",
      desc: "AWS compute, Linux/Ubuntu administration, Nginx reverse proxy, Cloudflare DNS/WAF, and 3-Tier DC/DR.",
    },
    {
      icon: Building2,
      title: "Cyber Security & Risk Governance",
      desc: "Zero Trust architecture, CISO leadership, SIEM/EDR, Zscaler, 4 VAPT cycles, and DPDP Act readiness.",
    },
    {
      icon: Rocket,
      title: "Digital Transformation & Platforms",
      desc: "Enterprise ERP (SAP), Salesforce CRM, omnichannel retail architectures, AI/ML integrations, and business alignment.",
    },
  ];

  return (
    <section id="profile" className="section-padding bg-background border-b border-border/80 scroll-mt-16">
      <div className="container mx-auto max-w-7xl" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10 pb-4 border-b border-border/60"
        >
          <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
            01 / PROFILE
          </span>
          <span className="h-[1px] w-12 bg-accent/40" />
          <span className="text-xs uppercase font-mono tracking-wider text-muted-foreground">
            Executive Summary &amp; Impact
          </span>
        </motion.div>

        {/* Editorial Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Big Statement + Metric Matrix */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-foreground tracking-tight leading-[1.1] mb-6">
                Enterprise technology leadership anchored in IT operations, service management, and cloud modernization.
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-8">
                Partnering with engineering teams, CXOs, and global technology partners to deliver dependable infrastructure, robust security governance, and scalable cloud systems.
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-4 border border-border/80 bg-card rounded-sm hover:border-accent/40 transition-colors"
                >
                  <p className="text-3xl sm:text-4xl font-display font-black text-accent tracking-tight">
                    {m.value}
                  </p>
                  <p className="text-xs font-semibold text-foreground uppercase tracking-wide mt-1">
                    {m.label}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {m.sub}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Detailed Narrative + Pillars */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-4 text-base md:text-lg">
              <p>
                Senior IT Infrastructure &amp; Service Operations Leader with over <strong className="text-foreground font-semibold">22 years of enterprise experience</strong> across retail operations, enterprise consulting (IBM &amp; Accenture), and technical support services. Proven expertise in IT Service Management (ITIL/ITSM), enterprise IT asset lifecycles (10,000+ assets), and modernizing enterprise infrastructure across hybrid cloud, SAP, Salesforce, and Zero Trust cybersecurity architectures.
              </p>
              <p>
                Track record of managing complex multi-site operations, overseeing enterprise ServiceDesk operations, enforcing strict SLA compliance, and leading infrastructure modernizations with zero data loss. Extensive hands-on and governance experience across high-availability architectures, cloud platforms, and cybersecurity frameworks.
              </p>
              <p className="text-base text-muted-foreground/90">
                Collaborative leadership style with deep experience building resilient operational models, managing tier-one partners (IBM, Dell &amp; Accenture), and automating infrastructure workflows to enhance reliability, visibility, and business agility.
              </p>
            </div>

            {/* Strategic Pillars List */}
            <div className="pt-6 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
              {corePillars.map((item) => (
                <div
                  key={item.title}
                  className="p-4 border border-border bg-card/60 rounded-sm hover:border-accent/40 transition-colors"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <item.icon className="text-accent shrink-0" size={18} />
                    <h3 className="font-semibold text-foreground text-sm font-display tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
