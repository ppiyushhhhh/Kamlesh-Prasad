import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Server, Building2, Rocket } from "lucide-react";

const ProfileSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    { icon: Shield, label: "Cyber Security & Risk Governance" },
    { icon: Server, label: "Enterprise Infrastructure at Scale" },
    { icon: Building2, label: "Multi-Industry Domain Expertise" },
    { icon: Rocket, label: "Strategic Transformation & M&A" },
  ];

  return (
    <section id="profile" className="section-padding bg-background scroll-mt-16">
      <div className="container mx-auto max-w-5xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent uppercase tracking-[0.2em] text-sm font-medium mb-3">About</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
            Executive Profile
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Senior IT Leader with over 22+ years' experience, including 12+ years in Retail, 8 years in IBM & Accenture, and 4 years in Technical Support Services for India & USA. In the last 8 years, played leadership roles in Digital Transformation, IT Security, Merger IT Integration, Data & Analytics, IT Operations & Business Support Services programs.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            Effective at partnering with CXOs, senior leaders & partners to understand strategic goals and provide technological direction & IT roadmaps for delivering digital capabilities in alignment with business strategies. Strong business knowledge with proven ability to lead the strategic planning & delivery of innovative, cost-effective solutions by leveraging emerging technologies.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10">
            Collaborative leadership style with experience in building & leading cross-functional teams that deliver results in a highly competitive & continuously changing business landscape. Diversified IT Delivery & Operations model experience with technology partners like IBM, TCS, Wipro & Accenture.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-lg bg-muted/50"
              >
                <item.icon className="text-accent flex-shrink-0" size={22} />
                <span className="text-sm font-medium text-foreground">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProfileSection;
