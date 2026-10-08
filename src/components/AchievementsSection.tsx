import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award as AwardIcon, Calendar, X, ChevronLeft, ChevronRight, Maximize2, Trophy } from "lucide-react";
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
  sortKey: string;
  description: string;
  images: AwardImage[];
};

const awardsData: Award[] = [
  {
    id: "devops-security-expert-2026",
    title: "DevOps Security Expert of the Year - DevOps 2.0 Confex & Awards 2026",
    date: "2026",
    sortKey: "2026-05",
    description:
      "Recognized as \"DevOps Security Expert of the Year\" at the DevOps 2.0 Confex & Awards 2026 - Mumbai Chapter, held at ITC Maratha. A proud moment celebrating leadership in building secure, scalable, and modern digital platforms at Nexus Select Malls.",
    images: [
      { src: devopsSecurity2026Img, alt: "DevOps Security Expert of the Year - DevOps 2.0 Confex & Awards 2026" },
    ],
  },
  {
    id: "dell-tech-world-2025",
    title: "Dell Technologies World 2025 - Invited Attendee",
    date: "May 2025",
    sortKey: "2025-05",
    description:
      "Privileged to be invited by Dell Technologies to attend Dell Tech World 2025 at The Venetian Resort, Las Vegas - engaging with global leaders on the future of enterprise technology, AI, and infrastructure innovation.",
    images: [
      { src: dellTechWorld2025Img1, alt: "Dell Technologies World 2025 at The Venetian Resort, Las Vegas" },
      { src: dellTechWorld2025Img2, alt: "Attending Dell Tech World 2025" },
    ],
  },
  {
    id: "best-tech-implementation-2024",
    title: "Best Technology Implementation of the Year - CIO Conclave & Awards 2024",
    date: "2024",
    sortKey: "2024-06",
    description:
      "Nominated and recognized for \"Best Technology Implementation of the Year\" at the 7th Edition of CIO Conclave & Awards 2024 by UBS Forums. Grateful to Omesh Bhujbal for the unwavering support and to the Jury Members for this proud moment.",
    images: [
      { src: bestTechImpl2024Img1, alt: "Best Technology Implementation of the Year - CIO Conclave & Awards 2024" },
      { src: bestTechImpl2024Img2, alt: "On stage at the 7th Edition CIO Conclave & Awards 2024" },
      { src: bestTechImpl2024Img3, alt: "Receiving the Best Technology Implementation award" },
      { src: bestTechImpl2024Img4, alt: "CIO Conclave & Awards 2024 ceremony" },
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
    title: "Nexus Select Malls - Seven Years Completed",
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
    title: "Best Cybersecurity Management Initiative - Nexus Select Malls",
    date: "2025",
    sortKey: "2025-06",
    description:
      "Honored at the 2nd Edition CyberSec Innovation Summit & Awards 2025 for spearheading the Best Cybersecurity Management Initiative at Nexus Select Malls.",
    images: [
      { src: cybersecMgmtTrophy, alt: "Best Cybersecurity Management Initiative trophy - CyberSec Awards 2025" },
      { src: cybersecMgmtStage, alt: "Receiving the Best Cybersecurity Management Initiative award on stage" },
      { src: cybersecMgmtStage1, alt: "On stage at the CyberSec Innovation Summit & Awards 2025" },
      { src: cybersecMgmtStage3, alt: "Award presentation at CyberSec Innovation Summit & Awards 2025" },
    ],
  },
  {
    id: "upgrad-leadership-excellence",
    title: "Lightspeed Learner - Leadership Excellence & Development Program",
    date: "July 2024",
    sortKey: "2024-07",
    description:
      "Certificate of Appreciation from upGrad Enterprise & Nexus Quest for being the Lightspeed Learner in the Leadership Excellence and Development Program - recognized for exceptional dedication, enthusiasm, and rapid progress.",
    images: [
      { src: upgradCertImg, alt: "upGrad Enterprise Certificate of Appreciation - Lightspeed Learner" },
      { src: upgradCeremonyImg, alt: "Receiving the Leadership Excellence and Development Program certificate" },
    ],
  },
  {
    id: "quantic-it-infra-leader",
    title: "IT Infrastructure Leader of the Year (Retail) - Cyber Security Excellence Awards 2023",
    date: "2023",
    sortKey: "2023-06",
    description:
      "Honored at the 2nd Annual Cyber Security Excellence Awards 2023, hosted by Quantic, as IT Infrastructure Leader of the Year in the Retail category - recognizing outstanding leadership in securing and scaling enterprise IT infrastructure.",
    images: [
      { src: quanticTrophyImg, alt: "IT Infrastructure Leader of the Year trophy - Cyber Security Excellence Awards 2023" },
      { src: quanticStageImg, alt: "Receiving the IT Infrastructure Leader of the Year award on stage" },
      { src: quanticGroup1Img, alt: "Award recipients group photo at Cyber Security Excellence Awards 2023" },
      { src: quanticGroup2Img, alt: "Cyber Security Excellence Awards 2023 ceremony group photo" },
    ],
  },
  {
    id: "appdevsec-best-grc-strategy",
    title: "Best GRC Strategy for DevSecOps (Retail) - AppDevSec Show 2025",
    date: "2025",
    sortKey: "2025-06",
    description:
      "Awarded at the AppDevSec Show 2025, organized by Quantic, for the Best GRC Strategy for DevSecOps in Retail - recognizing Nexus Select Malls' leadership in embedding governance, risk, and compliance into modern DevSecOps practices.",
    images: [
      { src: appdevsecTrophyImg, alt: "Best GRC Strategy for DevSecOps trophy - AppDevSec Show 2025" },
      { src: appdevsecStage1Img, alt: "Receiving the Best GRC Strategy for DevSecOps award on stage" },
      { src: appdevsecStage2Img, alt: "Acceptance speech at AppDevSec Show 2025" },
    ],
  },
];

const awards: Award[] = [...awardsData].sort((a, b) =>
  b.sortKey.localeCompare(a.sortKey),
);

type LightboxState = { awardIndex: number; imageIndex: number } | null;

const AchievementsSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const activeAward = awards[selectedIndex] || awards[0];

  const handleSelectAward = (idx: number) => {
    setSelectedIndex(idx);
    setSelectedPhotoIndex(0);
  };

  const openLightbox = (awardIndex: number, imageIndex: number) =>
    setLightbox({ awardIndex, imageIndex });
  const closeLightbox = () => setLightbox(null);

  const currentLightboxImages = lightbox ? awards[lightbox.awardIndex].images : [];

  const nextLightboxImage = () =>
    setLightbox((s) =>
      s === null
        ? null
        : {
            ...s,
            imageIndex:
              (s.imageIndex + 1) % awards[s.awardIndex].images.length,
          },
    );

  const prevLightboxImage = () =>
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
      className="section-padding bg-section-alt border-b border-border/80 scroll-mt-16 focus:outline-none"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12 pb-4 border-b border-border/60">
          <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
            04 / RECOGNITION
          </span>
          <span className="h-[1px] w-12 bg-accent/40" />
          <span className="text-xs uppercase font-mono tracking-wider text-muted-foreground">
            Honors, Summits &amp; Industry Awards
          </span>
        </div>

        {/* Featured Award Showcase */}
        <div className="border border-border bg-card p-6 md:p-8 lg:p-10 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Large Featured Image with Gallery Switcher */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-slate-950 overflow-hidden border border-border">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${activeAward.id}-${selectedPhotoIndex}`}
                    src={activeAward.images[selectedPhotoIndex]?.src || activeAward.images[0].src}
                    alt={activeAward.images[selectedPhotoIndex]?.alt || activeAward.title}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Enlarge Trigger */}
                <button
                  type="button"
                  onClick={() => openLightbox(selectedIndex, selectedPhotoIndex)}
                  className="absolute top-3 right-3 bg-black/70 hover:bg-black text-white p-2 backdrop-blur-sm border border-white/10 transition-colors"
                  aria-label="Expand image in lightbox"
                >
                  <Maximize2 size={16} />
                </button>

                {/* Image counter indicator */}
                <div className="absolute bottom-3 left-3 bg-black/70 px-2.5 py-1 text-[11px] font-mono text-white backdrop-blur-sm border border-white/10">
                  {selectedPhotoIndex + 1} / {activeAward.images.length} Photos
                </div>
              </div>

              {/* Sub-gallery thumbnails if multiple photos exist */}
              {activeAward.images.length > 1 && (
                <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                  {activeAward.images.map((img, pIdx) => (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => setSelectedPhotoIndex(pIdx)}
                      className={`relative w-16 h-12 flex-shrink-0 border overflow-hidden transition-all ${
                        selectedPhotoIndex === pIdx
                          ? "border-accent ring-1 ring-accent"
                          : "border-border opacity-70 hover:opacity-100"
                      }`}
                      aria-label={`View photo ${pIdx + 1}`}
                    >
                      <img src={img.src} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Featured Award Information */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAward.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-accent tracking-widest uppercase">
                    <Trophy size={14} />
                    <span>FEATURED AWARD</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-foreground leading-tight tracking-tight">
                    {activeAward.title}
                  </h3>

                  <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                    <Calendar size={14} className="text-accent" />
                    <span>{activeAward.date}</span>
                    <span className="text-border">|</span>
                    <span className="text-slate-500">Executive Honor</span>
                  </div>

                  <div className="pt-2 border-t border-border/80">
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {activeAward.description}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => openLightbox(selectedIndex, selectedPhotoIndex)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white font-mono text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-accent/90 transition-colors"
                    >
                      <Maximize2 size={13} />
                      <span>View Full Gallery</span>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Select Award to Inspect ({awards.length} Total Recognitions)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {awards.map((award, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={award.id}
                  type="button"
                  onClick={() => handleSelectAward(idx)}
                  className={`text-left border p-2.5 bg-card flex flex-col justify-between transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                    isSelected
                      ? "border-accent ring-1 ring-accent bg-accent/5"
                      : "border-border hover:border-slate-400 dark:hover:border-slate-600"
                  }`}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden mb-2 bg-slate-950">
                    <img
                      src={award.images[0]?.src}
                      alt={award.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-accent/20 border border-accent pointer-events-none" />
                    )}
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] text-accent font-semibold tracking-wider mb-1">
                      {award.date}
                    </span>
                    <h4 className="text-xs font-display font-bold text-foreground line-clamp-2 leading-snug">
                      {award.title}
                    </h4>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={lightbox !== null} onOpenChange={(open) => !open && closeLightbox()}>
        <DialogContent className="max-w-5xl w-[95vw] p-0 bg-black border-slate-800 text-white [&>button]:hidden">
          {lightbox !== null && (
            <div className="relative flex flex-col justify-center min-h-[60vh] max-h-[90vh]">
              <div className="relative flex items-center justify-center p-4">
                <img
                  src={currentLightboxImages[lightbox.imageIndex]?.src}
                  alt={currentLightboxImages[lightbox.imageIndex]?.alt || ""}
                  className="max-h-[75vh] w-auto max-w-full object-contain"
                />
              </div>

              {/* Close Button */}
              <button
                onClick={closeLightbox}
                aria-label="Close"
                className="absolute top-4 right-4 bg-slate-900/80 text-white p-2.5 hover:bg-slate-800 transition-colors border border-slate-700"
              >
                <X size={18} />
              </button>

              {/* Navigation Arrows */}
              {currentLightboxImages.length > 1 && (
                <>
                  <button
                    onClick={prevLightboxImage}
                    aria-label="Previous image"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-900/80 text-white p-2.5 hover:bg-slate-800 transition-colors border border-slate-700"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextLightboxImage}
                    aria-label="Next image"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-900/80 text-white p-2.5 hover:bg-slate-800 transition-colors border border-slate-700"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Caption */}
              <div className="p-4 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300 truncate max-w-[80%]">
                  {currentLightboxImages[lightbox.imageIndex]?.alt}
                </span>
                <span className="text-accent font-bold">
                  {lightbox.imageIndex + 1} / {currentLightboxImages.length}
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default AchievementsSection;
