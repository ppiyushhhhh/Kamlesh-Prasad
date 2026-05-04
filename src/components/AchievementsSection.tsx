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
import nexusCertImg from "@/assets/award-nexus-certificate.jpeg";
import nexusPres1Img from "@/assets/award-nexus-presentation-1.jpeg";
import nexusPres2Img from "@/assets/award-nexus-presentation-2.jpeg";
import nexus7Years1Img from "@/assets/award-nexus-7years-1.jpeg";
import nexus7Years2Img from "@/assets/award-nexus-7years-2.jpeg";
import cybersecMgmtTrophy from "@/assets/award-cybersec-mgmt-trophy.png";
import cybersecMgmtStage from "@/assets/award-cybersec-mgmt-stage-2.png";
import cybersecMgmtStage1 from "@/assets/award-cybersec-mgmt-stage-1.png";
import cybersecMgmtStage3 from "@/assets/award-cybersec-mgmt-stage-3.png";
import upgradCertImg from "@/assets/award-upgrad-certificate.png";
import upgradCeremonyImg from "@/assets/award-upgrad-ceremony.jpeg";
import quanticTrophyImg from "@/assets/award-quantic-trophy.jpeg";
import quanticStageImg from "@/assets/award-quantic-stage.png";
import quanticGroup1Img from "@/assets/award-quantic-group-1.png";
import quanticGroup2Img from "@/assets/award-quantic-group-2.png";
import appdevsecTrophyImg from "@/assets/award-appdevsec-trophy.png";
import appdevsecStage1Img from "@/assets/award-appdevsec-stage-1.png";
import appdevsecStage2Img from "@/assets/award-appdevsec-stage-2.png";
import devopsSecurity2026Img from "@/assets/award-devops-security-2026.jpg";
import dellTechWorld2025Img1 from "@/assets/dell-tech-world-2025-1.jpg";
import dellTechWorld2025Img2 from "@/assets/dell-tech-world-2025-2.jpg";
import bestTechImpl2024Img1 from "@/assets/award-best-tech-impl-2024-1.jpg";
import bestTechImpl2024Img2 from "@/assets/award-best-tech-impl-2024-2.jpg";
import bestTechImpl2024Img3 from "@/assets/award-best-tech-impl-2024-3.jpg";
import bestTechImpl2024Img4 from "@/assets/award-best-tech-impl-2024-4.jpg";

type AwardImage = { src: string; alt: string };
type Award = {
  id: string;
  title: string;
  date: string;
  sortKey: string; // YYYY-MM for chronological sorting (newest first)
  description: string;
  images: AwardImage[];
};

