import { motion } from 'framer-motion';
import { Shield, Code, Network } from 'lucide-react';

const departments = [
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Learn to protect digital assets, perform penetration testing, and secure networks against modern threats.',
  },
  {
    icon: Code,
    title: 'Software Development',
    description: 'Master modern programming languages, frameworks, and development methodologies used in the industry.',
  },
  {
    icon: Network,
    title: 'Network Administration',
    description: 'Design, implement, and manage enterprise networks with hands-on experience in real infrastructure.',
  },
];

export default function Departments() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-primary-700/10 rounded-2xl blur-xl" />
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&h=400&fit=crop"
                alt="Cybersecurity"
                className="relative rounded-xl shadow-md w-full h-80 object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-primary-700 font-semibold text-sm uppercase tracking-wider">Our Departments</span>
            <h2 className="text-3xl font-semibold text-neutral-900 mt-2 mb-8">
              Departments
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {departments.map((dept, i) => (
                <motion.div
                  key={dept.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col gap-3 p-4 rounded-xl hover:bg-neutral-50 transition-colors duration-200 group"
                >
                  <div className="w-12 h-12 bg-primary-700/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-700 transition-colors duration-200">
                    <dept.icon className="text-primary-700 group-hover:text-white transition-colors duration-200" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900 mb-1">{dept.title}</h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">{dept.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
