import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Award, CheckCircle } from "lucide-react";

interface CredentialItem {
  code: string;
  title: string;
  domain: string;
  issuer: string;
}

const credentials: CredentialItem[] = [
  {
    code: "ITIL-INT",
    title: "ITIL Intermediate",
    domain: "Service Operations",
    issuer: "AXELOS / ITIL",
  },
  {
    code: "ITIL-V3",
    title: "ITIL V3 Foundation",
    domain: "IT Service Management",
    issuer: "AXELOS / ITIL",
  },
  {
    code: "VMW-6.5",
    title: "VMware vSphere 6.5",
    domain: "Virtualization & Cloud Foundations",
    issuer: "VMware",
  },
  {
    code: "MCITP",
    title: "MCITP Enterprise",
    domain: "Microsoft Windows Server Infrastructure",
    issuer: "Microsoft",
  },
  {
    code: "MS-EXCH",
    title: "Microsoft Exchange Certified",
    domain: "Enterprise Messaging & Collaboration",
    issuer: "Microsoft",
  },
  {
    code: "LEAD-2024",
    title: "LEAD Program",
    domain: "Leadership Excellence & Development",
    issuer: "upGrad Enterprise (2024)",
  },
];

const CertificationsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="certifications" className="section-padding bg-background border-b border-border/80 scroll-mt-16">
      <div className="container mx-auto max-w-7xl" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10 pb-4 border-b border-border/60"
        >
          <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
            05 / CREDENTIALS
          </span>
          <span className="h-[1px] w-12 bg-accent/40" />
          <span className="text-xs uppercase font-mono tracking-wider text-muted-foreground">
            Certifications &amp; Executive Credentials
          </span>
        </motion.div>

        {/* Compact Horizontal Rows Table */}
        <div className="border border-border bg-card divide-y divide-border">
          {credentials.map((cert, i) => (
            <motion.div
              key={cert.code}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.08 * i, duration: 0.4 }}
              className="px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-muted/30 transition-colors"
            >
              {/* Left: Code badge & Title */}
              <div className="flex items-center gap-4">
                <span className="font-mono text-[11px] font-bold text-accent bg-accent/10 px-2 py-1 rounded-xs shrink-0">
                  {cert.code}
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-display font-bold text-foreground">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-muted-foreground sm:hidden">
                    {cert.domain} &bull; {cert.issuer}
                  </p>
                </div>
              </div>

              {/* Middle: Domain Specialization */}
              <div className="hidden sm:block text-xs font-mono text-muted-foreground">
                <span>{cert.domain}</span>
              </div>

              {/* Right: Issuer & Verified */}
              <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-mono">
                <span className="text-foreground/80 font-medium">{cert.issuer}</span>
                <span className="inline-flex items-center gap-1 text-[11px] text-foreground bg-muted border border-border/80 px-2 py-0.5 rounded-xs">
                  <CheckCircle size={11} />
                  <span>Verified</span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
