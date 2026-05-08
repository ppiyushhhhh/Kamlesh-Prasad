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
import { Linkedin } from "lucide-react";

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
        <div className="mt-2 flex flex-col sm:flex-row items-center justify-center gap-1.5 text-primary-foreground/40 text-xs">
          <span>Website developed by Piyush Prasad</span>
          <a
            href="https://www.linkedin.com/in/ppiyushhhh"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Piyush Prasad on LinkedIn"
            className="inline-flex items-center gap-1 text-primary-foreground/50 hover:text-accent transition-colors duration-200 hover:scale-105 transform"
          >
            <Linkedin size={14} />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Index;