const awardsData: Award[] = [
  {
    id: "devops-security-expert-2026",
    title: "DevOps Security Expert of the Year — DevOps 2.0 Confex & Awards 2026",
    date: "2026",
    sortKey: "2026-05",
    description:
      "Recognized as \"DevOps Security Expert of the Year\" at the DevOps 2.0 Confex & Awards 2026 — Mumbai Chapter, held at ITC Maratha. A proud moment celebrating leadership in building secure, scalable, and modern digital platforms at Nexus Select Malls.",
    images: [
      { src: devopsSecurity2026Img, alt: "DevOps Security Expert of the Year — DevOps 2.0 Confex & Awards 2026" },
    ],
  },
  {
    id: "dell-tech-world-2025",
    title: "Dell Technologies World 2025 — Invited Attendee",
    date: "May 2025",
    sortKey: "2025-05",
    description:
      "Privileged to be invited by Dell Technologies to attend Dell Tech World 2025 at The Venetian Resort, Las Vegas — engaging with global leaders on the future of enterprise technology, AI, and infrastructure innovation.",
    images: [
      { src: dellTechWorld2025Img1, alt: "Dell Technologies World 2025 at The Venetian Resort, Las Vegas" },
      { src: dellTechWorld2025Img2, alt: "Attending Dell Tech World 2025" },
    ],
  },
  {
    id: "digital-retail-guardian",
    title: "Digital Retail Guardian Award 2026",
    date: "April 2026",
    sortKey: "2026-04",
    description:
      "Awarded for excellence in safeguarding digital retail infrastructure and leadership in cybersecurity.",
    images: [
      { src: trophyImg, alt: "Digital Retail Guardian Award trophy" },
      { src: stageImg, alt: "On stage at CyberSec India Awards 2026" },
      { src: ceremonyImg, alt: "Receiving the award at CyberSec India Expo 2026" },
    ],
  },
  {
    id: "nexus-one-heroes",
    title: "Nexus One Heroes Recognition",
    date: "July 2024",
    sortKey: "2024-07",
    description:
      "Recognized as a \"Nexus One Hero\" for leadership, dedication, and contributing to organizational excellence.",
    images: [
      { src: nexusCertImg, alt: "Nexus One Heroes certificate" },
      { src: nexusPres1Img, alt: "Receiving the Nexus One Heroes recognition" },
      { src: nexusPres2Img, alt: "Nexus One Heroes recognition presentation" },
    ],
  },
  {
    id: "nexus-select-malls-7-years",
    title: "Nexus Select Malls — Seven Years Completed",
    date: "March 2025",
    sortKey: "2025-03",
    description:
      "Celebrating seven years of dedicated service and leadership at Nexus Select Malls, contributing to sustained operational excellence and team success.",
    images: [
      { src: nexus7Years1Img, alt: "Seven years completion recognition at Nexus Select Malls" },
      { src: nexus7Years2Img, alt: "Nexus Select Malls 7 years milestone celebration" },
    ],
  },
  {
    id: "best-cybersec-mgmt-initiative",
    title: "Best Cybersecurity Management Initiative — Nexus Select Malls",
    date: "2025",
    sortKey: "2025-06",
    description:
      "Honored at the 2nd Edition CyberSec Innovation Summit & Awards 2025 for spearheading the Best Cybersecurity Management Initiative at Nexus Select Malls.",
    images: [
      { src: cybersecMgmtTrophy, alt: "Best Cybersecurity Management Initiative trophy — CyberSec Awards 2025" },
      { src: cybersecMgmtStage, alt: "Receiving the Best Cybersecurity Management Initiative award on stage" },
      { src: cybersecMgmtStage1, alt: "On stage at the CyberSec Innovation Summit & Awards 2025" },
      { src: cybersecMgmtStage3, alt: "Award presentation at CyberSec Innovation Summit & Awards 2025" },
    ],
  },
  {
    id: "upgrad-leadership-excellence",
    title: "Lightspeed Learner — Leadership Excellence & Development Program",
    date: "July 2024",
    sortKey: "2024-07",
    description:
      "Certificate of Appreciation from upGrad Enterprise & Nexus Quest for being the Lightspeed Learner in the Leadership Excellence and Development Program — recognized for exceptional dedication, enthusiasm, and rapid progress.",
    images: [
      { src: upgradCertImg, alt: "upGrad Enterprise Certificate of Appreciation — Lightspeed Learner" },
      { src: upgradCeremonyImg, alt: "Receiving the Leadership Excellence and Development Program certificate" },
    ],
  },
  {
    id: "quantic-it-infra-leader",
    title: "IT Infrastructure Leader of the Year (Retail) — Cyber Security Excellence Awards 2023",
    date: "2023",
    sortKey: "2023-06",
    description:
      "Honored at the 2nd Annual Cyber Security Excellence Awards 2023, hosted by Quantic, as IT Infrastructure Leader of the Year in the Retail category — recognizing outstanding leadership in securing and scaling enterprise IT infrastructure.",
    images: [
      { src: quanticTrophyImg, alt: "IT Infrastructure Leader of the Year trophy — Cyber Security Excellence Awards 2023" },
      { src: quanticStageImg, alt: "Receiving the IT Infrastructure Leader of the Year award on stage" },
      { src: quanticGroup1Img, alt: "Award recipients group photo at Cyber Security Excellence Awards 2023" },
      { src: quanticGroup2Img, alt: "Cyber Security Excellence Awards 2023 ceremony group photo" },
    ],
  },
  {
    id: "appdevsec-best-grc-strategy",
    title: "Best GRC Strategy for DevSecOps (Retail) — AppDevSec Show 2025",
    date: "2025",
    sortKey: "2025-06",
    description:
      "Awarded at the AppDevSec Show 2025, organized by Quantic, for the Best GRC Strategy for DevSecOps in Retail — recognizing Nexus Select Malls' leadership in embedding governance, risk, and compliance into modern DevSecOps practices.",
    images: [
      { src: appdevsecTrophyImg, alt: "Best GRC Strategy for DevSecOps trophy — AppDevSec Show 2025" },
      { src: appdevsecStage1Img, alt: "Receiving the Best GRC Strategy for DevSecOps award on stage" },
      { src: appdevsecStage2Img, alt: "Acceptance speech at AppDevSec Show 2025" },
    ],
  },
];

