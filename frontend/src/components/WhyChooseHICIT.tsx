import { motion } from 'framer-motion';

export default function WhyChooseHICIT() {
  return (
    <section id="about" className="py-20 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-700 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
          <h2 className="text-3xl font-semibold text-neutral-900 mt-2">
            Why Choose HICIT?
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-neutral-900 mb-6">
              Excellence in Technology Education
            </h3>
            <p className="text-neutral-500 leading-relaxed mb-6">
              At HICIT, we combine academic rigor with practical experience. Our curriculum is designed
              by industry professionals to ensure you graduate with skills that employers demand. From
              day one, you'll work on real projects, collaborate with peers, and build a portfolio
              that showcases your abilities.
            </p>
            <ul className="space-y-4">
              {[
                'Industry-aligned curriculum updated annually',
                'Hands-on labs and real-world projects',
                'Mentorship from tech professionals',
                'Career placement support and internship programs',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary-700/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary-700 text-xs">✓</span>
                  </div>
                  <span className="text-neutral-700">{item}</span>
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
              <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop"
                  alt="Professor"
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <img
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=60&h=60&fit=crop"
                      alt="Dr. Hassan Ibrahim"
                      className="w-14 h-14 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="font-bold text-neutral-900">Dr. Hassan Ibrahim</h4>
                      <p className="text-primary-700 text-sm">Head of Computer Science</p>
                    </div>
                  </div>
                  <p className="text-neutral-500 text-sm leading-relaxed">
                    "At HICIT, we don't just teach technology — we inspire innovation.
                    Our students graduate ready to lead in the tech industry."
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
