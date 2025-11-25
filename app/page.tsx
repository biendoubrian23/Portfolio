import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import StatsSection from '@/components/sections/StatsSection';
import ProcessSection from '@/components/sections/ProcessSection';
import TestimonialSection from '@/components/sections/TestimonialSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <main className="bg-white">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ExperienceSection />
      <PortfolioSection />
      <StatsSection />
      <ProcessSection />
      <TestimonialSection />
      <ContactSection />
    </main>
  );
}
