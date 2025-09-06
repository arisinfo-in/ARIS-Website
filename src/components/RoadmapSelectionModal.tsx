import React, { useState, useEffect } from 'react';
import { 
  X, BookOpen, Briefcase, Rocket, Globe, ArrowRight, CheckCircle
} from 'lucide-react';

interface RoadmapType {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  gradient: string;
  duration: string;
  difficulty: string;
  features: string[];
  stats: {
    stages: number;
    hours: number;
    projects: number;
  };
}

interface RoadmapSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRoadmap: (roadmapType: string) => void;
}

const RoadmapSelectionModal: React.FC<RoadmapSelectionModalProps> = ({ 
  isOpen, 
  onClose, 
  onSelectRoadmap 
}) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const roadmapTypes: RoadmapType[] = [
    {
      id: 'course',
      title: 'Course Roadmap',
      description: 'Complete learning path from beginner to AI Data Analyst with structured courses and hands-on projects.',
      icon: BookOpen,
      color: 'orange',
      gradient: 'from-orange-500 to-red-600',
      duration: '6-12 months',
      difficulty: 'Beginner to Advanced',
      features: [
        '12 Progressive Stages',
        'Hands-on Projects',
        'Industry Certifications',
        'Mentor Support',
        'Career Guidance'
      ],
      stats: {
        stages: 12,
        hours: 500,
        projects: 25
      }
    },
    {
      id: 'career',
      title: 'Career Roadmap',
      description: 'Strategic career progression path with role-specific skills, salary insights, and industry connections.',
      icon: Briefcase,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-600',
      duration: '2-5 years',
      difficulty: 'All Levels',
      features: [
        'Role Progression Path',
        'Salary Benchmarks',
        'Industry Insights',
        'Networking Opportunities',
        'Interview Preparation'
      ],
      stats: {
        stages: 8,
        hours: 200,
        projects: 15
      }
    },
    {
      id: 'project',
      title: 'Project Roadmap',
      description: 'Real-world project portfolio building with end-to-end data science and AI implementation projects.',
      icon: Rocket,
      color: 'purple',
      gradient: 'from-purple-500 to-pink-600',
      duration: '3-6 months',
      difficulty: 'Intermediate to Expert',
      features: [
        '15+ Real Projects',
        'Portfolio Building',
        'GitHub Integration',
        'Deployment Guides',
        'Code Reviews'
      ],
      stats: {
        stages: 15,
        hours: 300,
        projects: 15
      }
    },
    {
      id: 'domain',
      title: 'Domain Roadmap',
      description: 'Specialized domain expertise in healthcare, finance, e-commerce, and other industry verticals.',
      icon: Globe,
      color: 'green',
      gradient: 'from-green-500 to-emerald-600',
      duration: '4-8 months',
      difficulty: 'Intermediate to Expert',
      features: [
        'Industry Specialization',
        'Domain-Specific Tools',
        'Regulatory Compliance',
        'Case Studies',
        'Expert Mentorship'
      ],
      stats: {
        stages: 10,
        hours: 400,
        projects: 20
      }
    }
  ];

  // Handle escape key and mouse tracking
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isOpen) return;
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      setMousePosition({
        x: (clientX - centerX) / centerX,
        y: (clientY - centerY) / centerY
      });
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousemove', handleMouseMove);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      {/* Enhanced Backdrop with Parallax */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Data Icons */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
          }}
        >
          <div className="absolute top-20 left-20 w-16 h-16 bg-orange-500/30 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-32 right-32 w-12 h-12 bg-blue-500/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-32 left-32 w-14 h-14 bg-purple-500/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 right-20 w-10 h-10 bg-green-500/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
          }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
      </div>

      {/* Main Modal Content */}
      <div 
        className="relative w-full max-w-6xl mx-2 sm:mx-4 bg-gray-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-gray-700 shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="roadmap-selection-title"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 px-3 sm:px-4 py-3 sm:py-4 border-b border-gray-700">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-2 hover:bg-gray-800 rounded-lg transition-colors duration-300 group"
            aria-label="Close roadmap selection"
          >
            <X className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
          </button>
          
          <div className="text-center">
            <h1 id="roadmap-selection-title" className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">
              Choose Your AI Data Analyst Journey
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm max-w-2xl mx-auto">
              Select the roadmap that best fits your goals and current skill level.
            </p>
          </div>
        </div>

        {/* Roadmap Cards Grid */}
        <div className="p-3 sm:p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {roadmapTypes.map((roadmap, index) => {
              const IconComponent = roadmap.icon;
              const isHovered = hoveredCard === roadmap.id;
              
              return (
                <div
                  key={roadmap.id}
                  onMouseEnter={() => setHoveredCard(roadmap.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => onSelectRoadmap(roadmap.id)}
                  className={`group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg sm:rounded-xl p-3 sm:p-4 cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:border-${roadmap.color}-500/50 ${
                    isHovered ? `shadow-${roadmap.color}-500/20` : ''
                  }`}
                  style={{ 
                    transitionDelay: `${index * 100}ms`,
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-start mb-2 sm:mb-3">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br ${roadmap.gradient} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-orange-400 transition-colors duration-300">
                      {roadmap.title}
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-2">
                      {roadmap.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-1 sm:gap-2 py-2">
                      <div className="text-center">
                        <div className="text-sm sm:text-lg font-bold text-orange-400">{roadmap.stats.stages}</div>
                        <div className="text-xs text-gray-400">Stages</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm sm:text-lg font-bold text-blue-400">{roadmap.stats.hours}+</div>
                        <div className="text-xs text-gray-400">Hours</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm sm:text-lg font-bold text-green-400">{roadmap.stats.projects}+</div>
                        <div className="text-xs text-gray-400">Projects</div>
                      </div>
                    </div>

                    {/* Features - Only show 1 feature */}
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1 text-xs text-gray-400">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span className="truncate">{roadmap.features[0]}</span>
                      </div>
                      {roadmap.features.length > 1 && (
                        <div className="text-xs text-gray-500">
                          +{roadmap.features.length - 1} more features
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                    <button className="w-full mt-2 px-2 sm:px-3 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg font-semibold hover:from-orange-700 hover:to-orange-800 transition-all duration-300 flex items-center justify-center space-x-1 group-hover:shadow-lg text-xs sm:text-sm">
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${roadmap.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-lg sm:rounded-xl`}></div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default RoadmapSelectionModal;