const awards: Award[] = [...awardsData].sort((a, b) =>
  b.sortKey.localeCompare(a.sortKey),
);

type LightboxState = { awardIndex: number; imageIndex: number } | null;

const AwardCard = ({
  award,
  awardIndex,
  onOpenLightbox,
}: {
  award: Award;
  awardIndex: number;
  onOpenLightbox: (awardIndex: number, imageIndex: number) => void;
}) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

  const handleSetApi = (a: CarouselApi) => {
    setApi(a);
    if (!a) return;
    a.on("select", () => setCurrent(a.selectedScrollSnap()));
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-card border border-border rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:border-accent/40 transition-all duration-300 flex flex-col"
    >
      {/* Carousel */}
      <div className="relative bg-muted">
        <Carousel
          setApi={handleSetApi}
          opts={{ loop: true, align: "start" }}
          className="w-full"
        >
          <CarouselContent className="ml-0">
            {award.images.map((img, idx) => (
              <CarouselItem key={idx} className="pl-0">
                <button
                  type="button"
                  onClick={() => onOpenLightbox(awardIndex, idx)}
                  className="block w-full aspect-[4/3] overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {award.images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => api?.scrollTo(idx)}
              aria-label={`Go to image ${idx + 1}`}
              className={`h-2 rounded-full transition-all ${
                current === idx ? "w-6 bg-white" : "w-2 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-7 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs text-accent font-medium mb-3">
          <Calendar size={14} />
          <span>{award.date}</span>
        </div>
        <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-3 leading-snug">
          {award.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-5 flex-1">
          {award.description}
        </p>
        <button
          type="button"
          onClick={() => onOpenLightbox(awardIndex, 0)}
          className="self-start text-sm font-medium text-accent hover:text-accent/80 transition-colors inline-flex items-center gap-1"
        >
          View More Photos →
        </button>
      </div>
    </motion.article>
  );
};

const AchievementsSection = () => {
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const openLightbox = (awardIndex: number, imageIndex: number) =>
    setLightbox({ awardIndex, imageIndex });
  const closeLightbox = () => setLightbox(null);

  const currentImages = lightbox ? awards[lightbox.awardIndex].images : [];
  const nextImage = () =>
    setLightbox((s) =>
      s === null
        ? null
        : { ...s, imageIndex: (s.imageIndex + 1) % awards[s.awardIndex].images.length },
    );
  const prevImage = () =>
    setLightbox((s) =>
      s === null
        ? null
        : {
            ...s,
            imageIndex:
              (s.imageIndex - 1 + awards[s.awardIndex].images.length) %
              awards[s.awardIndex].images.length,
          },
    );

  return (
    <section
      id="achievements"
      tabIndex={-1}
      className="section-padding bg-section-alt scroll-mt-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2"
    >
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
            Industry recognition for cybersecurity leadership and organizational impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {awards.map((award, idx) => (
            <AwardCard
              key={award.id}
              award={award}
              awardIndex={idx}
              onOpenLightbox={openLightbox}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={lightbox !== null} onOpenChange={(open) => !open && closeLightbox()}>
        <DialogContent className="max-w-5xl w-[95vw] p-0 bg-background border-border [&>button]:hidden">
          {lightbox !== null && (
            <div className="relative">
              <img
                src={currentImages[lightbox.imageIndex].src}
                alt={currentImages[lightbox.imageIndex].alt}
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
                  {currentImages[lightbox.imageIndex].alt} ({lightbox.imageIndex + 1}/
                  {currentImages.length})
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
