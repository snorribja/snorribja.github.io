import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import DecryptedText from './DecryptedText';
import Ferrofluid from './Ferrofluid';
import { Download } from 'lucide-react';
import snorriFace460 from '@/assets/snorri_face_460.webp';
import snorriFace920 from '@/assets/snorri_face_920.webp';

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const ferrofluidColors = useMemo(
    () => ['#A65EED', '#9D26D9', '#C4B5FD', '#E9D5FF'],
    [],
  );

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="home"
    >
      {/* Ferrofluid background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 hero-static-bg" />
        <Ferrofluid
          colors={ferrofluidColors}
          speed={0.5}
          scale={1.6}
          turbulence={1}
          fluidity={0.1}
          rimWidth={0.2}
          sharpness={2.5}
          shimmer={1.5}
          glow={2}
          flowDirection="down"
          opacity={1}
          mouseInteraction={false}
          paused={prefersReducedMotion ?? false}
        />
      </div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: 'hsl(var(--background) / 0.6)' }}
      />

      <div className="container relative z-10 pt-24 sm:pt-28 lg:pt-24 pb-12 sm:pb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col gap-5 sm:gap-6 max-w-2xl"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-accent font-display font-semibold tracking-[0.2em] uppercase text-[11px] sm:text-sm leading-relaxed"
            >
              Research Engineer · Software Developer
            </motion.p>

            <h1 className="font-display font-extrabold leading-[0.9] tracking-tight text-primary text-5xl sm:text-6xl md:text-7xl xl:text-8xl break-words">
              <DecryptedText
                text="Snorri"
                animateOn="view"
                sequential
                revealDirection="start"
                speed={90}
                maxIterations={20}
                className="text-primary"
                encryptedClassName="text-accent opacity-60"
              />
              <br />
              <DecryptedText
                text="Bjarkason"
                animateOn="view"
                sequential
                revealDirection="start"
                speed={90}
                maxIterations={20}
                className="text-primary"
                encryptedClassName="text-accent opacity-60"
              />
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-muted-foreground text-base sm:text-lg max-w-xl leading-relaxed"
            >
              Hi, I&apos;m a passionate software engineer who loves working on
              exciting coding projects, from AI-driven sleep diagnostics to
              distributed systems and beyond.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <a
                href="/resume-snorri-bjarkason.pdf"
                download
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-full font-display font-semibold text-sm transition-all duration-300 group"
                style={{
                  background: 'hsl(var(--accent))',
                  color: 'hsl(var(--accent-foreground))',
                  boxShadow: '0 0 24px hsl(var(--accent) / 0.35)',
                }}
              >
                <Download
                  size={16}
                  className="transition-transform group-hover:-translate-y-0.5"
                />
                Download CV
              </a>

              <a
                href="#experience"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-full font-display font-semibold text-sm border transition-all duration-300 hover:border-accent hover:text-accent"
                style={{
                  borderColor: 'hsl(var(--border))',
                  color: 'hsl(var(--foreground))',
                }}
              >
                View Work
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-x-3 gap-y-2 pt-1 text-sm"
            >
              <a
                href="https://www.linkedin.com/in/snorribjarkason"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors duration-200 font-medium"
              >
                LinkedIn
              </a>
              <span className="text-muted-foreground hidden sm:inline">·</span>

              <a
                href="https://www.instagram.com/snorri03/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors duration-200 font-medium"
              >
                Instagram
              </a>
              <span className="text-muted-foreground hidden sm:inline">·</span>

              <a
                href="https://github.com/snorribja"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors duration-200 font-medium"
              >
                GitHub
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Profile photo - hidden unless there is real space */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden xl:flex justify-center items-center"
          >
            <div className="relative flex justify-center items-center">
              <div
                className="absolute blur-3xl opacity-50"
                style={{
                  width: '520px',
                  height: '520px',
                  background:
                    'radial-gradient(circle, hsl(var(--accent) / 0.6), hsl(var(--accent) / 0.2) 50%, transparent 70%)',
                }}
              />

              <div
                style={{
                  width: '460px',
                  height: '460px',
                  overflow: 'hidden',
                  borderRadius: '60% 40% 55% 45% / 50% 60% 40% 50%',
                  border: '2px solid hsl(var(--accent) / 0.45)',
                  boxShadow:
                    '0 0 80px hsl(var(--accent) / 0.3), inset 0 0 40px hsl(var(--accent) / 0.1)',
                  position: 'relative',
                }}
              >
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${snorriFace460} 460w, ${snorriFace920} 920w`}
                    sizes="460px"
                  />
                  <img
                    src="/snorri_face.png"
                    alt="Snorri Bjarkason"
                    width={920}
                    height={905}
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top',
                    }}
                  />
                </picture>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
