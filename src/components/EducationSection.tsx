import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar, Award } from "lucide-react";

const educationList = [
  {
    period: "2024",
    institution: "MIT xPRO, USA",
    degree: "Post Graduate Certificate in Cyber Security",
    details: "Executive Cybersecurity Strategy, Threat Defense & Systems Resilience",
  },
  {
    period: "2014",
    institution: "Sikkim Manipal (Open) University, India",
    degree: "MBA – Systems",
    details: "Information Systems Management, Enterprise IT Strategy & Operations",
  },
  {
    period: "Graduate",
    institution: "Madhya Pradesh Bhoj (Open) University, India",
    degree: "BSc – Graduate",
    details: "Foundational Sciences & Quantitative Studies",
  },
];

const EducationSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" className="section-padding bg-section-alt border-b border-border/80 scroll-mt-16">
      <div className="container mx-auto max-w-7xl" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10 pb-4 border-b border-border/60"
        >
          <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
            06 / EDUCATION
          </span>
          <span className="h-[1px] w-12 bg-accent/40" />
          <span className="text-xs uppercase font-mono tracking-wider text-muted-foreground">
            Academic Background &amp; Executive Credentials
          </span>
        </motion.div>

        {/* Editorial Vertical Timeline */}
        <div className="space-y-6">
          {educationList.map((edu, i) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="border-b border-border pb-6 last:border-b-0 last:pb-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                {/* Year Marker */}
                <div className="md:col-span-3">
                  <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
                    {edu.period}
                  </span>
                  <p className="text-sm font-semibold text-foreground mt-0.5">
                    {edu.institution}
                  </p>
                </div>

                {/* Degree & Focus */}
                <div className="md:col-span-9 border-l-2 border-border pl-6 relative">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-accent" />
                  <h3 className="text-lg md:text-xl font-display font-bold text-foreground mb-1">
                    {edu.degree}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground font-light">
                    {edu.details}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
