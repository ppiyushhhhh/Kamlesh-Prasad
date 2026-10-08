import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProfileSection from "@/components/ProfileSection";
import ExperienceSection from "@/components/ExperienceSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import AchievementsSection from "@/components/AchievementsSection";
import CertificationsSection from "@/components/CertificationsSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { lazy, Suspense } from "react";

const ChatWidget = lazy(() => import("@/components/ChatWidget"));

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-background text-foreground antialiased selection:bg-accent selection:text-white">
      <Navbar />
      <main>
        <HeroSection />
        <ProfileSection />
        <ExperienceSection />
        <ExpertiseSection />
        <AchievementsSection />
        <CertificationsSection />
        <EducationSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </div>
  );
};

export default Index;
