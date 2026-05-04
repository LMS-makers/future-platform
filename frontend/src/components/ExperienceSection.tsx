import { motion } from 'framer-motion';
import { Code2, Brain, Users } from 'lucide-react';

const experiences = [
  {
    icon: Code2,
    title: 'Hands-on Coding',
    description: 'Write real code from day one. Our project-based curriculum ensures you build a professional portfolio before graduation.',
    color: 'from-blue-500 to-primary-700',
  },
  {
    icon: Brain,
    title: 'AI Integration',
    description: 'Learn to leverage AI tools and integrate machine learning into your applications. Stay ahead in the AI revolution.',
    color: 'from-purple-500 to-primary-700',
  },
  {
    icon: Users,
    title: 'Collaborative Projects',
    description: 'Work in teams on real-world projects. Develop communication, leadership, and agile teamwork skills employers value.',
    color: 'from-green-500 to-primary-700',
  },
];

export default function ExperienceSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary-700/20 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider">Student Experience</span>
          <h2 className="text-3xl font-semibold text-white mt-2">
            Learn by Doing
          </h2>
          <p className="text-neutral-300 mt-4 max-w-2xl mx-auto">
            Our approach combines theory with practice, ensuring you graduate with real skills and confidence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${exp.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <exp.icon className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{exp.title}</h3>
              <p className="text-neutral-300 text-sm leading-relaxed">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
