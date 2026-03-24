import { motion } from 'framer-motion';
import BorderGlow from './BorderGlow';
import { ExternalLink, BookOpen, GraduationCap } from 'lucide-react';
import hrLogo from '@/assets/hr-logo.png';
import deeplearningLogo from '@/assets/deeplearning.png';
import arcanumImg from '@/assets/arcanum.png';

const educationItems = [
  {
    type: 'degree',
    title: 'BSc in Software Engineering',
    institution: 'Reykjavík University',
    logo: hrLogo,
    description:
      'A three-year, 180 ECTS program focused on engineering methods for designing and developing software systems, combining theory with practical, industry-linked projects. Internationally accredited (ASIIN), covering programming, algorithms, and software architecture, with electives in machine learning and network security.',
    link: 'https://www.ru.is/en/departments/dcs',
  },
];

const courseItems = [
  {
    title: 'Advanced Learning Algorithms',
    institution: 'Coursera (DeepLearning.AI / Stanford)',
    logo: deeplearningLogo,
    description:
      'Neural networks, decision trees, random forests, and boosted trees. Taught by Andrew Ng as part of the Machine Learning Specialization.',
    link: 'https://www.coursera.org/account/accomplishments/records/GD2BJWEYAPZD',
  },
  {
    title: "The Bug Hunter's Methodology",
    institution: 'Arcanum Security',
    logo: arcanumImg,
    description:
      'Advanced offensive security training — reconnaissance, application analysis, automation, and exploitation techniques for bug bounty hunting and red teaming.',
    link: 'https://www.arcanum-sec.com/training/the-bug-hunters-methodology',
  },
  {
    title: 'Supervised ML: Regression & Classification',
    institution: 'Coursera (DeepLearning.AI / Stanford)',
    logo: deeplearningLogo,
    description:
      'Core supervised learning with linear and logistic regression, using Python/scikit-learn. First course in the Machine Learning Specialization.',
    link: 'https://www.coursera.org/account/accomplishments/records/GU2ZKXBQ2ARG',
  },
];

function EducationCard({ item, delay }: { item: typeof educationItems[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <BorderGlow
        borderRadius={16}
        colors={['#9333ea', '#c084fc', '#7c3aed']}
        backgroundColor="hsl(231, 10%, 11%)"
        glowIntensity={0.7}
      >
        <div className="p-6 flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
              style={{ background: 'white', border: '1px solid hsl(var(--border))' }}
            >
              <img src={item.logo} alt={item.institution} className="w-12 h-12 object-contain" />
            </div>
            <div>
              <p className="text-accent text-xs font-display font-semibold tracking-wider uppercase mb-1">{item.institution}</p>
              <h3 className="font-display font-bold text-primary text-xl">{item.title}</h3>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">{item.description}</p>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:underline"
          >
            Read more <ExternalLink size={12} />
          </a>
        </div>
      </BorderGlow>
    </motion.div>
  );
}

function CourseCard({ item, delay }: { item: typeof courseItems[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <BorderGlow
        borderRadius={16}
        colors={['#7c3aed', '#a855f7', '#9333ea']}
        backgroundColor="hsl(231, 10%, 11%)"
        glowIntensity={0.6}
      >
        <div className="p-5 flex flex-col gap-3">
          <div className="flex items-start gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
              style={{ background: 'white', border: '1px solid hsl(var(--border))' }}
            >
              <img src={item.logo} alt={item.institution} className="w-10 h-10 object-contain" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs font-medium mb-0.5">{item.institution}</p>
              <h3 className="font-display font-bold text-primary text-base leading-tight">{item.title}</h3>
            </div>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-accent text-sm font-medium hover:underline"
          >
            View certificate <ExternalLink size={11} />
          </a>
        </div>
      </BorderGlow>
    </motion.div>
  );
}

export default function EducationSection() {
  return (
    <section id="education" className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-accent font-display font-semibold tracking-widest uppercase text-sm mb-3">Education & Courses</p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-primary">My Education</h2>
        </motion.div>

        {/* Degree */}
        <div className="mb-12">
          {educationItems.map((item, i) => (
            <EducationCard key={i} item={item} delay={i * 0.1} />
          ))}
        </div>

        {/* Courses */}
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-2xl font-bold text-primary mb-6"
        >
          Courses I've Taken
        </motion.h3>

        <div className="grid md:grid-cols-3 gap-5">
          {courseItems.map((item, i) => (
            <CourseCard key={i} item={item} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
