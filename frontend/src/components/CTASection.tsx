import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-700 to-primary-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-600/20 via-transparent to-transparent" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-neutral-300 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Take the first step towards an exciting career in technology.
            Applications are now open for the 2025-2026 academic year.
          </p>
          <button className="group bg-white hover:bg-neutral-100 text-primary-900 px-10 py-4 rounded-xl transition-all duration-300 font-bold text-lg hover:shadow-lg hover:shadow-white/20 inline-flex items-center gap-3">
            Apply Now
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
