import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronUp } from 'lucide-react';

const news = [
  {
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=250&fit=crop',
    category: 'Events',
    title: 'Annual Tech Summit 2025',
    fullContent: 'The HICIT Annual Tech Summit 2025 brings together over 200 industry professionals, researchers, and students for three days of cutting-edge presentations, hands-on workshops, and networking opportunities. Featured speakers include CTOs from leading tech companies, AI researchers, and cybersecurity experts. Topics this year include generative AI, quantum computing, sustainable tech, and the future of remote work. Registration opens February 1st with early-bird discounts for students and alumni.',
    date: 'March 15, 2025',
  },
  {
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=250&fit=crop',
    category: 'Achievement',
    title: 'HICIT Students Win National Hackathon',
    fullContent: 'A team of four HICIT students — Omar Hassan, Sara Ahmed, Youssef Ali, and Layla Mohamed — secured first place at the National Cyber Challenge 2025 held in Cairo. The competition spanned 48 hours of intense hacking, defense, and forensics challenges. The team\'s innovative approach to real-time threat detection using machine learning impressed the panel of judges. As winners, they received a $10,000 prize and internship offers from two sponsoring companies. This marks the third consecutive year HICIT has placed in the top three.',
    date: 'February 28, 2025',
  },
  {
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop',
    category: 'Partnership',
    title: 'New Partnership with Tech Giants',
    fullContent: 'HICIT has signed memorandum of understanding agreements with five major technology companies to establish a comprehensive internship and placement pipeline. The partnerships guarantee at least 100 internship positions annually for HICIT students, with priority consideration for full-time roles upon graduation. Partner companies will also contribute to curriculum development, provide guest lectures, and sponsor student projects. This initiative is expected to increase HICIT\'s post-graduation employment rate from 95% to 98% within two years.',
    date: 'February 10, 2025',
  },
];

function NewsCard({ item }: { item: typeof news[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 mb-8" style={{ breakInside: 'avoid', display: 'inline-block', width: '100%' }}>
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
        <span className="absolute top-4 left-4 bg-primary-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
          {item.category}
        </span>
      </div>
      <div className="p-6">
        <time className="text-neutral-500 text-xs">{item.date}</time>
        <h3 className="text-lg font-bold text-neutral-900 mt-2 mb-2">
          {item.title}
        </h3>
        <div className="mb-4 overflow-hidden">
          <p className={`text-neutral-700 text-sm leading-relaxed transition-all duration-300 ${expanded ? '' : 'line-clamp-3'}`}>
            {item.fullContent}
          </p>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-2 text-primary-700 hover:text-primary-800 font-medium text-sm transition-colors duration-200"
        >
          {expanded ? 'Show Less' : 'Read More'}
          {expanded ? (
            <ChevronUp size={14} className="transition-transform" />
          ) : (
            <ArrowRight size={14} className="transition-transform" />
          )}
        </button>
      </div>
    </div>
  );
}

export default function News() {
  return (
    <section id="news" className="py-20 lg:py-28 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-700 font-semibold text-sm uppercase tracking-wider">Latest Updates</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mt-2">
            News & Events
          </h2>
        </motion.div>

        <div style={{ columnCount: 3, columnGap: '2rem' }} className="hidden lg:block">
          {news.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ breakInside: 'avoid', marginBottom: '2rem', display: 'inline-block', width: '100%' }}
            >
              <NewsCard item={item} />
            </motion.div>
          ))}
        </div>

        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-8" style={{ alignItems: 'start' }}>
          {news.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ alignSelf: 'start', width: '100%' }}
            >
              <NewsCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
