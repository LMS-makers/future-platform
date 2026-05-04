import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyChooseHICIT from './components/WhyChooseHICIT';
import Departments from './components/Departments';
import DepartmentsGrid from './components/DepartmentsGrid';
import LMSSection from './components/LMSSection';
import ExperienceSection from './components/ExperienceSection';
import News from './components/News';
import PeopleSection from './components/PeopleSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <WhyChooseHICIT />
      <Departments />
      <LMSSection />
      <DepartmentsGrid />
      <ExperienceSection />
      <News />
      <PeopleSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;
