import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { InteractiveDemo } from './components/InteractiveDemo';
import { Portfolio } from './components/Portfolio';
import { Testimonials } from './components/Testimonials';
import { TechInsights } from './components/TechInsights';
import { Contact } from './components/Contact';
import { Pricing } from './components/Pricing';
import { FloatingCTA } from './components/FloatingCTA';
import { Footer } from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div id="home">
        <Hero />
      </div>
      <div id="services">
        <Features />
      </div>
      <InteractiveDemo />
      <div id="portfolio">
        <Portfolio />
      </div>
      <Testimonials />
      <div id="pricing">
        <Pricing />
      </div>
      <div id="blog">
        <TechInsights />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <Footer />
      <FloatingCTA />
    </div>
  );
}

export default App;
