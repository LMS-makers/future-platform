import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { 
  WhyChooseHICIT, 
  Departments, 
  LMSSection, 
  MissionStats,
  ExperienceSection, 
  NewsSection, 
  CTASection, 
  Footer 
} from "./sections";

function App() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <WhyChooseHICIT />
      <Departments />
      <LMSSection />
      <MissionStats />
      <ExperienceSection />
      <NewsSection />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;
