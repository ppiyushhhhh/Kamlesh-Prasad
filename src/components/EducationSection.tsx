import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap } from "lucide-react";
import mitLogo from "@/assets/logos/mit-logo.jpg";
import smuLogo from "@/assets/logos/smu-logo.jpg";

interface EducationItem {
  period: string;
  institution: string;
  degree: string;
  details: string;
  logo?: string;
  alt?: string;
}

const educationList: EducationItem[] = [
  {
    period: "2024",
    institution: "MIT xPRO, USA",
    degree: "Post Graduate Certificate in Cyber Security",
    details: "Executive Cybersecurity Strategy, Threat Defense & Systems Resilience",
    logo: mitLogo,
    alt: "MIT xPRO Logo",
  },
  {
    period: "2014",
    institution: "Sikkim Manipal (Open) University, India",
    degree: "MBA – Systems",
    details: "Information Systems Management, Enterprise IT Strategy & Operations",
    logo: smuLogo,
    alt: "Sikkim Manipal University Logo",
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
              className="border-b border-border pb-6 last:border-b-0 last:pb-0 group/edu"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                {/* Year Marker & Institution with Hoverable Logo */}
                <div className="md:col-span-4 flex items-start gap-4">
                  {/* Logo Container with Smooth Hover Interaction */}
                  {edu.logo ? (
                    <div className="relative flex-shrink-0 group/logo">
                      <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-md border border-border/80 bg-white p-1.5 flex items-center justify-center shadow-xs overflow-hidden cursor-pointer transition-all duration-300 ease-out group-hover/logo:scale-110 group-hover/logo:-translate-y-1 group-hover/logo:shadow-lg group-hover/logo:border-foreground/80 group-hover/logo:ring-2 group-hover/logo:ring-accent/20">
                        <img
                          src={edu.logo}
                          alt={edu.alt || `${edu.institution} logo`}
                          className="w-full h-full object-contain transition-transform duration-300 group-hover/logo:scale-105"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-md border border-border/80 bg-card p-1.5 flex items-center justify-center flex-shrink-0 text-muted-foreground shadow-xs">
                      <GraduationCap className="w-6 h-6 stroke-[1.5]" />
                    </div>
                  )}

                  <div className="min-w-0">
                    <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase block">
                      {edu.period}
                    </span>
                    <p className="text-sm font-semibold text-foreground mt-0.5 leading-snug">
                      {edu.institution}
                    </p>
                  </div>
                </div>

                {/* Degree & Focus */}
                <div className="md:col-span-8 border-l-2 border-border pl-6 relative">
                  <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-accent transition-transform duration-300 group-hover/edu:scale-125" />
                  <h3 className="text-lg md:text-xl font-display font-bold text-foreground mb-1 group-hover/edu:text-accent transition-colors duration-200">
                    {edu.degree}
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground font-light leading-relaxed">
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
