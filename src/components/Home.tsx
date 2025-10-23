import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, CheckCircle, BarChart3, Brain, Users, Zap, ArrowRight, Star, TrendingUp, Linkedin, Facebook, Instagram, Youtube, Map, User, Menu, X, FileText, Building, Rocket, Lightbulb, Wrench, Target, Globe, Briefcase, Network, Settings, PieChart, Workflow, Expand, UserPlus } from 'lucide-react';
import Logo from './Logo';
import GoogleAnalytics from './GoogleAnalytics';
import RoadmapOverlay from './RoadmapOverlay';
import RoadmapSelectionModal from './RoadmapSelectionModal';
import ArticleOverlay from './ArticleOverlay';
import ArticleSelectionModal from './ArticleSelectionModal';
import { apiService } from '../services/api';

interface HomeProps {
  onNavigateAbout: () => void;
  onNavigateContact: () => void;
  onNavigateTraining: () => void;
  onNavigateServices: () => void;
  onNavigatePrivacy: () => void;
  onNavigateTerms: () => void;
  isBrochureModalOpen: boolean;
  setIsBrochureModalOpen: (open: boolean) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigateAbout, onNavigateContact, onNavigateTraining, onNavigateServices, onNavigatePrivacy, onNavigateTerms, setIsBrochureModalOpen }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [isVisible, setIsVisible] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isRoadmapSelectionOpen, setIsRoadmapSelectionOpen] = useState(false);
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);
  const [selectedRoadmapType, setSelectedRoadmapType] = useState<string>('course');
  const [isArticleSelectionOpen, setIsArticleSelectionOpen] = useState(false);
  const [isArticleOpen, setIsArticleOpen] = useState(false);
  const [selectedArticleType, setSelectedArticleType] = useState<string>('ai-analytics-future');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Ensure page starts at top on refresh
    window.scrollTo(0, 0);
    
    // Remove any hash from URL to prevent auto-scrolling
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
    
    setIsVisible(true);
    
  }, []);

  // Typing effect for "AI Data Analyst"
  useEffect(() => {
    const text = "AI Data Analyst.";
    const typingSpeed = 80; // milliseconds per character
    const pauseTime = 1000; // pause for 1 second when complete
    
    if (typingIndex < text.length) {
      // Typing phase
      const timer = setTimeout(() => {
        setTypingText(text.slice(0, typingIndex + 1));
        setTypingIndex(typingIndex + 1);
      }, typingSpeed);
      
      return () => clearTimeout(timer);
    } else {
      // Pause phase - wait before starting over
      const pauseTimer = setTimeout(() => {
        setTypingText('');
        setTypingIndex(0);
      }, pauseTime);
      
      return () => clearTimeout(pauseTimer);
    }
  }, [typingIndex]);

  // Mouse movement handler for parallax effect (throttled for performance)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle mouse movement updates
      if (timeoutId) return;
      
      timeoutId = setTimeout(() => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        setMousePosition({
          x: (clientX - centerX) / centerX * 0.3, // Reduce parallax intensity
          y: (clientY - centerY) / centerY * 0.3
        });
        timeoutId = undefined;
      }, 16); // ~60fps
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear error when user starts typing
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: ''
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 Contact form submission started');
    setFormStatus('submitting');
    
    // Basic validation
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (formData.name.trim().length < 2) errors.name = 'Name must be at least 2 characters long';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address';
    }
    if (!formData.message.trim()) errors.message = 'Message is required';
    if (formData.message.trim().length < 10) errors.message = 'Message must be at least 10 characters long';
    
    if (Object.keys(errors).length > 0) {
      console.log('❌ Validation errors:', errors);
      setFormErrors(errors);
      setFormStatus('idle');
      return;
    }
    
    try {
      console.log('📤 Submitting form data:', formData);
      
      // Use the API service which handles environment-based URLs
      const data = await apiService.submitContactForm({
        ...formData,
        source: 'home'
      });
      
      console.log('✅ API response:', data);
      
      if (data.success) {
        setFormStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
        setFormErrors({});
        
        // Reset success message after 5 seconds
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        throw new Error(data.message || 'Form submission failed');
      }
    } catch (error) {
      console.error('❌ Form submission error:', error);
      setFormStatus('error');
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    
    setNewsletterStatus('submitting');
    
    try {
      // Use the API service which handles environment-based URLs
      const data = await apiService.subscribeNewsletter({
        email: newsletterEmail,
        source: 'home'
      });
      
      if (data.success) {
        setNewsletterStatus('success');
        setNewsletterEmail('');
        
        // Reset success message after 5 seconds
        setTimeout(() => setNewsletterStatus('idle'), 5000);
      } else {
        throw new Error(data.message || 'Newsletter subscription failed');
      }
    } catch (error) {
      setNewsletterStatus('error');
      console.error('Newsletter subscription error:', error);
    }
  };

  // Smooth scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 100; // Approximate height of the fixed header
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    // Close mobile menu when navigating
    setIsMobileMenuOpen(false);
  };

  const services = [
    {
      icon: Brain,
      title: "AI Analytics Training",
      description: "Master data, AI, and analytics to drive smarter, ethical business decisions.",
      features: ["AI Foundations", "Advanced Analytics", "Problem Solving"]
    },
    {
      icon: BarChart3,
      title: "Self-Paced Learning",
      description: "Learn at your own pace with our interactive online courses and hands-on projects.",
      features: ["Flexible Schedule", "Interactive Learning", "Project-Based Learning"]
    },
    {
      icon: Users,
      title: "AI Consultancy",
      description: "Strategic AI implementation guidance and best practices consulting",
      features: ["AI Strategy Planning", "Implementation Roadmap", "Custom Solutions"]
    },
    {
      icon: Zap,
      title: "Agentic AI Solutions",
      description: "Intelligent autonomous agents that can reason, plan, and execute complex tasks",
      features: ["Decision Making", "Multi-Agent Systems", "Adaptive Learning"]
    }
  ];


  return (
    <div className="min-h-screen bg-gray-900 overflow-x-hidden">
      {/* Google Analytics */}
      <GoogleAnalytics measurementId="G-XXXXXXXXXX" />
      
      {/* Header */}
      <header className="fixed w-full top-0 z-50 transition-all duration-300 px-4 py-4">
        <div className="max-w-6xl mx-auto bg-gray-800/95 rounded-full px-6 py-4 border border-gray-700 shadow-lg flex items-center justify-between">
          <div className={`transform transition-all duration-200 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <Logo size="sm" />
          </div>
          
          {/* Desktop Navigation */}
          <nav className={`hidden md:flex transform transition-all duration-200 delay-100 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="flex space-x-6">
              <button className="text-orange-400 relative group px-4 py-2 rounded-full bg-gray-700/50">
                Home
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-orange-500"></span>
              </button>
              <button onClick={onNavigateServices} className="text-gray-300 hover:text-orange-400 transition-all duration-300 hover:scale-105 relative group px-4 py-2 rounded-full hover:bg-gray-700/50">
                Services
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-6"></span>
              </button>
              <button onClick={onNavigateTraining} className="text-gray-300 hover:text-orange-400 transition-all duration-300 hover:scale-105 relative group px-4 py-2 rounded-full hover:bg-gray-700/50">
                Training
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-6"></span>
              </button>
              <button onClick={onNavigateAbout} className="text-gray-300 hover:text-orange-400 transition-all duration-300 hover:scale-105 relative group px-4 py-2 rounded-full hover:bg-gray-700/50">
                About
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-6"></span>
              </button>
              <button onClick={onNavigateContact} className="text-gray-300 hover:text-orange-400 transition-all duration-300 hover:scale-105 relative group px-4 py-2 rounded-full hover:bg-gray-700/50">
                Contact
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-6"></span>
              </button>
              <button onClick={() => setIsBrochureModalOpen(true)} className="text-white bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 transition-all duration-300 hover:scale-105 relative group px-4 py-2 rounded-full shadow-lg hover:shadow-orange-500/25 flex items-center space-x-1">
                <FileText className="w-4 h-4" />
                <span>Brochure</span>
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-white transition-all duration-300"></span>
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-orange-400 transition-colors duration-300"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Join Button - Outside Navigation */}
        <div className="hidden md:block fixed top-8 right-4 z-50 transform transition-all duration-200 delay-200 translate-x-0 opacity-100">
          <a 
            href="https://arisinfo.netlify.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 flex items-center space-x-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Join</span>
          </a>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden fixed top-20 left-4 right-4 z-40 transition-all duration-300 ${
          isMobileMenuOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}>
          <div className="bg-gray-800/95 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
            <nav className="py-4">
              <div className="space-y-2">
                <button 
                  onClick={() => scrollToSection('home')}
                  className="w-full text-left px-6 py-3 text-orange-400 hover:bg-gray-700/50 transition-all duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                  Home
                </button>
                <button 
                  onClick={onNavigateServices}
                  className="w-full text-left px-6 py-3 text-gray-300 hover:text-orange-400 hover:bg-gray-700/50 transition-all duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
                  Services
                </button>
                <button 
                  onClick={onNavigateTraining}
                  className="w-full text-left px-6 py-3 text-gray-300 hover:text-orange-400 hover:bg-gray-700/50 transition-all duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
                  Training
                </button>
                <button 
                  onClick={onNavigateAbout}
                  className="w-full text-left px-6 py-3 text-gray-300 hover:text-orange-400 hover:bg-gray-700/50 transition-all duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
                  About
                </button>
                <button 
                  onClick={onNavigateContact}
                  className="w-full text-left px-6 py-3 text-gray-300 hover:text-orange-400 hover:bg-gray-700/50 transition-all duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
                  Contact
                </button>
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsRoadmapSelectionOpen(true);
                  }}
                  className="w-full text-left px-6 py-3 text-gray-300 hover:text-orange-400 hover:bg-gray-700/50 transition-all duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
                  Roadmaps
                </button>
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsBrochureModalOpen(true);
                  }}
                  className="w-full text-left px-6 py-3 text-white bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 transition-all duration-300 flex items-center rounded-lg mx-2 shadow-lg hover:shadow-orange-500/25"
                >
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Brochure
                </button>
                <a 
                  href="https://arisinfo.netlify.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-left px-6 py-3 text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 flex items-center rounded-lg mx-2 shadow-lg hover:shadow-orange-500/25"
                >
                  <UserPlus className="w-4 h-4 mr-3" />
                  Join
                </a>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16 sm:py-24 md:py-32 mt-16 sm:mt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="text-center md:text-left space-y-6 md:space-y-8 order-1">
              <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                  Transform Your Career Into
                </h2>
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-orange-500 mb-6 leading-tight">
                  <span className="relative inline-block">
                    {typingText}
                    {typingIndex < "AI Data Analyst.".length && (
                      <span className="inline-block w-0.5 h-8 sm:h-10 md:h-12 bg-orange-500 ml-1 animate-pulse"></span>
                    )}
                  </span>
                </h2>
              </div>
              <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <p className="text-lg sm:text-xl text-gray-300 mb-6 md:mb-8 leading-relaxed">
                Master data and AI with ARIS — your gateway to expert-led training and consulting. Learn faster, grow smarter, and transform your business with practical analytics skills and real-world AI integration.
                </p>
              </div>
              <div className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <button onClick={onNavigateContact} className="group bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-orange-700 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button onClick={() => setIsRoadmapSelectionOpen(true)} className="group border-2 border-gray-600 text-gray-300 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-800 hover:border-orange-500 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center">
                  <Map className="mr-2 w-4 h-4" />
                  Roadmaps
                </button>
              </div>
            </div>

            {/* Quote - Mobile: Below buttons */}
            <div className={`transform transition-all duration-1000 delay-600 order-2 md:hidden ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex justify-center mb-6">
                <div className="relative text-center">
                  <div 
                    className="group bg-gray-800/80 backdrop-blur-sm border border-orange-500/30 rounded-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3 shadow-lg min-w-max relative overflow-hidden cursor-pointer hover:scale-105 transition-all duration-500 hover:border-orange-500"
                    style={{
                      transform: `translate(${mousePosition.x * 8}px, ${mousePosition.y * 8}px)`
                    }}
                  >
                    {/* Hover glow effect with parallax */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-orange-600/15 to-orange-700/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 scale-110"
                      style={{
                        transform: `translate(${mousePosition.x * 12}px, ${mousePosition.y * 12}px)`
                      }}
                    ></div>
                    
                    {/* Glowing border effect */}
                    <div className="absolute inset-0 border border-orange-500/50 rounded-lg opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
                    
                    <p className="text-xs sm:text-sm font-semibold text-white whitespace-nowrap relative z-10 group-hover:text-orange-400 transition-all duration-300 tracking-wide">
                      <span className="text-orange-400 group-hover:text-white transition-all duration-300">"Human + AI</span> = Super Intelligence Analytics"
                    </p>
                    
                    {/* Enhanced floating particles around quote */}
                    <div 
                      className="absolute -top-2 -left-2 w-2 h-2 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"
                      style={{ 
                        animationDelay: '0s',
                        transform: `translate(${mousePosition.x * 6}px, ${mousePosition.y * 6}px)`
                      }}
                    ></div>
                    <div 
                      className="absolute -top-2 -right-2 w-2 h-2 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"
                      style={{ 
                        animationDelay: '0.5s',
                        transform: `translate(${mousePosition.x * -4}px, ${mousePosition.y * -4}px)`
                      }}
                    ></div>
                    <div 
                      className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-orange-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"
                      style={{ 
                        animationDelay: '1s',
                        transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`
                      }}
                    ></div>
                    <div 
                      className="absolute -bottom-2 -right-2 w-1.5 h-1.5 bg-orange-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"
                      style={{ 
                        animationDelay: '1.5s',
                        transform: `translate(${mousePosition.x * -5}px, ${mousePosition.y * -5}px)`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Dynamic Logo */}
            <div className={`transform transition-all duration-1000 delay-700 order-3 md:order-2 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="relative flex justify-center">
                {/* Quote - Desktop: Above logo */}
                <div className="hidden md:block absolute -top-40 left-1/2 transform -translate-x-1/2 z-20 text-center">
                  <div 
                    className="group bg-gray-800/80 backdrop-blur-sm border border-orange-500/30 rounded-lg px-6 py-3 shadow-lg min-w-max relative overflow-hidden cursor-pointer hover:scale-105 transition-all duration-500 hover:border-orange-500"
                    style={{
                      transform: `translate(${mousePosition.x * 8}px, ${mousePosition.y * 8}px)`
                    }}
                  >
                    {/* Hover glow effect with parallax */}
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-orange-600/15 to-orange-700/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 scale-110"
                      style={{
                        transform: `translate(${mousePosition.x * 12}px, ${mousePosition.y * 12}px)`
                      }}
                    ></div>
                    
                    {/* Glowing border effect */}
                    <div className="absolute inset-0 border border-orange-500/50 rounded-lg opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
                    
                    <p className="text-sm font-semibold text-white whitespace-nowrap relative z-10 group-hover:text-orange-400 transition-all duration-300 tracking-wide">
                      <span className="text-orange-400 group-hover:text-white transition-all duration-300">"Human + AI</span> = Super Intelligence Analytics"
                    </p>
                    
                    {/* Enhanced floating particles around quote */}
                    <div 
                      className="absolute -top-2 -left-2 w-2 h-2 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"
                      style={{ 
                        animationDelay: '0s',
                        transform: `translate(${mousePosition.x * 6}px, ${mousePosition.y * 6}px)`
                      }}
                    ></div>
                    <div 
                      className="absolute -top-2 -right-2 w-2 h-2 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"
                      style={{ 
                        animationDelay: '0.5s',
                        transform: `translate(${mousePosition.x * -4}px, ${mousePosition.y * -4}px)`
                      }}
                    ></div>
                    <div 
                      className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-orange-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"
                      style={{ 
                        animationDelay: '1s',
                        transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`
                      }}
                    ></div>
                    <div 
                      className="absolute -bottom-2 -right-2 w-1.5 h-1.5 bg-orange-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"
                      style={{ 
                        animationDelay: '1.5s',
                        transform: `translate(${mousePosition.x * -5}px, ${mousePosition.y * -5}px)`
                      }}
                    ></div>
                  </div>
                </div>
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-orange-600/15 to-orange-700/10 rounded-full blur-3xl opacity-60 animate-pulse"
                  style={{
                    transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
                  }}
                ></div>
                <div className="relative z-10 flex justify-center">
                  <div 
                    className="group cursor-pointer transform hover:scale-110 transition-all duration-700 hover:rotate-12"
                    style={{
                      transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px) rotate(${mousePosition.x * 5}deg)`
                    }}
                  >
                    <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 rounded-full p-8 shadow-2xl border border-gray-600 hover:border-orange-500 transition-all duration-500">
                      <Logo size="lg" className="text-orange-500 group-hover:text-white transition-all duration-500" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 via-orange-600/20 to-orange-700/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 scale-150"></div>
                    
                    {/* Orbital Rings around Logo */}
                    <div 
                      className="absolute inset-0 border border-orange-500/20 rounded-full animate-spin"
                      style={{ 
                        animationDuration: '20s',
                        transform: `translate(${mousePosition.x * 8}px, ${mousePosition.y * 8}px)`
                      }}
                    ></div>
                    <div 
                      className="absolute inset-0 border border-orange-400/15 rounded-full animate-spin"
                      style={{ 
                        animationDuration: '15s',
                        animationDirection: 'reverse',
                        transform: `translate(${mousePosition.x * -6}px, ${mousePosition.y * -6}px)`
                      }}
                    ></div>
                    
                    {/* Glowing Particles */}
                    <div 
                      className="absolute -top-2 -left-2 w-2 h-2 bg-orange-500 rounded-full animate-pulse"
                      style={{ 
                        animationDelay: '0s',
                        transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`
                      }}
                    ></div>
                    <div 
                      className="absolute -top-2 -right-2 w-2 h-2 bg-orange-400 rounded-full animate-pulse"
                      style={{ 
                        animationDelay: '0.5s',
                        transform: `translate(${mousePosition.x * -5}px, ${mousePosition.y * -5}px)`
                      }}
                    ></div>
                    <div 
                      className="absolute -bottom-2 -left-2 w-2 h-2 bg-orange-600 rounded-full animate-pulse"
                      style={{ 
                        animationDelay: '1s',
                        transform: `translate(${mousePosition.x * 3}px, ${mousePosition.y * 3}px)`
                      }}
                    ></div>
                    <div 
                      className="absolute -bottom-2 -right-2 w-2 h-2 bg-orange-300 rounded-full animate-pulse"
                      style={{ 
                        animationDelay: '1.5s',
                        transform: `translate(${mousePosition.x * -3}px, ${mousePosition.y * -3}px)`
                      }}
                    ></div>
                  </div>
                </div>
                
                {/* Floating Elements with Parallax */}
                <div 
                  className="absolute top-0 right-0 w-4 h-4 bg-orange-500 rounded-full opacity-60 animate-bounce"
                  style={{ 
                    animationDelay: '0s',
                    transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
                  }}
                ></div>
                <div 
                  className="absolute top-1/4 right-1/4 w-3 h-3 bg-orange-400 rounded-full opacity-40 animate-bounce"
                  style={{ 
                    animationDelay: '0.5s',
                    transform: `translate(${mousePosition.x * -8}px, ${mousePosition.y * -8}px)`
                  }}
                ></div>
                <div 
                  className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-orange-300 rounded-full opacity-50 animate-bounce"
                  style={{ 
                    animationDelay: '1s',
                    transform: `translate(${mousePosition.x * 12}px, ${mousePosition.y * 12}px)`
                  }}
                ></div>
                <div 
                  className="absolute bottom-0 left-0 w-3 h-3 bg-orange-500 rounded-full opacity-30 animate-bounce"
                  style={{ 
                    animationDelay: '1.5s',
                    transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)`
                  }}
                ></div>

                {/* 3D Cubes with Parallax */}
                <div 
                  className="absolute top-1/3 left-0 w-6 h-6 bg-gradient-to-br from-orange-500 to-orange-600 opacity-70 animate-pulse"
                  style={{ 
                    animationDelay: '0.3s',
                    transform: `translate(${mousePosition.x * 25}px, ${mousePosition.y * 25}px) rotate(${mousePosition.x * 45}deg) rotateY(${mousePosition.y * 45}deg)`,
                    clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                  }}
                ></div>
                <div 
                  className="absolute top-0 left-1/3 w-4 h-4 bg-gradient-to-br from-orange-400 to-orange-500 opacity-60 animate-pulse"
                  style={{ 
                    animationDelay: '0.7s',
                    transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px) rotate(${mousePosition.x * 30}deg) rotateY(${mousePosition.y * 30}deg)`,
                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
                  }}
                ></div>

                {/* Rotating Circles */}
                <div 
                  className="absolute top-1/2 right-1/4 w-8 h-8 border-2 border-orange-500/50 rounded-full opacity-40"
                  style={{ 
                    transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px) rotate(${mousePosition.x * 180}deg)`,
                    animation: 'spin 8s linear infinite'
                  }}
                ></div>
                <div 
                  className="absolute bottom-1/3 right-0 w-6 h-6 border border-orange-400/60 rounded-full opacity-50"
                  style={{ 
                    transform: `translate(${mousePosition.x * -12}px, ${mousePosition.y * -12}px) rotate(${mousePosition.x * -120}deg)`,
                    animation: 'spin 12s linear infinite reverse'
                  }}
                ></div>

                {/* Floating Triangles */}
                <div 
                  className="absolute top-1/6 left-1/2 w-5 h-5 bg-gradient-to-br from-orange-300 to-orange-400 opacity-50"
                  style={{ 
                    animationDelay: '0.2s',
                    transform: `translate(${mousePosition.x * 18}px, ${mousePosition.y * 18}px) rotate(${mousePosition.x * 60}deg)`,
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                  }}
                ></div>
                <div 
                  className="absolute bottom-1/6 right-1/3 w-3 h-3 bg-gradient-to-br from-orange-500 to-orange-600 opacity-70"
                  style={{ 
                    animationDelay: '0.8s',
                    transform: `translate(${mousePosition.x * -22}px, ${mousePosition.y * -22}px) rotate(${mousePosition.x * -90}deg)`,
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                  }}
                ></div>

                {/* Hexagon */}
                <div 
                  className="absolute top-2/3 left-1/4 w-4 h-4 bg-gradient-to-br from-orange-400 to-orange-500 opacity-60 animate-pulse"
                  style={{ 
                    animationDelay: '0.4s',
                    transform: `translate(${mousePosition.x * 28}px, ${mousePosition.y * 28}px) rotate(${mousePosition.x * 75}deg)`,
                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8">About ARIS</h3>
              <div className="space-y-4">
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed hover:text-white transition-colors duration-300">
                  ARIS is a leading AI data analytics company specializing in agentic AI training and consultancy. 
                  Our team of expert data scientists and AI engineers combine cutting-edge technology with deep 
                  industry knowledge to deliver transformative solutions.
                </p>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed hover:text-white transition-colors duration-300">
                  We empower organizations to harness the full potential of their data through intelligent, 
                  autonomous AI systems that can adapt, learn, and make decisions independently.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 sm:gap-6 pt-4">
                <div className="flex items-center group cursor-pointer">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm sm:text-base">Expert AI Engineers</span>
                </div>
                <div className="flex items-center group cursor-pointer">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm sm:text-base">Custom Solutions</span>
                </div>
                <div className="flex items-center group cursor-pointer">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm sm:text-base">Proven Results</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-6 sm:p-8 transform hover:scale-105 transition-all duration-500 hover:shadow-xl border border-gray-600">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-gray-900 rounded-lg p-3 sm:p-4 hover:bg-orange-600 transition-colors duration-300 group">
                    <div className="text-xl sm:text-2xl font-bold text-orange-500 group-hover:text-white transition-colors duration-300">25+</div>
                    <div className="text-xs sm:text-sm text-gray-400 group-hover:text-white transition-colors duration-300">Years Experience</div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-3 sm:p-4 hover:bg-orange-600 transition-colors duration-300 group">
                    <div className="text-xl sm:text-2xl font-bold text-orange-500 group-hover:text-white transition-colors duration-300">Online</div>
                    <div className="text-xs sm:text-sm text-gray-400 group-hover:text-white transition-colors duration-300">Interactive Learning</div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-3 sm:p-4 hover:bg-orange-600 transition-colors duration-300 group">
                    <div className="text-xl sm:text-2xl font-bold text-orange-500 group-hover:text-white transition-colors duration-300">24/7</div>
                    <div className="text-xs sm:text-sm text-gray-400 group-hover:text-white transition-colors duration-300">Support</div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-3 sm:p-4 hover:bg-orange-600 transition-colors duration-300 group">
                    <div className="text-xl sm:text-2xl font-bold text-orange-500 group-hover:text-white transition-colors duration-300">Monthly</div>
                    <div className="text-xs sm:text-sm text-gray-400 group-hover:text-white transition-colors duration-300">Physical Meetup</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Section */}
      <section id="training" className="py-16 sm:py-20 bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/10 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">AI Analytics Online Training Programs</h3>
            <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            Our AI Analytics Training Program blends data analytics with cutting-edge AI. Gain practical skills in machine learning, generative AI, and ethical data use to drive smarter business decisions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-gray-700 p-6 sm:p-8 rounded-xl border border-gray-600 hover:border-orange-500 transition-all duration-500 hover:shadow-xl hover:shadow-orange-500/20 group">
              <div className="bg-orange-600 w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-all duration-300">
                <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Vibe Analytics</h4>
              <p className="text-gray-400 mb-4 text-sm sm:text-base">Advanced course on vibe analytics, data preprocessing, and AI models.</p>
              <div className="flex items-center text-orange-500 font-medium text-sm sm:text-base">
                <User className="w-4 h-4 mr-2" />
                Syed Shabaz
              </div>
            </div>
            
            <div className="bg-gray-700 p-6 sm:p-8 rounded-xl border border-gray-600 hover:border-orange-500 transition-all duration-500 hover:shadow-xl hover:shadow-orange-500/20 group">
              <div className="bg-orange-600 w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-all duration-300">
                <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Data Analytics & AI</h4>
              <p className="text-gray-400 mb-4 text-sm sm:text-base">Learn the basics of data analytics, data preprocessing, and AI models.</p>
              <div className="flex items-center text-orange-500 font-medium text-sm sm:text-base">
                <User className="w-4 h-4 mr-2" />
                Syed Rahman Hussain
              </div>
            </div>
            
            <div className="bg-gray-700 p-6 sm:p-8 rounded-xl border border-gray-600 hover:border-orange-500 transition-all duration-500 hover:shadow-xl hover:shadow-orange-500/20 group sm:col-span-2 md:col-span-1">
              <div className="bg-orange-600 w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-all duration-300">
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Prompting & AI Tools</h4>
              <p className="text-gray-400 mb-4 text-sm sm:text-base">Transform data into actionable insights with effective AI prompting.</p>
              <div className="flex items-center text-orange-500 font-medium text-sm sm:text-base">
                <User className="w-4 h-4 mr-2" />
                Mohammed Imtiyaz
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Services Section */}
      <section id="services" className="py-16 sm:py-20 bg-black relative overflow-hidden">
        {/* Sophisticated Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px),
              linear-gradient(rgba(249, 115, 22, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249, 115, 22, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px, 60px 60px, 20px 20px, 20px 20px',
            backgroundPosition: '0 0, 0 0, 0 0, 0 0'
          }}></div>
        </div>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Our Services</h3>
            <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
              We offer comprehensive AI and data analytics solutions tailored to your business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={index}
                  className="group bg-gray-800 p-6 sm:p-8 rounded-xl border border-gray-700 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-500 hover:-translate-y-2 cursor-pointer hover:border-orange-500 relative"
                >
                  {/* Deep Orange Blur Behind Card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-orange-600/15 to-orange-700/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-110"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-orange-600/8 to-orange-700/5 rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-20 scale-125"></div>
                  
                  <div className="bg-gray-700 w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-orange-600 group-hover:scale-110 transition-all duration-300">
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                    {service.title}
                  </h4>
                  <p className="text-gray-400 mb-4 leading-relaxed text-sm sm:text-base">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-xs sm:text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Business Launchpad Section */}
      <section id="business-launchpad" className="py-16 sm:py-20 bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 80%, rgba(249, 115, 22, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(249, 115, 22, 0.05) 0%, transparent 50%),
              linear-gradient(rgba(249, 115, 22, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249, 115, 22, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px, 100px 100px, 40px 40px, 40px 40px'
          }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Launch Your Career with 
              <span className="text-orange-500"> ARIS Support</span>
            </h3>
            <p className="text-gray-400 max-w-3xl mx-auto text-base sm:text-lg">
              Transform your learning into earning. We don't just train you - we help you build your business, 
              start freelancing, or launch your startup with hands-on support and proven strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
            {/* Startup Support */}
            <div className="group">
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-500 shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-orange-600/8 to-orange-700/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-110"></div>
                
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">Startup Support</h4>
                    <p className="text-gray-400 text-sm">From idea to launch</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <Lightbulb className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-300 text-sm">Idea Validation & Market Research</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Wrench className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-300 text-sm">Prototype & MVP Development</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Target className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-300 text-sm">Business Planning & Strategy</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Rocket className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-300 text-sm">Launch & Growth Support</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <span className="text-orange-400 text-sm font-medium">Success Rate: 85%</span>
                    <span className="text-gray-400 text-xs">50+ Startups Launched</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Freelancing Support */}
            <div className="group">
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-500 shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-orange-600/8 to-orange-700/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-110"></div>
                
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">Freelancing Support</h4>
                    <p className="text-gray-400 text-sm">Build your freelance empire</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-300 text-sm">Platform Setup (Upwork, Fiverr, Freelancer)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Briefcase className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-300 text-sm">Portfolio & Profile Optimization</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Network className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-300 text-sm">Networking & Client Acquisition</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Building className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-300 text-sm">Agency Building & Scaling</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <span className="text-orange-400 text-sm font-medium">Avg. Income: $5K+/month</span>
                    <span className="text-gray-400 text-xs">200+ Freelancers</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SME Support */}
            <div className="group">
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-500 shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-orange-600/8 to-orange-700/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-110"></div>
                
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">SME Support</h4>
                    <p className="text-gray-400 text-sm">Digital transformation</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <Settings className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-300 text-sm">AI Integration & Automation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <PieChart className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-300 text-sm">Custom Analytics Solutions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Workflow className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-300 text-sm">Process Optimization</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Expand className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-300 text-sm">Market Expansion Support</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <span className="text-orange-400 text-sm font-medium">ROI: 300%+</span>
                    <span className="text-gray-400 text-xs">100+ SMEs Transformed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-16 sm:py-20 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Latest Insights</h3>
            <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
              Stay updated with the latest trends and insights in AI Data Analytics
            </p>
          </div>

          <div className="space-y-8 sm:space-y-12">
            {/* Featured Article */}
            <div className="group">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-500 shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 cursor-pointer relative overflow-hidden">
                {/* Deep Orange Blur Behind Card */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-orange-600/15 to-orange-700/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-110"></div>
                
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-orange-400 text-sm font-medium">Featured Article</span>
                    <div className="text-gray-400 text-xs">December 2024</div>
                  </div>
                </div>
                
                <h4 className="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors duration-300">
                  The Future of AI Data Analytics: Transforming Business Intelligence
                </h4>
                
                <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
                  Discover how AI-powered data analytics is revolutionizing the way businesses make decisions. 
                  From predictive modeling to real-time insights, explore the cutting-edge technologies that are 
                  shaping the future of business intelligence and data-driven decision making.
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-orange-500" />
                    </div>
                    <span className="text-gray-400 text-sm">Syed Rahman Hussain</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      5 min read
                    </span>
                    <span className="flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      4.9
                    </span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-700/50">
                  <div className="flex flex-wrap gap-2">
                    {['AI Analytics', 'Business Intelligence', 'Data Science', 'Machine Learning'].map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-orange-600/20 text-orange-400 text-xs rounded-full border border-orange-500/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="group">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-500 shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 cursor-pointer relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-orange-600/8 to-orange-700/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-110"></div>
                  
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-orange-400 text-xs font-medium">Analytics</span>
                  </div>
                  
                  <h5 className="text-lg font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                    Mastering Data Visualization with Genrative AI.
                  </h5>
                  
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    Learn how to create compelling data visualizations that tell a story and drive actionable insights.
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>3 min read</span>
                    <span>Dec 15, 2024</span>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-500 shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 cursor-pointer relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-orange-600/8 to-orange-700/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-110"></div>
                  
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-orange-400 text-xs font-medium">AI Tools</span>
                  </div>
                  
                  <h5 className="text-lg font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                    Prompt Engineering for Data Analysis.
                  </h5>
                  
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    Discover advanced prompting techniques to get better results from AI tools in your data analysis workflow.
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>4 min read</span>
                    <span>Dec 12, 2024</span>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-500 shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 cursor-pointer relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-orange-600/8 to-orange-700/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-110"></div>
                  
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-orange-400 text-xs font-medium">Career</span>
                  </div>
                  
                  <h5 className="text-lg font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                    Building a Career in AI Data Analytics.
                  </h5>
                  
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    Discover the essential skills and career paths for aspiring Genrative AI data analysts in 2025 and beyond.
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>6 min read</span>
                    <span>Dec 10, 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* View All Articles Button */}
          <div className="text-center mt-12 sm:mt-16">
            <button 
              onClick={() => setIsArticleSelectionOpen(true)}
              className="group bg-gradient-to-r from-orange-600 to-orange-700 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-700 hover:to-orange-800 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 flex items-center justify-center mx-auto"
            >
              View All Articles
              <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 bg-gradient-to-br from-gray-800 to-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Get In Touch</h3>
              <p className="text-gray-400 text-base sm:text-lg">
                Ready to transform your career into AI Data Analyst? Contact us today.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
              {/* Contact Info */}
              <div className="space-y-6 sm:space-y-8">
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Contact Information</h4>
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center group hover:bg-gray-700 hover:shadow-md rounded-lg p-3 sm:p-4 transition-all duration-300 cursor-pointer">
                    <div className="bg-gray-700 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 group-hover:bg-orange-600 transition-colors duration-300">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="font-medium text-white text-sm sm:text-base">Email</div>
                      <div className="text-gray-400 text-xs sm:text-sm">arisinfo.in@gmail.com</div>
                    </div>
                  </div>
                  <div className="flex items-center group hover:bg-gray-700 hover:shadow-md rounded-lg p-3 sm:p-4 transition-all duration-300 cursor-pointer">
                    <div className="bg-gray-700 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 group-hover:bg-orange-600 transition-colors duration-300">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="font-medium text-white text-sm sm:text-base">Phone</div>
                      <div className="text-gray-400 text-xs sm:text-sm">+91 8374316403</div>
                    </div>
                  </div>
                  <div className="flex items-center group hover:bg-gray-700 hover:shadow-md rounded-lg p-3 sm:p-4 transition-all duration-300 cursor-pointer">
                    <div className="bg-gray-700 p-2 sm:p-3 rounded-lg mr-3 sm:mr-4 group-hover:bg-orange-600 transition-colors duration-300">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="font-medium text-white text-sm sm:text-base">Location</div>
                      <div className="text-gray-400 text-xs sm:text-sm">Hyderabad, INDIA</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl border border-gray-700 transition-shadow duration-500">
                {/* Status Messages */}
                {formStatus === 'success' && (
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-600/20 border border-green-500/50 rounded-lg">
                    <p className="text-green-400 text-center text-sm sm:text-base">Thank you! Your message has been sent successfully.</p>
                  </div>
                )}
                
                {formStatus === 'error' && (
                  <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-600/20 border border-red-500/50 rounded-lg">
                    <p className="text-red-400 text-center text-sm sm:text-base">Something went wrong. Please try again.</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="group">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-orange-500 transition-colors duration-300">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400 bg-gray-700 text-white placeholder-gray-400 text-sm sm:text-base ${
                        formErrors.name ? 'border-red-500' : 'border-gray-600'
                      }`}
                    />
                    {formErrors.name && (
                      <p className="mt-1 text-xs sm:text-sm text-red-400">{formErrors.name}</p>
                    )}
                  </div>
                  
                  <div className="group">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-orange-500 transition-colors duration-300">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400 bg-gray-700 text-white placeholder-gray-400 text-sm sm:text-base ${
                        formErrors.email ? 'border-red-500' : 'border-gray-600'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-xs sm:text-sm text-red-400">{formErrors.email}</p>
                    )}
                  </div>
                  
                  <div className="group">
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-orange-500 transition-colors duration-300">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400 bg-gray-700 text-white placeholder-gray-400 text-sm sm:text-base"
                    />
                  </div>
                  
                  <div className="group">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-orange-500 transition-colors duration-300">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400 resize-none bg-gray-700 text-white placeholder-gray-400 text-sm sm:text-base ${
                        formErrors.message ? 'border-red-500' : 'border-gray-600'
                      }`}
                    ></textarea>
                    {formErrors.message && (
                      <p className="mt-1 text-xs sm:text-sm text-red-400">{formErrors.message}</p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg group flex items-center justify-center text-sm sm:text-base ${
                      formStatus === 'submitting' 
                        ? 'bg-gray-600 cursor-not-allowed' 
                        : 'bg-orange-600 hover:bg-orange-700'
                    }`}
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 via-orange-800/10 to-transparent"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="group">
                <Logo size="md" className="justify-start mb-4 group-hover:scale-110 transition-transform duration-300" />
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  AI Data Analyst Powered By Agentic AI Training & Consultancy
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 group cursor-pointer">
                  <div className="w-8 h-8 bg-orange-600/20 rounded-lg flex items-center justify-center group-hover:bg-orange-600 transition-all duration-300">
                    <Mail className="w-4 h-4 text-orange-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-gray-400 group-hover:text-white transition-colors duration-300 text-sm">arisinfo.in@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 group cursor-pointer">
                  <div className="w-8 h-8 bg-orange-600/20 rounded-lg flex items-center justify-center group-hover:bg-orange-600 transition-all duration-300">
                    <Phone className="w-4 h-4 text-orange-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-gray-400 group-hover:text-white transition-colors duration-300 text-sm">+91 8374316403</span>
                </div>
                <div className="flex items-center space-x-3 group cursor-pointer">
                  <div className="w-8 h-8 bg-orange-600/20 rounded-lg flex items-center justify-center group-hover:bg-orange-600 transition-all duration-300">
                    <MapPin className="w-4 h-4 text-orange-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-gray-400 group-hover:text-white transition-colors duration-300 text-sm">Global Reach</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white mb-4 group">
                <span className="relative">
                  Quick Links
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
                </span>
              </h4>
              <div className="space-y-3">
                <div className="group cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
                  <span className="text-gray-400 hover:text-orange-400 transition-all duration-300 text-sm group-hover:translate-x-2 inline-block">
                    Home
                  </span>
                </div>
                <div className="group cursor-pointer" onClick={onNavigateServices}>
                  <span className="text-gray-400 hover:text-orange-400 transition-all duration-300 text-sm group-hover:translate-x-2 inline-block">
                    Services
                  </span>
                </div>
                <div className="group cursor-pointer" onClick={onNavigateTraining}>
                  <span className="text-gray-400 hover:text-orange-400 transition-all duration-300 text-sm group-hover:translate-x-2 inline-block">
                    Training
                  </span>
                </div>
                <div className="group cursor-pointer" onClick={onNavigateAbout}>
                  <span className="text-gray-400 hover:text-orange-400 transition-all duration-300 text-sm group-hover:translate-x-2 inline-block">
                    About
                  </span>
                </div>
                <div className="group cursor-pointer" onClick={onNavigateContact}>
                  <span className="text-gray-400 hover:text-orange-400 transition-all duration-300 text-sm group-hover:translate-x-2 inline-block">
                    Contact
                  </span>
                </div>
                <div className="group cursor-pointer" onClick={() => setIsRoadmapOpen(true)}>
                  <span className="text-gray-400 hover:text-orange-400 transition-all duration-300 text-sm group-hover:translate-x-2 inline-block">
                    Roadmap
                  </span>
                </div>
                <div className="group cursor-pointer" onClick={() => setIsBrochureModalOpen(true)}>
                  <span className="text-orange-400 hover:text-orange-300 transition-all duration-300 text-sm group-hover:translate-x-2 inline-block font-semibold">
                    Brochure
                  </span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white mb-4 group">
                <span className="relative">
                  Our Services
                  <span className="absolute bottom-0 left-0 w-0 h-0 w-full h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
                </span>
              </h4>
              <div className="space-y-3">
                {['AI Analytics Training', 'Self-Paced Learning', 'AI Consultancy', 'Agentic AI Solutions'].map((service, index) => (
                  <div key={index} className="group cursor-pointer">
                    <span className="text-gray-400 hover:text-orange-400 transition-all duration-300 text-sm group-hover:translate-x-2 inline-block">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter & Social */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white mb-4 group">
                <span className="relative">
                  Stay Connected
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
                </span>
              </h4>
              <div className="space-y-4">
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 text-white placeholder-gray-400"
                  />
                  <button 
                    type="submit"
                    disabled={newsletterStatus === 'submitting'}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 group flex items-center justify-center ${
                      newsletterStatus === 'submitting' 
                        ? 'bg-gray-600 cursor-not-allowed' 
                        : 'bg-orange-600 hover:bg-orange-700'
                    }`}
                  >
                    {newsletterStatus === 'submitting' ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Subscribing...
                      </>
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </button>
                  
                  {/* Newsletter Status Messages */}
                  {newsletterStatus === 'success' && (
                    <div className="p-3 bg-green-600/20 border border-green-500/50 rounded-lg">
                      <p className="text-green-400 text-center text-sm">Successfully subscribed!</p>
                    </div>
                  )}
                  
                  {newsletterStatus === 'error' && (
                    <div className="p-3 bg-red-600/20 border border-red-500/50 rounded-lg">
                      <p className="text-red-400 text-center text-sm">Subscription failed. Please try again.</p>
                    </div>
                  )}
                </form>
                <div className="flex space-x-4">
                  {[
                    { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/company/arisinfo-in' },
                    { icon: Facebook, label: 'Facebook', url: 'https://www.facebook.com/arisinfo.in' },
                    { icon: Instagram, label: 'Instagram', url: 'https://www.instagram.com/arisinfo.in/' },
                    { icon: Youtube, label: 'YouTube', url: 'https://www.youtube.com/@arisaidataanalyst' }
                  ].map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="group cursor-pointer">
                        <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-orange-600 transition-all duration-300 group-hover:scale-110">
                          <IconComponent className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-6">
                <span className="text-gray-400 text-sm hover:text-gray-300 transition-colors duration-300 cursor-pointer">
                  © 2025 ARIS. All rights reserved.
                </span>
                <span 
                  onClick={onNavigatePrivacy}
                  className="text-gray-400 text-sm hover:text-orange-400 transition-colors duration-300 cursor-pointer"
                >
                  Privacy Policy
                </span>
                <span 
                  onClick={onNavigateTerms}
                  className="text-gray-400 text-sm hover:text-orange-400 transition-colors duration-300 cursor-pointer"
                >
                  Terms of Service
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <span>Made with</span>
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                <span>by ARIS Team</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 right-10 w-2 h-2 bg-orange-500 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute bottom-20 left-20 w-3 h-3 bg-orange-400 rounded-full animate-bounce opacity-40"></div>
        <div className="absolute top-1/2 left-10 w-1.5 h-1.5 bg-orange-300 rounded-full animate-pulse opacity-50"></div>
      </footer>

      <style>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        @keyframes scaleX {
          to {
            transform: scaleX(1);
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(249, 115, 22, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(249, 115, 22, 0.6);
          }
        }
      `}</style>
      
      {/* Roadmap Selection Modal */}
      <RoadmapSelectionModal 
        isOpen={isRoadmapSelectionOpen} 
        onClose={() => setIsRoadmapSelectionOpen(false)}
        onSelectRoadmap={(roadmapType) => {
          setSelectedRoadmapType(roadmapType);
          setIsRoadmapSelectionOpen(false);
          setIsRoadmapOpen(true);
        }}
      />
      
      {/* Roadmap Overlay */}
      <RoadmapOverlay 
        isOpen={isRoadmapOpen} 
        onClose={() => {
          setIsRoadmapOpen(false);
          setIsRoadmapSelectionOpen(true);
        }}
        roadmapType={selectedRoadmapType}
        onNavigateContact={onNavigateContact}
      />

      {/* Article Selection Modal */}
      <ArticleSelectionModal 
        isOpen={isArticleSelectionOpen} 
        onClose={() => setIsArticleSelectionOpen(false)}
        onSelectArticle={(articleType) => {
          setSelectedArticleType(articleType);
          setIsArticleSelectionOpen(false);
          setIsArticleOpen(true);
        }}
      />
      
      {/* Article Overlay */}
      <ArticleOverlay 
        isOpen={isArticleOpen} 
        onClose={() => {
          setIsArticleOpen(false);
          setIsArticleSelectionOpen(true);
        }}
        articleType={selectedArticleType}
        onNavigateContact={onNavigateContact}
        onNavigateToArticle={(articleId) => {
          setSelectedArticleType(articleId);
        }}
      />

    </div>
  );
};

export default Home;
