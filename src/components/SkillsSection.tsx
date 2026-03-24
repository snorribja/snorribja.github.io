import { motion } from 'framer-motion';

const skillColumns = [
  {
    title: 'Languages',
    skills: ['Python', 'C/C++', 'Java', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'SQL', 'PL/SQL', 'R', 'Go', 'Bash/Shell'],
  },
  {
    title: 'Libraries',
    skills: ['NumPy', 'SciPy', 'Pandas', 'Matplotlib', 'Seaborn', 'TensorFlow', 'Keras', 'Scikit-learn', 'Requests', 'Flask', 'Django', 'FastAPI', 'BeautifulSoup'],
  },
  {
    title: 'Enterprise Tools',
    skills: ['Oracle', 'PostgreSQL', 'Docker', 'Supabase', 'Git', 'GitHub', 'Bitbucket', 'Jenkins', 'JIRA', 'Confluence', 'AWS'],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-accent font-display font-semibold tracking-widest uppercase text-sm mb-3">What I Know</p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-primary">Technical Skills & Tools</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillColumns.map((col, colIndex) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: colIndex * 0.15 }}
            >
              <div
                className="p-6 rounded-2xl h-full"
                style={{
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                }}
              >
                <h3
                  className="font-display font-bold text-lg mb-5 pb-3"
                  style={{ borderBottom: '1px solid hsl(var(--border))', color: 'hsl(var(--accent))' }}
                >
                  {col.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {col.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: colIndex * 0.1 + skillIndex * 0.03 }}
                      className="skill-tag"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
