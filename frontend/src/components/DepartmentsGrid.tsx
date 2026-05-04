import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';

const programs = [
  {
    title: 'Computer Science',
    description: 'Deep dive into algorithms, data structures, AI, and software engineering fundamentals.',
    fullDescription: 'Our Computer Science program provides a comprehensive foundation in computing principles. Students explore algorithms, data structures, artificial intelligence, machine learning, and software engineering. Through hands-on projects and industry collaborations, you will develop the analytical thinking and technical skills needed to build innovative software solutions. The curriculum covers programming languages, database systems, operating systems, computer networks, and cutting-edge topics in AI and robotics. Graduates are prepared for roles as software engineers, AI specialists, systems architects, and research scientists.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop',
    details: ['Duration: 4 years', 'Credits: 140', 'Career paths: Software Engineer, AI Specialist, Data Scientist'],
  },
  {
    title: 'Information Technology',
    description: 'Master IT infrastructure, cloud computing, system administration, and enterprise solutions.',
    fullDescription: 'The Information Technology program equips students with practical skills in managing and optimizing technology infrastructure. Learn cloud computing, network administration, cybersecurity fundamentals, and enterprise system deployment. The program emphasizes real-world scenarios with lab-based courses and industry certifications. Students gain proficiency in Linux/Windows server administration, virtualization, DevOps practices, and IT service management. Through internships and capstone projects, you will graduate ready to design, implement, and maintain the technology systems that power modern organizations.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop',
    details: ['Duration: 4 years', 'Credits: 136', 'Career paths: Cloud Engineer, System Administrator, DevOps Engineer'],
  },
  {
    title: 'Information Systems',
    description: 'Bridge technology and business with data management, analytics, and strategic planning.',
    fullDescription: 'Information Systems combines technology expertise with business acumen. This program prepares you to analyze, design, and implement information systems that drive organizational success. Study database management, business intelligence, data analytics, project management, and enterprise architecture. Learn to translate business requirements into technical solutions and lead digital transformation initiatives. The curriculum includes courses in accounting, management, and economics alongside technical subjects. Graduates become the crucial link between IT teams and business stakeholders, ready for roles as systems analysts, data analysts, and IT consultants.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
    details: ['Duration: 4 years', 'Credits: 138', 'Career paths: Systems Analyst, Business Analyst, IT Consultant'],
  },
];

export default function DepartmentsGrid() {
  const [selectedProgram, setSelectedProgram] = useState<typeof programs[0] | null>(null);

  return (
    <section id="departments" className="py-20 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-700 font-semibold text-sm uppercase tracking-wider">Programs</span>
          <h2 className="text-3xl font-semibold text-neutral-900 mt-2">
            Academic Programs
          </h2>
          <p className="text-neutral-500 mt-4 max-w-2xl mx-auto">
            Choose from our range of industry-focused programs designed to prepare you for a successful career in technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, i) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-700 transition-colors">
                  {program.title}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed mb-4">
                  {program.description}
                </p>
                <button
                  onClick={() => setSelectedProgram(program)}
                  className="inline-flex items-center gap-2 text-primary-700 hover:text-primary-800 font-medium text-sm transition-colors duration-200"
                >
                  Learn More
                  <ArrowRight size={16} className="transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProgram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProgram(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative">
                <img
                  src={selectedProgram.image}
                  alt={selectedProgram.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent" />
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg"
                  aria-label="Close modal"
                >
                  <X size={20} className="text-neutral-900" />
                </button>
                <div className="absolute bottom-4 left-6">
                  <h2 className="text-2xl font-bold text-white">
                    {selectedProgram.title}
                  </h2>
                </div>
              </div>

              <div className="p-6 lg:p-8">
                <p className="text-neutral-700 leading-relaxed mb-6">
                  {selectedProgram.fullDescription}
                </p>

                <div className="space-y-3 mb-8">
                  {selectedProgram.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary-700 rounded-full flex-shrink-0 mt-2" />
                      <span className="text-neutral-700 text-sm">{detail}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-primary-700 hover:bg-primary-600 text-white px-6 py-3 rounded-xl transition-all duration-200 font-semibold hover:shadow-lg hover:shadow-primary-700/30">
                    Apply Now
                  </button>
                  <button
                    onClick={() => setSelectedProgram(null)}
                    className="flex-1 border border-neutral-300 hover:border-primary-700 text-neutral-700 hover:text-primary-700 px-6 py-3 rounded-xl transition-all duration-200 font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
