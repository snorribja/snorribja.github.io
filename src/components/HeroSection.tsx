import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import DecryptedText from './DecryptedText';
import { Download } from 'lucide-react';
import snorriFace from '@/assets/snorri_face.png';

const Dither = lazy(() => import('./Dither'));

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" aria-label="home">
      {/* Dithered wave background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Dither
            waveColor={[0.45, 0.1, 0.9]}
            waveSpeed={0.04}
            waveFrequency={2.8}
            waveAmplitude={0.35}
            colorNum={4}
            pixelSize={2}
            enableMouseInteraction={true}
            mouseRadius={0.8}
          />
        </Suspense>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1]" style={{ background: 'hsl(var(--background) / 0.6)' }} />

      <div className="container relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col gap-6"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-accent font-display font-semibold tracking-widest uppercase text-sm"
            >
              Research Engineer · Software Developer
            </motion.p>

            <h1 className="font-display text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-none tracking-tight text-primary">
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
              className="text-muted-foreground text-lg max-w-md leading-relaxed"
            >
              Hi, I'm a passionate software engineer who loves working on exciting coding projects — from AI-driven sleep diagnostics to distributed systems and beyond.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="./resume-snorri-bjarkason.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-display font-semibold text-sm transition-all duration-300 group"
                style={{
                  background: 'hsl(var(--accent))',
                  color: 'hsl(var(--accent-foreground))',
                  boxShadow: '0 0 24px hsl(var(--accent) / 0.35)',
                }}
              >
                <Download size={16} className="transition-transform group-hover:-translate-y-0.5" />
                Download CV
              </a>

              <a
                href="#experience"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-display font-semibold text-sm border transition-all duration-300 hover:border-accent hover:text-accent"
                style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
              >
                View Work
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex gap-4 pt-2"
            >
              <a href="https://www.linkedin.com/in/snorribjarkason" target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors duration-200 text-sm font-medium">LinkedIn</a>
              <span className="text-muted-foreground">·</span>
              <a href="https://www.instagram.com/snorri03/" target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors duration-200 text-sm font-medium">Instagram</a>
              <span className="text-muted-foreground">·</span>
              <a href="https://github.com/snorribja" target="_blank" rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors duration-200 text-sm font-medium">GitHub</a>
            </motion.div>
          </motion.div>

          {/* Right: Profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative flex justify-center items-center">
              {/* Pulsing glow halo */}
              <motion.div
                className="absolute blur-3xl opacity-50"
                style={{
                  width: '520px',
                  height: '520px',
                  background: 'radial-gradient(circle, hsl(var(--accent) / 0.6), hsl(var(--accent) / 0.2) 50%, transparent 70%)',
                }}
                animate={{
                  scale: [1, 1.12, 1],
                  opacity: [0.4, 0.65, 0.4],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Blob morph container */}
              <motion.div
                animate={{
                  borderRadius: [
                    '60% 40% 55% 45% / 50% 60% 40% 50%',
                    '45% 55% 40% 60% / 60% 40% 55% 45%',
                    '55% 45% 60% 40% / 45% 55% 50% 50%',
                    '60% 40% 55% 45% / 50% 60% 40% 50%',
                  ],
                  y: [0, -14, 0, 14, 0],
                  x: [0, 6, 0, -6, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: '500px',
                  height: '500px',
                  overflow: 'hidden',
                  border: '2px solid hsl(var(--accent) / 0.45)',
                  boxShadow: '0 0 80px hsl(var(--accent) / 0.3), inset 0 0 40px hsl(var(--accent) / 0.1)',
                  position: 'relative',
                }}
              >
                <img
                  src={snorriFace}
                  alt="Snorri Bjarkason"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
