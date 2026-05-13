import { Code, Cpu, Users } from 'lucide-react';
import { experienceData } from '../data/landing';

const iconMap: Record<string, React.ReactNode> = {
  code: <Code className="w-6 h-6 text-brand-blue" />,
  cpu: <Cpu className="w-6 h-6 text-brand-blue" />,
  users: <Users className="w-6 h-6 text-brand-blue" />,
};

interface Experience {
  title: string;
  description: string;
  image: string;
  icon: string;
}

export default function ExperienceSection() {
  return (
    <section className="py-24 bg-brand-navy">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-white text-4xl font-bold mb-4">{experienceData.title}</h2>
        <p className="text-white/60 max-w-3xl mx-auto mb-20 text-sm leading-relaxed">
          {experienceData.description}
        </p>
        
        <div className="grid md:grid-cols-3 gap-12">
          {experienceData.experiences.map((exp: Experience, index: number) => (
            <div key={index} className="group">
              <div className="relative h-64 mb-8 overflow-hidden rounded-2xl">
                <img 
                  alt={exp.title} 
                  className="w-full h-full object-cover"
                  src={exp.image}
                />
                <div className="absolute inset-0 bg-brand-blue/40 group-hover:bg-brand-blue/20 transition-all"></div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl">
                    {iconMap[exp.icon] || <Code className="w-6 h-6 text-brand-blue" />}
                  </div>
                </div>
              </div>
              <h3 className="text-white font-bold text-xl mb-4">{exp.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}