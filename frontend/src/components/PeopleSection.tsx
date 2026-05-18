import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFetch } from '../hooks/useFetch';
import { fetchStudents, fetchProfessors, fetchGraduates } from '../services/api';
import type { PersonType } from '../types/user';

const tabs: { key: PersonType; label: string }[] = [
  { key: 'students', label: 'Students' },
  { key: 'professors', label: 'Professors' },
  { key: 'graduates', label: 'Graduates' },
];

const fetchMap: Record<PersonType, () => Promise<unknown>> = {
  students: fetchStudents,
  professors: fetchProfessors,
  graduates: fetchGraduates,
};

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 bg-neutral-300 rounded-full" />
        <div className="flex-1">
          <div className="h-4 bg-neutral-300 rounded w-3/4 mb-2" />
          <div className="h-3 bg-neutral-300 rounded w-1/2" />
        </div>
      </div>
      <div className="h-3 bg-neutral-300 rounded w-full mb-2" />
      <div className="h-3 bg-neutral-300 rounded w-5/6" />
    </div>
  );
}

export default function PeopleSection() {
  const [activeTab, setActiveTab] = useState<PersonType>('students');

  const fetchFn = useCallback(() => fetchMap[activeTab](), [activeTab]);
  const { data, loading, error } = useFetch(fetchFn);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-primary-700 font-semibold text-sm uppercase tracking-wider">Community</span>
          <h2 className="text-3xl font-semibold text-neutral-900 mt-2">
            Our HICIT Community
          </h2>
          <p className="text-neutral-500 mt-4 max-w-2xl mx-auto">
            Meet the people who make HICIT a vibrant place to learn, grow, and innovate.
          </p>
        </motion.div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-neutral-100 rounded-xl p-1.5">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'bg-white text-primary-700 shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="text-center py-12">
            <div className="text-red-500 text-lg font-medium">Failed to load data</div>
            <p className="text-neutral-500 mt-2">{error}</p>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
              : (data as any[])?.map((person: any) => (
                  <motion.div
                    key={person.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-neutral-100 hover:border-primary-200"
                  >
                    <div className="flex items-center gap-4 mb-4">
					  <img
							src={person.avatar}
							alt={person.name}
							className="w-14 h-14 rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
							loading="lazy"
							onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
						/>
                      <div>
                        <h3 className="font-bold text-neutral-900">{person.name}</h3>
                        <p className="text-primary-700 text-xs font-medium">{person.role}</p>
                      </div>
                    </div>
                    <p className="text-neutral-500 text-sm leading-relaxed mb-4">{person.bio}</p>
                    {person.stats && (
                      <div className="flex gap-3 pt-4 border-t border-neutral-100">
                        {person.stats.map((stat: any) => (
                          <div key={stat.label} className="flex-1 text-center">
                            <div className="text-lg font-bold text-neutral-900">{stat.value}</div>
                            <div className="text-neutral-500 text-xs">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    {person.department && (
                      <div className="inline-flex items-center gap-1.5 bg-primary-700/10 text-primary-700 text-xs font-medium px-2.5 py-1 rounded-full">
                        {person.department}
                      </div>
                    )}
                    {person.company && (
                      <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
                        {person.company}
                      </div>
                    )}
                    {person.publications !== undefined && (
                      <div className="flex items-center gap-1.5 text-neutral-500 text-xs">
                        <span className="font-semibold text-neutral-700">{person.publications}</span> publications
                      </div>
                    )}
                  </motion.div>
                ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
