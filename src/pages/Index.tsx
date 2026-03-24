import SplashCursor from '@/components/SplashCursor';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ExperienceSection from '@/components/ExperienceSection';
import SkillsSection from '@/components/SkillsSection';
import PortfolioSection from '@/components/PortfolioSection';
import EducationSection from '@/components/EducationSection';
import Footer from '@/components/Footer';

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <SplashCursor
        DENSITY_DISSIPATION={6}
        VELOCITY_DISSIPATION={4}
        SPLAT_RADIUS={0.12}
        SPLAT_FORCE={4000}
        COLOR_UPDATE_SPEED={10}
        TRANSPARENT
      />
      <Navbar />
      <main>
        <HeroSection />
        <ExperienceSection />
        <SkillsSection />
        <PortfolioSection />
        <EducationSection />
      </main>
      <Footer />
    </div>
  );
}
