import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Calendar, BarChart } from 'lucide-react';

export default function LMSSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary-700 font-semibold text-sm uppercase tracking-wider">Learning Platform</span>
            <h2 className="text-3xl font-semibold text-neutral-900 mt-2 mb-6">
              Your Study Life, Upgraded
            </h2>
            <p className="text-neutral-500 leading-relaxed mb-8">
              Our modern Learning Management System puts everything you need at your fingertips.
              Access course materials, submit assignments, track your progress, and collaborate
              with classmates — all from one intuitive platform.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: BookOpen, text: 'Access all course materials and lectures' },
                { icon: Calendar, text: 'Manage your schedule and deadlines' },
                { icon: BarChart, text: 'Track grades and academic progress' },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-700/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="text-primary-700" size={20} />
                  </div>
                  <span className="text-neutral-700">{feature.text}</span>
                </div>
              ))}
            </div>

            <button className="group bg-primary-700 hover:bg-primary-600 text-white px-8 py-4 rounded-xl transition-all duration-300 font-semibold hover:shadow-lg hover:shadow-primary-700/30 flex items-center gap-2">
              Access LMS
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-700/10 to-primary-400/10 rounded-2xl blur-xl" />
              <div className="relative bg-neutral-100 rounded-2xl shadow-lg overflow-hidden border border-neutral-200">
                <div className="bg-primary-900 px-4 py-3 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="text-neutral-300 text-xs ml-2">lms.hicit.edu</span>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1531403009284-440f23bce7e8?w=600&h=400&fit=crop"
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
