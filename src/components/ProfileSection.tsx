import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Server, Building2, Rocket } from "lucide-react";

const ProfileSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const metrics = [
    { value: "22+", label: "Years Experience", sub: "Enterprise IT & Security" },
    { value: "20+", label: "Malls Scaled", sub: "From 2 to 20+ Properties" },
    { value: "98%", label: "Cloud Compute", sub: "SaaS, PaaS, IaaS Architecture" },
    { value: "100%", label: "SSO Deployed", sub: "Zero Data Loss Migrations" },
  ];

  const corePillars = [
    {
      icon: Shield,
      title: "Cyber Security & Risk Governance",
      desc: "CISO leadership, SIEM/EDR, Zscaler, 4 VAPT cycles, and DPDP Act 2023 readiness.",
    },
    {
      icon: Server,
      title: "Enterprise Infrastructure at Scale",
      desc: "3-Tier DC/DR/NDR, hybrid cloud architectures, MPLS networks, and high-availability systems.",
    },
    {
      icon: Building2,
      title: "Multi-Industry Domain Leadership",
      desc: "12+ years in Retail/REIT, 8 years in IBM & Accenture, and Global Enterprise Delivery.",
    },
    {
      icon: Rocket,
      title: "Strategic Transformation & M&A",
      desc: "Post-merger IT integrations, vendor contracts (IBM, Dell & Accenture), and IT roadmaps.",
    },
  ];

  return (
    <section id="profile" className="section-padding bg-background border-b border-border/80 scroll-mt-16">
      <div className="container mx-auto max-w-7xl" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
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
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-foreground tracking-tight leading-[1.1] mb-6">
                Technology leadership focused on cybersecurity, infrastructure, and enterprise transformation.
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-8">
                Partnering with CXOs, boards, and global technology teams to align technological direction with business resilience and measurable growth.
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
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-4 text-base md:text-lg">
              <p>
                Senior IT Leader with over <strong className="text-foreground font-semibold">22+ years&apos; experience</strong>, including 12+ years in Retail &amp; Real Estate, 8 years in IBM &amp; Accenture, and 4 years in Technical Support Services for India &amp; USA. In the last 8 years, played pivotal leadership roles in Digital Transformation, IT Security, Merger IT Integration, Data &amp; Analytics, and Business Support Services.
              </p>
              <p>
                Effective at partnering with CXOs, senior leaders &amp; global partners to understand strategic goals and provide technological direction &amp; IT roadmaps. Proven track record leading the delivery of innovative, cost-effective solutions leveraging emerging technologies while maintaining an uncompromising security posture.
              </p>
              <p className="text-base text-muted-foreground/90">
                Collaborative leadership style with experience building and mentoring cross-functional teams that execute with rigor. Diversified IT Delivery &amp; Operations model experience managing tier-one technology partners including IBM, Dell &amp; Accenture.
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
