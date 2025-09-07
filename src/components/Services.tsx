import React, { useState, useEffect } from 'react';
import { 
  Brain, BarChart3, Users, CheckCircle, ArrowRight, Star, 
  Target, Lightbulb, Shield, Globe, ChevronDown, ChevronUp,
  TrendingUp, MapPin, Phone, Mail, MessageSquare, User,
  Settings, Rocket, Eye,
  Linkedin, Twitter, Instagram, Youtube, Menu, X
} from 'lucide-react';
import Logo from './Logo';

interface ServicesProps {
  onNavigateHome: () => void;
  onNavigateAbout: () => void;
  onNavigateContact: () => void;
  onNavigateTraining: () => void;
}

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  benefits: string[];
  duration: string;
  deliverables: string[];
  pricing: string;
  category: 'consulting' | 'analytics' | 'ai-solutions' | 'training';
}

interface FAQItem {
  question: string;
  answer: string;
}

const Services: React.FC<ServicesProps> = ({ onNavigateHome, onNavigateAbout, onNavigateContact, onNavigateTraining }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<'consulting' | 'analytics' | 'ai-solutions' | 'training'>('consulting');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      setMousePosition({
        x: (clientX - centerX) / centerX,
        y: (clientY - centerY) / centerY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const services: ServiceItem[] = [
    // Consulting Services
    {
      id: 'ai-strategy-consulting',
      title: 'AI Strategy Consulting',
      description: 'Develop comprehensive AI strategies aligned with your business objectives.',
      icon: Target,
      features: ['Business Process Analysis', 'AI Readiness Assessment', 'ROI Projection'],
      benefits: ['Clear AI Vision', 'Risk Mitigation', 'Competitive Advantage'],
      duration: '4-6 weeks',
      deliverables: ['AI Strategy Document', 'Implementation Timeline', 'Success Metrics'],
      pricing: 'Starting from ₹12,45,000',
      category: 'consulting'
    },
    {
      id: 'data-governance',
      title: 'Data Governance & Strategy',
      description: 'Establish data governance frameworks for quality, security, and compliance.',
      icon: Shield,
      features: ['Data Quality Assessment', 'Compliance Framework', 'Security Protocols'],
      benefits: ['Regulatory Compliance', 'Data Security', 'Operational Efficiency'],
      duration: '6-8 weeks',
      deliverables: ['Data Governance Policy', 'Compliance Checklist', 'Training Materials'],
      pricing: 'Starting from ₹9,96,000',
      category: 'consulting'
    },
    {
      id: 'digital-transformation',
      title: 'Digital Transformation',
      description: 'Guide organizations through digital transformation with AI solutions.',
      icon: Rocket,
      features: ['Current State Analysis', 'Technology Assessment', 'Change Management'],
      benefits: ['Operational Efficiency', 'Cost Reduction', 'Market Competitiveness'],
      duration: '8-12 weeks',
      deliverables: ['Transformation Roadmap', 'Technology Stack', 'Success Metrics'],
      pricing: 'Starting from ₹20,75,000',
      category: 'consulting'
    },

    // Analytics Services
    {
      id: 'predictive-analytics',
      title: 'Predictive Analytics',
      description: 'Leverage advanced statistical models to predict future trends and behaviors.',
      icon: TrendingUp,
      features: ['Data Modeling', 'Statistical Analysis', 'Machine Learning'],
      benefits: ['Future Insights', 'Risk Mitigation', 'Strategic Planning'],
      duration: '6-10 weeks',
      deliverables: ['Predictive Models', 'Analytics Dashboard', 'Model Documentation'],
      pricing: 'Starting from ₹14,94,000',
      category: 'analytics'
    },
    {
      id: 'business-intelligence',
      title: 'Business Intelligence',
      description: 'Transform raw data into actionable insights with comprehensive BI solutions.',
      icon: BarChart3,
      features: ['Data Warehousing', 'Dashboard Development', 'KPI Tracking'],
      benefits: ['Data-Driven Decisions', 'Real-time Insights', 'Performance Monitoring'],
      duration: '4-8 weeks',
      deliverables: ['BI Dashboards', 'Automated Reports', 'Data Pipeline'],
      pricing: 'Starting from ₹11,62,000',
      category: 'analytics'
    },
    {
      id: 'data-visualization',
      title: 'Data Visualization',
      description: 'Create compelling visual representations of complex data.',
      icon: PieChart,
      features: ['Interactive Dashboards', 'Custom Visualizations', 'Storytelling'],
      benefits: ['Improved Understanding', 'Better Communication', 'Faster Insights'],
      duration: '3-6 weeks',
      deliverables: ['Interactive Dashboards', 'Visualization Library', 'Templates'],
      pricing: 'Starting from ₹8,30,000',
      category: 'analytics'
    },

    // AI Solutions
    {
      id: 'machine-learning',
      title: 'Machine Learning Solutions',
      description: 'Develop custom machine learning models to automate processes.',
      icon: Brain,
      features: ['Model Development', 'Data Preprocessing', 'Algorithm Selection'],
      benefits: ['Process Automation', 'Pattern Recognition', 'Scalable Solutions'],
      duration: '8-12 weeks',
      deliverables: ['Trained Models', 'API Integration', 'Performance Metrics'],
      pricing: 'Starting from ₹16,60,000',
      category: 'ai-solutions'
    },
    {
      id: 'natural-language-processing',
      title: 'Natural Language Processing',
      description: 'Implement NLP solutions for text analysis and content processing.',
      icon: MessageSquare,
      features: ['Text Analysis', 'Sentiment Analysis', 'Language Models'],
      benefits: ['Automated Analysis', 'Customer Insights', 'Efficiency Gains'],
      duration: '6-10 weeks',
      deliverables: ['NLP Models', 'Analysis Tools', 'API Endpoints'],
      pricing: 'Starting from ₹13,28,000',
      category: 'ai-solutions'
    },
    {
      id: 'computer-vision',
      title: 'Computer Vision Solutions',
      description: 'Develop computer vision applications for image recognition and analysis.',
      icon: Eye,
      features: ['Image Recognition', 'Object Detection', 'Video Analysis'],
      benefits: ['Automated Inspection', 'Quality Control', 'Security Enhancement'],
      duration: '10-14 weeks',
      deliverables: ['Vision Models', 'Processing Pipeline', 'Integration APIs'],
      pricing: 'Starting from ₹18,26,000',
      category: 'ai-solutions'
    },

    // Training Services
    {
      id: 'corporate-training',
      title: 'Corporate AI Training',
      description: 'Customized AI training programs for your organization.',
      icon: Users,
      features: ['Custom Curriculum', 'Hands-on Projects', 'Team Workshops'],
      benefits: ['Skill Development', 'Team Alignment', 'Knowledge Transfer'],
      duration: '2-8 weeks',
      deliverables: ['Training Materials', 'Project Portfolio', 'Certification'],
      pricing: 'Starting from ₹6,64,000',
      category: 'training'
    },
    {
      id: 'workshop-facilitation',
      title: 'AI Workshop Facilitation',
      description: 'Interactive workshops to introduce AI concepts and applications.',
      icon: Lightbulb,
      features: ['Interactive Sessions', 'Case Studies', 'Group Activities'],
      benefits: ['Knowledge Sharing', 'Team Building', 'Practical Understanding'],
      duration: '1-3 days',
      deliverables: ['Workshop Materials', 'Action Plans', 'Follow-up Resources'],
      pricing: 'Starting from ₹4,15,000',
      category: 'training'
    },
    {
      id: 'mentorship-program',
      title: 'AI Mentorship Program',
      description: 'One-on-one mentorship to guide your team through AI implementation.',
      icon: User,
      features: ['Personalized Guidance', 'Problem Solving', 'Best Practices'],
      benefits: ['Expert Guidance', 'Accelerated Learning', 'Risk Mitigation'],
      duration: 'Ongoing',
      deliverables: ['Mentorship Plan', 'Progress Reports', 'Resource Library'],
      pricing: 'Starting from ₹2,49,000/month',
      category: 'training'
    }
  ];

  const consultingServices = services.filter(service => service.category === 'consulting');
  const analyticsServices = services.filter(service => service.category === 'analytics');
  const aiSolutions = services.filter(service => service.category === 'ai-solutions');
  const trainingServices = services.filter(service => service.category === 'training');

  const faqData: FAQItem[] = [
    {
      question: "What industries do you specialize in for AI consulting?",
      answer: "We work across multiple industries including technology, healthcare, finance, retail, manufacturing, and more. Our expertise is adaptable to any sector that can benefit from AI and data analytics solutions."
    },
    {
      question: "How long does a typical AI consulting engagement take?",
      answer: "Engagement duration varies based on project scope and complexity. Strategy consulting typically takes 4-6 weeks, while full implementation projects can range from 8-16 weeks. We provide detailed timelines during the initial assessment."
    },
    {
      question: "Do you provide ongoing support after project completion?",
      answer: "Yes, we offer various ongoing support options including maintenance contracts, monitoring services, and continuous improvement programs. We also provide training and knowledge transfer to ensure your team can manage the solutions independently."
    },
    {
      question: "What is your approach to data security and privacy?",
      answer: "We prioritize data security and privacy in all our engagements. We follow industry best practices, comply with relevant regulations (GDPR, HIPAA, etc.), and implement robust security measures to protect your sensitive information."
    },
    {
      question: "Can you work with our existing technology stack?",
      answer: "Absolutely! We assess your current technology infrastructure and design solutions that integrate seamlessly with your existing systems. We can work with any technology stack and provide recommendations for optimization."
    },
    {
      question: "What kind of ROI can we expect from AI implementation?",
      answer: "ROI varies by project type and industry. Our clients typically see 200-500% ROI within 12-18 months through cost savings, efficiency gains, and new revenue opportunities. We provide detailed ROI projections during the planning phase."
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setTimeout(() => {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-900 overflow-x-hidden">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 transition-all duration-300 px-4 py-4">
        <div className="max-w-6xl mx-auto bg-gray-800/90 backdrop-blur-sm rounded-full px-6 py-4 border border-gray-700 shadow-lg flex items-center justify-between">
          <div className={`transform transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div onClick={onNavigateHome} className="cursor-pointer">
              <Logo size="sm" />
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className={`hidden md:flex transform transition-all duration-700 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="flex space-x-6">
              <button onClick={onNavigateHome} className="text-gray-300 hover:text-orange-400 transition-all duration-300 hover:scale-105 relative group px-4 py-2 rounded-full hover:bg-gray-700/50">
                Home
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-6"></span>
              </button>
              <button className="text-orange-400 relative group px-4 py-2 rounded-full bg-gray-700/50">
                Services
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-orange-500"></span>
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

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden fixed top-20 left-4 right-4 z-40 transition-all duration-300 ${
          isMobileMenuOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}>
          <div className="bg-gray-800/95 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
            <nav className="py-4">
              <div className="space-y-2">
                <button 
                  onClick={onNavigateHome}
                  className="w-full text-left px-6 py-3 text-gray-300 hover:text-orange-400 hover:bg-gray-700/50 transition-all duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
                  Home
                </button>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-left px-6 py-3 text-orange-400 hover:bg-gray-700/50 transition-all duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
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
              </div>
            </nav>
          </div>
        </div>
      </header>

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
                OUR SERVICES
              </h1>
              <div className="text-2xl md:text-3xl font-bold text-orange-500 mb-8 leading-tight">
                DATA ANALYTICS & AI CONSULTING
              </div>
            </div>
            
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-4xl mx-auto">
                Transform your business with our comprehensive AI and data analytics services. 
                From strategic consulting to custom AI solutions, we help organizations harness 
                the power of data to drive innovation and growth.
              </p>
            </div>

            {/* Category Navigation */}
            <div className={`flex flex-wrap justify-center gap-4 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {[
                { id: 'consulting', label: 'Consulting', icon: Target },
                { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                { id: 'ai-solutions', label: 'AI Solutions', icon: Brain },
                { id: 'training', label: 'Training', icon: Users }
              ].map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id as 'consulting' | 'analytics' | 'ai-solutions' | 'training')}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                      activeCategory === category.id
                        ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/25'
                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-orange-400 border border-gray-600 hover:border-orange-500'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/10 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {activeCategory === 'consulting' && 'Strategic Consulting Services'}
              {activeCategory === 'analytics' && 'Advanced Analytics Solutions'}
              {activeCategory === 'ai-solutions' && 'Custom AI Solutions'}
              {activeCategory === 'training' && 'Professional Training Services'}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {activeCategory === 'consulting' && 'Expert guidance to develop and implement AI strategies that align with your businesses.'}
              {activeCategory === 'analytics' && 'Transform your data into actionable insights with cutting-edge analytics solutions'}
              {activeCategory === 'ai-solutions' && 'Custom AI solutions designed to solve your specific business challenges'}
              {activeCategory === 'training' && 'Comprehensive training programs to build AI capabilities within your organization'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(activeCategory === 'consulting' ? consultingServices :
              activeCategory === 'analytics' ? analyticsServices :
              activeCategory === 'ai-solutions' ? aiSolutions :
              trainingServices).map((service) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={service.id}
                  className="group bg-gray-700/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-600/50 hover:border-orange-500/50 transition-all duration-500 shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 cursor-pointer"
                  onClick={() => handleServiceSelect(service.id)}
                >
                  {/* Service Header */}
                  <div className="flex items-start justify-start mb-5">
                    <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 mb-5 leading-relaxed text-base">
                    {service.description}
                  </p>

                  {/* Features - Show only 2 */}
                  <div className="mb-5">
                    <h4 className="text-white font-semibold mb-3 flex items-center text-base">
                      <Lightbulb className="w-4 h-4 text-orange-400 mr-2" />
                      Key Features
                    </h4>
                    <div className="space-y-2">
                      {service.features.slice(0, 2).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-orange-400 flex-shrink-0" />
                          <span className="text-gray-400">{feature}</span>
                        </div>
                      ))}
                      {service.features.length > 2 && (
                        <div className="text-sm text-gray-500">
                          +{service.features.length - 2} more features
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Benefits - Show only 2 */}
                  <div className="mb-5">
                    <h4 className="text-white font-semibold mb-3 flex items-center text-base">
                      <Star className="w-4 h-4 text-orange-400 mr-2" />
                      Benefits
                    </h4>
                    <div className="space-y-2">
                      {service.benefits.slice(0, 2).map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-gray-400">{benefit}</span>
                        </div>
                      ))}
                      {service.benefits.length > 2 && (
                        <div className="text-sm text-gray-500">
                          +{service.benefits.length - 2} more benefits
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleServiceSelect(service.id);
                    }}
                    className="w-full mt-6 bg-gradient-to-r from-orange-600 to-orange-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-orange-700 hover:to-orange-800 transition-all duration-300 hover:scale-105 hover:shadow-lg group-hover:shadow-orange-500/25 flex items-center justify-center"
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
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
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Why Choose ARIS Services?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover what makes our consulting and AI services the preferred choice for forward-thinking organizations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Expert Team",
                description: "Industry veterans with deep expertise in AI, data science, and business strategy"
              },
              {
                icon: Shield,
                title: "Proven Results",
                description: "Track record of successful implementations and measurable business outcomes"
              },
              {
                icon: Globe,
                title: "Global Experience",
                description: "Experience across multiple industries and international markets"
              },
              {
                icon: TrendingUp,
                title: "ROI Focused",
                description: "Every solution designed to deliver measurable return on investment"
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-800 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Process</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A proven methodology that ensures successful project delivery and maximum value
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Eye,
                title: "Discovery",
                description: "Understand your business needs, challenges, and objectives"
              },
              {
                icon: Target,
                title: "Strategy",
                description: "Develop comprehensive solutions and implementation roadmap"
              },
              {
                icon: Settings,
                title: "Implementation",
                description: "Execute the solution with ongoing support and monitoring"
              },
              {
                icon: TrendingUp,
                title: "Optimization",
                description: "Continuous improvement and performance optimization"
              }
            ].map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get answers to common questions about our consulting and AI services
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={index}
                className="bg-gray-700/50 backdrop-blur-sm rounded-2xl border border-gray-600/50 hover:border-orange-500/50 transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-800 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Let's discuss how our AI and data analytics services can drive your organization's success
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
              <button 
                onClick={onNavigateContact}
                className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 hover:border-orange-500 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Start Your Project</h2>
            <p className="text-gray-400 text-lg">
              Ready to discuss your AI and data analytics needs? Fill out the form below and our team will get back to you within 24 hours.
            </p>
          </div>

          <div className="bg-gray-700/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-600/50 hover:border-orange-500/50 transition-all duration-500 shadow-2xl">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-3 group-focus-within:text-orange-500 transition-colors duration-300">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-6 py-4 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400 bg-gray-700/50 backdrop-blur-sm text-white placeholder-gray-400"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-3 group-focus-within:text-orange-500 transition-colors duration-300">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-6 py-4 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400 bg-gray-700/50 backdrop-blur-sm text-white placeholder-gray-400"
                    placeholder="Enter your email address"
                  />
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
                    className="w-full px-6 py-4 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400 bg-gray-700/50 backdrop-blur-sm text-white placeholder-gray-400"
                    placeholder="Your company name"
                  />
                </div>
                
                <div className="group">
                  <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-3 group-focus-within:text-orange-500 transition-colors duration-300">
                    Service of Interest *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={selectedService || ''}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-6 py-4 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400 bg-gray-700/50 backdrop-blur-sm text-white"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id} className="bg-gray-700">
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="group">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-3 group-focus-within:text-orange-500 transition-colors duration-300">
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-6 py-4 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400 resize-none bg-gray-700/50 backdrop-blur-sm text-white placeholder-gray-400"
                  placeholder="Tell us about your project, goals, challenges, or any specific requirements..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full py-4 px-8 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg group flex items-center justify-center text-lg bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 shadow-lg hover:shadow-orange-500/25"
              >
                Submit Request
                <ArrowRight className="ml-3 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </form>
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
                  <span className="text-gray-400 group-hover:text-white transition-colors duration-300 text-sm">+91-(837)-(431)-(6403)</span>
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
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
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
                <div className="group cursor-pointer" onClick={onNavigateTraining}>
                  <span className="text-gray-400 hover:text-orange-400 transition-all duration-300 text-sm group-hover:translate-x-2 inline-block">
                    Training
                  </span>
                </div>
                <div className="group cursor-pointer" onClick={onNavigateContact}>
                  <span className="text-gray-400 hover:text-orange-400 transition-all duration-300 text-sm group-hover:translate-x-2 inline-block">
                    Contact
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

export default Services;
