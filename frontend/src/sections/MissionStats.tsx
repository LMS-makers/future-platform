import { Users, BookOpen, Briefcase } from 'lucide-react';
import { missionStatsData } from '../data/landing';

const iconMap: Record<string, React.ReactNode> = {
  users: <Users className="w-8 h-8 text-white" />,
  book: <BookOpen className="w-8 h-8 text-white" />,
  briefcase: <Briefcase className="w-8 h-8 text-white" />,
};

export default function MissionStats() {
  return (
    <section className="relative py-32 bg-gray-900">
      <img 
        alt={missionStatsData.imageAlt} 
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2aPlt5NtYJSWqHWi2Nu8Ci2sOGh_JRmuYnE8WCFGVxbros2lxze2kBn4M3a0QZBxQm_FACEW71ajNSZ1QYeE1_5fsOrKb02PySywkCIseCAlL33D-aWkqP5HllZecxalXDaw2WZtdSaOwVowigY_COqK0vbYGJuhHxD016r15Cq0F_ZbbHhuOVFgJ6iuhZdWwW3aBALT0ptQ3Pl05caQtFUgnCwAlsHsG0Pn42qcFKf3pUAvAZDo6vTRPU8-YlWd8zc7GFt0hHQ"
      />
      <div className="absolute inset-0 bg-[rgba(11,36,100,0.85)]"></div>
      
      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-white text-5xl font-bold mb-12">
            {missionStatsData.title.split(' ')[0]} Our <span className="text-brand-accent">{missionStatsData.title.split(' ').slice(1).join(' ')}</span>
          </h2>
          
          <div className="flex gap-8 mb-8 border-b border-white/10 pb-4">
            {missionStatsData.tabs.map((tab: string, index: number) => (
              <button 
                key={tab}
                className={`font-semibold text-lg pb-4 -mb-5 transition-colors ${
                  index === 0 
                    ? 'text-white border-b-2 border-brand-accent' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="max-w-md">
            <p className="text-white/80 text-lg leading-relaxed">
              {missionStatsData.content}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          {missionStatsData.stats.map((stat: { value: string; label: string }, index: number) => (
            <div 
              key={index}
              className="text-center p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm"
            >
              <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                {iconMap[Object.keys(iconMap)[index % 3]] || <Users className="w-8 h-8 text-white" />}
              </div>
              <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white/60 text-xs uppercase tracking-widest font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}