import { useState } from 'react';
import { motion } from 'framer-motion';
import BorderGlow from './BorderGlow';
import { ChevronLeft, ChevronRight, FlaskConical, Code2, GraduationCap, Terminal } from 'lucide-react';

const experiences = [
  {
    number: '01',
    icon: FlaskConical,
    title: 'Research Engineer at Nox Medical',
    description:
      'Contributed to applied industrial research in sleep diagnostics. Developed and evaluated AI/ML models, CNNs and ResNets, for physiological signal analysis, processed EEG, ECG, and breathing data from sleep studies, and implemented custom statistical analyses. Supported research publications and collaborated with scientists and engineers.',
    link: 'https://noxmedical.com/about/',
    linkLabel: 'About Nox Medical',
  },
  {
    number: '02',
    icon: Code2,
    title: 'TIA Software Developer at VÍS',
    description:
      'Enhanced the TIA insurance platform by creating dynamic output APIs and Spring Boot APIs to automate processes. Focused on preventing exploitation of Pay-As-You-Drive car insurance. Retrieved complex data sets using advanced SQL queries and implemented error prevention mechanisms in batch processes.',
    link: 'https://vis.is/en',
    linkLabel: 'About VÍS',
  },
  {
    number: '03',
    icon: GraduationCap,
    title: 'Teaching Assistant at RU',
    description:
      'Assisted students in Operating Systems and Python Programming. Helped understand process scheduling, memory management, and file systems. Guided Python coursework, conducted code reviews, created supplemental materials, and provided constructive feedback.',
    link: 'https://www.ru.is/en/about-ru',
    linkLabel: 'About Reykjavík University',
  },
  {
    number: '04',
    icon: Terminal,
    title: 'Software Developer at VÍS (Internship)',
    description:
      'Contributed to integrating dynamic APIs into internal systems, specifically working on the "Skútan" project. Integrated Samgöngustofan\'s marine and boat insurance API to enhance VÍS\'s internal capabilities, improving efficiency and automation.',
    link: 'https://vis.is/en',
    linkLabel: 'About VÍS',
  },
];

export default function ExperienceSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + experiences.length) % experiences.length);
  const next = () => setCurrent((c) => (c + 1) % experiences.length);

  return (
    <section id="experience" className="py-24 overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-accent font-display font-semibold tracking-widest uppercase text-sm mb-3">Where I've Worked</p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-primary">My Job Experience</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground max-w-2xl mb-12 text-lg leading-relaxed"
        >
          Professional experience across research, software development, and teaching, from AI-driven sleep diagnostics to large-scale insurance software systems.
        </motion.p>

        {/* Desktop: all cards grid */}
        <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {experiences.map((exp, i) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <BorderGlow
                  borderRadius={16}
                  glowRadius={50}
                  glowIntensity={0.8}
                  coneSpread={30}
                  colors={['#9333ea', '#c084fc', '#7c3aed']}
                  backgroundColor="hsl(231, 10%, 11%)"
                  className="h-full"
                >
                  <div className="p-6 flex flex-col gap-4 h-full">
                    <div className="flex items-start justify-between">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: 'hsl(var(--accent) / 0.1)', border: '1px solid hsl(var(--accent) / 0.2)' }}
                      >
                        <Icon size={18} className="text-accent" />
                      </div>
                      <span className="font-display font-extrabold text-3xl text-muted-foreground opacity-30">{exp.number}</span>
                    </div>
                    <h3 className="font-display font-bold text-primary text-base leading-tight">{exp.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">{exp.description}</p>
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent text-sm font-medium hover:underline"
                    >
                      {exp.linkLabel} →
                    </a>
                  </div>
                </BorderGlow>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: carousel */}
        <div className="md:hidden">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {(() => {
              const exp = experiences[current];
              const Icon = exp.icon;
              return (
                <BorderGlow borderRadius={16} colors={['#9333ea', '#c084fc', '#7c3aed']} backgroundColor="hsl(231, 10%, 11%)">
                  <div className="p-6 flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: 'hsl(var(--accent) / 0.1)', border: '1px solid hsl(var(--accent) / 0.2)' }}
                      >
                        <Icon size={18} className="text-accent" />
                      </div>
                      <span className="font-display font-extrabold text-3xl text-muted-foreground opacity-30">{exp.number}</span>
                    </div>
                    <h3 className="font-display font-bold text-primary text-lg">{exp.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{exp.description}</p>
                    <a href={exp.link} target="_blank" rel="noopener noreferrer" className="text-accent text-sm font-medium hover:underline">
                      {exp.linkLabel} →
                    </a>
                  </div>
                </BorderGlow>
              );
            })()}
          </motion.div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors">
              <ChevronLeft size={18} />
            </button>
            <span className="text-muted-foreground text-sm">{current + 1} / {experiences.length}</span>
            <button onClick={next} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
