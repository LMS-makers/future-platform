import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Calendar, BarChart } from "lucide-react";
import { useTranslation } from 'react-i18next';
import lmsDashboard from "../assets/imgs/Screenshot 2026-05-14 190928.png";

export default function LMSSection() {
  const { t } = useTranslation('landing');

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary-700 font-semibold text-sm uppercase tracking-wider">
              {t('learningPlatform')}
            </span>
            <h2 className="text-3xl font-semibold text-text-primary mt-2 mb-6">
              {t('studyLifeUpgraded')}
            </h2>
            <p className="text-text-tertiary leading-relaxed mb-8">
              {t('lmsDescription')}
            </p>

            <div className="space-y-4 mb-8">
              {[
                {
                  icon: BookOpen,
                  text: t('featureLms1'),
                },
                { icon: Calendar, text: t('featureLms2') },
                { icon: BarChart, text: t('featureLms3') },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-700/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="text-primary-700" size={20} />
                  </div>
                  <span className="text-text-secondary">{feature.text}</span>
                </div>
              ))}
            </div>

            <a
              href="/login"
              className="group bg-primary-700 hover:bg-primary-600 text-white px-8 py-4 rounded-xl transition-all duration-300 font-semibold hover:shadow-lg hover:shadow-primary-700/30 inline-flex items-center gap-2"
            >
              {t('accessLms')}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-700/10 to-primary-400/10 rounded-2xl blur-xl" />
              <div className="relative bg-surface-alt rounded-2xl shadow-lg overflow-hidden border border-border">
                <div className="bg-primary-900 px-4 py-3 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-text-tertiary text-xs ml-2">
                    {t('lmsHicit', { ns: 'navbar' })}
                  </span>
                </div>
                <img
                  src={lmsDashboard}
                  alt="LMS Dashboard"
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
