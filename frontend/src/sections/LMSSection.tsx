import { lmsData } from '../data/landing';
import { Button } from '../components/shared';

export default function LMSSection() {
  return (
    <section id="lms" className="py-20 bg-brand-navy overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-white text-3xl font-bold">
            {lmsData.title.split(', ')[0]}, <span className="text-brand-accent italic">{lmsData.title.split(', ')[1]}</span>
          </h2>
        </div>
        
        <div className="max-w-5xl mx-auto bg-white/10 rounded-2xl p-10 border border-white/20 shadow-2xl relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h3 className="text-white text-3xl font-bold mb-6">{lmsData.subtitle}</h3>
              <p className="text-white/70 mb-8 leading-relaxed">
                {lmsData.description}
              </p>
              <Button variant="outline" size="md">
                {lmsData.ctaText}
              </Button>
            </div>
            <div className="relative">
              <img 
                alt={lmsData.imageAlt} 
                className="rounded-lg shadow-2xl transform rotate-3 scale-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrGW_-CBIk0EAMl2W5o_n9ecoa4ZHEK53dlUrRAbrajb7_KK-s3GUc-jUlNzg7PY1Wqn11OvkUsCtFAqhkvYjIDBc_0ta6hsy0TJY3MZyZkdZ7_YSSuOBJVYo32DySSexlXUd6mzlmpBDcA-ennB7FaBnh1gRa1T6JVQ0ezlHGhDZLNloF7ZMi1JcDAdEEQJYDpZsQR8gvT4QfduqCvWGYggczbUz9l6TwvFT5sQiaWy-FTA86jtGgvuIFrH-nFzyf3C5mUEoXjw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}