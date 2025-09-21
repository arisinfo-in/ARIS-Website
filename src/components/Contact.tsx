import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle, 
  ArrowRight, 
  MessageSquare, 
  Clock, 
  Users, 
  ChevronDown,
  ChevronUp,
  Brain,
  BookOpen,
  Award,
  Shield,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Menu,
  X,
  FileText
} from 'lucide-react';
import Logo from './Logo';
import { apiService } from '../services/api';

interface ContactProps {
  onNavigateHome: () => void;
  onNavigateAbout: () => void;
  onNavigateTraining: () => void;
  onNavigateServices: () => void;
  isBrochureModalOpen: boolean;
  setIsBrochureModalOpen: (open: boolean) => void;
}

interface FAQItem {
  question: string;
  answer: string;
}

const Contact: React.FC<ContactProps> = ({ onNavigateHome, onNavigateAbout, onNavigateTraining, onNavigateServices, isBrochureModalOpen, setIsBrochureModalOpen }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    let timeoutId: number | undefined;
    
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: ''
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
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
      setFormErrors(errors);
      setFormStatus('idle');
      return;
    }
    
    try {
      // Use the API service which handles environment-based URLs
      const data = await apiService.submitContactForm({
        ...formData,
        source: 'home'
      });
      
      if (data.success) {
        setFormStatus('success');
        setFormData({ name: '', email: '', company: '', phone: '', service: '', message: '' });
        setFormErrors({});
        
        // Reset success message after 5 seconds
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        throw new Error(data.message || 'Form submission failed');
      }
    } catch (error) {
      setFormStatus('error');
      console.error('Form submission error:', error);
    }
  };

  // Smooth scroll to section function
  // const scrollToSection = (sectionId: string) => {
  //   const element = document.getElementById(sectionId);
  //   if (element) {
  //     const headerHeight = 100; // Approximate height of the fixed header
  //     const elementPosition = element.offsetTop - headerHeight;
      
  //     window.scrollTo({
  //       top: elementPosition,
  //       behavior: 'smooth'
  //     });
  //   }
  // };

  const faqData: FAQItem[] = [
    {
      question: "What AI training programs do you offer?",
      answer: "We offer comprehensive AI training programs including Vibe Analytics (2 weeks), Data Analytics & AI (6 weeks), and Prompting & AI Tools (2 weeks). Each program combines theoretical knowledge with hands-on practical experience."
    },
    {
      question: "How does your AI consultancy service work?",
      answer: "Our AI consultancy service begins with a thorough analysis of your current business processes. We then develop a customized AI strategy, create an implementation roadmap, and provide ongoing support to ensure successful AI integration into your organization."
    },
    {
      question: "Can your training programs be customized for our business needs?",
      answer: "Absolutely! Our training programs are highly customizable. We can tailor the curriculum, duration, and focus areas to match your specific industry requirements, skill levels, and business objectives."
    },
    {
      question: "What kind of support do you provide after training completion?",
      answer: "We provide 24/7 ongoing support, monthly physical meetups, access to our AI community, continuous learning resources, and consultation sessions to ensure you can successfully apply your new skills in real-world scenarios."
    },
    {
      question: "Do you offer certification upon completion?",
      answer: "Yes, we provide industry-recognized certifications for all our training programs. Our certifications are valued by employers and demonstrate your expertise in AI data analytics and agentic AI technologies."
    },
    {
      question: "What is the average ROI after completing your programs?",
      answer: "Our students typically see a 200% average ROI increase in their career advancement, salary improvements, and business impact. Many secure promotions or transition to higher-paying AI roles within 6 months of completion."
    }
  ];

  const services = [
    "AI Analytics Training",
    "Self-Paced Learning",
    "AI Consultancy",
    "Agentic AI Solutions",
    "Custom AI Development",
    "Team Training"
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us Anytime",
      subtitle: "we're here whenever you need us.",
      info: "+91 8374316403",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Mail,
      title: "Email Us Directly", 
      subtitle: "we're here whenever you need us.",
      info: "arisinfo.in@gmail.com",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: MessageSquare,
      title: "Live Chat Support",
      subtitle: "Get instant help from our team.",
      info: "Start Chat",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 overflow-x-hidden">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 transition-all duration-300 px-4 py-4">
        <div className="max-w-6xl mx-auto bg-gray-800/95 rounded-full px-6 py-4 border border-gray-700 shadow-lg flex items-center justify-between">
          <div className={`transform transition-all duration-200 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div onClick={onNavigateHome} className="cursor-pointer">
              <Logo size="sm" />
            </div>
          </div>
          <nav className={`hidden md:flex transform transition-all duration-200 delay-100 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="flex space-x-6">
              <button onClick={onNavigateHome} className="text-gray-300 hover:text-orange-400 transition-all duration-300 hover:scale-105 relative group px-4 py-2 rounded-full hover:bg-gray-700/50">
                Home
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-6"></span>
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
              <button className="text-orange-400 relative group px-4 py-2 rounded-full bg-gray-700/50">
                Contact
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-orange-500"></span>
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
      </header>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden fixed top-20 left-4 right-4 z-40 transition-all duration-300 ${
        isMobileMenuOpen 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <div className="bg-gray-800/95 rounded-2xl border border-gray-700 shadow-xl p-6">
          <nav className="flex flex-col space-y-4">
            <button 
              onClick={() => { onNavigateHome(); setIsMobileMenuOpen(false); }}
              className="text-gray-300 hover:text-orange-400 transition-all duration-300 hover:scale-105 relative group px-4 py-3 rounded-full hover:bg-gray-700/50 text-left"
            >
              Home
              <span className="absolute bottom-2 left-4 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-6"></span>
            </button>
            <button 
              onClick={() => { onNavigateServices(); setIsMobileMenuOpen(false); }}
              className="text-gray-300 hover:text-orange-400 transition-all duration-300 hover:scale-105 relative group px-4 py-3 rounded-full hover:bg-gray-700/50 text-left"
            >
              Services
              <span className="absolute bottom-2 left-4 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-6"></span>
            </button>
            <button 
              onClick={() => { onNavigateTraining(); setIsMobileMenuOpen(false); }}
              className="text-gray-300 hover:text-orange-400 transition-all duration-300 hover:scale-105 relative group px-4 py-3 rounded-full hover:bg-gray-700/50 text-left"
            >
              Training
              <span className="absolute bottom-2 left-4 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-6"></span>
            </button>
            <button 
              onClick={() => { onNavigateAbout(); setIsMobileMenuOpen(false); }}
              className="text-gray-300 hover:text-orange-400 transition-all duration-300 hover:scale-105 relative group px-4 py-3 rounded-full hover:bg-gray-700/50 text-left"
            >
              About
              <span className="absolute bottom-2 left-4 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-6"></span>
            </button>
            <button className="text-orange-400 relative group px-4 py-3 rounded-full bg-gray-700/50 text-left">
              Contact
              <span className="absolute bottom-2 left-4 w-6 h-0.5 bg-orange-500"></span>
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
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-32 mt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        {/* Floating Animation Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-20 left-10 w-4 h-4 bg-orange-500 rounded-full opacity-60 animate-bounce"
            style={{ 
              animationDelay: '0s',
              transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
            }}
          ></div>
          <div 
            className="absolute top-40 right-20 w-3 h-3 bg-orange-400 rounded-full opacity-40 animate-bounce"
            style={{ 
              animationDelay: '0.5s',
              transform: `translate(${mousePosition.x * -8}px, ${mousePosition.y * -8}px)`
            }}
          ></div>
          <div 
            className="absolute bottom-40 left-20 w-2 h-2 bg-orange-300 rounded-full opacity-50 animate-bounce"
            style={{ 
              animationDelay: '1s',
              transform: `translate(${mousePosition.x * 12}px, ${mousePosition.y * 12}px)`
            }}
          ></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center space-y-8">
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                CONTACT US
              </h1>
              <div className="text-2xl md:text-3xl font-bold text-orange-500 mb-8 leading-tight">
                LET'S CONNECT
              </div>
            </div>
            
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
                Whether you have questions, ideas, or need support — our team is ready to help you 
                move forward with confidence in your AI journey.
              </p>
            </div>

            <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <button 
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="group bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center mx-auto"
              >
                Get in Touch
                <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-20 bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/10 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div 
                  key={index}
                  className={`group bg-gray-700 p-8 rounded-2xl border border-gray-600 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300 hover:-translate-y-2 cursor-pointer hover:border-orange-500 relative overflow-hidden transform transition-all duration-200 ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-orange-600/15 to-orange-700/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-110"></div>
                  
                  <div className={`bg-gradient-to-r ${method.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors duration-300">
                    {method.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {method.subtitle}
                  </p>
                  
                  <div className="text-orange-500 font-medium text-lg">
                    {method.info}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Contact Form Section */}
      <section id="contact-form" className="py-20 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
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
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Side - Form */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Ready to transform your career or business with AI? Let's start the conversation.
                </p>
              </div>

              {/* Status Messages */}
              {formStatus === 'success' && (
                <div className="p-6 bg-green-600/20 border border-green-500/50 rounded-2xl backdrop-blur-sm">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <div>
                      <p className="text-green-400 font-medium">Thank you! Your submission has been received!</p>
                      <p className="text-green-300 text-sm mt-1">We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                </div>
              )}
              
              {formStatus === 'error' && (
                <div className="p-6 bg-red-600/20 border border-red-500/50 rounded-2xl backdrop-blur-sm">
                  <p className="text-red-400 text-center font-medium">Oops! Something went wrong while submitting the form.</p>
                </div>
              )}

              {/* Contact Form */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-500 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-3 group-focus-within:text-orange-500 transition-colors duration-300">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-6 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400 bg-gray-700/50 backdrop-blur-sm text-white placeholder-gray-400 ${
                          formErrors.name ? 'border-red-500' : 'border-gray-600'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {formErrors.name && (
                        <p className="mt-2 text-sm text-red-400 flex items-center">
                          <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                          {formErrors.name}
                        </p>
                      )}
                    </div>
                    
                    <div className="group">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-3 group-focus-within:text-orange-500 transition-colors duration-300">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-6 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400 bg-gray-700/50 backdrop-blur-sm text-white placeholder-gray-400 ${
                          formErrors.email ? 'border-red-500' : 'border-gray-600'
                        }`}
                        placeholder="Enter your email address"
                      />
                      {formErrors.email && (
                        <p className="mt-2 text-sm text-red-400 flex items-center">
                          <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-3 group-focus-within:text-orange-500 transition-colors duration-300">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400 bg-gray-700/50 backdrop-blur-sm text-white placeholder-gray-400"
                        placeholder="Your company name"
                      />
                    </div>
                    
                    <div className="group">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-3 group-focus-within:text-orange-500 transition-colors duration-300">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400 bg-gray-700/50 backdrop-blur-sm text-white placeholder-gray-400"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-3 group-focus-within:text-orange-500 transition-colors duration-300">
                      Service of Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400 bg-gray-700/50 backdrop-blur-sm text-white"
                    >
                      <option value="">Select a service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service} className="bg-gray-700">
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="group">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-3 group-focus-within:text-orange-500 transition-colors duration-300">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className={`w-full px-6 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400 resize-none bg-gray-700/50 backdrop-blur-sm text-white placeholder-gray-400 ${
                        formErrors.message ? 'border-red-500' : 'border-gray-600'
                      }`}
                      placeholder="Tell us about your project, goals, or questions..."
                    ></textarea>
                    {formErrors.message && (
                      <p className="mt-2 text-sm text-red-400 flex items-center">
                        <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                        {formErrors.message}
                      </p>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className={`w-full py-4 px-8 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg group flex items-center justify-center text-lg ${
                      formStatus === 'submitting' 
                        ? 'bg-gray-600 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 shadow-lg hover:shadow-orange-500/25'
                    }`}
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="ml-3 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Right Side - Contact Info & Additional Details */}
            <div className="space-y-8">
              {/* Contact Information */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-500 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <MapPin className="w-6 h-6 text-orange-500 mr-3" />
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4 group hover:bg-gray-700/30 rounded-xl p-4 transition-all duration-300">
                    <div className="bg-gray-700 p-3 rounded-lg group-hover:bg-orange-600 transition-colors duration-300 shrink-0">
                      <Mail className="w-5 h-5 text-orange-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="font-medium text-white mb-1">Email Address</div>
                      <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">arisinfo.in@gmail.com</div>
                      <div className="text-orange-500 text-sm mt-1">Response within 24 hours</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 group hover:bg-gray-700/30 rounded-xl p-4 transition-all duration-300">
                    <div className="bg-gray-700 p-3 rounded-lg group-hover:bg-orange-600 transition-colors duration-300 shrink-0">
                      <Phone className="w-5 h-5 text-orange-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="font-medium text-white mb-1">Phone Number</div>
                      <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">+91 8374316403</div>
                      <div className="text-orange-500 text-sm mt-1">Available 9 AM - 6 PM PST</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 group hover:bg-gray-700/30 rounded-xl p-4 transition-all duration-300">
                    <div className="bg-gray-700 p-3 rounded-lg group-hover:bg-orange-600 transition-colors duration-300 shrink-0">
                      <Clock className="w-5 h-5 text-orange-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="font-medium text-white mb-1">Working Hours</div>
                      <div className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Mon - Fri: 9:00 AM - 6:00 PM</div>
                      <div className="text-orange-500 text-sm mt-1">Pacific Standard Time</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-500 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Award className="w-6 h-6 text-orange-500 mr-3" />
                  Why Choose ARIS?
                </h3>
                
                <div className="space-y-4">
                  {[
                    { icon: Users, text: "Launch Your AI Journey Today" },
                    { icon: Brain, text: "Expert AI Engineers & Data Scientists" },
                    { icon: Shield, text: "100% Satisfaction Guarantee" },
                    { icon: BookOpen, text: "Industry-Recognized Certifications" }
                  ].map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={index} className="flex items-center space-x-3 group cursor-pointer hover:bg-gray-700/30 rounded-lg p-3 transition-all duration-300">
                        <div className="w-10 h-10 bg-orange-600/20 rounded-lg flex items-center justify-center group-hover:bg-orange-600 transition-all duration-300">
                          <IconComponent className="w-5 h-5 text-orange-500 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/10 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">FREQUENTLY ASKED QUESTIONS</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Need More Information? If your question isn't covered here, don't worry. Our dedicated team is always ready to assist you directly.
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={index}
                className="bg-gray-700/50 backdrop-blur-sm rounded-2xl border border-gray-600 hover:border-orange-500/50 transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between group hover:bg-gray-600/30 transition-all duration-300"
                >
                  <span className="text-white font-medium text-lg group-hover:text-orange-400 transition-colors duration-300">
                    {faq.question}
                  </span>
                  <div className="shrink-0 ml-4">
                    {expandedFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-orange-500 group-hover:text-orange-400 transition-colors duration-300" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors duration-300" />
                    )}
                  </div>
                </button>
                
                <div className={`transition-all duration-500 ease-in-out ${
                  expandedFAQ === index 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                } overflow-hidden`}>
                  <div className="px-8 pb-6">
                    <div className="border-t border-gray-600 pt-4">
                      <p className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400 mb-6">Still have questions?</p>
            <button 
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="group bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-orange-700 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center mx-auto"
            >
              Contact us
              <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </button>
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
                <div className="group cursor-pointer" onClick={onNavigateHome}>
                  <span className="text-gray-400 hover:text-orange-400 transition-all duration-300 text-sm group-hover:translate-x-2 inline-block">
                    Home
                  </span>
                </div>
                <div className="group cursor-pointer" onClick={onNavigateAbout}>
                  <span className="text-gray-400 hover:text-orange-400 transition-all duration-300 text-sm group-hover:translate-x-2 inline-block">
                    About
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
                <div className="flex space-x-4">
                  {[
                    { icon: Linkedin, label: 'LinkedIn' },
                    { icon: Twitter, label: 'Twitter' },
                    { icon: Instagram, label: 'Instagram' },
                    { icon: Youtube, label: 'YouTube' }
                  ].map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <div key={index} className="group cursor-pointer">
                        <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-orange-600 transition-all duration-300 group-hover:scale-110">
                          <IconComponent className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                        </div>
                      </div>
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
                <span className="text-gray-400 text-sm hover:text-orange-400 transition-colors duration-300 cursor-pointer">
                  Privacy Policy
                </span>
                <span className="text-gray-400 text-sm hover:text-orange-400 transition-colors duration-300 cursor-pointer">
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
      `}</style>
    </div>
  );
};

export default Contact;
