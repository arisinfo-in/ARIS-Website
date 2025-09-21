import React, { useState, useEffect } from 'react';
import { 
  Brain, BarChart3, Zap, BookOpen, Users, Award, CheckCircle, 
  ArrowRight, Star, Target, Lightbulb, Shield, Globe,
  ChevronDown, ChevronUp, User, UserPlus, TrendingUp, Code, Database,
  FileSpreadsheet, PieChart, MapPin, Phone, Mail, Clock,
  Linkedin, Twitter, Instagram, Youtube, Calculator, Cpu,
  Menu, X, FileText
} from 'lucide-react';
import Logo from './Logo';
import { apiService } from '../services/api';

interface TrainingProps {
  onNavigateHome: () => void;
  onNavigateAbout: () => void;
  onNavigateContact: () => void;
  onNavigateServices: () => void;
  isBrochureModalOpen: boolean;
  setIsBrochureModalOpen: (open: boolean) => void;
}

interface TrainingProgram {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  price: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  highlights: string[];
  schedule: string;
  instructor: string;
  certification: boolean;
  category: 'main' | 'additional';
}

interface FAQItem {
  question: string;
  answer: string;
}

const Training: React.FC<TrainingProps> = ({ onNavigateHome, onNavigateAbout, onNavigateContact, onNavigateServices, isBrochureModalOpen, setIsBrochureModalOpen }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<'main' | 'additional'>('main');
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    course: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

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

  const trainingPrograms: TrainingProgram[] = [
    // Main Programs
    {
      id: 'vibe-analytics',
      title: 'Vibe Analytics',
      description: 'Advanced course on vibe analytics, data preprocessing, and AI models.',
      duration: '2 weeks',
      level: 'Advanced',
      price: '₹5,000',
      icon: Brain,
      features: ['Data Pattern Recognition', 'Predictive Modeling', 'AI Model Training'],
      highlights: ['Hands-on Projects', 'Industry Case Studies', 'Expert Mentorship'],
      schedule: 'Mon-Fri, 1.5 hours/day',
      instructor: 'Syed Shabaz',
      certification: true,
      category: 'main'
    },
    {
      id: 'data-analytics-ai',
      title: 'Data Analytics & AI',
      description: 'Comprehensive program combining data analytics with cutting-edge AI technologies.',
      duration: '6 weeks',
      level: 'Intermediate to Advanced',
      price: '₹10,000',
      icon: BarChart3,
      features: ['Statistical Analysis', 'Machine Learning', 'Deep Learning'],
      highlights: ['Project Portfolio', 'Industry Networking', 'Career Guidance'],
      schedule: 'Mon-Fri, 2 hours/day',
      instructor: 'Syed Rahman Hussain',
      certification: true,
      category: 'main'
    },
    {
      id: 'prompting-ai-tools',
      title: 'Prompting & AI Tools',
      description: 'Transform data into actionable insights with effective AI prompting techniques.',
      duration: '2 weeks',
      level: 'Beginner to Intermediate',
      price: '₹5,000',
      icon: Zap,
      features: ['AI Prompt Engineering', 'Tool Integration', 'Workflow Automation'],
      highlights: ['Practical Exercises', 'Tool Access', 'Community Access'],
      schedule: 'Mon-Fri, 1.5 hours/day',
      instructor: 'Mohammed Imtiyaz',
      certification: true,
      category: 'main'
    },
    // Additional Programs
    {
      id: 'excel-data-analysis',
      title: 'Excel Data Analysis',
      description: 'Master Excel for data analysis with advanced formulas and visualization.',
      duration: '2 week',
      level: 'Beginner to Intermediate',
      price: '₹5,000',
      icon: FileSpreadsheet,
      features: ['Advanced Formulas', 'Pivot Tables', 'Data Visualization'],
      highlights: ['Practical Workbook', 'Real Data Sets', 'Excel Certification'],
      schedule: 'Mon-Fri, 2 hours/day',
      instructor: 'Syed Rahman Hussain',
      certification: true,
      category: 'additional'
    },
    {
      id: 'power-bi-analyst',
      title: 'Power BI Data Analyst',
      description: 'Convert data into actionable insights with Power BI visualization and interactive dashboards.',
      duration: '2 weeks',
      level: 'Intermediate',
      price: '₹8,000',
      icon: PieChart,
      features: ['Data Modeling', 'DAX Formulas', 'Dashboard Design'],
      highlights: ['Project Portfolio', 'Power BI Pro Access', 'Microsoft Certification Prep'],
      schedule: 'Mon-Fri, 2 hours/day',
      instructor: 'Syed Rahman Hussain',
      certification: true,
      category: 'additional'
    },
    {
      id: 'python-data-analysis',
      title: 'Python Data Analysis',
      description: 'Master Python programming for data analysis and visualization.',
      duration: '3 weeks',
      level: 'Intermediate',
      price: '₹8,000',
      icon: Code,
      features: ['Python Fundamentals', 'Pandas & NumPy', 'Data Visualization'],
      highlights: ['Coding Projects', 'Jupyter Notebooks', 'Portfolio Building'],
      schedule: 'Mon-Fri, 2.5 hours/day',
      instructor: 'Syed Rahman Hussain',
      certification: true,
      category: 'additional'
    },
    {
      id: 'sql-database',
      title: 'SQL & Database Management',
      description: 'Learn SQL fundamentals and database design for data analysis.',
      duration: '2 weeks',
      level: 'Beginner to Intermediate',
      price: '₹5,000',
      icon: Database,
      features: ['SQL Fundamentals', 'Database Design', 'Query Optimization'],
      highlights: ['Database Projects', 'Real-world Scenarios', 'Performance Tuning'],
      schedule: 'Mon-Fri, 2 hours/day',
      instructor: 'Syed Rahman Hussain',
      certification: true,
      category: 'additional'
    },
    {
      id: 'statistical-analysis',
      title: 'Statistical Analysis',
      description: 'Master statistical methods and hypothesis testing for data-driven decision making.',
      duration: '2 weeks',
      level: 'Intermediate to Advanced',
      price: '₹5,000',
      icon: Calculator,
      features: ['Hypothesis Testing', 'Regression Analysis', 'Statistical Modeling'],
      highlights: ['Statistical Software Access', 'Real Data Projects', 'Advanced Certification'],
      schedule: 'Mon-Fri, 2.5 hours/day',
      instructor: 'Mohammed Imtiyaz',
      certification: true,
      category: 'additional'
    },
    {
      id: 'machine-learning-models',
      title: 'Machine Learning Models',
      description: 'Build and deploy machine learning models for predictive analytics and automation.',
      duration: '2 weeks',
      level: 'Advanced',
      price: '₹5,000',
      icon: Cpu,
      features: ['Model Development', 'Algorithm Selection', 'Model Deployment'],
      highlights: ['ML Project Portfolio', 'Cloud Platform Access', 'Industry Certification'],
      schedule: 'Mon-Fri, 3 hours/day',
      instructor: 'Mohammed Imtiyaz',
      certification: true,
      category: 'additional'
    }
  ];

  const mainPrograms = trainingPrograms.filter(program => program.category === 'main');
  const additionalPrograms = trainingPrograms.filter(program => program.category === 'additional');

  const faqData: FAQItem[] = [
    {
      question: "What are the prerequisites for enrolling in these training programs?",
      answer: "Prerequisites vary by program. Our main programs require basic computer literacy and analytical thinking. Additional programs like Python Data Analysis require basic programming knowledge."
    },
    {
      question: "Do you provide job placement assistance after completing the training?",
      answer: "Yes! We provide comprehensive career support including resume building, interview preparation, networking opportunities, and direct connections with our industry partners."
    },
    {
      question: "Can I customize the training schedule to fit my work schedule?",
      answer: "Absolutely! We offer flexible scheduling options including evening classes, weekend sessions, and self-paced learning modules."
    },
    {
      question: "What kind of support do you provide during and after the training?",
      answer: "We provide 24/7 online support, dedicated mentors, access to our AI community, monthly meetups, and continuous learning resources."
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const handleProgramSelect = (programId: string) => {
    setSelectedProgram(programId);
    setTimeout(() => {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

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
        source: 'training'
      });
      
      if (data.success) {
        setFormStatus('success');
        setFormData({ name: '', email: '', company: '', phone: '', course: '', message: '' });
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
              <button className="text-orange-400 relative group px-4 py-2 rounded-full bg-gray-700/50">
                Training
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-orange-500"></span>
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
            <button className="text-orange-400 relative group px-4 py-3 rounded-full bg-gray-700/50 text-left">
              Training
              <span className="absolute bottom-2 left-4 w-6 h-0.5 bg-orange-500"></span>
            </button>
            <button 
              onClick={() => { onNavigateAbout(); setIsMobileMenuOpen(false); }}
              className="text-gray-300 hover:text-orange-400 transition-all duration-300 hover:scale-105 relative group px-4 py-3 rounded-full hover:bg-gray-700/50 text-left"
            >
              About
              <span className="absolute bottom-2 left-4 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-6"></span>
            </button>
            <button 
              onClick={() => { onNavigateContact(); setIsMobileMenuOpen(false); }}
              className="text-gray-300 hover:text-orange-400 transition-all duration-300 hover:scale-105 relative group px-4 py-3 rounded-full hover:bg-gray-700/50 text-left"
            >
              Contact
              <span className="absolute bottom-2 left-4 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-6"></span>
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
                TRAINING PROGRAMS
              </h1>
              <div className="text-2xl md:text-3xl font-bold text-orange-500 mb-8 leading-tight">
                MASTER AI & DATA ANALYTICS
              </div>
            </div>
            
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-4xl mx-auto">
                Transform your career with our comprehensive AI and data analytics training programs. 
                From foundational skills to advanced AI implementation, we provide the knowledge and 
                practical experience you need to succeed in the data-driven world.
              </p>
            </div>

            {/* Category Navigation */}
            <div className={`flex flex-wrap justify-center gap-4 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <button
                onClick={() => setActiveCategory('main')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  activeCategory === 'main'
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/25'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-orange-400 border border-gray-600 hover:border-orange-500'
                }`}
              >
                <Brain className="w-5 h-5" />
                <span>Main Programs</span>
              </button>
              <button
                onClick={() => setActiveCategory('additional')}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  activeCategory === 'additional'
                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/25'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-orange-400 border border-gray-600 hover:border-orange-500'
                }`}
              >
                <BookOpen className="w-5 h-5" />
                <span>Additional Programs</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Training Programs Section */}
      <section className="py-20 bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/10 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {activeCategory === 'main' ? 'Core AI Training Programs' : 'Specialized Data Analytics Programs'}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {activeCategory === 'main' 
                ? 'Our flagship programs designed to transform you into an AI data analyst'
                : 'Specialized programs to enhance your data analysis skills and career prospects'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(activeCategory === 'main' ? mainPrograms : additionalPrograms).map((program) => {
              const IconComponent = program.icon;
              return (
                <div 
                  key={program.id}
                  className="group bg-gray-700/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-600/50 hover:border-orange-500/50 transition-all duration-500 shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 cursor-pointer"
                  onClick={() => handleProgramSelect(program.id)}
                >
                  {/* Program Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-orange-400 font-bold text-sm">{program.price}</div>
                      <div className="text-gray-400 text-xs">{program.duration}</div>
                    </div>
                  </div>

                  {/* Program Title & Level */}
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-orange-400 transition-colors duration-300">
                    {program.title}
                  </h3>
                  <div className="flex flex-col space-y-2 mb-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-600/20 text-orange-400 border border-orange-500/30">
                      <Target className="w-3 h-3 mr-1" />
                      {program.level}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-600/20 text-blue-400 border border-blue-500/30">
                      <Clock className="w-3 h-3 mr-1" />
                      {program.schedule}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-4 leading-relaxed text-sm">
                    {program.description}
                  </p>

                  {/* Features - Show only 1 */}
                  <div className="mb-4">
                    <h4 className="text-white font-semibold mb-2 flex items-center text-sm">
                      <Lightbulb className="w-3 h-3 text-orange-400 mr-1" />
                      Key Features
                    </h4>
                    <div className="space-y-1">
                      {program.features.slice(0, 1).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2 text-xs">
                          <CheckCircle className="w-3 h-3 text-orange-400 flex-shrink-0" />
                          <span className="text-gray-400">{feature}</span>
                        </div>
                      ))}
                      {program.features.length > 1 && (
                        <div className="text-xs text-gray-500">
                          +{program.features.length - 1} more features
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Highlights - Show only 1 */}
                  <div className="mb-4">
                    <h4 className="text-white font-semibold mb-2 flex items-center text-sm">
                      <Star className="w-3 h-3 text-orange-400 mr-1" />
                      What You'll Get
                    </h4>
                    <div className="space-y-1">
                      {program.highlights.slice(0, 1).map((highlight, highlightIndex) => (
                        <div key={highlightIndex} className="flex items-center space-x-2 text-xs">
                          <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                          <span className="text-gray-400">{highlight}</span>
                        </div>
                      ))}
                      {program.highlights.length > 1 && (
                        <div className="text-xs text-gray-500">
                          +{program.highlights.length - 1} more benefits
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Instructor & Certification */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-600/50 mb-3">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-400 text-xs">{program.instructor}</span>
                    </div>
                    {program.certification && (
                      <div className="flex items-center space-x-1">
                        <Award className="w-3 h-3 text-orange-400" />
                        <span className="text-orange-400 text-xs font-medium">Certified</span>
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProgramSelect(program.id);
                    }}
                    className="w-full mt-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white py-2 px-4 rounded-lg font-semibold hover:from-orange-700 hover:to-orange-800 transition-all duration-300 hover:scale-105 hover:shadow-lg group-hover:shadow-orange-500/25 flex items-center justify-center text-sm"
                  >
                    Enroll Now
                    <ArrowRight className="ml-1 w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Our Training Section */}
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Why Choose ARIS Training?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover what makes our training programs the preferred choice for aspiring AI data analysts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Expert Instructors",
                description: "Learn from industry professionals with real-world experience"
              },
              {
                icon: Shield,
                title: "Proven Results",
                description: "Join thousands of successful graduates who have transformed their careers"
              },
              {
                icon: Globe,
                title: "Global Community",
                description: "Connect with learners worldwide and build your professional network"
              },
              {
                icon: TrendingUp,
                title: "Career Growth",
                description: "Get the skills and certification needed to advance in the AI industry"
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

      {/* FAQ Section */}
      <section className="py-20 bg-gray-800 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get answers to common questions about our training programs and enrollment process
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
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Start Your AI Journey?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose your program and take the first step towards becoming an AI data analyst
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center"
              >
                Enroll Now
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
      <section id="contact-form" className="py-20 bg-gray-800 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Get Started Today</h2>
            <p className="text-gray-400 text-lg">
              Ready to enroll? Fill out the form below and our team will get back to you within 24 hours.
            </p>
          </div>

          <div className="bg-gray-700/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-600/50 hover:border-orange-500/50 transition-all duration-500 shadow-2xl">
            {/* Status Messages */}
            {formStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-600/20 border border-green-500/50 rounded-lg">
                <p className="text-green-400 text-center">Thank you! Your message has been sent successfully.</p>
              </div>
            )}
            
            {formStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-600/20 border border-red-500/50 rounded-lg">
                <p className="text-red-400 text-center">Something went wrong. Please try again.</p>
              </div>
            )}
            
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
                    <p className="mt-1 text-sm text-red-400">{formErrors.name}</p>
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
                    <p className="mt-1 text-sm text-red-400">{formErrors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
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
                
                <div className="group">
                  <label htmlFor="program" className="block text-sm font-medium text-gray-300 mb-3 group-focus-within:text-orange-500 transition-colors duration-300">
                    Program of Interest *
                  </label>
                  <select
                    id="course"
                    name="course"
                    required
                    value={formData.course}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400 bg-gray-700/50 backdrop-blur-sm text-white"
                  >
                    <option value="">Select a program</option>
                    {trainingPrograms.map((program) => (
                      <option key={program.id} value={program.id} className="bg-gray-700">
                        {program.title} - {program.duration}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="group">
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-3 group-focus-within:text-orange-500 transition-colors duration-300">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  className={`w-full px-6 py-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-400 resize-none bg-gray-700/50 backdrop-blur-sm text-white placeholder-gray-400 ${
                    formErrors.message ? 'border-red-500' : 'border-gray-600'
                  }`}
                  placeholder="Tell us about your goals, experience level, or any questions you have..."
                ></textarea>
                {formErrors.message && (
                  <p className="mt-1 text-sm text-red-400">{formErrors.message}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className={`w-full py-4 px-8 rounded-xl font-semibold transition-all duration-300 group flex items-center justify-center text-lg ${
                  formStatus === 'submitting' 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 shadow-lg hover:shadow-orange-500/25 hover:scale-105 hover:shadow-lg'
                }`}
              >
                {formStatus === 'submitting' ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <ArrowRight className="ml-3 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
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

export default Training;
