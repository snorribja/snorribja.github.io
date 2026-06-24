import {
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';

const ExperienceSection = lazy(() => import('@/components/ExperienceSection'));
const SkillsSection = lazy(() => import('@/components/SkillsSection'));
const PortfolioSection = lazy(() => import('@/components/PortfolioSection'));
const EducationSection = lazy(() => import('@/components/EducationSection'));

function LazySection({
  id,
  minHeight,
  children,
}: {
  id: string;
  minHeight: number;
  children: ReactNode;
}) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldLoad) return;

    const node = ref.current;
    if (!node || !('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '350px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldLoad]);

  const fallback = <div aria-hidden="true" style={{ minHeight }} />;

  return (
    <div id={id} ref={ref}>
      {shouldLoad ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}
    </div>
  );
}

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <LazySection id="experience" minHeight={760}>
          <ExperienceSection id={undefined} />
        </LazySection>
        <LazySection id="skills" minHeight={560}>
          <SkillsSection id={undefined} />
        </LazySection>
        <LazySection id="portfolio" minHeight={760}>
          <PortfolioSection id={undefined} />
        </LazySection>
        <LazySection id="education" minHeight={720}>
          <EducationSection id={undefined} />
        </LazySection>
      </main>
      <Footer />
    </div>
  );
}
