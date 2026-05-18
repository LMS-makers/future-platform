import { motion } from 'framer-motion';
import { Code2, Brain, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ExperienceSection() {
  const { t } = useTranslation('landing');

  const experiences = [
    {
      icon: Code2,
      title: t('handsOnCoding'),
      description: t('handsOnCodingDesc'),
      color: 'from-blue-500 to-primary-700',
    },
    {
      icon: Brain,
      title: t('aiIntegration'),
      description: t('aiIntegrationDesc'),
      color: 'from-purple-500 to-primary-700',
    },
    {
      icon: Users,
      title: t('collaborativeProjects'),
      description: t('collaborativeProjectsDesc'),
      color: 'from-green-500 to-primary-700',
    },
  ];

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
          <span className="text-primary-400 font-semibold text-sm uppercase tracking-wider">{t('studentExperience')}</span>
          <h2 className="text-3xl font-semibold text-white mt-2">
            {t('learnByDoing')}
          </h2>
          <p className="text-neutral-300 mt-4 max-w-2xl mx-auto">
            {t('experienceDescription')}
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
