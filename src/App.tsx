import React, { useState, Suspense, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { usePerformance, usePreloadCriticalResources } from './hooks/usePerformance';
import SEO from './components/SEO';
import GoogleAnalytics from './components/GoogleAnalytics';
import PerformanceMonitor from './components/PerformanceMonitor';
import BrochureDownloadModal from './components/BrochureDownloadModal';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load components for better performance
const Home = React.lazy(() => import('./components/Home'));
const About = React.lazy(() => import('./components/About'));
const Contact = React.lazy(() => import('./components/Contact'));
const Training = React.lazy(() => import('./components/Training'));
const Services = React.lazy(() => import('./components/Services'));
const PrivacyPolicy = React.lazy(() => import('./components/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./components/TermsOfService'));
const Product = React.lazy(() => import('./components/Product'));

// App Content Component that handles routing
function AppContent() {
  const navigate = useNavigate();
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  
  // Performance monitoring
  usePerformance();
  usePreloadCriticalResources();

  // First-time visitor detection and brochure modal
  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('aris-visited');
    
    if (!hasVisitedBefore) {
      // Show brochure modal after a short delay for better UX
      const timer = setTimeout(() => {
        setIsBrochureModalOpen(true);
        // Mark as visited so it doesn't show again
        localStorage.setItem('aris-visited', 'true');
      }, 2000); // 2 second delay
      
      return () => clearTimeout(timer);
    }
  }, []);

  const navigateToHome = useCallback(() => {
    navigate('/');
    window.scrollTo(0, 0);
  }, [navigate]);

  const navigateToAbout = useCallback(() => {
    navigate('/about');
    window.scrollTo(0, 0);
  }, [navigate]);

  const navigateToContact = useCallback(() => {
    navigate('/contact');
    window.scrollTo(0, 0);
  }, [navigate]);

  const navigateToTraining = useCallback(() => {
    navigate('/training');
    window.scrollTo(0, 0);
  }, [navigate]);

  const navigateToServices = useCallback(() => {
    navigate('/services');
    window.scrollTo(0, 0);
  }, [navigate]);

  const navigateToPrivacy = useCallback(() => {
    navigate('/privacy');
    window.scrollTo(0, 0);
  }, [navigate]);

  const navigateToTerms = useCallback(() => {
    navigate('/terms');
    window.scrollTo(0, 0);
  }, [navigate]);

  return (
    <HelmetProvider>
      <div className="bg-gray-900 min-h-screen">
        <SEO />
        <GoogleAnalytics measurementId="G-09B0ZGXG1B" />
        
        <Suspense fallback={<div className="bg-gray-900 min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Home onNavigateAbout={navigateToAbout} onNavigateContact={navigateToContact} onNavigateTraining={navigateToTraining} onNavigateServices={navigateToServices} onNavigatePrivacy={navigateToPrivacy} onNavigateTerms={navigateToTerms} isBrochureModalOpen={isBrochureModalOpen} setIsBrochureModalOpen={setIsBrochureModalOpen} />} />
            <Route path="/about" element={<About onNavigateHome={navigateToHome} onNavigateContact={navigateToContact} onNavigateTraining={navigateToTraining} onNavigateServices={navigateToServices} isBrochureModalOpen={isBrochureModalOpen} setIsBrochureModalOpen={setIsBrochureModalOpen} />} />
            <Route path="/contact" element={<Contact onNavigateHome={navigateToHome} onNavigateAbout={navigateToAbout} onNavigateTraining={navigateToTraining} onNavigateServices={navigateToServices} isBrochureModalOpen={isBrochureModalOpen} setIsBrochureModalOpen={setIsBrochureModalOpen} />} />
            <Route path="/training" element={<Training onNavigateHome={navigateToHome} onNavigateAbout={navigateToAbout} onNavigateContact={navigateToContact} onNavigateServices={navigateToServices} isBrochureModalOpen={isBrochureModalOpen} setIsBrochureModalOpen={setIsBrochureModalOpen} />} />
            <Route path="/services" element={<Services onNavigateHome={navigateToHome} onNavigateAbout={navigateToAbout} onNavigateContact={navigateToContact} onNavigateTraining={navigateToTraining} isBrochureModalOpen={isBrochureModalOpen} setIsBrochureModalOpen={setIsBrochureModalOpen} />} />
            <Route path="/privacy" element={<PrivacyPolicy onNavigateHome={navigateToHome} onNavigateAbout={navigateToAbout} onNavigateContact={navigateToContact} onNavigateTraining={navigateToTraining} onNavigateServices={navigateToServices} onNavigateTerms={navigateToTerms} />} />
            <Route path="/terms" element={<TermsOfService onNavigateHome={navigateToHome} onNavigateAbout={navigateToAbout} onNavigateContact={navigateToContact} onNavigateTraining={navigateToTraining} onNavigateServices={navigateToServices} onNavigatePrivacy={navigateToPrivacy} />} />
            <Route path="/product" element={<Product />} />
          </Routes>
        </Suspense>
        
        <PerformanceMonitor />
        
        {/* Global Brochure Modal */}
        <BrochureDownloadModal 
          isOpen={isBrochureModalOpen} 
          onClose={useCallback(() => setIsBrochureModalOpen(false), [])}
        />
      </div>
    </HelmetProvider>
  );
}

// Main App component with Router
function App() {
  return (
    <ErrorBoundary>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <AppContent />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
