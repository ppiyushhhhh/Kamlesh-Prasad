import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import trophyImg from "@/assets/award-cybersec-trophy.jpeg";
import ceremonyImg from "@/assets/award-cybersec-ceremony.jpeg";
import stageImg from "@/assets/award-cybersec-stage.jpeg";

const achievements = [
  {
    title: "Digital Retail Guardian Award 2026",
    description:
      "Awarded to Nexus Select Malls at the CyberSec India Awards 2026 for excellence in safeguarding digital retail infrastructure.",
    date: "April 2026",
    image: trophyImg,
  },
  {
    title: "CyberSec India Awards 2026 — Winner",
    description:
      "Recognized on stage at the CyberSec India Expo for leadership in enterprise cybersecurity and risk management.",
    date: "April 2026",
    image: stageImg,
  },
  {
    title: "Honored at CyberSec India Expo 2026",
    description:
      "Receiving the Digital Retail Guardian trophy in front of India's leading cybersecurity community.",
    date: "April 2026",
    image: ceremonyImg,
  },
];

const AchievementsSection = () => {
  return (
    <section id="achievements" className="section-padding bg-section-alt">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-accent uppercase tracking-[0.2em] text-sm font-medium mb-3">
            Honors
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
            Awards & Achievements
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-12">
            Industry recognition for cybersecurity leadership and digital transformation impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {achievements.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.1 * i, duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="group bg-card border border-border rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:border-accent/40 transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-accent font-medium mb-2">
                  <Calendar size={14} />
                  <span>{item.date}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
