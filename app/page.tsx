import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import AboutMeSection from '@/components/sections/AboutMeSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import TechStackSection from '@/components/sections/TechStackSection';
import FormationSection from '@/components/sections/FormationSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <main className="bg-white">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <AboutMeSection />
      <ExperienceSection />
      <PortfolioSection />
      <TechStackSection />
      <FormationSection />
      <ContactSection />
    </main>
  );
}
