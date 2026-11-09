import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Trophy } from "lucide-react";

const awards = [
  {
    title: "Best Cybersecurity Management Initiatives",
    event: "2nd Edition Organized by Krypton",
    year: "2025",
  },
  {
    title: "Best Technology Implementation of the Year",
    event: "7th Edition of CIO Conclave by UBS Forums",
    year: "2024",
  },
  {
    title: "IT Infrastructure Leader of the Year",
    event: "2nd Annual Cyber Security Excellence by Quantic",
    year: "2023",
  },
  {
    title: "Nexus Heroes Award – IT Security",
    event: "Nexus Malls Internal Recognition",
    year: "",
  },
  {
    title: "Nexus Heroes Award – E-Waste Management",
    event: "Nexus Malls Internal Recognition",
    year: "",
  },
];

const AwardsSection = () => {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const isVisible = inView || shouldReduceMotion;

  return (
    <section id="awards" className="section-padding bg-background">
      <div className="container mx-auto max-w-5xl" ref={ref}>
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent uppercase tracking-[0.2em] text-sm font-medium mb-3">Recognition</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-10">
            Awards & Recognition
          </h2>
        </motion.div>

        <div className="space-y-4">
          {awards.map((award, i) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.1 * i, duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -4, boxShadow: "0 8px 30px -12px hsl(var(--primary) / 0.15)" }}
              className="flex items-start gap-4 bg-card border border-border rounded-lg p-6 transition-colors duration-300 hover:border-accent/40"
            >
              <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Trophy className="text-gold" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{award.title}</h3>
                <p className="text-muted-foreground text-sm">{award.event}</p>
                {award.year && <p className="text-xs text-accent font-medium mt-1">{award.year}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
