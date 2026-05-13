import { Check } from 'lucide-react';
import { whyChooseData } from '../data/landing';
import { SectionTitle } from '../components/shared';

export default function WhyChooseHICIT() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionTitle 
              title={whyChooseData.title} 
              subtitle={whyChooseData.subtitle}
              alignment="left"
            />
            <div className="space-y-4 text-gray-600 text-base leading-relaxed">
              <p>{whyChooseData.description}</p>
              <ul className="space-y-3">
                {whyChooseData.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-brand-blue mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-brand-blue/5 rounded-2xl p-8 border border-brand-blue/10 flex flex-col md:flex-row gap-6 items-center">
            <img 
              alt={whyChooseData.director.name} 
              className="w-40 h-40 object-cover rounded-xl shadow-lg shrink-0"
              src={whyChooseData.director.image}
            />
            <div>
              <h4 className="text-brand-navy font-bold text-xl mb-1">{whyChooseData.director.name}</h4>
              <p className="text-gray-600 text-sm leading-relaxed italic">
                {whyChooseData.director.quote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}