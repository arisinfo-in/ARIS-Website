import React, { useState } from 'react';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Training from './components/Training';
import Services from './components/Services';

type Page = 'home' | 'about' | 'contact' | 'training' | 'services';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

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

  return (
    <div>
      {currentPage === 'home' && <Home onNavigateAbout={navigateToAbout} onNavigateContact={navigateToContact} onNavigateTraining={navigateToTraining} onNavigateServices={navigateToServices} />}
      {currentPage === 'about' && <About onNavigateHome={navigateToHome} onNavigateContact={navigateToContact} onNavigateTraining={navigateToTraining} onNavigateServices={navigateToServices} />}
      {currentPage === 'contact' && <Contact onNavigateHome={navigateToHome} onNavigateAbout={navigateToAbout} onNavigateTraining={navigateToTraining} onNavigateServices={navigateToServices} />}
      {currentPage === 'training' && <Training onNavigateHome={navigateToHome} onNavigateAbout={navigateToAbout} onNavigateContact={navigateToContact} onNavigateServices={navigateToServices} />}
      {currentPage === 'services' && <Services onNavigateHome={navigateToHome} onNavigateAbout={navigateToAbout} onNavigateContact={navigateToContact} onNavigateTraining={navigateToTraining} />}
    </div>
  );
}

export default App;
