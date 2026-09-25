import { StarBackground } from "@/components/StarBackground";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { EducationSection } from "@/components/EducationSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

// El orden de acá define la numeración "01 ·" de cada sección; mantenerlo igual que NAV_LINKS en Navbar.
const SECTIONS = [
  ProjectsSection,
  ExperienceSection,
  SkillsSection,
  AboutSection,
  EducationSection,
  ContactSection,
];

export const Home = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <StarBackground />
      <Navbar />

      <main id="main">
        <HeroSection />
        {SECTIONS.map((Section, i) => (
          <Section key={i} number={String(i + 1).padStart(2, "0")} />
        ))}
      </main>

      <Footer />
    </div>
  );
};
