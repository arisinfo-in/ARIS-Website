import React, { useState, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { usePerformance, usePreloadCriticalResources } from './hooks/usePerformance';
import SEO from './components/SEO';
import GoogleAnalytics from './components/GoogleAnalytics';
import PerformanceMonitor from './components/PerformanceMonitor';
import BrochureDownloadModal from './components/BrochureDownloadModal';

// Lazy load components for better performance
const Home = React.lazy(() => import('./components/Home'));
const About = React.lazy(() => import('./components/About'));
const Contact = React.lazy(() => import('./components/Contact'));
const Training = React.lazy(() => import('./components/Training'));
const Services = React.lazy(() => import('./components/Services'));

type Page = 'home' | 'about' | 'contact' | 'training' | 'services';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  
  // Performance monitoring
  usePerformance();
  usePreloadCriticalResources();

  const navigateToHome = () => {
    setCurrentPage('home');
    window.scrollTo(0, 0);
  };

  const navigateToAbout = () => {
    setCurrentPage('about');
    window.scrollTo(0, 0);
  };

  const navigateToContact = () => {
    setCurrentPage('contact');
    window.scrollTo(0, 0);
  };

  const navigateToTraining = () => {
    setCurrentPage('training');
    window.scrollTo(0, 0);
  };

  const navigateToServices = () => {
    setCurrentPage('services');
    window.scrollTo(0, 0);
  };

  // Loading component
  const LoadingSpinner = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
    </div>
  );

  return (
    <HelmetProvider>
      <div>
        <SEO />
        <GoogleAnalytics measurementId="G-XXXXXXXXXX" />
        
        <Suspense fallback={<LoadingSpinner />}>
          {currentPage === 'home' && <Home onNavigateAbout={navigateToAbout} onNavigateContact={navigateToContact} onNavigateTraining={navigateToTraining} onNavigateServices={navigateToServices} isBrochureModalOpen={isBrochureModalOpen} setIsBrochureModalOpen={setIsBrochureModalOpen} />}
          {currentPage === 'about' && <About onNavigateHome={navigateToHome} onNavigateContact={navigateToContact} onNavigateTraining={navigateToTraining} onNavigateServices={navigateToServices} isBrochureModalOpen={isBrochureModalOpen} setIsBrochureModalOpen={setIsBrochureModalOpen} />}
          {currentPage === 'contact' && <Contact onNavigateHome={navigateToHome} onNavigateAbout={navigateToAbout} onNavigateTraining={navigateToTraining} onNavigateServices={navigateToServices} isBrochureModalOpen={isBrochureModalOpen} setIsBrochureModalOpen={setIsBrochureModalOpen} />}
          {currentPage === 'training' && <Training onNavigateHome={navigateToHome} onNavigateAbout={navigateToAbout} onNavigateContact={navigateToContact} onNavigateServices={navigateToServices} isBrochureModalOpen={isBrochureModalOpen} setIsBrochureModalOpen={setIsBrochureModalOpen} />}
          {currentPage === 'services' && <Services onNavigateHome={navigateToHome} onNavigateAbout={navigateToAbout} onNavigateContact={navigateToContact} onNavigateTraining={navigateToTraining} isBrochureModalOpen={isBrochureModalOpen} setIsBrochureModalOpen={setIsBrochureModalOpen} />}
        </Suspense>
        
        <PerformanceMonitor />
        
        {/* Global Brochure Modal */}
        <BrochureDownloadModal 
          isOpen={isBrochureModalOpen} 
          onClose={() => setIsBrochureModalOpen(false)}
        />
      </div>
    </HelmetProvider>
  );
}

export default App;
