import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ChevronDown,
  Building2,
  Images,
  ExternalLink,
} from "lucide-react";
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

interface AwardEntry {
  id: string;
  year: string;
  date: string;
  title: string;
  category: string;
  organization: string;
  sortKey: string;
  description: string;
  images: AwardImage[];
}

const ledgerAwards: AwardEntry[] = [
  {
    id: "devops-security-expert-2026",
    year: "2026",
    date: "2026",
    title: "DevOps Security Expert of the Year",
    category: "DevSecOps & CISO",
    organization: "DevOps 2.0 Confex & Awards 2026 (Mumbai)",
    sortKey: "2026-05",
    description:
      'Recognized as "DevOps Security Expert of the Year" at the DevOps 2.0 Confex & Awards 2026 - Mumbai Chapter, held at ITC Maratha. Celebrating leadership in building secure, scalable, and modern digital platforms at Nexus Select Malls.',
    images: [
      { src: devopsSecurity2026Img, alt: "DevOps Security Expert of the Year - DevOps 2.0 Confex & Awards 2026" },
    ],
  },
  {
    id: "digital-retail-guardian",
    year: "2026",
    date: "April 2026",
    title: "Digital Retail Guardian Award",
    category: "Cybersecurity Defense",
    organization: "CyberSec India Expo & Awards 2026",
    sortKey: "2026-04",
    description:
      "Awarded for excellence in safeguarding digital retail infrastructure and leadership in enterprise cybersecurity.",
    images: [
      { src: trophyImg, alt: "Digital Retail Guardian Award trophy" },
      { src: stageImg, alt: "On stage at CyberSec India Awards 2026" },
      { src: ceremonyImg, alt: "Receiving the award at CyberSec India Expo 2026" },
    ],
  },
  {
    id: "dell-tech-world-2025",
    year: "2025",
    date: "May 2025",
    title: "Dell Technologies World 2025 – Invited Delegate",
    category: "Global Technology Summit",
    organization: "Dell Technologies (The Venetian, Las Vegas)",
    sortKey: "2025-05",
    description:
      "Privileged to be invited by Dell Technologies to attend Dell Tech World 2025 at The Venetian Resort, Las Vegas - engaging with global leaders on the future of enterprise technology, AI, and infrastructure innovation.",
    images: [
      { src: dellTechWorld2025Img1, alt: "Dell Technologies World 2025 at The Venetian Resort, Las Vegas" },
      { src: dellTechWorld2025Img2, alt: "Attending Dell Tech World 2025" },
    ],
  },
  {
    id: "appdevsec-best-grc-strategy",
    year: "2025",
    date: "2025",
    title: "Best GRC Strategy for DevSecOps (Retail)",
    category: "GRC & Governance",
    organization: "AppDevSec Show 2025 by Quantic",
    sortKey: "2025-06",
    description:
      "Awarded at the AppDevSec Show 2025, organized by Quantic, for the Best GRC Strategy for DevSecOps in Retail - recognizing Nexus Select Malls' leadership in embedding governance, risk, and compliance into modern DevSecOps practices.",
    images: [
      { src: appdevsecTrophyImg, alt: "Best GRC Strategy for DevSecOps trophy - AppDevSec Show 2025" },
      { src: appdevsecStage1Img, alt: "Receiving the Best GRC Strategy for DevSecOps award on stage" },
      { src: appdevsecStage2Img, alt: "Acceptance speech at AppDevSec Show 2025" },
    ],
  },
  {
    id: "best-cybersec-mgmt-initiative",
    year: "2025",
    date: "2025",
    title: "Best Cybersecurity Management Initiative",
    category: "InfoSec Architecture",
    organization: "2nd Edition CyberSec Innovation Summit & Awards",
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
    id: "nexus-select-malls-7-years",
    year: "2025",
    date: "March 2025",
    title: "Nexus Select Malls – 7 Years Leadership Milestone",
    category: "Executive Tenure",
    organization: "Nexus Select Malls",
    sortKey: "2025-03",
    description:
      "Celebrating seven years of dedicated service and leadership at Nexus Select Malls, contributing to sustained operational excellence, scale from 2 to 20+ malls, and team success.",
    images: [
      { src: nexus7Years1Img, alt: "Seven years completion recognition at Nexus Select Malls" },
      { src: nexus7Years2Img, alt: "Nexus Select Malls 7 years milestone celebration" },
    ],
  },
  {
    id: "best-tech-implementation-2024",
    year: "2024",
    date: "2024",
    title: "Best Technology Implementation of the Year",
    category: "Enterprise Transformation",
    organization: "7th Edition CIO Conclave & Awards (UBS Forums)",
    sortKey: "2024-06",
    description:
      'Nominated and recognized for "Best Technology Implementation of the Year" at the 7th Edition of CIO Conclave & Awards 2024 by UBS Forums. Honored by jury members for high-scale enterprise execution.',
    images: [
      { src: bestTechImpl2024Img1, alt: "Best Technology Implementation of the Year - CIO Conclave & Awards 2024" },
      { src: bestTechImpl2024Img2, alt: "On stage at the 7th Edition CIO Conclave & Awards 2024" },
      { src: bestTechImpl2024Img3, alt: "Receiving the Best Technology Implementation award" },
      { src: bestTechImpl2024Img4, alt: "CIO Conclave & Awards 2024 ceremony" },
    ],
  },
  {
    id: "nexus-one-heroes",
    year: "2024",
    date: "July 2024",
    title: "Nexus One Heroes Award",
    category: "Internal Recognition",
    organization: "Nexus Malls Executive Committee",
    sortKey: "2024-07",
    description:
      'Recognized as a "Nexus One Hero" for leadership, dedication, and driving digital excellence across 13 properties and 400,000+ app users.',
    images: [
      { src: nexusCertImg, alt: "Nexus One Heroes certificate" },
      { src: nexusPres1Img, alt: "Receiving the Nexus One Heroes recognition" },
      { src: nexusPres2Img, alt: "Nexus One Heroes recognition presentation" },
    ],
  },
  {
    id: "upgrad-leadership-excellence",
    year: "2024",
    date: "July 2024",
    title: "Lightspeed Learner – Leadership Excellence Program",
    category: "Executive Development",
    organization: "upGrad Enterprise & Nexus Quest",
    sortKey: "2024-07",
    description:
      "Certificate of Appreciation from upGrad Enterprise & Nexus Quest for being the Lightspeed Learner in the Leadership Excellence and Development Program - recognized for exceptional dedication and rapid mastery.",
    images: [
      { src: upgradCertImg, alt: "upGrad Enterprise Certificate of Appreciation - Lightspeed Learner" },
      { src: upgradCeremonyImg, alt: "Receiving the Leadership Excellence and Development Program certificate" },
    ],
  },
  {
    id: "quantic-it-infra-leader",
    year: "2023",
    date: "2023",
    title: "IT Infrastructure Leader of the Year (Retail)",
    category: "Infrastructure Leadership",
    organization: "2nd Annual Cyber Security Excellence Awards (Quantic)",
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
];

type LightboxState = { awardIndex: number; imageIndex: number } | null;

const AchievementsSection = () => {
  // Open the first award by default in the ledger
  const [expandedId, setExpandedId] = useState<string | null>("devops-security-expert-2026");
  const [yearFilter, setYearFilter] = useState<string>("ALL");
  const [lightbox, setLightbox] = useState<LightboxState>(null);

  const years = ["ALL", "2026", "2025", "2024", "2023"];

  const filteredAwards = yearFilter === "ALL"
    ? ledgerAwards
    : ledgerAwards.filter((a) => a.year === yearFilter);

  const toggleRow = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const openLightbox = (awardIndex: number, imageIndex: number) => {
    setLightbox({ awardIndex, imageIndex });
  };

  const closeLightbox = () => setLightbox(null);

  const currentLightboxImages = lightbox !== null ? filteredAwards[lightbox.awardIndex]?.images || [] : [];

  const nextLightboxImage = () => {
    if (!lightbox) return;
    const total = currentLightboxImages.length;
    setLightbox({ ...lightbox, imageIndex: (lightbox.imageIndex + 1) % total });
  };

  const prevLightboxImage = () => {
    if (!lightbox) return;
    const total = currentLightboxImages.length;
    setLightbox({ ...lightbox, imageIndex: (lightbox.imageIndex - 1 + total) % total });
  };

  return (
    <section
      id="achievements"
      tabIndex={-1}
      className="section-padding bg-section-alt border-b border-border/80 scroll-mt-16 focus:outline-none"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 pb-4 border-b border-border/60">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
                04 / RECOGNITION
              </span>
              <span className="h-[1px] w-12 bg-accent/40" />
              <span className="text-xs uppercase font-mono tracking-wider text-muted-foreground">
                Chronological Executive Ledger
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-foreground tracking-tight">
              Honors, Summits &amp; Industry Awards
            </h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-xl">
              Chronological record of verified industry honors, global invitations, and executive leadership achievements (2026 &mdash; 2023).
            </p>
          </div>

          {/* Year Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-card border border-border rounded-sm self-start md:self-auto">
            {years.map((yr) => (
              <button
                key={yr}
                type="button"
                onClick={() => setYearFilter(yr)}
                className={`px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors ${
                  yearFilter === yr
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>

        {/* The Chronological Ledger Table */}
        <div className="border border-border bg-card divide-y divide-border shadow-xs">
          {filteredAwards.map((award, index) => {
            const isExpanded = expandedId === award.id;

            return (
              <div
                key={award.id}
                className={`transition-colors duration-200 ${
                  isExpanded ? "bg-muted/30" : "hover:bg-muted/20"
                }`}
              >
                {/* Ledger Summary Header Row */}
                <button
                  type="button"
                  onClick={() => toggleRow(award.id)}
                  aria-expanded={isExpanded}
                  className="w-full text-left px-5 sm:px-7 py-4.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 focus-visible:outline-none focus-visible:bg-muted/30"
                >
                  {/* Left Column: Year + Domain Badge */}
                  <div className="flex items-center gap-3 shrink-0 md:w-44">
                    <span className="font-mono text-xs font-bold text-foreground bg-muted border border-border/80 px-2.5 py-1 rounded-xs tracking-wider">
                      {award.year}
                    </span>
                    <span className="font-mono text-[11px] text-muted-foreground tracking-wide uppercase truncate max-w-[120px]">
                      {award.category}
                    </span>
                  </div>

                  {/* Middle Column: Award Title & Issuer */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-display font-bold text-foreground leading-snug">
                      {award.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
                      <Building2 size={13} className="shrink-0 text-muted-foreground" />
                      <span className="truncate">{award.organization}</span>
                    </p>
                  </div>

                  {/* Right Column: Photo Proof Stack + Expand Indicator */}
                  <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-border/40">
                    {/* Overlapping thumbnail stack preview */}
                    <div className="flex items-center -space-x-2 overflow-hidden">
                      {award.images.slice(0, 3).map((img, i) => (
                        <div
                          key={i}
                          className="w-9 h-9 rounded-xs border-2 border-card bg-zinc-950 overflow-hidden shrink-0 shadow-xs flex items-center justify-center p-0.5"
                        >
                          <img
                            src={img.src}
                            alt=""
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </div>
                      ))}
                      {award.images.length > 1 && (
                        <span className="pl-3 font-mono text-[11px] text-foreground font-semibold flex items-center gap-1">
                          <Images size={12} />
                          <span>{award.images.length} photos</span>
                        </span>
                      )}
                    </div>

                    {/* Chevron toggle */}
                    <div
                      className={`w-7 h-7 border border-border flex items-center justify-center transition-transform duration-300 text-muted-foreground ${
                        isExpanded ? "rotate-180 bg-foreground text-background border-foreground" : "bg-card"
                      }`}
                    >
                      <ChevronDown size={15} />
                    </div>
                  </div>
                </button>

                {/* Expanded Dossier Drawer */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden border-t border-border/80 bg-muted/15"
                    >
                      <div className="px-5 sm:px-7 py-6 md:py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Gallery Grid of Proof Imagery */}
                        <div className="lg:col-span-7">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {award.images.map((img, imgIdx) => (
                              <div
                                key={imgIdx}
                                className={`relative group border border-border/80 bg-zinc-950/95 overflow-hidden cursor-pointer rounded-xs flex items-center justify-center p-2.5 transition-all duration-300 hover:border-zinc-500 hover:shadow-xl ${
                                  award.images.length === 1
                                    ? "sm:col-span-2 min-h-[300px] sm:min-h-[380px] max-h-[500px]"
                                    : "min-h-[240px] sm:min-h-[290px] max-h-[380px]"
                                }`}
                                onClick={() => openLightbox(index, imgIdx)}
                                title="Click to view photo in full view"
                              >
                                {/* Ambient blur background for premium visual aesthetics */}
                                <img
                                  src={img.src}
                                  alt=""
                                  aria-hidden="true"
                                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-20 scale-125 pointer-events-none select-none"
                                />
                                {/* Sharp, fully visible auto-fitted photo */}
                                <img
                                  src={img.src}
                                  alt={img.alt}
                                  className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] drop-shadow-md select-none"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 z-20 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-mono text-xs backdrop-blur-[1px]">
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/85 border border-white/20 rounded-xs shadow-lg font-semibold">
                                    <Maximize2 size={13} />
                                    <span>View Full Photo</span>
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Citation & Official Narrative */}
                        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-5">
                          <div className="space-y-3">
                            <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold text-foreground tracking-widest uppercase">
                              <Trophy size={13} />
                              <span>OFFICIAL CITATION // {award.year}</span>
                            </div>

                            <h4 className="text-xl font-display font-black text-foreground leading-tight">
                              {award.title}
                            </h4>

                            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                              <Calendar size={13} className="text-muted-foreground" />
                              <span>{award.date}</span>
                              <span className="text-border">|</span>
                              <span>{award.organization}</span>
                            </div>

                            <p className="text-sm text-muted-foreground leading-relaxed pt-2 border-t border-border/60">
                              {award.description}
                            </p>
                          </div>

                          <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                            <button
                              type="button"
                              onClick={() => openLightbox(index, 0)}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background font-mono text-xs font-bold uppercase tracking-wider rounded-sm hover:opacity-90 transition-opacity"
                            >
                              <Maximize2 size={13} />
                              <span>View Full Size ({award.images.length})</span>
                            </button>

                            <span className="font-mono text-[10px] text-muted-foreground uppercase">
                              Verified Honor Proof
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={lightbox !== null} onOpenChange={(open) => !open && closeLightbox()}>
        <DialogContent className="max-w-6xl w-[96vw] max-h-[96vh] p-0 bg-zinc-950/95 backdrop-blur-xl border-zinc-800 text-white [&>button]:hidden shadow-2xl flex flex-col overflow-hidden">
          {lightbox !== null && (
            <div className="relative flex flex-col justify-between h-full min-h-[70vh] max-h-[92vh]">
              {/* Header Bar */}
              <div className="px-5 py-3.5 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between z-10 font-mono text-xs">
                <span className="text-zinc-200 font-semibold truncate max-w-[70%]">
                  {currentLightboxImages[lightbox.imageIndex]?.alt || "Honor & Achievement Photo"}
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-zinc-400 font-mono text-xs">
                    {lightbox.imageIndex + 1} of {currentLightboxImages.length}
                  </span>
                  <button
                    onClick={closeLightbox}
                    aria-label="Close"
                    className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xs transition-colors border border-zinc-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Main Image Viewport with full contain auto-fit */}
              <div className="relative flex-1 flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-black/75">
                <img
                  src={currentLightboxImages[lightbox.imageIndex]?.src}
                  alt={currentLightboxImages[lightbox.imageIndex]?.alt || ""}
                  className="max-h-[78vh] w-auto max-w-full object-contain rounded-xs shadow-2xl transition-all select-none"
                />
              </div>

              {/* Navigation Arrows */}
              {currentLightboxImages.length > 1 && (
                <>
                  <button
                    onClick={prevLightboxImage}
                    aria-label="Previous image"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-zinc-800 text-white p-3 transition-colors border border-zinc-700 rounded-sm z-20 shadow-xl"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    onClick={nextLightboxImage}
                    aria-label="Next image"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/80 hover:bg-zinc-800 text-white p-3 transition-colors border border-zinc-700 rounded-sm z-20 shadow-xl"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}

              {/* Caption Footer */}
              <div className="px-5 py-3.5 bg-zinc-900/90 border-t border-zinc-800 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400 truncate max-w-[75%]">
                  {currentLightboxImages[lightbox.imageIndex]?.alt}
                </span>
                <span className="text-white font-bold tracking-wider">
                  Verified Honor Proof
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
