import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Languages } from "lucide-react";

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const competencies = [
    "Technology Strategy",
    "IT Security & CISO Practice",
    "Digital Transformation",
    "Enterprise IT Roadmaps",
    "Program Management",
    "Cloud Architecture",
    "Stakeholder Engagement",
    "Multi-Vendor Governance",
    "Annual IT Budgeting",
    "Risk & Compliance Management",
  ];

  const languages = [
    { name: "English", level: "Professional Working Proficiency" },
    { name: "Hindi", level: "Native / Full Professional" },
    { name: "Marathi", level: "Professional Proficiency" },
  ];

  return (
    <section id="skills" className="section-padding bg-background border-b border-border/80 scroll-mt-16">
      <div className="container mx-auto max-w-7xl" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10 pb-4 border-b border-border/60"
        >
          <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
            Competencies &amp; Communication
          </span>
          <span className="h-[1px] w-12 bg-accent/40" />
          <span className="text-xs uppercase font-mono tracking-wider text-muted-foreground">
            Strategic Skillsets
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Core Competencies */}
          <div className="lg:col-span-8 border border-border bg-card p-6 md:p-8">
            <div className="flex items-center gap-2 mb-6">
              <Cpu size={18} className="text-accent" />
              <h3 className="font-display text-base font-bold text-foreground uppercase tracking-wider">
                Leadership Competencies
              </h3>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {competencies.map((skill) => (
                <span
                  key={skill}
                  className="px-3.5 py-1.5 border border-border bg-muted/40 text-foreground font-mono text-xs hover:border-accent hover:text-accent transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="lg:col-span-4 border border-border bg-card p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Languages size={18} className="text-accent" />
                <h3 className="font-display text-base font-bold text-foreground uppercase tracking-wider">
                  Languages
                </h3>
              </div>

              <div className="space-y-4">
                {languages.map((l) => (
                  <div key={l.name} className="flex items-baseline justify-between border-b border-border/50 pb-2">
                    <span className="font-display font-semibold text-sm text-foreground">
                      {l.name}
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {l.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[11px] font-mono text-muted-foreground pt-4">
              Cross-functional &bull; Global enterprise collaboration
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
