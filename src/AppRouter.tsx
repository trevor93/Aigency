import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Pricing } from './components/Pricing';
import { InteractiveDemo } from './components/InteractiveDemo';
import { Portfolio } from './components/Portfolio';
import { Testimonials } from './components/Testimonials';
import { TechInsights } from './components/TechInsights';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingCTA } from './components/FloatingCTA';
import { ClientLogin } from './pages/ClientLogin';
import { ClientDashboard } from './pages/ClientDashboard';
import { PaymentSuspension } from './pages/PaymentSuspension';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';

type Page = 'home' | 'login' | 'client-dashboard' | 'payment-suspension' | 'admin-login' | 'admin-dashboard';

export function AppRouter() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
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

  useEffect(() => {
    const handleNavigation = () => {
      const path = window.location.pathname;
      if (path === '/login' || path === '/client-login') {
        setCurrentPage('login');
      } else if (path === '/client-dashboard') {
        setCurrentPage('client-dashboard');
      } else if (path === '/payment-suspension') {
        setCurrentPage('payment-suspension');
      } else if (path === '/admin-login') {
        setCurrentPage('admin-login');
      } else if (path === '/admin-dashboard') {
        setCurrentPage('admin-dashboard');
      } else {
        setCurrentPage('home');
      }
    };

    handleNavigation();
    window.addEventListener('popstate', handleNavigation);
    return () => window.removeEventListener('popstate', handleNavigation);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (currentPage === 'login') {
    return <ClientLogin />;
  }

  if (currentPage === 'client-dashboard') {
    return <ClientDashboard />;
  }

  if (currentPage === 'payment-suspension') {
    return <PaymentSuspension />;
  }

  if (currentPage === 'admin-login') {
    return <AdminLogin />;
  }

  if (currentPage === 'admin-dashboard') {
    return <AdminDashboard />;
  }

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
