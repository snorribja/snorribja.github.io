import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import raftImg from '@/assets/raft.png';
import flappyImg from '@/assets/flappy.png';
import fifaImg from '@/assets/fifa.png';
import careeonImg from '@/assets/careeon.png';
import aasmImg from '@/assets/aasm.png';

const projects = [
  {
    title: 'Raft Consensus Algorithm',
    category: 'Distributed Systems',
    image: raftImg,
    link: 'https://github.com/snorribja/Snorri/tree/main/Raft',
  },
  {
    title: 'Flappy Bird Q-Learning',
    category: 'Machine Learning',
    image: flappyImg,
    link: 'https://github.com/snorribja/Snorri/tree/main/Flappy%20Bird%20Q-learning',
  },
  {
    title: 'FIFA Player Classification',
    category: 'Machine Learning',
    image: fifaImg,
    link: 'https://github.com/snorribja/Snorri/tree/main/Raft',
  },
  {
    title: 'Automated Attack Surface Mapping',
    category: 'Network Security',
    image: aasmImg,
    link: 'https://hdl.handle.net/1946/50482',
  },
  {
    title: 'Careeon Job Search Platform',
    category: 'Website / Backend',
    image: careeonImg,
    link: 'https://careeon.onrender.com/',
  },
];

export default function PortfolioSection() {
  const [current, setCurrent] = useState(0);
  const visible = 3;
  const total = projects.length;

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(total - visible, c + 1));
  const canPrev = current > 0;
  const canNext = current < total - visible;

  return (
    <section id="portfolio" className="py-24 overflow-hidden">
      <div className="container">
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-accent font-display font-semibold tracking-widest uppercase text-sm mb-3">My Projects</p>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-primary">Portfolio</h2>
          </motion.div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={prev}
              disabled={!canPrev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              disabled={!canNext}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Desktop slider */}
        <div className="hidden md:block overflow-hidden">
          <motion.div
            animate={{ x: `${-current * (100 / visible)}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex gap-6"
          >
            {projects.map((project, i) => (
              <motion.a
                key={i}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex-shrink-0 w-[calc(33.33%-1rem)] relative rounded-2xl overflow-hidden block"
                style={{ aspectRatio: '1', border: '1px solid hsl(var(--border))' }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={600}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 flex flex-col justify-end p-6 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(to top, hsl(var(--background) / 0.95) 0%, hsl(var(--background) / 0.5) 50%, transparent 100%)',
                  }}
                >
                  <span className="text-accent text-xs font-display font-semibold tracking-wider uppercase mb-1">
                    {project.category}
                  </span>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-primary text-lg">{project.title}</h3>
                    <ExternalLink size={16} className="text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0 ml-2" />
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Mobile: stacked */}
        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <a
              key={i}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden block aspect-square"
              style={{ border: '1px solid hsl(var(--border))' }}
            >
              <img src={project.image} alt={project.title} width={600} height={600} loading="lazy" className="w-full h-full object-cover" />
              <div
                className="absolute inset-0 flex flex-col justify-end p-4"
                style={{ background: 'linear-gradient(to top, hsl(var(--background) / 0.95), transparent)' }}
              >
                <span className="text-accent text-xs font-display font-semibold tracking-wider uppercase mb-1">{project.category}</span>
                <h3 className="font-display font-bold text-primary">{project.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
