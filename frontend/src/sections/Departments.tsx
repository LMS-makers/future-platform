import { Code, Wifi, Database } from 'lucide-react';
import { departmentsData } from '../data/landing';
import { SectionTitle, Card, CardImage, CardContent } from '../components/shared';

const iconMap: Record<string, React.ReactNode> = {
  code: <Code className="w-6 h-6 text-brand-blue" />,
  wifi: <Wifi className="w-6 h-6 text-brand-blue" />,
  database: <Database className="w-6 h-6 text-brand-blue" />,
};

interface Dept {
  id: number;
  name: string;
  description: string;
  icon: string;
  image: string;
}

export default function Departments() {
  return (
    <section id="departments" className="py-24 bg-brand-light">
      <div className="container mx-auto px-6">
        <SectionTitle title={departmentsData.title} />
        
        <div className="grid md:grid-cols-3 gap-8">
          {departmentsData.departments.map((dept: Dept) => (
            <Card key={dept.id} hover className="group">
              <CardImage src={dept.image} alt={dept.name} />
              <CardContent>
                <div className="bg-brand-blue/10 w-12 h-12 flex items-center justify-center rounded-lg mb-6">
                  {iconMap[dept.icon] || <Code className="w-6 h-6 text-brand-blue" />}
                </div>
                <h3 className="text-brand-navy font-bold text-xl mb-4">{dept.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{dept.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}