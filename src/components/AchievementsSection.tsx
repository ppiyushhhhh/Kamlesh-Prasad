import { motion } from "framer-motion";
import { Calendar, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import trophyImg from "@/assets/award-cybersec-trophy.jpeg";
import ceremonyImg from "@/assets/award-cybersec-ceremony.jpeg";
import stageImg from "@/assets/award-cybersec-stage.jpeg";

const award = {
  title: "Digital Retail Guardian Award 2026",
  date: "April 2026",
  description:
    "Awarded to Nexus Select Malls at the CyberSec India Awards 2026 for excellence in safeguarding digital retail infrastructure and demonstrating leadership in enterprise cybersecurity and risk management.",
  images: [
    { src: trophyImg, alt: "Digital Retail Guardian Award trophy" },
    { src: stageImg, alt: "On stage at CyberSec India Awards 2026" },
    { src: ceremonyImg, alt: "Receiving the award at CyberSec India Expo 2026" },
  ],
};

const AchievementsSection = () => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () =>
    setLightboxIndex((i) => (i === null ? 0 : (i + 1) % award.images.length));
  const prevImage = () =>
    setLightboxIndex((i) =>
      i === null ? 0 : (i - 1 + award.images.length) % award.images.length,
    );

  return (
    <section id="achievements" className="section-padding bg-section-alt">
      <div className="container mx-auto max-w-5xl">
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

        <motion.article
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-card border border-border rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:border-accent/40 transition-all duration-300"
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Carousel */}
            <div className="relative bg-muted">
              <Carousel
                setApi={setApi}
                opts={{ loop: true, align: "start" }}
                className="w-full h-full"
              >
                <CarouselContent className="ml-0">
                  {award.images.map((img, idx) => (
                    <CarouselItem key={idx} className="pl-0">
                      <button
                        type="button"
                        onClick={() => openLightbox(idx)}
                        className="block w-full aspect-[4/3] md:aspect-auto md:h-full overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        aria-label={`View ${img.alt}`}
                      >
                        <img
                          src={img.src}
                          alt={img.alt}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </button>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-3 bg-background/80 backdrop-blur border-border hover:bg-background" />
                <CarouselNext className="right-3 bg-background/80 backdrop-blur border-border hover:bg-background" />
              </Carousel>

              {/* Thumbnails */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {award.images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => api?.scrollTo(idx)}
                    aria-label={`Go to image ${idx + 1}`}
                    className="w-2 h-2 rounded-full bg-white/60 hover:bg-white transition-colors"
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-xs text-accent font-medium mb-3">
                <Calendar size={14} />
                <span>{award.date}</span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-4 leading-snug">
                {award.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {award.description}
              </p>
              <button
                type="button"
                onClick={() => openLightbox(0)}
                className="self-start text-sm font-medium text-accent hover:text-accent/80 transition-colors inline-flex items-center gap-1"
              >
                View More Photos →
              </button>
            </div>
          </div>
        </motion.article>
      </div>

      {/* Lightbox */}
      <Dialog open={lightboxIndex !== null} onOpenChange={(open) => !open && closeLightbox()}>
        <DialogContent className="max-w-5xl w-[95vw] p-0 bg-background border-border [&>button]:hidden">
          {lightboxIndex !== null && (
            <div className="relative">
              <img
                src={award.images[lightboxIndex].src}
                alt={award.images[lightboxIndex].alt}
                className="w-full h-auto max-h-[85vh] object-contain bg-black"
              />
              <button
                onClick={closeLightbox}
                aria-label="Close"
                className="absolute top-3 right-3 bg-background/80 backdrop-blur rounded-full p-2 hover:bg-background transition-colors"
              >
                <X size={20} />
              </button>
              <button
                onClick={prevImage}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur rounded-full p-2 hover:bg-background transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur rounded-full p-2 hover:bg-background transition-colors"
              >
                <ChevronRight size={20} />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-center">
                <p className="text-white text-sm">
                  {award.images[lightboxIndex].alt} ({lightboxIndex + 1}/{award.images.length})
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default AchievementsSection;
