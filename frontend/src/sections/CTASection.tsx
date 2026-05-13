import { ctaData } from '../data/landing';
import { Button } from '../components/shared';

export default function CTASection() {
  return (
    <section className="py-20 bg-brand-navy border-b border-white/5">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-white text-4xl font-bold mb-10">{ctaData.title}</h2>
        <Button variant="outline" size="lg">
          {ctaData.buttonText}
        </Button>
      </div>
    </section>
  );
}