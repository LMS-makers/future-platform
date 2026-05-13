import { ArrowRight } from 'lucide-react';
import { newsData } from '../data/landing';
import { SectionTitle } from '../components/shared';

interface Article {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  image: string;
}

export default function NewsSection() {
  return (
    <section id="news" className="py-24 bg-brand-light">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <SectionTitle title={newsData.title} showLine={false} />
          <a 
            className="text-brand-blue font-bold text-sm flex items-center gap-2 hover:underline" 
            href="#"
          >
            {newsData.viewAllText}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {newsData.articles.map((article: Article) => (
            <article key={article.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full">
              <img 
                alt={article.title} 
                className="w-full h-48 object-cover"
                src={article.image}
              />
              <div className="p-8 flex flex-col flex-grow">
                <span className="text-xs font-bold text-brand-blue uppercase tracking-widest mb-3">
                  {article.category}
                </span>
                <h3 className="text-brand-navy font-bold text-xl mb-4 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-500 text-sm mb-8 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="mt-auto">
                  <a 
                    className="text-brand-blue font-bold text-sm flex items-center gap-2 group" 
                    href="#"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}