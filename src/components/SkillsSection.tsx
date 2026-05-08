import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Globe } from "lucide-react";

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const skills = ["Technology Strategy", "IT Security", "Digital Transformation", "IT Roadmaps", "Program Management", "Cloud", "Stakeholder Engagement", "Multi-Vendor Management", "Budgeting", "Risk Management"];
  const languages = ["Hindi", "English", "Marathi"];

  return (
    <section id="skills" className="section-padding bg-section-alt">
      <div className="container mx-auto max-w-5xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent uppercase tracking-[0.2em] text-sm font-medium mb-3">Competencies</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-10">
            Skills & Languages
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -4, boxShadow: "0 8px 30px -12px hsl(var(--primary) / 0.15)" }}
            className="bg-card border border-border rounded-lg p-6 transition-colors duration-300 hover:border-accent/40"
          >
            <div className="flex items-center gap-3 mb-5">
              <Lightbulb className="text-gold" size={22} />
              <h3 className="text-lg font-semibold text-foreground">Skills</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {skills.map((s) => (
                <motion.span
                  key={s}
                  whileHover={{ y: -2, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="px-4 py-2 bg-muted rounded-md text-sm font-medium text-foreground cursor-default transition-colors duration-300 hover:bg-accent hover:text-accent-foreground hover:shadow-md"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -4, boxShadow: "0 8px 30px -12px hsl(var(--primary) / 0.15)" }}
            className="bg-card border border-border rounded-lg p-6 transition-colors duration-300 hover:border-accent/40"
          >
            <div className="flex items-center gap-3 mb-5">
              <Globe className="text-accent" size={22} />
              <h3 className="text-lg font-semibold text-foreground">Languages</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {languages.map((l) => (
                <motion.span
                  key={l}
                  whileHover={{ y: -2, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="px-4 py-2 bg-muted rounded-md text-sm font-medium text-foreground cursor-default transition-colors duration-300 hover:bg-accent hover:text-accent-foreground hover:shadow-md"
                >
                  {l}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
