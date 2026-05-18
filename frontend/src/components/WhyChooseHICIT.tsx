import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function WhyChooseHICIT() {
  const { t } = useTranslation('landing');

  return (
    <section id="about" className="py-20 bg-surface-alt">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-700 font-semibold text-sm uppercase tracking-wider">{t('whyChooseUs')}</span>
          <h2 className="text-3xl font-semibold text-text-primary mt-2">
            {t('whyChooseHicit')}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-text-primary mb-6">
              {t('excellenceInTech')}
            </h3>
            <p className="text-text-tertiary leading-relaxed mb-6">
              {t('whyChooseDescription')}
            </p>
            <ul className="space-y-4">
              {[
                t('feature1'),
                t('feature2'),
                t('feature3'),
                t('feature4'),
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary-700/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary-700 text-xs">✓</span>
                  </div>
                  <span className="text-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-primary-700/10 rounded-2xl blur-xl" />
              <div className="relative bg-surface-card rounded-2xl shadow-lg overflow-hidden">
                {/* <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop"
                  alt="Professor"
                  className="w-full h-64 object-cover"
                  loading="lazy"
                /> */}
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=60&h=60&fit=crop"
                      alt="Dr. Hassan Ibrahim"
                      className="w-14 h-14 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="font-bold text-text-primary">Dr. Hassan Ibrahim</h4>
                      <p className="text-primary-700 text-sm">Head of Computer Science</p>
                    </div>
                  </div>
                  <p className="text-text-tertiary text-sm leading-relaxed">
                    {t('directorQuote')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
