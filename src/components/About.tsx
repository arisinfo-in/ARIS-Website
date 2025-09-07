import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Users, 
  Award, 
  CheckCircle, 
  ArrowRight, 
  Star, 
  BarChart3, 
  Zap, 
  Shield, 
  Globe,
  Target,
  Lightbulb,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Eye,
  Rocket,
  User,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Menu,
  X
} from 'lucide-react';
import Logo from './Logo';

interface AboutProps {
  onNavigateHome: () => void;
  onNavigateContact: () => void;
  onNavigateTraining: () => void;
  onNavigateServices: () => void;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface TeamMember {
  name: string;
  role: string;
  expertise: string[];
  avatar: string;
  linkedin?: string;
}

interface Achievement {
  year: string;
  title: string;
  description: string;
}

const About: React.FC<AboutProps> = ({ onNavigateHome, onNavigateContact, onNavigateTraining, onNavigateServices }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('story');

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

    // Intersection Observer for stats animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsVisible(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsElement = document.getElementById('about-stats-section');
    if (statsElement) {
      observer.observe(statsElement);
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const stats = [
    { number: "250+", label: "Projects Completed", sublabel: "Delivering AI-driven solutions across industries worldwide", icon: Brain },
    { number: "50K+", label: "Happy Students", sublabel: "Trusted by individuals and global brands alike.", icon: Users },
    { number: "4.9/5", label: "Average Rating", sublabel: "Consistently rated for quality, innovation, and support.", icon: Star },
    { number: "5K+", label: "Verified Reviews", sublabel: "Real feedback that reflects real results.", icon: CheckCircle }
  ];

  const coreValues = [
    {
      icon: Target,
      title: "Precision-Driven",
      description: "We focus on delivering accurate, data-driven AI solutions that produce measurable business outcomes."
    },
    {
      icon: Lightbulb,
      title: "Innovation-First",
      description: "We stay at the forefront of AI technology, continuously evolving our methods and approaches."
    },
    {
      icon: Shield,
      title: "Ethical AI",
      description: "We prioritize responsible AI development with transparency, fairness, and ethical considerations."
    },
    {
      icon: Globe,
      title: "Future-Ready Thinking",
      description: "We build smart, scalable AI solutions to keep your business agile and future-ready."
    }
  ];

  const services = [
    {
      icon: Brain,
      title: "AI Analytics Training",
      description: "Comprehensive programs combining data analytics with cutting-edge AI technologies for practical business applications.",
      features: ["Machine Learning Fundamentals", "Data Preprocessing", "Ethical AI Implementation"]
    },
    {
      icon: BarChart3,
      title: "Self-Paced Learning",
      description: "Flexible online courses designed for busy professionals, with interactive projects and real-world case studies.",
      features: ["24/7 Access", "Interactive Modules", "Hands-on Projects"]
    },
    {
      icon: Users,
      title: "AI Consultancy",
      description: "Strategic AI implementation guidance helping organizations integrate intelligent systems effectively and ethically.",
      features: ["Strategy Planning", "Implementation Support", "Performance Optimization"]
    },
    {
      icon: Zap,
      title: "Agentic AI Solutions",
      description: "Development of autonomous AI agents that can reason, plan, and execute complex tasks independently.",
      features: ["Autonomous Decision Making", "Multi-Agent Systems", "Adaptive Learning"]
    }
  ];

  const teamMembers: TeamMember[] = [
    {
      name: "Syed Shabaz",
      role: "CEO & Founder",
      expertise: ["Strategic Leadership", "Business Development", "Operational Excellence"],
      avatar: "Brain"
    },
    {
      name: "Syed Rahman Hussain",
      role: "Lead AI Data Analyst",
      expertise: ["Business Intelligence", "Statistical Modeling", "AI Analytics & Visualization"],
      avatar: "BarChart3"
    },
    {
      name: "Mohammed Imtiyaz",
      role: "AI Data Engineer",
      expertise: ["Data Governance & Security", "Data Pipeline Development", "Big Data & Cloud Ecosystems"],
      avatar: "BookOpen"
    },
    {
      name: "Adnan Syed",
      role: "Senior AI Engineer",
      expertise: ["MLOps & Deployment", "Research & Innovation", "Leadership & Mentorship"],
      avatar: "Zap"
    }
  ];

  const achievements: Achievement[] = [
    {
      year: "2024",
      title: "AI Excellence Award",
      description: "Recognized for outstanding contributions to AI education and innovation"
    },
    {
      year: "2023",
      title: "50K+ Students Milestone",
      description: "Reached our goal of training over 50,000 students worldwide"
    },
    {
      year: "2022",
      title: "Industry Partnership Program",
      description: "Launched strategic partnerships with leading tech companies"
    },
    {
      year: "2021",
      title: "AI Ethics Certification",
      description: "Became the first AI training provider with ethical AI certification"
    }
  ];

  const faqData: FAQItem[] = [
    {
      question: "What makes ARIS different from other AI training providers?",
      answer: "ARIS combines deep technical expertise with practical business application. Our focus on agentic AI, ethical implementation, and real-world problem-solving sets us apart. We don't just teach theory—we empower you to build and deploy intelligent systems that drive actual business value."
    },
    {
      question: "What industries do your AI training programs support?",
      answer: "Our AI training programs are designed to be industry-agnostic, with customizable features that support sectors including technology, healthcare, finance, retail, manufacturing, and more. We provide specialized modules for different industry applications to ensure maximum relevance and impact."
    },
    {
      question: "How does your AI consultancy service work?",
      answer: "Our AI consultancy service analyzes your existing processes, identifies opportunities for AI integration, and implements intelligent automation tools to streamline operations, reduce manual effort, and increase overall productivity—tailored to your unique business requirements."
    },
    {
      question: "Can your training programs match our company's specific needs?",
      answer: "Yes, our AI training programs are highly customizable to understand and align with your company's specific requirements, industry standards, and business objectives. We tailor the curriculum, pace, and focus areas to ensure maximum relevance and practical application."
    },
    {
      question: "Do you provide ongoing support after training completion?",
      answer: "Absolutely. We provide 24/7 support, monthly physical meetups, access to our AI community, continuous learning resources, and follow-up consultation sessions to ensure long-term success and continued growth in your AI journey."
    },
    {
      question: "How long does it take to see results from your training programs?",
      answer: "Most students begin applying their knowledge immediately during the program. Significant career advancement typically occurs within 3-6 months of completion, with many securing promotions, new roles, or launching AI initiatives at their current companies."
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
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
        <div className="max-w-6xl mx-auto bg-gray-800/90 backdrop-blur-sm rounded-full px-6 py-4 border border-gray-700 shadow-lg flex items-center justify-between">
          <div className={`transform transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div onClick={onNavigateHome} className="cursor-pointer">
              <Logo size="sm" />
            </div>
          </div>
          <nav className={`hidden md:flex transform transition-all duration-700 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
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
              <button className="text-orange-400 relative group px-4 py-2 rounded-full bg-gray-700/50">
                About
                <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-orange-500"></span>
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
      </header>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden fixed top-20 left-4 right-4 z-40 transition-all duration-300 ${
        isMobileMenuOpen 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <div className="bg-gray-800/95 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-xl p-6">
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
            <button className="text-orange-400 relative group px-4 py-3 rounded-full bg-gray-700/50 text-left">
              About
              <span className="absolute bottom-2 left-4 w-6 h-0.5 bg-orange-500"></span>
            </button>
            <button 
              onClick={() => { onNavigateContact(); setIsMobileMenuOpen(false); }}
              className="text-gray-300 hover:text-orange-400 transition-all duration-300 hover:scale-105 relative group px-4 py-3 rounded-full hover:bg-gray-700/50 text-left"
            >
              Contact
              <span className="absolute bottom-2 left-4 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-6"></span>
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
                ABOUT ARIS
              </h1>
              <div className="text-2xl md:text-3xl font-bold text-orange-500 mb-8 leading-tight">
                PIONEERING AI EXCELLENCE
              </div>
            </div>
            
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-4xl mx-auto">
                Discover the story behind ARIS, our mission to democratize AI education, and the passionate team 
                driving innovation in artificial intelligence and data analytics.
              </p>
            </div>

            {/* Tab Navigation */}
            <div className={`flex flex-wrap justify-center gap-4 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {[
                { id: 'story', label: 'Our Story', icon: BookOpen },
                { id: 'mission', label: 'Mission & Vision', icon: Target },
                { id: 'team', label: 'Our Team', icon: Users },
                { id: 'achievements', label: 'Achievements', icon: Award }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/25'
                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-orange-400 border border-gray-600 hover:border-orange-500'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Content Sections */}
      <div className="py-20">
        {/* Our Story Section */}
        {activeTab === 'story' && (
          <section className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                    The ARIS Story
                  </h2>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Founded in 2020, ARIS emerged from a simple yet powerful vision: to make artificial intelligence 
                    accessible, understandable, and practical for everyone.
                  </p>
                  <p className="text-lg text-gray-400 leading-relaxed">
                    What started as a small group of AI researchers and educators has grown into a global community 
                    of learners, innovators, and practitioners. We've witnessed the transformative power of AI in 
                    countless industries and believe that knowledge should be the bridge between potential and achievement.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-3">
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Innovation First</h3>
                    <p className="text-gray-400 text-sm">Pioneering new approaches to AI education and implementation</p>
                  </div>
                  <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-3">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Global Impact</h3>
                    <p className="text-gray-400 text-sm">Empowering individuals and organizations worldwide</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 p-8 rounded-3xl border border-orange-500/30">
                  <div className="text-center space-y-6">
                    <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto">
                      <Brain className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">AI for Everyone</h3>
                    <p className="text-gray-300">
                      Our journey is defined by breaking down complex AI concepts into digestible, 
                      actionable knowledge that drives real-world results.
                    </p>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-orange-500 rounded-full opacity-60 animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-orange-400 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </section>
        )}

        {/* Mission & Vision Section */}
        {activeTab === 'mission' && (
          <section className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Mission & Vision</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We're on a mission to democratize AI education and empower the next generation of innovators
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 p-8 rounded-3xl border border-orange-500/20">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">Our Mission</h3>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    To democratize artificial intelligence education by providing accessible, practical, 
                    and ethical training that empowers individuals and organizations to harness the 
                    transformative power of AI for positive change.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 p-8 rounded-3xl border border-orange-500/20">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto">
                    <Eye className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">Our Vision</h3>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    A world where AI is accessible to everyone, where innovation is driven by ethical 
                    principles, and where technology serves as a force for human progress and prosperity.
                  </p>
                </div>
              </div>
            </div>

            {/* Core Values */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div 
                    key={index}
                    className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Team Section */}
        {activeTab === 'team' && (
          <section className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Meet Our Team</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                The brilliant minds behind ARIS, combining decades of experience in AI, data science, and education
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 group"
                >
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                    <p className="text-orange-400 font-medium">{member.role}</p>
                    <div className="space-y-2">
                      {member.expertise.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="inline-block bg-gray-700/50 text-gray-300 text-xs px-3 py-1 rounded-full mr-2 mb-2"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-400 mb-6">
                Our team is constantly growing with new experts joining our mission
              </p>
              <button 
                onClick={onNavigateContact}
                className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center mx-auto"
              >
                Join Our Team
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </section>
        )}

        {/* Achievements Section */}
        {activeTab === 'achievements' && (
          <section className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Achievements</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Milestones that mark our journey and validate our commitment to excellence
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">{achievement.year}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{achievement.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-8">
                <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 p-8 rounded-3xl border border-orange-500/20">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">Key Metrics</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Student Satisfaction</span>
                      <span className="text-orange-400 font-bold">98%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Course Completion Rate</span>
                      <span className="text-orange-400 font-bold">92%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Career Advancement</span>
                      <span className="text-orange-400 font-bold">85%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Client Retention</span>
                      <span className="text-orange-400 font-bold">96%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50">
                  <h3 className="text-xl font-semibold text-white mb-4">What's Next?</h3>
                  <p className="text-gray-400 mb-4">
                    We're constantly pushing boundaries and setting new goals for the future of AI education.
                  </p>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-orange-400" />
                      <span>Expanding to 100+ countries</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-orange-400" />
                      <span>Launching advanced AI research lab</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-orange-400" />
                      <span>Developing industry-specific AI solutions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Statistics Section */}
      <section id="about-stats-section" className="py-20 bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/10 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">ARIS by the Numbers</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real metrics that demonstrate our impact and growth in the AI education space
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={index}
                  className={`text-center transform transition-all duration-1000 ${
                    statsVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-xl font-semibold text-orange-400 mb-2">{stat.label}</div>
                  <p className="text-gray-400 text-sm leading-relaxed">{stat.sublabel}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">What We Offer</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive AI solutions designed to meet the diverse needs of learners and organizations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-500 shadow-2xl hover:shadow-orange-500/10"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-orange-400 flex-shrink-0" />
                        <span className="text-gray-400 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
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
              Get answers to the most common questions about ARIS and our services
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div 
                key={index}
                className="bg-gray-700/50 backdrop-blur-sm rounded-2xl border border-gray-600/50 hover:border-orange-500/50 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-700/30 transition-colors duration-300 rounded-2xl"
                >
                  <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                  {expandedFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-orange-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
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
              Join thousands of learners who have already transformed their careers and businesses with ARIS
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={onNavigateContact}
                className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center"
              >
                Get Started Today
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
              <button 
                onClick={onNavigateHome}
                className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 hover:border-orange-500 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Explore Our Services
              </button>
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
    </div>
  );
};

export default About;
