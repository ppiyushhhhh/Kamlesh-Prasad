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

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ProfileSection />
      <ExperienceSection />
      <ExpertiseSection />
      <AchievementsSection />
      <CertificationsSection />
      <EducationSection />
      <SkillsSection />
      <ContactSection />
      <footer className="bg-primary py-6 text-center">
        <p className="text-primary-foreground/60 text-sm">
          © {new Date().getFullYear()} Kamlesh Prasad. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Index;
